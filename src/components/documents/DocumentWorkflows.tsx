import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Upload,
  File,
  FileText,
  FileImage,
  FilePdf,
  FileSpreadsheet,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Share2,
  Download,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
  Lock,
  Unlock,
  MessageSquare,
  Calendar,
  Tag
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"

interface Document {
  id: string
  name: string
  type: string
  size: number
  url: string
  status: 'pending' | 'processing' | 'approved' | 'rejected'
  created_at: string
  created_by: string
  category: string
  tags: string[]
  is_confidential: boolean
  approval_required: boolean
  approver_id?: string
  comments?: string
  version: number
  parent_id?: string
}

interface DocumentWorkflow {
  id: string
  name: string
  steps: WorkflowStep[]
  is_active: boolean
}

interface WorkflowStep {
  id: string
  name: string
  type: 'upload' | 'review' | 'approval' | 'notification'
  assignee?: string
  deadline?: string
  completed: boolean
}

interface ApprovalRequest {
  id: string
  document_id: string
  requested_by: string
  assigned_to: string
  status: 'pending' | 'approved' | 'rejected'
  comments?: string
  deadline: string
  created_at: string
}

export function DocumentWorkflows() {
  const { user } = useAuth()
  const { toast } = useToast()
  
  const [documents, setDocuments] = useState<Document[]>([])
  const [workflows, setWorkflows] = useState<DocumentWorkflow[]>([])
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  
  // New document form
  const [newDocument, setNewDocument] = useState({
    category: "",
    tags: [] as string[],
    is_confidential: false,
    approval_required: false,
    approver_id: "",
    comments: ""
  })

  // New workflow form
  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    steps: [] as WorkflowStep[]
  })

  const documentCategories = [
    "Contract",
    "Financial Report", 
    "Legal Document",
    "Marketing Material",
    "Technical Specification",
    "Project Plan",
    "Insurance",
    "Compliance",
    "Other"
  ]

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FilePdf className="h-5 w-5 text-red-500" />
    if (type.includes('image')) return <FileImage className="h-5 w-5 text-blue-500" />
    if (type.includes('sheet')) return <FileSpreadsheet className="h-5 w-5 text-green-500" />
    if (type.includes('text') || type.includes('doc')) return <FileText className="h-5 w-5 text-blue-600" />
    return <File className="h-5 w-5 text-gray-500" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleFileUpload = async (files: FileList | null, workflowId?: string) => {
    if (!files || !user) return

    for (const file of Array.from(files)) {
      const fileId = `${Date.now()}-${file.name}`
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))

      try {
        // Upload to Supabase Storage
        const filePath = `documents/${user.id}/${Date.now()}-${file.name}`
        const { data, error } = await supabase.storage
          .from('documents')
          .upload(filePath, file, {
            onUploadProgress: (progress) => {
              setUploadProgress(prev => ({ 
                ...prev, 
                [fileId]: (progress.loaded / progress.total) * 100 
              }))
            }
          })

        if (error) throw error

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath)

        // Save document metadata
        const documentData = {
          name: file.name,
          type: file.type,
          size: file.size,
          url: publicUrl,
          status: newDocument.approval_required ? 'pending' : 'approved',
          category: newDocument.category,
          tags: newDocument.tags,
          is_confidential: newDocument.is_confidential,
          approval_required: newDocument.approval_required,
          approver_id: newDocument.approver_id || null,
          comments: newDocument.comments,
          version: 1,
          created_by: user.id
        }

        // Insert into database (you'll need to create this table)
        // For now, we'll add to local state
        const newDoc: Document = {
          id: fileId,
          ...documentData,
          created_at: new Date().toISOString()
        }

        setDocuments(prev => [...prev, newDoc])

        // If approval required, create approval request
        if (newDocument.approval_required && newDocument.approver_id) {
          const approvalRequest: ApprovalRequest = {
            id: `approval-${fileId}`,
            document_id: fileId,
            requested_by: user.id,
            assigned_to: newDocument.approver_id,
            status: 'pending',
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString()
          }
          setApprovalRequests(prev => [...prev, approvalRequest])
        }

        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }))
        
        toast({
          title: "Document uploaded",
          description: `${file.name} has been uploaded successfully`
        })

      } catch (error) {
        console.error('Upload error:', error)
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive"
        })
      }
    }
  }

  const approveDocument = async (documentId: string, requestId: string) => {
    try {
      // Update document status
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId ? { ...doc, status: 'approved' } : doc
      ))

      // Update approval request
      setApprovalRequests(prev => prev.map(req =>
        req.id === requestId ? { ...req, status: 'approved' } : req
      ))

      toast({
        title: "Document approved",
        description: "Document has been approved successfully"
      })
    } catch (error) {
      console.error('Approval error:', error)
      toast({
        title: "Error",
        description: "Failed to approve document",
        variant: "destructive"
      })
    }
  }

  const rejectDocument = async (documentId: string, requestId: string, comments: string) => {
    try {
      // Update document status
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId ? { ...doc, status: 'rejected' } : doc
      ))

      // Update approval request
      setApprovalRequests(prev => prev.map(req =>
        req.id === requestId ? { ...req, status: 'rejected', comments } : req
      ))

      toast({
        title: "Document rejected",
        description: "Document has been rejected"
      })
    } catch (error) {
      console.error('Rejection error:', error)
      toast({
        title: "Error",
        description: "Failed to reject document",
        variant: "destructive"
      })
    }
  }

  const createWorkflow = () => {
    const workflow: DocumentWorkflow = {
      id: `workflow-${Date.now()}`,
      name: newWorkflow.name,
      steps: newWorkflow.steps,
      is_active: true
    }

    setWorkflows(prev => [...prev, workflow])
    setNewWorkflow({ name: "", steps: [] })

    toast({
      title: "Workflow created",
      description: "New document workflow has been created"
    })
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Document Workflows</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Workflow</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="workflow-name">Workflow Name</Label>
                  <Input
                    id="workflow-name"
                    value={newWorkflow.name}
                    onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                    placeholder="Enter workflow name..."
                  />
                </div>
                <Button onClick={createWorkflow} className="w-full">
                  Create Workflow
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newDocument.category} onValueChange={(value) => 
                    setNewDocument({...newDocument, category: value})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="confidential"
                    checked={newDocument.is_confidential}
                    onCheckedChange={(checked) => 
                      setNewDocument({...newDocument, is_confidential: checked})
                    }
                  />
                  <Label htmlFor="confidential">Confidential Document</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="approval"
                    checked={newDocument.approval_required}
                    onCheckedChange={(checked) => 
                      setNewDocument({...newDocument, approval_required: checked})
                    }
                  />
                  <Label htmlFor="approval">Requires Approval</Label>
                </div>

                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    value={newDocument.comments}
                    onChange={(e) => setNewDocument({...newDocument, comments: e.target.value})}
                    placeholder="Add any comments or instructions..."
                  />
                </div>

                <div>
                  <Label htmlFor="file-upload">Select Files</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {documentCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm truncate">{doc.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {(doc.size / 1024).toFixed(1)} KB • {doc.category}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {doc.is_confidential && <Lock className="h-3 w-3 text-red-500" />}
                      <Badge variant="secondary" className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {doc.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {uploadProgress[doc.id] !== undefined && uploadProgress[doc.id] < 100 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Uploading...</span>
                        <span>{Math.round(uploadProgress[doc.id])}%</span>
                      </div>
                      <Progress value={uploadProgress[doc.id]} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                    <span>v{doc.version}</span>
                  </div>

                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {workflow.name}
                    <Badge variant={workflow.is_active ? "default" : "secondary"}>
                      {workflow.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {workflow.steps.length} steps • {workflow.steps.filter(s => s.completed).length} completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {workflow.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-2">
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="text-sm">{step.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {approvalRequests.filter(req => req.status === 'pending').map((request) => {
              const document = documents.find(doc => doc.id === request.document_id)
              if (!document) return null

              return (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getFileIcon(document.type)}
                          {document.name}
                        </CardTitle>
                        <CardDescription>
                          Requested approval • Due: {new Date(request.deadline).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending Approval
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => approveDocument(document.id, request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reject Document</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Please provide a reason for rejection..."
                              id="rejection-comments"
                            />
                            <Button
                              onClick={() => {
                                const comments = (document.getElementById('rejection-comments') as HTMLTextAreaElement)?.value || ""
                                rejectDocument(document.id, request.id, comments)
                              }}
                              variant="destructive"
                              className="w-full"
                            >
                              Confirm Rejection
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documents.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{approvalRequests.filter(r => r.status === 'pending').length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workflows.filter(w => w.is_active).length}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}