import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ShareOpportunityRequest {
  opportunityId: string;
  investors: Array<{
    email: string;
    name?: string;
  }>;
  shareMessage?: string;
  shareMethod: 'email' | 'link';
}

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

    // Get authorization header
    const authHeader = req.headers.get('authorization') ?? '';
    const token = authHeader.replace('Bearer ', '');
    
    // Verify user is authenticated
    const { data: user, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user.user) {
      console.error('Authentication error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { opportunityId, investors, shareMessage, shareMethod }: ShareOpportunityRequest = await req.json();

    // Get opportunity details
    const { data: opportunity, error: oppError } = await supabaseClient
      .from('opportunities')
      .select('*')
      .eq('id', opportunityId)
      .single();

    if (oppError || !opportunity) {
      console.error('Opportunity fetch error:', oppError);
      return new Response(
        JSON.stringify({ error: 'Opportunity not found' }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Process each investor
    const shareResults = [];
    
    for (const investor of investors) {
      try {
        // Create share record
        const { data: shareRecord, error: shareError } = await supabaseClient
          .from('opportunity_shares')
          .insert({
            opportunity_id: opportunityId,
            shared_by: user.user.id,
            shared_with_email: investor.email,
            shared_with_name: investor.name,
            share_message: shareMessage,
            share_method: shareMethod,
            status: 'sent'
          })
          .select()
          .single();

        if (shareError) {
          console.error('Share record error:', shareError);
          shareResults.push({ 
            email: investor.email, 
            success: false, 
            error: shareError.message 
          });
          continue;
        }

        // Create or update investor process
        const { error: processError } = await supabaseClient
          .from('opportunity_investor_process')
          .upsert({
            opportunity_id: opportunityId,
            investor_email: investor.email,
            investor_name: investor.name,
            current_stage: 'shared',
            stage_history: JSON.stringify([{
              stage: 'shared',
              timestamp: new Date().toISOString(),
              notes: 'Opportunity shared via ' + shareMethod
            }])
          });

        if (processError) {
          console.error('Process tracking error:', processError);
        }

        // Send email if method is email
        if (shareMethod === 'email') {
          const trackingId = shareRecord.id;
          const viewUrl = `https://vzrdmjbcbhhyutppuxcf.supabase.co/functions/v1/track-opportunity-view?shareId=${trackingId}`;
          
          const emailResponse = await resend.emails.send({
            from: "Luxury Labs <opportunities@luxurylabs.ae>",
            to: [investor.email],
            subject: `Investment Opportunity: ${opportunity.title}`,
            html: `
              <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px;">Luxury Labs</h1>
                  <p style="color: #e5e7eb; margin: 10px 0 0 0;">Exclusive Investment Opportunity</p>
                </div>
                
                <div style="padding: 30px; background: #ffffff;">
                  <h2 style="color: #1e3a8a; margin-bottom: 20px;">${opportunity.title}</h2>
                  
                  <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                    Dear ${investor.name || 'Investor'},
                  </p>
                  
                  <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                    We are pleased to present you with an exclusive investment opportunity that aligns with your investment portfolio.
                  </p>
                  
                  ${shareMessage ? `
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <p style="color: #374151; margin: 0; line-height: 1.6;">${shareMessage}</p>
                    </div>
                  ` : ''}
                  
                  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #1e3a8a; margin-top: 0;">Opportunity Highlights</h3>
                    <ul style="color: #374151; line-height: 1.6;">
                      <li><strong>Location:</strong> ${opportunity.location}</li>
                      <li><strong>Property Type:</strong> ${opportunity.opportunity_type}</li>
                      <li><strong>Investment Required:</strong> AED ${opportunity.investment_required?.toLocaleString() || 'TBD'}</li>
                      <li><strong>Expected ROI:</strong> ${opportunity.expected_roi || 'TBD'}%</li>
                    </ul>
                  </div>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${viewUrl}" 
                       style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); 
                              color: white; 
                              padding: 15px 30px; 
                              text-decoration: none; 
                              border-radius: 8px; 
                              font-weight: bold;
                              display: inline-block;">
                      View Full Opportunity Details
                    </a>
                  </div>
                  
                  <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 30px;">
                    This opportunity is confidential and intended solely for your review. 
                    Please do not forward this information without our prior consent.
                  </p>
                </div>
                
                <div style="background: #f3f4f6; padding: 20px; text-align: center;">
                  <p style="color: #6b7280; margin: 0; font-size: 14px;">
                    Luxury Labs | Dubai, UAE<br>
                    Premium Real Estate Investment Opportunities
                  </p>
                </div>
              </div>
              
              <!-- Tracking pixel -->
              <img src="${viewUrl}&action=opened" width="1" height="1" style="display:none;" />
            `,
          });

          if (emailResponse.error) {
            console.error('Email send error:', emailResponse.error);
            shareResults.push({ 
              email: investor.email, 
              success: false, 
              error: emailResponse.error.message 
            });
          } else {
            console.log('Email sent successfully to:', investor.email);
            shareResults.push({ 
              email: investor.email, 
              success: true, 
              shareId: shareRecord.id 
            });
          }
        } else {
          // For link sharing, just return success
          shareResults.push({ 
            email: investor.email, 
            success: true, 
            shareId: shareRecord.id 
          });
        }
      } catch (error) {
        console.error('Error processing investor:', investor.email, error);
        shareResults.push({ 
          email: investor.email, 
          success: false, 
          error: error.message 
        });
      }
    }

    return new Response(JSON.stringify({ 
      message: 'Opportunity sharing processed', 
      results: shareResults 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in share-opportunity function:", error);
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