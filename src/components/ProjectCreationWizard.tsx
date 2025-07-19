import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Building2,
  DollarSign,
  Users,
  FileText,
  Star,
  Check
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProjectCreationWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectCreationWizard({ open, onOpenChange }: ProjectCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    projectName: "",
    projectType: "",
    property: "",
    description: "",
    
    // Timeline & Budget
    startDate: undefined as Date | undefined,
    expectedCompletion: undefined as Date | undefined,
    totalBudget: "",
    priority: "",
    
    // Team & Resources
    projectManager: "",
    teamMembers: [] as string[],
    consultants: [] as string[],
    
    // Goals & Requirements
    primaryGoals: [] as string[],
    requirements: "",
    successMetrics: [] as string[]
  })

  const { toast } = useToast()

  const steps = [
    { id: 1, title: "Basic Information", icon: Building2 },
    { id: 2, title: "Timeline & Budget", icon: DollarSign },
    { id: 3, title: "Team & Resources", icon: Users },
    { id: 4, title: "Goals & Requirements", icon: Star },
    { id: 5, title: "Review & Create", icon: Check }
  ]

  const projectTemplates = [
    { id: "renovation", name: "Luxury Renovation", description: "Complete property renovation project" },
    { id: "development", name: "New Development", description: "Ground-up development project" },
    { id: "interior", name: "Interior Design", description: "Interior design and finishing project" },
    { id: "commercial", name: "Commercial Upgrade", description: "Commercial property enhancement" }
  ]

  const availableProperties = [
    "Marina Bay Tower",
    "Downtown Luxury Apartments",
    "Business Bay Complex",
    "Palm Residence Villa",
    "DIFC Office Tower"
  ]

  const availableTeam = [
    "Elena Rodriguez - Project Manager",
    "Michael Chen - Lead Designer",
    "Sarah Johnson - Operations Manager",
    "David Kim - Financial Analyst",
    "Fatima Al-Zahra - Legal Advisor"
  ]

  const goalOptions = [
    "Maximize ROI",
    "Premium Quality Finish",
    "On-Time Delivery",
    "Cost Optimization",
    "Client Satisfaction",
    "Sustainability Focus"
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCreateProject = () => {
    toast({
      title: "Project Created Successfully",
      description: `${formData.projectName} has been created and added to your portfolio.`,
    })
    onOpenChange(false)
    setCurrentStep(1)
    setFormData({
      projectName: "",
      projectType: "",
      property: "",
      description: "",
      startDate: undefined,
      expectedCompletion: undefined,
      totalBudget: "",
      priority: "",
      projectManager: "",
      teamMembers: [],
      consultants: [],
      primaryGoals: [],
      requirements: "",
      successMetrics: []
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.projectName && formData.projectType && formData.property
      case 2:
        return formData.startDate && formData.expectedCompletion && formData.totalBudget
      case 3:
        return formData.projectManager
      case 4:
        return formData.primaryGoals.length > 0
      case 5:
        return true
      default:
        return false
    }
  }

  const toggleArrayItem = (array: string[], item: string, setter: (newArray: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item))
    } else {
      setter([...array, item])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Project</DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-border text-muted-foreground"
                }`}>
                  <step.icon className="h-4 w-4" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                    placeholder="Enter project name"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Project Template *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {projectTemplates.map((template) => (
                      <Card 
                        key={template.id}
                        className={`cursor-pointer transition-colors ${
                          formData.projectType === template.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, projectType: template.id }))}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property">Property *</Label>
                  <Select value={formData.property} onValueChange={(value) => setFormData(prev => ({ ...prev, property: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProperties.map((property) => (
                        <SelectItem key={property} value={property}>{property}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the project scope and objectives"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Timeline & Budget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : "Select start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Expected Completion *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.expectedCompletion ? format(formData.expectedCompletion, "PPP") : "Select completion date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.expectedCompletion}
                          onSelect={(date) => setFormData(prev => ({ ...prev, expectedCompletion: date }))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Total Budget *</Label>
                    <Input
                      id="budget"
                      value={formData.totalBudget}
                      onChange={(e) => setFormData(prev => ({ ...prev, totalBudget: e.target.value }))}
                      placeholder="e.g. $500,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Team & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="projectManager">Project Manager *</Label>
                  <Select value={formData.projectManager} onValueChange={(value) => setFormData(prev => ({ ...prev, projectManager: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTeam.map((member) => (
                        <SelectItem key={member} value={member}>{member}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Team Members</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {availableTeam.map((member) => (
                      <div key={member} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={member}
                          checked={formData.teamMembers.includes(member)}
                          onChange={() => toggleArrayItem(
                            formData.teamMembers, 
                            member, 
                            (newArray) => setFormData(prev => ({ ...prev, teamMembers: newArray }))
                          )}
                          className="rounded"
                        />
                        <Label htmlFor={member} className="cursor-pointer">{member}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Goals & Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Primary Goals *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {goalOptions.map((goal) => (
                      <Badge
                        key={goal}
                        variant={formData.primaryGoals.includes(goal) ? "default" : "outline"}
                        className="cursor-pointer justify-center p-2"
                        onClick={() => toggleArrayItem(
                          formData.primaryGoals,
                          goal,
                          (newArray) => setFormData(prev => ({ ...prev, primaryGoals: newArray }))
                        )}
                      >
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Specific Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                    placeholder="List any specific requirements, constraints, or special considerations"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Create Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Project Details</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Name:</span> {formData.projectName}</div>
                      <div><span className="font-medium">Type:</span> {projectTemplates.find(t => t.id === formData.projectType)?.name}</div>
                      <div><span className="font-medium">Property:</span> {formData.property}</div>
                      <div><span className="font-medium">Budget:</span> {formData.totalBudget}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Timeline & Team</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Start:</span> {formData.startDate ? format(formData.startDate, "PPP") : "Not set"}</div>
                      <div><span className="font-medium">Completion:</span> {formData.expectedCompletion ? format(formData.expectedCompletion, "PPP") : "Not set"}</div>
                      <div><span className="font-medium">Project Manager:</span> {formData.projectManager.split(' - ')[0]}</div>
                      <div><span className="font-medium">Team Size:</span> {formData.teamMembers.length} members</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Project Goals</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.primaryGoals.map((goal) => (
                      <Badge key={goal} variant="secondary">{goal}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep < 5 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="luxury"
              onClick={handleCreateProject}
              disabled={!isStepValid()}
            >
              Create Project
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}