
import { useState } from "react"
import { UnifiedDashboard } from "@/components/dashboards/UnifiedDashboard"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { DashboardLayout } from "@/components/DashboardLayout"
import { useRoleSwitching } from "@/contexts/RoleSwitchingContext"

export default function Dashboard() {
  const { viewingRole, setViewingRole } = useRoleSwitching()

  return (
    <ProtectedRoute>
      <DashboardLayout viewingRole={viewingRole}>
        <UnifiedDashboard viewingRole={viewingRole} onRoleChange={setViewingRole} />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
