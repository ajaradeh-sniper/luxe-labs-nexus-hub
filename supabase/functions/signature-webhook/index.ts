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

  // TODO: verify vendor signature for production security
  const payload = await req.json().catch(() => null);
  if (!payload) {
    console.error("Invalid JSON payload");
    return new Response("invalid", { status: 400, headers: cors });
  }

  const envelopeId = payload?.envelopeId ?? payload?.data?.envelope_id;
  const status = String(payload?.status ?? payload?.data?.status ?? "").toLowerCase();
  
  console.log("Webhook received", { envelopeId, status });
  
  if (!envelopeId || !status) {
    console.error("Missing envelopeId or status");
    return new Response("missing fields", { status: 400, headers: cors });
  }

  const { data: sig, error: sigError } = await supabase
    .from("signature_requests")
    .select("id, allocation_id")
    .eq("vendor_envelope_id", envelopeId)
    .single();

  if (sigError || !sig) {
    console.error("Signature request not found", sigError);
    return new Response("not found", { status: 404, headers: cors });
  }

  // Update signature request status
  const { error: updateError } = await supabase
    .from("signature_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", sig.id);

  if (updateError) {
    console.error("Error updating signature request", updateError);
  }

  // If signed/completed, update allocation status
  if (status === "completed" || status === "signed") {
    const { error: allocError } = await supabase
      .from("allocations")
      .update({ status: "signed" })
      .eq("id", sig.allocation_id);
    
    if (allocError) {
      console.error("Error updating allocation", allocError);
    } else {
      console.log("Allocation marked as signed", sig.allocation_id);
    }
  }

  return new Response(
    JSON.stringify({ ok: true }), 
    { headers: { ...cors, "Content-Type": "application/json" } }
  );
});
