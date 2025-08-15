import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import { RoleViewSwitcher } from "@/components/RoleViewSwitcher"
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  MessageSquare,
  Bell,
  Eye,
  Download,
  Target,
  BarChart3,
  Shield,
  Star,
  PieChart
} from "lucide-react"

// Role-based quick actions
const getQuickActionsForRole = (role: string) => {
  const commonActions = [
    { icon: Calendar, label: "Schedule", color: "bg-cyan-500" },
    { icon: MessageSquare, label: "Messages", color: "bg-pink-500" }
  ];

  const roleSpecificActions = {
    administrator: [
      { icon: Building2, label: "New Project", color: "bg-blue-500" },
      { icon: Users, label: "Team Meeting", color: "bg-green-500" },
      { icon: FileText, label: "Reports", color: "bg-purple-500" },
      { icon: Download, label: "Export Data", color: "bg-orange-500" },
      ...commonActions
    ],
    project_manager: [
      { icon: Building2, label: "New Project", color: "bg-blue-500" },
      { icon: Users, label: "Team Meeting", color: "bg-green-500" },
      { icon: CheckCircle, label: "QA Check", color: "bg-green-500" },
      ...commonActions
    ],
    investor: [
      { icon: TrendingUp, label: "Portfolio", color: "bg-green-500" },
      { icon: FileText, label: "Reports", color: "bg-purple-500" },
      { icon: Download, label: "Export Data", color: "bg-orange-500" },
      ...commonActions
    ],
    real_estate_director: [
      { icon: Building2, label: "Properties", color: "bg-blue-500" },
      { icon: Target, label: "Opportunities", color: "bg-orange-500" },
      { icon: BarChart3, label: "Analytics", color: "bg-purple-500" },
      ...commonActions
    ],
    client: [
      { icon: Eye, label: "Progress", color: "bg-blue-500" },
      { icon: FileText, label: "Documents", color: "bg-purple-500" },
      ...commonActions
    ],
    real_estate_agent: [
      { icon: Building2, label: "Listings", color: "bg-blue-500" },
      { icon: Users, label: "Clients", color: "bg-green-500" },
      { icon: Target, label: "Opportunities", color: "bg-orange-500" },
      ...commonActions
    ]
  };

  return roleSpecificActions[role as keyof typeof roleSpecificActions] || commonActions;
};

interface UnifiedDashboardProps {
  viewingRole?: string
  onRoleChange?: (role: string) => void
}

export function UnifiedDashboard({ viewingRole: propViewingRole, onRoleChange }: UnifiedDashboardProps = {}) {
  const { user } = useAuth()
  const [internalViewingRole, setInternalViewingRole] = useState<string>(user?.role || 'administrator')
  
  const viewingRole = propViewingRole || internalViewingRole
  const setViewingRole = onRoleChange || setInternalViewingRole
  
  // Comprehensive data for all role types
  const dashboardData = {
    administrator: {
      title: "Executive Dashboard",
      subtitle: "Complete system oversight and strategic decision making",
      stats: [
        { label: "Total Properties", value: "156", change: "+12", icon: Building2, color: "text-blue-500" },
        { label: "Active Projects", value: "24", change: "+3", icon: Target, color: "text-green-500" },
        { label: "System Users", value: "89", change: "+7", icon: Users, color: "text-purple-500" },
        { label: "Monthly Revenue", value: "$2.8M", change: "+15%", icon: DollarSign, color: "text-emerald-500" },
        { label: "System Health", value: "98%", change: "+1%", icon: Shield, color: "text-cyan-500" },
        { label: "ROI Average", value: "22.4%", change: "+2.1%", icon: TrendingUp, color: "text-orange-500" }
      ],
      insights: [
        { title: "Property Portfolio Growth", value: "15% increase", trend: "up", description: "Strong market performance in Q4" },
        { title: "Project Completion Rate", value: "94% on-time", trend: "up", description: "Improved efficiency metrics" },
        { title: "User Satisfaction", value: "4.8/5 rating", trend: "stable", description: "Consistent quality delivery" },
        { title: "System Performance", value: "99.2% uptime", trend: "up", description: "Excellent infrastructure reliability" }
      ]
    },
    project_manager: {
      title: "Project Management Hub",
      subtitle: "Track progress, coordinate teams, and deliver excellence",
      stats: [
        { label: "Active Projects", value: "8", change: "+2", icon: Building2, color: "text-blue-500" },
        { label: "Team Members", value: "24", change: "+3", icon: Users, color: "text-green-500" },
        { label: "Completion Rate", value: "94%", change: "+5%", icon: CheckCircle, color: "text-emerald-500" },
        { label: "Budget Utilization", value: "87%", change: "-3%", icon: DollarSign, color: "text-orange-500" },
        { label: "Avg Project Time", value: "4.2 months", change: "-0.5", icon: Clock, color: "text-purple-500" },
        { label: "Client Satisfaction", value: "4.9/5", change: "+0.2", icon: Star, color: "text-yellow-500" }
      ],
      insights: [
        { title: "Project Velocity", value: "12% faster", trend: "up", description: "Streamlined processes showing results" },
        { title: "Resource Allocation", value: "Optimized", trend: "up", description: "Better team utilization achieved" },
        { title: "Risk Mitigation", value: "3 issues resolved", trend: "up", description: "Proactive risk management" },
        { title: "Quality Score", value: "97.5%", trend: "stable", description: "Maintaining high standards" }
      ]
    },
    investor: {
      title: "Investment Portfolio",
      subtitle: "Track returns, analyze performance, and grow wealth",
      stats: [
        { label: "Portfolio Value", value: "$3.4M", change: "+$280K", icon: TrendingUp, color: "text-green-500" },
        { label: "Total ROI", value: "21.4%", change: "+2.8%", icon: DollarSign, color: "text-emerald-500" },
        { label: "Properties", value: "4", change: "+1", icon: Building2, color: "text-blue-500" },
        { label: "Monthly Income", value: "$24.5K", change: "+$3.2K", icon: Target, color: "text-purple-500" },
        { label: "Investment Growth", value: "18.2%", change: "+1.5%", icon: BarChart3, color: "text-orange-500" },
        { label: "Market Position", value: "Top 15%", change: "+3%", icon: Star, color: "text-yellow-500" }
      ],
      insights: [
        { title: "Best Performer", value: "Palm Villa (+46.7%)", trend: "up", description: "Exceptional luxury market growth" },
        { title: "Diversification Score", value: "Excellent", trend: "up", description: "Well-balanced portfolio mix" },
        { title: "Market Outlook", value: "Bullish", trend: "up", description: "Strong growth projected for 2025" },
        { title: "Liquidity Position", value: "Healthy", trend: "stable", description: "Good cash flow management" }
      ]
    },
    real_estate_director: {
      title: "Real Estate Operations",
      subtitle: "Market analysis, property optimization, and strategic growth",
      stats: [
        { label: "Property Portfolio", value: "156", change: "+12", icon: Building2, color: "text-blue-500" },
        { label: "Market Value", value: "$42.8M", change: "+8.5%", icon: DollarSign, color: "text-green-500" },
        { label: "Occupancy Rate", value: "94.2%", change: "+2.1%", icon: Target, color: "text-emerald-500" },
        { label: "New Opportunities", value: "23", change: "+7", icon: TrendingUp, color: "text-purple-500" },
        { label: "Avg ROI", value: "18.7%", change: "+1.2%", icon: BarChart3, color: "text-orange-500" },
        { label: "Market Share", value: "12.4%", change: "+0.8%", icon: PieChart, color: "text-cyan-500" }
      ],
      insights: [
        { title: "Market Trends", value: "Growth phase", trend: "up", description: "Dubai luxury market expanding" },
        { title: "Property Appreciation", value: "12.4% annually", trend: "up", description: "Above market average performance" },
        { title: "Investment Pipeline", value: "$15M committed", trend: "up", description: "Strong upcoming acquisitions" },
        { title: "Portfolio Balance", value: "Optimized", trend: "stable", description: "Ideal risk-return ratio achieved" }
      ]
    },
    client: {
      title: "My Projects",
      subtitle: "Track your renovation progress and communicate with your team",
      stats: [
        { label: "Active Projects", value: "2", change: "+1", icon: Building2, color: "text-blue-500" },
        { label: "Completion", value: "65%", change: "+15%", icon: CheckCircle, color: "text-green-500" },
        { label: "Budget Used", value: "72%", change: "+8%", icon: DollarSign, color: "text-orange-500" },
        { label: "Days Remaining", value: "45", change: "-5", icon: Calendar, color: "text-purple-500" },
        { label: "Team Rating", value: "4.9/5", change: "+0.1", icon: Star, color: "text-yellow-500" },
        { label: "Updates", value: "12", change: "+3", icon: Bell, color: "text-cyan-500" }
      ],
      insights: [
        { title: "Project Progress", value: "On Schedule", trend: "up", description: "Downtown apartment renovation proceeding well" },
        { title: "Quality Checks", value: "100% passed", trend: "up", description: "All inspections completed successfully" },
        { title: "Budget Management", value: "Within limits", trend: "stable", description: "Careful cost control maintained" },
        { title: "Next Milestone", value: "Kitchen install", trend: "up", description: "Scheduled for next week" }
      ]
    },
    real_estate_agent: {
      title: "Sales Dashboard",
      subtitle: "Manage clients, track sales, and grow your business",
      stats: [
        { label: "Active Listings", value: "28", change: "+5", icon: Building2, color: "text-blue-500" },
        { label: "Closed Deals", value: "12", change: "+4", icon: CheckCircle, color: "text-green-500" },
        { label: "Pipeline Value", value: "$8.4M", change: "+$1.2M", icon: DollarSign, color: "text-emerald-500" },
        { label: "Client Meetings", value: "15", change: "+8", icon: Users, color: "text-purple-500" },
        { label: "Commission", value: "$124K", change: "+$18K", icon: Target, color: "text-orange-500" },
        { label: "Client Rating", value: "4.8/5", change: "+0.3", icon: Star, color: "text-yellow-500" }
      ],
      insights: [
        { title: "Sales Performance", value: "125% of target", trend: "up", description: "Exceeding quarterly goals" },
        { title: "Client Acquisition", value: "8 new clients", trend: "up", description: "Strong referral network growth" },
        { title: "Market Activity", value: "High demand", trend: "up", description: "Luxury segment very active" },
        { title: "Conversion Rate", value: "68%", trend: "up", description: "Above industry average" }
      ]
    }
  }

  const currentData = dashboardData[viewingRole as keyof typeof dashboardData] || dashboardData.administrator

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success" />
      case 'down': return <TrendingDown className="h-4 w-4 text-destructive" />
      default: return <div className="h-4 w-4 rounded-full bg-muted" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Role View Switcher - Only visible to administrators */}
      {user?.role === 'administrator' && (
        <RoleViewSwitcher currentRole={viewingRole} onRoleChange={setViewingRole} />
      )}

      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-playfair">
            {getWelcomeMessage()}, {user?.name}
          </h1>
          <p className="text-muted-foreground font-montserrat">
            {currentData.subtitle}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="capitalize">
              {viewingRole.replace('_', ' ')}
            </Badge>
            {viewingRole !== user?.role && (
              <Badge variant="secondary">Preview Mode</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <a href="/notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="/messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </a>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {currentData.stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-success' : stat.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {stat.change}
                  </p>
                </div>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strategic Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Strategic Insights & Decision Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentData.insights.map((insight, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{insight.title}</h3>
                  {getTrendIcon(insight.trend)}
                </div>
                <p className="text-lg font-bold mb-1">{insight.value}</p>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role-Specific Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {(viewingRole === 'administrator' || viewingRole === 'project_manager' || viewingRole === 'real_estate_director') && (
            <TabsTrigger value="performance">Performance</TabsTrigger>
          )}
          {(viewingRole === 'administrator' || viewingRole === 'investor' || viewingRole === 'real_estate_director') && (
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          )}
          <TabsTrigger value="actions">Quick Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Activity {item}</p>
                        <p className="text-xs text-muted-foreground">Description of recent activity</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Priority Task {item}</p>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                      </div>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {(viewingRole === 'administrator' || viewingRole === 'project_manager' || viewingRole === 'real_estate_director') && (
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-dashed border-border">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-muted-foreground">Performance Charts</p>
                    <p className="text-sm text-muted-foreground/70">Interactive analytics would display here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {(viewingRole === 'administrator' || viewingRole === 'investor' || viewingRole === 'real_estate_director') && (
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center border border-dashed border-border">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p className="text-muted-foreground">Trend Charts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribution Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center border border-dashed border-border">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p className="text-muted-foreground">Distribution Charts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {getQuickActionsForRole(viewingRole).map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:shadow-md transition-shadow"
                  >
                    <div className={`p-2 rounded-lg ${action.color} text-white`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-center">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}