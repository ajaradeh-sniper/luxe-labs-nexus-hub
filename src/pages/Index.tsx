import { Helmet } from "react-helmet-async"
import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, Users, FileText, ArrowRight, Star, Building, Target, CheckCircle } from "lucide-react"
import luxuryDubaiSkyline from "@/assets/luxury-dubai-skyline.jpg"
import luxuryInteriorModern from "@/assets/luxury-interior-modern.jpg"
import dubaeMarinaLuxury from "@/assets/dubai-marina-luxury.jpg"

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Luxury Labs | Dubai Luxury Property Flips & High-ROI Investments</title>
        <meta name="description" content="Invest in Dubai luxury villas with 15–30% ROI. Luxury Labs specializes in property flips, premium renovations, and exclusive investor opportunities." />
        <meta name="keywords" content="Dubai property investment, luxury villa flips, high ROI, property renovation, real estate Dubai, luxury property, investment opportunities" />
        <meta property="og:title" content="Luxury Labs | Dubai Luxury Property Flips & High-ROI Investments" />
        <meta property="og:description" content="Invest in Dubai luxury villas with 15–30% ROI. Luxury Labs specializes in property flips, premium renovations, and exclusive investor opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luxurylabs.ae" />
        <meta name="twitter:title" content="Luxury Labs | Dubai Luxury Property Flips & High-ROI Investments" />
        <meta name="twitter:description" content="Invest in Dubai luxury villas with 15–30% ROI. Luxury Labs specializes in property flips, premium renovations, and exclusive investor opportunities." />
        <link rel="canonical" href="https://luxurylabs.ae" />
      </Helmet>
      <Navigation />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${luxuryDubaiSkyline})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
          
          <div className="relative container mx-auto px-4 text-white">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair">
                Luxury Labs
                <span className="block text-3xl md:text-4xl text-primary">Real Estate Excellence</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white font-montserrat">
                Transform Luxury Real Estate
                <span className="block">with Exceptional Quality and Returns</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" variant="luxury" className="text-lg px-8 py-6">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Explore Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                  View Portfolio
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Star className="mr-2 h-4 w-4" />
                  Dubai Property Market
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Building className="mr-2 h-4 w-4" />
                  Investment Excellence
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                  <Target className="mr-2 h-4 w-4" />
                  18.5% Average ROI
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 font-playfair">Why Choose Luxury Labs</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Dubai's premier luxury property transformation company with proven results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-luxury transition-all duration-300">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={luxuryInteriorModern} 
                    alt="Luxury Interior" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Premium Transformations</h3>
                  <p className="text-muted-foreground">
                    Expert renovations using premium materials and cutting-edge design
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-luxury transition-all duration-300">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={dubaeMarinaLuxury} 
                    alt="Dubai Marina Luxury" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
                  <p className="text-muted-foreground">
                    Access to Dubai's most prestigious neighborhoods and developments
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-luxury rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-background" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Exceptional Returns</h3>
                  <p className="text-muted-foreground mb-4">
                    Average 18.5% ROI with transparent profit sharing
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">$25M+</div>
                      <div className="text-muted-foreground">Invested</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Investment Options Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 font-playfair">Investment Options</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the investment strategy that aligns with your financial goals and risk profile
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
                      Portfolio Investment
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-playfair">Diversified Fund</h3>
                    <div className="text-4xl font-bold luxury-text mb-2 font-playfair">25-30%</div>
                    <p className="text-muted-foreground font-montserrat">Projected Annual Return</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Minimum investment: AED 500K",
                      "Diversified across 10+ properties",
                      "Professional management included",
                      "Quarterly performance reports",
                      "Exit flexibility after 12 months"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-montserrat">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full luxury-gradient text-primary-foreground font-montserrat">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="luxury-gradient text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
                      Individual Project
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-playfair">Single Property</h3>
                    <div className="text-4xl font-bold luxury-text mb-2 font-playfair">30-35%</div>
                    <p className="text-muted-foreground font-montserrat">Projected Return</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Minimum investment: AED 1M",
                      "Full transparency on single asset",
                      "Direct involvement opportunities",
                      "Higher return potential",
                      "6-12 month typical timeline"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-montserrat">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full luxury-gradient text-primary-foreground font-montserrat">
                    View Projects
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
                      Premium Access
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-playfair">VIP Membership</h3>
                    <div className="text-4xl font-bold luxury-text mb-2 font-playfair">35%+</div>
                    <p className="text-muted-foreground font-montserrat">Target Returns</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Minimum investment: AED 5M",
                      "First access to premium deals",
                      "Personal relationship manager",
                      "Customized investment strategies",
                      "Exclusive networking events"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-montserrat">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full luxury-gradient text-primary-foreground font-montserrat">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-luxury text-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Investment?</h2>
            <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
              Join sophisticated investors who trust Luxury Labs for exceptional returns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="bg-background text-foreground hover:bg-background/90">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="bg-background text-foreground hover:bg-background/90">
                <FileText className="mr-2 h-5 w-5" />
                View Investment Guide
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Index
