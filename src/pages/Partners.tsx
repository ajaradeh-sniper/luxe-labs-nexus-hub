import { Building2, Users, Handshake, Award, CheckCircle, ArrowRight, Star, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import dubaiMarinaImage from "@/assets/dubai-marina-luxury.jpg"
import investmentPartnershipImage from "@/assets/investment-partnership-handshake.jpg"

export default function Partners() {
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
                <div className="relative h-48">
                  <img 
                    src={dubaiMarinaImage} 
                    alt="Luxury real estate properties in Dubai"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mb-3">
                      <Building2 className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-playfair">Real Estate Partners</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground font-montserrat mb-4 leading-relaxed">
                    Premier real estate agencies and property developers providing exclusive access to off-market luxury properties across Dubai's most prestigious locations including Downtown, Palm Jumeirah, and Dubai Marina.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground font-montserrat">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Exclusive off-market property access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Pre-construction investment opportunities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Premium location portfolio</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Market analysis and insights</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <img 
                    src="/lovable-uploads/professional-team.jpg" 
                    alt="Professional service providers and contractors"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mb-3">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-playfair">Service Providers</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground font-montserrat mb-4 leading-relaxed">
                    Elite contractors, interior designers, architects, and luxury specialists delivering world-class transformation services with meticulous attention to detail and uncompromising quality standards.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground font-montserrat">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Licensed luxury contractors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Award-winning interior designers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Certified project managers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Smart home technology experts</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <img 
                    src={investmentPartnershipImage} 
                    alt="Investment partnership handshake with cash background and high ROI charts"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mb-3">
                      <Handshake className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-playfair">Investment Partners</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground font-montserrat mb-4 leading-relaxed">
                    Strategic financial partners including private equity firms, family offices, and institutional investors who provide capital and expertise for large-scale luxury property transformation projects.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground font-montserrat">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Private equity partnerships</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Family office collaborations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Joint venture opportunities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Structured financing solutions</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48">
                  <img 
                    src="/lovable-uploads/luxury-finishes-install-thumbnail.jpg" 
                    alt="Luxury materials and premium finishes"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mb-3">
                      <Package className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-playfair">Luxury Suppliers</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground font-montserrat mb-4 leading-relaxed">
                    Premium suppliers of luxury materials, bespoke furniture, high-end hardware, and state-of-the-art equipment sourced from renowned international brands and master craftsmen worldwide.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground font-montserrat">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Italian marble & premium stone</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Bespoke furniture collections</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Smart home automation systems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Luxury appliance partnerships</span>
                    </li>
                  </ul>
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

          {/* Featured Partners */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-playfair">Featured Partners</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Elite Properties Dubai", category: "Real Estate" },
                { name: "Luxury Design Studio", category: "Interior Design" },
                { name: "Premium Construction", category: "Contractors" },
                { name: "Dubai Investment Group", category: "Financial" },
                { name: "High-End Furnishings", category: "Suppliers" },
                { name: "Marble & Stone Co.", category: "Materials" },
                { name: "Smart Home Solutions", category: "Technology" },
                { name: "Landscape Architects", category: "Outdoor Design" }
              ].map((partner, index) => (
                <Card key={index} className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
                  <CardContent className="p-0 text-center">
                    <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2 font-playfair">{partner.name}</h4>
                    <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                      {partner.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

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