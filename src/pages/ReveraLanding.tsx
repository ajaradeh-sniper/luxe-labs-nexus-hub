import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Calendar, 
  Mail, 
  Phone, 
  MessageCircle,
  CheckCircle,
  Building2,
  Paintbrush,
  TrendingUp,
  Video,
  Layers,
  Users,
  Shield,
  Eye,
  ChevronUp
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Configuration - Update these values
const CONFIG = {
  email: "invest@reveraestates.ae",
  whatsapp: "971XXXXXXXXX", // Replace with actual number
  phone: "+971 XX XXX XXXX", // Replace with actual number
  calendly: "https://calendly.com/revera/intro", // Replace with actual URL
  formEndpoint: "", // Optional: Formspree/Make/Zapier webhook
};

export default function ReveraLanding() {
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
    interest: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (CONFIG.formEndpoint) {
        // Send to webhook
        await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
            source: "REVERA Landing - Investor Intake",
          }),
        });
      } else {
        // Mailto fallback
        const subject = encodeURIComponent(`Investor Intake: ${formData.fullName}`);
        const body = encodeURIComponent(
          Object.entries(formData)
            .filter(([_, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")
        );
        window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
      }

      setSubmitStatus("success");
      toast({
        title: "Intake Submitted",
        description: "We'll be in touch within 1 business day.",
      });
    } catch (error) {
      setSubmitStatus("error");
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-revera-dark text-revera-text">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-revera-dark/80 border-b border-revera-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/revera-icon.png" alt="REVERA" className="h-8 w-auto" />
              <div className="hidden sm:block">
                <img src="/revera-logo.png" alt="REVERA ESTATES" className="h-5 w-auto" />
                <span className="text-[10px] tracking-[0.2em] text-revera-stone uppercase">
                  The Art of Property Flipping
                </span>
              </div>
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              <button onClick={() => scrollToSection("services")} className="text-sm text-revera-muted hover:text-revera-text transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection("intake")} className="text-sm text-revera-muted hover:text-revera-text transition-colors">
                Invest in Flips
              </button>
              <button onClick={() => scrollToSection("media")} className="text-sm text-revera-muted hover:text-revera-text transition-colors">
                Flipping Dubai
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-sm text-revera-muted hover:text-revera-text transition-colors">
                Contact
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                onClick={() => scrollToSection("intake")}
                className="hidden sm:inline-flex bg-gradient-to-r from-revera-gold/20 to-revera-stone/10 border border-revera-gold/40 hover:border-revera-gold/80 text-revera-text"
              >
                Invest in Flips
              </Button>
              <Button 
                variant="outline"
                className="hidden md:inline-flex border-revera-line hover:bg-white/5"
                onClick={() => window.open(CONFIG.calendly, "_blank")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book a Call
              </Button>
              <Button
                variant="outline"
                className="border-revera-line hover:bg-white/5"
                onClick={() => window.open(`https://wa.me/${CONFIG.whatsapp}`, "_blank")}
              >
                <MessageCircle className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-revera-gold/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-revera-stone/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-revera-line p-6 lg:p-8">
                <p className="text-revera-stone uppercase tracking-[0.2em] text-xs mb-4">
                  Dubai • Italian Craftsmanship • Premium Execution
                </p>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4">
                  REVERA Estates
                </h1>
                
                <p className="text-revera-muted text-base lg:text-lg leading-relaxed mb-6">
                  We create high-impact luxury transformations — pairing disciplined investment execution with timeless design.
                  <br /><br />
                  Invest in curated flipping projects, follow the journey through Flipping Dubai, or engage REVERA for consulting, design & renovation, and booth design.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Button 
                    onClick={() => scrollToSection("intake")}
                    className="bg-gradient-to-r from-revera-gold/25 to-revera-stone/15 border border-revera-gold/50 hover:border-revera-gold text-revera-text shadow-lg shadow-revera-gold/10"
                  >
                    Start Investor Intake
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => scrollToSection("services")}
                    className="border-revera-line hover:bg-white/5"
                  >
                    Explore Services
                  </Button>
                  <Button 
                    variant="ghost"
                    className="hover:bg-white/5"
                    onClick={() => window.location.href = `mailto:${CONFIG.email}`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
                  </Button>
                </div>

                {/* Value Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02] text-revera-muted py-2 px-3">
                    <CheckCircle className="w-3 h-3 mr-2 text-revera-gold" />
                    <strong className="text-revera-text">End-to-end</strong>&nbsp;sourcing → design → build → exit
                  </Badge>
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02] text-revera-muted py-2 px-3">
                    <CheckCircle className="w-3 h-3 mr-2 text-revera-gold" />
                    <strong className="text-revera-text">Luxury-led</strong>&nbsp;materials, detailing, staging
                  </Badge>
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02] text-revera-muted py-2 px-3">
                    <CheckCircle className="w-3 h-3 mr-2 text-revera-gold" />
                    <strong className="text-revera-text">Transparency</strong>&nbsp;progress, budgets, reporting
                  </Badge>
                </div>
              </Card>

              {/* Mini Tiles */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-revera-line bg-revera-panel/60">
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-revera-gold" />
                    Flipping Projects
                  </h3>
                  <p className="text-sm text-revera-muted">
                    Join early, co-invest, and track execution with structured reporting and clear timelines.
                  </p>
                </div>
                <div className="p-4 rounded-2xl border border-revera-line bg-revera-panel/60">
                  <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                    <Video className="w-4 h-4 text-revera-gold" />
                    Flipping Dubai Media
                  </h3>
                  <p className="text-sm text-revera-muted">
                    Our media engine documents the transformation journey and builds trust, reach, and deal flow.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Contact */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-revera-line p-6">
                <h2 className="text-lg font-bold mb-4">Fast contact</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Speak to REVERA</h3>
                    <p className="text-sm text-revera-muted mb-4">
                      Choose the fastest route — email, a calendar call, or WhatsApp.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-revera-line hover:bg-white/5"
                        onClick={() => window.open(CONFIG.calendly, "_blank")}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book a Call
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-revera-line hover:bg-white/5"
                        onClick={() => window.open(`https://wa.me/${CONFIG.whatsapp}`, "_blank")}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-revera-line hover:bg-white/5"
                        onClick={() => window.location.href = `tel:${CONFIG.phone.replace(/\s/g, "")}`}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-dashed border-revera-gold/30 bg-revera-gold/5">
                    <p className="text-xs text-revera-muted">
                      For investor opportunities, use the intake form below. We typically respond within 1 business day.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-revera-line p-6">
                <h2 className="text-lg font-bold mb-4">What we do (at a glance)</h2>
                <p className="text-sm text-revera-muted mb-4">
                  Luxury flips • Design & build • Strategy & consulting • Media • Booth design
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02]">Premium finish</Badge>
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02]">Project controls</Badge>
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02]">Buyer-ready staging</Badge>
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02]">Media storytelling</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Services</h2>
              <p className="text-revera-muted">Clear offers. Clean execution. Built for investors, HNWIs, and brands.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Service Cards */}
            <ServiceCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Flipping Projects"
              description="Curated opportunities, disciplined execution, and structured reporting from day one."
              tags={["Co-invest", "SPV-ready", "Reporting"]}
            />
            <ServiceCard
              icon={<Video className="w-5 h-5" />}
              title="Flipping Dubai Media"
              description="Premium content documenting real transformations — credibility engine for REVERA."
              tags={["YouTube", "IG", "Brand trust"]}
            />
            <ServiceCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Services: Consulting"
              description="Feasibility, ROI planning, transformation strategy, vendor & scope structuring."
              tags={["Feasibility", "ROI", "Scope"]}
            />
            <ServiceCard
              icon={<Paintbrush className="w-5 h-5" />}
              title="Services: Design & Renovation"
              description="Luxury interior architecture, renovation delivery, furnishing & staging."
              tags={["Design", "Build", "Staging"]}
            />
          </div>

          {/* Full-width Booth Design Card */}
          <Card className="bg-gradient-to-r from-revera-gold/10 to-revera-stone/5 border-revera-gold/30 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-revera-gold/20">
                  <Layers className="w-6 h-6 text-revera-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Booth Design (Events & Brands)</h3>
                  <p className="text-revera-muted text-sm mb-3">
                    Architectural booth design and execution support — premium, high-impact, on-brand.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-revera-line bg-white/[0.02] text-xs">Concept</Badge>
                    <Badge variant="outline" className="border-revera-line bg-white/[0.02] text-xs">3D</Badge>
                    <Badge variant="outline" className="border-revera-line bg-white/[0.02] text-xs">Production support</Badge>
                  </div>
                </div>
              </div>
              <Button 
                className="bg-gradient-to-r from-revera-gold/25 to-revera-stone/15 border border-revera-gold/50 hover:border-revera-gold whitespace-nowrap"
                onClick={() => window.location.href = `mailto:${CONFIG.email}?subject=Booth Design Inquiry`}
              >
                Request a Quote
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Flipping Dubai Media Section */}
      <section id="media" className="py-16 lg:py-24 bg-revera-panel/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-revera-line p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-revera-gold/20">
                    <Video className="w-5 h-5 text-revera-gold" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">Flipping Dubai (Media)</h2>
                    <p className="text-sm text-revera-muted">Not influencer content — a credibility engine for premium transformations.</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-revera-line p-6">
                <h3 className="font-bold mb-3">What you'll see</h3>
                <p className="text-sm text-revera-muted mb-4">
                  Before/after transformations, design decisions, execution realities, and lessons learned — delivered with a luxury lens.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02]">Transformation diary</Badge>
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02]">Design logic</Badge>
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02]">Execution discipline</Badge>
                  <Badge variant="outline" className="border-revera-line bg-white/[0.02]">Market-ready outcomes</Badge>
                </div>
              </Card>

              <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-revera-line p-6">
                <h3 className="font-bold mb-2">Want collaboration / sponsorship?</h3>
                <p className="text-sm text-revera-muted mb-4">
                  If you're a premium brand (materials, furniture, lighting), reach out for placements and partnership packages.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-revera-line hover:bg-white/5"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact for Partnerships
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = `mailto:${CONFIG.email}?subject=Media Partnership`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-revera-line p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-revera-gold" />
                  <div>
                    <h3 className="font-bold">Why it matters</h3>
                    <p className="text-sm text-revera-muted">Media + execution = faster trust and stronger deal flow.</p>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4">
                <Card className="bg-revera-panel/60 border-revera-line p-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-revera-gold mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">For investors</h4>
                      <p className="text-xs text-revera-muted">
                        Proof of execution quality and a transparent look into how value is created.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-revera-panel/60 border-revera-line p-4">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-revera-gold mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">For buyers</h4>
                      <p className="text-xs text-revera-muted">
                        A premium narrative that elevates perceived value and accelerates decision-making.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-revera-panel/60 border-revera-line p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-revera-gold mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">For partners</h4>
                      <p className="text-xs text-revera-muted">
                        A high-quality channel to showcase your products inside real luxury homes.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Intake + Contact Section */}
      <section id="intake" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Intake Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-revera-line p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-revera-gold/20">
                    <TrendingUp className="w-5 h-5 text-revera-gold" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">Investor Intake — Flipping Projects</h2>
                    <p className="text-sm text-revera-muted">Answer 2–3 minutes. We'll route you to the right opportunity and follow up with next steps.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">Full Name</label>
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="bg-black/20 border-revera-line focus:border-revera-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="bg-black/20 border-revera-line focus:border-revera-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">Phone / WhatsApp</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+971 XX XXX XXXX"
                        className="bg-black/20 border-revera-line focus:border-revera-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">Current Location</label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className="bg-black/20 border-revera-line focus:border-revera-gold/50"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">Investor Type</label>
                      <select
                        name="investorType"
                        value={formData.investorType}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-revera-line bg-black/20 text-revera-text focus:border-revera-gold/50 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="individual">Individual (HNW)</option>
                        <option value="family_office">Family Office</option>
                        <option value="corporate">Corporate</option>
                        <option value="fund">Fund / Syndicate</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">When do you want to deploy?</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-revera-line bg-black/20 text-revera-text focus:border-revera-gold/50 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="immediate">Immediately (0–30 days)</option>
                        <option value="1-3_months">1–3 months</option>
                        <option value="3-6_months">3–6 months</option>
                        <option value="exploring">Exploring</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">Typical Ticket Size (AED)</label>
                      <select
                        name="ticketSize"
                        value={formData.ticketSize}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-revera-line bg-black/20 text-revera-text focus:border-revera-gold/50 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="250k-500k">250k – 500k</option>
                        <option value="500k-1m">500k – 1M</option>
                        <option value="1m-2.5m">1M – 2.5M</option>
                        <option value="2.5m+">2.5M+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">Risk Preference</label>
                      <select
                        name="riskPreference"
                        value={formData.riskPreference}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-revera-line bg-black/20 text-revera-text focus:border-revera-gold/50 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="conservative">Conservative</option>
                        <option value="balanced">Balanced</option>
                        <option value="growth">Growth</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">Preferred Strategy</label>
                      <select
                        name="strategy"
                        value={formData.strategy}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-revera-line bg-black/20 text-revera-text focus:border-revera-gold/50 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="flip">Short-term flip (6–12 months)</option>
                        <option value="hybrid">Hybrid (flip + hold options)</option>
                        <option value="yield">Yield-focused (rental income)</option>
                        <option value="open">Open to recommendations</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">Target Areas (optional)</label>
                      <Input
                        name="targetAreas"
                        value={formData.targetAreas}
                        onChange={handleInputChange}
                        placeholder="e.g., Palm Jumeirah, Dubai Hills"
                        className="bg-black/20 border-revera-line focus:border-revera-gold/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">How involved do you want to be?</label>
                      <select
                        name="involvement"
                        value={formData.involvement}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-revera-line bg-black/20 text-revera-text focus:border-revera-gold/50 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="hands_off">Hands-off (preferred)</option>
                        <option value="milestone">Milestone approvals only</option>
                        <option value="highly_involved">Highly involved (design/material choices)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-revera-muted block mb-2">What interests you most?</label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-xl border border-revera-line bg-black/20 text-revera-text focus:border-revera-gold/50 focus:outline-none"
                      >
                        <option value="">Select</option>
                        <option value="returns">Target returns & downside protection</option>
                        <option value="design">Design quality & premium buyer appeal</option>
                        <option value="timeline">Fast execution timeline</option>
                        <option value="all">All of the above</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-revera-muted block mb-2">Notes (optional)</label>
                    <Textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any additional context or questions..."
                      className="bg-black/20 border-revera-line focus:border-revera-gold/50 min-h-[100px]"
                    />
                    <p className="text-xs text-revera-muted mt-2">
                      We can also share a short project summary pack after an intro call.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-revera-gold/30 bg-revera-gold/5">
                    <p className="text-xs text-revera-muted">
                      By submitting, you agree REVERA may contact you about relevant opportunities and services.
                      No sensitive information is requested here.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-revera-gold/25 to-revera-stone/15 border border-revera-gold/50 hover:border-revera-gold"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Investor Intake"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      className="border-revera-line hover:bg-white/5"
                      onClick={() => window.open(CONFIG.calendly, "_blank")}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book a Call Instead
                    </Button>
                    {submitStatus === "success" && (
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Submitted successfully
                      </span>
                    )}
                    {submitStatus === "error" && (
                      <span className="text-xs text-red-400">
                        Submission failed. Please try again.
                      </span>
                    )}
                  </div>
                </form>
              </Card>
            </div>

            {/* Contact Panel */}
            <div id="contact" className="space-y-4">
              <Card className="bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-revera-line p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-revera-gold" />
                  <div>
                    <h3 className="font-bold">Contact</h3>
                    <p className="text-xs text-revera-muted">Fastest routes to connect with REVERA Estates.</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-revera-panel/60 border-revera-line p-4">
                <h4 className="font-semibold text-sm mb-2">Email</h4>
                <p className="text-xs text-revera-muted mb-3">{CONFIG.email}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-revera-line hover:bg-white/5"
                  onClick={() => window.location.href = `mailto:${CONFIG.email}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
              </Card>

              <Card className="bg-revera-panel/60 border-revera-line p-4">
                <h4 className="font-semibold text-sm mb-2">Book a calendar call</h4>
                <p className="text-xs text-revera-muted mb-3">Pick a slot that works. We'll share next steps right after.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-revera-line hover:bg-white/5"
                  onClick={() => window.open(CONFIG.calendly, "_blank")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Call
                </Button>
              </Card>

              <Card className="bg-revera-panel/60 border-revera-line p-4">
                <h4 className="font-semibold text-sm mb-2">WhatsApp / Phone</h4>
                <p className="text-xs text-revera-muted mb-3">{CONFIG.phone}</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-revera-line hover:bg-white/5"
                    onClick={() => window.open(`https://wa.me/${CONFIG.whatsapp}`, "_blank")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-revera-line hover:bg-white/5"
                    onClick={() => window.location.href = `tel:${CONFIG.phone.replace(/\s/g, "")}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </div>
              </Card>

              <Card className="bg-revera-panel/60 border-revera-line p-4">
                <h4 className="font-semibold text-sm mb-3">What are you contacting us about?</h4>
                <ul className="text-xs text-revera-muted space-y-1.5">
                  <li>• Investor flips & co-invest</li>
                  <li>• Design & renovation for your property</li>
                  <li>• Consulting / feasibility / ROI</li>
                  <li>• Booth design (events & brands)</li>
                  <li>• Media collaboration / sponsorship</li>
                </ul>
                <div className="mt-4 p-3 rounded-lg bg-revera-gold/5 border border-revera-gold/20">
                  <p className="text-xs text-revera-muted">
                    If you're an investor, the intake form is the fastest way to route you correctly.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-revera-line py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-revera-muted">
              © {new Date().getFullYear()} REVERA Estates. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-xs text-revera-muted hover:text-revera-text flex items-center gap-1"
              >
                <ChevronUp className="w-3 h-3" />
                Back to top
              </button>
              <button 
                onClick={() => scrollToSection("intake")}
                className="text-xs text-revera-muted hover:text-revera-text"
              >
                Investor Intake
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Service Card Component
function ServiceCard({ 
  icon, 
  title, 
  description, 
  tags 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  tags: string[] 
}) {
  return (
    <Card className="bg-revera-panel/60 border-revera-line p-4 hover:border-revera-gold/30 transition-all hover:-translate-y-0.5 cursor-pointer">
      <div className="flex items-center gap-2 mb-2 text-revera-gold">
        {icon}
      </div>
      <h3 className="font-bold text-sm mb-2">{title}</h3>
      <p className="text-xs text-revera-muted mb-3">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="border-revera-line bg-white/[0.02] text-[10px] px-2 py-0.5">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
