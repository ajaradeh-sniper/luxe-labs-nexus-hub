import { DashboardLayout } from '@/components/DashboardLayout';
import { SubmissionReview } from '@/components/admin/SubmissionReview';
import { RoleBasedRoute } from '@/components/RoleBasedRoute';

export default function AdminSubmissionReview() {
  return (
    <RoleBasedRoute allowedRoles={['administrator']}>
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <SubmissionReview />
        </div>
      </DashboardLayout>
    </RoleBasedRoute>
  );
}