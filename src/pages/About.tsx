import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Eye, TrendingUp, Award, Globe, ArrowRight, CheckCircle, Building, PieChart, Handshake, Star, Briefcase, User, Shield, FileText, Camera } from "lucide-react";

// Import new images
import foundersTeam from "@/assets/founders-team-dubai-skyline.jpg";
import conceptToReality from "@/assets/concept-to-reality-villa.jpg";
import aliStrategy from "@/assets/ali-jaradeh-strategy-meeting.jpg";
import federicaDesign from "@/assets/federica-design-sketches.jpg";
import teamMontage from "@/assets/team-collaboration-montage.jpg";
import palmMarketGrowth from "@/assets/palm-jumeirah-market-growth.jpg";
const About = () => {
  const founders = [{
    name: "Ali Jaradeh",
    role: "Founder & CEO",
    description: "Strategy consultant and investor with 15+ years in government transformation, mega-projects, and real estate. Leads Luxury Labs' investment strategy, partnerships, and operations.",
    image: aliStrategy,
    expertise: "Investment Strategy, Partnerships, Operations"
  }, {
    name: "Federica Freschet",
    role: "Co-Founder & Head of Design",
    description: "Architect and designer with global luxury retail experience, including projects for Hermès and high-end brands. She oversees design, renovation, and project execution.",
    image: federicaDesign,
    expertise: "Luxury Design, Project Execution, Hermès-grade Standards"
  }];
  const team = [{
    icon: Users,
    title: "Investor Relations Team",
    description: "Dedicated to onboarding, reporting, and referral programs for investors"
  }, {
    icon: Building,
    title: "Real Estate Director",
    description: "Curates opportunities from Dubai Land Department and luxury networks"
  }, {
    icon: Shield,
    title: "Legal & Finance Team",
    description: "Manages contracts, compliance (KYC/AML), and ROI reporting"
  }, {
    icon: Award,
    title: "Contractors & Designers Network",
    description: "Includes Hermès-grade contractors, MEP specialists, and premium suppliers"
  }];
  const dubaiAdvantages = ["19.9% YoY growth in luxury villa prices (2024)", "High demand from HNWIs relocating for tax-free returns and lifestyle", "Global investors from Europe, GCC, and Asia targeting Palm Jumeirah, Dubai Marina, Emirates Hills"];
  const ourEdge = [{
    title: "Proven ROI",
    value: "12–30%",
    description: "on completed villa flips"
  }, {
    title: "Global Standard Design",
    value: "Hermès-grade",
    description: "Curated properties and luxury concept designs with world class finishing"
  }, {
    title: "Trusted Partnerships",
    value: "Premium Network",
    description: "Legal, finance, and contractor networks built for efficiency"
  }, {
    title: "Media & Transparency",
    value: "Flipping Dubai",
    description: "Documented transformations showcasing results"
  }];
  return <>
      <Helmet>
        <title>About Luxury Labs | Dubai Luxury Property Transformation Experts</title>
        <meta name="description" content="Luxury Labs is Dubai's end-to-end luxury property flipping and concierge investment platform. Founded by Ali Jaradeh and Federica Freschet, delivering ROI through design and innovation." />
        <meta name="keywords" content="Luxury Labs founders, Ali Jaradeh, Federica Freschet, Dubai property experts, luxury villa transformation, Hermès design, real estate investment" />
        <link rel="canonical" href="https://luxurylabs.ae/about" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={foundersTeam} alt="Luxury Labs founders with Dubai skyline" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-playfair">
                Redefining Luxury Property Investment in Dubai
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Founded in Dubai, Luxury Labs transforms villas into high-ROI assets through world-class design, renovation, and transparent investor partnerships.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 font-playfair">Our Mission</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">Luxury design and transformation ensuring class, comfort and long-lasting property appreciation</strong> through Luxury Labs' trust and reputation.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">To transform Dubai's prime villas into high-return investments.</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">To combine world-class design with financial discipline.</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Eye className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground">
                      <strong className="text-foreground">To create a transparent ecosystem</strong> where investors and clients see real-time ROI tracking and progress reporting.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-96 overflow-hidden rounded-2xl">
                <img src={conceptToReality} alt="Conceptual sketch overlaid with finished villa" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Luxury Labs */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Why Choose Luxury Labs</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover what sets Luxury Labs apart as Dubai's premier luxury property transformation platform.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Proven Track Record</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Our commitment to excellence is backed by consistent results and satisfied investors 
                    who trust us with their capital.
                  </p>
                  <ul className="space-y-2">
                    {["100% project completion rate", "Zero investor losses to date", "Average 8-month turnaround"].map((point, index) => <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-8 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Expert Management</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Our multidisciplinary team of real estate experts, designers, and project managers 
                    ensures every transformation exceeds expectations.
                  </p>
                  <ul className="space-y-2">
                    {["20+ years combined experience", "Licensed professionals only", "Comprehensive project oversight"].map((point, index) => <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-8 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Luxury Network</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Our extensive network of elite real estate developers, premium agencies, certified contractors, 
                    luxury suppliers, and specialized factories ensuring superior quality and craftsmanship.
                  </p>
                  <ul className="space-y-2">
                    {["Elite real estate developers & agencies", "Certified luxury contractors", "Premium suppliers & material factories"].map((point, index) => <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-8 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Media & Transparency</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Our "Flipping Dubai" media series showcases every transformation in detail, 
                    providing complete transparency and building trust through documented results.
                  </p>
                  <ul className="space-y-2">
                    {["Full transformation documentation", "Real-time progress updates", "Transparent ROI reporting"].map((point, index) => <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Founders & Team */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Founders & Team</h2>
            </div>

            {/* Founders */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {founders.map((founder, index) => (
                <Card key={founder.name} className="overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{founder.name}</h3>
                        <p className="text-primary font-semibold">{founder.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {founder.description}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Key Expertise:</h4>
                      <Badge variant="secondary" className="text-xs">
                        {founder.expertise}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team Departments */}
            <div className="relative mb-12">
              <img src={teamMontage} alt="Team collaboration montage" className="w-full h-64 object-cover rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-8">
                  <h3 className="text-2xl font-bold mb-2">Our Extended Team</h3>
                  <p className="text-muted-foreground">World-class professionals across every discipline</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((dept, index) => <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4">
                      <dept.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{dept.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{dept.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Why Dubai */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 overflow-hidden rounded-2xl">
                <img src={palmMarketGrowth} alt="Palm Jumeirah aerial with market growth chart" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 font-playfair">Why Dubai</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Dubai is the world's luxury property capital:
                </p>
                <div className="space-y-4 mb-8">
                  {dubaiAdvantages.map((advantage, index) => <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{advantage}</p>
                    </div>)}
                </div>
                <p className="text-lg text-muted-foreground">
                  Luxury Labs is positioned at the heart of this growth, leveraging local knowledge and global design expertise to deliver investor success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Edge */}
        

      </div>
    </>;
};
export default About;