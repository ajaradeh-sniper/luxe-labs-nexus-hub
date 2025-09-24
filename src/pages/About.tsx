import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Navigation } from '@/components/Navigation';
import { Building2, Users, TrendingUp, Award, Globe, Shield, Target, Lightbulb, Heart, CheckCircle, Eye, ArrowRight, Handshake, User, Palette, Building, Scale, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InvestorAssessmentModal } from '@/components/modals/InvestorAssessmentModal';
import aliJaradehStrategyImage from '@/assets/ali-jaradeh-strategy-meeting.jpg';
import federicaDesignImage from '@/assets/federica-design-sketches.jpg';
import teamCollaborationImage from '@/assets/team-collaboration-montage.jpg';
import palmJumeirahMarketImage from '@/assets/palm-jumeirah-market-growth.jpg';
import conceptToRealityImage from '@/assets/concept-to-reality-villa.jpg';
export default function About() {
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const stats = [{
    label: 'Projects Completed',
    value: '150+',
    icon: <Building2 className="w-6 h-6" />
  }, {
    label: 'Happy Investors',
    value: '500+',
    icon: <Users className="w-6 h-6" />
  }, {
    label: 'Average ROI',
    value: '28%',
    icon: <TrendingUp className="w-6 h-6" />
  }, {
    label: 'Years Experience',
    value: '12+',
    icon: <Award className="w-6 h-6" />
  }];
  const values = [{
    icon: <Shield className="w-8 h-8" />,
    title: 'Trust & Transparency',
    description: 'Every investment opportunity is thoroughly vetted with complete financial transparency and regular reporting.'
  }, {
    icon: <Target className="w-8 h-8" />,
    title: 'Results-Driven',
    description: 'Our track record speaks for itself with consistent above-market returns and successful project completions.'
  }, {
    icon: <Lightbulb className="w-8 h-8" />,
    title: 'Innovation',
    description: 'Leveraging cutting-edge technology and market insights to identify and maximize investment opportunities.'
  }, {
    icon: <Heart className="w-8 h-8" />,
    title: 'Client-Centric',
    description: 'Your success is our success. We provide personalized service and maintain long-term relationships.'
  }];
  return <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="relative h-96 flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${conceptToRealityImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
        <div className="relative container mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">Luxury Labs</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Transforming Dubai's luxury real estate landscape through strategic investments, 
            premium renovations, and data-driven decision making. We create exceptional 
            returns for our investors while delivering world-class properties.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="luxury-gradient text-primary-foreground" onClick={() => setIsInvestorModalOpen(true)}>
              Start Investing
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30 hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 hidden">
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transforming Dubai's luxury real estate landscape through innovation, expertise, and unwavering commitment to excellence
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Mission Card 1 */}
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">High-Return Investments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transform Dubai's prime villas into exceptional investment opportunities with projected returns of 25-35% through strategic renovations and market expertise.
                </p>
              </CardContent>
            </Card>

            {/* Mission Card 2 */}
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-300/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">World-Class Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Combine cutting-edge design with financial discipline, creating luxury properties that maximize both aesthetic appeal and investment value.
                </p>
              </CardContent>
            </Card>

            {/* Mission Card 3 */}
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-300/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Transparent Ecosystem</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create complete transparency with real-time ROI tracking, progress reporting, and detailed analytics for investors and clients throughout the journey.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Founders & Team Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Team</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-primary" />
                  </div>
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
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-300/10 flex items-center justify-center mb-4">
                    <Palette className="w-16 h-16 text-purple-600" />
                  </div>
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
          
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-green-300/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Investor Relations Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dedicated to onboarding, reporting, and referral programs for investors.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-300/10 flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Real Estate Director</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Curates opportunities from Dubai Land Department and luxury networks.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-300/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Legal & Finance Team</CardTitle>
                </div>
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
            {values.map((value, index) => <Card key={index}>
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
              </Card>)}
          </div>
        </div>
      </section>

      {/* Our Edge Section */}
      <section className="py-20 px-4 bg-background">
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

      {/* Why Dubai Section */}
      

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={conceptToRealityImage} alt="Luxury Labs Investment Journey" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of investors who trust Luxury Labs with their real estate investments in Dubai's luxury market.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setIsInvestorModalOpen(true)}>
              Start Investing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <InvestorAssessmentModal open={isInvestorModalOpen} onOpenChange={setIsInvestorModalOpen} />
    </div>;
}