import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { usePermissions } from '@/hooks/usePermissions'
import { SupabaseService } from '@/lib/supabase-service'
import { useAsyncOperation } from '@/hooks/useAsyncOperation'
import { toast } from '@/hooks/use-toast'
import { 
  FileText, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface ProjectFormData {
  name: string
  project_type: string
  description: string
  status: string
  budget: number | null
  start_date: string
  end_date: string
  property_id: string
}

export function ProjectManagement() {
  const { user } = useAuth()
  const { canView, canEdit, canDelete } = usePermissions('projects')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    project_type: 'development',
    description: '',
    status: 'planning',
    budget: null,
    start_date: '',
    end_date: '',
    property_id: ''
  })

  const { data: projects, loading: projectsLoading, execute: fetchProjects } = useAsyncOperation(
    SupabaseService.getProjects,
    { showErrorToast: true, errorMessage: "Failed to load projects" }
  )

  const { data: properties, execute: fetchProperties } = useAsyncOperation(
    SupabaseService.getProperties,
    { showErrorToast: false }
  )

  const { execute: createProject, loading: creating } = useAsyncOperation(
    (projectData: any) => SupabaseService.createProject(projectData),
    { 
      showErrorToast: true, 
      errorMessage: "Failed to create project",
      onSuccess: () => {
        toast({ title: "Success", description: "Project created successfully" })
        setIsDialogOpen(false)
        resetForm()
        fetchProjects()
      }
    }
  )

  useEffect(() => {
    if (user && canView) {
      fetchProjects()
      fetchProperties()
    }
  }, [user, canView, fetchProjects, fetchProperties])

  const resetForm = () => {
    setFormData({
      name: '',
      project_type: 'development',
      description: '',
      status: 'planning',
      budget: null,
      start_date: '',
      end_date: '',
      property_id: ''
    })
    setEditingProject(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const projectData = {
      ...formData,
      created_by: user?.id,
      manager_id: user?.id,
      property_id: formData.property_id || null
    }

    if (editingProject) {
      toast({ title: "Info", description: "Update functionality coming soon" })
    } else {
      await createProject(projectData)
    }
  }

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'in_progress': return 'bg-warning/10 text-warning border-warning/20'
      case 'completed': return 'bg-success/10 text-success border-success/20'
      case 'on_hold': return 'bg-muted text-muted-foreground border-muted/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <FileText className="h-4 w-4" />
      case 'in_progress': return <TrendingUp className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'on_hold': return <AlertTriangle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const calculateProgress = (project: any) => {
    const today = new Date()
    const start = new Date(project.start_date)
    const end = new Date(project.end_date)
    
    if (project.status === 'completed') return 100
    if (project.status === 'planning' || today < start) return 0
    
    const totalDuration = end.getTime() - start.getTime()
    const elapsed = today.getTime() - start.getTime()
    
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100)
  }

  const getPropertyName = (propertyId: string) => {
    return properties?.data?.find((p: any) => p.id === propertyId)?.title || 'No property linked'
  }

  if (!canView) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>You don't have permission to view projects</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
            Project Management
          </h2>
          <p className="text-muted-foreground">Track and manage your development projects</p>
        </div>
        
        {canEdit && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="luxury" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g., Marina Tower Renovation"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="project_type">Project Type *</Label>
                    <Select
                      value={formData.project_type}
                      onValueChange={(value) => handleInputChange('project_type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleInputChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on_hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (AED)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget || ''}
                      onChange={(e) => handleInputChange('budget', e.target.value ? Number(e.target.value) : null)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => handleInputChange('start_date', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => handleInputChange('end_date', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property_id">Linked Property (Optional)</Label>
                  <Select
                    value={formData.property_id}
                    onValueChange={(value) => handleInputChange('property_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No property</SelectItem>
                      {properties?.data?.map((property: any) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Project description and objectives..."
                    rows={3}
                  />
                </div>

                <Separator />

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="luxury" disabled={creating}>
                    {creating ? 'Creating...' : editingProject ? 'Update Project' : 'Create Project'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6">
        {projectsLoading ? (
          <div className="text-center py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        ) : projects?.data?.length > 0 ? (
          projects.data.map((project: any) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-luxury transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{getPropertyName(project.property_id)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1">{project.status.replace('_', ' ').charAt(0).toUpperCase() + project.status.replace('_', ' ').slice(1)}</span>
                    </Badge>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {canEdit && (
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-accent/30 rounded-lg">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-success" />
                    <p className="font-bold text-lg">
                      {project.budget ? formatCurrency(project.budget) : 'Not set'}
                    </p>
                    <p className="text-xs text-muted-foreground">Budget</p>
                  </div>
                  
                  <div className="text-center p-4 bg-accent/30 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2" />
                    <p className="font-bold text-lg">
                      {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'Not set'}
                    </p>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                  </div>
                  
                  <div className="text-center p-4 bg-accent/30 rounded-lg">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="font-bold text-lg">{calculateProgress(project).toFixed(0)}%</p>
                    <p className="text-xs text-muted-foreground">Progress</p>
                  </div>
                </div>

                {project.description && (
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Project Progress</span>
                    <span className="text-sm font-bold text-primary">{calculateProgress(project).toFixed(0)}%</span>
                  </div>
                  <Progress value={calculateProgress(project)} className="h-3" />
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-muted-foreground">
                  <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
                  <span className="capitalize">{project.project_type}</span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No projects found</p>
                {canEdit && (
                  <p className="text-sm">Add your first project to get started</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}