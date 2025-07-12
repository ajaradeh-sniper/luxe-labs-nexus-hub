import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Building2, 
  FileText, 
  DollarSign, 
  Users, 
  CheckCircle, 
  Clock,
  AlertCircle 
} from "lucide-react"

interface Activity {
  id: string
  type: 'property' | 'document' | 'financial' | 'partnership' | 'milestone'
  title: string
  description: string
  timestamp: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  status: 'completed' | 'pending' | 'urgent'
  metadata?: {
    amount?: string
    location?: string
    documentType?: string
  }
}

export function RecentActivities() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'property',
      title: 'Property Acquisition Completed',
      description: 'Marina Bay Tower - Unit 2504 successfully acquired',
      timestamp: '2 hours ago',
      user: { name: 'Ahmed Al-Mansouri', initials: 'AM' },
      status: 'completed',
      metadata: { amount: '$2.5M', location: 'Dubai Marina' }
    },
    {
      id: '2',
      type: 'document',
      title: 'Contract Signature Required',
      description: 'Purchase agreement for Palm Residence awaiting signature',
      timestamp: '4 hours ago',
      user: { name: 'Sarah Johnson', initials: 'SJ' },
      status: 'urgent',
      metadata: { documentType: 'Purchase Agreement' }
    },
    {
      id: '3',
      type: 'financial',
      title: 'ROI Report Generated',
      description: 'Q4 2024 ROI analysis completed for downtown portfolio',
      timestamp: '6 hours ago',
      user: { name: 'Michael Chen', initials: 'MC' },
      status: 'completed',
      metadata: { amount: '+18.5% ROI' }
    },
    {
      id: '4',
      type: 'milestone',
      title: 'Renovation Phase Completed',
      description: 'Luxury Apartments Phase 1 renovation finished ahead of schedule',
      timestamp: '1 day ago',
      user: { name: 'Omar Hassan', initials: 'OH' },
      status: 'completed',
      metadata: { location: 'Downtown Dubai' }
    },
    {
      id: '5',
      type: 'partnership',
      title: 'New Partnership Established',
      description: 'Collaboration agreement signed with Premier Construction',
      timestamp: '2 days ago',
      user: { name: 'Lisa Wang', initials: 'LW' },
      status: 'completed'
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'property': return <Building2 className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
      case 'financial': return <DollarSign className="h-4 w-4" />
      case 'partnership': return <Users className="h-4 w-4" />
      case 'milestone': return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Completed</Badge>
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
      case 'urgent':
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">Urgent</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />
      case 'pending': return <Clock className="h-4 w-4 text-warning" />
      case 'urgent': return <AlertCircle className="h-4 w-4 text-destructive" />
      default: return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </h4>
                    {getStatusIcon(activity.status)}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {activity.description}
                  </p>
                  
                  {activity.metadata && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {activity.metadata.amount && (
                        <Badge variant="outline" className="text-xs">
                          {activity.metadata.amount}
                        </Badge>
                      )}
                      {activity.metadata.location && (
                        <Badge variant="outline" className="text-xs">
                          {activity.metadata.location}
                        </Badge>
                      )}
                      {activity.metadata.documentType && (
                        <Badge variant="outline" className="text-xs">
                          {activity.metadata.documentType}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                        <AvatarFallback className="text-xs bg-gradient-luxury text-primary-foreground">
                          {activity.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{activity.user.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(activity.status)}
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}