import { Building2, LayoutDashboard, Phone, Mail, MapPin, Users, Award, TrendingUp, Star, CheckCircle, ArrowRight, Handshake, Globe, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
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
export default function Landing() {
  return <div className="min-h-screen bg-background">
      <Navigation />

      {/* HOME - Hero Section */}
      <section id="home" className="py-16 sm:py-24 lg:py-32 px-4 relative overflow-hidden min-h-screen flex items-center" style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
        <div className="absolute inset-0 hero-overlay"></div>
        
        <div className="container mx-auto text-center relative z-10 max-w-7xl">
          <div className="animate-fade-in">
            {/* Logo */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <img 
                src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" 
                alt="Luxury Labs Logo" 
                className="h-48 sm:h-64 lg:h-96 w-auto mx-auto drop-shadow-2xl animate-scale-in" 
              />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair mb-8 sm:mb-12 lg:mb-16 drop-shadow-2xl leading-tight text-yellow-500 font-bold px-4 animate-fade-in">
              Transform Strategic Premium Properties • Generate Exceptional Returns • Build Lasting Wealth & Luxury Assets
            </h1>
            
            {/* Three Feature Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 animate-scale-in">
              <div className="group">
                <div className="relative h-32 sm:h-40 lg:h-48 rounded-xl overflow-hidden shadow-elegant group-hover:scale-105 transition-all duration-500 hover:shadow-glow">
                  <img src={premiumVillaSelectionImage} alt="Premium Villa Selection" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                    <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-playfair font-bold">PREMIUM SELECTION</h3>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="relative h-32 sm:h-40 lg:h-48 rounded-xl overflow-hidden shadow-elegant group-hover:scale-105 transition-all duration-500 hover:shadow-glow">
                  <img src={beforeAfterTransformationImage} alt="Before After Transformation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                    <Palette className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-playfair font-bold">LUXURY TRANSFORMATION</h3>
                  </div>
                </div>
              </div>
              
              <div className="group sm:col-span-2 lg:col-span-1">
                <div className="relative h-32 sm:h-40 lg:h-48 rounded-xl overflow-hidden shadow-elegant group-hover:scale-105 transition-all duration-500 hover:shadow-glow">
                  <img src={roiInvestmentImage} alt="ROI Investment Returns" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-playfair font-bold">ROI UP TO 30%</h3>
                  </div>
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-scale-in px-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 font-montserrat font-semibold luxury-gradient hover:luxury-glow hover:scale-105 transition-all duration-300 group">
                <Link to="/contact">
                  <TrendingUp className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Invest in a Flip
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button asChild size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 font-montserrat font-semibold luxury-gradient hover:luxury-glow hover:scale-105 transition-all duration-300 group">
                <Link to="/contact">
                  <Building2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Start a Flip
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 font-montserrat font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300 backdrop-blur-sm group">
                <Link to="/auth">
                  <LayoutDashboard className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:rotate-12 transition-transform duration-300" />
                  Access Dashboard
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/80 animate-fade-in">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                <span className="text-sm sm:text-base font-montserrat">Premium Properties</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 fill-current" />
                <span className="text-sm sm:text-base font-montserrat">Verified Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                <span className="text-sm sm:text-base font-montserrat">Expert Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* PROCESS Section */}
      <section id="process" className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Our <span className="luxury-text">Process</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto">
              Three strategic steps to transform premium properties into exceptional investment returns
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1: Premium Selection */}
            <div className="text-center group animate-fade-in">
              <div className="relative mb-8">
                <div className="w-20 h-20 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                  <span className="text-primary-foreground font-bold text-2xl font-playfair">1</span>
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden shadow-elegant group-hover:scale-105 transition-transform duration-300">
                  <img src={premiumSelectionImage} alt="Premium Selection Process" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-playfair font-bold">PREMIUM SELECTION</h3>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground font-montserrat leading-relaxed">
                Curating Dubai's rarest addresses through expert market analysis and exclusive access to premium properties in prime locations.
              </p>
            </div>

            {/* Step 2: Luxury Transformation */}
            <div className="text-center group animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="relative mb-8">
                <div className="w-20 h-20 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                  <span className="text-primary-foreground font-bold text-2xl font-playfair">2</span>
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden shadow-elegant group-hover:scale-105 transition-transform duration-300">
                  <img src={luxuryTransformationImage} alt="Luxury Transformation Process" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-playfair font-bold">LUXURY TRANSFORMATION</h3>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground font-montserrat leading-relaxed">
                Our signature renovation process elevates properties to luxury standards with bespoke design and premium materials.
              </p>
            </div>

            {/* Step 3: Exceptional Returns */}
            <div className="text-center group animate-fade-in" style={{
            animationDelay: '0.4s'
          }}>
              <div className="relative mb-8">
                <div className="w-20 h-20 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                  <span className="text-primary-foreground font-bold text-2xl font-playfair">3</span>
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden shadow-elegant group-hover:scale-105 transition-transform duration-300">
                  <img src={exceptionalReturnsImage} alt="Exceptional Returns Process" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-playfair font-bold">EXCEPTIONAL RETURNS</h3>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground font-montserrat leading-relaxed">
                Strategic market timing and expert sales execution deliver superior ROI, targeting 30%+ returns for our investors.
              </p>
            </div>
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

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="glass-card group hover:scale-105 transition-all duration-300 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Premium Expertise</h3>
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
                  <TrendingUp className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Exceptional Returns</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Target 30%+ ROI through strategic property selection, luxury transformations, and expert market timing.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card group hover:scale-105 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:shadow-glow transition-all duration-300">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">HNWI Focus</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Exclusively serving high-net-worth individuals with personalized investment strategies and white-glove service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SERVICES Section */}
      <section id="services" className="py-24 px-4 bg-gradient-elegant">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Our <span className="luxury-text">Premium Services</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-3xl mx-auto">
              Discover how Luxury Labs transforms Dubai's real estate landscape through our three core specializations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                  The LL Signature Transformation
                </h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed mb-6">
                  Our signature renovation process elevates properties to luxury standards. From design to execution, we create bespoke living spaces that maximize value and appeal.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-muted-foreground font-montserrat">
                    <CheckCircle className="w-4 h-4 text-primary mr-3" />
                    Bespoke interior design
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
                  Exceptional Returns
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
                View All Projects
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
            {['Forbes Middle East', 'Arabian Business', 'Gulf News', 'Emirates Business'].map((publication, index) => <Card key={index} className="elegant-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 luxury-gradient rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Star className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-playfair font-bold text-foreground mb-2">{publication}</h3>
                  <p className="text-sm text-muted-foreground font-montserrat">Featured Article</p>
                </CardContent>
              </Card>)}
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
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Handshake className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Design Partners</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Award-winning interior designers and architects specializing in luxury residential projects.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Building2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Construction Partners</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Premium construction companies with proven expertise in high-end residential developments.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Globe className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">Global Suppliers</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  International network of premium material suppliers and luxury fixture providers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
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

            <div className="text-center">
              <div className="elegant-card p-8">
                <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">Ready to Invest?</h3>
                <p className="text-muted-foreground font-montserrat mb-6">
                  Access our investor dashboard to explore current opportunities and track your portfolio performance.
                </p>
                <Button asChild size="lg" className="w-full luxury-gradient hover:luxury-glow font-montserrat">
                  <Link to="/investors">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Access Investor Portal
                  </Link>
                </Button>
              </div>
            </div>
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
                <img 
                  src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" 
                  alt="Luxury Labs Logo" 
                  className="h-16 w-auto" 
                />
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