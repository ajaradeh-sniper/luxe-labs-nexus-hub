import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useEOI(opportunityId?: string) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submitEOI = async (amount: number, note?: string) => {
    if (!opportunityId) {
      toast({ 
        title: "Error", 
        description: "No opportunity selected", 
        variant: "destructive" 
      });
      return null;
    }
    
    setLoading(true);

    try {
      // Fetch current investor id via RPC (maps auth.uid -> investors.id)
      const { data: investorId, error: rpcError } = await supabase.rpc("get_current_investor_id");

      if (rpcError || !investorId) {
        throw new Error("Could not identify investor account. Please ensure you have an investor profile.");
      }

      const { data, error } = await supabase
        .from("expressions_of_interest")
        .insert([{ 
          opportunity_id: opportunityId, 
          investor_id: investorId, 
          amount, 
          note: note || null 
        }])
        .select()
        .single();

      if (error) throw error;

      toast({ 
        title: "Interest submitted", 
        description: "We'll review your request shortly." 
      });
      
      return data;
    } catch (error: any) {
      console.error("EOI submission error:", error);
      toast({ 
        title: "Could not submit interest", 
        description: error.message, 
        variant: "destructive" 
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitEOI, loading };
}
