import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Users,
  MoreHorizontal,
  Eye
} from "lucide-react"
import marinaTower from "@/assets/marina-tower.jpg"
import downtownLuxury from "@/assets/downtown-luxury.jpg"
import businessBay from "@/assets/business-bay.jpg"

interface Property {
  id: string
  name: string
  location: string
  type: 'residential' | 'commercial' | 'mixed'
  status: 'active' | 'renovation' | 'planning' | 'completed'
  acquisition: {
    date: string
    price: string
  }
  currentValue: string
  roi: number
  progress: number
  team: {
    lead: string
    members: number
  }
  image: string
}

export function PropertyOverview() {
  const properties: Property[] = [
    {
      id: '1',
      name: 'Marina Bay Tower',
      location: 'Dubai Marina',
      type: 'residential',
      status: 'active',
      acquisition: { date: 'Dec 2024', price: '$2.5M' },
      currentValue: '$2.8M',
      roi: 12.5,
      progress: 100,
      team: { lead: 'Ahmed Al-Mansouri', members: 3 },
      image: marinaTower
    },
    {
      id: '2',
      name: 'Downtown Luxury Apartments',
      location: 'Downtown Dubai',
      type: 'residential',
      status: 'renovation',
      acquisition: { date: 'Oct 2024', price: '$4.2M' },
      currentValue: '$4.8M',
      roi: 14.3,
      progress: 65,
      team: { lead: 'Sarah Johnson', members: 6 },
      image: downtownLuxury
    },
    {
      id: '3',
      name: 'Business Bay Complex',
      location: 'Business Bay',
      type: 'commercial',
      status: 'planning',
      acquisition: { date: 'Nov 2024', price: '$6.1M' },
      currentValue: '$6.5M',
      roi: 6.6,
      progress: 25,
      team: { lead: 'Michael Chen', members: 4 },
      image: businessBay
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20'
      case 'renovation': return 'bg-warning/10 text-warning border-warning/20'
      case 'planning': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'completed': return 'bg-primary/10 text-primary border-primary/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'residential': return '🏠'
      case 'commercial': return '🏢'
      case 'mixed': return '🏘️'
      default: return '🏗️'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
            Property Portfolio
          </h2>
          <p className="text-muted-foreground">Manage your luxury property investments</p>
        </div>
        <Button variant="luxury" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View All Properties
        </Button>
      </div>

      <div className="grid gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-luxury transition-all duration-300 group">
            <div className="md:flex">
              {/* Property Image */}
              <div className="md:w-80 h-48 md:h-auto relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge 
                  variant="secondary" 
                  className={`absolute top-4 left-4 ${getStatusColor(property.status)}`}
                >
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <CardContent className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{property.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-2xl">{getTypeIcon(property.type)}</span>
                      <span className="capitalize">{property.type} Property</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-accent/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Acquisition</p>
                    <p className="font-bold text-lg">{property.acquisition.price}</p>
                    <p className="text-xs text-muted-foreground">{property.acquisition.date}</p>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                    <p className="font-bold text-lg text-success">{property.currentValue}</p>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">ROI</p>
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <p className="font-bold text-lg text-success">+{property.roi}%</p>
                    </div>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Team</p>
                    <p className="font-semibold text-sm">{property.team.lead}</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {property.team.members} members
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Project Progress</span>
                    <span className="text-sm font-bold text-primary">{property.progress}%</span>
                  </div>
                  <Progress value={property.progress} className="h-3" />
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}