import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Eye,
  Edit,
  Play,
  Pause
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Project {
  id: string
  name: string
  property: string
  status: 'planning' | 'active' | 'renovation' | 'marketing' | 'completed' | 'on-hold'
  progress: number
  budget: string
  spent: string
  startDate: string
  expectedCompletion: string
  teamMembers: number
  roi: number
}

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const projects: Project[] = [
    {
      id: '1',
      name: 'Marina Bay Luxury Renovation',
      property: 'Marina Bay Tower',
      status: 'active',
      progress: 65,
      budget: '$800K',
      spent: '$520K',
      startDate: '2024-10-01',
      expectedCompletion: '2025-02-15',
      teamMembers: 12,
      roi: 18.5
    },
    {
      id: '2',
      name: 'Downtown Penthouse Transformation',
      property: 'Downtown Luxury Apartments',
      status: 'renovation',
      progress: 45,
      budget: '$1.2M',
      spent: '$540K',
      startDate: '2024-11-15',
      expectedCompletion: '2025-04-30',
      teamMembers: 15,
      roi: 22.3
    },
    {
      id: '3',
      name: 'Business Bay Commercial Upgrade',
      property: 'Business Bay Complex',
      status: 'planning',
      progress: 15,
      budget: '$2.1M',
      spent: '$315K',
      startDate: '2024-12-01',
      expectedCompletion: '2025-07-15',
      teamMembers: 8,
      roi: 16.8
    },
    {
      id: '4',
      name: 'Palm Villa Premium Finishing',
      property: 'Palm Residence Villa',
      status: 'completed',
      progress: 100,
      budget: '$1.5M',
      spent: '$1.4M',
      startDate: '2024-06-01',
      expectedCompletion: '2024-11-30',
      teamMembers: 18,
      roi: 25.2
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20'
      case 'active': return 'bg-primary/10 text-primary border-primary/20'
      case 'renovation': return 'bg-warning/10 text-warning border-warning/20'
      case 'planning': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'marketing': return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      case 'on-hold': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'active': return <Play className="h-4 w-4" />
      case 'on-hold': return <Pause className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.property.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Manage your property transformation projects</p>
          </div>
          <Button variant="luxury" size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
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
                  <p className="text-2xl font-bold text-foreground">$5.6M</p>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{project.name}</h3>
                    <p className="text-muted-foreground">{project.property}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Progress</p>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Budget</p>
                    <p className="font-semibold">{project.budget}</p>
                    <p className="text-xs text-muted-foreground">Spent: {project.spent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Team</p>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{project.teamMembers}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Expected ROI</p>
                    <p className="font-semibold text-success">+{project.roi}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Completion</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {new Date(project.expectedCompletion).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-1 h-3 w-3" />
                    View Details
                  </Button>
                  {project.status === 'active' && (
                    <Button variant="luxury" size="sm">
                      <Edit className="mr-1 h-3 w-3" />
                      Manage
                    </Button>
                  )}
                  {project.status === 'planning' && (
                    <Button variant="outline" size="sm">
                      <Play className="mr-1 h-3 w-3" />
                      Start Project
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Projects