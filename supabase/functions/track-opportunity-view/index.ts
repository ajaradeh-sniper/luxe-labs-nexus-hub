import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const url = new URL(req.url);
    const shareId = url.searchParams.get('shareId');
    const action = url.searchParams.get('action') || 'viewed';
    
    if (!shareId) {
      return new Response('Missing shareId parameter', { status: 400 });
    }

    // Get client info
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0] || realIp || 'Unknown';

    // Record the analytics event
    const { error: analyticsError } = await supabaseClient
      .from('opportunity_share_analytics')
      .insert({
        share_id: shareId,
        action_type: action,
        action_data: {
          timestamp: new Date().toISOString(),
          referrer: req.headers.get('referer') || null,
          user_agent: userAgent
        },
        user_agent: userAgent,
        ip_address: ipAddress === 'Unknown' ? null : ipAddress
      });

    if (analyticsError) {
      console.error('Analytics recording error:', analyticsError);
    }

    // Update share status if it's a view action
    if (action === 'viewed' || action === 'opened') {
      const newStatus = action === 'opened' ? 'opened' : 'viewed';
      
      const { error: updateError } = await supabaseClient
        .from('opportunity_shares')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', shareId);

      if (updateError) {
        console.error('Share status update error:', updateError);
      }
    }

    // If this is a tracking pixel (opened action), return 1x1 transparent GIF
    if (action === 'opened') {
      const gif = new Uint8Array([
        0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x21, 0xF9, 0x04,
        0x01, 0x00, 0x00, 0x00, 0x00, 0x2C, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
        0x02, 0x04, 0x01, 0x00, 0x3B
      ]);

      return new Response(gif, {
        status: 200,
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          ...corsHeaders
        }
      });
    }

    // For view actions, redirect to the opportunity page
    if (action === 'viewed') {
      // Get the share record to find the opportunity
      const { data: shareRecord } = await supabaseClient
        .from('opportunity_shares')
        .select('opportunity_id')
        .eq('id', shareId)
        .single();

      if (shareRecord) {
        const redirectUrl = `https://vzrdmjbcbhhyutppuxcf.sandbox.lovable.dev/opportunities?id=${shareRecord.opportunity_id}&ref=${shareId}`;
        
        return new Response(null, {
          status: 302,
          headers: {
            'Location': redirectUrl,
            ...corsHeaders
          }
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in track-opportunity-view function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);