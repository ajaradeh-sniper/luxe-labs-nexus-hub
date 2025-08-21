import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, MessageSquare } from "lucide-react"
import { NotificationDrawer } from "@/components/NotificationDrawer"
import { useNavigate } from "react-router-dom"

interface DashboardLayoutProps {
  children: React.ReactNode
  viewingRole?: string
}

export function DashboardLayout({ children, viewingRole }: DashboardLayoutProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const effectiveRole = viewingRole || user?.role

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar viewingRole={effectiveRole} />
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Header */}
          <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              {/* Logo - Home Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2 hover:bg-accent"
                onClick={() => navigate('/')}
              >
                <img 
                  src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png"
                  alt="Luxury Labs" 
                  className="h-8 w-auto" 
                />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <NotificationDrawer />
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
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