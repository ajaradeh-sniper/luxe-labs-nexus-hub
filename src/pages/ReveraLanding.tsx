import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  TrendingUp, 
  Video, 
  Palette, 
  Wrench, 
  LayoutGrid,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Eye,
  FileText,
  Users,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

// Placeholder constants - replace with actual values
const CONTACT_EMAIL = "invest@reveraestates.ae";
const CONTACT_PHONE = "+971 50 XXX XXXX";
const WHATSAPP_NUMBER = "971501234567";
const CALENDLY_URL = "https://calendly.com/revera-estates";
const WEBHOOK_URL = ""; // Your webhook endpoint (Formspree/Make/Zapier)

export default function ReveraLanding() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    investorType: "",
    timeline: "",
    ticketSize: "",
    riskPreference: "",
    strategy: "",
    targetAreas: "",
    involvement: "",
    interests: "",
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // If webhook URL is set, send to webhook
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            source: "REVERA Estates Landing"
          })
        });
      }

      toast({
        title: "Application Submitted",
        description: "Thank you for your interest. Our team will contact you within 24 hours.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        investorType: "",
        timeline: "",
        ticketSize: "",
        riskPreference: "",
        strategy: "",
        targetAreas: "",
        involvement: "",
        interests: "",
        notes: ""
      });
    } catch {
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/revera-icon.png" 
                alt="REVERA ESTATES" 
                className="h-10 w-auto"
              />
              <div className="hidden sm:block">
                <img 
                  src="/revera-logo.png" 
                  alt="REVERA ESTATES" 
                  className="h-6 w-auto"
                />
                <p className="text-[10px] text-muted-foreground tracking-widest uppercase">The Art of Property Flipping</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection("services")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection("invest")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Invest in Flips
              </button>
              <button onClick={() => scrollToSection("flipping-dubai")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Flipping Dubai
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </button>
              <Link to="/flipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Full Website
              </Link>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => scrollToSection("invest")}
              >
                Invest in Flips
              </Button>
              <Button 
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book a Call
                </a>
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                asChild
              >
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection("services")} className="text-left text-muted-foreground hover:text-primary">Services</button>
                <button onClick={() => scrollToSection("invest")} className="text-left text-muted-foreground hover:text-primary">Invest in Flips</button>
                <button onClick={() => scrollToSection("flipping-dubai")} className="text-left text-muted-foreground hover:text-primary">Flipping Dubai</button>
                <button onClick={() => scrollToSection("contact")} className="text-left text-muted-foreground hover:text-primary">Contact</button>
                <Link to="/flipping" className="text-muted-foreground hover:text-primary">Full Website</Link>
                <div className="flex gap-2 pt-4 border-t border-border/50">
                  <Button size="sm" className="flex-1 bg-primary text-primary-foreground" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a Call</a>
                  </Button>
                  <Button size="sm" variant="outline" className="text-green-500 border-green-500/50" asChild>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[url('/lovable-uploads/b2b9ab2c-7e3d-4eab-b79f-a0b91cd6ba50.png')] bg-cover bg-center opacity-10" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold mb-6">
              <span className="text-primary">REVERA</span> Estates
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              We create high-impact luxury transformations — pairing disciplined investment execution with timeless design.
            </p>

            {/* Value Bullets */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>End-to-end execution</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Luxury-led materials & staging</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Full transparency & reporting</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                onClick={() => scrollToSection("invest")}
              >
                Start Investor Intake
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:border-primary"
                onClick={() => scrollToSection("services")}
              >
                Explore Services
              </Button>
              <Button 
                size="lg" 
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
                asChild
              >
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-muted-foreground rotate-90" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From investment partnerships to full design-build execution, we deliver luxury real estate solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Flipping Projects */}
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-luxury group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Flipping Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Co-invest in curated luxury property flips with full reporting and transparent returns.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary p-0 hover:bg-transparent"
                  onClick={() => scrollToSection("invest")}
                >
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Flipping Dubai Media */}
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-luxury group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Flipping Dubai Media</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our credibility engine — documenting real transformations to build trust and deal flow.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary p-0 hover:bg-transparent"
                  onClick={() => scrollToSection("flipping-dubai")}
                >
                  Learn More <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Consulting */}
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-luxury group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Consulting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Feasibility analysis, ROI projections, and scope optimization for your real estate ventures.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary p-0 hover:bg-transparent"
                  onClick={() => scrollToSection("contact")}
                >
                  Get in Touch <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Design & Renovation */}
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-luxury group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Design & Renovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Full design, build, furnishing, and staging services with Italian craftsmanship standards.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary p-0 hover:bg-transparent"
                  onClick={() => scrollToSection("contact")}
                >
                  Get in Touch <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Full-width Booth Design Card */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="h-16 w-16 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <LayoutGrid className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-playfair font-bold mb-2">Booth Design</h3>
                  <p className="text-muted-foreground">
                    Premium exhibition and event booth design for brands and events. 
                    We bring the same luxury aesthetic and attention to detail from our property work to your brand presence.
                  </p>
                </div>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => scrollToSection("contact")}
                >
                  Inquire Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Flipping Dubai Section */}
      <section id="flipping-dubai" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Video className="h-5 w-5 text-primary" />
                <span className="text-primary font-medium text-sm uppercase tracking-wider">Flipping Dubai</span>
              </div>
              <h2 className="text-4xl font-playfair font-bold mb-6">
                Real Transformations.<br />
                <span className="text-muted-foreground">Real Results.</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Flipping Dubai isn't influencer content — it's documentation of our actual luxury property transformations. 
                Every project is filmed to showcase the craftsmanship, process, and results that drive our deal flow and investor confidence.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Authentic behind-the-scenes documentation</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Builds trust with investors and buyers</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Drives organic deal flow and partnerships</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => scrollToSection("contact")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Partnership Inquiry
                </Button>
                <Button 
                  variant="ghost"
                  className="text-muted-foreground"
                  asChild
                >
                  <a href={`mailto:${CONTACT_EMAIL}?subject=Sponsorship Inquiry`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Sponsorship
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-secondary to-card border border-border/50 overflow-hidden">
                <img 
                  src="/lovable-uploads/d6d93f42-4152-430f-bb17-3221a60d919b.png" 
                  alt="Flipping Dubai" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm text-muted-foreground">Featured on</p>
                  <p className="text-xl font-playfair font-bold">Flipping Dubai</p>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Investor Intake Section */}
      <section id="invest" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-playfair font-bold mb-4">Investor Intake</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete this 2-3 minute form to start the conversation. Our team will reach out within 24 hours.
            </p>
          </div>

          <Card className="bg-card/80 border-border/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Your full name"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / WhatsApp *</Label>
                    <Input 
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+971 XX XXX XXXX"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Your Location</Label>
                    <Input 
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="City, Country"
                      className="bg-background/50"
                    />
                  </div>
                </div>

                {/* Investment Profile */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="investorType">Investor Type *</Label>
                    <Select value={formData.investorType} onValueChange={(v) => handleInputChange("investorType", v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="family-office">Family Office</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="fund">Fund / Institution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline to Deploy</Label>
                    <Select value={formData.timeline} onValueChange={(v) => handleInputChange("timeline", v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="immediate">Immediate (0-1 month)</SelectItem>
                        <SelectItem value="short">Short-term (1-3 months)</SelectItem>
                        <SelectItem value="medium">Medium-term (3-6 months)</SelectItem>
                        <SelectItem value="exploring">Exploring options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticketSize">Ticket Size (AED) *</Label>
                    <Select value={formData.ticketSize} onValueChange={(v) => handleInputChange("ticketSize", v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="500k-1m">500K - 1M AED</SelectItem>
                        <SelectItem value="1m-3m">1M - 3M AED</SelectItem>
                        <SelectItem value="3m-5m">3M - 5M AED</SelectItem>
                        <SelectItem value="5m-10m">5M - 10M AED</SelectItem>
                        <SelectItem value="10m+">10M+ AED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="riskPreference">Risk Preference</Label>
                    <Select value={formData.riskPreference} onValueChange={(v) => handleInputChange("riskPreference", v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="strategy">Preferred Strategy</Label>
                    <Select value={formData.strategy} onValueChange={(v) => handleInputChange("strategy", v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="flip">Flip (Quick Turnaround)</SelectItem>
                        <SelectItem value="hybrid">Hybrid (Flip + Hold)</SelectItem>
                        <SelectItem value="yield">Yield (Rental Focus)</SelectItem>
                        <SelectItem value="open">Open to Recommendations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="involvement">Desired Involvement</Label>
                    <Select value={formData.involvement} onValueChange={(v) => handleInputChange("involvement", v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="hands-off">Hands-off (Fully Managed)</SelectItem>
                        <SelectItem value="milestone">Milestone Approvals</SelectItem>
                        <SelectItem value="highly-involved">Highly Involved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAreas">Target Areas (Optional)</Label>
                  <Input 
                    id="targetAreas"
                    value={formData.targetAreas}
                    onChange={(e) => handleInputChange("targetAreas", e.target.value)}
                    placeholder="e.g., Palm Jumeirah, Downtown, Marina..."
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">What interests you most?</Label>
                  <Input 
                    id="interests"
                    value={formData.interests}
                    onChange={(e) => handleInputChange("interests", e.target.value)}
                    placeholder="e.g., ROI potential, diversification, passive income..."
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Any specific requirements, questions, or context..."
                    className="bg-background/50 min-h-[100px]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    type="button"
                    size="lg" 
                    variant="outline"
                    className="border-border"
                    asChild
                  >
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      <Calendar className="mr-2 h-5 w-5" />
                      Book a Call Instead
                    </a>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-playfair font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're looking to invest in luxury flips, need design and renovation services, 
                or want to explore partnership opportunities — we're here to help.
              </p>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg">Reasons to Contact:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Invest in luxury property flips</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Palette className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Design & renovation services</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Consulting & feasibility analysis</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <LayoutGrid className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Booth design for events</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Video className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Media partnerships & sponsorships</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <a 
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-muted-foreground">{CONTACT_EMAIL}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                  </a>
                </CardContent>
              </Card>

              {/* Calendly */}
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <a 
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Book a Call</p>
                      <p className="text-sm text-muted-foreground">Schedule via Calendly</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                  </a>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card className="bg-card/50 border-border/50 hover:border-green-500/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <MessageCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Quick response via chat</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto group-hover:text-green-500 transition-colors" />
                  </a>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <a 
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                    className="flex items-center gap-4"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-muted-foreground">{CONTACT_PHONE}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/revera-icon.png" alt="REVERA" className="h-8 w-auto" />
              <div>
                <img src="/revera-logo.png" alt="REVERA ESTATES" className="h-4 w-auto" />
                <p className="text-[10px] text-muted-foreground">The Art of Property Flipping</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/flipping" className="hover:text-primary transition-colors">Full Website</Link>
              <Link to="/legal/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/legal/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} REVERA ESTATES. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
