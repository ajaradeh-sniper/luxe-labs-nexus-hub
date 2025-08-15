
import { useState } from "react"
import { UnifiedDashboard } from "@/components/dashboards/UnifiedDashboard"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { DashboardLayout } from "@/components/DashboardLayout"
import { useAuth } from "@/contexts/AuthContext"

export default function Dashboard() {
  const { user } = useAuth()
  const [viewingRole, setViewingRole] = useState<string>(user?.role || 'administrator')

  return (
    <ProtectedRoute>
      <DashboardLayout viewingRole={viewingRole}>
        <UnifiedDashboard viewingRole={viewingRole} onRoleChange={setViewingRole} />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
