import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useAllocations(projectId?: string) {
  const { toast } = useToast();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllocations = async () => {
    if (!projectId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("allocations")
        .select(`
          *,
          investor:investors(id, user_id),
          opportunity:opportunities(id, title),
          project:projects(id, name)
        `)
        .eq("project_id", projectId);
        
      if (error) throw error;
      setList(data ?? []);
    } catch (error: any) {
      console.error("Fetch allocations error:", error);
      toast({ 
        title: "Allocations error", 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const convertToCapTable = async (allocationId: string) => {
    try {
      const { data: alloc, error } = await supabase
        .from("allocations")
        .select("*")
        .eq("id", allocationId)
        .single();
        
      if (error || !alloc) {
        throw new Error("Allocation not found");
      }

      const { error: insErr } = await supabase
        .from("cap_table_entries")
        .insert([{
          project_id: alloc.project_id,
          investor_id: alloc.investor_id,
          committed_amount: alloc.allocated_amount,
          units: alloc.units ?? 0,
          pct: null
        }]);

      if (insErr) throw insErr;
      
      toast({ title: "Allocation converted to cap table" });
      await fetchAllocations();
    } catch (error: any) {
      console.error("Convert to cap table error:", error);
      toast({ 
        title: "Cap table error", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };

  const sendSignatureRequest = async (allocationId: string, vendor = "dropbox_sign") => {
    try {
      const { data, error } = await supabase.functions.invoke("send-signature", {
        body: { allocationId, vendor }
      });

      if (error) throw error;
      
      toast({ 
        title: "Signature request sent", 
        description: data.message || "Documents sent for e-signature" 
      });
      
      await fetchAllocations();
      return data;
    } catch (error: any) {
      console.error("Send signature error:", error);
      toast({ 
        title: "Failed to send signature request", 
        description: error.message, 
        variant: "destructive" 
      });
      return null;
    }
  };

  useEffect(() => { 
    fetchAllocations(); 
  }, [projectId]);

  return { 
    list, 
    loading, 
    fetchAllocations, 
    convertToCapTable,
    sendSignatureRequest 
  };
}
