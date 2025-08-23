import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FunnelData {
  stage: string;
  count: number;
  value: number;
  conversionRate?: number;
  icon: React.ReactNode;
  color: string;
}

export function PipelineFunnel() {
  const [funnelData, setFunnelData] = useState<FunnelData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFunnelData();
  }, []);

  const fetchFunnelData = async () => {
    try {
      const { data: leads, error } = await supabase
        .from('ll_leads')
        .select('status, estimated_budget, source');

      if (error) throw error;

      // Calculate funnel metrics
      const totalLeads = leads?.length || 0;
      const newLeads = leads?.filter(l => l.status === 'new').length || 0;
      const qualifiedLeads = leads?.filter(l => l.status === 'qualified').length || 0;
      const goDecision = leads?.filter(l => l.status === 'go_decision').length || 0;
      const converted = leads?.filter(l => l.status === 'converted').length || 0;

      // Calculate values
      const newLeadsValue = leads?.filter(l => l.status === 'new')
        .reduce((sum, l) => sum + (l.estimated_budget || 0), 0) || 0;
      const qualifiedValue = leads?.filter(l => l.status === 'qualified')
        .reduce((sum, l) => sum + (l.estimated_budget || 0), 0) || 0;
      const goDecisionValue = leads?.filter(l => l.status === 'go_decision')
        .reduce((sum, l) => sum + (l.estimated_budget || 0), 0) || 0;
      const convertedValue = leads?.filter(l => l.status === 'converted')
        .reduce((sum, l) => sum + (l.estimated_budget || 0), 0) || 0;

      const funnel: FunnelData[] = [
        {
          stage: 'New Leads',
          count: newLeads,
          value: newLeadsValue,
          icon: <Users className="h-4 w-4" />,
          color: 'bg-blue-100 text-blue-800'
        },
        {
          stage: 'Qualified',
          count: qualifiedLeads,
          value: qualifiedValue,
          conversionRate: totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0,
          icon: <Target className="h-4 w-4" />,
          color: 'bg-green-100 text-green-800'
        },
        {
          stage: 'Go Decision',
          count: goDecision,
          value: goDecisionValue,
          conversionRate: qualifiedLeads > 0 ? (goDecision / qualifiedLeads) * 100 : 0,
          icon: <TrendingUp className="h-4 w-4" />,
          color: 'bg-purple-100 text-purple-800'
        },
        {
          stage: 'Converted',
          count: converted,
          value: convertedValue,
          conversionRate: goDecision > 0 ? (converted / goDecision) * 100 : 0,
          icon: <CheckCircle className="h-4 w-4" />,
          color: 'bg-emerald-100 text-emerald-800'
        }
      ];

      setFunnelData(funnel);
    } catch (error) {
      console.error('Error fetching funnel data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Pipeline Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelData.map((stage, index) => (
            <div key={stage.stage} className="relative">
              {/* Funnel Stage */}
              <div 
                className={`rounded-lg border p-4 ${index === 0 ? 'w-full' : `w-[${100 - index * 15}%]`} transition-all`}
                style={{ width: `${100 - index * 15}%` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className={stage.color}>
                      {stage.icon}
                    </Badge>
                    <div>
                      <h3 className="font-medium text-sm">{stage.stage}</h3>
                      <p className="text-xs text-muted-foreground">
                        {stage.count} leads • {formatCurrency(stage.value)}
                      </p>
                    </div>
                  </div>
                  {stage.conversionRate !== undefined && (
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {stage.conversionRate.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        conversion
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Arrow */}
              {index < funnelData.length - 1 && (
                <div className="flex justify-center mt-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">
                {funnelData.reduce((sum, stage) => sum + stage.count, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Leads</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                {formatCurrency(funnelData.reduce((sum, stage) => sum + stage.value, 0))}
              </div>
              <div className="text-xs text-muted-foreground">Total Value</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}