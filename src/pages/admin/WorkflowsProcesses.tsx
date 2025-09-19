import { ProtectedRoute } from '@/components/ProtectedRoute'
import { DashboardLayout } from '@/components/DashboardLayout'
import { WorkflowsDashboard } from '@/components/admin/WorkflowsDashboard'
import { Helmet } from 'react-helmet-async'

export default function WorkflowsProcesses() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Helmet>
          <title>Workflows & Processes | Luxury Labs Admin Dashboard</title>
          <meta name="description" content="Manage and monitor workflows across all user types and processes" />
        </Helmet>
        <WorkflowsDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  )
}