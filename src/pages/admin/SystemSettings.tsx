import { DashboardLayout } from '@/components/DashboardLayout';
import { SystemSettings } from '@/components/admin/SystemSettings';

export default function AdminSystemSettings() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <SystemSettings />
      </div>
    </DashboardLayout>
  );
}