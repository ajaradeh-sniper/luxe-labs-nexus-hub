import { ReactNode } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { UserProfile } from "@/components/UserProfile"
import { NotificationBell } from "@/components/NotificationBell"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-accent rounded-lg p-2" />
                <div className="hidden md:block">
                  <h2 className="text-lg font-semibold text-foreground">Luxury Labs Dashboard</h2>
                  <p className="text-sm text-muted-foreground">Manage your luxury real estate investments</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <NotificationBell />
                <UserProfile />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}