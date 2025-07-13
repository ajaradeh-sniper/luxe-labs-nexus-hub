import { Building2, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import heroImage from "@/assets/luxury-labs-hero-refined.jpg"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-luxury rounded-xl flex items-center justify-center shadow-glow">
              <Building2 className="h-6 w-6 text-background" />
            </div>
            <div>
              <div className="font-bold text-2xl text-foreground tracking-tight">LUXURY LABS</div>
              <div className="text-xs text-primary uppercase tracking-widest font-medium">Property Solutions</div>
            </div>
          </div>
          
          {/* Dashboard Icon */}
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background">
              <Link to="/dashboard">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="py-32 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-montserrat font-bold mb-8 text-white drop-shadow-2xl">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">LUXURY LABS</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-lg">
            Premier property transformation and investment solutions in Dubai
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="text-xl px-12 py-6 font-montserrat font-semibold bg-gradient-luxury hover:shadow-glow">
              <Link to="/dashboard">
                <LayoutDashboard className="mr-3 h-6 w-6" />
                Access Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-xl px-12 py-6 font-montserrat font-semibold border-white text-white hover:bg-white hover:text-black">
              <Link to="/">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}