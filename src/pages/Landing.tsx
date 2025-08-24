import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Building2, LayoutDashboard, Phone, Mail, MapPin, Users, Award, TrendingUp, Star, CheckCircle, ArrowRight, Handshake, Globe, Palette, ChevronDown, ChevronUp, PiggyBank, Eye } from "lucide-react";
import luxuryLabsLogo from "@/assets/luxury-labs-logo.png";
import heroImage from "/lovable-uploads/d4ad1a46-cb19-4670-bb37-9f665291308a.png";
import flippingDubaiLogo from "/lovable-uploads/d2dfa4c3-7fd3-40db-af51-ad041d2b2ce2.png";
import modernArchImage from "@/assets/modern-architecture.jpg";
import luxuryBuildingImage from "@/assets/luxury-building.jpg";
import premiumTowerImage from "@/assets/premium-tower.jpg";
import premiumSelectionImage from "@/assets/premium-selection.jpg";
import luxuryTransformationImage from "@/assets/luxury-transformation.jpg";
import exceptionalReturnsImage from "@/assets/exceptional-returns.jpg";
import roiInvestmentImage from "@/assets/roi-investment.jpg";
import premiumVillaSelectionImage from "@/assets/premium-villa-selection.jpg";
import beforeAfterTransformationImage from "@/assets/before-after-transformation.jpg";
import investmentPartnershipImage from "@/assets/investment-partnership-handshake.jpg";
import luxuryFinishesImage from "@/assets/luxury-finishes-install-thumbnail.jpg";
import professionalTeamImage from "@/assets/professional-team.jpg";
import barovieToso from "@/assets/barovie-toso-logo.png";
import boseLogo from "@/assets/bose-logo.png";
import espaceLogo from "@/assets/espace-logo.png";
import linealightLogo from "@/assets/linealight-logo.png";
import prestigeLogo from "@/assets/prestige-logo.png";
import venetacucineLogo from "@/assets/venetacucine-logo.png";
import forbesLogo from "@/assets/forbes-logo.png";
import arabianBusinessLogo from "@/assets/arabian-business-logo.png";
import gulfNewsLogo from "@/assets/gulf-news-logo.png";
import hgtvLogo from "@/assets/hgtv-logo.png";
export default function Landing() {
  const [showInvestmentDropdown, setShowInvestmentDropdown] = useState(false);
  const [showTransformationDropdown, setShowTransformationDropdown] = useState(false);
  const [showAdvisoryDropdown, setShowAdvisoryDropdown] = useState(false);
  const [showConsultingDropdown, setShowConsultingDropdown] = useState(false);
  const [showTransformDropdown, setShowTransformDropdown] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(false);

  // Service data from Services page
  const investmentOptions = [
    {
      title: 'Shared Stake in Single Property Transformation Project (Flip)',
      returns: '10%-30%',
      investment: 'AED 1M (8-14 Months)',
      description: 'Full transparency on single asset',
      features: [
        'Minimum investment: AED 1M',
        'Full transparency on single asset',
        'Direct involvement opportunities',
        'Higher return potential',
        '6-12 month typical timeline'
      ]
    },
    {
      title: 'Single Property Transformation Project (Flip)',
      returns: '15%-30%',
      investment: 'AED 5M (8-14 Months)',
      description: 'First access to premium deals',
      features: [
        'Minimum investment: AED 5M',
        'First access to premium deals',
        'Personal relationship manager',
        'Customized investment strategies',
        'Exclusive networking events'
      ]
    },
    {
      title: 'Diversified Fund (Flip & Sell, Flip and Rent, Off-Plan)',
      returns: '2x-4x',
      investment: 'AED 500K (3-7 Years Commitment)',
      description: 'Diversified across 10+ properties',
      features: [
        'Minimum investment: AED 500K',
        'Diversified across 10+ properties',
        'Professional management included',
        'Quarterly performance reports',
        'Exit flexibility after 12 months'
      ]
    }
  ];

  const transformationOptions = [
    {
      title: 'Personal Property Transformation (Renovation)',
      description: 'Premium design, project management, material sourcing, furniture and staging',
      features: [
        'Premium design services',
        'Project management & oversight',
        'Material & product sourcing',
        'Furniture selection & staging',
        'Quality control & inspections'
      ]
    },
    {
      title: 'Property Aquisition, Transformation and Move-in Ready Services (HNWI Concierge)',
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
  ];

  const advisoryOptions = [
    {
      title: 'Luxury Real Estate & Property Transformation Advisory Services',
      description: 'Premium design, project management, material sourcing, furniture and staging',
      features: [
        'Premium design services',
        'Project management & oversight',
        'Material & product sourcing',
        'Furniture selection & staging',
        'Quality control & inspections'
      ]
    },
    {
      title: 'Personal Property Transformation (Renovation)',
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
      title: 'Property Aquisition, Transformation & Move-in Services (HNWI Concierge)',
      description: 'Complete Dubai relocation and property services',
      features: [
        'Dubai relocation consultation (A-Z)',
        'Property purchase assistance',
        'Home transformation services',
        'Legal & documentation support',
        'Ongoing concierge services'
      ]
    }
  ];
  return <div className="min-h-screen bg-background">
      <Navigation />

      {/* HOME - Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20"></div>
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Header with Logo */}
            <div className="text-center mb-16">
              <div className="inline-block relative">
                <img 
                  src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" 
                  alt="Luxury Labs Logo" 
                  className="h-32 sm:h-40 lg:h-48 w-auto mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl opacity-50 animate-pulse"></div>
              </div>
              
              <div className="mt-8 space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-playfair font-bold text-foreground leading-tight">
                  Transform <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Luxury</span> Real Estate with Exceptional Quality and Returns
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto leading-relaxed">
                  Partner with Luxury Labs for premium property transformations, strategic investments, and expert transformation and advisory services in Dubai's elite real estate market
                </p>
              </div>
            </div>

            {/* Modern Service Cards Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              
              {/* Investment Card */}
              <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={exceptionalReturnsImage} 
                    alt="Investment Partnership" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold font-playfair text-white mb-2">
                      Invest in Flipping Projects
                    </h3>
                    <p className="text-sm text-white/90 font-montserrat leading-relaxed">
                      Start a Project or join (Invest) in Real Estate Transformation (Flipping) Projects /Fund with Luxury Labs
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-montserrat text-foreground">25-30% ROI target</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-montserrat text-foreground">Minimum AED 500K investment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-montserrat text-foreground">Full transparency & reporting</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold font-montserrat group/btn"
                    onClick={() => window.location.href = '/investors'}
                  >
                    View Investors Details
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Transform Card */}
              <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={luxuryTransformationImage} 
                    alt="Luxury Property Transformation" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold font-playfair text-white mb-2">
                      Transform a Property with LL
                    </h3>
                    <p className="text-sm text-white/90 font-montserrat leading-relaxed">
                      Start a Transformation (Flip)/Project or Transform your Luxury Property with Luxury Labs
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm font-montserrat text-foreground">Luxury design & finishes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm font-montserrat text-foreground">Project management included</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm font-montserrat text-foreground">Value increase guarantee</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold font-montserrat group/btn"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Contact Us
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Advisory Card */}
              <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={premiumVillaSelectionImage} 
                    alt="Professional Advisory Services" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-secondary/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold font-playfair text-white mb-2">
                      Get Advisory from LL
                    </h3>
                    <p className="text-sm text-white/90 font-montserrat leading-relaxed">
                      Property transformation design, material/product sourcing, investment and financial advisory with Luxury Labs
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm font-montserrat text-foreground">Luxury Real Estate Design</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm font-montserrat text-foreground">Investment strategy planning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm font-montserrat text-foreground">HNWI concierge services</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold font-montserrat group/btn"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Contact Us
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Service Details Section */}
            <div className="mt-24 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
                  Service <span className="luxury-text">Details</span>
                </h2>
                <p className="text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto mb-8">
                  Explore our comprehensive investment and transformation options
                </p>
                
                {/* Toggle Button */}
                <Collapsible open={showServiceDetails} onOpenChange={setShowServiceDetails}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="group bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                    >
                      {showServiceDetails ? 'Hide Details' : 'View All Service Details'}
                      {showServiceDetails ? (
                        <ChevronUp className="ml-2 h-5 w-5 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300" />
                      )}
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="mt-12 grid lg:grid-cols-2 gap-12">
                      {/* Investment Options */}
                      <div className="animate-fade-in">
                        <h3 className="text-2xl font-playfair font-bold text-foreground mb-6 text-center">Investment Options</h3>
                        <div className="space-y-4">
                          {investmentOptions.map((option, index) => (
                            <Card key={index} className="p-4 border border-border bg-card/50 relative hover:shadow-lg transition-all duration-300 hover-scale hover:border-yellow-500 hover:bg-yellow-50/10 active:bg-yellow-100/20 active:border-yellow-600">
                              <div className="flex gap-3">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                  <img 
                                    src={index === 0 ? exceptionalReturnsImage : index === 1 ? roiInvestmentImage : investmentPartnershipImage} 
                                    alt={option.title} 
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="mb-2">
                                    <h4 className="font-semibold text-base mb-1">{option.title}</h4>
                                    {option.returns && (
                                      <div className="text-lg font-bold text-primary mb-1">{option.returns}</div>
                                    )}
                                    {option.investment && (
                                      <p className="text-xs text-muted-foreground mb-1">Min. {option.investment}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">{option.description}</p>
                                  </div>
                                  <ul className="space-y-1 mb-3">
                                    {option.features.slice(0, 3).map((feature, featureIndex) => (
                                      <li key={featureIndex} className="flex items-start gap-2">
                                        <CheckCircle className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-xs">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <Button 
                                    size="sm"
                                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold font-montserrat transition-all duration-300 hover:scale-105"
                                    onClick={() => window.location.href = '/investors'}
                                  >
                                    Learn More
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Advisory Services */}
                      <div className="animate-fade-in">
                        <h3 className="text-2xl font-playfair font-bold text-foreground mb-6 text-center">Transformation Services</h3>
                        <div className="space-y-4">
                          {advisoryOptions.map((option, index) => (
                            <Card key={index} className="p-4 border border-border bg-card/50 relative hover:shadow-lg transition-all duration-300 hover-scale hover:border-yellow-500 hover:bg-yellow-50/10 active:bg-yellow-100/20 active:border-yellow-600">
                              <div className="flex gap-3">
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                  <img 
                                    src={index === 0 ? premiumVillaSelectionImage : index === 1 ? professionalTeamImage : premiumSelectionImage} 
                                    alt={option.title} 
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="mb-2">
                                    <h4 className="font-semibold text-base mb-1">{option.title}</h4>
                                    <div className="text-lg font-bold text-primary mb-1">Premium Service</div>
                                    <p className="text-xs text-muted-foreground mb-1">Professional Grade</p>
                                    <p className="text-xs text-muted-foreground">{option.description}</p>
                                  </div>
                                  <ul className="space-y-1 mb-3">
                                    {option.features.slice(0, 3).map((feature, featureIndex) => (
                                      <li key={featureIndex} className="flex items-start gap-2">
                                        <CheckCircle className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-xs">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <Button 
                                    size="sm"
                                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold font-montserrat transition-all duration-300 hover:scale-105"
                                    onClick={() => window.location.href = '/contact'}
                                  >
                                    Learn More
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="text-center">
            </div>
          </div>
        </div>
      </section>

      
      {/* PROCESS Section */}
      {/* SERVICES Section */}
      <section id="services" className="py-24 px-4 bg-gradient-elegant">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Our <span className="luxury-text">Objectives</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto">
              Discover how Luxury Labs transforms Dubai's real estate landscape through our three core specializations
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Unique Properties Selection */}
            <Card className="elegant-card group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Premium Properties Selection
                </h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed mb-6">
                  Curating Dubai's rarest addresses. We identify exceptional properties in prime locations like Palm Jumeirah, offering exclusive access to luxury real estate opportunities.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Prime waterfront locations
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Exclusive off-market properties
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Expert market analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Luxury Transformation */}
            <Card className="elegant-card group">
              <CardContent className="p-8">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6">
                  <div className="text-primary-foreground font-bold text-xl font-playfair">LL</div>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  LL Signature Transformation
                </h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed mb-6">
                  Our signature renovation process elevates properties to luxury standards. From design to execution, we create bespoke living spaces that maximize value and appeal.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Bespoke interior design, Landscaping and curb appeal
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Premium material selection
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Project management excellence
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Exceptional Returns */}
            <Card className="elegant-card group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-white font-bold text-2xl font-playfair">%</div>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Exceptional Returns on Investment
                </h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed mb-6">
                  Where investments reach new heights. Our strategic approach delivers superior ROI through careful market timing, premium transformations, and expert sales execution.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Target 30%+ ROI
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Strategic market timing
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Premium sales execution
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Transparent Progress Monitoring */}
            <Card className="elegant-card group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
                  Transparent & Live Progress Monitoring
                </h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed mb-6">
                  Complete visibility into your investment journey. Real-time updates, milestone tracking, and transparent reporting keep you informed every step of the way.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Real-time project updates
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Milestone tracking dashboard
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Transparent financial reporting
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ABOUT Section */}
      <section id="about" className="py-24 px-4 bg-gradient-elegant">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              About <span className="luxury-text">Luxury Labs</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Luxury Labs is Dubai's premier property investment and transformation platform, specializing in strategic premium properties that deliver exceptional returns. Our expertise combines luxury real estate knowledge with innovative transformation processes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <Card className="glass-card group hover:scale-105 transition-all duration-300 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Luxury Design & Project Management Expertise</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Years of experience in Dubai's luxury real estate market with a proven track record of successful transformations.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card group hover:scale-105 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.1s'
          }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Premium Network of Luxury Suppliers</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Exclusively serving high-net-worth individuals with personalized investment strategies and white-glove service.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card group hover:scale-105 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300">
                  <TrendingUp className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Real Estate & Investment Expertise</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Target 30%+ ROI through strategic property selection, luxury transformations, and expert market timing.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card group hover:scale-105 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.3s'
          }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Strategic Investors Community</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Exclusive network of sophisticated investors collaborating on premium Dubai real estate opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Learn More Button */}
          <div className="text-center mt-12">
            <Link to="/about">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-foreground font-semibold font-montserrat px-8 py-3 text-lg"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS Section */}

      {/* INVESTORS Section */}
      <section id="investors" className="py-24 px-4 bg-gradient-elegant">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Investor <span className="luxury-text">Portal</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto">
              Join our exclusive network of high-net-worth investors and access premium property investment opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Ready to Invest + Features */}
            <div className="space-y-8">
              {/* Ready to Invest Box */}
              <div className="text-center">
                <div className="elegant-card p-8">
                  <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">Ready to Invest?</h3>
                  <p className="text-muted-foreground font-montserrat mb-6">
                    Access our investor dashboard to explore current opportunities and track your portfolio performance.
                  </p>
                  <Button asChild size="lg" className="w-full bg-gradient-dark text-primary-glow border border-primary/20 hover:border-primary/40 hover:shadow-glow font-montserrat mb-4">
                    <Link to="/investors">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Access Investor Portal
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="w-full luxury-gradient hover:luxury-glow hover:scale-105 transition-all duration-300 font-montserrat">
                    <Link to="/investors">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Features Section */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 luxury-gradient rounded-lg flex items-center justify-center mt-1">
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-foreground mb-2">Exclusive Access</h3>
                    <p className="text-muted-foreground font-montserrat">First access to our premium property investment opportunities.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 luxury-gradient rounded-lg flex items-center justify-center mt-1">
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-foreground mb-2">Transparent Reporting</h3>
                    <p className="text-muted-foreground font-montserrat">Real-time project updates and detailed financial reporting.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 luxury-gradient rounded-lg flex items-center justify-center mt-1">
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-foreground mb-2">Guaranteed Returns</h3>
                    <p className="text-muted-foreground font-montserrat">Structured investments with minimum return guarantees.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div>
              <div className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 font-playfair text-center">Dashboard Preview</h3>
                
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
                        src="src/assets/palm-villa-for-sale.jpg" 
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
                        src="src/assets/luxury-penthouse.jpg" 
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
                        src="src/assets/downtown-luxury.jpg" 
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS Section */}
      <section id="projects" className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Featured <span className="luxury-text">Projects</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto">
              Explore our portfolio of successfully transformed luxury properties across Dubai's most prestigious locations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card group overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="relative h-64 overflow-hidden">
                <img src={luxuryBuildingImage} alt="Business Bay Luxury Apartment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <Badge className="absolute top-4 right-4 luxury-gradient text-primary-foreground font-montserrat">SOLD</Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-bold text-2xl font-playfair drop-shadow-lg">32% ROI</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2">Business Bay Luxury Apartment</h3>
                <p className="text-muted-foreground font-montserrat text-sm mb-4">
                  Complete transformation of a 2BR apartment with premium finishes and smart home integration.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-montserrat text-muted-foreground">6 months</span>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card group overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.1s'
          }}>
              <div className="relative h-64 overflow-hidden">
                <img src={modernArchImage} alt="Downtown Dubai Penthouse" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <Badge className="absolute top-4 right-4 luxury-gradient text-primary-foreground font-montserrat">SOLD</Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-bold text-2xl font-playfair drop-shadow-lg">45% ROI</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2">Downtown Dubai Penthouse</h3>
                <p className="text-muted-foreground font-montserrat text-sm mb-4">
                  Luxury penthouse renovation with panoramic city views and high-end European fixtures.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-montserrat text-muted-foreground">8 months</span>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card group overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="relative h-64 overflow-hidden">
                <img src={premiumTowerImage} alt="Marina Tower Villa" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-montserrat">ACTIVE</Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-bold text-2xl font-playfair drop-shadow-lg">Est. 38% ROI</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2">Marina Waterfront Villa</h3>
                <p className="text-muted-foreground font-montserrat text-sm mb-4">
                  Ongoing transformation of waterfront villa with private beach access and infinity pool.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-montserrat text-muted-foreground">12 months</span>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 animate-fade-in">
            <Button asChild size="lg" className="luxury-gradient hover:luxury-glow hover:scale-105 transition-all duration-300 font-montserrat">
              <Link to="/projects">
                View Details
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* MEDIA Section */}
      <section id="media" className="py-24 px-4 bg-gradient-elegant">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Media & <span className="luxury-text">Recognition</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto">
              Featured in leading publications and recognized by industry experts for our innovative approach to luxury property transformation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Forbes', logo: forbesLogo },
              { name: 'Arabian Business', logo: arabianBusinessLogo },
              { name: 'Gulf News', logo: gulfNewsLogo },
              { name: 'HGTV', logo: hgtvLogo }
            ].map((publication, index) => (
              <Card key={index} className="elegant-card">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4 mx-auto bg-white/10 backdrop-blur-sm">
                    <img 
                      src={publication.logo} 
                      alt={`${publication.name} logo`} 
                      className="max-w-16 max-h-16 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="font-playfair font-bold text-foreground mb-2">{publication.name}</h3>
                  <p className="text-sm text-muted-foreground font-montserrat">Featured Publication</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Learn More Button */}
          <div className="text-center mt-12">
            <Link to="/media">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-foreground font-semibold font-montserrat px-8 py-3 text-lg"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS Section */}
      <section id="partners" className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Our <span className="luxury-text">Partners</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto">
              Collaborating with Dubai's finest architects, designers, and contractors to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="elegant-card">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Handshake className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Design Partners</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Award-winning interior designers and architects specializing in luxury residential projects.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-card">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Building2 className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Construction Partners</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Premium construction companies with proven expertise in high-end residential developments.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-card">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Globe className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Global Suppliers</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  International network of premium material suppliers and luxury fixture providers.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Learn More Button */}
          <div className="text-center mt-12">
            <Link to="/partners">
              <Button 
                size="lg" 
                className="luxury-button font-montserrat px-8 py-3 text-lg"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* CONTACT Section */}
      <section id="contact" className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Contact <span className="luxury-text">Us</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your next property investment? Get in touch with our team of experts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="elegant-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Phone className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Phone</h3>
                <p className="text-muted-foreground font-montserrat mb-4">Speak directly with our investment team</p>
                <a href="tel:+971-4-XXX-XXXX" className="text-primary font-montserrat font-semibold hover:underline">
                  +971 4 XXX XXXX
                </a>
              </CardContent>
            </Card>

            <Card className="elegant-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Mail className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Email</h3>
                <p className="text-muted-foreground font-montserrat mb-4">Send us your investment inquiries</p>
                <a href="mailto:invest@luxurylabs.ae" className="text-primary font-montserrat font-semibold hover:underline">
                  invest@luxurylabs.ae
                </a>
              </CardContent>
            </Card>

            <Card className="elegant-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Office</h3>
                <p className="text-muted-foreground font-montserrat mb-4">Visit our Dubai office</p>
                <address className="text-primary font-montserrat font-semibold not-italic">
                  DIFC, Dubai<br />
                  United Arab Emirates
                </address>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="luxury-gradient hover:luxury-glow font-montserrat">
              <Link to="/contact">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* MEDIA PARTNERS Section */}
      <section className="py-16 px-4 bg-gradient-elegant border-t border-muted">
        <div className="container mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-8">
              Our <span className="luxury-text">Media Partner</span>
            </h3>
            <div className="flex justify-center items-center">
              <a href="https://www.youtube.com/@FlippingDubai" target="_blank" rel="noopener noreferrer" className="group hover:scale-105 transition-all duration-300">
                <img src={flippingDubaiLogo} alt="Flipping Dubai - YouTube Channel" className="h-16 object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300" />
              </a>
            </div>
            <p className="text-muted-foreground font-montserrat text-sm mt-4 max-w-2xl mx-auto">
              Follow our transformation journeys and investment insights on <a href="https://www.youtube.com/@FlippingDubai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Flipping Dubai YouTube Channel</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" alt="Luxury Labs Logo" className="h-16 w-auto" />
              </div>
              <p className="text-secondary-foreground/80 font-montserrat text-sm">
                Dubai's premier property investment and transformation platform.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-secondary-foreground font-playfair mb-4">Services</h4>
              <ul className="space-y-2 font-montserrat text-sm">
                <li><a href="#services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Property Investment</a></li>
                <li><a href="#services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Luxury Transformation</a></li>
                <li><a href="#services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Portfolio Management</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-secondary-foreground font-playfair mb-4">Company</h4>
              <ul className="space-y-2 font-montserrat text-sm">
                <li><a href="#about" className="text-secondary-foreground/80 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#projects" className="text-secondary-foreground/80 hover:text-primary transition-colors">Projects</a></li>
                <li><a href="#contact" className="text-secondary-foreground/80 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-secondary-foreground font-playfair mb-4">Legal</h4>
              <ul className="space-y-2 font-montserrat text-sm">
                <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-secondary-foreground/80 hover:text-primary transition-colors">Investment Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center">
            <p className="text-secondary-foreground/60 font-montserrat text-sm">
              © 2025 Luxury Labs. All rights reserved. Licensed by RERA.
            </p>
          </div>
        </div>
      </footer>
    </div>;
}