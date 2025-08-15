import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { useAuth } from "@/contexts/AuthContext"

interface DashboardLayoutProps {
  children: React.ReactNode
  viewingRole?: string
}

export function DashboardLayout({ children, viewingRole }: DashboardLayoutProps) {
  const { user } = useAuth()
  const effectiveRole = viewingRole || user?.role

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar viewingRole={effectiveRole} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}