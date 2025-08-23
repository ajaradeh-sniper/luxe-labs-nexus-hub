import { DashboardLayout } from '@/components/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SystemSettings as SystemSettingsComponent } from '@/components/admin/SystemSettings';
import { SystemOverview } from '@/components/admin/SystemOverview';
import { Settings, BarChart3 } from 'lucide-react';

export default function AdminSystemSettings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Settings</h1>
            <p className="text-muted-foreground">Manage system configuration and monitor system health</p>
          </div>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              System Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <SystemSettingsComponent />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <SystemOverview />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}