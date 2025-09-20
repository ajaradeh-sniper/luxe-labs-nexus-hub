import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Building2, Users, TrendingUp, Award, Globe, Shield, Target, Lightbulb, Heart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function About() {
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
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
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
            <Button asChild size="lg" className="luxury-gradient text-primary-foreground">
              
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
            {stats.map((stat, index) => <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            
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


      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of investors who trust Luxury Labs with their real estate investments.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="luxury-gradient text-primary-foreground">
              <Link to="/investor-questionnaire">Complete Investor Profile</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/auth">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
}