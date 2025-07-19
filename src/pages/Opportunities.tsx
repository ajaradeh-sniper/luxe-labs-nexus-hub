import { DashboardLayout } from '@/components/DashboardLayout';
import { OpportunityManagement } from '@/components/opportunities/OpportunityManagement';

export default function Opportunities() {
  return (
    <DashboardLayout>
      <OpportunityManagement />
    </DashboardLayout>
  );
}