import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Building2, 
  DollarSign, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { ExecutiveKPIs } from '@/components/luxury-labs/ExecutiveKPIs';
import { ProjectStatusCards } from '@/components/luxury-labs/ProjectStatusCards';
import { PipelineFunnel } from '@/components/luxury-labs/PipelineFunnel';
import { CashflowChart } from '@/components/luxury-labs/CashflowChart';

export default function Executive() {
  const [dateRange, setDateRange] = useState('30d');
  const [assetType, setAssetType] = useState('all');
  const [tier, setTier] = useState('all');

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
            <p className="text-muted-foreground">
              Luxury Labs operating performance and portfolio overview
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Filters:</span>
            <Badge variant="secondary">{dateRange}</Badge>
            <Badge variant="secondary">{assetType === 'all' ? 'All Assets' : assetType}</Badge>
            <Badge variant="secondary">{tier === 'all' ? 'All Tiers' : tier}</Badge>
          </div>
        </div>

        {/* Executive KPIs */}
        <ExecutiveKPIs />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline Funnel */}
          <div className="lg:col-span-1">
            <PipelineFunnel />
          </div>

          {/* Project Status Cards */}
          <div className="lg:col-span-2">
            <ProjectStatusCards />
          </div>
        </div>

        {/* Cashflow and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CashflowChart />
          
          {/* Alerts & Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                Alerts & Actions Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-red-800">Marina Tower: CPI &lt; 0.9</p>
                    <p className="text-sm text-red-600">Cost overrun detected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-yellow-800">Palm Villa: SV &gt; 15%</p>
                    <p className="text-sm text-yellow-600">Schedule variance high</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-blue-800">5 New Qualified Leads</p>
                    <p className="text-sm text-blue-600">Pending review this week</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="font-medium">Downtown Quick Flip - Project Completed</p>
                  <p className="text-sm text-muted-foreground">Final handover completed, ROI: 26.3%</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">Marina Tower - Kitchen Installation Complete</p>
                  <p className="text-sm text-muted-foreground">Moving to bathroom phase, 75% complete</p>
                </div>
                <span className="text-sm text-muted-foreground">1 day ago</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Target className="h-5 w-5 text-purple-500" />
                <div className="flex-1">
                  <p className="font-medium">New Lead: Business Bay Apartment</p>
                  <p className="text-sm text-muted-foreground">85 sqm, estimated budget AED 120k</p>
                </div>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}