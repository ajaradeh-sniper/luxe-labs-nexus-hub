import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimelinePlanning } from '@/components/projectManagement/TimelinePlanning';
import { CostManagement } from '@/components/projectManagement/CostManagement';
import { RiskManagement } from '@/components/projectManagement/RiskManagement';
import { TenderManagement } from '@/components/projectManagement/TenderManagement';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, DollarSign, AlertTriangle, FileText, BarChart3 } from 'lucide-react';

export default function ProjectManagement() {
  const { user } = useAuth();

  // Check if user has access to project management tools
  const hasAccess = user?.role === 'administrator' || user?.role === 'project_manager';

  if (!hasAccess) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p className="text-muted-foreground">
            You don't have permission to access project management tools.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Comprehensive project management tools for timeline, costs, risks, and tenders
          </p>
        </div>

        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Costs
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risks
            </TabsTrigger>
            <TabsTrigger value="tenders" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tenders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            <TimelinePlanning />
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <CostManagement />
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <RiskManagement />
          </TabsContent>

          <TabsContent value="tenders" className="space-y-6">
            <TenderManagement />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
                <h3 className="text-lg font-semibold mb-2">Project Health Score</h3>
                <div className="text-3xl font-bold">85%</div>
                <p className="text-sm opacity-90">Based on timeline, budget, and risk factors</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg text-white">
                <h3 className="text-lg font-semibold mb-2">Budget Performance</h3>
                <div className="text-3xl font-bold">92%</div>
                <p className="text-sm opacity-90">On track with projected spending</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-lg text-white">
                <h3 className="text-lg font-semibold mb-2">Risk Exposure</h3>
                <div className="text-3xl font-bold">Medium</div>
                <p className="text-sm opacity-90">3 high-priority risks identified</p>
              </div>
            </div>
            
            <div className="text-center py-12 text-muted-foreground">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
              <p>Comprehensive project analytics, predictive insights, and performance dashboards</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}