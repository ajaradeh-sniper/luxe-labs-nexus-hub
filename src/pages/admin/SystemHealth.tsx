import { DashboardLayout } from '@/components/DashboardLayout';
import { SystemHealthMonitor } from '@/components/admin/SystemHealthMonitor';

export default function AdminSystemHealth() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <SystemHealthMonitor />
      </div>
    </DashboardLayout>
  );
}