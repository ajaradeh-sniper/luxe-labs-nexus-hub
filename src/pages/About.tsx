import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Target, 
  Award,
  Globe,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb
} from "lucide-react"

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
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">About Luxury Labs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dubai's premier luxury property transformation company, specializing in high-end renovations 
            and profitable real estate investments for discerning clients.
          </p>
        </div>

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

        {/* Team */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Leadership Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                    </div>
                    <Badge variant="secondary">{member.experience}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                </div>
              ))}
            </div>
          </CardContent>
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
      </div>
    </>
  )
}

export default About