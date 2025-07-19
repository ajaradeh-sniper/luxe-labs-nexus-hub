import { DashboardLayout } from '@/components/DashboardLayout';
import { DetailedUserManagement } from '@/components/admin/DetailedUserManagement';

export default function AdminDetailedUsers() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <DetailedUserManagement />
      </div>
    </DashboardLayout>
  );
}