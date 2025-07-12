import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  CheckSquare, 
  Plus, 
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Flag,
  MoreHorizontal,
  Eye,
  Edit,
  Star,
  Calendar,
  User
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface QAItem {
  id: string
  title: string
  description: string
  property: string
  category: 'safety' | 'quality' | 'compliance' | 'documentation' | 'design'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'on-hold'
  assignee: string
  createdDate: string
  dueDate: string
  completionRate: number
}

const QualityAssurance = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const qaItems: QAItem[] = [
    {
      id: '1',
      title: 'Fire Safety Inspection',
      description: 'Complete fire safety system inspection and certification',
      property: 'Marina Bay Tower',
      category: 'safety',
      priority: 'critical',
      status: 'pending',
      assignee: 'Ahmed Al-Mansouri',
      createdDate: '2024-12-01',
      dueDate: '2024-12-15',
      completionRate: 0
    },
    {
      id: '2',
      title: 'Material Quality Check',
      description: 'Verify quality of imported marble and fixtures',
      property: 'Downtown Luxury Apartments',
      category: 'quality',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Sarah Johnson',
      createdDate: '2024-11-28',
      dueDate: '2024-12-10',
      completionRate: 65
    },
    {
      id: '3',
      title: 'Building Code Compliance',
      description: 'Ensure all renovations meet Dubai building codes',
      property: 'Business Bay Complex',
      category: 'compliance',
      priority: 'high',
      status: 'completed',
      assignee: 'Michael Chen',
      createdDate: '2024-11-20',
      dueDate: '2024-12-05',
      completionRate: 100
    },
    {
      id: '4',
      title: 'Design Specification Review',
      description: 'Review and approve final design specifications',
      property: 'Palm Residence Villa',
      category: 'design',
      priority: 'medium',
      status: 'completed',
      assignee: 'Elena Rodriguez',
      createdDate: '2024-11-15',
      dueDate: '2024-11-30',
      completionRate: 100
    },
    {
      id: '5',
      title: 'Documentation Audit',
      description: 'Complete audit of all project documentation',
      property: 'Marina Bay Tower',
      category: 'documentation',
      priority: 'medium',
      status: 'in-progress',
      assignee: 'David Kim',
      createdDate: '2024-11-25',
      dueDate: '2024-12-20',
      completionRate: 40
    }
  ]

  const categories = [
    'All Categories',
    'Safety',
    'Quality',
    'Compliance',
    'Documentation',
    'Design'
  ]

  const statuses = [
    'All Statuses',
    'Pending',
    'In Progress',
    'Completed',
    'Failed',
    'On Hold'
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-destructive text-destructive-foreground'
      case 'high': return 'bg-warning text-warning-foreground'
      case 'medium': return 'bg-blue-500 text-white'
      case 'low': return 'bg-success text-success-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20'
      case 'in-progress': return 'bg-primary/10 text-primary border-primary/20'
      case 'pending': return 'bg-warning/10 text-warning border-warning/20'
      case 'failed': return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'on-hold': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'in-progress': return <Clock className="h-4 w-4" />
      case 'pending': return <AlertTriangle className="h-4 w-4" />
      case 'failed': return <Flag className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety': return '🛡️'
      case 'quality': return '⭐'
      case 'compliance': return '📋'
      case 'documentation': return '📄'
      case 'design': return '🎨'
      default: return '✅'
    }
  }

  const filteredItems = qaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
                           item.category === selectedCategory.toLowerCase()
    const matchesStatus = selectedStatus === "all" || 
                         item.status === selectedStatus.toLowerCase().replace(' ', '-')
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quality Assurance</h1>
            <p className="text-muted-foreground">Monitor and manage quality control processes</p>
          </div>
          <Button variant="luxury" size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            New QA Item
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">24</p>
                  <p className="text-sm text-muted-foreground">Total QA Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
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
                  <p className="text-2xl font-bold text-foreground">15</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Critical Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search QA items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category.toLowerCase().replace('all categories', 'all') ? "luxury" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.toLowerCase().replace('all categories', 'all'))}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          {statuses.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status.toLowerCase().replace('all statuses', 'all') ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status.toLowerCase().replace('all statuses', 'all'))}
            >
              {status}
            </Button>
          ))}
        </div>

        {/* QA Items List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center text-xl">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground mb-2">{item.description}</p>
                      <p className="text-sm text-muted-foreground">Property: {item.property}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status.replace('-', ' ')}</span>
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
                          Edit Item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Assignee</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.assignee}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Created</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {new Date(item.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Completion</p>
                    <div className="flex items-center gap-2">
                      <Progress value={item.completionRate} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{item.completionRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-1 h-3 w-3" />
                    View Details
                  </Button>
                  {item.status === 'pending' && (
                    <Button variant="luxury" size="sm">
                      Start Review
                    </Button>
                  )}
                  {item.status === 'in-progress' && (
                    <Button variant="default" size="sm">
                      Update Progress
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No QA items found</h3>
              <p className="text-muted-foreground mb-4">
                No quality assurance items match your current search criteria.
              </p>
              <Button variant="luxury" onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedStatus("all")
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default QualityAssurance