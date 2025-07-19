import { TrendingUp, Shield, Users, DollarSign, BarChart3, Award, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import businessBayImage from "@/assets/business-bay.jpg"
import downtownImage from "@/assets/downtown-luxury.jpg"
import marinaTowerImage from "@/assets/marina-tower.jpg"

export default function Investors() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Investors Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 px-6 py-2 text-primary border-primary/30 bg-primary/5 font-montserrat">
              Investment Opportunities
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 font-playfair leading-tight">
              Generate <span className="luxury-text">Exceptional Returns</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-montserrat max-w-3xl mx-auto">
              Join sophisticated investors in Dubai's luxury property transformation market. 
              Access curated opportunities with projected returns of 25-35% through our expert-managed portfolio.
            </p>
          </div>

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

          {/* Investment Options */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-playfair">Investment Options</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
                      Portfolio Investment
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-playfair">Diversified Fund</h3>
                    <div className="text-4xl font-bold luxury-text mb-2 font-playfair">25-30%</div>
                    <p className="text-muted-foreground font-montserrat">Projected Annual Return</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Minimum investment: AED 500K",
                      "Diversified across 10+ properties",
                      "Professional management included",
                      "Quarterly performance reports",
                      "Exit flexibility after 12 months"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-montserrat">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full luxury-gradient text-primary-foreground font-montserrat">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="luxury-gradient text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
                      Individual Project
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-playfair">Single Property</h3>
                    <div className="text-4xl font-bold luxury-text mb-2 font-playfair">30-35%</div>
                    <p className="text-muted-foreground font-montserrat">Projected Return</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Minimum investment: AED 1M",
                      "Full transparency on single asset",
                      "Direct involvement opportunities",
                      "Higher return potential",
                      "6-12 month typical timeline"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-montserrat">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full luxury-gradient text-primary-foreground font-montserrat">
                    View Projects
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
                      Premium Access
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-playfair">VIP Membership</h3>
                    <div className="text-4xl font-bold luxury-text mb-2 font-playfair">35%+</div>
                    <p className="text-muted-foreground font-montserrat">Target Returns</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Minimum investment: AED 5M",
                      "First access to premium deals",
                      "Personal relationship manager",
                      "Customized investment strategies",
                      "Exclusive networking events"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-montserrat">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full luxury-gradient text-primary-foreground font-montserrat">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </div>
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