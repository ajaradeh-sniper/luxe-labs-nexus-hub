import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Target, 
  Award,
  Globe,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb,
  ArrowRight,
  Star,
  Search,
  Leaf
} from "lucide-react"
import professionalTeam from "@/assets/professional-team.jpg"
import marketAnalysis from "@/assets/market-analysis.jpg"
import strategicPlanning from "@/assets/strategic-planning.jpg"
import sustainableLuxury from "@/assets/sustainable-luxury.jpg"
import executionExcellence from "@/assets/execution-excellence.jpg"
import luxuryInteriorModern from "@/assets/luxury-interior-modern.jpg"
import dubaeMarinaLuxury from "@/assets/dubai-marina-luxury.jpg"

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Complete transparency in all investments with detailed ROI tracking and regular updates."
    },
    {
      icon: TrendingUp,
      title: "Excellence in Execution",
      description: "Proven track record of delivering premium renovations and profitable property flips."
    },
    {
      icon: Heart,
      title: "Client-Centric Approach",
      description: "Dedicated concierge service ensuring every client receives personalized attention."
    },
    {
      icon: Lightbulb,
      title: "Innovation & Quality",
      description: "Cutting-edge technology and premium materials in every project we undertake."
    }
  ]

  const team = [
    {
      name: "Ahmed Al-Mansouri",
      role: "CEO & Founder",
      experience: "15+ years in Dubai real estate",
      specialty: "Luxury property investment"
    },
    {
      name: "Sarah Mitchell",
      role: "Head of Operations",
      experience: "12+ years project management",
      specialty: "High-end renovations"
    },
    {
      name: "Marco Rossi",
      role: "Chief Investment Officer",
      experience: "20+ years financial markets",
      specialty: "Portfolio optimization"
    },
    {
      name: "Fatima Al-Zahra",
      role: "Legal Director",
      experience: "10+ years UAE property law",
      specialty: "Compliance & documentation"
    }
  ]

  return (
    <>
      <Navigation />
      
      {/* Hero Section with Image */}
      <section className="relative h-96 flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dubaeMarinaLuxury})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
        <div className="relative container mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">About Luxury Labs</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Dubai's premier luxury property transformation company, specializing in high-end renovations 
            and profitable real estate investments for discerning clients.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">

        {/* Company Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Our Story
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Founded in Dubai's dynamic real estate landscape, Luxury Labs Real Estate Transformation FZCO 
              has established itself as the go-to partner for luxury property investments and high-end renovations. 
              Our unique 10-step process ensures every project meets the highest standards of quality and profitability.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We serve two distinct markets: discerning investors seeking profitable property flips with transparent 
              ROI sharing, and HNWI clients requiring premium concierge renovation services. Our deep understanding 
              of Dubai's luxury market and commitment to excellence has made us the trusted choice for clients 
              seeking exceptional results.
            </p>
          </CardContent>
        </Card>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">$25M+</div>
              <p className="text-sm text-muted-foreground">Total Investment</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">18.5%</div>
              <p className="text-sm text-muted-foreground">Average ROI</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <p className="text-sm text-muted-foreground">Client Satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Team Section with Hero Image */}
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <TrendingUp className="h-6 w-6" />
                  Our Approach
                </CardTitle>
                <p className="text-muted-foreground">
                  Strategic methodology that delivers exceptional results through sustainable luxury
                </p>
              </CardHeader>
              <div className="grid grid-cols-1 gap-6">
                <div className="relative rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
                  <div className="aspect-video relative">
                    <img 
                      src={marketAnalysis} 
                      alt="Market Analysis" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                          <Search className="h-5 w-5 text-background" />
                        </div>
                        <h4 className="font-semibold text-white text-lg">Market Analysis</h4>
                      </div>
                      <p className="text-sm text-white/90">Comprehensive research and property evaluation to identify high-potential investments.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
                  <div className="aspect-video relative">
                    <img 
                      src={strategicPlanning} 
                      alt="Strategic Planning" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                          <Target className="h-5 w-5 text-background" />
                        </div>
                        <h4 className="font-semibold text-white text-lg">Strategic Planning</h4>
                      </div>
                      <p className="text-sm text-white/90">Detailed transformation plans with timeline, budget, and ROI projections.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
                  <div className="aspect-video relative">
                    <img 
                      src={sustainableLuxury} 
                      alt="Sustainable Luxury" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                          <Leaf className="h-5 w-5 text-background" />
                        </div>
                        <h4 className="font-semibold text-white text-lg">Sustainable Luxury</h4>
                      </div>
                      <p className="text-sm text-white/90">Eco-friendly materials and energy-efficient solutions that maintain premium quality.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm hover:shadow-md transition-all duration-300 group">
                  <div className="aspect-video relative">
                    <img 
                      src={executionExcellence} 
                      alt="Execution Excellence" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                          <Award className="h-5 w-5 text-background" />
                        </div>
                        <h4 className="font-semibold text-white text-lg">Execution Excellence</h4>
                      </div>
                      <p className="text-sm text-white/90">Premium materials, skilled craftsmen, and rigorous quality control throughout.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Users className="h-6 w-6" />
                  Leadership Team
                </CardTitle>
                <p className="text-muted-foreground">
                  Meet the experts behind Luxury Labs' exceptional success
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-6">
                  {team.map((member, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-luxury rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="h-6 w-6 text-background" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{member.name}</h3>
                            <p className="text-sm text-primary font-medium">{member.role}</p>
                          </div>
                          <Badge variant="secondary">{member.experience}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🏢</div>
                <p className="text-sm font-medium">DMCC Licensed</p>
                <p className="text-xs text-muted-foreground">Free Zone Company</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🏛️</div>
                <p className="text-sm font-medium">DLD Registered</p>
                <p className="text-xs text-muted-foreground">Real Estate Broker</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🛡️</div>
                <p className="text-sm font-medium">AML Compliant</p>
                <p className="text-xs text-muted-foreground">Anti-Money Laundering</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">📋</div>
                <p className="text-sm font-medium">ISO Certified</p>
                <p className="text-xs text-muted-foreground">Quality Management</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Approach Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Approach</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our methodology combines strategic planning, quality assurance, and innovative solutions 
              to deliver exceptional results that exceed expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Strategic Planning",
                description: "Comprehensive market analysis and strategic planning to ensure optimal project outcomes and maximum ROI."
              },
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "Rigorous quality control processes and premium material selection for lasting value and excellence."
              },
              {
                icon: TrendingUp,
                title: "Value Engineering",
                description: "Optimizing design and construction methods to maximize value while maintaining luxury standards."
              },
              {
                icon: Award,
                title: "Excellence Standards",
                description: "Commitment to award-winning design and construction that exceeds industry benchmarks."
              }
            ].map((approach, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <approach.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{approach.title}</h3>
                  <p className="text-sm text-muted-foreground">{approach.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <Card className="bg-gradient-luxury text-background">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Experience Luxury Labs Excellence</h2>
            <p className="text-background/80 mb-6 max-w-2xl mx-auto text-lg">
              Ready to transform your property investment journey with Dubai's most trusted luxury real estate experts?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90"
                onClick={() => window.location.href = '/services'}
              >
                View Our Services
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default About