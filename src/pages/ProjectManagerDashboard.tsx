import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import { 
  Calendar,
  Users,
  Building2,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  FileText,
  MessageCircle,
  Bell,
  Settings
} from "lucide-react"

const ProjectManagerDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const projectStats = {
    totalProjects: 8,
    activeProjects: 3,
    completedProjects: 4,
    onHoldProjects: 1,
    totalBudget: "$4.2M",
    avgCompletion: 73
  }

  const activeProjects = [
    {
      id: "1",
      name: "Marina Bay Luxury Renovation",
      client: "Ahmed Al-Mansouri",
      progress: 65,
      budget: "$800K",
      deadline: "2025-02-15",
      status: "on-track",
      team: ["Elena Rodriguez", "Michael Chen", "Sarah Johnson"],
      nextMilestone: "Interior Installation"
    },
    {
      id: "2", 
      name: "Downtown Penthouse Transformation",
      client: "Sarah Johnson",
      progress: 45,
      budget: "$1.2M",
      deadline: "2025-04-30",
      status: "at-risk",
      team: ["Elena Rodriguez", "David Kim", "Fatima Al-Zahra"],
      nextMilestone: "Structural Work"
    },
    {
      id: "3",
      name: "Business Bay Commercial Upgrade", 
      client: "Dubai Holdings",
      progress: 15,
      budget: "$2.1M",
      deadline: "2025-07-15",
      status: "planning",
      team: ["Elena Rodriguez", "Michael Chen"],
      nextMilestone: "Design Approval"
    }
  ]

  const timeline = [
    { date: "Today", events: ["Marina Bay - Material delivery", "Downtown - Team meeting"] },
    { date: "Tomorrow", events: ["Business Bay - Client presentation", "Quality inspection"] },
    { date: "This Week", events: ["Marina Bay - Interior milestone", "Downtown - Budget review"] }
  ]

  const partnerCoordination = [
    { name: "Elite Construction", project: "Marina Bay", status: "active", rating: 4.8 },
    { name: "Premium Interiors", project: "Downtown", status: "pending", rating: 4.6 },
    { name: "Luxury Fixtures Co", project: "Business Bay", status: "scheduled", rating: 4.9 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-success/10 text-success border-success/20'
      case 'at-risk': return 'bg-warning/10 text-warning border-warning/20'
      case 'planning': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Manager Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Team Chat
            </Button>
            <Button variant="luxury">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{projectStats.totalProjects}</p>
                <p className="text-sm text-muted-foreground">Total Projects</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{projectStats.activeProjects}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{projectStats.completedProjects}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{projectStats.onHoldProjects}</p>
                <p className="text-sm text-muted-foreground">On Hold</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{projectStats.totalBudget}</p>
                <p className="text-sm text-muted-foreground">Total Budget</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{projectStats.avgCompletion}%</p>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Project Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline Management</TabsTrigger>
            <TabsTrigger value="partners">Partner Coordination</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeProjects.map((project) => (
                      <div key={project.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                          </div>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Budget:</span> {project.budget}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm text-muted-foreground mb-2">Next Milestone:</p>
                          <p className="text-sm font-medium">{project.nextMilestone}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex -space-x-2">
                            {project.team.slice(0, 3).map((member, index) => (
                              <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                <AvatarFallback className="text-xs">
                                  {member.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {project.team.length} team members
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Building2 className="h-6 w-6" />
                      <span className="text-sm">New Project</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Users className="h-6 w-6" />
                      <span className="text-sm">Team Meeting</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <FileText className="h-6 w-6" />
                      <span className="text-sm">Progress Report</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Bell className="h-6 w-6" />
                      <span className="text-sm">Send Update</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timeline.map((day, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="font-semibold text-lg">{day.date}</h3>
                      <div className="space-y-2">
                        {day.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{event}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Partner Coordination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partnerCoordination.map((partner, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{partner.name}</h3>
                        <p className="text-sm text-muted-foreground">Project: {partner.project}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{partner.status}</Badge>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{partner.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className={`w-3 h-3 rounded-full ${i < partner.rating ? 'bg-warning' : 'bg-muted'}`} />
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Contact</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-border rounded-lg text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">Performance Trends</h3>
                    <p className="text-sm text-muted-foreground">Project completion rates and efficiency metrics</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg text-center">
                    <DollarSign className="h-12 w-12 mx-auto mb-3 text-success" />
                    <h3 className="font-semibold mb-2">Budget Analysis</h3>
                    <p className="text-sm text-muted-foreground">Cost tracking and budget optimization insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default ProjectManagerDashboard