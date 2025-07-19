import { Building2, LayoutDashboard, Phone, Mail, MapPin, Users, Award, TrendingUp, Star, CheckCircle, ArrowRight, Handshake, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import heroImage from "@/assets/luxury-labs-hero-refined.jpg"
import businessBayImage from "@/assets/business-bay.jpg"
import downtownImage from "@/assets/downtown-luxury.jpg"
import marinaTowerImage from "@/assets/marina-tower.jpg"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 luxury-gradient rounded-xl flex items-center justify-center luxury-shadow">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold text-2xl text-foreground tracking-tight font-playfair">LUXURY LABS</div>
              <div className="text-xs text-primary uppercase tracking-widest font-medium font-montserrat">Property Solutions</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-montserrat">Home</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-montserrat">About</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors font-montserrat">Services</a>
            <a href="#projects" className="text-foreground hover:text-primary transition-colors font-montserrat">Projects</a>
            <a href="#media" className="text-foreground hover:text-primary transition-colors font-montserrat">Media</a>
            <a href="#partners" className="text-foreground hover:text-primary transition-colors font-montserrat">Partners</a>
            <a href="#investors" className="text-foreground hover:text-primary transition-colors font-montserrat">Investors</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-montserrat">Contact</a>
          </div>
          
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground luxury-shadow">
            <Link to="/dashboard">
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      </nav>

      {/* HOME - Hero Section */}
      <section 
        id="home"
        className="py-32 px-4 relative overflow-hidden min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-8 text-white drop-shadow-2xl">
            Transform Strategic
            <br />
            <span className="luxury-text">Premium Properties</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-playfair text-white/90 mb-12 max-w-4xl mx-auto drop-shadow-lg">
            Generate Exceptional Returns • Build Lasting Wealth & Luxury Assets
            <br />
            Dubai's Premier Property Investment & Transformation Platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="text-xl px-12 py-6 font-montserrat font-semibold luxury-gradient hover:luxury-glow">
              <Link to="/dashboard">
                <TrendingUp className="mr-3 h-6 w-6" />
                Invest in a Flip
              </Link>
            </Button>
            <Button asChild size="lg" className="text-xl px-12 py-6 font-montserrat font-semibold luxury-gradient hover:luxury-glow">
              <Link to="/dashboard">
                <Building2 className="mr-3 h-6 w-6" />
                Start a Flip with Luxury Labs
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-xl px-12 py-6 font-montserrat font-semibold border-white text-white hover:bg-white hover:text-black">
              <a href="#contact">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT Section */}
      <section id="about" className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              About <span className="luxury-text">Luxury Labs</span>
            </h2>
            <p className="text-xl font-montserrat text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Luxury Labs is Dubai's premier property investment and transformation platform, specializing in strategic premium properties that deliver exceptional returns. Our expertise combines luxury real estate knowledge with innovative transformation processes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="elegant-card group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Premium Expertise</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Years of experience in Dubai's luxury real estate market with a proven track record of successful transformations.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-card group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <TrendingUp className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">Exceptional Returns</h3>
                <p className="text-muted-foreground font-montserrat leading-relaxed">
                  Target 30%+ ROI through strategic property selection, luxury transformations, and expert market timing.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-card group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 luxury-gradient rounded-xl flex items-center justify-center mb-6 mx-auto">
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
            <Card className="elegant-card group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={businessBayImage} 
                  alt="Business Bay Luxury Apartment"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 luxury-gradient text-primary-foreground font-montserrat">SOLD</Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-bold text-2xl font-playfair">32% ROI</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2">Business Bay Luxury Apartment</h3>
                <p className="text-muted-foreground font-montserrat text-sm mb-4">
                  Complete transformation of a 2BR apartment with premium finishes and smart home integration.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-montserrat text-muted-foreground">6 months</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-card group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={downtownImage} 
                  alt="Downtown Dubai Penthouse"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 luxury-gradient text-primary-foreground font-montserrat">SOLD</Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-bold text-2xl font-playfair">45% ROI</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2">Downtown Dubai Penthouse</h3>
                <p className="text-muted-foreground font-montserrat text-sm mb-4">
                  Luxury penthouse renovation with panoramic city views and high-end European fixtures.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-montserrat text-muted-foreground">8 months</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-card group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={marinaTowerImage} 
                  alt="Marina Tower Villa"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-green-500 text-white font-montserrat">ACTIVE</Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-bold text-2xl font-playfair">Est. 38% ROI</div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-2">Marina Waterfront Villa</h3>
                <p className="text-muted-foreground font-montserrat text-sm mb-4">
                  Ongoing transformation of waterfront villa with private beach access and infinity pool.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-montserrat text-muted-foreground">12 months</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="luxury-gradient hover:luxury-glow font-montserrat">
              <Link to="/dashboard">
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
            {['Forbes Middle East', 'Arabian Business', 'Gulf News', 'Emirates Business'].map((publication, index) => (
              <Card key={index} className="elegant-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 luxury-gradient rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Star className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-playfair font-bold text-foreground mb-2">{publication}</h3>
                  <p className="text-sm text-muted-foreground font-montserrat">Featured Article</p>
                </CardContent>
              </Card>
            ))}
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
                  <Link to="/dashboard">
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
              <Link to="/dashboard">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 luxury-gradient rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-bold text-lg text-secondary-foreground font-playfair">LUXURY LABS</div>
                  <div className="text-xs text-primary uppercase tracking-widest font-montserrat">Property Solutions</div>
                </div>
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
    </div>
  )
}