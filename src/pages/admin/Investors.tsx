import { DashboardLayout } from '@/components/DashboardLayout';
import { InvestorManagement } from '@/components/admin/InvestorManagement';

export default function AdminInvestors() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <InvestorManagement />
      </div>
    </DashboardLayout>
  );
}