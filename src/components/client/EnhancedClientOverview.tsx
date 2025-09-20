import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Eye, 
  MessageSquare, 
  Calendar, 
  Star, 
  FileText, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Camera,
  ThumbsUp,
  AlertTriangle,
  TrendingUp,
  Download,
  Phone,
  Video,
  MapPin,
  Target,
  Zap,
  BarChart3
} from "lucide-react"

interface Project {
  id: number
  name: string
  status: string
  progress: number
  budget: number
  budgetUsed: number
  nextMilestone: string
  dueDate: string
  daysRemaining: number
  location: string
  projectManager: {
    name: string
    avatar: string
    phone: string
  }
  milestones: Array<{
    name: string
    status: 'completed' | 'current' | 'pending'
    date?: string
    photos?: number
  }>
  teamRating: number
  documents: number
  priority: 'high' | 'medium' | 'low'
  type: 'renovation' | 'design' | 'construction'
}

interface Update {
  id: number
  project: string
  update: string
  date: string
  time: string
  type: 'milestone' | 'approval_needed' | 'urgent' | 'info'
  hasPhotos: boolean
  photosCount?: number
  urgent?: boolean
}

export function EnhancedClientOverview() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      name: "Downtown Apartment Renovation",
      status: "In Progress",
      progress: 65,
      budget: 450000,
      budgetUsed: 292500,
      nextMilestone: "Kitchen Installation",
      dueDate: "2024-02-15",
      daysRemaining: 18,
      location: "Downtown Dubai",
      priority: "high",
      type: "renovation",
      projectManager: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah.jpg",
        phone: "+971 50 234 5678"
      },
      milestones: [
        { name: "Design Approval", status: "completed", date: "Dec 15", photos: 8 },
        { name: "Demolition", status: "completed", date: "Jan 5", photos: 12 },
        { name: "Structural Work", status: "completed", date: "Jan 12", photos: 15 },
        { name: "Kitchen Installation", status: "current", photos: 6 },
        { name: "Final Finishes", status: "pending" },
        { name: "Handover", status: "pending" }
      ],
      teamRating: 4.8,
      documents: 12
    },
    {
      id: 2,
      name: "Business Bay Office Design", 
      status: "Design Phase",
      progress: 30,
      budget: 280000,
      budgetUsed: 84000,
      nextMilestone: "Design Approval",
      dueDate: "2024-01-25",
      daysRemaining: 32,
      location: "Business Bay",
      priority: "medium",
      type: "design",
      projectManager: {
        name: "Ahmed Al-Rashid",
        avatar: "/avatars/ahmed.jpg",
        phone: "+971 50 345 6789"
      },
      milestones: [
        { name: "Initial Consultation", status: "completed", date: "Dec 20", photos: 5 },
        { name: "Concept Design", status: "completed", date: "Jan 8", photos: 10 },
        { name: "Design Approval", status: "current" },
        { name: "Construction", status: "pending" },
        { name: "Installation", status: "pending" },
        { name: "Completion", status: "pending" }
      ],
      teamRating: 4.9,
      documents: 8
    }
  ]

  const recentUpdates: Update[] = [
    { 
      id: 1,
      project: "Downtown Apartment", 
      update: "Kitchen cabinets delivered and installation started", 
      date: "Jan 18",
      time: "2:30 PM",
      type: "milestone",
      hasPhotos: true,
      photosCount: 8
    },
    { 
      id: 2,
      project: "Business Bay Office", 
      update: "Final design concepts ready for your approval", 
      date: "Jan 16",
      time: "11:45 AM",
      type: "approval_needed",
      hasPhotos: false,
      urgent: true
    },
    { 
      id: 3,
      project: "Downtown Apartment", 
      update: "Electrical installation completed successfully", 
      date: "Jan 14",
      time: "4:15 PM",
      type: "milestone",
      hasPhotos: true,
      photosCount: 12
    },
    { 
      id: 4,
      project: "Business Bay Office", 
      update: "Site measurements completed, 3D modeling in progress", 
      date: "Jan 12",
      time: "10:00 AM",
      type: "info",
      hasPhotos: true,
      photosCount: 15
    }
  ]

  const getBudgetStatus = (used: number, total: number) => {
    const percentage = (used / total) * 100
    if (percentage < 70) return { color: "text-emerald-600", bg: "bg-emerald-50", status: "On Track", icon: "✓" }
    if (percentage < 85) return { color: "text-amber-600", bg: "bg-amber-50", status: "Monitor", icon: "⚠" }
    return { color: "text-red-600", bg: "bg-red-50", status: "At Risk", icon: "!" }
  }

  const getMilestoneIcon = (status: string) => {
    if (status === "completed") return <CheckCircle className="h-4 w-4 text-emerald-600" />
    if (status === "current") return <Clock className="h-4 w-4 text-blue-600" />
    return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
  }

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "bg-red-100 text-red-800"
    if (priority === "medium") return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'approval_needed': return <AlertTriangle className="h-4 w-4 text-amber-600" />
      case 'milestone': return <CheckCircle className="h-4 w-4 text-emerald-600" />
      case 'urgent': return <Zap className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Actions</p>
                <p className="text-2xl font-bold text-amber-600">
                  {recentUpdates.filter(u => u.type === 'approval_needed').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Rating</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(projects.reduce((acc, p) => acc + p.teamRating, 0) / projects.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Cards */}
      <div className="space-y-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due: {project.dueDate}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{project.progress}%</p>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-amber-600" />
                  <p className="text-lg font-bold">{project.daysRemaining}</p>
                  <p className="text-xs text-muted-foreground">Days Left</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <DollarSign className="h-5 w-5 mx-auto mb-1 text-emerald-600" />
                  <p className="text-lg font-bold">
                    {((project.budgetUsed / project.budget) * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Budget Used</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <Star className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                  <p className="text-lg font-bold">{project.teamRating}</p>
                  <p className="text-xs text-muted-foreground">Team Rating</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <FileText className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <p className="text-lg font-bold">{project.documents}</p>
                  <p className="text-xs text-muted-foreground">Documents</p>
                </div>
              </div>

              {/* Budget Status */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Budget Status</h4>
                  <Badge className={`${getBudgetStatus(project.budgetUsed, project.budget).bg} ${getBudgetStatus(project.budgetUsed, project.budget).color}`}>
                    {getBudgetStatus(project.budgetUsed, project.budget).icon} {getBudgetStatus(project.budgetUsed, project.budget).status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AED {project.budgetUsed.toLocaleString()} used</span>
                    <span>AED {project.budget.toLocaleString()} total</span>
                  </div>
                  <Progress 
                    value={(project.budgetUsed / project.budget) * 100} 
                    className="h-2"
                  />
                </div>
              </div>

              {/* Project Manager Contact */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={project.projectManager.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {project.projectManager.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Project Manager</p>
                    <p className="text-sm text-muted-foreground">{project.projectManager.name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-3">
                <h4 className="font-semibold">Project Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${
                      milestone.status === 'current' ? 'border-blue-200 bg-blue-50' : 
                      milestone.status === 'completed' ? 'border-emerald-200 bg-emerald-50' : 
                      'border-gray-200 bg-gray-50'
                    }`}>
                      {getMilestoneIcon(milestone.status)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{milestone.name}</p>
                        {milestone.date && (
                          <p className="text-xs text-muted-foreground">{milestone.date}</p>
                        )}
                        {milestone.photos && (
                          <p className="text-xs text-blue-600">{milestone.photos} photos</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents ({project.documents})
                </Button>
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  View Photos
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                {project.milestones.some(m => m.status === "current") && (
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Approve Milestone
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recent Updates & Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentUpdates.map((update) => (
            <div key={update.id} className={`flex items-start gap-4 p-4 rounded-lg border ${
              update.urgent ? 'border-amber-200 bg-amber-50' : 'border-gray-200'
            }`}>
              <div className={`p-2 rounded-lg ${
                update.type === 'approval_needed' ? 'bg-amber-100' : 
                update.type === 'milestone' ? 'bg-emerald-100' : 
                update.type === 'urgent' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {getUpdateIcon(update.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{update.project}</p>
                    {update.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{update.date}</p>
                    <p className="text-xs text-muted-foreground">{update.time}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{update.update}</p>
                <div className="flex items-center gap-2">
                  {update.hasPhotos && (
                    <Button variant="link" size="sm" className="p-0 h-auto text-blue-600">
                      <Camera className="h-3 w-3 mr-1" />
                      View Photos ({update.photosCount})
                    </Button>
                  )}
                  {update.type === 'approval_needed' && (
                    <Button size="sm" className="bg-amber-600 text-white hover:bg-amber-700">
                      Review & Approve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}