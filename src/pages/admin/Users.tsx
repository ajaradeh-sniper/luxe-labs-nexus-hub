import { DashboardLayout } from '@/components/DashboardLayout';
import { UserManagement } from '@/components/admin/UserManagement';

export default function AdminUsers() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <UserManagement />
      </div>
    </DashboardLayout>
  );
}