
import { useState } from "react"
import { UnifiedDashboard } from "@/components/dashboards/UnifiedDashboard"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { DashboardLayout } from "@/components/DashboardLayout"
import { useRoleSwitching } from "@/contexts/RoleSwitchingContext"
import { useAuth } from "@/contexts/AuthContext"
import ClientDashboard from "./ClientDashboard"

export default function Dashboard() {
  const { viewingRole, setViewingRole } = useRoleSwitching()
  const { user } = useAuth()

  // If the user is a client, render the dedicated Client Dashboard (full layout)
  if (user?.role === 'client') {
    return (
      <ProtectedRoute>
        <ClientDashboard />
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <DashboardLayout viewingRole={viewingRole}>
        <UnifiedDashboard viewingRole={viewingRole} onRoleChange={setViewingRole} />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
