import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyManagement as AdminPropertyManagement } from '@/components/admin/PropertyManagement';
import { PropertyManagement as PortfolioPropertyManagement } from '@/components/properties/PropertyManagement';
import { OpportunityWorkflow } from '@/components/admin/OpportunityWorkflow';
import { Building, TrendingUp, Target } from 'lucide-react';

export default function AdminProperties() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Property Management</h1>
            <p className="text-muted-foreground">Manage properties, portfolio, and real estate assets</p>
          </div>
        </div>

        <Tabs defaultValue="management" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="management" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Property Management
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Opportunities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="management" className="space-y-6">
            <AdminPropertyManagement />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <PortfolioPropertyManagement />
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <OpportunityWorkflow />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}