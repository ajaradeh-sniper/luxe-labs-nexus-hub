import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Shield, 
  Building2, 
  Users, 
  Target, 
  LineChart, 
  Award, 
  CheckCircle2,
  Download,
  Calendar,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const InvestorsPitch = () => {
  // Investment Overview Data
  const investmentData = [
    { category: "Raise Amount", description: "AED 30–40 million equity into Luxury Labs FZCO" },
    { category: "Structure", description: "Equity in holding company (FZCO) with subsidiaries (Design, Media, Brokerage, Contracting) and SPVs per project" },
    { category: "Investor Entry", description: "Institutional, Family Offices, or UHNW individuals" },
    { category: "Investor ROI Target", description: "20–25% per project / 35%+ IRR at company level" },
    { category: "Investment Horizon", description: "24–36 months (Institutional readiness phase)" },
    { category: "Founders' Retained Equity", description: "40%+ (via sweat equity + profit share + anti-dilution clause)" },
    { category: "Exit Options", description: "Fund creation, equity resale, or bank refinancing" },
    { category: "Current Stage", description: "Proof of Concept Complete (JW Marriott, JVC, JGE) — Now Scaling" }
  ];

  // Use of Funds Data
  const fundsData = [
    { name: 'Property Acquisitions', value: 60, color: 'hsl(var(--primary))' },
    { name: 'In-House Divisions', value: 20, color: 'hsl(var(--accent))' },
    { name: 'Media & Brand', value: 10, color: 'hsl(var(--secondary))' },
    { name: 'Tech, Legal & Ops', value: 10, color: 'hsl(var(--muted))' }
  ];

  const fundsBreakdown = [
    { allocation: 'Property Acquisitions', percentage: 60, purpose: '2–4 strategic luxury flips (AED 18–24M)', amount: 'AED 18-24M' },
    { allocation: 'In-House Divisions (Broker + Contractor)', percentage: 20, purpose: 'Build internal verticals for control & scalability', amount: 'AED 6-8M' },
    { allocation: 'Media & Brand (Flipping Dubai)', percentage: 10, purpose: 'Content growth, partnerships, and monetization', amount: 'AED 3-4M' },
    { allocation: 'Tech, Legal & Operations', percentage: 10, purpose: 'Fund readiness, governance, reporting, legal setup', amount: 'AED 3-4M' }
  ];

  // Why Invest Rationale
  const rationale = [
    { 
      icon: Shield, 
      title: "Institutional Readiness", 
      description: "Governance, structure, and audit pathways already in place for fund conversion." 
    },
    { 
      icon: Award, 
      title: "Proven Execution", 
      description: "Completed high-end transformations with strong ROI performance and design credibility." 
    },
    { 
      icon: TrendingUp, 
      title: "Strategic Market Timing", 
      description: "Dubai's luxury segment is expanding amid record HNWI inflows (+200K expected by 2025)." 
    },
    { 
      icon: Sparkles, 
      title: "Media Flywheel", 
      description: "Flipping Dubai channel drives organic deal flow, investor awareness, and monetization." 
    },
    { 
      icon: Users, 
      title: "Founder-Operator Model", 
      description: "Founders lead execution; investors gain equity upside with controlled risk." 
    }
  ];

  // Timeline Phases
  const timeline = [
    { 
      phase: "Phase 1 – Scale", 
      duration: "0–12 months", 
      milestone: "Expand to 2–4 flips / establish brokerage & contractor license",
      color: "hsl(var(--primary))"
    },
    { 
      phase: "Phase 2 – Brand & Growth", 
      duration: "12–24 months", 
      milestone: "Build national visibility via Flipping Dubai + repeat ROI cycles",
      color: "hsl(var(--accent))"
    },
    { 
      phase: "Phase 3 – Institutional Fund", 
      duration: "24–36 months", 
      milestone: "Launch regulated ADGM fund or secure credit lines for leverage",
      color: "hsl(var(--secondary))"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 border-b border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4" variant="outline">
              <Sparkles className="w-3 h-3 mr-1" />
              Investment Summary 2025–2028
            </Badge>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              Luxury Labs Investment Opportunity
            </h1>
            <p className="text-xl text-muted-foreground font-montserrat max-w-2xl mx-auto">
              Scaling Dubai's Luxury Real Estate Transformation Platform
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="group luxury-shadow">
                <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Book Investor Call
              </Button>
              <Button size="lg" variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground luxury-shadow">
                <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Download Pack
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-playfair font-bold mb-4 text-foreground">Investment Overview</h2>
              <p className="text-muted-foreground text-lg">Core investment terms and structure</p>
            </div>
            
            <div className="grid gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {investmentData.map((item, index) => (
                <Card key={index} className="p-6 hover-scale border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.category}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest Now */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-playfair font-bold mb-4 text-foreground">Why Invest Now</h2>
              <p className="text-muted-foreground text-lg">Key investment rationale</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rationale.map((item, index) => (
                <Card 
                  key={index} 
                  className="p-8 hover-scale border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use of Funds */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-playfair font-bold mb-4 text-foreground">Use of Funds</h2>
              <p className="text-muted-foreground text-lg">Strategic capital allocation breakdown</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Pie Chart */}
              <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in">
                <h3 className="text-xl font-semibold mb-6 text-center text-foreground">Capital Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fundsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fundsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Breakdown Table */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {fundsBreakdown.map((item, index) => (
                  <Card key={index} className="p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground flex-1">{item.allocation}</h4>
                      <Badge className="bg-primary/10 text-primary border-primary/20">{item.percentage}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.purpose}</p>
                    <p className="text-sm font-semibold text-primary">{item.amount}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Snapshot */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-playfair font-bold mb-4 text-foreground">Governance Snapshot</h2>
              <p className="text-muted-foreground text-lg">Structured oversight and founder protection</p>
            </div>
            
            <Card className="p-8 border-border/50 bg-card/80 backdrop-blur-sm animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Board Composition (5 Seats)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 ml-7">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">2 Founders</p>
                        <p className="text-sm text-muted-foreground">Ali, Federica</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">3 Investor Representatives</p>
                        <p className="text-sm text-muted-foreground">Lead, Finance, Independent</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">Voting</p>
                        <p className="text-sm text-muted-foreground">4/5 supermajority for major strategic decisions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">Transparency</p>
                        <p className="text-sm text-muted-foreground">Quarterly dashboards & audited financials</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">Founder Protection</p>
                        <p className="text-sm text-muted-foreground">40%+ equity floor, profit-sharing, veto on dilution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-playfair font-bold mb-4 text-foreground">Timeline to Institutionalization</h2>
              <p className="text-muted-foreground text-lg">Strategic roadmap 2025–2028</p>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary -translate-y-1/2 hidden lg:block" />
              
              <div className="grid lg:grid-cols-3 gap-8 relative">
                {timeline.map((phase, index) => (
                  <Card 
                    key={index} 
                    className="p-8 border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover-scale animate-fade-in relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground" style={{ backgroundColor: phase.color }}>
                      {index + 1}
                    </div>
                    <div className="text-center space-y-4 pt-4">
                      <h3 className="text-xl font-semibold text-foreground">{phase.phase}</h3>
                      <Badge variant="outline" className="border-primary/30 text-primary">{phase.duration}</Badge>
                      <p className="text-muted-foreground text-sm">{phase.milestone}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-4xl font-playfair font-bold text-foreground">Ready to Join Luxury Labs?</h2>
              <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Founders retain 40%+
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Target IRR 35%
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Institutional Readiness in 24–36 months
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="group luxury-shadow">
                <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Schedule Investor Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground luxury-shadow">
                <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Download Full Investment Pack
              </Button>
            </div>

            <p className="text-sm text-muted-foreground max-w-2xl mx-auto pt-4">
              This document outlines the institutional investment opportunity into Luxury Labs FZCO. 
              Investors acquire 55–60% equity stake for AED 30–40M, enabling operational scaling, 
              in-house expansion, and fund readiness within 36 months.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestorsPitch;
