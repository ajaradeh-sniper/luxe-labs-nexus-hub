import { Helmet } from "react-helmet-async"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import dubaiMarinaImage from "@/assets/dubai-marina-luxury.jpg"

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Projects | Dubai Luxury Villa Flips & Renovation Case Studies</title>
        <meta name="description" content="See active and completed Dubai property transformations by Luxury Labs. Proven ROI, premium design, and luxury renovations across prime locations." />
        <meta name="keywords" content="Dubai villa projects, luxury renovation cases, property flip Dubai, real estate transformation, luxury property portfolio" />
        <meta property="og:title" content="Projects | Dubai Luxury Villa Flips & Renovation Case Studies" />
        <meta property="og:description" content="See active and completed Dubai property transformations by Luxury Labs. Proven ROI, premium design, and luxury renovations across prime locations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luxurylabs.ae/projects" />
        <meta name="twitter:title" content="Projects | Dubai Luxury Villa Flips & Renovation Case Studies" />
        <meta name="twitter:description" content="See active and completed Dubai property transformations by Luxury Labs. Proven ROI, premium design, and luxury renovations across prime locations." />
        <link rel="canonical" href="https://luxurylabs.ae/projects" />
      </Helmet>
      
      <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative h-96 flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dubaiMarinaImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
          </div>
          
          <div className="relative container mx-auto px-4 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">Featured Projects</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
              Explore our portfolio of luxury property transformations across Dubai's prime locations
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Active Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our current luxury property transformations across Dubai's most prestigious locations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Project 1 - Dubai Marina Penthouse */}
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/d2dfa4c3-7fd3-40db-af51-ad041d2b2ce2.png"
                  alt="Dubai Marina Penthouse Renovation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-green-500 text-white">Active</Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Marina Penthouse</h3>
                  <p className="text-sm opacity-90">Dubai Marina</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investment</span>
                    <span className="font-semibold">AED 2.8M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Projected ROI</span>
                    <span className="font-semibold text-green-600">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Timeline</span>
                    <span className="font-semibold">8 months</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">65% Complete</p>
                </div>
              </CardContent>
            </Card>

            {/* Project 2 - Palm Jumeirah Villa */}
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/d6d93f42-4152-430f-bb17-3221a60d919b.png"
                  alt="Palm Jumeirah Villa Transformation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-blue-500 text-white">In Progress</Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Palm Villa</h3>
                  <p className="text-sm opacity-90">Palm Jumeirah</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investment</span>
                    <span className="font-semibold">AED 4.2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Projected ROI</span>
                    <span className="font-semibold text-green-600">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Timeline</span>
                    <span className="font-semibold">12 months</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">40% Complete</p>
                </div>
              </CardContent>
            </Card>

            {/* Project 3 - Downtown Luxury Apartment */}
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png"
                  alt="Downtown Luxury Apartment Renovation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">Starting Soon</Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Downtown Suite</h3>
                  <p className="text-sm opacity-90">Downtown Dubai</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investment</span>
                    <span className="font-semibold">AED 1.9M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Projected ROI</span>
                    <span className="font-semibold text-green-600">19%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Timeline</span>
                    <span className="font-semibold">6 months</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Planning Phase</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Completed Projects Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Completed Transformations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Successful luxury property renovations that exceeded investor expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Completed Project 1 */}
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/116909a8-0f62-4f76-9b4d-43d93a586fd4.png"
                  alt="Completed Business Bay Tower"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">Completed</Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Business Bay Tower</h3>
                  <p className="text-sm opacity-90">Business Bay</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Investment</span>
                    <span className="font-semibold">AED 3.1M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Achieved ROI</span>
                    <span className="font-semibold text-emerald-600">24.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completion Time</span>
                    <span className="font-semibold">9 months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investor Return</span>
                    <span className="font-semibold text-emerald-600">AED 3.86M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completed Project 2 */}
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/4a28db7f-c64a-4b5a-9ec6-71ad24f468f6.png"
                  alt="Completed Emirates Hills Villa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">Completed</Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Emirates Hills Villa</h3>
                  <p className="text-sm opacity-90">Emirates Hills</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Investment</span>
                    <span className="font-semibold">AED 5.8M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Achieved ROI</span>
                    <span className="font-semibold text-emerald-600">31.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completion Time</span>
                    <span className="font-semibold">14 months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Investor Return</span>
                    <span className="font-semibold text-emerald-600">AED 7.61M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="space-y-4">
                <h3 className="text-2xl font-bold font-playfair">Join Our Next Project</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Be part of Dubai's most exclusive property transformation opportunities. 
                  Limited spots available for qualified investors.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => window.location.href = '/contact'}>
                    Schedule Consultation
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => window.location.href = '/dashboard'}>
                    Access Investor Portal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects