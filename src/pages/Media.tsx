import { Play, Image as ImageIcon, FileText, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/Navigation"
import businessBayImage from "@/assets/business-bay.jpg"
import downtownImage from "@/assets/downtown-luxury.jpg" 
import marinaTowerImage from "@/assets/marina-tower.jpg"

export default function Media() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Media Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 px-6 py-2 text-primary border-primary/30 bg-primary/5 font-montserrat">
              Media Gallery
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 font-playfair leading-tight">
              Explore Our <span className="luxury-text">Transformation Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-montserrat max-w-3xl mx-auto">
              Discover the visual journey of our luxury property transformations through high-quality imagery, 
              virtual tours, and detailed project documentation.
            </p>
          </div>

          {/* Featured Video */}
          <div className="mb-20">
            <Card className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-96 overflow-hidden rounded-lg">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/D2HrgCFYNv4"
                    title="Featured: Downtown Transformation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Gallery */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-playfair">Project Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Business Bay Luxury Apartment",
                  image: businessBayImage,
                  type: "Before & After",
                  duration: "6 months"
                },
                {
                  title: "Downtown Premium Villa",
                  image: downtownImage,
                  type: "Complete Renovation",
                  duration: "8 months"
                },
                {
                  title: "Marina Tower Penthouse",
                  image: marinaTowerImage,
                  type: "Interior Design",
                  duration: "4 months"
                },
                {
                  title: "Palm Jumeirah Villa",
                  image: businessBayImage,
                  type: "Full Transformation",
                  duration: "10 months"
                },
                {
                  title: "Jumeirah Beach Residence",
                  image: downtownImage,
                  type: "Luxury Upgrade",
                  duration: "5 months"
                },
                {
                  title: "Emirates Hills Estate",
                  image: marinaTowerImage,
                  type: "Premium Renovation",
                  duration: "12 months"
                }
              ].map((project, index) => (
                <Card key={index} className="luxury-border luxury-shadow bg-card/50 backdrop-blur-sm overflow-hidden group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/80 text-foreground">
                          {project.type}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <ExternalLink className="h-5 w-5 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-foreground mb-2 font-playfair">{project.title}</h3>
                      <p className="text-muted-foreground text-sm font-montserrat">Duration: {project.duration}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Virtual Tours */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-playfair">Virtual Tours</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0 text-center">
                  <div className="w-16 h-16 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <ImageIcon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 font-playfair">360° Property Tours</h3>
                  <p className="text-muted-foreground mb-6 font-montserrat">
                    Immersive virtual tours of our completed projects and current properties
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Explore Tours
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-8 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0 text-center">
                  <div className="w-16 h-16 luxury-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <Play className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 font-playfair">Video Walkthroughs</h3>
                  <p className="text-muted-foreground mb-6 font-montserrat">
                    Professional video tours showcasing the transformation process and final results
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Downloads & Resources */}
          <div>
            <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-playfair">Downloads & Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Investment Brochure",
                  description: "Comprehensive guide to our investment opportunities",
                  type: "PDF",
                  size: "2.5 MB"
                },
                {
                  title: "Portfolio Overview",
                  description: "Complete portfolio of our completed projects",
                  type: "PDF", 
                  size: "5.1 MB"
                },
                {
                  title: "Process Guide",
                  description: "Step-by-step guide to our transformation process",
                  type: "PDF",
                  size: "1.8 MB"
                }
              ].map((resource, index) => (
                <Card key={index} className="p-6 luxury-border luxury-shadow bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors cursor-pointer">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 luxury-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-2 font-playfair">{resource.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3 font-montserrat">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-montserrat">{resource.type} • {resource.size}</span>
                          <Download className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}