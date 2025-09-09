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

        <div className="container mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <CardHeader>
              <CardTitle>Projects Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Access detailed project information, progress tracking, and portfolio management through our secure dashboard.
              </p>
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/dashboard'}
              >
                View Projects Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Projects