import { Building2, Users, Handshake, Award, CheckCircle, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Navigation } from "@/components/Navigation"

export default function Partners() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Partners Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 px-6 py-2 text-primary border-primary/30 bg-primary/5 font-montserrat">
              Our Network
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 font-playfair leading-tight">
              Strategic <span className="luxury-text">Partnerships</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-montserrat max-w-3xl mx-auto">
              Building success through trusted partnerships with leading real estate professionals, 
              design experts, and luxury service providers across Dubai's premium market.
            </p>
          </div>

          {/* Partnership Types */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-playfair">Real Estate Partners</h3>
                <p className="text-muted-foreground font-montserrat">
                  Premium real estate agencies and property developers providing exclusive access to luxury properties
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-playfair">Service Providers</h3>
                <p className="text-muted-foreground font-montserrat">
                  Elite contractors, designers, and specialists delivering exceptional luxury transformation services
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <Handshake className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 font-playfair">Investment Partners</h3>
                <p className="text-muted-foreground font-montserrat">
                  Financial institutions and private investors supporting our luxury property transformation projects
                </p>
              </CardContent>
            </Card>
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