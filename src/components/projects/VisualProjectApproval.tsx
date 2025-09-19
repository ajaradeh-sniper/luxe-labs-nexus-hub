import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  TrendingUp, 
  Eye, 
  CheckCircle, 
  XCircle,
  Download,
  Trash2,
  Plus
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  project_type: string
  status: string
  approval_status: string
  budget: number
  start_date: string
  visual_assets: {
    images: string[]
    sketches: string[]
    upgrades: string[]
  }
  approval_data: any
  opportunity_id?: string
}

interface VisualProjectApprovalProps {
  project: Project
  onProjectUpdate: (updatedProject: Project) => void
  canApprove?: boolean
}

export function VisualProjectApproval({ project, onProjectUpdate, canApprove = false }: VisualProjectApprovalProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [approvalNotes, setApprovalNotes] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (files: FileList | null, category: 'images' | 'sketches' | 'upgrades') => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    try {
      const uploadedFiles: string[] = []

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${project.id}/${category}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-assets')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('project-assets')
          .getPublicUrl(fileName)

        uploadedFiles.push(publicUrl)
      }

      // Update project visual assets
      const updatedAssets = {
        ...project.visual_assets,
        [category]: [...(project.visual_assets[category] || []), ...uploadedFiles]
      }

      const { data: updatedProject, error: updateError } = await supabase
        .from('projects')
        .update({ visual_assets: updatedAssets })
        .eq('id', project.id)
        .select()
        .single()

      if (updateError) throw updateError

      // Type cast the updated project
      const typedProject: Project = {
        ...updatedProject,
        visual_assets: (updatedProject.visual_assets as any) || { images: [], sketches: [], upgrades: [] },
        approval_data: (updatedProject.approval_data as any) || {}
      }

      onProjectUpdate(typedProject)
      toast({
        title: "Files Uploaded",
        description: `${uploadedFiles.length} file(s) uploaded successfully`,
      })

    } catch (error) {
      console.error('Error uploading files:', error)
      toast({
        title: "Upload Failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleApprovalDecision = async (decision: 'approved' | 'rejected') => {
    if (!canApprove) return

    try {
      const approvalData = {
        decision,
        notes: approvalNotes,
        approved_by: user?.id,
        approved_at: new Date().toISOString(),
        previous_status: project.approval_status
      }

      const { data: updatedProject, error } = await supabase
        .from('projects')
        .update({
          approval_status: decision,
          approval_data: approvalData,
          approved_by: user?.id,
          approved_at: decision === 'approved' ? new Date().toISOString() : null,
          status: decision === 'approved' ? 'active' : 'on_hold'
        })
        .eq('id', project.id)
        .select()
        .single()

      if (error) throw error

      // Type cast the updated project
      const typedProject: Project = {
        ...updatedProject,
        visual_assets: (updatedProject.visual_assets as any) || { images: [], sketches: [], upgrades: [] },
        approval_data: (updatedProject.approval_data as any) || {}
      }

      onProjectUpdate(typedProject)
      toast({
        title: `Project ${decision === 'approved' ? 'Approved' : 'Rejected'}`,
        description: `Project has been ${decision} and is ready for ${decision === 'approved' ? 'execution' : 'revision'}.`,
      })

    } catch (error) {
      console.error('Error updating approval status:', error)
      toast({
        title: "Approval Failed",
        description: "Failed to update approval status. Please try again.",
        variant: "destructive"
      })
    }
  }

  const getApprovalStatusBadge = () => {
    switch (project.approval_status) {
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

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{project.name}</CardTitle>
              <CardDescription className="mt-2">{project.description}</CardDescription>
            </div>
            <div className="text-right space-y-2">
              {getApprovalStatusBadge()}
              <p className="text-sm text-muted-foreground">
                Budget: ${project.budget?.toLocaleString()}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Visual Assets Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Project Visual Assets</CardTitle>
          <CardDescription>
            Upload and manage images, sketches, and upgrade proposals for project approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="images" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="images" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Images ({project.visual_assets?.images?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="sketches" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Sketches ({project.visual_assets?.sketches?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="upgrades" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Upgrades ({project.visual_assets?.upgrades?.length || 0})
              </TabsTrigger>
            </TabsList>

            {['images', 'sketches', 'upgrades'].map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium capitalize">{category}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.multiple = true
                      input.accept = category === 'images' ? 'image/*' : '*/*'
                      input.onchange = (e) => {
                        const files = (e.target as HTMLInputElement).files
                        handleFileUpload(files, category as 'images' | 'sketches' | 'upgrades')
                      }
                      input.click()
                    }}
                    disabled={isUploading}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Upload {category.slice(0, -1)}
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {project.visual_assets?.[category as keyof typeof project.visual_assets]?.map((url: string, index: number) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-square relative group">
                        {category === 'images' ? (
                          <img 
                            src={url} 
                            alt={`${category} ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setSelectedImage(url)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" asChild>
                            <a href={url} download target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => setSelectedImage(url)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )) || []}
                </div>

                {(!project.visual_assets?.[category as keyof typeof project.visual_assets] || 
                  (project.visual_assets[category as keyof typeof project.visual_assets] as string[])?.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="mb-4">
                      {category === 'images' ? <ImageIcon className="h-12 w-12 mx-auto" /> : 
                       category === 'sketches' ? <FileText className="h-12 w-12 mx-auto" /> :
                       <TrendingUp className="h-12 w-12 mx-auto" />}
                    </div>
                    <p>No {category} uploaded yet</p>
                    <p className="text-sm">Upload {category} to showcase your project vision</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Approval Actions */}
      {canApprove && project.approval_status === 'pending_approval' && (
        <Card>
          <CardHeader>
            <CardTitle>Project Approval</CardTitle>
            <CardDescription>
              Review the project materials and make an approval decision
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="approval-notes">Approval Notes</Label>
              <Textarea
                id="approval-notes"
                placeholder="Add your approval notes or feedback..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => handleApprovalDecision('approved')}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Project
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handleApprovalDecision('rejected')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Project
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Viewer Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Image Viewer</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img 
                src={selectedImage} 
                alt="Full size view"
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}