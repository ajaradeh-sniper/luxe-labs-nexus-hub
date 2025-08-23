import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { 
  Building, 
  TrendingUp, 
  Users, 
  Palette,
  DollarSign,
  MapPin,
  Calendar,
  FileText
} from "lucide-react"

export interface ServiceType {
  id: string
  name: string
  description: string
  icon: any
  color: string
  features: string[]
  estimatedDuration: string
  typicalBudget: string
}

const SERVICE_TYPES: ServiceType[] = [
  {
    id: 'flip',
    name: 'Property Flip',
    description: 'Acquire, renovate, and resell properties for profit',
    icon: Building,
    color: 'bg-blue-500',
    features: [
      'Property acquisition analysis',
      'Renovation planning & execution',
      'Market timing optimization',
      'ROI tracking & reporting'
    ],
    estimatedDuration: '6-12 months',
    typicalBudget: '$100K - $500K'
  },
  {
    id: 'fund',
    name: 'Investment Fund',
    description: 'Manage investment funds for real estate opportunities',
    icon: TrendingUp,
    color: 'bg-green-500',
    features: [
      'Fund structure setup',
      'Investor management',
      'Portfolio optimization',
      'Performance reporting'
    ],
    estimatedDuration: '12+ months',
    typicalBudget: '$1M+'
  },
  {
    id: 'advisory',
    name: 'Advisory Services',
    description: 'Strategic consulting for real estate development',
    icon: Users,
    color: 'bg-purple-500',
    features: [
      'Market analysis',
      'Investment strategy',
      'Risk assessment',
      'Performance optimization'
    ],
    estimatedDuration: '3-6 months',
    typicalBudget: '$50K - $200K'
  },
  {
    id: 'transformation',
    name: 'Luxury Transformation',
    description: 'Complete luxury property transformation services',
    icon: Palette,
    color: 'bg-orange-500',
    features: [
      'High-end design & architecture',
      'Premium material sourcing',
      'Luxury finishing',
      'Concierge project management'
    ],
    estimatedDuration: '8-18 months',
    typicalBudget: '$200K - $2M'
  }
]

interface UnifiedProjectModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function UnifiedProjectModal({ open, onClose, onSuccess }: UnifiedProjectModalProps) {
  const [step, setStep] = useState<'service' | 'details' | 'confirmation'>('service')
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null)
  const [loading, setLoading] = useState(false)
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    location: '',
    budget: '',
    startDate: '',
    clientContact: '',
    clientEmail: '',
    notes: ''
  })
  
  const { user } = useAuth()
  const { toast } = useToast()

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service)
    setStep('details')
  }

  const handleCreateProject = async () => {
    if (!selectedService || !user) return

    setLoading(true)
    try {
      // Create project in database
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          name: projectData.name,
          description: projectData.description,
          project_type: selectedService.id,
          status: 'planning',
          budget: projectData.budget ? parseFloat(projectData.budget) : null,
          start_date: projectData.startDate || null,
          created_by: user.id,
          manager_id: user.id
        })
        .select()
        .single()

      if (projectError) throw projectError

      // Create initial project costs entry
      await supabase
        .from('project_costs')
        .insert({
          project_id: project.id,
          category: 'Planning',
          description: 'Initial project setup',
          estimated_cost: 0,
          status: 'planned',
          created_by: user.id
        })

      // Create initial project risk entry
      await supabase
        .from('project_risks')
        .insert({
          project_id: project.id,
          title: 'Initial Risk Assessment',
          description: 'Comprehensive project risk evaluation needed',
          category: 'planning',
          risk_level: 'medium',
          status: 'identified',
          created_by: user.id
        })

      toast({
        title: "Project Created",
        description: `${selectedService.name} project "${projectData.name}" has been created successfully.`,
      })

      onSuccess?.()
      onClose()
      setStep('service')
      setSelectedService(null)
      setProjectData({
        name: '',
        description: '',
        location: '',
        budget: '',
        startDate: '',
        clientContact: '',
        clientEmail: '',
        notes: ''
      })
    } catch (error) {
      console.error('Error creating project:', error)
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (step === 'details') {
      setStep('service')
    } else if (step === 'confirmation') {
      setStep('details')
    }
  }

  const handleNext = () => {
    if (step === 'details') {
      setStep('confirmation')
    }
  }

  const isDetailsValid = projectData.name.trim() && projectData.description.trim() && projectData.location.trim()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 'service' && "Select Service Type"}
            {step === 'details' && selectedService && (
              <>
                <selectedService.icon className="h-5 w-5" />
                {selectedService.name} - Project Details
              </>
            )}
            {step === 'confirmation' && "Confirm Project Creation"}
          </DialogTitle>
        </DialogHeader>

        {step === 'service' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICE_TYPES.map((service) => (
              <Card 
                key={service.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleServiceSelect(service)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${service.color} text-white`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{service.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>{service.typicalBudget}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 'details' && selectedService && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  value={projectData.name}
                  onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter project name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={projectData.location}
                  onChange={(e) => setProjectData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Property address or location"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                value={projectData.description}
                onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the project objectives and scope"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Estimate</Label>
                <Input
                  id="budget"
                  type="number"
                  value={projectData.budget}
                  onChange={(e) => setProjectData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="Initial budget estimate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Expected Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={projectData.startDate}
                  onChange={(e) => setProjectData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientContact">Client Contact Name</Label>
                <Input
                  id="clientContact"
                  value={projectData.clientContact}
                  onChange={(e) => setProjectData(prev => ({ ...prev, clientContact: e.target.value }))}
                  placeholder="Primary contact person"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={projectData.clientEmail}
                  onChange={(e) => setProjectData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={projectData.notes}
                onChange={(e) => setProjectData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional information or requirements"
                rows={3}
              />
            </div>
          </div>
        )}

        {step === 'confirmation' && selectedService && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${selectedService.color} text-white`}>
                    <selectedService.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{projectData.name}</CardTitle>
                    <CardDescription>{selectedService.name}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm text-muted-foreground">{projectData.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Budget</Label>
                    <p className="text-sm text-muted-foreground">
                      {projectData.budget ? `$${parseInt(projectData.budget).toLocaleString()}` : 'Not specified'}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground">{projectData.description}</p>
                </div>
                {projectData.notes && (
                  <div>
                    <Label className="text-sm font-medium">Notes</Label>
                    <p className="text-sm text-muted-foreground">{projectData.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <div>
            {step !== 'service' && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step === 'details' && (
              <Button onClick={handleNext} disabled={!isDetailsValid}>
                Continue
              </Button>
            )}
            {step === 'confirmation' && (
              <Button onClick={handleCreateProject} disabled={loading}>
                {loading ? "Creating..." : "Create Project"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}