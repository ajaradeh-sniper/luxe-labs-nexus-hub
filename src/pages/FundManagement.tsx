import { DashboardLayout } from '@/components/DashboardLayout';
import { FundPerformanceManagement } from '@/components/fund/FundPerformanceManagement';
import { useRoleSwitching } from '@/contexts/RoleSwitchingContext';

export default function FundManagement() {
  const { viewingRole } = useRoleSwitching();

  return (
    <DashboardLayout viewingRole={viewingRole}>
      <div className="container mx-auto p-6">
        <FundPerformanceManagement />
      </div>
    </DashboardLayout>
  );
}