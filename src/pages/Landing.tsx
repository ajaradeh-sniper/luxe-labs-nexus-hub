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

      {/* Services Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-foreground mb-6">
              Our <span className="bg-gradient-luxury bg-clip-text text-transparent">Premium Services</span>
            </h2>
            <p className="text-xl font-playfair text-muted-foreground max-w-3xl mx-auto">
              Discover how Luxury Labs transforms Dubai's real estate landscape through our three core specializations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Unique Properties Selection */}
            <div className="group cursor-pointer">
              <div className="bg-card border border-border rounded-xl p-8 hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                  Unique Properties Selection
                </h3>
                <p className="text-muted-foreground font-playfair leading-relaxed mb-6">
                  Curating Dubai's rarest addresses. We identify exceptional properties in prime locations like Palm Jumeirah, offering exclusive access to luxury real estate opportunities.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Prime waterfront locations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Exclusive off-market properties
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Expert market analysis
                  </li>
                </ul>
              </div>
            </div>

            {/* Luxury Transformation */}
            <div className="group cursor-pointer">
              <div className="bg-card border border-border rounded-xl p-8 hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-luxury rounded-xl flex items-center justify-center mb-6">
                  <div className="text-white font-bold text-xl">LL</div>
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                  The LL Signature Transformation
                </h3>
                <p className="text-muted-foreground font-playfair leading-relaxed mb-6">
                  Our signature renovation process elevates properties to luxury standards. From design to execution, we create bespoke living spaces that maximize value and appeal.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Bespoke interior design
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Premium material selection
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Project management excellence
                  </li>
                </ul>
              </div>
            </div>

            {/* Exceptional Returns */}
            <div className="group cursor-pointer">
              <div className="bg-card border border-border rounded-xl p-8 hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-white font-bold text-2xl">%</div>
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">
                  Exceptional Returns
                </h3>
                <p className="text-muted-foreground font-playfair leading-relaxed mb-6">
                  Where investments reach new heights. Our strategic approach delivers superior ROI through careful market timing, premium transformations, and expert sales execution.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Target 30%+ ROI
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Strategic market timing
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Premium sales execution
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}