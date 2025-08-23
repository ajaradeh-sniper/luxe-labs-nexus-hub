import { DashboardLayout } from '@/components/DashboardLayout';
import { FundPerformanceManagement } from '@/components/fund/FundPerformanceManagement';

export default function FundManagement() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <FundPerformanceManagement />
      </div>
    </DashboardLayout>
  );
}