import { TrendingUp, Shield, Users, DollarSign, BarChart3, Award, ArrowRight, CheckCircle, User, Building2, Globe, Briefcase, PiggyBank, MapPin, Calendar, Target, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Navigation } from "@/components/Navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import businessBayImage from "@/assets/business-bay.jpg"
import downtownImage from "@/assets/downtown-luxury.jpg"
import marinaTowerImage from "@/assets/marina-tower.jpg"
import dubaiMarinaImage from "@/assets/dubai-marina-luxury.jpg"

export default function Investors() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAuthButtonClick = () => {
    if (user) {
      toast({
        title: "Already Signed In",
        description: (
          <div className="flex flex-col gap-2">
            <span>You are already signed in!</span>
            <Link 
              to="/dashboard" 
              className="text-primary hover:underline font-medium"
            >
              Want to access your dashboard? Click here →
            </Link>
          </div>
        ),
        duration: 5000,
      });
    } else {
      // Handle navigation to auth page when not signed in
      window.location.href = '/auth';
    }
  };

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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">Investors Community</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Join sophisticated investors in Dubai's luxury property transformation market. 
            Access curated opportunities with projected returns of 25-35% through our expert-managed portfolio.
          </p>
        </div>
      </section>

      {/* Investors Dashboard Portal Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Investor Portal */}
            <div className="space-y-6">
              <div className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm rounded-lg p-8">
                <div className="w-16 h-16 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4 font-playfair text-center">
                  Investors Dashboard Portal
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed font-montserrat text-center">
                  Access your personalized investment portfolio, track performance, and discover new opportunities. 
                  Exclusive access for accredited investors only.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Button 
                    onClick={handleAuthButtonClick}
                    className="luxury-gradient text-primary-foreground font-montserrat px-8 py-3"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleAuthButtonClick}
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-montserrat px-8 py-3"
                  >
                    Sign Up
                  </Button>
                  <Button 
                    asChild
                    variant="outline" 
                    className="border-muted text-foreground hover:bg-muted hover:text-foreground font-montserrat px-8 py-3"
                  >
                    <Link to="/contact">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground font-montserrat text-center">
                    New to Luxury Labs? <br />
                    Contact our investor relations team for access.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Sample Dashboard */}
            <div className="space-y-6">
              <div className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 font-playfair">Dashboard Preview</h3>
                
                {/* Portfolio Overview */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-background rounded-lg border border-border">
                    <PiggyBank className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold text-foreground">AED 2.4M</p>
                    <p className="text-sm text-muted-foreground">Total Invested</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg border border-border">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold text-foreground">+18.5%</p>
                    <p className="text-sm text-muted-foreground">Portfolio ROI</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg border border-border">
                    <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold text-foreground">5</p>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                  </div>
                </div>

                {/* Recent Investments */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground mb-3">Recent Investments</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-background rounded-lg border border-border">
                      <img 
                        src="/src/assets/palm-villa-for-sale.jpg" 
                        alt="Palm Jumeirah Villa" 
                        className="w-16 h-16 rounded-lg object-cover mr-3 flex-shrink-0"
                      />
                      <div className="flex-grow">
                        <p className="font-medium text-foreground">Palm Jumeirah Villa</p>
                        <p className="text-sm text-muted-foreground">AED 800K invested</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-success">+24%</p>
                        <p className="text-sm text-muted-foreground">8 months</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-background rounded-lg border border-border">
                      <img 
                        src="/src/assets/luxury-penthouse.jpg" 
                        alt="Marina Penthouse" 
                        className="w-16 h-16 rounded-lg object-cover mr-3 flex-shrink-0"
                      />
                      <div className="flex-grow">
                        <p className="font-medium text-foreground">Marina Penthouse</p>
                        <p className="text-sm text-muted-foreground">AED 1.2M invested</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">+12%</p>
                        <p className="text-sm text-muted-foreground">4 months</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-background rounded-lg border border-border">
                      <img 
                        src="/src/assets/downtown-luxury.jpg" 
                        alt="Downtown Apartment" 
                        className="w-16 h-16 rounded-lg object-cover mr-3 flex-shrink-0"
                      />
                      <div className="flex-grow">
                        <p className="font-medium text-foreground">Downtown Apartment</p>
                        <p className="text-sm text-muted-foreground">AED 400K invested</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-warning">+8%</p>
                        <p className="text-sm text-muted-foreground">2 months</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      if (user) {
                        window.location.href = '/dashboard';
                      } else {
                        window.location.href = '/auth';
                      }
                    }}
                  >
                    View Full Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Investors Community Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-playfair">Our Investors Community</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-montserrat">
              Join a diverse ecosystem of sophisticated investors who trust Luxury Labs for exceptional returns in Dubai's luxury property market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Investors and HNWI",
                icon: User,
                description: "Sophisticated investors seeking portfolio diversification through luxury real estate investments in Dubai's premier locations.",
                characteristics: ["Portfolio diversification", "Luxury lifestyle investment", "Capital preservation"]
              },
              {
                title: "Wealth Managers",
                icon: TrendingUp,
                description: "Professional investment advisors managing client portfolios with focus on alternative asset classes and real estate opportunities.",
                characteristics: ["Client portfolio management", "Risk assessment", "Performance tracking"]
              },
              {
                title: "Family Offices",
                icon: Building2,
                description: "Multi-generational wealth preservation through strategic real estate investments in stable, high-growth markets.",
                characteristics: ["Legacy planning", "Wealth preservation", "Generational assets"]
              },
              {
                title: "Dubai Relocators",
                icon: Globe,
                description: "International professionals and entrepreneurs establishing their presence in Dubai's dynamic business ecosystem.",
                characteristics: ["Market entry strategy", "Local expertise", "Regulatory guidance"]
              },
              {
                title: "Venture Capital",
                icon: Users,
                description: "Forward-thinking investors seeking innovative real estate transformation opportunities with scalable returns.",
                characteristics: ["Innovation focus", "Scalable returns", "Market disruption"]
              },
              {
                title: "Private Equity",
                icon: Briefcase,
                description: "Institutional investors focused on large-scale property development and transformation projects.",
                characteristics: ["Large-scale projects", "Operational improvement", "Value creation"]
              }
            ].map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index} className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 luxury-gradient rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 font-playfair">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed font-montserrat">
                      {type.description}
                    </p>
                    <div className="space-y-2">
                      {type.characteristics.map((char, charIndex) => (
                        <div key={charIndex} className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground font-montserrat">{char}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
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
            <div className="grid md:grid-cols-3 gap-8">
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

              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 luxury-gradient rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground font-playfair">Luxury Network</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 font-montserrat">
                    Our extensive network of elite real estate developers, premium agencies, certified contractors, 
                    luxury suppliers, and specialized factories ensuring superior quality and craftsmanship.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Elite real estate developers & agencies",
                      "Certified luxury contractors",
                      "Premium suppliers & material factories"
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