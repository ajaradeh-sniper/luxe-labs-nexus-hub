
import { Building2, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useTranslation } from 'react-i18next'

export function Navigation() {
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
    { path: "/projects", label: t('navigation.projects') },
    { path: "/media", label: t('navigation.media') },
    { path: "/partners", label: t('navigation.partners') },
    { path: "/investors", label: t('navigation.investors') },
    { path: "/contact", label: t('navigation.contact') }
  ]
  
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" 
            alt="Luxury Labs Logo" 
            className="h-32 w-auto"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`transition-colors font-montserrat ${
                isActive(item.path) 
                  ? "text-primary font-medium" 
                  : "text-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitcher />
          {isAuthAvailable && user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, {user.name}
              </span>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground luxury-shadow">
                <Link to="/dashboard">
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  {t('navigation.dashboard')}
                </Link>
              </Button>
            </div>
          ) : (
            <Button asChild variant="luxury" className="luxury-shadow">
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
