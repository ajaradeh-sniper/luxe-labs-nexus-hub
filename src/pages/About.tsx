import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Navigation } from '@/components/Navigation';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  Globe, 
  Shield,
  Target,
  Lightbulb,
  Heart,
  CheckCircle,
  Eye,
  ArrowRight,
  Handshake
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { InvestorAssessmentModal } from '@/components/modals/InvestorAssessmentModal';
import aliJaradehStrategyImage from '@/assets/ali-jaradeh-strategy-meeting.jpg';
import federicaDesignImage from '@/assets/federica-design-sketches.jpg';
import teamCollaborationImage from '@/assets/team-collaboration-montage.jpg';
import palmJumeirahMarketImage from '@/assets/palm-jumeirah-market-growth.jpg';
import conceptToRealityImage from '@/assets/concept-to-reality-villa.jpg';

export default function About() {
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const stats = [
    { label: 'Projects Completed', value: '150+', icon: <Building2 className="w-6 h-6" /> },
    { label: 'Happy Investors', value: '500+', icon: <Users className="w-6 h-6" /> },
    { label: 'Average ROI', value: '28%', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Years Experience', value: '12+', icon: <Award className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Transparency',
      description: 'Every investment opportunity is thoroughly vetted with complete financial transparency and regular reporting.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Results-Driven',
      description: 'Our track record speaks for itself with consistent above-market returns and successful project completions.'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology and market insights to identify and maximize investment opportunities.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Client-Centric',
      description: 'Your success is our success. We provide personalized service and maintain long-term relationships.'
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            <Globe className="w-4 h-4 mr-2" />
            Dubai's Premier Investment Platform
          </Badge>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            Luxury Labs
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforming Dubai's luxury real estate landscape through strategic investments, 
            premium renovations, and data-driven decision making. We create exceptional 
            returns for our investors while delivering world-class properties.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="luxury-gradient text-primary-foreground"
              onClick={() => setIsInvestorModalOpen(true)}
            >
              Start Investing
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/opportunities">View Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              Founded with a vision to democratize luxury real estate investment in Dubai
            </p>
          </div>
          
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  Luxury Labs was born from a simple observation: Dubai's luxury real estate market 
                  was filled with incredible opportunities, but access was limited to those with 
                  extensive networks and deep market knowledge.
                </p>
                
                <p className="leading-relaxed mb-6">
                  Our founders, with over a decade of combined experience in Dubai's property market, 
                  recognized that by combining cutting-edge technology with local expertise, they could 
                  create a platform that opens these opportunities to a broader range of investors.
                </p>
                
                <p className="leading-relaxed">
                  Today, we've grown into Dubai's leading investment platform, having successfully 
                  completed over 150 projects and generated exceptional returns for our investor community. 
                  Our success is built on three pillars: thorough market analysis, meticulous project 
                  execution, and unwavering commitment to our investors.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>



      {/* Our Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <div className="space-y-6 text-lg">
            <p className="font-medium">Luxury Labs was founded with a clear purpose:</p>
            <div className="space-y-4 text-muted-foreground">
              <p>To transform Dubai's prime villas into high-return investments.</p>
              <p>To combine world-class design with financial discipline.</p>
              <p>To create a transparent ecosystem where investors and clients see real-time ROI tracking and progress reporting.</p>
            </div>
          </div>
          
          <div className="mt-12">
            <img 
              src={conceptToRealityImage} 
              alt="Conceptual sketch overlaid with finished villa transformation"
              className="w-full max-w-3xl mx-auto rounded-lg luxury-shadow"
            />
          </div>
        </div>
      </section>

      {/* Founders & Team Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Founders & Team</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <img 
                    src={aliJaradehStrategyImage} 
                    alt="Ali Jaradeh in business setting"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Ali Jaradeh</h3>
                  <Badge variant="outline" className="mb-4">Founder & CEO</Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    Strategy consultant and investor with 15+ years in government transformation, 
                    mega-projects, and real estate. Leads Luxury Labs' investment strategy, 
                    partnerships, and operations.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <img 
                    src={federicaDesignImage} 
                    alt="Federica Freschet with design sketches"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Federica Freschet</h3>
                  <Badge variant="outline" className="mb-4">Co-Founder & Head of Design</Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    Architect and designer with global luxury retail experience, including 
                    projects for Hermès and high-end brands. She oversees design, renovation, 
                    and project execution.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mb-8">
            <img 
              src={teamCollaborationImage} 
              alt="Montage of project managers, designers, and contractors"
              className="w-full max-w-4xl mx-auto rounded-lg luxury-shadow"
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Investor Relations Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dedicated to onboarding, reporting, and referral programs for investors.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real Estate Director</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Curates opportunities from Dubai Land Department and luxury networks.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legal & Finance Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manages contracts, compliance (KYC/AML), and ROI reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Dubai Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Dubai</h2>
          
          <div className="text-center mb-8">
            <p className="text-xl font-medium mb-6">Dubai is the world's luxury property capital:</p>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>19.9% YoY growth in luxury villa prices (2024).</p>
              <p>High demand from HNWIs relocating for tax-free returns and lifestyle.</p>
              <p>Global investors from Europe, GCC, and Asia targeting Palm Jumeirah, Dubai Marina, Emirates Hills.</p>
            </div>
          </div>
          
          <div className="mb-8">
            <img 
              src={palmJumeirahMarketImage} 
              alt="Aerial view of Palm Jumeirah with market growth chart overlay"
              className="w-full rounded-lg luxury-shadow"
            />
          </div>
          
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              Luxury Labs is positioned at the heart of this growth, leveraging local knowledge 
              and global design expertise to deliver investor success.
            </p>
          </div>
        </div>
      </section>

      {/* Our Edge Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Edge</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Proven ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">15–30% on completed villa flips.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Award className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Global Standard Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Led by Federica Freschet, with Hermès-grade finishing.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Handshake className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Trusted Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Legal, finance, and contractor networks built for efficiency.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Eye className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Media & Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Documented on Flipping Dubai, our media arm showcasing transformations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of investors who trust Luxury Labs with their real estate investments.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="luxury-gradient text-primary-foreground"
              onClick={() => setIsInvestorModalOpen(true)}
            >
              Start Investing
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <InvestorAssessmentModal 
        open={isInvestorModalOpen} 
        onOpenChange={setIsInvestorModalOpen} 
      />
    </div>
  );
}