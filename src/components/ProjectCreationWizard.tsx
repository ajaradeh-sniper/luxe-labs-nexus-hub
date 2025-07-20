import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Building2,
  DollarSign,
  Users,
  FileText,
  Star,
  Check,
  AlertTriangle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SupabaseService } from "@/lib/supabase-service"
import { useAsyncOperation } from "@/hooks/useAsyncOperation"
import { log } from "@/lib/logger"
import { useAuth } from "@/contexts/AuthContext"

// Validation schemas for each step
const basicInfoSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters"),
  projectType: z.enum(['renovation', 'development', 'investment', 'flip']).nullable().refine(val => val !== null, {
    message: "Please select a project type"
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

const timelineBudgetSchema = z.object({
  startDate: z.date().nullable().refine(val => val !== null, {
    message: "Start date is required"
  }),
  endDate: z.date().nullable().refine(val => val !== null, {
    message: "End date is required"
  }),
  budget: z.number().min(1000, "Budget must be at least AED 1,000"),
  priority: z.enum(['low', 'medium', 'high', 'critical']).nullable().refine(val => val !== null, {
    message: "Please select a priority level"
  })
}).refine((data) => {
  if (data.endDate && data.startDate) {
    return data.endDate > data.startDate;
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["endDate"]
})

const teamResourcesSchema = z.object({
  projectManager: z.string().min(1, "Project manager is required"),
  teamSize: z.number().min(1, "Team must have at least 1 member").max(50, "Team size cannot exceed 50"),
  requiredSkills: z.array(z.string()).optional()
})

interface ProjectCreationWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectCreationWizard({ open, onOpenChange }: ProjectCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const { toast } = useToast()
  const { user } = useAuth()

  const { execute: createProject, loading: creating } = useAsyncOperation(
    SupabaseService.createProject,
    { 
      showSuccessToast: true, 
      successMessage: "Project created successfully!",
      showErrorToast: true 
    }
  )

  // Forms for each step
  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      projectName: "",
      projectType: undefined,
      description: ""
    }
  })

  const timelineBudgetForm = useForm<z.infer<typeof timelineBudgetSchema>>({
    resolver: zodResolver(timelineBudgetSchema),
    defaultValues: {
      budget: 0,
      priority: undefined
    }
  })

  const teamResourcesForm = useForm<z.infer<typeof teamResourcesSchema>>({
    resolver: zodResolver(teamResourcesSchema),
    defaultValues: {
      projectManager: "",
      teamSize: 1,
      requiredSkills: []
    }
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleNext = async () => {
    let isValid = false

    if (currentStep === 1) {
      isValid = await basicInfoForm.trigger()
    } else if (currentStep === 2) {
      isValid = await timelineBudgetForm.trigger()
    } else if (currentStep === 3) {
      isValid = await teamResourcesForm.trigger()
    }

    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep])
      }

      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        await handleSubmit()
      }
    } else {
      log.warn(`Step ${currentStep} validation failed`, 'PROJECT_WIZARD', { 
        step: currentStep,
        userId: user?.id 
      })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Combine all form data
      const basicData = basicInfoForm.getValues()
      const timelineData = timelineBudgetForm.getValues()
      const teamData = teamResourcesForm.getValues()

      const projectData = {
        name: basicData.projectName,
        description: basicData.description,
        project_type: basicData.projectType,
        status: 'planning' as const,
        start_date: format(timelineData.startDate, 'yyyy-MM-dd'),
        end_date: format(timelineData.endDate, 'yyyy-MM-dd'),
        budget: timelineData.budget,
        actual_cost: 0,
        manager_id: user?.id,
        created_by: user?.id
      }

      log.info('Creating new project', 'PROJECT_WIZARD', { 
        projectName: projectData.name,
        projectType: projectData.project_type,
        userId: user?.id 
      })

      const result = await createProject(projectData)

      if (result.success) {
        onOpenChange(false)
        resetForms()
      }
    } catch (error) {
      log.error('Project creation failed', 'PROJECT_WIZARD', error)
    }
  }

  const resetForms = () => {
    setCurrentStep(1)
    setCompletedSteps([])
    basicInfoForm.reset()
    timelineBudgetForm.reset()
    teamResourcesForm.reset()
  }

  const projectTypes = [
    { value: 'renovation', label: 'Renovation', description: 'Property improvement and upgrades' },
    { value: 'development', label: 'Development', description: 'New construction projects' },
    { value: 'investment', label: 'Investment', description: 'Property investment analysis' },
    { value: 'flip', label: 'Flip', description: 'Buy, renovate, and sell properties' }
  ]

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' }
  ]

  const skillOptions = [
    'Project Management', 'Construction', 'Electrical', 'Plumbing', 'HVAC',
    'Interior Design', 'Architecture', 'Legal', 'Finance', 'Marketing'
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-4">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep === step
                    ? "bg-primary text-primary-foreground"
                    : completedSteps.includes(step)
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {completedSteps.includes(step) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="pt-6">
              {currentStep === 1 && (
                <Form {...basicInfoForm}>
                  <form className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Basic Information</h3>
                      <p className="text-sm text-muted-foreground">
                        Tell us about your project
                      </p>
                    </div>

                    <FormField
                      control={basicInfoForm.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={basicInfoForm.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projectTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div>
                                    <div className="font-medium">{type.label}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {type.description}
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={basicInfoForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project goals and scope"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}

              {currentStep === 2 && (
                <Form {...timelineBudgetForm}>
                  <form className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Timeline & Budget</h3>
                      <p className="text-sm text-muted-foreground">
                        Set your project timeline and budget
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={timelineBudgetForm.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick start date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={timelineBudgetForm.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick end date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date <= (timelineBudgetForm.getValues().startDate || new Date())
                                  }
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={timelineBudgetForm.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget (AED)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter budget amount"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={timelineBudgetForm.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {priorityLevels.map((priority) => (
                                <SelectItem key={priority.value} value={priority.value}>
                                  <div className="flex items-center gap-2">
                                    <Badge className={priority.color}>
                                      {priority.label}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}

              {currentStep === 3 && (
                <Form {...teamResourcesForm}>
                  <form className="space-y-4">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Team & Resources</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure your project team
                      </p>
                    </div>

                    <FormField
                      control={teamResourcesForm.control}
                      name="projectManager"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Manager</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter project manager name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={teamResourcesForm.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter team size"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Review all details before creating the project. You can modify settings later from the project dashboard.
                      </AlertDescription>
                    </Alert>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={creating}
              className="min-w-[100px]"
            >
              {creating ? (
                "Creating..."
              ) : currentStep === totalSteps ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Create Project
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}