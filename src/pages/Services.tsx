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
  Zap
} from "lucide-react"
import renovationShowcase from "@/assets/renovation-showcase.jpg"
import luxuryInteriorModern from "@/assets/luxury-interior-modern.jpg"
import dubaeMarinaLuxury from "@/assets/dubai-marina-luxury.jpg"
import businessBay from "@/assets/business-bay.jpg"
import downtownLuxury from "@/assets/downtown-luxury.jpg"
import marinaTower from "@/assets/marina-tower.jpg"
import premiumTower from "@/assets/premium-tower.jpg"
import premiumVillaSelection from "@/assets/premium-villa-selection.jpg"
import modernArchitecture from "@/assets/modern-architecture.jpg"

const Services = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const services = [
    {
      id: 'real-estate-investment',
      title: 'Real Estate Investment (Flips & Fund)',
      description: 'Join our profitable property flip investments with transparent ROI sharing and professional management.',
      icon: TrendingUp,
      price: 'Min. AED 500K investment',
      timeline: '6-12 months',
      features: [
        'Transparent ROI tracking',
        'Professional property selection',
        'Complete renovation management',
        'Shared profit distribution',
        'Regular progress updates',
        'Legal documentation included'
      ],
      cta: 'Explore Opportunities',
      highlight: true,
      expandedOptions: [
        {
          title: 'Diversified Fund',
          returns: '25-30%',
          investment: 'AED 500K',
          description: 'Diversified across 10+ properties',
          features: [
            'Minimum investment: AED 500K',
            'Diversified across 10+ properties',
            'Professional management included',
            'Quarterly performance reports',
            'Exit flexibility after 12 months'
          ]
        },
        {
          title: 'Single Property',
          returns: '10% to 30%',
          investment: 'AED 1M',
          description: 'Full transparency on single asset',
          features: [
            'Minimum investment: AED 1M',
            'Full transparency on single asset',
            'Direct involvement opportunities',
            'Higher return potential',
            '6-12 month typical timeline'
          ],
          popular: true
        },
        {
          title: 'VIP Membership',
          returns: '30%-30%',
          investment: 'AED 5M',
          description: 'First access to premium deals',
          features: [
            'Minimum investment: AED 5M',
            'First access to premium deals',
            'Personal relationship manager',
            'Customized investment strategies',
            'Exclusive networking events'
          ]
        }
      ]
    },
    {
      id: 'luxury-consulting',
      title: 'Luxury Real Estate Consulting',
      description: 'Comprehensive consulting services including investment advisory, property transformation, sourcing, project management, and HNWI concierge services.',
      icon: Home,
      price: 'Custom pricing',
      timeline: '3-18 months',
      features: [
        'Investment advisory & strategy',
        'Property transformation consulting',
        'Premium property sourcing',
        'End-to-end project management',
        'HNWI Real Estate Concierge',
        'Dubai relocation services (A-Z)'
      ],
      cta: 'Request Consultation',
      highlight: false,
      expandedOptions: [
        {
          title: 'Investment Advisory',
          description: 'Strategic investment guidance and market analysis',
          features: [
            'Market analysis & due diligence',
            'Investment strategy development',
            'Portfolio optimization',
            'Risk assessment & mitigation',
            'Exit strategy planning'
          ]
        },
        {
          title: 'Property Transformation',
          description: 'Complete property renovation and enhancement services',
          features: [
            'Design & renovation consultation',
            'Project management & oversight',
            'Quality control & inspections',
            'Vendor coordination',
            'Timeline & budget management'
          ]
        },
        {
          title: 'HNWI Concierge',
          description: 'Complete Dubai relocation and property services',
          features: [
            'Dubai relocation consultation (A-Z)',
            'Property purchase assistance',
            'Home transformation services',
            'Legal & documentation support',
            'Ongoing concierge services'
          ]
        }
      ]
    }
  ]

  const process = [
    { step: 1, title: 'Initial Inquiry & Lead Capture', description: 'Website, WhatsApp, referrals' },
    { step: 2, title: 'Client Qualification', description: 'Investment goals, budget, preferences' },
    { step: 3, title: 'KYC & Due Diligence', description: 'Passport, Emirates ID, AML compliance' },
    { step: 4, title: 'Project Presentation', description: 'Property analysis, financial projections' },
    { step: 5, title: 'Legal Agreement Signing', description: 'NDA, JVA, investment agreements' },
    { step: 6, title: 'Property Acquisition', description: 'Purchase, DLD registration, title transfer' },
    { step: 7, title: 'Renovation Initiation', description: 'Timeline, status reports, site visits' },
    { step: 8, title: 'Project Completion', description: 'Final inspection, handover, certification' },
    { step: 9, title: 'Sale or Rental', description: 'Marketing, listing, buyer negotiations' },
    { step: 10, title: 'Follow-up & Aftercare', description: 'Maintenance, feedback, future opportunities' }
  ]

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${renovationShowcase})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
        <div className="relative container mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">Our Services</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Comprehensive luxury property services designed for investors and high-net-worth individuals 
            seeking exceptional returns and premium experiences.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-12">

        {/* Our Services */}
        <div className="grid grid-cols-1 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            const isExpanded = expandedService === service.id
            const serviceImage = service.id === 'real-estate-investment' ? luxuryInteriorModern : dubaeMarinaLuxury
            
            return (
              <Card key={service.id} className={`relative hover:shadow-md transition-shadow ${service.highlight ? 'ring-2 ring-primary' : ''}`}>
                {service.highlight && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-1">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center">
                            <Icon className="h-6 w-6 text-background" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl">{service.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedService(isExpanded ? null : service.id)}
                          className="ml-4 bg-primary/10 border-primary/30 hover:bg-primary/20 text-primary font-medium"
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          <span className="ml-1 text-xs">{isExpanded ? 'Less' : 'More'}</span>
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-4 w-4 text-success" />
                          <span className="font-medium">{service.price}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{service.timeline}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {service.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                        {service.features.length > 4 && (
                          <p className="text-xs text-muted-foreground">+{service.features.length - 4} more features</p>
                        )}
                      </div>

                      {/* Expanded Options */}
                      {isExpanded && service.expandedOptions && (
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="text-lg font-semibold mb-4">Available Options:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.expandedOptions.map((option, index) => (
                              <Card key={index} className={`p-4 ${option.popular ? 'ring-2 ring-primary' : 'border'}`}>
                                {option.popular && (
                                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-primary text-primary-foreground text-xs">Most Popular</Badge>
                                  </div>
                                )}
                                <div className="text-center mb-4">
                                  <h5 className="font-semibold text-lg mb-1">{option.title}</h5>
                                  {option.returns && (
                                    <div className="text-2xl font-bold text-primary mb-1">{option.returns}</div>
                                  )}
                                  {option.investment && (
                                    <p className="text-sm text-muted-foreground mb-2">Min. {option.investment}</p>
                                  )}
                                  <p className="text-sm text-muted-foreground">{option.description}</p>
                                </div>
                                <ul className="space-y-2 mb-4">
                                  {option.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-2">
                                      <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                                      <span className="text-sm">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                                <Button 
                                  variant={option.popular ? "default" : "outline"} 
                                  size="sm" 
                                  className="w-full"
                                  onClick={() => window.location.href = '/contact'}
                                >
                                  Learn More
                                </Button>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </div>
                  
                  <div className="w-full lg:w-80 lg:flex lg:flex-col lg:justify-between p-6">
                    <div className="aspect-video lg:aspect-[4/3] overflow-hidden rounded-lg mb-4 group">
                      <img 
                        src={serviceImage} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <Button 
                      variant={service.highlight ? "luxury" : "outline"} 
                      className="w-full"
                      onClick={() => window.location.href = '/contact'}
                    >
                      {service.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Luxury Labs Approach */}
        <Card className="luxury-border luxury-shadow bg-background backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              The Luxury Labs Approach
            </CardTitle>
            <p className="text-muted-foreground">
              Our proven methodology combines data-driven market analysis, premium design expertise, and strategic investment planning to deliver exceptional results.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-background" />
                </div>
                <h4 className="font-semibold text-lg mb-3">Data-Driven Analysis</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We utilize comprehensive market data, neighborhood trends, and comparative property analysis to identify the highest-potential investment opportunities.
                </p>
                <ul className="text-xs space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Real-time market analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Comparative property studies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    ROI prediction modeling
                  </li>
                </ul>
              </div>
              
              <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-background" />
                </div>
                <h4 className="font-semibold text-lg mb-3">Premium Transformation</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our design and renovation team creates luxury living spaces that command premium prices and attract discerning buyers and tenants.
                </p>
                <ul className="text-xs space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Luxury interior design
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    High-end material selection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Professional project management
                  </li>
                </ul>
              </div>
              
              <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-background" />
                </div>
                <h4 className="font-semibold text-lg mb-3">Strategic Investment</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Every investment decision is backed by thorough financial analysis, risk assessment, and strategic planning to maximize returns.
                </p>
                <ul className="text-xs space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Portfolio optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Risk mitigation strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Exit strategy planning
                  </li>
                </ul>
              </div>
              
              <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-background" />
                </div>
                <h4 className="font-semibold text-lg mb-3">Accelerated Results</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our streamlined processes and established vendor networks ensure faster project completion and quicker time to market.
                </p>
                <ul className="text-xs space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Fast-track renovations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Established vendor network
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                    Rapid market positioning
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Key Results Section */}
            <div className="mt-12 pt-8 border-t">
              <h4 className="text-xl font-semibold text-center mb-8">Proven Track Record</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">250+</div>
                  <div className="text-sm text-muted-foreground">Properties Transformed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">25%</div>
                  <div className="text-sm text-muted-foreground">Average ROI</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">6-12</div>
                  <div className="text-sm text-muted-foreground">Months Timeline</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10-Step Process */}
        <Card>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {process.map((step) => (
                <div key={step.step} className="relative">
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center text-background font-bold text-sm mb-3">
                      {step.step}
                    </div>
                    <h4 className="font-semibold text-sm mb-2">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {step.step < 10 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prime Dubai Locations */}
        <Card className="luxury-border luxury-shadow bg-background backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Prime Locations Luxury Labs Focus on
            </CardTitle>
            <p className="text-muted-foreground">
              Strategic locations with exceptional growth potential and luxury living experiences in Dubai's most sought-after areas.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={dubaeMarinaLuxury} 
                    alt="Dubai Marina" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-3">Dubai Marina</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Waterfront lifestyle with stunning marina views, premium amenities, and strong rental yields in one of Dubai's most vibrant communities.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      High rental yield potential (6-8%)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Waterfront luxury living
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Strong resale value
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      World-class dining & entertainment
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={downtownLuxury} 
                    alt="Downtown Dubai" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-3">Downtown Dubai</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    The heart of modern Dubai featuring iconic landmarks, luxury shopping, and premium residential developments with unmatched prestige.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Iconic Burj Khalifa vicinity
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Premium location prestige
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Excellent connectivity
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Dubai Mall & Opera nearby
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={businessBay} 
                    alt="Business Bay" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-3">Business Bay</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Dubai's central business district offering modern luxury towers, canal views, and excellent investment returns in a thriving commercial hub.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Central business district location
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Dubai Canal waterfront
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      High appreciation potential
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Modern luxury developments
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={marinaTower} 
                    alt="Palm Jumeirah" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-3">Palm Jumeirah</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    World-famous man-made island offering exclusive beachfront properties, luxury resorts, and unparalleled prestige in Dubai's real estate market.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Exclusive beachfront living
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      World-renowned landmark
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Ultra-luxury properties
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Premium resort amenities
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={premiumVillaSelection} 
                    alt="Dubai Hills Estate" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-3">Dubai Hills Estate</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Master-planned community featuring golf course views, family-friendly amenities, and modern villas with excellent growth potential.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Championship golf course
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Family-oriented community
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Modern villa developments
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Strong capital appreciation
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={premiumTower} 
                    alt="JBR - Jumeirah Beach Residence" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-3">JBR - Jumeirah Beach Residence</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Beachfront towers with direct beach access, vibrant nightlife, and premium rental opportunities in Dubai's most popular coastal destination.
                  </p>
                  <ul className="text-xs space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Direct beach access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Vibrant beachfront lifestyle
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      Strong tourism demand
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                      The Walk entertainment district
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* CTA Section */}
        <Card className="bg-gradient-luxury text-background">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Luxury Property Journey?</h2>
            <p className="text-background/80 mb-6 max-w-2xl mx-auto">
              Whether you're looking to invest in profitable property flips or need premium renovation services, 
              our expert team is ready to deliver exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90"
                onClick={() => window.location.href = '/contact'}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Start a Flip Investment
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90"
                onClick={() => window.location.href = '/contact'}
              >
                <Users className="mr-2 h-4 w-4" />
                Request Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Services