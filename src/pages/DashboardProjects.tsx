import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useActionRouter } from "@/components/ActionRouter"
import { useToast } from "@/hooks/use-toast"
import { TimelinePlanning } from "@/components/projectManagement/TimelinePlanning"
import { CostManagement } from "@/components/projectManagement/CostManagement"
import { RiskManagement } from "@/components/projectManagement/RiskManagement"
import { TenderManagement } from "@/components/projectManagement/TenderManagement"
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Users,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  AlertTriangle,
  FileText,
  Clock
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DashboardProjects = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null)
  
  const navigate = useNavigate()
  const { toast } = useToast()
  const { open, portal } = useActionRouter()

  const projects = [
    {
      id: '1',
      name: 'Marina Bay Luxury Towers',
      location: 'Dubai Marina',
      type: 'Residential',
      status: 'active',
      progress: 75,
      budget: '$120M',
      spent: '$90M',
      duration: '36 months',
      remaining: '9 months',
      manager: 'Sarah Johnson',
      team: 12,
      startDate: '2023-01-15',
      endDate: '2026-01-15'
    },
    {
      id: '2',
      name: 'Downtown Business Hub',
      location: 'DIFC',
      type: 'Commercial',
      status: 'active',
      progress: 45,
      budget: '$85M',
      spent: '$38M',
      duration: '24 months',
      remaining: '13 months',
      manager: 'Ahmed Al-Rashid',
      team: 8,
      startDate: '2023-06-01',
      endDate: '2025-06-01'
    },
    {
      id: '3',
      name: 'Palm Residence Villas',
      location: 'Palm Jumeirah',
      type: 'Villa',
      status: 'planning',
      progress: 5,
      budget: '$200M',
      spent: '$10M',
      duration: '42 months',
      remaining: '40 months',
      manager: 'Maria Rodriguez',
      team: 4,
      startDate: '2024-03-01',
      endDate: '2027-09-01'
    },
    {
      id: '4',
      name: 'Green Valley Complex',
      location: 'Al Barsha',
      type: 'Residential',
      status: 'completed',
      progress: 100,
      budget: '$65M',
      spent: '$63M',
      duration: '28 months',
      remaining: '0 months',
      manager: 'John Smith',
      team: 15,
      startDate: '2021-04-01',
      endDate: '2023-08-01'
    },
    {
      id: '5',
      name: 'Tech Hub Offices',
      location: 'Business Bay',
      type: 'Commercial',
      status: 'on-hold',
      progress: 25,
      budget: '$95M',
      spent: '$24M',
      duration: '30 months',
      remaining: '23 months',
      manager: 'Lisa Chen',
      team: 6,
      startDate: '2023-09-01',
      endDate: '2026-03-01'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'active': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'planning': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'on-hold': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500'
    if (progress >= 70) return 'bg-blue-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.manager.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    const matchesType = typeFilter === 'all' || project.type.toLowerCase() === typeFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`)
  }

  const handleEditProject = (projectId: string) => {
    toast({
      title: "Edit Project",
      description: `Opening edit dialog for project ${projectId}`,
    })
    // Future: Open edit modal or navigate to edit page
  }

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      toast({
        title: "Project Deleted",
        description: `${project.name} has been successfully deleted.`,
        variant: "destructive",
      })
      // Future: Actually remove from data source
    }
    setDeleteProjectId(null)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">Comprehensive project management and tracking</p>
          </div>
          <Button onClick={() => open('promote-opportunity')}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Costs
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risks
            </TabsTrigger>
            <TabsTrigger value="tenders" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tenders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects, locations, or managers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{project.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border border-border shadow-lg z-50">
                            <DropdownMenuItem onClick={() => handleViewProject(project.id)} className="hover:bg-accent">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditProject(project.id)} className="hover:bg-accent">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => setDeleteProjectId(project.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getProgressColor(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Building className="h-3 w-3" />
                          <span>Type</span>
                        </div>
                        <p className="font-medium">{project.type}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-3 w-3" />
                          <span>Budget</span>
                        </div>
                        <p className="font-medium">{project.budget}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Remaining</span>
                        </div>
                        <p className="font-medium">{project.remaining}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>Team</span>
                        </div>
                        <p className="font-medium">{project.team} members</p>
                      </div>
                    </div>

                    {/* Manager */}
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Project Manager</p>
                          <p className="font-medium">{project.manager}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleViewProject(project.id)}>
                          View Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters to find projects.
                  </p>
                  <Button onClick={() => open('promote-opportunity')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <TimelinePlanning />
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <CostManagement />
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <RiskManagement />
          </TabsContent>

          <TabsContent value="tenders" className="space-y-6">
            <TenderManagement />
          </TabsContent>
        </Tabs>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)}>
          <AlertDialogContent className="bg-card border border-border">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{projects.find(p => p.id === deleteProjectId)?.name}"? 
                This action cannot be undone and will permanently remove all project data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => deleteProjectId && handleDeleteProject(deleteProjectId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Project
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Action Modals */}
        {portal}
      </div>
    </DashboardLayout>
  )
}

export default DashboardProjects