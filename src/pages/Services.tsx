import { Helmet } from "react-helmet-async"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { 
  TrendingUp, 
  Home,
  Users,
  FileText,
  Clock,
  DollarSign,
  Shield,
  Settings,
  CheckCircle,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
  Target,
  Award,
  BarChart3,
  Zap,
  Search,
  Hammer
} from "lucide-react"
import renovationShowcase from "@/assets/renovation-showcase.jpg"
import luxuryInteriorModern from "@/assets/luxury-interior-modern.jpg"
import emiratesHillsVilla from "@/assets/emirates-hills-villa.jpg"
import palmJumeirahVilla from "@/assets/palm-jumeirah-villa.jpg"
import jumeirahGolfEstateVilla from "@/assets/jumeirah-golf-estate-villa.jpg"
import jumeirahIslandsVilla from "@/assets/jumeirah-islands-villa.jpg"
import dubaiHillsVilla from "@/assets/dubai-hills-villa.jpg"
import alBarariVilla from "@/assets/al-barari-villa.jpg"

const Services = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const services = [
    {
      id: 'real-estate-investment',
      title: 'Luxury Real Estate Transformation Investment (Flips & Fund)',
      description: 'Join our profitable property flip investments with transparent ROI sharing and professional management.',
      icon: TrendingUp,
      price: 'Min. AED 500K investment',
      timeline: '6-12 months',
      features: [
        'Transparent ROI tracking',
        'Professional property management',
        'Diversified portfolio options',
        'Regular progress updates',
        'Legal protection and compliance'
      ],
      detailed: 'Our flagship investment service offers qualified investors the opportunity to participate in luxury property transformations across Dubai\'s most prestigious locations. Each project undergoes rigorous due diligence, market analysis, and profit potential assessment. Investors receive detailed monthly reports, full transparency on costs and progress, and guaranteed minimum returns through our profit-sharing model.'
    },
    {
      id: 'concierge-acquisition',
      title: 'HNWI Concierge Property Acquisition & Renovation',
      description: 'Complete end-to-end property acquisition and luxury renovation services for high-net-worth individuals.',
      icon: Users,
      price: 'Custom pricing',
      timeline: '3-18 months',
      features: [
        'Personalized property sourcing',
        'Market analysis and valuation',
        'Negotiation and acquisition',
        'Complete renovation management',
        'Interior design consultation'
      ],
      detailed: 'Our exclusive concierge service caters to discerning clients seeking the perfect luxury property in Dubai. From initial search criteria to final handover, our team manages every aspect of acquisition and renovation. This includes off-market opportunities, private viewings, detailed market analysis, negotiation support, and comprehensive renovation project management with our network of premium contractors and designers.'
    },
    {
      id: 'advisory-consultation',
      title: 'Real Estate Investment Advisory & Consultation',
      description: 'Expert guidance on Dubai real estate investments, market trends, and portfolio optimization.',
      icon: FileText,
      price: 'AED 2,500/session',
      timeline: '1-4 hours',
      features: [
        'Market trend analysis',
        'Investment opportunity identification',
        'Portfolio diversification strategies',
        'Legal and regulatory guidance',
        'Exit strategy planning'
      ],
      detailed: 'Our advisory service provides sophisticated investors with deep market insights and strategic guidance. Sessions include comprehensive market analysis, identification of emerging opportunities, portfolio optimization recommendations, regulatory compliance guidance, and detailed financial projections. Ideal for investors looking to enter the Dubai market or optimize existing portfolios.'
    }
  ]

  const process = [
    { step: 1, title: "Initial Consultation", description: "Understanding your investment goals and risk profile" },
    { step: 2, title: "Market Analysis", description: "Comprehensive evaluation of current market opportunities" },
    { step: 3, title: "Property Selection", description: "Curated selection based on your criteria and budget" },
    { step: 4, title: "Due Diligence", description: "Thorough property inspection and legal verification" },
    { step: 5, title: "Investment Structure", description: "Optimal financing and ownership structure setup" },
    { step: 6, title: "Acquisition", description: "Negotiation and completion of property purchase" },
    { step: 7, title: "Renovation Planning", description: "Detailed renovation scope and timeline development" },
    { step: 8, title: "Project Execution", description: "Professional renovation with quality oversight" },
    { step: 9, title: "Marketing & Sales", description: "Strategic marketing for optimal returns" },
    { step: 10, title: "Completion", description: "Final handover and profit distribution" }
  ]

  const toggleExpanded = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  return (
    <>
      <Helmet>
        <title>Luxury Real Estate Services Dubai | Investment & Renovation - Luxury Labs</title>
        <meta name="description" content="Premium real estate investment services in Dubai. Property flips, concierge acquisition, and expert advisory. Minimum AED 500K investment with transparent ROI." />
        <meta name="keywords" content="Dubai real estate investment, luxury property renovation, property flips Dubai, real estate advisory, HNWI services Dubai" />
        <link rel="canonical" href="https://luxurylabs.ae/services" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-playfair">
                Luxury Real Estate Services
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Transform premium properties into profitable investments with Dubai's most trusted luxury real estate specialists
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => window.location.href = '/contact'}>
                  Start Your Investment Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.location.href = '/projects'}>
                  View Our Projects
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Our Premium Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive real estate solutions tailored for sophisticated investors and high-net-worth individuals
              </p>
            </div>

            <div className="grid gap-8 max-w-6xl mx-auto">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <service.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                            {service.title}
                          </CardTitle>
                          <p className="text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(service.id)}
                        className="shrink-0"
                      >
                        {expandedService === service.id ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <Badge variant="secondary" className="gap-1">
                        <DollarSign className="h-3 w-3" />
                        {service.price}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {service.timeline}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {expandedService === service.id && (
                        <div className="md:col-span-2">
                          <h4 className="font-semibold mb-2">Detailed Overview:</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {service.detailed}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={() => window.location.href = '/contact'}>
                        Get Started
                      </Button>
                      <Button variant="outline" onClick={() => window.location.href = '/projects'}>
                        View Examples
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Completed Projects Showcase */}
        <Card className="mx-4 mb-8">
          <CardContent className="p-8">
            {/* Completed Projects Showcase */}
            <div className="mt-16 pt-12 border-t border-primary/20">
              <div className="text-center mb-12">
                <h4 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Completed Transformations
                </h4>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Successful luxury property renovations that exceeded investor expectations with proven results
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Completed Project 1 - Business Bay Tower */}
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/lovable-uploads/116909a8-0f62-4f76-9b4d-43d93a586fd4.png"
                      alt="Completed Business Bay Tower"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">Completed</Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">Business Bay Tower</h3>
                      <p className="text-sm opacity-90">Business Bay</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Investment</span>
                        <span className="font-semibold">AED 3.1M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Achieved ROI</span>
                        <span className="font-semibold text-emerald-600">24.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Completion Time</span>
                        <span className="font-semibold">9 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Investor Return</span>
                        <span className="font-semibold text-emerald-600">AED 3.86M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Completed Project 2 - Emirates Hills Villa */}
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/lovable-uploads/4a28db7f-c64a-4b5a-9ec6-71ad24f468f6.png"
                      alt="Completed Emirates Hills Villa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">Completed</Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">Emirates Hills Villa</h3>
                      <p className="text-sm opacity-90">Emirates Hills</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Investment</span>
                        <span className="font-semibold">AED 5.8M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Achieved ROI</span>
                        <span className="font-semibold text-emerald-600">31.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Completion Time</span>
                        <span className="font-semibold">14 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Investor Return</span>
                        <span className="font-semibold text-emerald-600">AED 7.61M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prime Locations - Luxury Labs Focus */}
        <section className="py-20 bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Prime Locations - Luxury Labs Focus</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Strategic investment opportunities in Dubai's most profitable real estate markets with detailed acquisition data
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Emirates Hills */}
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={emiratesHillsVilla}
                      alt="Emirates Hills luxury villa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Emirates Hills</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Why it makes the list</h4>
                        <p className="text-sm text-muted-foreground">Blue-chip address; mega-mansion repositioning; median villa ~AED 2,390/ft² (Jan-25); Bayut showed ~AED 3,064/ft² (Nov-24)—methodology/timeframe explain spread.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Typical asset</h4>
                        <p className="text-sm">6–10BR estates</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Acquisition budget band</h4>
                        <p className="text-sm font-semibold text-accent">AED 35–200M+</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Palm Jumeirah */}
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={palmJumeirahVilla}
                      alt="Palm Jumeirah luxury villa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Palm Jumeirah</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Why it makes the list</h4>
                        <p className="text-sm text-muted-foreground">Deep buyer pool, scarce waterfront plots, highest villa AED/ft² in the city; turnkey premiums are clear. Villas averaged AED ~4,942/ft² (Jul-25); apartments ~3,267/ft² (Jul-25).</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Typical asset</h4>
                        <p className="text-sm">Garden/Signature villas (5–7BR), trophy apartments (Bulgari/Atlantis/Oceana/Tiara)</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Acquisition budget band</h4>
                        <p className="text-sm font-semibold text-accent">AED 25–90M+ for villas based on July-25 comps</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Jumeirah Golf Estate */}
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={jumeirahGolfEstateVilla}
                      alt="Jumeirah Golf Estate luxury villa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Jumeirah Golf Estate</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Why it makes the list</h4>
                        <p className="text-sm text-muted-foreground">Golf lifestyle; healthy yields and steady end-user demand; villa ~AED 2,481/ft² (Q1-25); luxury villas ROI ~5.9% (rental) benchmark. (Property Monitor)</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Typical asset</h4>
                        <p className="text-sm">4–6BR golf-course villas</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Acquisition budget band</h4>
                        <p className="text-sm font-semibold text-accent">AED 8–30M</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Jumeirah Islands */}
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={jumeirahIslandsVilla}
                      alt="Jumeirah Islands luxury villa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Jumeirah Islands</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Why it makes the list</h4>
                        <p className="text-sm text-muted-foreground">Lifestyle "islands" with strong upgrade premiums; villas at ~AED 3,024/ft² (Mar-24). Unique waterfront community with exclusive appeal.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Typical asset</h4>
                        <p className="text-sm">4–6BR lake-facing villas</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Acquisition budget band</h4>
                        <p className="text-sm font-semibold text-accent">AED 12–35M (cluster/condition)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dubai Hills */}
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={dubaiHillsVilla}
                      alt="Dubai Hills luxury villa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Dubai Hills</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Why it makes the list</h4>
                        <p className="text-sm text-muted-foreground">Family prime with velocity; clear comp ladder by sub-community; villas ~AED 2,737/ft² (H1-25); triangulated by Q1-25 ~2,767/ft².</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Typical asset</h4>
                        <p className="text-sm">Sidra/Maple (lighter), Golf Place/ Fairway/ Parkway Vistas (heavy)</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Acquisition budget band</h4>
                        <p className="text-sm font-semibold text-accent">AED 8–45M by typology</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Al Barari */}
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={alBarariVilla}
                      alt="Al Barari luxury villa"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Al Barari</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Why it makes the list</h4>
                        <p className="text-sm text-muted-foreground">Dubai's green heart; eco-luxury community with mature landscaping; ultra-exclusive with limited supply; villas ~AED 2,800-3,500/ft² depending on size and position.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Typical asset</h4>
                        <p className="text-sm">5–7BR eco-luxury villas with private gardens</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Acquisition budget band</h4>
                        <p className="text-sm font-semibold text-accent">AED 18–60M+ premium locations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  *Pricing data based on Q1-H1 2025 market analysis and recent comparable sales
                </p>
                <Button onClick={() => window.location.href = '/contact'} size="lg">
                  Request Detailed Market Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 10-Step Process */}
        <Card className="mx-4 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Our 10-Step Luxury Labs Process
            </CardTitle>
            <p className="text-muted-foreground">
              Our proven methodology ensures every project meets the highest standards of quality and profitability.
            </p>
          </CardHeader>
          <CardContent>
            {/* New Client Steps Highlight */}
            <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-primary mb-2">For New Clients</h4>
                <p className="text-sm text-muted-foreground">Start your investment journey with these essential first steps</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {process.slice(0, 3).map((step) => (
                  <div key={step.step} className="relative">
                    <div className="flex flex-col items-center text-center p-6 bg-primary/10 border-2 border-primary/30 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg">
                        {step.step}
                      </div>
                      <h4 className="font-semibold text-base mb-3 text-primary">{step.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Process Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {process.map((step, index) => (
                <div key={step.step} className="relative">
                  <div className="flex flex-col items-center text-center p-4 bg-card border rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm mb-3">
                      {step.step}
                    </div>
                    <h4 className="font-semibold text-sm mb-2">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-2 w-4 h-0.5 bg-primary/30"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
              Ready to Transform Your Investment Portfolio?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Dubai's most exclusive real estate investment opportunities. Limited spots available for qualified investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => window.location.href = '/contact'}>
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/projects'}>
                Explore Current Opportunities
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Services