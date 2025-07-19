import { DashboardLayout } from '@/components/DashboardLayout';
import { PropertyManagement } from '@/components/admin/PropertyManagement';

export default function AdminProperties() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <PropertyManagement />
      </div>
    </DashboardLayout>
  );
}