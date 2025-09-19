
import { Building2, LayoutDashboard, Eye, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { ThemeToggle } from "@/components/ThemeToggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useTranslation } from 'react-i18next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UserProfile } from "@/components/UserProfile"

interface NavigationProps {
  viewingRole?: string
}

export function Navigation({ viewingRole }: NavigationProps = {}) {
  const location = useLocation()
  const { t } = useTranslation()
  
  // Safely access auth context
  let user = null;
  let isAuthAvailable = true;
  
  try {
    const auth = useAuth();
    user = auth.user;
  } catch (error) {
    console.warn('Navigation: AuthProvider not available, continuing without auth features');
    isAuthAvailable = false;
  }
  
  const navItems = [
    { path: "/", label: t('navigation.home') },
    { path: "/about", label: t('navigation.about') },
    { path: "/services", label: t('navigation.services') },
    { path: "/media", label: t('navigation.media') },
    { path: "/partners", label: t('navigation.partners') },
    { path: "/investors", label: t('navigation.investors') },
    { path: "/contact", label: t('navigation.contact') }
  ]
  
  const isActive = (path: string) => location.pathname === path
  const isDashboardPage = location.pathname.startsWith('/dashboard') || 
                          location.pathname.startsWith('/admin') ||
                          location.pathname.startsWith('/opportunities') ||
                          location.pathname.startsWith('/fund-management') ||
                          location.pathname.startsWith('/analytics') ||
                          location.pathname.startsWith('/marketing') ||
                          location.pathname.startsWith('/financial') ||
                          location.pathname.startsWith('/documents') ||
                          location.pathname.startsWith('/referrals') ||
                          location.pathname.startsWith('/calendar') ||
                          location.pathname.startsWith('/reports') ||
                          location.pathname.startsWith('/qa') ||
                          location.pathname.startsWith('/agreements')

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          {isDashboardPage && (
            <SidebarTrigger className="p-2" />
          )}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" 
              alt="Luxury Labs Logo" 
              className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`transition-colors font-montserrat whitespace-nowrap ${
                isActive(item.path) 
                  ? "text-primary font-medium" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
          <ThemeToggle />
          <LanguageSwitcher />
          {isAuthAvailable && user ? (
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground luxury-shadow">
                      <Link to="/dashboard">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        {t('navigation.dashboard')}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to Dashboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <UserProfile />
            </div>
          ) : (
            <Button asChild variant="luxury" size="sm" className="luxury-shadow">
              <Link to="/auth">
                {t('navigation.signIn')}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
