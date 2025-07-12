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
  MoreHorizontal
} from "lucide-react"

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
  image?: string
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
      team: { lead: 'Ahmed Al-Mansouri', members: 3 }
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
      team: { lead: 'Sarah Johnson', members: 6 }
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
      team: { lead: 'Michael Chen', members: 4 }
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Property Portfolio</CardTitle>
        <Button variant="outline" size="sm">View All Properties</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties.map((property) => (
            <div key={property.id} className="p-4 border border-border rounded-lg hover:bg-accent/30 transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-luxury rounded-lg flex items-center justify-center text-2xl">
                    {getTypeIcon(property.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{property.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {property.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getStatusColor(property.status)}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Acquisition</p>
                  <p className="text-sm font-medium">{property.acquisition.price}</p>
                  <p className="text-xs text-muted-foreground">{property.acquisition.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Value</p>
                  <p className="text-sm font-medium text-success">{property.currentValue}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ROI</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <p className="text-sm font-medium text-success">+{property.roi}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Team Lead</p>
                  <p className="text-sm font-medium">{property.team.lead}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {property.team.members} members
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Project Progress</span>
                  <span className="font-medium">{property.progress}%</span>
                </div>
                <Progress value={property.progress} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}