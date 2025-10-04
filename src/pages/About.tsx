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
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${conceptToRealityImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
        </div>
        
        <div className="relative container mx-auto px-4 text-white z-10">
          <div className="max-w-4xl animate-fade-in">
            <Badge className="mb-6 text-sm px-4 py-2 bg-primary/20 border-primary/40 backdrop-blur-sm">
              Dubai's Premier Investment Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Luxury Labs
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-8">
              Transforming Dubai's luxury real estate landscape through strategic investments, 
              premium renovations, and data-driven decision making. We create exceptional 
              returns for our investors while delivering world-class properties.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="xl" 
                variant="luxury"
                onClick={() => setIsInvestorModalOpen(true)}
                className="group"
              >
                Start Investing
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" asChild className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-4 text-sm px-4 py-2">Our Mission</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Transforming Luxury Real Estate
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Through innovation, expertise, and unwavering commitment to excellence
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Mission Card 1 */}
            <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/20">
                  <TrendingUp className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-playfair">High-Return Investments</h3>
                <Separator className="mb-4 mx-auto w-16 bg-primary/20" />
                <p className="text-muted-foreground leading-relaxed">
                  Transform Dubai's prime villas into exceptional investment opportunities with projected returns of 25-35% through strategic renovations and market expertise.
                </p>
              </CardContent>
            </Card>

            {/* Mission Card 2 */}
            <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border-2 hover:border-purple-500/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-fade-in [animation-delay:150ms]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-400 to-purple-300 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-500/20">
                  <Palette className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-playfair">World-Class Design</h3>
                <Separator className="mb-4 mx-auto w-16 bg-purple-500/20" />
                <p className="text-muted-foreground leading-relaxed">
                  Combine cutting-edge design with financial discipline, creating luxury properties that maximize both aesthetic appeal and investment value.
                </p>
              </CardContent>
            </Card>

            {/* Mission Card 3 */}
            <Card className="overflow-hidden group hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 border-2 hover:border-green-500/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-fade-in [animation-delay:300ms]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-green-400 to-green-300 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-green-500/20">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-playfair">Luxury Eco-system</h3>
                <Separator className="mb-4 mx-auto w-16 bg-green-500/20" />
                <p className="text-muted-foreground leading-relaxed">
                  Top Class Network of Investors and Partners. Complete transparency with real-time ROI tracking, progress reporting, and detailed analytics throughout the journey.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Founders & Team Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-sm px-4 py-2">Leadership</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry experts driving excellence in luxury real estate transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-2 hover:border-primary/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl" />
                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-500">
                      <User className="w-20 h-20 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-playfair">Ali Jaradeh</h3>
                  <Badge variant="outline" className="mb-6 border-primary/30 text-primary px-4 py-1">Founder & CEO</Badge>
                  <Separator className="mb-6 w-20 mx-auto bg-primary/20" />
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Strategy consultant and investor with 15+ years in government transformation, 
                    mega-projects, and real estate. Leads Luxury Labs' investment strategy, 
                    partnerships, and operations.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border-2 hover:border-purple-500/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-purple-300/10 rounded-full blur-xl" />
                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-300/5 flex items-center justify-center border-4 border-purple-500/20 group-hover:border-purple-500/40 transition-colors duration-500">
                      <Palette className="w-20 h-20 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-playfair">Federica Freschet</h3>
                  <Badge variant="outline" className="mb-6 border-purple-500/30 text-purple-600 px-4 py-1">Co-Founder & Head of Design</Badge>
                  <Separator className="mb-6 w-20 mx-auto bg-purple-500/20" />
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Architect and designer with global luxury retail experience, including 
                    projects for Hermès and high-end brands. She oversees design, renovation, 
                    and project execution.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-green-500/40 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-300/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg font-bold">Investor Relations Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Dedicated to onboarding, reporting, and referral programs for investors.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-blue-500/40 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-300/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-bold">Real Estate Director</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Curates opportunities from Dubai Land Department and luxury networks.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-orange-500/40 bg-gradient-to-br from-card to-muted/30">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-300/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Scale className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg font-bold">Legal & Finance Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Manages contracts, compliance (KYC/AML), and ROI reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Values Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/30" />
        <div className="absolute top-40 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-sm px-4 py-2">Core Values</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/40 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/10">
                      {value.icon}
                    </div>
                    <CardTitle className="text-2xl font-playfair">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Separator className="mb-4 bg-primary/10" />
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {value.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Our Edge Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-sm px-4 py-2">Competitive Advantage</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Our Edge</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What sets us apart in the luxury real estate market
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-2 hover:border-primary/40 bg-gradient-to-br from-card via-card to-muted/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-playfair text-xl">Trusted Investment Brand</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <Separator className="mb-4 bg-primary/10" />
                <p className="text-muted-foreground leading-relaxed">End to End Transformation Investment Services, with focus on luxury properties with 20% ROI</p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-2 hover:border-primary/40 bg-gradient-to-br from-card via-card to-muted/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-playfair text-xl">Luxury Transformation Name</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <Separator className="mb-4 bg-primary/10" />
                <p className="text-muted-foreground leading-relaxed">Build global world class luxury transformation brand, portfolio of curated luxury properties with higher values</p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-2 hover:border-primary/40 bg-gradient-to-br from-card via-card to-muted/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Handshake className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-playfair text-xl">Luxury Network</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <Separator className="mb-4 bg-primary/10" />
                <p className="text-muted-foreground leading-relaxed">Build a network of trusted and curated luxury partners and suppliers</p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-2 hover:border-primary/40 bg-gradient-to-br from-card via-card to-muted/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-playfair text-xl">Media & Transparency</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <Separator className="mb-4 bg-primary/10" />
                <p className="text-muted-foreground leading-relaxed">Documented on Flipping Dubai, our media arm showcasing transformations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Dubai Section */}
      

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={conceptToRealityImage} alt="Luxury Labs Investment Journey" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        </div>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-6 text-sm px-4 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
            Join Us Today
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-playfair text-white">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of investors who trust Luxury Labs with their real estate investments in Dubai's luxury market.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="xl" 
              variant="luxury"
              onClick={() => setIsInvestorModalOpen(true)}
              className="group shadow-2xl shadow-primary/20"
            >
              Start Investing
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              asChild 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-xl"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <InvestorAssessmentModal open={isInvestorModalOpen} onOpenChange={setIsInvestorModalOpen} />
    </div>;
}