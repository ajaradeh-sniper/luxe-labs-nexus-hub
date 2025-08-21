import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/DashboardLayout"
import { useActionRouter } from "@/components/ActionRouter"
import { useAuth } from "@/contexts/AuthContext"
import { 
  Eye, 
  Download, 
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
  TrendingUp
} from "lucide-react"

export default function ClientDashboard() {
  const { user } = useAuth()
  const { open, portal } = useActionRouter()
  
  const myProjects = [
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
      milestones: [
        { name: "Design Approval", status: "completed" },
        { name: "Demolition", status: "completed" },
        { name: "Structural Work", status: "completed" },
        { name: "Kitchen Installation", status: "current" },
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
      milestones: [
        { name: "Initial Consultation", status: "completed" },
        { name: "Concept Design", status: "completed" },
        { name: "Design Approval", status: "current" },
        { name: "Construction", status: "pending" },
        { name: "Installation", status: "pending" },
        { name: "Completion", status: "pending" }
      ],
      teamRating: 4.9,
      documents: 8
    }
  ]

  const recentUpdates = [
    { 
      project: "Downtown Apartment", 
      update: "Kitchen cabinets delivered and installation started", 
      date: "Jan 18",
      type: "milestone",
      hasPhotos: true
    },
    { 
      project: "Business Bay Office", 
      update: "Final design concepts ready for your approval", 
      date: "Jan 16",
      type: "approval_needed",
      hasPhotos: false
    },
    { 
      project: "Downtown Apartment", 
      update: "Electrical installation completed successfully", 
      date: "Jan 14",
      type: "milestone",
      hasPhotos: true
    }
  ]

  const getBudgetStatus = (used: number, total: number) => {
    const percentage = (used / total) * 100
    if (percentage < 70) return { color: "text-success", bg: "bg-success/10", status: "On Track" }
    if (percentage < 85) return { color: "text-warning", bg: "bg-warning/10", status: "Monitor" }
    return { color: "text-destructive", bg: "bg-destructive/10", status: "At Risk" }
  }

  const getMilestoneIcon = (status: string) => {
    if (status === "completed") return <CheckCircle className="h-4 w-4 text-success" />
    if (status === "current") return <Clock className="h-4 w-4 text-primary" />
    return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Project Progress Tracker */}
            <div className="grid gap-6">
              {myProjects.map((project) => (
                <Card key={project.id} className="luxury-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Progress & Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{project.progress}%</p>
                        <p className="text-sm text-muted-foreground">Complete</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <Clock className="h-6 w-6 mx-auto mb-2 text-warning" />
                        <p className="text-2xl font-bold">{project.daysRemaining}</p>
                        <p className="text-sm text-muted-foreground">Days Left</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <DollarSign className="h-6 w-6 mx-auto mb-2 text-success" />
                        <p className="text-lg font-bold">
                          {((project.budgetUsed / project.budget) * 100).toFixed(0)}%
                        </p>
                        <p className="text-sm text-muted-foreground">Budget Used</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <Star className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{project.teamRating}</p>
                        <p className="text-sm text-muted-foreground">Team Rating</p>
                      </div>
                    </div>

                    {/* Budget Tracker */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Budget Status</h3>
                        <Badge className={getBudgetStatus(project.budgetUsed, project.budget).bg + " " + getBudgetStatus(project.budgetUsed, project.budget).color}>
                          {getBudgetStatus(project.budgetUsed, project.budget).status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>AED {project.budgetUsed.toLocaleString()} used</span>
                          <span>AED {project.budget.toLocaleString()} total</span>
                        </div>
                        <Progress 
                          value={(project.budgetUsed / project.budget) * 100} 
                          className="h-3"
                        />
                      </div>
                    </div>

                    {/* Timeline with Milestones */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Project Timeline</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {project.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                            {getMilestoneIcon(milestone.status)}
                            <div>
                              <p className="text-sm font-medium">{milestone.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{milestone.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Documents ({project.documents})
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message Team
                      </Button>
                      {project.milestones.some(m => m.status === "current") && (
                        <Button size="sm" className="luxury-gradient text-primary-foreground">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Approve Milestone
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Updates Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                    <div className={`p-2 rounded-lg ${
                      update.type === 'approval_needed' ? 'bg-warning/10' : 
                      update.type === 'milestone' ? 'bg-success/10' : 'bg-muted/30'
                    }`}>
                      {update.type === 'approval_needed' ? 
                        <AlertTriangle className="h-4 w-4 text-warning" /> :
                        <CheckCircle className="h-4 w-4 text-success" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{update.project}</p>
                        <p className="text-xs text-muted-foreground">{update.date}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{update.update}</p>
                      {update.hasPhotos && (
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          <Camera className="h-3 w-3 mr-1" />
                          View Photos
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Documents section - contracts, designs, approvals</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Detailed progress tracking and timeline view</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Feedback & Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button 
                    onClick={() => open('upload-doc')} 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                  >
                    <Camera className="h-6 w-6" />
                    <span>Upload Feedback</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <MessageSquare className="h-6 w-6" />
                    <span>Contact PM</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    <span>Schedule Visit</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Star className="h-6 w-6" />
                    <span>Rate Team</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {portal}
    </DashboardLayout>
  )
}