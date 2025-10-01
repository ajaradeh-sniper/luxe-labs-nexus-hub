import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function usePortfolio() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPortfolio = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from("v_portfolio_positions")
        .select("*");
        
      if (fetchError) throw fetchError;
      setRows(data ?? []);
    } catch (err: any) {
      console.error("Portfolio fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchPortfolio(); 
  }, []);

  const totals = rows.reduce((acc, r) => {
    acc.capital_in += Number(r.capital_in || 0);
    acc.distributions += Number(r.distributions || 0);
    acc.expected_exit_value += Number(r.expected_exit_value || 0);
    return acc;
  }, { 
    capital_in: 0, 
    distributions: 0, 
    expected_exit_value: 0 
  });

  const netValue = totals.capital_in - totals.distributions;
  const unrealizedGain = totals.expected_exit_value - netValue;
  const totalReturn = totals.distributions + unrealizedGain;
  const roiPercentage = totals.capital_in > 0 
    ? ((totalReturn / totals.capital_in) * 100).toFixed(2) 
    : "0.00";

  return { 
    rows, 
    totals: {
      ...totals,
      netValue,
      unrealizedGain,
      totalReturn,
      roiPercentage
    },
    loading, 
    error,
    refetch: fetchPortfolio 
  };
}
