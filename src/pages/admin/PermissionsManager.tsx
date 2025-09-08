import { DashboardLayout } from '@/components/DashboardLayout';
import { PermissionsManager } from '@/components/admin/PermissionsManager';
import { RoleBasedRoute } from '@/components/RoleBasedRoute';

export default function AdminPermissionsManager() {
  return (
    <RoleBasedRoute allowedRoles={['administrator']}>
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <PermissionsManager />
        </div>
      </DashboardLayout>
    </RoleBasedRoute>
  );
}