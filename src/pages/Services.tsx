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
  ChevronUp
} from "lucide-react"
import renovationShowcase from "@/assets/renovation-showcase.jpg"
import luxuryInteriorModern from "@/assets/luxury-interior-modern.jpg"
import dubaeMarinaLuxury from "@/assets/dubai-marina-luxury.jpg"

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