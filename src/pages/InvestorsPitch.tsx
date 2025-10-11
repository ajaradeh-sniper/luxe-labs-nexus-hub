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
  // Main Investment Details
  const mainInvestmentData = [
    { 
      category: "Investor Entry", 
      description: "Institutional, Family Offices, or UHNW individuals",
      icon: Users,
      color: "hsl(var(--secondary))"
    },
    { 
      category: "Investor ROI Target", 
      description: "20–25% per project / 35%+ IRR at company level",
      icon: Target,
      color: "hsl(var(--primary))"
    },
    { 
      category: "Founders' Retained Equity", 
      description: "40%+ (via sweat equity + profit share + anti-dilution clause)",
      icon: Shield,
      color: "hsl(var(--secondary))"
    },
    { 
      category: "Exit Options", 
      description: "Fund creation, equity resale, or bank refinancing",
      icon: ArrowRight,
      color: "hsl(var(--primary))"
    }
  ];

  // Holding Company Structure
  const holdingStructure = {
    holding: "Luxury Labs FZCO",
    subsidiaries: [
      { name: "Design Studio", icon: Award },
      { name: "Media Production", icon: Sparkles },
      { name: "Brokerage", icon: Building2 },
      { name: "Contracting", icon: Shield }
    ],
    spvs: [
      { name: "SPV Project 1", icon: TrendingUp },
      { name: "SPV Project 2", icon: TrendingUp },
      { name: "SPV Project 3", icon: TrendingUp }
    ]
  };

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
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4" variant="outline">
                <LineChart className="w-3 h-3 mr-1" />
                Investment Terms
              </Badge>
              <h2 className="text-4xl font-playfair font-bold mb-4 text-foreground">Investment Overview</h2>
              <p className="text-muted-foreground text-lg">Core investment terms and structure</p>
            </div>

            {/* Highlighted Raise Amount */}
            <Card className="group relative p-10 border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-background backdrop-blur-sm hover:border-primary/50 transition-all duration-300 animate-fade-in luxury-shadow overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-primary/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Raise Amount</h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4" />
                  <p className="text-4xl font-playfair font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    AED 30–40 Million
                  </p>
                  <p className="text-muted-foreground mt-2">Equity into Luxury Labs FZCO</p>
                </div>
              </div>
            </Card>
            
            {/* Structure Visual */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-playfair font-semibold text-center mb-8 text-foreground">Investment Structure</h3>
              <Card className="p-8 border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="space-y-8">
                  {/* Holding Company */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/30 shadow-lg">
                      <Building2 className="w-6 h-6 text-primary" />
                      <span className="text-xl font-semibold text-foreground">{holdingStructure.holding}</span>
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-accent" />
                  </div>

                  {/* Subsidiaries */}
                  <div>
                    <p className="text-center text-sm text-muted-foreground mb-4 font-semibold">Subsidiaries</p>
                    <div className="grid md:grid-cols-4 gap-4">
                      {holdingStructure.subsidiaries.map((sub, index) => (
                        <Card 
                          key={index} 
                          className="p-4 text-center hover-scale border-accent/30 bg-accent/5 hover:bg-accent/10 transition-all duration-300"
                        >
                          <sub.icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                          <p className="text-sm font-medium text-foreground">{sub.name}</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-accent to-secondary" />
                  </div>

                  {/* SPVs */}
                  <div>
                    <p className="text-center text-sm text-muted-foreground mb-4 font-semibold">Special Purpose Vehicles (Per Project)</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {holdingStructure.spvs.map((spv, index) => (
                        <Card 
                          key={index} 
                          className="p-4 text-center hover-scale border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-all duration-300"
                        >
                          <spv.icon className="w-5 h-5 mx-auto mb-2 text-secondary" />
                          <p className="text-sm font-medium text-foreground">{spv.name}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Investment Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {mainInvestmentData.map((item, index) => (
                <Card 
                  key={index} 
                  className="group relative p-8 hover-scale border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div 
                        className="p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <item.icon 
                          className="w-6 h-6" 
                          style={{ color: item.color }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {item.category}
                        </h3>
                        <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  
                  <div 
                    className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-2xl"
                    style={{ backgroundColor: item.color }}
                  />
                </Card>
              ))}
            </div>

            {/* Timeline Summary Box */}
            <Card className="relative p-8 border-primary/30 bg-gradient-to-br from-card via-card to-accent/5 backdrop-blur-sm animate-fade-in luxury-shadow overflow-hidden" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-playfair font-semibold text-foreground">Timeline Overview</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/20 shadow-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Investment Horizon</h4>
                      <p className="text-muted-foreground">24–36 months (Institutional readiness phase)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/20 shadow-lg">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Current Stage</h4>
                      <p className="text-muted-foreground">Proof of Concept Complete (JW Marriott, JVC, JGE) — Now Scaling</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Visual */}
                <div className="mt-8 pt-8 border-t border-border/50">
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary -translate-y-1/2" />
                    <div className="relative flex justify-between items-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary shadow-lg z-10" />
                        <span className="text-xs font-semibold text-foreground">Now</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-accent shadow-lg z-10" />
                        <span className="text-xs font-semibold text-foreground">12 months</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-secondary shadow-lg z-10" />
                        <span className="text-xs font-semibold text-foreground">24-36 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
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
