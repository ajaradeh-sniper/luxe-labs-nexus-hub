import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { 
  Target, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

interface MilestoneManagementModalProps {
  open: boolean
  onClose: () => void
  projectId?: string
  projectTitle?: string
}

interface Milestone {
  id: string
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high' | 'critical'
  budget: number
  assignedTo: string
  dependencies: string[]
  deliverables: string[]
  completionPercentage: number
}

const TEAM_MEMBERS = [
  { id: 'pm1', name: 'Sarah Johnson', role: 'Project Manager' },
  { id: 'arch1', name: 'Ahmed Al-Rashid', role: 'Lead Architect' },
  { id: 'eng1', name: 'Michael Chen', role: 'Construction Engineer' },
  { id: 'des1', name: 'Federica Rossi', role: 'Interior Designer' },
  { id: 'fin1', name: 'David Miller', role: 'Finance Manager' }
]

const MILESTONE_TEMPLATES = [
  {
    title: 'Design Phase Completion',
    description: 'Complete architectural and interior design plans',
    duration: 30,
    deliverables: ['Architectural drawings', 'Interior design mockups', 'Material specifications']
  },
  {
    title: 'Permits & Approvals',
    description: 'Obtain all necessary permits and regulatory approvals',
    duration: 21,
    deliverables: ['Building permit', 'Municipality approval', 'Safety certificates']
  },
  {
    title: 'Foundation & Structure',
    description: 'Complete foundation work and structural construction',
    duration: 60,
    deliverables: ['Foundation completion', 'Structural framework', 'Quality inspection reports']
  },
  {
    title: 'MEP Installation',
    description: 'Install mechanical, electrical, and plumbing systems',
    duration: 45,
    deliverables: ['Electrical installation', 'Plumbing systems', 'HVAC installation']
  },
  {
    title: 'Interior Fit-out',
    description: 'Complete interior finishing and decoration',
    duration: 40,
    deliverables: ['Flooring installation', 'Painting completion', 'Fixture installation']
  },
  {
    title: 'Final Inspection',
    description: 'Conduct final quality checks and obtain completion certificates',
    duration: 14,
    deliverables: ['Quality inspection report', 'Completion certificate', 'Handover documentation']
  }
]

export function MilestoneManagementModal({ 
  open, 
  onClose, 
  projectId, 
  projectTitle = "Luxury Villa Renovation Project" 
}: MilestoneManagementModalProps) {
  const { toast } = useToast()
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Design Phase Completion',
      description: 'Complete architectural and interior design plans',
      dueDate: '2024-02-15',
      status: 'completed',
      priority: 'high',
      budget: 25000,
      assignedTo: 'des1',
      dependencies: [],
      deliverables: ['Architectural drawings', 'Interior design mockups'],
      completionPercentage: 100
    },
    {
      id: '2',
      title: 'Permits & Approvals',
      description: 'Obtain all necessary permits and regulatory approvals',
      dueDate: '2024-03-01',
      status: 'in_progress',
      priority: 'critical',
      budget: 15000,
      assignedTo: 'pm1',
      dependencies: ['1'],
      deliverables: ['Building permit', 'Municipality approval'],
      completionPercentage: 75
    }
  ])
  
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null)
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
    budget: 0,
    assignedTo: '',
    dependencies: [],
    deliverables: [],
    completionPercentage: 0
  })

  const handleCreateMilestone = () => {
    const milestone: Milestone = {
      id: Date.now().toString(),
      title: newMilestone.title || '',
      description: newMilestone.description || '',
      dueDate: newMilestone.dueDate || '',
      status: 'pending',
      priority: newMilestone.priority || 'medium',
      budget: newMilestone.budget || 0,
      assignedTo: newMilestone.assignedTo || '',
      dependencies: newMilestone.dependencies || [],
      deliverables: newMilestone.deliverables || [],
      completionPercentage: 0
    }

    setMilestones(prev => [...prev, milestone])
    setShowCreateForm(false)
    setNewMilestone({
      title: '',
      description: '',
      dueDate: '',
      status: 'pending',
      priority: 'medium',
      budget: 0,
      assignedTo: '',
      dependencies: [],
      deliverables: [],
      completionPercentage: 0
    })

    toast({
      title: "Milestone Created",
      description: `Milestone "${milestone.title}" has been added to the project.`
    })
  }

  const handleUpdateMilestone = (id: string, updates: Partial<Milestone>) => {
    setMilestones(prev => prev.map(milestone => 
      milestone.id === id ? { ...milestone, ...updates } : milestone
    ))
    
    toast({
      title: "Milestone Updated",
      description: "Milestone has been updated successfully."
    })
  }

  const handleDeleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(milestone => milestone.id !== id))
    toast({
      title: "Milestone Deleted",
      description: "Milestone has been removed from the project."
    })
  }

  const createFromTemplate = (template: typeof MILESTONE_TEMPLATES[0]) => {
    setNewMilestone({
      title: template.title,
      description: template.description,
      dueDate: new Date(Date.now() + template.duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pending',
      priority: 'medium',
      budget: 0,
      assignedTo: '',
      dependencies: [],
      deliverables: template.deliverables,
      completionPercentage: 0
    })
    setShowCreateForm(true)
  }

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: Milestone['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-green-100 text-green-800 border-green-200'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getTeamMemberName = (id: string) => {
    return TEAM_MEMBERS.find(member => member.id === id)?.name || 'Unassigned'
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Milestone Management - {projectTitle}
          </DialogTitle>
        </DialogHeader>

        {!showCreateForm ? (
          <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Project Milestones</h3>
                <p className="text-sm text-muted-foreground">
                  {milestones.length} milestones • {milestones.filter(m => m.status === 'completed').length} completed
                </p>
              </div>
              <div className="flex gap-2">
                <Select onValueChange={(template) => {
                  const selectedTemplate = MILESTONE_TEMPLATES.find(t => t.title === template)
                  if (selectedTemplate) createFromTemplate(selectedTemplate)
                }}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Use template" />
                  </SelectTrigger>
                  <SelectContent>
                    {MILESTONE_TEMPLATES.map(template => (
                      <SelectItem key={template.title} value={template.title}>
                        {template.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Milestone
                </Button>
              </div>
            </div>

            {/* Milestones List */}
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <Card key={milestone.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{milestone.title}</h4>
                            <Badge className={getStatusColor(milestone.status)}>
                              {milestone.status.replace('_', ' ')}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(milestone.priority)}>
                              {milestone.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingMilestone(milestone)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteMilestone(milestone.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{milestone.completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all" 
                            style={{ width: `${milestone.completionPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Due Date</p>
                            <p className="font-medium">{new Date(milestone.dueDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-medium">{formatCurrency(milestone.budget)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Assigned To</p>
                            <p className="font-medium">{getTeamMemberName(milestone.assignedTo)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Deliverables</p>
                            <p className="font-medium">{milestone.deliverables.length} items</p>
                          </div>
                        </div>
                      </div>

                      {/* Deliverables */}
                      {milestone.deliverables.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium mb-2">Deliverables:</h5>
                          <div className="flex flex-wrap gap-2">
                            {milestone.deliverables.map((deliverable, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {deliverable}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="flex gap-2 pt-2">
                        {milestone.status !== 'completed' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUpdateMilestone(milestone.id, { 
                                status: 'in_progress',
                                completionPercentage: Math.max(milestone.completionPercentage, 10)
                              })}
                            >
                              Start Progress
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUpdateMilestone(milestone.id, { 
                                completionPercentage: Math.min(milestone.completionPercentage + 25, 100)
                              })}
                            >
                              Update Progress (+25%)
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleUpdateMilestone(milestone.id, { 
                                status: 'completed',
                                completionPercentage: 100
                              })}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Complete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Create/Edit Form */
          <Card>
            <CardHeader>
              <CardTitle>
                {editingMilestone ? 'Edit Milestone' : 'Create New Milestone'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Milestone Title</Label>
                  <Input
                    id="title"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter milestone title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newMilestone.dueDate}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the milestone objectives and requirements"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select 
                    value={newMilestone.priority}
                    onValueChange={(value: any) => setNewMilestone(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (AED)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newMilestone.budget}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, budget: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Assigned To</Label>
                  <Select 
                    value={newMilestone.assignedTo}
                    onValueChange={(value) => setNewMilestone(prev => ({ ...prev, assignedTo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEAM_MEMBERS.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name} - {member.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Deliverables</Label>
                <Textarea
                  placeholder="Enter deliverables, one per line"
                  value={newMilestone.deliverables?.join('\n') || ''}
                  onChange={(e) => setNewMilestone(prev => ({ 
                    ...prev, 
                    deliverables: e.target.value.split('\n').filter(d => d.trim()) 
                  }))}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreateForm(false)
                    setEditingMilestone(null)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateMilestone}>
                  {editingMilestone ? 'Update Milestone' : 'Create Milestone'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}