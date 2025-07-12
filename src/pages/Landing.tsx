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
  PiggyBank,
  MessageCircle,
  Calculator,
  Compass
} from "lucide-react"
import { Link } from "react-router-dom"

export default function Landing() {
  // Updated services to match user requirements
  const services = [
    {
      title: "Invest in a Flip",
      description: "Join our exclusive flip projects in Dubai's most strategic locations. We identify, acquire, luxury-upgrade, and sell premium properties with full transparency.",
      icon: TrendingUp,
      features: ["20-30% projected returns", "Strategic location focus", "Complete transparency", "Shared risk model"],
      cta: "View Flip Projects",
      locations: ["Palm Jumeirah", "Marina", "Emirates Hills"]
    },
    {
      title: "Start a Flip with Luxury Labs",
      description: "Partner with us to transform properties you own or identify potential flips. From planning to execution, we guide your luxury transformation journey.",
      icon: Home,
      features: ["End-to-end partnership", "Expert market analysis", "Premium transformations", "Professional guidance"],
      cta: "Start Your Flip",
      locations: ["Jumeirah Islands", "The Meadows", "Al Barari"]
    },
    {
      title: "Luxury Property Consultation",
      description: "Complete consultancy for Dubai luxury properties, design expertise, financial advisory, and connections to premium service providers.",
      icon: Users,
      features: ["Market expertise", "Design consultation", "Financial planning", "Provider network"],
      cta: "Book Consultation",
      locations: ["All strategic areas", "Investment guidance", "Design partnerships"]
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
    { label: "Properties Flipped", value: "85+", icon: Building2 },
    { label: "Average ROI", value: "25%", icon: TrendingUp },
    { label: "Active Investors", value: "200+", icon: Users },
    { label: "Strategic Locations", value: "6", icon: MapPin }
  ]

  const testimonials = [
    {
      name: "Ahmed Al-Mansouri",
      role: "Property Investor",
      content: "Luxury Labs transformed my Marina investment beyond expectations. 28% returns and flawless execution.",
      avatar: "👨‍💼"
    },
    {
      name: "Sarah Johnson",
      role: "HNWI Client",
      content: "The consultation service saved me millions. Their market expertise in Emirates Hills is unmatched.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Flip Partner",
      content: "Started my first flip with their guidance. Al Barari project delivered 32% ROI in 8 months.",
      avatar: "👨‍💻"
    }
  ]

  const strategicLocations = [
    "Palm Jumeirah", 
    "Dubai Marina", 
    "Emirates Hills", 
    "Jumeirah Islands", 
    "The Meadows", 
    "Al Barari"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-luxury rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-background font-bold text-xl">[L]</span>
            </div>
            <div>
              <div className="font-bold text-2xl text-foreground tracking-tight">LUXURY LABS</div>
              <div className="text-xs text-primary uppercase tracking-widest font-medium">Property Transformation</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors font-medium">Services</a>
            <a href="#process" className="text-muted-foreground hover:text-primary transition-colors font-medium">Process</a>
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors font-medium">Projects</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact</a>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background">
              Client Portal
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 z-10" />
        
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('/lovable-uploads/ffbd7441-0c73-425f-9415-a12a6068eaf8.png')`,
            filter: 'brightness(0.7)'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center max-w-7xl mx-auto">
            {/* Top badge */}
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 text-primary mb-6">
                <span className="w-16 h-px bg-gradient-luxury"></span>
                <span className="text-sm uppercase tracking-wider font-semibold">Dubai's Premier Property Investment Platform</span>
                <span className="w-16 h-px bg-gradient-luxury"></span>
              </div>
            </div>
            
            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-foreground leading-none">
              LUXURY PROPERTY
              <br />
              <span className="bg-gradient-luxury bg-clip-text text-transparent">TRANSFORMATION</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-3xl text-muted-foreground mb-12 max-w-5xl mx-auto leading-relaxed font-light">
              and Investment Services
              <br className="hidden md:block" />
              <span className="text-lg md:text-xl">
                By Luxury Labs FZO | Real Estate Transformation Solutions | UAE/Dubai
              </span>
            </p>
            
            {/* Strategic locations */}
            <div className="mb-12">
              <div className="text-sm text-primary uppercase tracking-wider mb-4 font-medium">Strategic Locations Focus</div>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {strategicLocations.map((location, index) => (
                  <Badge key={index} variant="outline" className="border-primary/30 text-primary bg-primary/10 px-4 py-2">
                    {location}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Button size="lg" className="text-xl px-16 py-8 bg-gradient-luxury hover:shadow-glow transition-all duration-300 font-semibold">
                <TrendingUp className="mr-3 h-7 w-7" />
                Invest in a Flip
              </Button>
              <Button variant="outline" size="lg" className="text-xl px-16 py-8 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 font-semibold">
                <Home className="mr-3 h-7 w-7" />
                Start Your Flip
              </Button>
              <Button variant="ghost" size="lg" className="text-xl px-16 py-8 text-primary hover:bg-primary/10 transition-all duration-300 font-semibold">
                <MessageCircle className="mr-3 h-7 w-7" />
                Get Consultation
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 text-primary mb-8">
              <span className="w-12 h-px bg-gradient-luxury"></span>
              <span className="text-sm uppercase tracking-wider font-semibold">Our Premium Services</span>
              <span className="w-12 h-px bg-gradient-luxury"></span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground">Transform & Invest</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
              Three exclusive pathways to luxury property investment in Dubai's most strategic locations
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Card key={index} className="group p-12 hover:shadow-luxury transition-all duration-500 bg-card border-border hover:border-primary/30 hover:-translate-y-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-luxury rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                    <service.icon className="h-10 w-10 text-background" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-6 text-card-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-10 text-lg leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-4 mb-10">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-base">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-foreground font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-10">
                    <div className="text-xs text-primary uppercase tracking-wider mb-4 font-semibold">Focus Areas:</div>
                    <div className="flex flex-wrap gap-2">
                      {service.locations.map((location, locIndex) => (
                        <Badge key={locIndex} variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20 px-3 py-1">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-luxury hover:shadow-glow transition-all duration-300 text-background font-semibold py-4 text-lg">
                    {service.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 text-primary mb-8">
              <span className="w-12 h-px bg-gradient-luxury"></span>
              <span className="text-sm uppercase tracking-wider font-semibold">Our Process</span>
              <span className="w-12 h-px bg-gradient-luxury"></span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground">The Luxury Labs</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-luxury bg-clip-text text-transparent">10-Step Process</h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Our proven methodology ensures transparent communication, exceptional results, 
              and complete satisfaction from inquiry to completion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="group hover:shadow-luxury transition-all duration-300 relative overflow-hidden p-8 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-luxury opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                <div className="relative text-center">
                  <div className="relative mb-6">
                    <div className="h-20 w-20 mx-auto bg-gradient-luxury rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                      <step.icon className="h-10 w-10 text-background" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground font-bold text-sm px-3 py-1">
                      {step.step}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-4 leading-tight text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 text-primary mb-8">
              <span className="w-12 h-px bg-gradient-luxury"></span>
              <span className="text-sm uppercase tracking-wider font-semibold">Client Success</span>
              <span className="w-12 h-px bg-gradient-luxury"></span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground">What Our Clients</h2>
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-luxury bg-clip-text text-transparent">Say About Us</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-luxury transition-all duration-300 p-10 hover:-translate-y-2">
                <div className="flex items-center gap-6 mb-8">
                  <div className="h-16 w-16 bg-gradient-luxury rounded-full flex items-center justify-center text-2xl shadow-glow">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{testimonial.name}</h4>
                    <p className="text-primary font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic text-lg leading-relaxed">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-luxury text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Ready to Transform Your
            <span className="block">Property Investment?</span>
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join hundreds of successful investors who trust Luxury Labs with their 
            Dubai property investments. Start your transformation journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="secondary" size="lg" className="bg-background text-primary hover:bg-background/90 font-semibold px-12 py-6 text-lg">
              <DollarSign className="h-6 w-6 mr-2" />
              Invest Now
            </Button>
            <Button variant="outline" size="lg" className="border-background text-background hover:bg-background/10 font-semibold px-12 py-6 text-lg">
              <Eye className="h-6 w-6 mr-2" />
              View Projects
            </Button>
            <Button variant="ghost" size="lg" className="text-background hover:bg-background/10 font-semibold px-12 py-6 text-lg">
              <Calculator className="h-6 w-6 mr-2" />
              ROI Calculator
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center space-x-3 text-primary mb-8">
                <span className="w-12 h-px bg-gradient-luxury"></span>
                <span className="text-sm uppercase tracking-wider font-semibold">Get in Touch</span>
                <span className="w-12 h-px bg-gradient-luxury"></span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground">Contact Our</h2>
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-luxury bg-clip-text text-transparent">Expert Team</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <Card className="text-center group hover:shadow-luxury transition-all duration-300 p-10 hover:-translate-y-2">
                <div className="h-16 w-16 mx-auto mb-6 bg-gradient-luxury rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <Phone className="h-8 w-8 text-background" />
                </div>
                <h3 className="font-bold text-xl mb-4">Phone</h3>
                <p className="text-muted-foreground text-lg">+971 4 XXX XXXX</p>
              </Card>

              <Card className="text-center group hover:shadow-luxury transition-all duration-300 p-10 hover:-translate-y-2">
                <div className="h-16 w-16 mx-auto mb-6 bg-gradient-luxury rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <Mail className="h-8 w-8 text-background" />
                </div>
                <h3 className="font-bold text-xl mb-4">Email</h3>
                <p className="text-muted-foreground text-lg">info@luxurylabs.ae</p>
              </Card>

              <Card className="text-center group hover:shadow-luxury transition-all duration-300 p-10 hover:-translate-y-2">
                <div className="h-16 w-16 mx-auto mb-6 bg-gradient-luxury rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <MapPin className="h-8 w-8 text-background" />
                </div>
                <h3 className="font-bold text-xl mb-4">Office</h3>
                <p className="text-muted-foreground text-lg">Dubai, UAE</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-luxury rounded-xl flex items-center justify-center">
                <span className="text-background font-bold text-lg">[L]</span>
              </div>
              <div>
                <div className="font-bold text-xl text-foreground">LUXURY LABS</div>
                <div className="text-xs text-primary">Property Transformation</div>
              </div>
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