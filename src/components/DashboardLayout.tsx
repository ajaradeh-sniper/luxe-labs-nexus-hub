import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { UserProfile } from "@/components/UserProfile"
import { NotificationBell } from "@/components/NotificationBell"
import { Button } from "@/components/ui/button"
import { Home, Building2 } from "lucide-react"

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
                <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary">
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Home</span>
                  </Link>
                </Button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 luxury-gradient rounded-lg flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="hidden md:block">
                    <h2 className="text-lg font-semibold text-foreground font-playfair">Luxury Labs Dashboard</h2>
                    <p className="text-sm text-muted-foreground font-montserrat">Manage your luxury real estate investments</p>
                  </div>
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