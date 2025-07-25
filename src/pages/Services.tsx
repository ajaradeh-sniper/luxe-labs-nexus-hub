import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  ArrowRight
} from "lucide-react"

const Services = () => {
  const services = [
    {
      id: 'investment-flips',
      title: 'Property Investment Flips',
      description: 'Join our profitable property flip investments with transparent ROI sharing and professional management.',
      icon: TrendingUp,
      price: 'Min. $100K investment',
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
      highlight: true
    },
    {
      id: 'hnwi-renovations',
      title: 'HNWI Concierge Renovations',
      description: 'Premium renovation services for high-net-worth individuals with dedicated project management.',
      icon: Home,
      price: 'Custom pricing',
      timeline: '3-18 months',
      features: [
        'Dedicated project manager',
        'Premium material sourcing',
        'Custom design consultation',
        '24/7 concierge support',
        'Quality assurance inspections',
        'Post-completion maintenance'
      ],
      cta: 'Request Consultation',
      highlight: false
    },
    {
      id: 'investment-opportunities',
      title: 'Investment Opportunities',
      description: 'Curated luxury property investment opportunities with detailed analysis and projections.',
      icon: DollarSign,
      price: 'Various entry points',
      timeline: 'Ongoing',
      features: [
        'Market analysis reports',
        'Financial projections',
        'Risk assessment',
        'Due diligence support',
        'Investment portfolio tracking',
        'Exit strategy planning'
      ],
      cta: 'View Opportunities',
      highlight: false
    },
    {
      id: 'project-management',
      title: 'Complete Project Management',
      description: 'End-to-end project management from acquisition to completion with our proven 10-step process.',
      icon: Settings,
      price: 'Included in all services',
      timeline: 'Project duration',
      features: [
        '10-step luxury process',
        'Timeline management',
        'Quality control',
        'Vendor coordination',
        'Progress reporting',
        'Client communication'
      ],
      cta: 'Learn Process',
      highlight: false
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
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive luxury property services designed for investors and high-net-worth individuals 
            seeking exceptional returns and premium experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.id} className={`relative ${service.highlight ? 'ring-2 ring-primary' : ''}`}>
                {service.highlight && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-background" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                      </div>
                    </div>
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
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant={service.highlight ? "luxury" : "outline"} 
                    className="w-full mt-4"
                    onClick={() => window.location.href = '/contact'}
                  >
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
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