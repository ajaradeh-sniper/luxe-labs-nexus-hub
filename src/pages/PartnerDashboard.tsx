import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { useActionRouter } from "@/components/ActionRouter"
import { 
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  MessageCircle,
  Building2,
  Calendar,
  Star,
  Upload,
  Download,
  Eye,
  AlertCircle,
  TrendingUp
} from "lucide-react"

const PartnerDashboard = () => {
  const { user } = useAuth()
  const { open, portal } = useActionRouter()
  const [activeTab, setActiveTab] = useState("projects")

  const partnerStats = {
    activeProjects: 3,
    completedProjects: 12,
    totalEarnings: "$485K",
    avgRating: 4.8,
    onTimeDelivery: 94,
    pendingPayments: "$45K"
  }

  const assignedProjects = [
    {
      id: "1",
      name: "Marina Bay Luxury Renovation",
      client: "Luxury Labs",
      projectManager: "Elena Rodriguez",
      status: "active",
      role: "Premium Interior Design",
      deadline: "2025-02-15",
      progress: 65,
      contract: "$85K",
      nextDeliverable: "Kitchen Installation Plans",
      deliverableDate: "2025-01-28"
    },
    {
      id: "2", 
      name: "Downtown Penthouse Transformation",
      client: "Luxury Labs",
      projectManager: "Michael Chen",
      status: "pending_approval",
      role: "Structural Engineering",
      deadline: "2025-04-30",
      progress: 25,
      contract: "$125K",
      nextDeliverable: "Structural Assessment Report",
      deliverableDate: "2025-02-05"
    },
    {
      id: "3",
      name: "Business Bay Commercial Upgrade", 
      client: "Dubai Holdings",
      projectManager: "Sarah Johnson",
      status: "proposal_stage",
      role: "MEP Contractor",
      deadline: "2025-07-15",
      progress: 0,
      contract: "$180K",
      nextDeliverable: "Detailed Proposal",
      deliverableDate: "2025-01-30"
    }
  ]

  const tenderOpportunities = [
    {
      id: "T001",
      project: "Jumeirah Beach Penthouse",
      scope: "Luxury Bathroom Fittings",
      budget: "$45K - $65K",
      submissionDeadline: "2025-02-10",
      daysLeft: 15,
      requirements: ["Premium Materials", "3D Visualizations", "2 Year Warranty"]
    },
    {
      id: "T002",
      project: "Dubai Hills Premium Villa",
      scope: "Smart Home Integration",
      budget: "$35K - $50K",
      submissionDeadline: "2025-02-05",
      daysLeft: 10,
      requirements: ["IoT Expertise", "Mobile App", "24/7 Support"]
    }
  ]

  const deliverables = [
    {
      project: "Marina Bay Renovation",
      item: "Kitchen Cabinet Installation",
      dueDate: "2025-01-28",
      status: "in_progress",
      completion: 80
    },
    {
      project: "Downtown Penthouse",
      item: "Structural Assessment Report",
      dueDate: "2025-02-05", 
      status: "ready",
      completion: 100
    },
    {
      project: "Business Bay Commercial",
      item: "MEP System Proposal",
      dueDate: "2025-01-30",
      status: "pending",
      completion: 45
    }
  ]

  const payments = [
    {
      project: "Palm Residence Villa",
      amount: "$25K",
      invoiceDate: "2024-12-15",
      dueDate: "2025-01-15",
      status: "overdue"
    },
    {
      project: "Marina Bay Renovation", 
      amount: "$15K",
      invoiceDate: "2025-01-10",
      dueDate: "2025-02-10",
      status: "pending"
    },
    {
      project: "Downtown Penthouse",
      amount: "$5K",
      invoiceDate: "2025-01-05",
      dueDate: "2025-02-05",
      status: "approved"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20'
      case 'pending_approval': return 'bg-warning/10 text-warning border-warning/20'
      case 'proposal_stage': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'completed': return 'bg-primary/10 text-primary border-primary/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success'
      case 'pending': return 'bg-warning/10 text-warning'
      case 'overdue': return 'bg-destructive/10 text-destructive'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getDeliverableIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="h-4 w-4 text-success" />
      case 'in_progress': return <Clock className="h-4 w-4 text-warning" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-muted-foreground" />
      default: return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Partner Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact PM
            </Button>
            <Button onClick={() => open('upload-doc')} className="luxury-gradient text-primary-foreground">
              <Upload className="mr-2 h-4 w-4" />
              Upload Deliverable
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{partnerStats.activeProjects}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{partnerStats.completedProjects}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{partnerStats.totalEarnings}</p>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{partnerStats.avgRating}</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{partnerStats.onTimeDelivery}%</p>
                <p className="text-sm text-muted-foreground">On-Time</p>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{partnerStats.pendingPayments}</p>
                <p className="text-sm text-muted-foreground">Pending Pay</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tenders">Tenders</TabsTrigger>
            <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            {/* Projects Assigned */}
            <Card>
              <CardHeader>
                <CardTitle>Projects Assigned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedProjects.map((project) => (
                    <div key={project.id} className="p-4 border border-border rounded-lg luxury-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Role: {project.role} • PM: {project.projectManager}
                          </p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Contract Value</p>
                          <p className="font-bold text-lg">{project.contract}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Progress</p>
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{project.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className="font-medium">{new Date(project.deadline).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Next Deliverable</p>
                          <p className="font-medium text-sm">{project.nextDeliverable}</p>
                          <p className="text-xs text-muted-foreground">Due: {new Date(project.deliverableDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact PM
                        </Button>
                        {project.status === 'active' && (
                          <Button onClick={() => open('upload-doc')} size="sm" className="luxury-gradient text-primary-foreground">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Progress
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tenders" className="space-y-6">
            {/* Tender Center */}
            <Card>
              <CardHeader>
                <CardTitle>Tender Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tenderOpportunities.map((tender) => (
                    <div key={tender.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{tender.project}</h3>
                          <p className="text-sm text-muted-foreground">{tender.scope}</p>
                        </div>
                        <Badge variant={tender.daysLeft <= 7 ? "destructive" : "outline"}>
                          {tender.daysLeft} days left
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Budget Range</p>
                          <p className="font-bold text-lg text-success">{tender.budget}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Submission Deadline</p>
                          <p className="font-medium">{new Date(tender.submissionDeadline).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Requirements:</p>
                        <div className="flex flex-wrap gap-2">
                          {tender.requirements.map((req, index) => (
                            <Badge key={index} variant="secondary">{req}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="luxury-gradient text-primary-foreground">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Submit Proposal
                        </Button>
                        <Button variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Brief
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deliverables" className="space-y-6">
            {/* Deliverables Tracker */}
            <Card>
              <CardHeader>
                <CardTitle>Deliverables Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getDeliverableIcon(deliverable.status)}
                        <div>
                          <h3 className="font-semibold">{deliverable.item}</h3>
                          <p className="text-sm text-muted-foreground">
                            {deliverable.project} • Due: {new Date(deliverable.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Progress</p>
                          <div className="flex items-center gap-2">
                            <Progress value={deliverable.completion} className="w-20 h-2" />
                            <span className="text-sm font-medium">{deliverable.completion}%</span>
                          </div>
                        </div>
                        {deliverable.status === 'ready' && (
                          <Button onClick={() => open('upload-doc')} size="sm" className="luxury-gradient text-primary-foreground">
                            <Upload className="h-4 w-4 mr-2" />
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            {/* Payments & Contracts */}
            <Card>
              <CardHeader>
                <CardTitle>Payments & Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-8 w-8 text-success" />
                        <div>
                          <h3 className="font-semibold">{payment.project}</h3>
                          <p className="text-sm text-muted-foreground">
                            Invoice: {new Date(payment.invoiceDate).toLocaleDateString()} • 
                            Due: {new Date(payment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-lg font-bold">{payment.amount}</p>
                          <Badge className={getPaymentStatusColor(payment.status)}>
                            {payment.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default PartnerDashboard