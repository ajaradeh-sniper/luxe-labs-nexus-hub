import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  FileText,
  Camera,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  MapPin,
  Edit,
  Play,
  Pause,
  Settings
} from "lucide-react"

const ProjectDetail = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock project data - in real app, fetch based on id
  const project = {
    id: id,
    name: 'Marina Bay Luxury Renovation',
    property: 'Marina Bay Tower',
    status: 'active',
    progress: 65,
    budget: '$800K',
    spent: '$520K',
    startDate: '2024-10-01',
    expectedCompletion: '2025-02-15',
    actualCompletion: null,
    teamMembers: 12,
    roi: 18.5,
    location: 'Dubai Marina, Dubai, UAE',
    description: 'Complete luxury renovation of penthouse apartment including premium finishes, smart home integration, and panoramic view optimization.',
    client: 'Ahmed Al-Mansouri',
    projectManager: 'Elena Rodriguez'
  }

  const timeline = [
    { date: '2024-10-01', milestone: 'Project Initiation', status: 'completed' },
    { date: '2024-10-15', milestone: 'Design Approval', status: 'completed' },
    { date: '2024-11-01', milestone: 'Demolition Phase', status: 'completed' },
    { date: '2024-11-20', milestone: 'Structural Work', status: 'in-progress' },
    { date: '2024-12-15', milestone: 'Interior Installation', status: 'pending' },
    { date: '2025-01-30', milestone: 'Final Inspection', status: 'pending' },
    { date: '2025-02-15', milestone: 'Project Completion', status: 'pending' }
  ]

  const team = [
    { name: 'Elena Rodriguez', role: 'Project Manager', avatar: '/avatars/elena.jpg' },
    { name: 'Michael Chen', role: 'Lead Designer', avatar: '/avatars/michael.jpg' },
    { name: 'Sarah Johnson', role: 'Operations Manager', avatar: '/avatars/sarah.jpg' },
    { name: 'David Kim', role: 'Financial Analyst', avatar: '/avatars/david.jpg' }
  ]

  const documents = [
    { name: 'Project Charter', type: 'PDF', size: '2.4 MB', date: '2024-10-01' },
    { name: 'Design Blueprints', type: 'PDF', size: '15.8 MB', date: '2024-10-15' },
    { name: 'Material Specifications', type: 'XLSX', size: '3.2 MB', date: '2024-10-20' },
    { name: 'Progress Photos', type: 'ZIP', size: '45.6 MB', date: '2024-11-20' }
  ]

  const financial = {
    budget: 800000,
    spent: 520000,
    remaining: 280000,
    categories: [
      { name: 'Materials', budgeted: 400000, spent: 280000 },
      { name: 'Labor', budgeted: 250000, spent: 180000 },
      { name: 'Equipment', budgeted: 100000, spent: 45000 },
      { name: 'Permits & Fees', budgeted: 50000, spent: 15000 }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20'
      case 'active': case 'in-progress': return 'bg-primary/10 text-primary border-primary/20'
      case 'pending': return 'bg-warning/10 text-warning border-warning/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
            <p className="text-muted-foreground">{project.property}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
            <Button variant="luxury">
              <Settings className="mr-2 h-4 w-4" />
              Manage
            </Button>
          </div>
        </div>

        {/* Status and Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Badge className={getStatusColor(project.status)}>
                  {project.status === 'active' ? 'In Progress' : project.status}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">Project Status</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{project.progress}%</p>
                <Progress value={project.progress} className="mt-2 h-2" />
                <p className="text-sm text-muted-foreground mt-2">Completion</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{project.budget}</p>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-xs text-muted-foreground mt-1">Spent: {project.spent}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{project.teamMembers}</p>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">+{project.roi}%</p>
                <p className="text-sm text-muted-foreground">Expected ROI</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{new Date(project.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Completion</p>
                      <p className="font-medium">{new Date(project.expectedCompletion).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Client</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Project Manager</p>
                      <p className="font-medium">{project.projectManager}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Location</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{project.location}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p className="text-sm">{project.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium">Material delivery completed</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium">Team meeting scheduled</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium">Quality inspection pending</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-border bg-background">
                        {item.status === 'completed' && <CheckCircle className="h-4 w-4 text-success" />}
                        {item.status === 'in-progress' && <Clock className="h-4 w-4 text-primary" />}
                        {item.status === 'pending' && <div className="w-3 h-3 rounded-full bg-muted" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{item.milestone}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {team.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-foreground">${financial.budget.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-warning">${financial.spent.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Amount Spent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-2xl font-bold text-success">${financial.remaining.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financial.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(category.spent / category.budgeted) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Project Documents</CardTitle>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default ProjectDetail