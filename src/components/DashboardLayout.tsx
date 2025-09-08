import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { useAuth } from "@/contexts/AuthContext"
import { Navigation } from "@/components/Navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  viewingRole?: string
}

export function DashboardLayout({ children, viewingRole }: DashboardLayoutProps) {
  const { user } = useAuth()
  const effectiveRole = viewingRole || user?.role

  return (
    <div className="min-h-screen bg-background">
      <Navigation viewingRole={viewingRole} />
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar viewingRole={effectiveRole} />
          <div className="flex-1 flex flex-col">
            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}