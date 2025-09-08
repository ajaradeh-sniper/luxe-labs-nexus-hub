import { DashboardLayout } from '@/components/DashboardLayout';
import { ReferralSystem } from '@/components/ReferralSystem';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function Referrals() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <ReferralSystem />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}