import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { DollarSign, Calendar, MapPin, TrendingUp, Building, ArrowRight } from 'lucide-react'

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

interface ConvertOpportunityToProjectModalProps {
  isOpen: boolean
  onClose: () => void
  opportunity: Opportunity | null
  onConversionComplete: () => void
}

export function ConvertOpportunityToProjectModal({ 
  isOpen, 
  onClose, 
  opportunity, 
  onConversionComplete 
}: ConvertOpportunityToProjectModalProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isConverting, setIsConverting] = useState(false)
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    project_type: '',
    budget: 0,
    start_date: '',
    planned_end_date: '',
    manager_id: user?.id || ''
  })

  const handleConvert = async () => {
    if (!opportunity || !user) return

    setIsConverting(true)
    try {
      // Create the project from the approved opportunity
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([{
          name: projectData.name || opportunity.title,
          description: projectData.description || opportunity.description,
          project_type: projectData.project_type || opportunity.opportunity_type,
          budget: projectData.budget || opportunity.investment_required,
          start_date: projectData.start_date,
          end_date: projectData.planned_end_date,
          manager_id: projectData.manager_id,
          opportunity_id: opportunity.id,
          status: 'planning',
          approval_status: 'pending_approval',
          visual_assets: {
            images: [],
            sketches: [],
            upgrades: []
          },
          created_by: user.id
        }])
        .select()
        .single()

      if (projectError) throw projectError

      // Update opportunity status to 'converted'
      const { error: opportunityError } = await supabase
        .from('opportunities')
        .update({ status: 'converted' })
        .eq('id', opportunity.id)

      if (opportunityError) throw opportunityError

      toast({
        title: "Opportunity Converted Successfully",
        description: `${opportunity.title} has been converted to a project and is ready for approval.`,
      })

      onConversionComplete()
      onClose()
      
    } catch (error) {
      console.error('Error converting opportunity to project:', error)
      toast({
        title: "Conversion Failed",
        description: "Failed to convert opportunity to project. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsConverting(false)
    }
  }

  if (!opportunity) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Convert to Project
          </DialogTitle>
          <DialogDescription>
            Convert this approved investment opportunity into a project for execution
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Opportunity Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Opportunity Summary</h3>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                <CardDescription>{opportunity.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{opportunity.location}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Investment</p>
                      <p className="font-medium">${opportunity.investment_required?.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Expected ROI</p>
                      <p className="font-medium">{opportunity.expected_roi}%</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="font-medium">{new Date(opportunity.deadline).toLocaleDateString()}</p>
                  </div>
                </div>

                <Badge variant="outline" className="w-fit">
                  {opportunity.opportunity_type}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Project Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder={opportunity.title}
                  value={projectData.name}
                  onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea
                  id="project-description"
                  placeholder={opportunity.description}
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="project-type">Project Type</Label>
                <Select 
                  value={projectData.project_type} 
                  onValueChange={(value) => setProjectData(prev => ({ ...prev, project_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="renovation">Renovation</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="flip">Property Flip</SelectItem>
                    <SelectItem value="buy_and_hold">Buy & Hold</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budget">Budget (AED)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder={opportunity.investment_required?.toString()}
                  value={projectData.budget || ''}
                  onChange={(e) => setProjectData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={projectData.start_date}
                    onChange={(e) => setProjectData(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="end-date">Planned End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={projectData.planned_end_date}
                    onChange={(e) => setProjectData(prev => ({ ...prev, planned_end_date: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <ArrowRight className="h-8 w-8 text-muted-foreground" />
        </div>

        <div className="bg-muted/20 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Next Steps After Conversion:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Project will be created with "Pending Approval" status</li>
            <li>• Upload visual assets (images, sketches, upgrade plans)</li>
            <li>• Submit for management approval</li>
            <li>• Once approved, project execution can begin</li>
          </ul>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isConverting}>
            Cancel
          </Button>
          <Button onClick={handleConvert} disabled={isConverting}>
            {isConverting ? "Converting..." : "Convert to Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}