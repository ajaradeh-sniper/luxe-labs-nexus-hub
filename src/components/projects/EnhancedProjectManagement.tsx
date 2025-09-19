import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { VisualProjectApproval } from './VisualProjectApproval'
import { ConvertOpportunityToProjectModal } from '../modals/ConvertOpportunityToProjectModal'
import { 
  Building,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpCircle
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  project_type: string
  status: string
  approval_status: string
  budget: number
  actual_cost: number
  start_date: string
  end_date: string
  roi_percentage: number
  manager_id: string
  property_id: string
  opportunity_id: string
  visual_assets: {
    images: string[]
    sketches: string[]
    upgrades: string[]
  }
  approval_data: any
  created_at: string
}

interface Opportunity {
  id: string
  title: string
  description: string
  location: string
  investment_required: number
  expected_roi: number
  opportunity_type: string
  status: string
  deadline: string
  contact_info: any
  documents: any[]
}

export function EnhancedProjectManagement() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false)

  const canApprove = user?.role === 'administrator' || user?.role === 'real_estate_director'
  const canManageProjects = user?.role === 'administrator' || user?.role === 'project_manager' || user?.role === 'real_estate_director'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (projectsError) throw projectsError

      // Fetch approved opportunities that haven't been converted
      const { data: opportunitiesData, error: opportunitiesError } = await supabase
        .from('opportunities')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (opportunitiesError) throw opportunitiesError

      // Type cast the data properly
      const typedProjects: Project[] = (projectsData || []).map(project => ({
        ...project,
        visual_assets: (project.visual_assets as any) || { images: [], sketches: [], upgrades: [] },
        approval_data: (project.approval_data as any) || {}
      }))

      const typedOpportunities: Opportunity[] = (opportunitiesData || []).map(opp => ({
        ...opp,
        documents: Array.isArray(opp.documents) ? opp.documents as any[] : [],
        contact_info: (opp.contact_info as any) || {}
      }))

      setProjects(typedProjects)
      setOpportunities(typedOpportunities)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to load projects and opportunities",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.approval_status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getApprovalStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
      case 'pending_approval':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Approval</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getProjectStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>
      case 'active':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
      case 'planning':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Planning</Badge>
      case 'on_hold':
        return <Badge className="bg-warning/10 text-warning border-warning/20">On Hold</Badge>
      case 'cancelled':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleProjectUpdate = (updatedProject: any) => {
    const typedProject: Project = {
      ...updatedProject,
      visual_assets: (updatedProject.visual_assets as any) || { images: [], sketches: [], upgrades: [] },
      approval_data: (updatedProject.approval_data as any) || {}
    }
    
    setProjects(prev => prev.map(p => p.id === typedProject.id ? typedProject : p))
    setSelectedProject(typedProject)
  }

  const handleConversionComplete = () => {
    fetchData() // Refresh data after conversion
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">Manage projects from opportunities to completion</p>
        </div>
        
        {opportunities.length > 0 && canManageProjects && (
          <Button onClick={() => setIsConvertModalOpen(true)}>
            <ArrowUpCircle className="h-4 w-4 mr-2" />
            Convert Opportunities ({opportunities.length})
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval ({projects.filter(p => p.approval_status === 'pending_approval').length})</TabsTrigger>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="opportunities">Available Opportunities ({opportunities.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                    <p className="text-2xl font-bold">{projects.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                    <p className="text-2xl font-bold">
                      {projects.filter(p => p.approval_status === 'pending_approval').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold">
                      {projects.filter(p => p.status === 'active').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Opportunities</p>
                    <p className="text-2xl font-bold">{opportunities.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending_approval">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Projects List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="space-y-1">
                      {getApprovalStatusBadge(project.approval_status)}
                      {getProjectStatusBadge(project.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Budget</span>
                      <span className="font-medium">${project.budget?.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium capitalize">{project.project_type}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Assets</span>
                      <span className="font-medium">
                        {(project.visual_assets?.images?.length || 0) + 
                         (project.visual_assets?.sketches?.length || 0) + 
                         (project.visual_assets?.upgrades?.length || 0)} files
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {projects.filter(p => p.approval_status === 'pending_approval').map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                    <Button onClick={() => setSelectedProject(project)}>
                      Review Project
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.filter(p => p.status === 'active').map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setSelectedProject(project)}>
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <CardDescription>{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Investment</span>
                      <span className="font-medium">${opportunity.investment_required?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Expected ROI</span>
                      <span className="font-medium">{opportunity.expected_roi}%</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSelectedOpportunity(opportunity)
                      setIsConvertModalOpen(true)
                    }}
                  >
                    <ArrowUpCircle className="h-4 w-4 mr-2" />
                    Convert to Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProject.name}</DialogTitle>
              <DialogDescription>Project approval and management</DialogDescription>
            </DialogHeader>
            <VisualProjectApproval 
              project={selectedProject}
              onProjectUpdate={handleProjectUpdate}
              canApprove={canApprove}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Convert Opportunity Modal */}
      <ConvertOpportunityToProjectModal
        isOpen={isConvertModalOpen}
        onClose={() => {
          setIsConvertModalOpen(false)
          setSelectedOpportunity(null)
        }}
        opportunity={selectedOpportunity}
        onConversionComplete={handleConversionComplete}
      />
    </div>
  )
}