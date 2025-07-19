import { Building2, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { LoginDialog } from "@/components/LoginDialog"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useTranslation } from 'react-i18next'

export function Navigation() {
  const { user } = useAuth()
  const location = useLocation()
  const { t } = useTranslation()
  
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
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center">
            <img 
              src="/lovable-uploads/d2dfa4c3-7fd3-40db-af51-ad041d2b2ce2.png" 
              alt="Luxury Labs Logo" 
              className="h-10 w-auto"
            />
          </div>
          <div>
            <div className="font-bold text-2xl text-foreground tracking-tight font-playfair">LUXURY LABS</div>
            <div className="text-xs text-primary uppercase tracking-widest font-medium font-montserrat">Property Solutions</div>
          </div>
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
          {user ? (
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground luxury-shadow">
              <Link to="/dashboard">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                {t('navigation.dashboard')}
              </Link>
            </Button>
          ) : (
            <LoginDialog />
          )}
        </div>
      </div>
    </nav>
  )
}