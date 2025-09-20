import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Image,
  Video,
  File,
  Calendar,
  Check,
  Clock,
  AlertTriangle,
  Upload,
  Share,
  Archive
} from "lucide-react"

interface Document {
  id: number
  name: string
  type: 'contract' | 'design' | 'approval' | 'invoice' | 'photo' | 'video' | 'report'
  category: string
  project: string
  size: string
  uploadDate: string
  status: 'approved' | 'pending' | 'revision_needed' | 'archived'
  url?: string
  thumbnailUrl?: string
  description?: string
  version?: number
  approvedBy?: string
  comments?: Array<{
    author: string
    date: string
    message: string
  }>
}

export function ClientDocumentCenter() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  
  const documents: Document[] = [
    {
      id: 1,
      name: "Downtown Apartment - Final Design Plans",
      type: "design",
      category: "Architectural Plans",
      project: "Downtown Apartment Renovation",
      size: "12.5 MB",
      uploadDate: "2024-01-18",
      status: "approved",
      version: 3,
      approvedBy: "Sarah Johnson",
      description: "Final architectural plans including all revisions and client feedback"
    },
    {
      id: 2,
      name: "Kitchen Installation Progress Photos",
      type: "photo",
      category: "Progress Documentation",
      project: "Downtown Apartment Renovation",
      size: "45.2 MB",
      uploadDate: "2024-01-18",
      status: "approved",
      description: "Complete photo documentation of kitchen installation phase"
    },
    {
      id: 3,
      name: "Service Contract Agreement",
      type: "contract",
      category: "Legal Documents",
      project: "Downtown Apartment Renovation",
      size: "2.1 MB",
      uploadDate: "2024-01-15",
      status: "approved",
      approvedBy: "Legal Team",
      description: "Signed service agreement with terms and conditions"
    },
    {
      id: 4,
      name: "Business Bay Office - Design Concept V2",
      type: "design",
      category: "Design Concepts",
      project: "Business Bay Office Design",
      size: "8.7 MB",
      uploadDate: "2024-01-16",
      status: "pending",
      version: 2,
      description: "Updated design concept incorporating client feedback",
      comments: [
        {
          author: "Ahmed Al-Rashid",
          date: "2024-01-16",
          message: "Please review the updated color scheme and lighting proposals"
        }
      ]
    },
    {
      id: 5,
      name: "January Progress Report",
      type: "report",
      category: "Progress Reports",
      project: "Downtown Apartment Renovation",
      size: "3.4 MB",
      uploadDate: "2024-01-17",
      status: "approved",
      description: "Monthly progress report with milestone achievements and budget status"
    },
    {
      id: 6,
      name: "Material Selection Approval",
      type: "approval",
      category: "Approvals",
      project: "Business Bay Office Design",
      size: "5.8 MB",
      uploadDate: "2024-01-14",
      status: "revision_needed",
      comments: [
        {
          author: "Client",
          date: "2024-01-15",
          message: "Please provide alternatives for the flooring material"
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-800'
      case 'pending': return 'bg-amber-100 text-amber-800'
      case 'revision_needed': return 'bg-red-100 text-red-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <Check className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'revision_needed': return <AlertTriangle className="h-4 w-4" />
      case 'archived': return <Archive className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contract': return <FileText className="h-5 w-5 text-blue-600" />
      case 'design': return <Image className="h-5 w-5 text-purple-600" />
      case 'approval': return <Check className="h-5 w-5 text-emerald-600" />
      case 'invoice': return <FileText className="h-5 w-5 text-amber-600" />
      case 'photo': return <Image className="h-5 w-5 text-pink-600" />
      case 'video': return <Video className="h-5 w-5 text-red-600" />
      case 'report': return <File className="h-5 w-5 text-indigo-600" />
      default: return <File className="h-5 w-5 text-gray-600" />
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const documentStats = {
    total: documents.length,
    approved: documents.filter(d => d.status === 'approved').length,
    pending: documents.filter(d => d.status === 'pending').length,
    revisionNeeded: documents.filter(d => d.status === 'revision_needed').length
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold">{documentStats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-emerald-600">{documentStats.approved}</p>
              </div>
              <Check className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-amber-600">{documentStats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Need Revision</p>
                <p className="text-2xl font-bold text-red-600">{documentStats.revisionNeeded}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                className="px-3 py-2 border border-input rounded-md bg-background"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="revision_needed">Revision Needed</option>
                <option value="archived">Archived</option>
              </select>
              
              <select 
                className="px-3 py-2 border border-input rounded-md bg-background"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="contract">Contracts</option>
                <option value="design">Designs</option>
                <option value="approval">Approvals</option>
                <option value="photo">Photos</option>
                <option value="report">Reports</option>
              </select>
              
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getTypeIcon(document.type)}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{document.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{document.category}</span>
                        <span>•</span>
                        <span>{document.project}</span>
                        {document.version && (
                          <>
                            <span>•</span>
                            <span>v{document.version}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(document.status)}>
                        {getStatusIcon(document.status)}
                        <span className="ml-1 capitalize">{document.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  {document.description && (
                    <p className="text-sm text-muted-foreground">{document.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </span>
                      <span>{document.size}</span>
                      {document.approvedBy && (
                        <span>Approved by {document.approvedBy}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      {document.status === 'pending' && (
                        <Button size="sm" className="bg-blue-600 text-white">
                          Review
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {document.comments && document.comments.length > 0 && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium mb-2">Recent Comments:</p>
                      {document.comments.map((comment, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          <span className="font-medium">{comment.author}</span> - {comment.date}: {comment.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">No documents found</p>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}