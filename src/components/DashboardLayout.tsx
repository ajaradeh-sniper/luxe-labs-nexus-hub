import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { UserProfile } from "@/components/UserProfile"
import { NotificationBell } from "@/components/NotificationBell"
import { RealTimeStatus, OnlineUsers } from '@/components/realtime/RealTimeProvider'
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
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <img 
                    src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" 
                    alt="Luxury Labs Logo" 
                    className="h-10 w-auto cursor-pointer"
                  />
                </Link>
                <div className="flex items-center gap-2">
                  <div className="hidden md:block">
                    <h2 className="text-lg font-semibold text-foreground font-playfair">Luxury Labs Dashboard</h2>
                    <p className="text-sm text-muted-foreground font-montserrat">Manage your luxury real estate investments</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <OnlineUsers />
                <RealTimeStatus />
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