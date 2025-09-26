import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  TrendingUp,
  Users,
  Building,
  Target
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

  const [selectedProject, setSelectedProject] = useState(myProjects[0])
  const [activeTab, setActiveTab] = useState('overview')

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalBudget = myProjects.reduce((sum, project) => sum + project.budget, 0);
  const totalUsed = myProjects.reduce((sum, project) => sum + project.budgetUsed, 0);
  const averageProgress = myProjects.reduce((sum, project) => sum + project.progress, 0) / myProjects.length;
  const totalDays = myProjects.reduce((sum, project) => sum + project.daysRemaining, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your active projects and track progress with detailed insights
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Project Summary
            </Button>
          </div>
        </div>

        {/* Overall Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalUsed)}</div>
              <p className="text-xs text-muted-foreground">{((totalUsed / totalBudget) * 100).toFixed(1)}% utilized</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageProgress.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Completion rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDays}</div>
              <p className="text-xs text-muted-foreground">Total across projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Project Selection Cards */}
        <Card>
          <CardHeader>
            <CardTitle>My Projects</CardTitle>
            <CardDescription>Select a project to view detailed progress and information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedProject.id === project.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        <Building className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{project.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {project.status}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Budget:</span>
                        <span className="font-medium">{formatCurrency(project.budget)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={project.progress > 80 ? "default" : project.progress > 50 ? "secondary" : "outline"}>
                          {project.nextMilestone}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Project Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <Building className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">{selectedProject.name}</CardTitle>
                <CardDescription>
                  Status: {selectedProject.status} • Due: {selectedProject.dueDate} • 
                  {selectedProject.daysRemaining} days remaining
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{formatCurrency(selectedProject.budget)}</div>
                      <p className="text-sm text-muted-foreground">Total Budget</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{selectedProject.progress}%</div>
                      <p className="text-sm text-muted-foreground">Completion</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{selectedProject.teamRating}</div>
                      <p className="text-sm text-muted-foreground">Team Rating</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Budget Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Budget:</span>
                        <span className="font-medium">{formatCurrency(selectedProject.budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Used:</span>
                        <span className="font-medium">{formatCurrency(selectedProject.budgetUsed)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining:</span>
                        <span className="font-medium text-green-600">{formatCurrency(selectedProject.budget - selectedProject.budgetUsed)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Utilization:</span>
                        <span className="font-bold">{((selectedProject.budgetUsed / selectedProject.budget) * 100).toFixed(1)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Project Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span>{selectedProject.progress}%</span>
                        </div>
                        <Progress value={selectedProject.progress} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Budget Usage</span>
                          <span>{((selectedProject.budgetUsed / selectedProject.budget) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(selectedProject.budgetUsed / selectedProject.budget) * 100} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Timeline</CardTitle>
                    <CardDescription>Track project milestones and completion status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedProject.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                          {getMilestoneIcon(milestone.status)}
                          <div>
                            <p className="text-sm font-medium">{milestone.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{milestone.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="milestones" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Milestones</CardTitle>
                    <CardDescription>Detailed milestone tracking and approvals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedProject.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {getMilestoneIcon(milestone.status)}
                            <div>
                              <p className="font-medium">{milestone.name}</p>
                              <p className="text-sm text-muted-foreground capitalize">{milestone.status}</p>
                            </div>
                          </div>
                          {milestone.status === 'current' && (
                            <Button size="sm">
                              <ThumbsUp className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Documents</CardTitle>
                    <CardDescription>Access contracts, designs, and project files</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Project documents will appear here</p>
                      <p className="text-sm text-muted-foreground mt-2">{selectedProject.documents} documents available</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="communication" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication & Updates</CardTitle>
                    <CardDescription>Recent project updates and team communication</CardDescription>
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
                    
                    <div className="grid gap-4 md:grid-cols-2 mt-6">
                      <Button variant="outline" className="h-16 flex flex-col gap-2">
                        <MessageSquare className="h-6 w-6" />
                        <span>Message Team</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex flex-col gap-2">
                        <Calendar className="h-6 w-6" />
                        <span>Schedule Visit</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {portal}
    </DashboardLayout>
  )
}