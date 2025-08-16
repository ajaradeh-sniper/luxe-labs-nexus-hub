import { TrendingUp, Shield, Users, DollarSign, BarChart3, Award, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import businessBayImage from "@/assets/business-bay.jpg"
import downtownImage from "@/assets/downtown-luxury.jpg"
import marinaTowerImage from "@/assets/marina-tower.jpg"
import dubaiMarinaImage from "@/assets/dubai-marina-luxury.jpg"

export default function Investors() {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">Investment Opportunities</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Join sophisticated investors in Dubai's luxury property transformation market. 
            Access curated opportunities with projected returns of 25-35% through our expert-managed portfolio.
          </p>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <Card className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 font-playfair">30%</div>
                <p className="text-sm text-muted-foreground font-montserrat">Average ROI</p>
              </CardContent>
            </Card>

            <Card className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 font-playfair">50+</div>
                <p className="text-sm text-muted-foreground font-montserrat">Completed Projects</p>
              </CardContent>
            </Card>

            <Card className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 font-playfair">500M</div>
                <p className="text-sm text-muted-foreground font-montserrat">AED Managed</p>
              </CardContent>
            </Card>

            <Card className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-12 h-12 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 font-playfair">200+</div>
                <p className="text-sm text-muted-foreground font-montserrat">Active Investors</p>
              </CardContent>
            </Card>
          </div>


          {/* Current Opportunities */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-playfair">Current Opportunities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Downtown Premium Villa",
                  location: "Downtown Dubai",
                  investment: "AED 2.5M",
                  returns: "32%",
                  timeline: "8 months",
                  image: downtownImage,
                  status: "75% Funded"
                },
                {
                  title: "Marina Luxury Penthouse",
                  location: "Dubai Marina",
                  investment: "AED 1.8M",
                  returns: "28%",
                  timeline: "6 months",
                  image: marinaTowerImage,
                  status: "Available"
                },
                {
                  title: "Business Bay Apartment",
                  location: "Business Bay",
                  investment: "AED 1.2M",
                  returns: "30%",
                  timeline: "5 months",
                  image: businessBayImage,
                  status: "New"
                }
              ].map((opportunity, index) => (
                <Card key={index} className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <img 
                        src={opportunity.image} 
                        alt={opportunity.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/80 text-foreground">
                          {opportunity.status}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="luxury-gradient text-primary-foreground">
                          {opportunity.returns} ROI
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 font-playfair">{opportunity.title}</h3>
                      <p className="text-muted-foreground mb-4 font-montserrat">{opportunity.location}</p>
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground font-montserrat">Investment Required:</span>
                          <span className="font-semibold text-foreground font-montserrat">{opportunity.investment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground font-montserrat">Timeline:</span>
                          <span className="font-semibold text-foreground font-montserrat">{opportunity.timeline}</span>
                        </div>
                      </div>
                      <Button className="w-full luxury-gradient text-primary-foreground font-montserrat">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Luxury Labs */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-playfair">Why Choose Luxury Labs</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 luxury-gradient rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground font-playfair">Proven Track Record</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 font-montserrat">
                    Over 50 successfully completed projects with an average ROI of 30%, 
                    backed by comprehensive market analysis and expert project management.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "100% project completion rate",
                      "Zero investor losses to date",
                      "Average 8-month turnaround"
                    ].map((point, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground font-montserrat">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 luxury-gradient rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground font-playfair">Expert Management</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 font-montserrat">
                    Our multidisciplinary team of real estate experts, designers, and project managers 
                    ensures every transformation exceeds expectations.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "20+ years combined experience",
                      "Licensed professionals only",
                      "Comprehensive project oversight"
                    ].map((point, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground font-montserrat">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-12 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm max-w-4xl mx-auto">
              <CardContent className="p-0">
                <h2 className="text-4xl font-bold text-foreground mb-6 font-playfair">Ready to Invest?</h2>
                <p className="text-xl text-muted-foreground mb-8 font-montserrat max-w-2xl mx-auto">
                  Join our exclusive investor community and start generating exceptional returns 
                  through luxury property transformations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="luxury-gradient text-primary-foreground font-montserrat tracking-wide luxury-shadow">
                    <Link to="/contact">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link to="/projects">View Portfolio</Link>
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