import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  Plus, 
  Search, 
  Upload,
  Download,
  Eye,
  MoreHorizontal,
  Folder,
  File,
  Image,
  FileSpreadsheet,
  Calendar
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Document {
  id: string
  name: string
  type: 'contract' | 'financial' | 'legal' | 'design' | 'permit' | 'report'
  format: 'pdf' | 'doc' | 'xlsx' | 'jpg' | 'png'
  size: string
  uploadDate: string
  property: string
  category: string
  status: 'active' | 'expired' | 'pending' | 'approved'
}

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const documents: Document[] = [
    {
      id: '1',
      name: 'Purchase Agreement - Marina Bay',
      type: 'contract',
      format: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-10-15',
      property: 'Marina Bay Tower',
      category: 'Legal Documents',
      status: 'active'
    },
    {
      id: '2',
      name: 'Financial Analysis Q4 2024',
      type: 'financial',
      format: 'xlsx',
      size: '1.8 MB',
      uploadDate: '2024-11-20',
      property: 'All Properties',
      category: 'Financial Reports',
      status: 'active'
    },
    {
      id: '3',
      name: 'Renovation Permit Downtown',
      type: 'permit',
      format: 'pdf',
      size: '856 KB',
      uploadDate: '2024-09-30',
      property: 'Downtown Luxury Apartments',
      category: 'Permits & Licenses',
      status: 'approved'
    },
    {
      id: '4',
      name: 'Design Blueprints - Palm Villa',
      type: 'design',
      format: 'pdf',
      size: '4.2 MB',
      uploadDate: '2024-11-05',
      property: 'Palm Residence Villa',
      category: 'Design Documents',
      status: 'active'
    },
    {
      id: '5',
      name: 'Property Photos - Business Bay',
      type: 'design',
      format: 'jpg',
      size: '12.6 MB',
      uploadDate: '2024-12-01',
      property: 'Business Bay Complex',
      category: 'Media',
      status: 'active'
    }
  ]

  const categories = [
    'All Documents',
    'Legal Documents',
    'Financial Reports',
    'Permits & Licenses',
    'Design Documents',
    'Media',
    'Insurance',
    'Contracts'
  ]

  const getFileIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />
      case 'doc': return <FileText className="h-5 w-5 text-blue-500" />
      case 'xlsx': return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case 'jpg':
      case 'png': return <Image className="h-5 w-5 text-purple-500" />
      default: return <File className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20'
      case 'approved': return 'bg-primary/10 text-primary border-primary/20'
      case 'pending': return 'bg-warning/10 text-warning border-warning/20'
      case 'expired': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.property.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documents</h1>
            <p className="text-muted-foreground">Manage all property-related documents and files</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="lg">
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
            <Button variant="luxury" size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              New Folder
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">248</p>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Folder className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Folders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">2.8GB</p>
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">8</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
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
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category.toLowerCase().replace('all documents', 'all') ? "luxury" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.toLowerCase().replace('all documents', 'all'))}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getFileIcon(document.format)}
                    <div>
                      <h3 className="font-semibold text-foreground">{document.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{document.property}</span>
                        <span>•</span>
                        <span>{document.size}</span>
                        <span>•</span>
                        <span>Uploaded {new Date(document.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(document.status)}>
                      {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                    </Badge>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No documents found</h3>
              <p className="text-muted-foreground mb-4">
                No documents match your current search criteria.
              </p>
              <Button variant="luxury" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Documents