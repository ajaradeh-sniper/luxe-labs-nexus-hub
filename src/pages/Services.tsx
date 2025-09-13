import { Helmet } from "react-helmet-async"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import emiratesHillsVilla from "@/assets/emirates-hills-luxury-villa.jpg"
import palmJumeirahVilla from "@/assets/palm-jumeirah-luxury-villa.jpg"
import jumeirahGolfEstateVilla from "@/assets/jumeirah-golf-estate-luxury-villa.jpg"
import jumeirahIslandsVilla from "@/assets/jumeirah-islands-luxury-villa.jpg"
import dubaiHillsVilla from "@/assets/dubai-hills-luxury-villa.jpg"
import alBarariVilla from "@/assets/al-barari-luxury-villa.jpg"

const Services = () => {
  const [selectedService, setSelectedService] = useState<string>("real-estate-investment")
  const [selectedLocation, setSelectedLocation] = useState<string>("emirates-hills")

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

  const locations = [
    {
      id: 'emirates-hills',
      name: 'Emirates Hills',
      image: emiratesHillsVilla,
      whyList: 'Dubai\'s most prestigious address with high-end villa sales; strong demand for luxury properties; villas ~AED 3,100-4,200/ft² (Q1-25).',
      typicalAsset: '6–8BR luxury signature villas with golf/skyline views',
      budget: 'AED 20–80M+ ultra-prime'
    },
    {
      id: 'palm-jumeirah',
      name: 'Palm Jumeirah',
      image: palmJumeirahVilla,
      whyList: 'World-famous artificial island; prime waterfront properties; strong rental yields and capital appreciation; villas ~AED 2,900-3,800/ft².',
      typicalAsset: '5–7BR beachfront villas with private beach access',
      budget: 'AED 25–120M frond/signature'
    },
    {
      id: 'jumeirah-golf-estate',
      name: 'Jumeirah Golf Estate',
      image: jumeirahGolfEstateVilla,
      whyList: 'Established golf community with strong fundamentals; family-oriented premium location; villas ~AED 2,850-3,400/ft² depending on golf views.',
      typicalAsset: '4–6BR golf-facing villas with course access',
      budget: 'AED 15–45M course premium'
    },
    {
      id: 'jumeirah-islands',
      name: 'Jumeirah Islands',
      image: jumeirahIslandsVilla,
      whyList: 'Lifestyle "islands" with strong upgrade premiums; villas at ~AED 3,024/ft² (Mar-24). Unique waterfront community with exclusive appeal.',
      typicalAsset: '4–6BR lake-facing villas',
      budget: 'AED 12–35M (cluster/condition)'
    },
    {
      id: 'dubai-hills',
      name: 'Dubai Hills',
      image: dubaiHillsVilla,
      whyList: 'Family prime with velocity; clear comp ladder by sub-community; villas ~AED 2,737/ft² (H1-25); triangulated by Q1-25 ~2,767/ft².',
      typicalAsset: 'Sidra/Maple (lighter), Golf Place/ Fairway/ Parkway Vistas (heavy)',
      budget: 'AED 8–45M by typology'
    },
    {
      id: 'al-barari',
      name: 'Al Barari',
      image: alBarariVilla,
      whyList: 'Dubai\'s green heart; eco-luxury community with mature landscaping; ultra-exclusive with limited supply; villas ~AED 2,800-3,500/ft² depending on size and position.',
      typicalAsset: '5–7BR eco-luxury villas with private gardens',
      budget: 'AED 18–60M+ premium locations'
    }
  ]

  const selectedServiceData = services.find(s => s.id === selectedService)
  const selectedLocationData = locations.find(l => l.id === selectedLocation)

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

        {/* Services Dropdowns */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Our Premium Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive real estate solutions tailored for sophisticated investors and high-net-worth individuals
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Service</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedServiceData && (
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <selectedServiceData.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{selectedServiceData.title}</CardTitle>
                        <p className="text-muted-foreground">{selectedServiceData.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <Badge variant="secondary" className="gap-1">
                        <DollarSign className="h-3 w-3" />
                        {selectedServiceData.price}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedServiceData.timeline}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {selectedServiceData.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Detailed Overview:</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {selectedServiceData.detailed}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-6">
                      <Button onClick={() => window.location.href = '/contact'}>
                        Get Started
                      </Button>
                      <Button variant="outline" onClick={() => window.location.href = '/projects'}>
                        View Examples
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedLocationData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{selectedLocationData.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative h-64 overflow-hidden rounded-lg">
                        <img 
                          src={selectedLocationData.image}
                          alt={`${selectedLocationData.name} luxury villa`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Why it makes the list</h4>
                          <p className="text-sm text-muted-foreground">{selectedLocationData.whyList}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Typical asset</h4>
                          <p className="text-sm">{selectedLocationData.typicalAsset}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Acquisition budget band</h4>
                          <p className="text-sm font-semibold text-accent">{selectedLocationData.budget}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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