import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Building, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

const systemStats = [
  {
    title: 'Total Users',
    value: '348',
    change: '+23%',
    icon: Users,
    color: 'text-blue-600',
    breakdown: {
      'Staff': 89,
      'Investors': 145,
      'Clients': 67,
      'Partners': 47
    }
  },
  {
    title: 'Active Projects',
    value: '42',
    change: '+8%',
    icon: Building,
    color: 'text-green-600',
    breakdown: {
      'Design Phase': 12,
      'Construction': 18,
      'Completion': 8,
      'Planning': 4
    }
  },
  {
    title: 'Monthly Revenue',
    value: '$4.2M',
    change: '+28%',
    icon: DollarSign,
    color: 'text-purple-600',
    breakdown: {
      'New Investments': 2800000,
      'Project Fees': 900000,
      'Partnerships': 500000
    }
  },
  {
    title: 'System Health',
    value: '99.8%',
    change: '+0.3%',
    icon: TrendingUp,
    color: 'text-emerald-600',
    breakdown: {
      'Database': 99.9,
      'API': 99.7,
      'Storage': 100,
      'Network': 99.8
    }
  }
];

const recentActivities = [
  {
    id: '1',
    type: 'user_created',
    description: 'New investor account created',
    user: 'Michael Chen',
    timestamp: '5 minutes ago',
    status: 'success'
  },
  {
    id: '2',
    type: 'project_approved',
    description: 'Palm Jumeirah Villa project approved',
    user: 'Sarah Johnson',
    timestamp: '12 minutes ago',
    status: 'success'
  },
  {
    id: '3',
    type: 'payment_pending',
    description: 'Payment verification required',
    user: 'Finance Team',
    timestamp: '1 hour ago',
    status: 'warning'
  },
  {
    id: '4',
    type: 'kyc_completed',
    description: 'KYC verification completed',
    user: 'Emma Wilson',
    timestamp: '2 hours ago',
    status: 'success'
  }
];

const statusIcons = {
  success: CheckCircle,
  warning: AlertCircle,
  pending: Clock
};

const statusColors = {
  success: 'text-green-600',
  warning: 'text-yellow-600',
  pending: 'text-blue-600'
};

export function SystemOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">System Overview</h2>
        <p className="text-muted-foreground">Monitor platform performance and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Database Performance</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>API Response Time</span>
                <span>87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Storage Usage</span>
                <span>72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Backup Status</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activities</CardTitle>
            <CardDescription>Latest platform events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const StatusIcon = statusIcons[activity.status as keyof typeof statusIcons];
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <StatusIcon className={`h-4 w-4 mt-1 ${statusColors[activity.status as keyof typeof statusColors]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user} • {activity.timestamp}
                      </p>
                    </div>
                    <Badge 
                      variant={activity.status === 'success' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}