import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ShareAnalytics {
  id: string;
  shared_with_email: string;
  shared_with_name?: string;
  status: string;
  created_at: string;
  updated_at: string;
  share_method: string;
}

interface InvestorProcess {
  id: string;
  investor_email: string;
  investor_name?: string;
  current_stage: string;
  stage_history: any;
  updated_at: string;
}

export function useOpportunitySharing(opportunityId?: string) {
  const { toast } = useToast();
  const [shareAnalytics, setShareAnalytics] = useState<ShareAnalytics[]>([]);
  const [investorProcess, setInvestorProcess] = useState<InvestorProcess[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadShareAnalytics = async () => {
    if (!opportunityId) return;
    
    setIsLoading(true);
    try {
      // Load share records
      const { data: shares, error: sharesError } = await supabase
        .from('opportunity_shares')
        .select('*')
        .eq('opportunity_id', opportunityId)
        .order('created_at', { ascending: false });

      if (sharesError) throw sharesError;

      // Load investor process
      const { data: processes, error: processError } = await supabase
        .from('opportunity_investor_process')
        .select('*')
        .eq('opportunity_id', opportunityId)
        .order('updated_at', { ascending: false });

      if (processError) throw processError;

      setShareAnalytics(shares || []);
      setInvestorProcess((processes || []).map(p => ({
        ...p,
        stage_history: typeof p.stage_history === 'string' 
          ? JSON.parse(p.stage_history) 
          : Array.isArray(p.stage_history) 
            ? p.stage_history 
            : []
      })));
    } catch (error) {
      console.error('Failed to load share analytics:', error);
      toast({
        title: "Loading Failed",
        description: "Failed to load sharing analytics.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const shareOpportunity = async (
    investors: Array<{ email: string; name?: string }>,
    shareMessage?: string,
    shareMethod: 'email' | 'link' = 'email'
  ) => {
    if (!opportunityId) return false;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('share-opportunity', {
        body: {
          opportunityId,
          investors,
          shareMessage,
          shareMethod
        }
      });

      if (error) throw error;

      toast({
        title: "Opportunity Shared",
        description: `Successfully shared with ${investors.length} investor(s).`
      });

      // Reload analytics
      await loadShareAnalytics();
      return true;
    } catch (error) {
      console.error('Share failed:', error);
      toast({
        title: "Share Failed",
        description: "Failed to share opportunity. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateInvestorStage = async (
    investorEmail: string,
    newStage: string,
    notes?: string
  ) => {
    if (!opportunityId) return false;

    try {
      const existingProcess = investorProcess.find(p => p.investor_email === investorEmail);
      const stageHistory = Array.isArray(existingProcess?.stage_history) 
        ? existingProcess.stage_history 
        : [];
      
      const newStageEntry = {
        stage: newStage,
        timestamp: new Date().toISOString(),
        notes: notes || null
      };

      const { error } = await supabase
        .from('opportunity_investor_process')
        .upsert({
          opportunity_id: opportunityId,
          investor_email: investorEmail,
          current_stage: newStage,
          stage_history: JSON.stringify([...stageHistory, newStageEntry]),
          notes
        });

      if (error) throw error;

      toast({
        title: "Stage Updated",
        description: `Investor stage updated to ${newStage.replace('_', ' ')}.`
      });

      // Reload analytics
      await loadShareAnalytics();
      return true;
    } catch (error) {
      console.error('Stage update failed:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update investor stage.",
        variant: "destructive"
      });
      return false;
    }
  };

  const getAnalyticsSummary = () => {
    const sent = shareAnalytics.filter(s => s.status === 'sent').length;
    const opened = shareAnalytics.filter(s => s.status === 'opened').length;
    const viewed = shareAnalytics.filter(s => s.status === 'viewed').length;
    const interested = investorProcess.filter(p => p.current_stage === 'interested').length;
    const invested = investorProcess.filter(p => p.current_stage === 'invested').length;

    return {
      sent,
      opened,
      viewed,
      interested,
      invested,
      openRate: sent > 0 ? Math.round((opened / sent) * 100) : 0,
      viewRate: sent > 0 ? Math.round((viewed / sent) * 100) : 0,
      conversionRate: sent > 0 ? Math.round((invested / sent) * 100) : 0
    };
  };

  useEffect(() => {
    if (opportunityId) {
      loadShareAnalytics();
    }
  }, [opportunityId]);

  return {
    shareAnalytics,
    investorProcess,
    isLoading,
    shareOpportunity,
    updateInvestorStage,
    loadShareAnalytics,
    getAnalyticsSummary
  };
}