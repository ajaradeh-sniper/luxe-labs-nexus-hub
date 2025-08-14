import { Navigation } from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, Users, FileText, ArrowRight, Star, Building, Target } from "lucide-react"
import luxuryDubaiSkyline from "@/assets/luxury-dubai-skyline.jpg"
import luxuryInteriorModern from "@/assets/luxury-interior-modern.jpg"
import dubaeMarinaLuxury from "@/assets/dubai-marina-luxury.jpg"

const Index = () => {
  return (
    <>
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
              <p className="text-xl md:text-2xl mb-8 text-white/90 font-montserrat">
                Transform luxury real estate investments with precision and elegance in Dubai's premier market
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
