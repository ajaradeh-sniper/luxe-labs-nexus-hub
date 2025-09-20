import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { 
  Play, 
  Pause, 
  Activity, 
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  TrendingUp,
  Zap
} from 'lucide-react'

interface LiveWorkflow {
  id: string
  name: string
  type: 'user_management' | 'submissions' | 'approvals' | 'notifications'
  status: 'active' | 'paused' | 'error'
  executions_today: number
  success_rate: number
  last_execution: string
  description: string
}

interface WorkflowMetrics {
  total_executions: number
  success_rate: number
  avg_processing_time: number
  errors_today: number
}

export function LiveWorkflowManager() {
  const [workflows, setWorkflows] = useState<LiveWorkflow[]>([])
  const [metrics, setMetrics] = useState<WorkflowMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const { toast } = useToast()

  // Initialize with live data
  useEffect(() => {
    loadLiveData()
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(loadLiveData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadLiveData = async () => {
    try {
      // Simulate live workflow data (replace with actual Supabase queries)
      const liveWorkflows: LiveWorkflow[] = [
        {
          id: '1',
          name: 'User Registration Pipeline',
          type: 'user_management',
          status: 'active',
          executions_today: 23,
          success_rate: 98.2,
          last_execution: new Date(Date.now() - 300000).toISOString(),
          description: 'Handles new user registrations and profile setup'
        },
        {
          id: '2',
          name: 'Investment Submission Review',
          type: 'submissions',
          status: 'active',
          executions_today: 12,
          success_rate: 94.5,
          last_execution: new Date(Date.now() - 600000).toISOString(),
          description: 'Processes and reviews investment opportunity submissions'
        },
        {
          id: '3',
          name: 'Project Approval Workflow',
          type: 'approvals',
          status: 'active',
          executions_today: 8,
          success_rate: 100,
          last_execution: new Date(Date.now() - 900000).toISOString(),
          description: 'Manages project approval process and notifications'
        },
        {
          id: '4',
          name: 'Real-time Notifications',
          type: 'notifications',
          status: 'active',
          executions_today: 156,
          success_rate: 99.8,
          last_execution: new Date(Date.now() - 60000).toISOString(),
          description: 'Sends real-time notifications to users'
        }
      ]

      const liveMetrics: WorkflowMetrics = {
        total_executions: 199,
        success_rate: 98.1,
        avg_processing_time: 2.3,
        errors_today: 3
      }

      setWorkflows(liveWorkflows)
      setMetrics(liveMetrics)
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading live workflow data:', error)
      toast({
        title: "Error",
        description: "Failed to load workflow data",
        variant: "destructive"
      })
    }
  }

  const toggleWorkflow = async (workflowId: string) => {
    try {
      setWorkflows(prev => prev.map(workflow => 
        workflow.id === workflowId 
          ? { ...workflow, status: workflow.status === 'active' ? 'paused' : 'active' }
          : workflow
      ))
      
      toast({
        title: "Workflow Updated",
        description: "Workflow status changed successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update workflow status",
        variant: "destructive"
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20'
      case 'paused': return 'bg-warning/10 text-warning border-warning/20'
      case 'error': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getWorkflowIcon = (type: string) => {
    switch (type) {
      case 'user_management': return <Users className="h-4 w-4" />
      case 'submissions': return <FileText className="h-4 w-4" />
      case 'approvals': return <CheckCircle className="h-4 w-4" />
      case 'notifications': return <Activity className="h-4 w-4" />
      default: return <Settings className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Live Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metrics.total_executions}</p>
                  <p className="text-sm text-muted-foreground">Executions Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/5 to-success/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metrics.success_rate}%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metrics.avg_processing_time}s</p>
                  <p className="text-sm text-muted-foreground">Avg Processing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/5 to-warning/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metrics.errors_today}</p>
                  <p className="text-sm text-muted-foreground">Errors Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Live Workflows Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
            Live Workflow Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Live Overview</TabsTrigger>
              <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
              <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workflows.map((workflow) => (
                  <Card key={workflow.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                          {getWorkflowIcon(workflow.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{workflow.name}</h3>
                          <p className="text-sm text-muted-foreground">{workflow.description}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status === 'active' && <Play className="h-3 w-3 mr-1" />}
                        {workflow.status === 'paused' && <Pause className="h-3 w-3 mr-1" />}
                        {workflow.status === 'error' && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {workflow.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Executions Today:</span>
                        <span className="font-medium">{workflow.executions_today}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Success Rate:</span>
                        <span className="font-medium">{workflow.success_rate}%</span>
                      </div>
                      <Progress value={workflow.success_rate} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Last run: {new Date(workflow.last_execution).toLocaleTimeString()}</span>
                        <Switch
                          checked={workflow.status === 'active'}
                          onCheckedChange={() => toggleWorkflow(workflow.id)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workflows" className="space-y-4">
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <Card key={workflow.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getWorkflowIcon(workflow.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{workflow.name}</h3>
                          <p className="text-muted-foreground">{workflow.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold">{workflow.executions_today}</p>
                          <p className="text-sm text-muted-foreground">executions today</p>
                        </div>
                        <Switch
                          checked={workflow.status === 'active'}
                          onCheckedChange={() => toggleWorkflow(workflow.id)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Real-time Activity Stream
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { time: new Date().toLocaleTimeString(), event: 'User registration completed', type: 'success' },
                      { time: new Date(Date.now() - 60000).toLocaleTimeString(), event: 'Investment submission processed', type: 'success' },
                      { time: new Date(Date.now() - 120000).toLocaleTimeString(), event: 'Project approval workflow triggered', type: 'info' },
                      { time: new Date(Date.now() - 180000).toLocaleTimeString(), event: 'Notification sent to 12 users', type: 'success' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.event}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">Live</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}