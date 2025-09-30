import { DashboardLayout } from '@/components/DashboardLayout';
import { VisualProjectManagement } from '@/components/admin/VisualProjectManagement';
import { Helmet } from 'react-helmet-async';

export default function ProjectsAdmin() {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Project Management | Luxury Labs Admin</title>
        <meta name="description" content="Visual project management dashboard for administrators" />
      </Helmet>
      
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            View and edit all projects with live updates
          </p>
        </div>

        <VisualProjectManagement />
      </div>
    </DashboardLayout>
  );
}
