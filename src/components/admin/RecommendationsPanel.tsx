import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Zap,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react'

type WorkflowType = 'client' | 'investor' | 'admin' | 'project_manager' | 'real_estate_agent' | 'partner'

interface Recommendation {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: 'missing' | 'broken' | 'optimization'
  impact: string
  effort: 'low' | 'medium' | 'high'
  actionItems: string[]
}

interface RecommendationsPanelProps {
  selectedWorkflow: WorkflowType
}

export function RecommendationsPanel({ selectedWorkflow }: RecommendationsPanelProps) {
  
  const getRecommendations = (workflowType: WorkflowType): Recommendation[] => {
    switch (workflowType) {
      case 'client':
        return [
          {
            id: 'kyc-workflow',
            title: 'Implement KYC Verification',
            description: 'Critical missing workflow causing 30% user drop-off',
            priority: 'high',
            category: 'missing',
            impact: 'Reduces user completion by 30%',
            effort: 'high',
            actionItems: [
              'Create document upload interface',
              'Implement identity verification API',
              'Build security setup workflow',
              'Add progress tracking'
            ]
          },
          {
            id: 'investment-form',
            title: 'Fix Investment Request Form',
            description: 'Submit Interest button is inactive, causing 88% drop-off',
            priority: 'high',
            category: 'broken',
            impact: 'Blocks primary conversion funnel',
            effort: 'medium',
            actionItems: [
              'Connect Submit Interest button',
              'Create investment application form',
              'Implement due diligence workflow',
              'Add approval notifications'
            ]
          },
          {
            id: 'payment-gateway',
            title: 'Add Payment Processing',
            description: 'Complete fund transfer and confirmation system',
            priority: 'high',
            category: 'missing',
            impact: 'Prevents investment completion',
            effort: 'high',
            actionItems: [
              'Integrate payment gateway',
              'Build fund confirmation system',
              'Add receipt generation',
              'Implement transaction tracking'
            ]
          },
          {
            id: 'withdrawal-workflow',
            title: 'Build Exit Strategy Workflow',
            description: 'Missing withdrawal and reinvestment options',
            priority: 'medium',
            category: 'missing',
            impact: 'Affects investor retention',
            effort: 'medium',
            actionItems: [
              'Create withdrawal request system',
              'Build reinvestment options',
              'Implement referral program',
              'Add exit strategy dashboard'
            ]
          }
        ]
      
      case 'admin':
        return [
          {
            id: 'kyc-review',
            title: 'Build KYC Review Dashboard',
            description: 'Admins cannot review or approve investor applications',
            priority: 'high',
            category: 'missing',
            impact: 'Blocks investor onboarding',
            effort: 'medium',
            actionItems: [
              'Create KYC review interface',
              'Add approve/reject functionality',
              'Build document viewer',
              'Implement approval notifications'
            ]
          },
          {
            id: 'user-management',
            title: 'Complete User Management',
            description: 'User editing and role assignment workflows incomplete',
            priority: 'medium',
            category: 'broken',
            impact: 'Administrative inefficiency',
            effort: 'low',
            actionItems: [
              'Fix user editing workflow',
              'Connect role assignment',
              'Add bulk user operations',
              'Implement user permissions'
            ]
          },
          {
            id: 'investment-oversight',
            title: 'Create Investment Oversight',
            description: 'No dashboard for monitoring investment activities',
            priority: 'high',
            category: 'missing',
            impact: 'Lack of investment visibility',
            effort: 'high',
            actionItems: [
              'Build investment dashboard',
              'Create approval workflows',
              'Add performance monitoring',
              'Implement risk assessment'
            ]
          }
        ]
      
      case 'project_manager':
        return [
          {
            id: 'milestone-creation',
            title: 'Add Milestone Management',
            description: 'Missing milestone creation and tracking functionality',
            priority: 'high',
            category: 'missing',
            impact: 'Poor project tracking',
            effort: 'medium',
            actionItems: [
              'Create milestone interface',
              'Add deadline tracking',
              'Implement progress updates',
              'Build completion notifications'
            ]
          },
          {
            id: 'tender-management',
            title: 'Build Tender Workflow',
            description: 'Supplier approval and tender management missing',
            priority: 'medium',
            category: 'missing',
            impact: 'Manual supplier processes',
            effort: 'high',
            actionItems: [
              'Create tender interface',
              'Add supplier approval workflow',
              'Build bid evaluation system',
              'Implement contract management'
            ]
          }
        ]
      
      case 'real_estate_agent':
        return [
          {
            id: 'dld-integration',
            title: 'Implement DLD Integration',
            description: 'Property sourcing via DLD not connected',
            priority: 'high',
            category: 'missing',
            impact: 'Manual property curation',
            effort: 'high',
            actionItems: [
              'Connect DLD API',
              'Build property sync workflow',
              'Add property validation',
              'Implement automated updates'
            ]
          },
          {
            id: 'commission-tracking',
            title: 'Build Commission System',
            description: 'No commission tracking or payment system',
            priority: 'medium',
            category: 'missing',
            impact: 'Manual commission management',
            effort: 'medium',
            actionItems: [
              'Create commission dashboard',
              'Add payment tracking',
              'Build performance reports',
              'Implement commission calculations'
            ]
          },
          {
            id: 'listing-management',
            title: 'Fix Add Listing Button',
            description: 'Add Listing functionality is inactive',
            priority: 'medium',
            category: 'broken',
            impact: 'Cannot add new properties',
            effort: 'low',
            actionItems: [
              'Connect Add Listing button',
              'Create listing form',
              'Add property validation',
              'Implement listing approval'
            ]
          }
        ]
      
      case 'partner':
        return [
          {
            id: 'partner-application',
            title: 'Complete Partner Registration',
            description: 'Partner application form incomplete',
            priority: 'medium',
            category: 'broken',
            impact: 'Partner onboarding blocked',
            effort: 'medium',
            actionItems: [
              'Complete application form',
              'Add credential upload',
              'Implement background verification',
              'Build approval workflow'
            ]
          },
          {
            id: 'tender-system',
            title: 'Build Tender Participation',
            description: 'Partners cannot receive or respond to tenders',
            priority: 'high',
            category: 'missing',
            impact: 'No partner engagement',
            effort: 'high',
            actionItems: [
              'Create tender invitation system',
              'Build bid submission interface',
              'Add contract negotiation',
              'Implement project tracking'
            ]
          }
        ]
      
      default:
        return []
    }
  }

  const recommendations = getRecommendations(selectedWorkflow)

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'missing':
        return <AlertTriangle className="h-3 w-3" />
      case 'broken':
        return <Zap className="h-3 w-3" />
      case 'optimization':
        return <TrendingUp className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low Effort</Badge>
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium Effort</Badge>
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Effort</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Sort recommendations by priority
  const sortedRecommendations = recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Recommendations
        </CardTitle>
        <CardDescription>
          Priority fixes and improvements for {selectedWorkflow.replace('_', ' ')} workflow
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedRecommendations.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="text-sm">All workflows are optimized!</p>
          </div>
        ) : (
          sortedRecommendations.map((rec) => (
            <Card key={rec.id} className="border-l-4 border-l-orange-500">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(rec.priority)}
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                  
                  {/* Impact & Effort */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getCategoryIcon(rec.category)}
                        {rec.category}
                      </Badge>
                    </div>
                    {getEffortBadge(rec.effort)}
                  </div>
                  
                  {/* Impact */}
                  <div className="bg-muted/50 p-2 rounded text-xs">
                    <strong>Impact:</strong> {rec.impact}
                  </div>
                  
                  {/* Action Items */}
                  <div>
                    <h5 className="text-xs font-medium mb-2">Action Items:</h5>
                    <ul className="space-y-1">
                      {rec.actionItems.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-xs flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                      {rec.actionItems.length > 3 && (
                        <li className="text-xs text-muted-foreground">
                          +{rec.actionItems.length - 3} more items...
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => alert(`Starting implementation for: ${rec.title}\n\nAction items:\n${rec.actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}`)}
                  >
                    Start Implementation
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  )
}