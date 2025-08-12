
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Shield,
  Globe,
  Target,
  FileText,
  MessageSquare,
  Bell,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardStats } from '@/components/DashboardStats';
import { RecentActivities } from '@/components/RecentActivities';
import { PropertyOverview } from '@/components/PropertyOverview';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Required</h2>
          <p className="text-muted-foreground">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleBasedActions = () => {
    switch (user.role) {
      case 'administrator':
        return [
          { title: 'System Overview', icon: Shield, href: '/admin/system', color: 'bg-red-500' },
          { title: 'User Management', icon: Users, href: '/admin/detailed-users', color: 'bg-blue-500' },
          { title: 'Analytics', icon: BarChart3, href: '/analytics', color: 'bg-green-500' },
          { title: 'Properties', icon: Building, href: '/admin/properties', color: 'bg-purple-500' },
          { title: 'Marketing', icon: Target, href: '/marketing', color: 'bg-orange-500' },
          { title: 'Traffic Analytics', icon: Globe, href: '/traffic-analytics', color: 'bg-cyan-500' }
        ];
      case 'real_estate_director':
        return [
          { title: 'Properties', icon: Building, href: '/properties', color: 'bg-blue-500' },
          { title: 'Opportunities', icon: Target, href: '/opportunities', color: 'bg-green-500' },
          { title: 'Projects', icon: FileText, href: '/dashboard/projects', color: 'bg-purple-500' },
          { title: 'Financial Reports', icon: DollarSign, href: '/financial', color: 'bg-orange-500' }
        ];
      case 'project_manager':
        return [
          { title: 'Project Management', icon: FileText, href: '/project-management', color: 'bg-blue-500' },
          { title: 'Projects', icon: Building, href: '/dashboard/projects', color: 'bg-green-500' },
          { title: 'Team', icon: Users, href: '/team', color: 'bg-purple-500' },
          { title: 'QA', icon: CheckCircle, href: '/qa', color: 'bg-orange-500' }
        ];
      case 'investor':
        return [
          { title: 'Portfolio', icon: TrendingUp, href: '/portfolio', color: 'bg-green-500' },
          { title: 'Properties', icon: Building, href: '/properties', color: 'bg-blue-500' },
          { title: 'Financial Reports', icon: DollarSign, href: '/financial', color: 'bg-purple-500' },
          { title: 'Opportunities', icon: Target, href: '/opportunities', color: 'bg-orange-500' }
        ];
      default:
        return [
          { title: 'Projects', icon: FileText, href: '/dashboard/projects', color: 'bg-blue-500' },
          { title: 'Properties', icon: Building, href: '/properties', color: 'bg-green-500' },
          { title: 'Documents', icon: FileText, href: '/documents', color: 'bg-purple-500' },
          { title: 'Messages', icon: MessageSquare, href: '/messages', color: 'bg-orange-500' }
        ];
    }
  };

  const roleActions = getRoleBasedActions();

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-playfair">
            {getWelcomeMessage()}, {user.name}
          </h1>
          <p className="text-muted-foreground font-montserrat">
            Welcome to your Luxury Labs dashboard
          </p>
          <Badge variant="outline" className="mt-2 capitalize">
            {user.role.replace('_', ' ')}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link to="/notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Role-Based Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {roleActions.map((action, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                className="h-20 flex-col gap-2 hover:shadow-md transition-shadow"
              >
                <Link to={action.href}>
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-center">{action.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Overview */}
        <PropertyOverview />

        {/* Recent Activities */}
        <RecentActivities />
      </div>

      {/* Admin-Only System Status */}
      {user.role === 'administrator' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">System Online</p>
                  <p className="text-sm text-green-600">All services operational</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">Active Users</p>
                  <p className="text-sm text-blue-600">Real-time monitoring</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-semibold text-purple-800">Analytics</p>
                  <p className="text-sm text-purple-600">Performance metrics</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border">
                <Globe className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="font-semibold text-orange-800">Global Status</p>
                  <p className="text-sm text-orange-600">All regions active</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex gap-4">
              <Button asChild variant="outline">
                <Link to="/admin/system">
                  <Shield className="h-4 w-4 mr-2" />
                  System Overview
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/admin/detailed-users">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/admin/system-settings">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
