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
  Briefcase
} from "lucide-react"

const Projects = () => {
  const areasOfFocus = [
    {
      icon: Building,
      title: "Luxury Residential",
      description: "High-end apartment complexes, penthouses, and premium residential developments with focus on modern amenities and lifestyle enhancement.",
      features: ["Premium finishes", "Smart home integration", "Luxury amenities", "Concierge services"]
    },
    {
      icon: Briefcase,
      title: "Commercial Spaces",
      description: "Office buildings, retail spaces, and mixed-use developments designed for maximum functionality and aesthetic appeal.",
      features: ["Modern workspaces", "Retail optimization", "Mixed-use design", "Technology integration"]
    },
    {
      icon: Home,
      title: "Villa & Estate",
      description: "Exclusive villas and private estates with custom designs, premium materials, and personalized luxury features.",
      features: ["Custom architecture", "Landscape design", "Private amenities", "Sustainable solutions"]
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming spaces through innovative design, premium construction, and strategic development 
            to create exceptional real estate experiences.
          </p>
        </div>

        {/* Areas of Focus Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Areas of Focus</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in diverse property types, each tailored to meet specific market demands and lifestyle requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {areasOfFocus.map((area, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <area.icon className="h-8 w-8 text-primary" />
                  </div>
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

        {/* Our Approach Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Our Approach</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our methodology combines strategic planning, quality assurance, and innovative solutions 
              to deliver exceptional results that exceed expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approaches.map((approach, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <approach.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{approach.title}</h3>
                  <p className="text-sm text-muted-foreground">{approach.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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
            {sampleProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                      <div className="flex items-center gap-1 text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
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
                  
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6 bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground">Ready to Start Your Project?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let us help you transform your vision into reality with our expertise in luxury real estate development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start a Project
            </Button>
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}

export default Projects