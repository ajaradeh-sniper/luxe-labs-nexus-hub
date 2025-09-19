import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Edit, 
  Eye,
  FileText,
  CreditCard,
  Shield,
  TrendingUp,
  Users,
  Bell,
  Settings
} from 'lucide-react'

type WorkflowType = 'client' | 'investor' | 'admin' | 'project_manager' | 'real_estate_agent' | 'partner'
type FilterType = 'all' | 'active' | 'pending' | 'missing'
type WorkflowStatus = 'active' | 'pending' | 'missing' | 'broken'

interface WorkflowStep {
  id: string
  title: string
  description: string
  status: WorkflowStatus
  completionRate: number
  dropOffRate?: number
  actions: Array<{
    name: string
    status: WorkflowStatus
    route?: string
  }>
  bottlenecks?: string[]
}

interface WorkflowVisualizationProps {
  workflowType: WorkflowType
  filter: FilterType
}

export function WorkflowVisualization({ workflowType, filter }: WorkflowVisualizationProps) {
  
  const getWorkflowSteps = (type: WorkflowType): WorkflowStep[] => {
    switch (type) {
      case 'client':
        return [
          {
            id: 'signup',
            title: 'Sign Up & Profile',
            description: 'User registration and profile completion',
            status: 'active',
            completionRate: 85,
            dropOffRate: 15,
            actions: [
              { name: 'Create Account', status: 'active', route: '/auth' },
              { name: 'Complete Profile', status: 'active', route: '/profile' },
              { name: 'Upload Photo', status: 'pending' }
            ]
          },
          {
            id: 'verification',
            title: 'KYC Verification',
            description: 'Identity verification and security setup',
            status: 'missing',
            completionRate: 45,
            dropOffRate: 30,
            actions: [
              { name: 'Upload Documents', status: 'missing' },
              { name: 'Identity Verification', status: 'missing' },
              { name: 'Security Setup', status: 'missing' }
            ],
            bottlenecks: ['Document upload interface not implemented', 'KYC verification workflow missing']
          },
          {
            id: 'proposal_review',
            title: 'View Proposals',
            description: 'Browse and review investment opportunities',
            status: 'active',
            completionRate: 92,
            actions: [
              { name: 'Browse Opportunities', status: 'active', route: '/opportunities' },
              { name: 'View Details', status: 'active' },
              { name: 'Filter & Search', status: 'active' }
            ]
          },
          {
            id: 'investment_request',
            title: 'Submit Investment Request',
            description: 'Express interest and submit investment applications',
            status: 'broken',
            completionRate: 12,
            dropOffRate: 88,
            actions: [
              { name: 'Submit Interest', status: 'missing' },
              { name: 'Investment Application', status: 'missing' },
              { name: 'Due Diligence Review', status: 'pending' }
            ],
            bottlenecks: ['Submit Interest button inactive', 'Investment form not connected']
          },
          {
            id: 'approval',
            title: 'Admin Approval',
            description: 'Administrative and legal review process',
            status: 'pending',
            completionRate: 78,
            actions: [
              { name: 'Admin Review', status: 'active' },
              { name: 'Legal Approval', status: 'pending' },
              { name: 'Final Authorization', status: 'missing' }
            ]
          },
          {
            id: 'funding',
            title: 'Fund Transfer',
            description: 'Payment processing and confirmation',
            status: 'missing',
            completionRate: 0,
            actions: [
              { name: 'Payment Gateway', status: 'missing' },
              { name: 'Fund Confirmation', status: 'missing' },
              { name: 'Receipt Generation', status: 'missing' }
            ],
            bottlenecks: ['Payment system not implemented', 'Fund transfer workflow missing']
          },
          {
            id: 'tracking',
            title: 'ROI Tracking',
            description: 'Investment monitoring and returns dashboard',
            status: 'active',
            completionRate: 67,
            actions: [
              { name: 'Investment Dashboard', status: 'active' },
              { name: 'ROI Calculations', status: 'pending' },
              { name: 'Performance Reports', status: 'active' }
            ]
          },
          {
            id: 'exit',
            title: 'Withdraw/Reinvest',
            description: 'Exit strategies and reinvestment options',
            status: 'missing',
            completionRate: 0,
            actions: [
              { name: 'Withdrawal Request', status: 'missing' },
              { name: 'Reinvestment Options', status: 'missing' },
              { name: 'Referral Program', status: 'missing' }
            ],
            bottlenecks: ['Withdrawal workflow not created', 'Referral system not implemented']
          }
        ]
      
      case 'admin':
        return [
          {
            id: 'user_management',
            title: 'User Management',
            description: 'Add, edit, and manage user accounts',
            status: 'pending',
            completionRate: 60,
            actions: [
              { name: 'Add User', status: 'pending', route: '/admin/detailed-users' },
              { name: 'Edit User', status: 'pending' },
              { name: 'Delete User', status: 'missing' },
              { name: 'Role Assignment', status: 'missing' }
            ],
            bottlenecks: ['User editing workflow incomplete', 'Role assignment not connected']
          },
          {
            id: 'kyc_approval',
            title: 'KYC Approval',
            description: 'Review and approve investor applications',
            status: 'missing',
            completionRate: 0,
            actions: [
              { name: 'Review Documents', status: 'missing' },
              { name: 'Approve/Reject', status: 'missing' },
              { name: 'KYC Dashboard', status: 'missing' }
            ],
            bottlenecks: ['KYC review interface not created']
          },
          {
            id: 'project_oversight',
            title: 'Project Management',
            description: 'Oversee project status, budgets, and milestones',
            status: 'pending',
            completionRate: 45,
            actions: [
              { name: 'Create Project', status: 'active', route: '/dashboard/projects' },
              { name: 'Budget Management', status: 'pending' },
              { name: 'Milestone Tracking', status: 'missing' }
            ]
          },
          {
            id: 'investment_oversight',
            title: 'Investment Oversight',
            description: 'Monitor and manage investment activities',
            status: 'missing',
            completionRate: 0,
            actions: [
              { name: 'Investment Dashboard', status: 'missing' },
              { name: 'Approval Workflow', status: 'missing' },
              { name: 'Performance Monitoring', status: 'missing' }
            ],
            bottlenecks: ['Investment oversight dashboard missing']
          },
          {
            id: 'document_management',
            title: 'Document Management',
            description: 'Upload, approve, and manage legal documents',
            status: 'pending',
            completionRate: 30,
            actions: [
              { name: 'Document Upload', status: 'active', route: '/documents' },
              { name: 'Document Approval', status: 'missing' },
              { name: 'Digital Signatures', status: 'missing' }
            ]
          }
        ]
      
      case 'project_manager':
        return [
          {
            id: 'project_planning',
            title: 'Project Planning',
            description: 'Create project plans and set milestones',
            status: 'pending',
            completionRate: 55,
            actions: [
              { name: 'Create Plan', status: 'active' },
              { name: 'Set Milestones', status: 'missing' },
              { name: 'Resource Allocation', status: 'pending' }
            ]
          },
          {
            id: 'supplier_management',
            title: 'Supplier Management',
            description: 'Approve suppliers and manage tenders',
            status: 'missing',
            completionRate: 0,
            actions: [
              { name: 'Supplier Approval', status: 'missing' },
              { name: 'Tender Management', status: 'missing' },
              { name: 'Contract Management', status: 'missing' }
            ]
          },
          {
            id: 'qa_reporting',
            title: 'QA Reporting',
            description: 'Upload updates and quality assurance reports',
            status: 'active',
            completionRate: 80,
            actions: [
              { name: 'Upload Updates', status: 'active', route: '/qa' },
              { name: 'QA Reviews', status: 'active' },
              { name: 'Client Approvals', status: 'pending' }
            ]
          }
        ]
      
      case 'real_estate_agent':
        return [
          {
            id: 'property_curation',
            title: 'Property Curation',
            description: 'Source and curate properties via DLD and networks',
            status: 'missing',
            completionRate: 0,
            actions: [
              { name: 'DLD Integration', status: 'missing' },
              { name: 'Property Sourcing', status: 'missing' },
              { name: 'Property Validation', status: 'missing' }
            ],
            bottlenecks: ['DLD sync not implemented']
          },
          {
            id: 'listing_management',
            title: 'Listing Management',
            description: 'Post and manage property opportunities',
            status: 'pending',
            completionRate: 40,
            actions: [
              { name: 'Add Listing', status: 'missing' },
              { name: 'Update Properties', status: 'active', route: '/properties' },
              { name: 'Manage Opportunities', status: 'active', route: '/opportunities' }
            ]
          },
          {
            id: 'commission_tracking',
            title: 'Commission Tracking',
            description: 'Track earnings and commission payments',
            status: 'missing',
            completionRate: 0,
            actions: [
              { name: 'Commission Dashboard', status: 'missing' },
              { name: 'Payment Tracking', status: 'missing' },
              { name: 'Performance Reports', status: 'missing' }
            ],
            bottlenecks: ['Commission tracking system not built']
          }
        ]
      
      case 'partner':
        return [
          {
            id: 'registration',
            title: 'Partner Registration',
            description: 'Apply and register as a partner',
            status: 'pending',
            completionRate: 70,
            actions: [
              { name: 'Application Form', status: 'pending' },
              { name: 'Credential Upload', status: 'pending' },
              { name: 'Background Verification', status: 'missing' }
            ]
          },
          {
            id: 'tender_process',
            title: 'Tender Process',
            description: 'Receive invitations and submit bids',
            status: 'missing',
            completionRate: 0,
            actions: [
              { name: 'Tender Invitations', status: 'missing' },
              { name: 'Bid Submission', status: 'missing' },
              { name: 'Contract Negotiation', status: 'missing' }
            ]
          },
          {
            id: 'project_participation',
            title: 'Project Participation',
            description: 'Participate in projects and track deliveries',
            status: 'missing',
            completionRate: 0,
            actions: [
              { name: 'Project Dashboard', status: 'missing' },
              { name: 'Delivery Tracking', status: 'missing' },
              { name: 'Invoice Management', status: 'missing' }
            ]
          }
        ]
      
      default:
        return []
    }
  }

  const steps = getWorkflowSteps(workflowType)
  const filteredSteps = filter === 'all' ? steps : steps.filter(step => step.status === filter)

  const getStatusIcon = (status: WorkflowStatus) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'missing':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'broken':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: WorkflowStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'missing':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'broken':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {workflowType === 'client' && <Users className="h-5 w-5" />}
          {workflowType === 'admin' && <Shield className="h-5 w-5" />}
          {workflowType === 'project_manager' && <Settings className="h-5 w-5" />}
          {workflowType === 'real_estate_agent' && <TrendingUp className="h-5 w-5" />}
          {workflowType === 'partner' && <FileText className="h-5 w-5" />}
          {workflowType.replace('_', ' ').split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')} Workflow
        </CardTitle>
        <CardDescription>
          Visual representation of the {workflowType} workflow with status indicators and bottlenecks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {index < filteredSteps.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-12 bg-border" />
              )}
              
              {/* Step Card */}
              <div className="flex gap-4">
                {/* Step Number/Status */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  {getStatusIcon(step.status)}
                </div>
                
                {/* Step Content */}
                <Card className="flex-1">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(step.status)}>
                          {step.status}
                        </Badge>
                        {step.completionRate !== undefined && (
                          <Badge variant="secondary">
                            {step.completionRate}% complete
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    {step.completionRate !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completion Rate</span>
                          {step.dropOffRate && (
                            <span className="text-red-600">{step.dropOffRate}% drop-off</span>
                          )}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              step.completionRate > 75 ? 'bg-green-500' :
                              step.completionRate > 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${step.completionRate}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="space-y-2 mb-4">
                      <h5 className="font-medium text-sm">Actions & Buttons:</h5>
                      <div className="flex flex-wrap gap-2">
                        {step.actions.map((action, actionIndex) => (
                          <div key={actionIndex} className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className={`${getStatusColor(action.status)} border`}
                              disabled={action.status === 'missing'}
                            >
                              {getStatusIcon(action.status)}
                              <span className="ml-1">{action.name}</span>
                              {action.route && <Eye className="h-3 w-3 ml-1" />}
                            </Button>
                            {actionIndex < step.actions.length - 1 && (
                              <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bottlenecks */}
                    {step.bottlenecks && step.bottlenecks.length > 0 && (
                      <div className="border-l-4 border-red-500 pl-3 py-2 bg-red-50 dark:bg-red-950 rounded-r">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <h5 className="font-medium text-sm text-red-800 dark:text-red-200">
                            Identified Bottlenecks:
                          </h5>
                        </div>
                        <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                          {step.bottlenecks.map((bottleneck, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {bottleneck}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Edit Button */}
                    <div className="flex justify-end mt-3">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit Workflow
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}