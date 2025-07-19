import { Building2, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { LoginDialog } from "@/components/LoginDialog"

export function Navigation() {
  const { user } = useAuth()
  const location = useLocation()
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/media", label: "Media" },
    { path: "/partners", label: "Partners" },
    { path: "/investors", label: "Investors" },
    { path: "/contact", label: "Contact" }
  ]
  
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 luxury-gradient rounded-xl flex items-center justify-center luxury-shadow">
            <Building2 className="h-6 w-6 text-primary-foreground" />
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
          {user ? (
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground luxury-shadow">
              <Link to="/dashboard">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Dashboard
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