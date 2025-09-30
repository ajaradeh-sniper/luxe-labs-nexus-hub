import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Building, 
  Users, 
  Target,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Temporary: bypass strict Supabase types for newly added tables
const sb = supabase as any;

interface AdvancedStats {
  totalRevenue: number;
  revenueGrowth: number;
  activeProjects: number;
  completedProjects: number;
  totalProperties: number;
  occupancyRate: number;
  upcomingDeadlines: number;
  riskAlerts: number;
}

export function AdvancedDashboard() {
  const [stats, setStats] = useState<AdvancedStats>({
    totalRevenue: 0,
    revenueGrowth: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalProperties: 0,
    occupancyRate: 0,
    upcomingDeadlines: 0,
    riskAlerts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvancedStats = async () => {
      try {
        // Fetch projects data
        const { data: projects } = await supabase
          .from('projects')
          .select('status, budget, actual_cost');

        // Fetch properties data
        const { data: properties } = await supabase
          .from('properties')
          .select('status, price');

        // Fetch opportunities data
        const { data: opportunities } = await sb
          .from('opportunities')
          .select('deadline, expected_roi, investment_required');

        // Calculate advanced metrics
        const activeProjects = projects?.filter(p => p.status === 'active').length || 0;
        const completedProjects = projects?.filter(p => p.status === 'completed').length || 0;
        const totalProperties = properties?.length || 0;
        const totalRevenue = projects?.reduce((sum, p) => sum + (p.budget || 0), 0) || 0;
        const occupiedProperties = properties?.filter(p => p.status === 'sold' || p.status === 'rented').length || 0;
        const occupancyRate = totalProperties > 0 ? (occupiedProperties / totalProperties) * 100 : 0;

        // Calculate upcoming deadlines (next 30 days)
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        const upcomingDeadlines = opportunities?.filter(o => 
          o.deadline && new Date(o.deadline) <= thirtyDaysFromNow
        ).length || 0;

        setStats({
          totalRevenue,
          revenueGrowth: 12.5, // Mock data - would calculate from historical data
          activeProjects,
          completedProjects,
          totalProperties,
          occupancyRate,
          upcomingDeadlines,
          riskAlerts: 3, // Mock data - would come from risk analysis
        });
      } catch (error) {
        console.error('Error fetching advanced stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvancedStats();
  }, []);

  if (loading) {
    return <div className="p-6">Loading advanced analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{stats.revenueGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <div className="text-xs text-muted-foreground">
              {stats.completedProjects} completed this quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupancyRate.toFixed(1)}%</div>
            <Progress value={stats.occupancyRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">{stats.riskAlerts} risks</Badge>
              <Badge variant="outline">{stats.upcomingDeadlines} deadlines</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On Time Delivery</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <Progress value={87} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Budget Adherence</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quality Score</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Property Sales</span>
                    <span className="text-sm font-medium">$2.4M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Project Development</span>
                    <span className="text-sm font-medium">$1.8M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Investment Returns</span>
                    <span className="text-sm font-medium">$950K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Consulting Services</span>
                    <span className="text-sm font-medium">$320K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+15.2%</div>
                  <div className="text-sm text-muted-foreground">Market Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$2.8M</div>
                  <div className="text-sm text-muted-foreground">Avg Property Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">23 days</div>
                  <div className="text-sm text-muted-foreground">Avg Time to Sale</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>6-Month Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Projected Revenue</span>
                  <span className="font-medium text-green-600">$8.2M (+12%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Expected Project Completions</span>
                  <span className="font-medium">15 projects</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>New Property Listings</span>
                  <span className="font-medium">32 properties</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Investment Opportunities</span>
                  <span className="font-medium">$12.5M pipeline</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}