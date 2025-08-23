import { DashboardLayout } from "@/components/DashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsCharts } from '@/components/analytics/AnalyticsCharts';
import { WebsiteAnalytics } from '@/components/analytics/WebsiteAnalytics';
import { ContactManagement } from '@/components/crm/ContactManagement';
import { BarChart3, Globe, Users } from 'lucide-react';

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Comprehensive analytics, traffic data, and customer relationship management</p>
          </div>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="traffic" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Traffic Analytics
            </TabsTrigger>
            <TabsTrigger value="crm" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              CRM
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsCharts />
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <WebsiteAnalytics />
          </TabsContent>

          <TabsContent value="crm" className="space-y-6">
            <ContactManagement />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default Analytics