import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Upload,
  FileText,
  Image,
  FileSpreadsheet,
  File,
  X,
  Check,
  AlertCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DocumentUploadProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface UploadFile {
  id: string
  file: File
  category: string
  property: string
  status: 'waiting' | 'uploading' | 'completed' | 'error'
  progress: number
  error?: string
}

export function DocumentUpload({ open, onOpenChange }: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const { toast } = useToast()

  const categories = [
    { value: "contracts", label: "Contracts & Agreements" },
    { value: "financial", label: "Financial Documents" },
    { value: "legal", label: "Legal Documents" },
    { value: "permits", label: "Permits & Licenses" },
    { value: "design", label: "Design Documents" },
    { value: "photos", label: "Photos & Media" },
    { value: "reports", label: "Reports & Analysis" },
    { value: "insurance", label: "Insurance Documents" }
  ]

  const properties = [
    "Marina Bay Tower",
    "Downtown Luxury Apartments", 
    "Business Bay Complex",
    "Palm Residence Villa",
    "DIFC Office Tower"
  ]

  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />
      case 'doc': case 'docx': return <FileText className="h-8 w-8 text-blue-500" />
      case 'xls': case 'xlsx': return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      case 'jpg': case 'jpeg': case 'png': case 'gif': return <Image className="h-8 w-8 text-purple-500" />
      default: return <File className="h-8 w-8 text-muted-foreground" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadFile[] = []
    Array.from(fileList).forEach((file) => {
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 50MB and cannot be uploaded.`,
          variant: "destructive"
        })
        return
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/png',
        'image/gif'
      ]

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type.`,
          variant: "destructive"
        })
        return
      }

      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        category: "",
        property: "",
        status: 'waiting',
        progress: 0
      })
    })

    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const updateFile = (id: string, updates: Partial<UploadFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const simulateUpload = async (fileId: string) => {
    updateFile(fileId, { status: 'uploading' })
    
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      updateFile(fileId, { progress })
    }
    
    // Simulate random success/failure
    const success = Math.random() > 0.1 // 90% success rate
    if (success) {
      updateFile(fileId, { status: 'completed', progress: 100 })
    } else {
      updateFile(fileId, { 
        status: 'error', 
        progress: 0, 
        error: 'Upload failed. Please try again.' 
      })
    }
  }

  const uploadAll = async () => {
    const filesToUpload = files.filter(f => f.status === 'waiting' && f.category && f.property)
    
    if (filesToUpload.length === 0) {
      toast({
        title: "No files to upload",
        description: "Please select category and property for each file.",
        variant: "destructive"
      })
      return
    }

    // Upload files sequentially
    for (const file of filesToUpload) {
      await simulateUpload(file.id)
    }

    const successful = files.filter(f => f.status === 'completed').length
    const failed = files.filter(f => f.status === 'error').length

    toast({
      title: "Upload Complete",
      description: `${successful} files uploaded successfully${failed > 0 ? `, ${failed} failed` : ''}.`,
    })
  }

  const canUpload = files.some(f => f.status === 'waiting' && f.category && f.property)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upload Documents</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Drop files here or click to browse</h3>
            <p className="text-muted-foreground mb-4">
              Support for PDF, DOC, XLS, and image files up to 50MB each
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Files to Upload ({files.length})</CardTitle>
                  <Button 
                    onClick={uploadAll} 
                    disabled={!canUpload}
                    variant="luxury"
                  >
                    Upload All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {files.map((uploadFile) => (
                    <div key={uploadFile.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {getFileIcon(uploadFile.file)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium truncate">{uploadFile.file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(uploadFile.file.size)}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {uploadFile.status === 'completed' && (
                                <Check className="h-5 w-5 text-success" />
                              )}
                              {uploadFile.status === 'error' && (
                                <AlertCircle className="h-5 w-5 text-destructive" />
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFile(uploadFile.id)}
                                disabled={uploadFile.status === 'uploading'}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="space-y-2">
                              <Label>Category</Label>
                              <Select 
                                value={uploadFile.category} 
                                onValueChange={(value) => updateFile(uploadFile.id, { category: value })}
                                disabled={uploadFile.status === 'uploading' || uploadFile.status === 'completed'}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((cat) => (
                                    <SelectItem key={cat.value} value={cat.value}>
                                      {cat.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Property</Label>
                              <Select 
                                value={uploadFile.property} 
                                onValueChange={(value) => updateFile(uploadFile.id, { property: value })}
                                disabled={uploadFile.status === 'uploading' || uploadFile.status === 'completed'}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select property" />
                                </SelectTrigger>
                                <SelectContent>
                                  {properties.map((property) => (
                                    <SelectItem key={property} value={property}>
                                      {property}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Status and Progress */}
                          {uploadFile.status === 'uploading' && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Uploading...</span>
                                <span>{uploadFile.progress}%</span>
                              </div>
                              <Progress value={uploadFile.progress} className="h-2" />
                            </div>
                          )}

                          {uploadFile.status === 'completed' && (
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              Upload Complete
                            </Badge>
                          )}

                          {uploadFile.status === 'error' && (
                            <div className="space-y-2">
                              <Badge variant="destructive">Upload Failed</Badge>
                              {uploadFile.error && (
                                <p className="text-sm text-destructive">{uploadFile.error}</p>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => simulateUpload(uploadFile.id)}
                              >
                                Retry Upload
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}