import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Users,
  FileText,
  Bell,
  DollarSign
} from "lucide-react"

interface WorkflowAutomation {
  id: string
  name: string
  description: string
  trigger: string
  actions: string[]
  status: 'active' | 'paused' | 'draft'
  executions: number
  lastRun: string
  successRate: number
}

const WorkflowAutomation = () => {
  const [workflows, setWorkflows] = useState<WorkflowAutomation[]>([
    {
      id: "1",
      name: "New Project Notifications",
      description: "Automatically notify team members when a new project is created",
      trigger: "Project Created",
      actions: ["Send Email", "Create Calendar Event", "Assign Team"],
      status: "active",
      executions: 127,
      lastRun: "2024-12-15T10:30:00Z",
      successRate: 98.4
    },
    {
      id: "2", 
      name: "Invoice Generation",
      description: "Generate and send invoices when project milestones are completed",
      trigger: "Milestone Completed",
      actions: ["Generate Invoice", "Send to Client", "Update Records"],
      status: "active",
      executions: 84,
      lastRun: "2024-12-14T16:45:00Z",
      successRate: 100
    },
    {
      id: "3",
      name: "Quality Assurance Checks",
      description: "Automatically schedule QA reviews based on project progress",
      trigger: "Progress >= 75%",
      actions: ["Schedule QA Review", "Notify QA Team", "Create Checklist"],
      status: "paused",
      executions: 23,
      lastRun: "2024-12-10T09:15:00Z",
      successRate: 95.7
    },
    {
      id: "4",
      name: "Document Backup",
      description: "Automatically backup project documents to cloud storage",
      trigger: "Document Uploaded",
      actions: ["Cloud Backup", "Version Control", "Access Log"],
      status: "active",
      executions: 342,
      lastRun: "2024-12-15T11:20:00Z",
      successRate: 99.1
    }
  ])

  const [liveActivity, setLiveActivity] = useState([
    { time: "11:23", workflow: "New Project Notifications", status: "success", message: "Notified 5 team members" },
    { time: "11:20", workflow: "Document Backup", status: "success", message: "Backed up 3 documents" },
    { time: "11:15", workflow: "Invoice Generation", status: "running", message: "Processing invoice..." },
    { time: "10:45", workflow: "Document Backup", status: "success", message: "Backed up design files" }
  ])

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === id 
        ? { ...workflow, status: workflow.status === 'active' ? 'paused' : 'active' }
        : workflow
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20'
      case 'paused': return 'bg-warning/10 text-warning border-warning/20'
      case 'draft': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />
      case 'paused': return <Pause className="h-4 w-4" />
      case 'draft': return <Settings className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getTriggerIcon = (trigger: string) => {
    if (trigger.includes('Project')) return <FileText className="h-4 w-4" />
    if (trigger.includes('Milestone')) return <CheckCircle className="h-4 w-4" />
    if (trigger.includes('Progress')) return <AlertTriangle className="h-4 w-4" />
    if (trigger.includes('Document')) return <FileText className="h-4 w-4" />
    return <Zap className="h-4 w-4" />
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        workflow: workflows[Math.floor(Math.random() * workflows.length)].name,
        status: Math.random() > 0.1 ? 'success' : 'error',
        message: "Automated execution completed"
      }
      
      setLiveActivity(prev => [newActivity, ...prev.slice(0, 9)]) // Keep last 10 activities
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [workflows])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Workflow Automation</h2>
          <p className="text-muted-foreground">Automate repetitive tasks and improve efficiency</p>
        </div>
        <Button variant="luxury">
          <Zap className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{workflows.length}</p>
                <p className="text-sm text-muted-foreground">Total Workflows</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Play className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {workflows.filter(w => w.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {workflows.reduce((sum, w) => sum + w.executions, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Executions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflows List */}
        <Card>
          <CardHeader>
            <CardTitle>Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                        {getTriggerIcon(workflow.trigger)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{workflow.name}</h3>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(workflow.status)}>
                        {getStatusIcon(workflow.status)}
                        <span className="ml-1">{workflow.status}</span>
                      </Badge>
                      <Switch
                        checked={workflow.status === 'active'}
                        onCheckedChange={() => toggleWorkflow(workflow.id)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Trigger:</span>
                      <span className="font-medium">{workflow.trigger}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Success Rate:</span>
                      <span className="font-medium">{workflow.successRate}%</span>
                    </div>
                    <Progress value={workflow.successRate} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-muted-foreground">
                      {workflow.executions} executions
                    </span>
                    <span className="text-muted-foreground">
                      Last run: {new Date(workflow.lastRun).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Live Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {liveActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-success" />}
                    {activity.status === 'error' && <AlertTriangle className="h-4 w-4 text-destructive" />}
                    {activity.status === 'running' && <Clock className="h-4 w-4 text-warning animate-spin" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.workflow}</p>
                    <p className="text-xs text-muted-foreground">{activity.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WorkflowAutomation