import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Target,
  MapPin,
  DollarSign,
  Clock,
  Eye,
  Gift,
  TrendingUp,
  Building,
  AlertCircle,
  Star,
  Filter
} from "lucide-react"

export default function ClientOpportunities() {
  // Available opportunities (posted by admin)
  const opportunities = [
    {
      id: 1,
      title: "Emirates Hills Villa Development",
      minInvestment: 500000,
      expectedRoi: "25-35%",
      duration: "24 months",
      category: "Luxury Residential",
      spotsAvailable: 3,
      totalSpots: 5,
      description: "Premium villa renovation in Emirates Hills with luxury finishes and smart home integration",
      riskLevel: "Medium",
      image: "/assets/emirates-hills-villa.jpg",
      postedBy: "Luxury Labs Admin",
      postedDate: "Jan 15, 2024",
      featured: true,
      tags: ["Premium Location", "High ROI", "Luxury Market"]
    },
    {
      id: 2,
      title: "Dubai Marina Penthouse Flip",
      minInvestment: 750000,
      expectedRoi: "30-40%",
      duration: "18 months",
      category: "Penthouse",
      spotsAvailable: 2,
      totalSpots: 4,
      description: "High-end penthouse transformation with panoramic views and premium amenities",
      riskLevel: "Medium-High",
      image: "/assets/dubai-marina-luxury.jpg",
      postedBy: "Luxury Labs Admin",
      postedDate: "Jan 12, 2024",
      featured: false,
      tags: ["Marina Views", "Premium Amenities", "High Growth"]
    },
    {
      id: 3,
      title: "Business Bay Commercial Tower",
      minInvestment: 1000000,
      expectedRoi: "20-28%",
      duration: "36 months",
      category: "Commercial",
      spotsAvailable: 1,
      totalSpots: 3,
      description: "Prime commercial space development in Business Bay's financial district",
      riskLevel: "Low-Medium",
      image: "/assets/business-bay.jpg",
      postedBy: "Luxury Labs Admin",
      postedDate: "Jan 10, 2024",
      featured: false,
      tags: ["Commercial", "Stable Returns", "Prime Location"]
    },
    {
      id: 4,
      title: "Palm Jumeirah Villa Collection",
      minInvestment: 800000,
      expectedRoi: "28-38%",
      duration: "20 months",
      category: "Villa Collection",
      spotsAvailable: 4,
      totalSpots: 6,
      description: "Exclusive villa transformation project on Palm Jumeirah with private beach access",
      riskLevel: "Medium",
      image: "/assets/palm-jumeirah-villa.jpg",
      postedBy: "Luxury Labs Admin",
      postedDate: "Jan 8, 2024",
      featured: true,
      tags: ["Beach Access", "Exclusive", "High Demand"]
    }
  ]

  const getRiskBadgeVariant = (risk: string) => {
    if (risk.includes('Low')) return 'default'
    if (risk.includes('High')) return 'destructive'
    return 'secondary'
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-elegant rounded-xl">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Investment Opportunities</h1>
              <p className="text-muted-foreground">
                Exclusive investment opportunities curated by our team
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Investment Guide
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="gradient-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Opportunities</p>
                  <p className="text-3xl font-bold text-primary">
                    {opportunities.length}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Featured Projects</p>
                  <p className="text-3xl font-bold text-warning">
                    {opportunities.filter(o => o.featured).length}
                  </p>
                </div>
                <div className="p-3 bg-warning/10 rounded-xl">
                  <Star className="h-8 w-8 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Expected ROI</p>
                  <p className="text-3xl font-bold text-success">
                    25-35%
                  </p>
                </div>
                <div className="p-3 bg-success/10 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Min. Investment</p>
                  <p className="text-3xl font-bold text-accent">
                    AED 500K
                  </p>
                </div>
                <div className="p-3 bg-accent/10 rounded-xl">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className={`overflow-hidden ${opportunity.featured ? 'ring-2 ring-primary/20' : ''}`}>
              {opportunity.featured && (
                <div className="bg-gradient-elegant p-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-primary font-medium text-sm">
                    <Star className="h-4 w-4" />
                    Featured Opportunity
                  </div>
                </div>
              )}
              
              <div className="aspect-video bg-muted relative">
                <img 
                  src={opportunity.image} 
                  alt={opportunity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge className="bg-background/90 text-foreground">
                    {opportunity.spotsAvailable}/{opportunity.totalSpots} spots
                  </Badge>
                  {opportunity.featured && (
                    <Badge className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{opportunity.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{opportunity.category}</Badge>
                    <Badge variant={getRiskBadgeVariant(opportunity.riskLevel)}>
                      {opportunity.riskLevel} Risk
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm">{opportunity.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Min Investment</p>
                    <p className="font-semibold">AED {opportunity.minInvestment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected ROI</p>
                    <p className="font-semibold text-success">{opportunity.expectedRoi}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{opportunity.duration}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Posted {opportunity.postedDate}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Button className="flex-1">
                    <Gift className="h-4 w-4 mr-2" />
                    Express Interest
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-elegant border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Don't See What You're Looking For?</h3>
                <p className="text-muted-foreground mb-4">
                  Our team is constantly sourcing new investment opportunities. Contact us to discuss your specific investment criteria.
                </p>
              </div>
              <div className="flex gap-3">
                <Button>
                  Contact Investment Team
                </Button>
                <Button variant="outline">
                  Set Up Investment Alert
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}