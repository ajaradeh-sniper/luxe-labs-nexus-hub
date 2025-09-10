import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { submissionData } = await req.json()

    // Get client IP address
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown'

    console.log('Rate limit check for IP:', clientIP)

    // Check current rate limit
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('submission_rate_limits')
      .select('*')
      .eq('ip_address', clientIP)
      .gte('window_start', new Date(Date.now() - 60 * 60 * 1000).toISOString()) // Last hour
      .single()

    if (rateLimitError && rateLimitError.code !== 'PGRST116') {
      console.error('Rate limit check error:', rateLimitError)
      throw new Error('Rate limit check failed')
    }

    // Check if rate limit exceeded
    if (rateLimitData && rateLimitData.submission_count >= 5) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Maximum 5 submissions per hour.' 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Track this submission
    await supabase.rpc('track_submission_rate_limit')

    // Insert the submission
    const { data: submissionResult, error: submissionError } = await supabase
      .from('user_submissions')
      .insert({
        ...submissionData,
        ip_address: clientIP
      })
      .select()
      .single()

    if (submissionError) {
      console.error('Submission error:', submissionError)
      throw new Error('Failed to create submission')
    }

    console.log('Submission created successfully:', submissionResult.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        submissionId: submissionResult.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})