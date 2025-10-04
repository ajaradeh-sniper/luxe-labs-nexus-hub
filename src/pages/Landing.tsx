import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Building2, LayoutDashboard, Phone, Mail, MapPin, Users, Award, TrendingUp, Star, CheckCircle, ArrowRight, Handshake, Globe, Palette, ChevronDown, ChevronUp, PiggyBank, Eye, DollarSign, Home, BarChart3, Shield, Briefcase, HeartHandshake, Zap, CalendarDays } from "lucide-react";
import { InvestorAssessmentModal } from "@/components/modals/InvestorAssessmentModal";
import luxuryLabsLogo from "@/assets/luxury-labs-logo.png";
import heroImage from "/lovable-uploads/d4ad1a46-cb19-4670-bb37-9f665291308a.png";
import flippingDubaiLogo from "/lovable-uploads/d2dfa4c3-7fd3-40db-af51-ad041d2b2ce2.png";
import modernArchImage from "@/assets/modern-architecture.jpg";
import luxuryBuildingImage from "@/assets/luxury-building.jpg";
import premiumTowerImage from "@/assets/premium-tower.jpg";
import premiumSelectionImage from "@/assets/premium-selection.jpg";
import luxuryTransformationImage from "@/assets/luxury-transformation.jpg";
import strategicPlanningImage from "@/assets/strategic-planning.jpg";
import sustainableLuxuryImage from "@/assets/sustainable-luxury.jpg";
import marketAnalysisImage from "@/assets/market-analysis.jpg";
import executionExcellenceImage from "@/assets/execution-excellence.jpg";
import exceptionalReturnsImage from "@/assets/exceptional-returns.jpg";
import roiInvestmentImage from "@/assets/roi-investment.jpg";
import premiumVillaSelectionImage from "@/assets/premium-villa-selection.jpg";
import beforeAfterTransformationImage from "@/assets/before-after-transformation.jpg";
import investmentPartnershipImage from "@/assets/investment-partnership-handshake.jpg";
import luxuryFinishesImage from "@/assets/luxury-finishes-install-thumbnail.jpg";
import professionalTeamImage from "@/assets/professional-team.jpg";
import investmentPartnershipSharedStake from "@/assets/investment-partnership-shared-stake.jpg";
import propertyFlippingTransformation from "@/assets/property-flipping-transformation.jpg";
import diversifiedPortfolioFund from "@/assets/diversified-portfolio-fund.jpg";
import realEstateConsultationAdvisory from "@/assets/real-estate-consultation-advisory.jpg";
import endToEndRenovation from "@/assets/end-to-end-renovation.jpg";
import hnwiConciergeAcquisition from "@/assets/hnwi-concierge-acquisition.jpg";
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
  const [showInvestorAssessment, setShowInvestorAssessment] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [legalNoticeOpen, setLegalNoticeOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  const investmentServices = [{
    title: 'Solo Investment',
    description: 'Flip a property with Luxury labs execution from acquisition to resale - your gateway to premium real estate transformation with guaranteed luxury execution.',
    buttons: [{
      text: 'Investment Assessment',
      action: 'assessment'
    }, {
      text: 'Learn More',
      href: '/services'
    }]
  }, {
    title: 'Co-Investment',
    description: 'Join Luxury Labs Transformation projects with pool of investors - share the rewards while minimizing individual risk through our vetted network.',
    buttons: [{
      text: 'Investment Assessment',
      action: 'assessment'
    }, {
      text: 'Learn More',
      href: '/services'
    }]
  }, {
    title: 'Fund Investment',
    description: "Diversified portfolio of luxury properties for long-term growth combining flips and rental income - professional fund management with multi-property diversification.",
    buttons: [{
      text: 'Coming Soon',
      href: '#',
      disabled: true
    }, {
      text: 'Learn More',
      href: '/services'
    }]
  }];
  const transformationServices = [{
    title: 'Dubai Relocation',
    description: 'End-to-end relocation support for moving to Dubai - from property sourcing to full design, renovation, and ongoing support in your new home.',
    buttons: [{
      text: 'Get Support',
      href: '/contact'
    }, {
      text: 'Learn More',
      href: '/services'
    }]
  }, {
    title: 'Advisory',
    description: 'Strategic guidance for property investment and luxury design - expert analysis, investment structuring, and portfolio optimization for maximum returns.',
    buttons: [{
      text: 'Get Advisory',
      href: '/contact'
    }, {
      text: 'Learn More',
      href: '/services'
    }]
  }, {
    title: 'Media & Marketing',
    description: 'Professional documentation and global marketing of property transformations - enhance your property value through professional filming, production, and worldwide marketing campaigns.',
    buttons: [{
      text: 'See Portfolio',
      href: '/media'
    }, {
      text: 'Learn More',
      href: '/services'
    }]
  }];

  const handleAssessmentClick = () => {
    setShowInvestorAssessment(true);
  };

  return <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-48 bg-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-playfair mb-6">
                Redefining Luxury Real Estate Investments in Dubai
              </h1>
              <p className="text-gray-700 font-montserrat text-lg mb-8">
                Unlock exclusive opportunities in Dubai's thriving property market with Luxury Labs.
                We specialize in high-end property transformations and strategic investments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={handleAssessmentClick}>
                  Start Investment Assessment
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/services">Explore Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <img
                src={heroImage}
                alt="Luxury Real Estate in Dubai"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured On Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 font-playfair mb-6">
            Featured On
          </h2>
          <div className="flex flex-wrap justify-around items-center gap-6">
            <img src={forbesLogo} alt="Forbes" className="h-8 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src={arabianBusinessLogo} alt="Arabian Business" className="h-8 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src={gulfNewsLogo} alt="Gulf News" className="h-8 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src={hgtvLogo} alt="HGTV" className="h-8 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-playfair mb-4">
              Our Core Services
            </h2>
            <p className="text-gray-700 font-montserrat text-lg">
              Discover how we can transform your property and investment goals into reality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Investment Services Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="text-primary h-6 w-6" />
                  <h3 className="text-xl font-semibold text-gray-900 font-playfair">Investment Services</h3>
                </div>
                <p className="text-gray-600 font-montserrat text-sm mb-4">
                  Maximize your returns with our strategic investment opportunities in Dubai's luxury real estate market.
                </p>
                <Button variant="secondary" asChild>
                  <Link to="/services">Explore Investments</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Transformation Services Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="text-primary h-6 w-6" />
                  <h3 className="text-xl font-semibold text-gray-900 font-playfair">Transformation Services</h3>
                </div>
                <p className="text-gray-600 font-montserrat text-sm mb-4">
                  Transform properties into stunning luxury homes with our expert renovation and design services.
                </p>
                <Button variant="secondary" asChild>
                  <Link to="/services">View Transformations</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Advisory Services Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="text-primary h-6 w-6" />
                  <h3 className="text-xl font-semibold text-gray-900 font-playfair">Advisory Services</h3>
                </div>
                <p className="text-gray-600 font-montserrat text-sm mb-4">
                  Get expert advice on property investments, market trends, and luxury design strategies.
                </p>
                <Button variant="secondary" asChild>
                  <Link to="/services">Get Expert Advice</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Opportunities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-4">
              Explore Investment Opportunities
            </h2>
            <p className="text-gray-700 font-montserrat text-lg">
              Discover a range of investment options tailored to your financial goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {investmentServices.map((service, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 font-playfair mb-3">{service.title}</h3>
                  <p className="text-gray-600 font-montserrat text-sm mb-4">{service.description}</p>
                  <div className="flex flex-col gap-2">
                    {service.buttons.map((button, btnIndex) => (
                      <Button
                        key={btnIndex}
                        variant={btnIndex === 0 ? "primary" : "outline"}
                        asChild={button.href !== '#'}
                        disabled={button.disabled}
                        onClick={button.action === 'assessment' ? handleAssessmentClick : undefined}
                      >
                        {button.href !== '#' ? <Link to={button.href}>{button.text}</Link> : button.text}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Showcase Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-4">
              Luxury Transformation Showcase
            </h2>
            <p className="text-gray-700 font-montserrat text-lg">
              Witness the stunning transformations we've achieved for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Transformation Example 1 */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <img
                src={beforeAfterTransformationImage}
                alt="Property Transformation"
                className="rounded-md object-cover h-64 w-full"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 font-playfair mb-2">
                  Before & After: Modern Villa Renovation
                </h3>
                <p className="text-gray-600 font-montserrat text-sm">
                  A complete overhaul of a traditional villa into a modern, luxurious living space.
                </p>
              </CardContent>
            </Card>

            {/* Transformation Example 2 */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <img
                src={propertyFlippingTransformation}
                alt="Property Transformation"
                className="rounded-md object-cover h-64 w-full"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 font-playfair mb-2">
                  Apartment Flipping: Urban Oasis
                </h3>
                <p className="text-gray-600 font-montserrat text-sm">
                  Strategic renovation and design to maximize property value and appeal.
                </p>
              </CardContent>
            </Card>

            {/* Transformation Example 3 */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <img
                src={endToEndRenovation}
                alt="Property Transformation"
                className="rounded-md object-cover h-64 w-full"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 font-playfair mb-2">
                  End-to-End Renovation: Luxury Finishes
                </h3>
                <p className="text-gray-600 font-montserrat text-sm">
                  High-end finishes and bespoke design elements create a truly luxurious living experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-700 font-montserrat text-lg">
              Read testimonials from satisfied clients who have achieved their investment and transformation goals with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                </div>
                <p className="text-gray-700 font-montserrat text-sm italic mb-4">
                  "Luxury Labs transformed my property into a stunning masterpiece. Their attention to detail and commitment to quality are unmatched."
                </p>
                <p className="text-gray-900 font-semibold font-playfair">- Aisha Al Maktoum</p>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                  <Star className="text-yellow-500 inline-block mr-1" size={16} />
                </div>
                <p className="text-gray-700 font-montserrat text-sm italic mb-4">
                  "I've seen exceptional returns on my investments thanks to Luxury Labs' strategic approach and market expertise."
                </p>
                <p className="text-gray-900 font-semibold font-playfair">- Rashid Al Falasi</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-4">
              Our Esteemed Partners
            </h2>
            <p className="text-gray-700 font-montserrat text-lg">
              We collaborate with leading brands to deliver exceptional quality and luxury.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <img src={barovieToso} alt="Barovier&Toso" className="h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src={boseLogo} alt="Bose" className="h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src={espaceLogo} alt="Espace" className="h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src={linealightLogo} alt="Linealight" className="h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src={prestigeLogo} alt="Prestige" className="h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src={venetacucineLogo} alt="Veneta Cucine" className="h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold font-playfair mb-6">
                Ready to Transform Your Property or Investment Portfolio?
              </h2>
              <p className="text-lg font-montserrat mb-8">
                Contact us today to discuss your project and explore the possibilities.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src={investmentPartnershipImage}
                alt="Contact Luxury Labs"
                className="rounded-lg shadow-xl"
              />
            </div>
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
                <li><a href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Investment Services</a></li>
                <li><a href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Transformation Services</a></li>
                <li><a href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Advisory Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-secondary-foreground font-playfair mb-4">Company</h4>
              <ul className="space-y-2 font-montserrat text-sm">
                <li><a href="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors">About Us</a></li>
                <li><a href="/partners" className="text-secondary-foreground/80 hover:text-primary transition-colors">Partners</a></li>
                <li><a href="/contact" className="text-secondary-foreground/80 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-secondary-foreground font-playfair mb-4">Legal</h4>
              <ul className="space-y-2 font-montserrat text-sm">
                <li><button type="button" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPrivacyOpen(true);
                }} className="text-secondary-foreground/80 hover:text-primary transition-colors">Privacy Policy</button></li>
                <li><button type="button" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setTermsOpen(true);
                }} className="text-secondary-foreground/80 hover:text-primary transition-colors">Terms of Service</button></li>
                <li><button type="button" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDisclaimerOpen(true);
                }} className="text-secondary-foreground/80 hover:text-primary transition-colors">Investment Disclaimer</button></li>
                <li><button type="button" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLegalNoticeOpen(true);
                }} className="text-secondary-foreground/80 hover:text-primary transition-colors">Legal Notice</button></li>
                <li><button type="button" onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCookieOpen(true);
                }} className="text-secondary-foreground/80 hover:text-primary transition-colors">Cookie Policy</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center">
            <p className="text-secondary-foreground/60 font-montserrat text-sm">© 2025 Luxury Labs. All rights reserved. Licensed by Dubai Land Department (DLD).</p>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <p className="font-montserrat text-sm">
            This Privacy Policy describes how Luxury Labs collects, uses, and shares information about you when you use our website.
          </p>
          <Button className="mt-4" onClick={() => setPrivacyOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
          </DialogHeader>
          <p className="font-montserrat text-sm">
            These Terms of Service govern your use of the Luxury Labs website and services.
          </p>
          <Button className="mt-4" onClick={() => setTermsOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={disclaimerOpen} onOpenChange={setDisclaimerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Investment Disclaimer</DialogTitle>
          </DialogHeader>
          <p className="font-montserrat text-sm">
            Investments in real estate carry inherent risks. Luxury Labs is not responsible for any financial losses.
          </p>
          <Button className="mt-4" onClick={() => setDisclaimerOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={legalNoticeOpen} onOpenChange={setLegalNoticeOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Legal Notice</DialogTitle>
          </DialogHeader>
          <p className="font-montserrat text-sm">
            © 2025 Luxury Labs. All rights reserved.
          </p>
          <Button className="mt-4" onClick={() => setLegalNoticeOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={cookieOpen} onOpenChange={setCookieOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cookie Policy</DialogTitle>
          </DialogHeader>
          <p className="font-montserrat text-sm">
            This website uses cookies to enhance user experience.
          </p>
          <Button className="mt-4" onClick={() => setCookieOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* Investor Assessment Modal */}
      <InvestorAssessmentModal open={showInvestorAssessment} setOpen={setShowInvestorAssessment} />
    </div>;
}
