import { DashboardLayout } from '@/components/DashboardLayout';
import { SystemOverview } from '@/components/admin/SystemOverview';

export default function AdminSystem() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <SystemOverview />
      </div>
    </DashboardLayout>
  );
}