import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } }
  );

  const { allocationId, vendor = "dropbox_sign" } = await req.json();
  
  console.log("Send signature request", { allocationId, vendor });
  
  if (!allocationId) {
    return new Response("missing allocationId", { status: 400, headers: cors });
  }

  // Fetch allocation details
  const { data: alloc, error: allocError } = await supabase
    .from("allocations")
    .select("id, allocated_amount, investor_id, opportunity_id, project_id")
    .eq("id", allocationId)
    .single();
    
  if (allocError || !alloc) {
    console.error("Allocation not found", allocError);
    return new Response("allocation not found", { status: 404, headers: cors });
  }

  // Get investor profile details
  const { data: investor, error: invError } = await supabase
    .from("investors")
    .select("id, user_id")
    .eq("id", alloc.investor_id)
    .single();

  if (invError || !investor) {
    console.error("Investor not found", invError);
    return new Response("investor not found", { status: 404, headers: cors });
  }

  const { data: profile, error: profError } = await supabase
    .from("profiles")
    .select("full_name, name, user_id")
    .eq("user_id", investor.user_id)
    .single();

  if (profError || !profile) {
    console.error("Profile not found", profError);
    return new Response("profile not found", { status: 404, headers: cors });
  }

  // Get auth user email
  const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(profile.user_id);
  
  if (userError || !user) {
    console.error("User not found", userError);
    return new Response("user not found", { status: 404, headers: cors });
  }

  // TODO: Call actual e-signature vendor API (DocuSign, Dropbox Sign, Adobe Sign)
  // For now, simulate envelope creation
  const envelopeId = `env_${allocationId}_${Date.now()}`;
  
  console.log("Creating envelope", {
    envelopeId,
    signerName: profile.full_name || profile.name,
    signerEmail: user.email,
    amount: alloc.allocated_amount
  });

  // Create signature request record
  const { data: sigRequest, error: sigError } = await supabase
    .from("signature_requests")
    .insert({
      allocation_id: allocationId,
      vendor,
      vendor_envelope_id: envelopeId,
      doc_type: "Subscription Agreement",
      signer_name: profile.full_name || profile.name,
      signer_email: user.email,
      status: "sent"
    })
    .select()
    .single();

  if (sigError) {
    console.error("Error creating signature request", sigError);
    return new Response(
      JSON.stringify({ error: "Failed to create signature request" }), 
      { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }

  // Update allocation status
  await supabase
    .from("allocations")
    .update({ status: "docs_sent" })
    .eq("id", allocationId);

  return new Response(
    JSON.stringify({ 
      ok: true, 
      envelopeId,
      signatureRequestId: sigRequest.id,
      message: "Signature request created. Integration with e-signature vendor pending." 
    }), 
    { headers: { ...cors, "Content-Type": "application/json" } }
  );
});
