import { DashboardLayout } from '@/components/DashboardLayout';
import { DocumentManagement } from '@/components/documents/DocumentManagement';

export default function Documents() {
  return (
    <DashboardLayout>
      <DocumentManagement />
    </DashboardLayout>
  );
}