import { Building2, Users, Handshake, Award, CheckCircle, ArrowRight, Star, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import { useAuth } from "@/contexts/AuthContext"
import dubaiMarinaImage from "@/assets/dubai-marina-luxury.jpg"
import businessBayImage from "@/assets/business-bay.jpg"
import downtownLuxuryImage from "@/assets/downtown-luxury.jpg"
import investmentPartnershipImage from "@/assets/investment-partnership-handshake.jpg"
import luxuryGlassWork from "@/assets/luxury-glass-work.jpg"
import luxuryWoodwork from "@/assets/luxury-woodwork.jpg"
import luxuryOutdoorVase from "@/assets/luxury-outdoor-vase.jpg"
import luxurySpeaker from "@/assets/luxury-speaker.jpg"
import luxuryArt from "@/assets/luxury-art.jpg"
import luxuryMarbleStone from "@/assets/luxury-marble-stone.jpg"
import architectDesigning from "@/assets/architect-designing.jpg"
import contractorDrilling from "@/assets/contractor-drilling.jpg"
import projectManagerTimeline from "@/assets/project-manager-timeline.jpg"
import palmVillaForSale from "@/assets/palm-villa-for-sale.jpg"
import emaarConstructionSite from "@/assets/emaar-construction-site.jpg"
import securityGuardGolfHouse from "@/assets/security-guard-golf-house.jpg"
import espaceLogo from "@/assets/espace-logo.png"
import barovieTosoLogo from "@/assets/barovie-toso-logo.png"
import linealightLogo from "@/assets/linealight-logo.png"
import boseLogo from "@/assets/bose-logo.png"
import venetacucineLogo from "@/assets/venetacucine-logo.png"
import prestigeLogo from "@/assets/prestige-logo.png"

export default function Partners() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaiMarinaImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
        <div className="relative container mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">Strategic Partnerships</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Building success through trusted partnerships with leading real estate professionals, 
            design experts, and luxury service providers across Dubai's premium market.
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">

          {/* Partnership Types */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-playfair">Real Estate Partners</h3>
                  </div>
                  <p className="text-muted-foreground font-montserrat mb-4 leading-relaxed">
                    Premier real estate agencies and property developers providing exclusive access to off-market luxury properties across Dubai's most prestigious locations including Downtown, Palm Jumeirah, and Dubai Marina.
                  </p>
                </div>
                
                {/* Grid of real estate images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img 
                      src={palmVillaForSale} 
                      alt="Luxury palm villa with FOR SALE board sign"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-white text-sm font-medium">Palm Villa For Sale</span>
                    </div>
                  </div>
                  
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img 
                      src={emaarConstructionSite} 
                      alt="EMAAR construction site with logo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-white text-sm font-medium">EMAAR Development</span>
                    </div>
                  </div>
                  
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img 
                      src={securityGuardGolfHouse} 
                      alt="Security guard by golf course luxury house"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-white text-sm font-medium">Golf Course Property</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-playfair">Service Providers</h3>
                  </div>
                  <p className="text-muted-foreground font-montserrat mb-4 leading-relaxed">
                    Elite contractors, interior designers, architects, and luxury specialists delivering world-class transformation services with meticulous attention to detail and uncompromising quality standards.
                  </p>
                </div>
                
                {/* Grid of service provider types */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img 
                      src={architectDesigning} 
                      alt="Professional architect designing luxury building plans"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-white text-sm font-medium">Architect Designing</span>
                    </div>
                  </div>
                  
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img 
                      src={contractorDrilling} 
                      alt="Construction contractor drilling on luxury building site"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-white text-sm font-medium">Contractor On Site</span>
                    </div>
                  </div>
                  
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <img 
                      src={projectManagerTimeline} 
                      alt="Project manager reviewing timeline charts and planning schedules"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-white text-sm font-medium">Project Timeline</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center">
                      <Handshake className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-playfair">Investment Partners</h3>
                  </div>
                  <p className="text-muted-foreground font-montserrat mb-4 leading-relaxed">
                    Strategic financial partners including banks, private equity firms, family offices, and law firms who provide capital, expertise, and legal guidance for large-scale luxury property transformation projects.
                  </p>
                </div>
                
                {/* Grid of investment partner types */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${businessBayImage})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-800/90" />
                    </div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Building2 className="h-8 w-8 mx-auto mb-2" />
                        <span className="text-sm font-medium">International Banks</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${downtownLuxuryImage})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-green-800/90" />
                    </div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Users className="h-8 w-8 mx-auto mb-2" />
                        <span className="text-sm font-medium">Private Equity</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative h-32 rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${dubaiMarinaImage})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-purple-800/90" />
                    </div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Award className="h-8 w-8 mx-auto mb-2" />
                        <span className="text-sm font-medium">Law Firms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-playfair">Luxury Suppliers</h3>
                  </div>
                  <p className="text-muted-foreground font-montserrat mb-4 leading-relaxed">
                    Premium suppliers of luxury materials, bespoke furniture, high-end hardware, and state-of-the-art equipment sourced from renowned international brands and master craftsmen worldwide.
                  </p>
                </div>
                
                {/* Grid of luxury items */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4">
                  <div className="relative h-24 rounded-lg overflow-hidden">
                    <img 
                      src={luxuryGlassWork} 
                      alt="Premium luxury glass work"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1 left-1">
                      <span className="text-white text-xs font-medium">Glass Work</span>
                    </div>
                  </div>
                  
                  <div className="relative h-24 rounded-lg overflow-hidden">
                    <img 
                      src={luxuryWoodwork} 
                      alt="Luxury woodwork craftsmanship"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1 left-1">
                      <span className="text-white text-xs font-medium">Woodwork</span>
                    </div>
                  </div>
                  
                  <div className="relative h-24 rounded-lg overflow-hidden">
                    <img 
                      src={luxuryOutdoorVase} 
                      alt="Expensive outdoor luxury vase"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1 left-1">
                      <span className="text-white text-xs font-medium">Outdoor Vase</span>
                    </div>
                  </div>
                  
                  <div className="relative h-24 rounded-lg overflow-hidden">
                    <img 
                      src={luxurySpeaker} 
                      alt="High-end luxury speaker system"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1 left-1">
                      <span className="text-white text-xs font-medium">Audio System</span>
                    </div>
                  </div>
                  
                  <div className="relative h-24 rounded-lg overflow-hidden">
                    <img 
                      src={luxuryArt} 
                      alt="Expensive luxury art collection"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1 left-1">
                      <span className="text-white text-xs font-medium">Art Collection</span>
                    </div>
                  </div>
                  
                  <div className="relative h-24 rounded-lg overflow-hidden">
                    <img 
                      src={luxuryMarbleStone} 
                      alt="Luxury marble and stone work"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1 left-1">
                      <span className="text-white text-xs font-medium">Marble & Stone</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partnership Benefits */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-playfair">Partnership Benefits</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 luxury-gradient rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground font-playfair">For Service Providers</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Access to premium luxury projects",
                      "Guaranteed payment terms",
                      "Long-term partnership opportunities",
                      "Marketing and brand exposure",
                      "Professional development support"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-montserrat">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 luxury-gradient rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground font-playfair">For Real Estate Partners</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Exclusive off-market opportunities",
                      "Preferred buyer status",
                      "Fast transaction processing",
                      "Volume-based incentives",
                      "Market insights and analytics"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-montserrat">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Premium Network of Luxury Suppliers - Only visible when logged in */}
          {user && (
            <div className="mb-20">
              <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-playfair">Premium Network of Luxury Suppliers (Some of our Partners)</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { 
                    name: "ESPACE.AE", 
                    category: "Real Estate",
                    logo: espaceLogo,
                    description: "Premium real estate services and property management"
                  },
                  { 
                    name: "Barovie&Toso", 
                    category: "Luxury Venetian Glass",
                    logo: barovieTosoLogo,
                    description: "Exquisite Venetian glass craftsmanship and lighting"
                  },
                  { 
                    name: "Linealight", 
                    category: "Lighting",
                    logo: linealightLogo,
                    description: "Contemporary lighting solutions and design"
                  },
                  { 
                    name: "Bose", 
                    category: "Audio",
                    logo: boseLogo,
                    description: "Premium audio systems and sound technology"
                  },
                  { 
                    name: "Venetacucine.com", 
                    category: "Kitchens",
                    logo: venetacucineLogo,
                    description: "Italian luxury kitchen design and manufacturing"
                  },
                  { 
                    name: "Prestige", 
                    category: "Luxury Contractor",
                    logo: prestigeLogo,
                    description: "High-end construction and renovation services"
                  }
                ].map((partner, index) => (
                  <Card key={index} className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
                    <CardContent className="p-0 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <img 
                          src={partner.logo} 
                          alt={`${partner.name} logo`}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h4 className="font-bold text-foreground mb-2 font-playfair">{partner.name}</h4>
                      <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 mb-3">
                        {partner.category}
                      </Badge>
                      <p className="text-sm text-muted-foreground font-montserrat">
                        {partner.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Join Our Network */}
          <div className="text-center">
            <Card className="p-12 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm max-w-4xl mx-auto">
              <CardContent className="p-0">
                <h2 className="text-4xl font-bold text-foreground mb-6 font-playfair">Join Our Partner Network</h2>
                <p className="text-xl text-muted-foreground mb-8 font-montserrat max-w-2xl mx-auto">
                  Ready to collaborate on luxury property transformations? Join our exclusive network of 
                  trusted partners and access premium opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="luxury-gradient text-primary-foreground font-montserrat tracking-wide luxury-shadow">
                    <Link to="/contact">
                      Become a Partner
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}