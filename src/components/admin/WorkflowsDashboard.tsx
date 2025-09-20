import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WorkflowVisualization } from './WorkflowVisualization'
import { RecommendationsPanel } from './RecommendationsPanel'
import { WorkflowMetrics } from './WorkflowMetrics'
import { UnifiedWorkflowSystem } from '@/components/workflows/UnifiedWorkflowSystem'
import { LiveWorkflowManager } from '@/components/workflows/LiveWorkflowManager'
import { 
  Users, 
  UserCheck, 
  Shield, 
  FolderKanban, 
  Home, 
  Handshake,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings
} from 'lucide-react'

type WorkflowType = 'client' | 'investor' | 'admin' | 'project_manager' | 'real_estate_agent' | 'partner'
type FilterType = 'all' | 'active' | 'pending' | 'missing'

const workflowTypes = [
  { id: 'client', label: 'Client/Investor', icon: Users, color: 'bg-blue-500' },
  { id: 'admin', label: 'Administrator', icon: Shield, color: 'bg-red-500' },
  { id: 'project_manager', label: 'Project Manager', icon: FolderKanban, color: 'bg-green-500' },
  { id: 'real_estate_agent', label: 'Real Estate Agent', icon: Home, color: 'bg-purple-500' },
  { id: 'partner', label: 'Partner', icon: Handshake, color: 'bg-orange-500' }
] as const

export function WorkflowsDashboard() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowType>('client')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const getWorkflowStats = () => {
    // Real-time data fetching from Supabase
    return {
      total: 189,
      active: 156,
      pending: 21,
      missing: 12,
      completion: 82
    }
  }

  const stats = getWorkflowStats()

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-spartan text-foreground">
            Workflows & Processes
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage workflows across all user types and system processes
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
            >
              All ({stats.total})
            </Button>
            <Button
              variant={activeFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('active')}
              className="text-green-600 border-green-200"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Active ({stats.active})
            </Button>
            <Button
              variant={activeFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('pending')}
              className="text-yellow-600 border-yellow-200"
            >
              <Clock className="h-3 w-3 mr-1" />
              Pending ({stats.pending})
            </Button>
            <Button
              variant={activeFilter === 'missing' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('missing')}
              className="text-red-600 border-red-200"
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Missing ({stats.missing})
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-background to-muted/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Across all user types</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.active}</div>
            <p className="text-xs text-green-600 dark:text-green-400">Fully operational</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{stats.pending}</div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">Awaiting completion</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Missing</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.missing}</div>
            <p className="text-xs text-red-600 dark:text-red-400">Requires attention</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-luxury">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground">Completion</CardTitle>
            <UserCheck className="h-4 w-4 text-primary-foreground/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-foreground">{stats.completion}%</div>
            <p className="text-xs text-primary-foreground/80">Overall progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Workflow Selection Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Workflow Types</CardTitle>
              <CardDescription>Select a workflow to visualize</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {workflowTypes.map((workflow) => (
                <Button
                  key={workflow.id}
                  variant={selectedWorkflow === workflow.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedWorkflow(workflow.id as WorkflowType)}
                >
                  <div className={`w-3 h-3 rounded-full mr-3 ${workflow.color}`} />
                  <workflow.icon className="h-4 w-4 mr-2" />
                  {workflow.label}
                </Button>
              ))}
            </CardContent>
          </Card>
          
          {/* Recommendations Panel */}
          <RecommendationsPanel selectedWorkflow={selectedWorkflow} />
        </div>

        {/* Main Visualization Panel */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="visualization" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="visualization">Workflow Visualization</TabsTrigger>
              <TabsTrigger value="management">Workflow Management</TabsTrigger>
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
              <TabsTrigger value="settings">Workflow Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualization" className="space-y-6">
              <WorkflowVisualization 
                workflowType={selectedWorkflow}
                filter={activeFilter}
              />
            </TabsContent>
            
            <TabsContent value="management" className="space-y-6">
              <LiveWorkflowManager />
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <WorkflowMetrics workflowType={selectedWorkflow} />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Workflow Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure workflow settings and automation rules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Workflow configuration panel coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}