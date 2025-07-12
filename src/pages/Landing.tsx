import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Shield, 
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  DollarSign,
  Clock,
  Award,
  Eye,
  FileText,
  Handshake,
  Key,
  Hammer,
  Home,
  PiggyBank
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Landing() {
  const services = [
    {
      title: "Property Investment Flips",
      description: "Shared returns with investors on premium Dubai properties. Transparent ROI tracking and portfolio management.",
      icon: TrendingUp,
      features: ["12-18% Average Returns", "Transparent Process", "Shared Risk Model"],
      cta: "Invest in a Flip"
    },
    {
      title: "HNWI Concierge Renovations",
      description: "Premium individual client services for high-net-worth individuals seeking luxury property transformations.",
      icon: Award,
      features: ["White-Glove Service", "Premium Materials", "Dedicated Project Manager"],
      cta: "Start a Flip"
    },
    {
      title: "Investment Opportunities",
      description: "Curated luxury property opportunities with complete due diligence and financial projections.",
      icon: Building2,
      features: ["Due Diligence Complete", "Financial Projections", "Legal Documentation"],
      cta: "View Opportunities"
    }
  ]

  const processSteps = [
    { 
      step: 1, 
      title: "Initial Inquiry & Lead Capture", 
      description: "Website, WhatsApp, or referral submission",
      icon: Phone 
    },
    { 
      step: 2, 
      title: "Client Qualification", 
      description: "Investment goals, budget, and preferences assessment",
      icon: Users 
    },
    { 
      step: 3, 
      title: "KYC & Due Diligence", 
      description: "Passport, Emirates ID, and AML compliance verification",
      icon: Shield 
    },
    { 
      step: 4, 
      title: "Project Presentation", 
      description: "Property analysis and financial projections review",
      icon: FileText 
    },
    { 
      step: 5, 
      title: "Legal Agreement Signing", 
      description: "NDA, JVA, and investment agreements execution",
      icon: Handshake 
    },
    { 
      step: 6, 
      title: "Property Acquisition", 
      description: "Purchase, DLD registration, and title transfer",
      icon: Key 
    },
    { 
      step: 7, 
      title: "Renovation Initiation", 
      description: "Timeline creation, status reports, and site visits",
      icon: Hammer 
    },
    { 
      step: 8, 
      title: "Project Completion", 
      description: "Final inspection, handover, and certification",
      icon: CheckCircle 
    },
    { 
      step: 9, 
      title: "Sale or Rental", 
      description: "Marketing, listing, and buyer negotiations",
      icon: Home 
    },
    { 
      step: 10, 
      title: "Follow-up & Aftercare", 
      description: "Maintenance, feedback, and future opportunities",
      icon: PiggyBank 
    }
  ]

  const stats = [
    { label: "Properties Transformed", value: "150+", icon: Building2 },
    { label: "Average ROI", value: "15.2%", icon: TrendingUp },
    { label: "Happy Investors", value: "500+", icon: Users },
    { label: "Years Experience", value: "8+", icon: Star }
  ]

  const testimonials = [
    {
      name: "Ahmed Al-Mansouri",
      role: "Private Investor",
      content: "Luxury Labs delivered exceptional returns on my Dubai Marina investment. Professional service from start to finish.",
      avatar: "👨‍💼"
    },
    {
      name: "Sarah Johnson",
      role: "HNWI Client",
      content: "The renovation of my Downtown penthouse exceeded all expectations. World-class quality and attention to detail.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Investment Partner",
      content: "Transparent process, consistent returns, and excellent communication. Highly recommend for serious investors.",
      avatar: "👨‍💻"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-luxury rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
              Luxury Labs
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
            <a href="#process" className="text-sm font-medium hover:text-primary transition-colors">Process</a>
            <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">Portfolio</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-elegant" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              🏆 Dubai's Premier Property Investment Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Dubai Real Estate Into
              <span className="bg-gradient-luxury bg-clip-text text-transparent block">
                Luxury Returns
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Join Luxury Labs for premium property flips, HNWI concierge renovations, 
              and transparent investment opportunities in Dubai's luxury market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="luxury" size="xl" className="group">
                Invest in a Flip
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Start a Flip
              </Button>
              <Button variant="ghost" size="xl">
                <Phone className="h-5 w-5 mr-2" />
                Contact Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="h-16 w-16 mx-auto mb-4 bg-gradient-luxury rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-luxury bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Services
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Premium Real Estate
              <span className="bg-gradient-luxury bg-clip-text text-transparent block">
                Investment Solutions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From property flips to luxury renovations, we deliver exceptional results 
              through our proven 10-step process and expert team.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-luxury transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-luxury opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                <CardHeader className="pb-4">
                  <div className="h-14 w-14 bg-gradient-luxury rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="luxury" className="w-full mt-6">
                    {service.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Process
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The Luxury Labs
              <span className="bg-gradient-luxury bg-clip-text text-transparent block">
                10-Step Process
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven methodology ensures transparent communication, exceptional results, 
              and complete client satisfaction from inquiry to completion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <Card key={index} className="group hover:shadow-luxury transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-luxury opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="h-16 w-16 mx-auto bg-gradient-luxury rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                      {step.step}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-sm mb-2 leading-tight">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              Client Success
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Our Clients
              <span className="bg-gradient-luxury bg-clip-text text-transparent block">
                Say About Us
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 bg-gradient-luxury rounded-full flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-luxury text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="block">Property Investment?</span>
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful investors who trust Luxury Labs with their 
            Dubai property investments. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90">
              <DollarSign className="h-5 w-5 mr-2" />
              Invest Now
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
              <Eye className="h-5 w-5 mr-2" />
              View Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                Get in Touch
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Contact Our
                <span className="bg-gradient-luxury bg-clip-text text-transparent block">
                  Expert Team
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center group hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 mx-auto mb-4 bg-gradient-luxury rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">+971 4 XXX XXXX</p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 mx-auto mb-4 bg-gradient-luxury rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">info@luxurylabs.ae</p>
                </CardContent>
              </Card>

              <Card className="text-center group hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 mx-auto mb-4 bg-gradient-luxury rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Office</h3>
                  <p className="text-muted-foreground">Dubai, UAE</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-gradient-luxury rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
                Luxury Labs
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Luxury Labs Real Estate Transformation FZCO. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}