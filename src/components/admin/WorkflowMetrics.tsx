import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Target,
  Zap,
  Timer
} from 'lucide-react'

type WorkflowType = 'client' | 'investor' | 'admin' | 'project_manager' | 'real_estate_agent' | 'partner'

interface MetricCard {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'neutral'
  icon: any
  description: string
  color: string
}

interface WorkflowMetricsProps {
  workflowType: WorkflowType
}

export function WorkflowMetrics({ workflowType }: WorkflowMetricsProps) {
  
  const getMetrics = (type: WorkflowType): MetricCard[] => {
    switch (type) {
      case 'client':
        return [
          {
            title: 'Conversion Rate',
            value: '23%',
            change: -15,
            trend: 'down',
            icon: Target,
            description: 'Sign-up to investment completion',
            color: 'text-red-600'
          },
          {
            title: 'Drop-off at KYC',
            value: '30%',
            change: 8,
            trend: 'up',
            icon: AlertTriangle,
            description: 'Users abandoning at verification',
            color: 'text-red-600'
          },
          {
            title: 'Avg. Completion Time',
            value: '14 days',
            change: 5,
            trend: 'up',
            icon: Clock,
            description: 'Time from signup to investment',
            color: 'text-yellow-600'
          },
          {
            title: 'Investment Requests',
            value: '12%',
            change: -75,
            trend: 'down',
            icon: TrendingDown,
            description: 'Users reaching investment stage',
            color: 'text-red-600'
          },
          {
            title: 'Approval Rate',
            value: '78%',
            change: 12,
            trend: 'up',
            icon: CheckCircle,
            description: 'Admin approval success rate',
            color: 'text-green-600'
          },
          {
            title: 'Reactivation Rate',
            value: '0%',
            change: 0,
            trend: 'neutral',
            icon: Users,
            description: 'Users returning after drop-off',
            color: 'text-gray-600'
          }
        ]
      
      case 'admin':
        return [
          {
            title: 'User Processing Time',
            value: '2.3 days',
            change: -12,
            trend: 'down',
            icon: Timer,
            description: 'Avg time to process new users',
            color: 'text-green-600'
          },
          {
            title: 'KYC Backlog',
            value: '47',
            change: 23,
            trend: 'up',
            icon: AlertTriangle,
            description: 'Pending KYC applications',
            color: 'text-red-600'
          },
          {
            title: 'Admin Efficiency',
            value: '67%',
            change: -8,
            trend: 'down',
            icon: BarChart3,
            description: 'Task completion rate',
            color: 'text-yellow-600'
          },
          {
            title: 'Document Processing',
            value: '4.7 hours',
            change: 15,
            trend: 'up',
            icon: Clock,
            description: 'Avg document review time',
            color: 'text-red-600'
          },
          {
            title: 'Investment Approvals',
            value: '89%',
            change: 5,
            trend: 'up',
            icon: CheckCircle,
            description: 'Investment approval rate',
            color: 'text-green-600'
          },
          {
            title: 'System Errors',
            value: '23',
            change: -18,
            trend: 'down',
            icon: Zap,
            description: 'Weekly workflow errors',
            color: 'text-green-600'
          }
        ]
      
      case 'project_manager':
        return [
          {
            title: 'Project Completion',
            value: '76%',
            change: 8,
            trend: 'up',
            icon: CheckCircle,
            description: 'On-time project delivery',
            color: 'text-green-600'
          },
          {
            title: 'Budget Variance',
            value: '+12%',
            change: 4,
            trend: 'up',
            icon: TrendingUp,
            description: 'Average budget overrun',
            color: 'text-red-600'
          },
          {
            title: 'QA Response Time',
            value: '1.8 days',
            change: -22,
            trend: 'down',
            icon: Timer,
            description: 'Time to respond to QA issues',
            color: 'text-green-600'
          },
          {
            title: 'Milestone Adherence',
            value: '68%',
            change: -5,
            trend: 'down',
            icon: Target,
            description: 'Milestones met on schedule',
            color: 'text-yellow-600'
          },
          {
            title: 'Supplier Issues',
            value: '14',
            change: 8,
            trend: 'up',
            icon: AlertTriangle,
            description: 'Active supplier problems',
            color: 'text-red-600'
          },
          {
            title: 'Client Satisfaction',
            value: '4.2/5',
            change: 3,
            trend: 'up',
            icon: Users,
            description: 'Average client rating',
            color: 'text-green-600'
          }
        ]
      
      case 'real_estate_agent':
        return [
          {
            title: 'Property Conversion',
            value: '34%',
            change: -12,
            trend: 'down',
            icon: Target,
            description: 'Properties to opportunities',
            color: 'text-red-600'
          },
          {
            title: 'Commission Earned',
            value: 'AED 45K',
            change: 18,
            trend: 'up',
            icon: TrendingUp,
            description: 'Monthly commission total',
            color: 'text-green-600'
          },
          {
            title: 'Listing Response Time',
            value: '6.2 hours',
            change: 25,
            trend: 'up',
            icon: Clock,
            description: 'Time to respond to inquiries',
            color: 'text-red-600'
          },
          {
            title: 'Property Match Rate',
            value: '67%',
            change: 8,
            trend: 'up',
            icon: CheckCircle,
            description: 'Investor-property matches',
            color: 'text-green-600'
          },
          {
            title: 'Pipeline Value',
            value: 'AED 2.3M',
            change: 12,
            trend: 'up',
            icon: BarChart3,
            description: 'Total opportunities value',
            color: 'text-green-600'
          },
          {
            title: 'Market Coverage',
            value: '23%',
            change: 5,
            trend: 'up',
            icon: Users,
            description: 'Market share in area',
            color: 'text-green-600'
          }
        ]
      
      case 'partner':
        return [
          {
            title: 'Bid Success Rate',
            value: '42%',
            change: -8,
            trend: 'down',
            icon: Target,
            description: 'Successful tender bids',
            color: 'text-yellow-600'
          },
          {
            title: 'Project Participation',
            value: '7',
            change: 15,
            trend: 'up',
            icon: Users,
            description: 'Active projects',
            color: 'text-green-600'
          },
          {
            title: 'Delivery Performance',
            value: '89%',
            change: 3,
            trend: 'up',
            icon: CheckCircle,
            description: 'On-time deliveries',
            color: 'text-green-600'
          },
          {
            title: 'Invoice Processing',
            value: '3.2 days',
            change: -18,
            trend: 'down',
            icon: Timer,
            description: 'Time to process payments',
            color: 'text-green-600'
          },
          {
            title: 'Quality Score',
            value: '4.6/5',
            change: 7,
            trend: 'up',
            icon: BarChart3,
            description: 'Average quality rating',
            color: 'text-green-600'
          },
          {
            title: 'Revenue Growth',
            value: '+28%',
            change: 12,
            trend: 'up',
            icon: TrendingUp,
            description: 'YoY revenue increase',
            color: 'text-green-600'
          }
        ]
      
      default:
        return []
    }
  }

  const metrics = getMetrics(workflowType)

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
        <p className="text-sm text-muted-foreground">
          Key performance indicators for {workflowType.replace('_', ' ')} workflows
        </p>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-2 text-xs">
                  {getTrendIcon(metric.trend)}
                  <span className={getChangeColor(metric.change)}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-muted-foreground">vs last period</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Bottlenecks Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Bottleneck Analysis
          </CardTitle>
          <CardDescription>
            Critical workflow bottlenecks affecting performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Top Bottleneck */}
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
              <div className="flex-1">
                <h4 className="font-medium text-sm">Critical Bottleneck</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {workflowType === 'client' ? 'KYC verification causing 30% drop-off' :
                   workflowType === 'admin' ? 'Manual KYC review creating backlog' :
                   workflowType === 'project_manager' ? 'Milestone tracking causing delays' :
                   workflowType === 'real_estate_agent' ? 'DLD integration missing' :
                   'Tender workflow not implemented'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">High Impact</Badge>
                  <span className="text-xs text-muted-foreground">
                    Estimated {workflowType === 'client' ? '30%' : '25%'} efficiency loss
                  </span>
                </div>
              </div>
            </div>
            
            {/* Secondary Bottleneck */}
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
              <div className="flex-1">
                <h4 className="font-medium text-sm">Secondary Issue</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {workflowType === 'client' ? 'Investment request form not connected' :
                   workflowType === 'admin' ? 'User management workflow incomplete' :
                   workflowType === 'project_manager' ? 'Supplier approval process missing' :
                   workflowType === 'real_estate_agent' ? 'Commission tracking not implemented' :
                   'Partner registration incomplete'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">Medium Impact</Badge>
                  <span className="text-xs text-muted-foreground">
                    Estimated {workflowType === 'client' ? '15%' : '12%'} efficiency loss
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}