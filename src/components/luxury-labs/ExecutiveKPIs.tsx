import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Building2, 
  DollarSign, 
  Calendar,
  Target,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

interface KPIData {
  activeProjects: number;
  pipelineValue: number;
  avgCPI: number;
  avgScheduleVariance: number;
  leadConversionRate: number;
  cashRunway: number;
}

export function ExecutiveKPIs() {
  const [kpiData, setKpiData] = useState<KPIData>({
    activeProjects: 0,
    pipelineValue: 0,
    avgCPI: 1,
    avgScheduleVariance: 0,
    leadConversionRate: 0,
    cashRunway: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKPIData();
  }, []);

  const fetchKPIData = async () => {
    try {
      // Fetch active projects count
      const { data: projects } = await supabase
        .from('ll_projects')
        .select('*')
        .in('status', ['planning', 'design', 'procurement', 'execution', 'furnishing', 'listing']);

      // Fetch pipeline value from qualified leads
      const { data: leads } = await supabase
        .from('ll_leads')
        .select('estimated_budget')
        .in('status', ['qualified', 'go_decision']);

      // Calculate conversion rate
      const { data: allLeads } = await supabase
        .from('ll_leads')
        .select('status');

      const qualifiedLeads = allLeads?.filter(l => 
        ['qualified', 'go_decision', 'converted', 'no_go'].includes(l.status)) || [];
      const convertedLeads = allLeads?.filter(l => l.status === 'converted') || [];
      
      const conversionRate = qualifiedLeads.length > 0 
        ? (convertedLeads.length / qualifiedLeads.length) * 100 
        : 0;

      const pipelineValue = leads?.reduce((sum, lead) => sum + (lead.estimated_budget || 0), 0) || 0;

      setKpiData({
        activeProjects: projects?.length || 0,
        pipelineValue,
        avgCPI: 0.98, // Mock data - would be calculated from actual budget vs actual costs
        avgScheduleVariance: 12.5, // Mock data - would be calculated from project timelines
        leadConversionRate: conversionRate,
        cashRunway: 120 // Mock data - would be calculated from cash flow projections
      });
    } catch (error) {
      console.error('Error fetching KPI data:', error);
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

  const getCPIStatus = (cpi: number) => {
    if (cpi >= 1.05) return { color: 'text-green-600', bg: 'bg-green-50', label: 'Excellent' };
    if (cpi >= 0.95) return { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Good' };
    if (cpi >= 0.90) return { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Caution' };
    return { color: 'text-red-600', bg: 'bg-red-50', label: 'Alert' };
  };

  const cpiStatus = getCPIStatus(kpiData.avgCPI);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* Active Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.activeProjects}</div>
          <p className="text-xs text-muted-foreground">
            Across all phases
          </p>
        </CardContent>
      </Card>

      {/* Pipeline Value */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(kpiData.pipelineValue)}</div>
          <p className="text-xs text-muted-foreground">
            Qualified leads
          </p>
        </CardContent>
      </Card>

      {/* Cash Runway */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cash Runway</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.cashRunway}d</div>
          <p className="text-xs text-muted-foreground">
            Current burn rate
          </p>
        </CardContent>
      </Card>

      {/* Average CPI */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg CPI</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">{kpiData.avgCPI.toFixed(2)}</div>
            <Badge variant="secondary" className={`${cpiStatus.bg} ${cpiStatus.color}`}>
              {cpiStatus.label}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Cost performance
          </p>
        </CardContent>
      </Card>

      {/* Average Schedule Variance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg SV%</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {kpiData.avgScheduleVariance > 0 ? '+' : ''}{kpiData.avgScheduleVariance.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Schedule variance
          </p>
        </CardContent>
      </Card>

      {/* Lead Conversion Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lead→Deal %</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpiData.leadConversionRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            Conversion rate
          </p>
        </CardContent>
      </Card>
    </div>
  );
}