import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  TrendingUp, 
  Shield, 
  Award,
  CheckCircle,
  Users,
  Calendar,
  MapPin,
  Building,
  Home,
  Briefcase,
  Star
} from "lucide-react"
import dubaiMarinaImage from "@/assets/dubai-marina-luxury.jpg"
import downtownImage from "@/assets/downtown-luxury.jpg"
import luxuryVillaImage from "@/assets/premium-villa-selection.jpg"
import luxuryPenthouseImage from "@/assets/luxury-penthouse.jpg"
import luxuryOfficeImage from "@/assets/luxury-office.jpg"
import villaGolfCourseImage from "@/assets/villa-golf-course.jpg"
import dubaeMarinaLuxury from "@/assets/dubai-marina-luxury.jpg"
import businessBay from "@/assets/business-bay.jpg"
import downtownLuxury from "@/assets/downtown-luxury.jpg"
import marinaTower from "@/assets/marina-tower.jpg"
import premiumTower from "@/assets/premium-tower.jpg"
import premiumVillaSelection from "@/assets/premium-villa-selection.jpg"

const Projects = () => {
  const areasOfFocus = [
    {
      icon: Building,
      title: "Luxury Residential",
      description: "High-end apartment complexes, penthouses, and premium residential developments with focus on modern amenities and lifestyle enhancement.",
      features: ["Premium finishes", "Smart home integration", "Luxury amenities", "Concierge services"],
      image: luxuryPenthouseImage
    },
    {
      icon: Briefcase,
      title: "Commercial Spaces",
      description: "Office buildings, retail spaces, and mixed-use developments designed for maximum functionality and aesthetic appeal.",
      features: ["Modern workspaces", "Retail optimization", "Mixed-use design", "Technology integration"],
      image: luxuryOfficeImage
    },
    {
      icon: Home,
      title: "Villa & Estate",
      description: "Exclusive villas and private estates with custom designs, premium materials, and personalized luxury features.",
      features: ["Custom architecture", "Landscape design", "Private amenities", "Sustainable solutions"],
      image: villaGolfCourseImage
    }
  ]

  const approaches = [
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Comprehensive market analysis and strategic planning to ensure optimal project outcomes and maximum ROI."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous quality control processes and premium material selection for lasting value and excellence."
    },
    {
      icon: TrendingUp,
      title: "Value Engineering",
      description: "Optimizing design and construction methods to maximize value while maintaining luxury standards."
    },
    {
      icon: Award,
      title: "Excellence Standards",
      description: "Commitment to award-winning design and construction that exceeds industry benchmarks."
    }
  ]

  const sampleProjects = [
    {
      id: '1',
      name: 'Marina Bay Luxury Towers',
      location: 'Dubai Marina',
      type: 'Residential',
      status: 'completed',
      budget: '$120M',
      duration: '36 months',
      units: 280,
      image: dubaiMarinaImage,
      features: ['Premium finishes', 'Smart home systems', 'Infinity pool', 'Sky gardens']
    },
    {
      id: '2',
      name: 'Downtown Business Hub',
      location: 'DIFC',
      type: 'Commercial',
      status: 'active',
      budget: '$85M',
      duration: '24 months',
      units: 150,
      image: downtownImage,
      features: ['Grade A offices', 'Conference facilities', 'Retail spaces', 'Parking complex']
    },
    {
      id: '3',
      name: 'Palm Residence Villas',
      location: 'Palm Jumeirah',
      type: 'Villa',
      status: 'planning',
      budget: '$200M',
      duration: '42 months',
      units: 45,
      image: luxuryVillaImage,
      features: ['Private beaches', 'Custom architecture', 'Smart automation', 'Wellness centers']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20'
      case 'active': return 'bg-primary/10 text-primary border-primary/20'
      case 'planning': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Our Projects</h1>
          <p className="text-xl text-accent max-w-3xl mx-auto">
            Transforming spaces through innovative design, premium construction, and strategic development 
            to create exceptional real estate experiences.
          </p>
        </div>

        {/* Sample Projects Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Sample Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of successful developments that showcase our commitment to excellence 
              and innovation in real estate transformation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                id: '1',
                name: 'Marina Bay Luxury Towers',
                location: 'Dubai Marina',
                type: 'Residential',
                status: 'completed',
                budget: '$120M',
                duration: '36 months',
                units: 280,
                image: dubaiMarinaImage,
                features: ['Premium finishes', 'Smart home systems', 'Infinity pool', 'Sky gardens']
              },
              {
                id: '2',
                name: 'Downtown Business Hub',
                location: 'DIFC',
                type: 'Commercial',
                status: 'active',
                budget: '$85M',
                duration: '24 months',
                units: 150,
                image: downtownImage,
                features: ['Grade A offices', 'Conference facilities', 'Retail spaces', 'Parking complex']
              },
              {
                id: '3',
                name: 'Palm Residence Villas',
                location: 'Palm Jumeirah',
                type: 'Villa',
                status: 'planning',
                budget: '$200M',
                duration: '42 months',
                units: 45,
                image: luxuryVillaImage,
                features: ['Private beaches', 'Custom architecture', 'Smart automation', 'Wellness centers']
              }
            ].map((project) => {
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'completed': return 'bg-success/10 text-success border-success/20'
                  case 'active': return 'bg-primary/10 text-primary border-primary/20'
                  case 'planning': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  default: return 'bg-muted text-muted-foreground'
                }
              }
              
              return (
                <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div>
                      <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                      <div className="flex items-center gap-1 text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <p className="font-medium">{project.type}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Budget:</span>
                        <p className="font-medium">{project.budget}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">{project.duration}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Units:</span>
                        <p className="font-medium">{project.units}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {project.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-success" />
                            <span className="text-xs">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => window.location.href = `/project/${project.id}`}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Areas of Focus Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Types of Real Estate Luxury Labs Focus On</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in diverse property types, each tailored to meet specific market demands and lifestyle requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {areasOfFocus.map((area, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={area.image} 
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                      <area.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{area.description}</p>
                  <div className="space-y-2">
                    {area.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Prime Dubai Investment Locations */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Prime Locations Luxury Labs Focus on</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Strategic locations with exceptional growth potential and luxury living experiences in Dubai's most sought-after areas.
            </p>
          </div>
          <Card className="luxury-border luxury-shadow bg-background backdrop-blur-sm">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={dubaeMarinaLuxury} 
                      alt="Dubai Marina" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-3">Dubai Marina</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Waterfront lifestyle with stunning marina views, premium amenities, and strong rental yields in one of Dubai's most vibrant communities.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        High rental yield potential (6-8%)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Waterfront luxury living
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Strong resale value
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        World-class dining & entertainment
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={downtownLuxury} 
                      alt="Downtown Dubai" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-3">Downtown Dubai</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The heart of modern Dubai featuring iconic landmarks, luxury shopping, and premium residential developments with unmatched prestige.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Iconic Burj Khalifa vicinity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Premium location prestige
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Excellent connectivity
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Dubai Mall & Opera nearby
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={businessBay} 
                      alt="Business Bay" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-3">Business Bay</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Dubai's central business district offering modern luxury towers, canal views, and excellent investment returns in a thriving commercial hub.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Central business district location
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Dubai Canal waterfront
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        High appreciation potential
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Modern luxury developments
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={marinaTower} 
                      alt="Palm Jumeirah" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-3">Palm Jumeirah</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      World-famous man-made island offering exclusive beachfront properties, luxury resorts, and unparalleled prestige in Dubai's real estate market.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Exclusive beachfront living
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        World-renowned landmark
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Ultra-luxury properties
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Premium resort amenities
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={premiumVillaSelection} 
                      alt="Dubai Hills Estate" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-3">Dubai Hills Estate</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Master-planned community featuring golf course views, family-friendly amenities, and modern villas with excellent growth potential.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Championship golf course
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Family-oriented community
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Modern villa developments
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Strong capital appreciation
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={premiumTower} 
                      alt="JBR - Jumeirah Beach Residence" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-3">JBR - Jumeirah Beach Residence</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Beachfront towers with direct beach access, vibrant nightlife, and premium rental opportunities in Dubai's most popular coastal destination.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Direct beach access
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Vibrant beachfront lifestyle
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        Strong tourism demand
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                        The Walk entertainment district
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="text-center space-y-6 bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let us help you transform your vision into reality with our expertise in luxury real estate development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.location.href = '/contact'}
            >
              Start a Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/projects'}
            >
              View All Projects
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}

export default Projects