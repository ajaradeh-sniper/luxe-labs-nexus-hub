import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { 
  User,
  TrendingUp, 
  DollarSign, 
  Target,
  Eye,
  MessageSquare,
  Calendar,
  Star,
  FileText,
  CheckCircle,
  Clock,
  Camera,
  ThumbsUp,
  AlertTriangle,
  BarChart3,
  Building,
  Zap,
  MapPin,
  Phone,
  Video,
  Download,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Wallet,
  CreditCard,
  Trophy,
  Gift
} from "lucide-react"

const ClientProfile = () => {
  const { user } = useAuth()
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y')

  // Portfolio data
  const portfolioData = {
    totalValue: 2850000,
    totalInvested: 2200000,
    totalGains: 650000,
    gainsPercentage: 29.5,
    activeInvestments: 5,
    completedProjects: 3,
    monthlyCashflow: 15000
  }

  // Investment breakdown
  const investments = [
    {
      id: 1,
      type: "Luxury Villa Renovation",
      location: "Palm Jumeirah",
      invested: 850000,
      currentValue: 1150000,
      roi: 35.3,
      status: "Active",
      duration: "18 months",
      image: "/assets/palm-jumeirah-villa.jpg"
    },
    {
      id: 2,
      type: "Downtown Apartment",
      location: "Downtown Dubai",
      invested: 650000,
      currentValue: 780000,
      roi: 20.0,
      status: "In Progress", 
      duration: "12 months",
      image: "/assets/downtown-luxury.jpg"
    },
    {
      id: 3,
      type: "Business Bay Office",
      location: "Business Bay",
      invested: 450000,
      currentValue: 520000,
      roi: 15.6,
      status: "Design Phase",
      duration: "8 months",
      image: "/assets/business-bay.jpg"
    }
  ]

  // Current projects
  const currentProjects = [
    {
      id: 1,
      name: "Palm Villa Transformation",
      progress: 85,
      nextMilestone: "Final Inspection",
      daysRemaining: 12,
      status: "Nearly Complete"
    },
    {
      id: 2,
      name: "Downtown Penthouse",
      progress: 45,
      nextMilestone: "Kitchen Installation", 
      daysRemaining: 28,
      status: "In Progress"
    }
  ]

  // Available opportunities (posted by admin)
  const opportunities = [
    {
      id: 1,
      title: "Emirates Hills Villa Development",
      minInvestment: 500000,
      expectedRoi: "25-35%",
      duration: "24 months",
      category: "Luxury Residential",
      spotsAvailable: 3,
      totalSpots: 5,
      description: "Premium villa renovation in Emirates Hills with luxury finishes",
      riskLevel: "Medium",
      image: "/assets/emirates-hills-villa.jpg"
    },
    {
      id: 2,
      title: "Dubai Marina Penthouse Flip",
      minInvestment: 750000,
      expectedRoi: "30-40%",
      duration: "18 months",
      category: "Penthouse",
      spotsAvailable: 2,
      totalSpots: 4,
      description: "High-end penthouse transformation with panoramic views",
      riskLevel: "Medium-High",
      image: "/assets/dubai-marina-luxury.jpg"
    }
  ]

  // Performance metrics
  const performanceData = [
    { period: "This Month", value: 12500, change: 8.2, positive: true },
    { period: "Last Quarter", value: 35000, change: 15.1, positive: true },
    { period: "This Year", value: 180000, change: 22.3, positive: true },
    { period: "All Time", value: 650000, change: 29.5, positive: true }
  ]

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-elegant rounded-xl">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Client Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name}. Here's your investment overview.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Advisor
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="gradient-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                      <p className="text-3xl font-bold text-success">
                        AED {portfolioData.totalValue.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUp className="h-4 w-4 text-success" />
                        <span className="text-sm text-success">+{portfolioData.gainsPercentage}%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-success/10 rounded-xl">
                      <Wallet className="h-8 w-8 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Gains</p>
                      <p className="text-3xl font-bold text-primary">
                        AED {portfolioData.totalGains.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm text-primary">ROI Growth</span>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Investments</p>
                      <p className="text-3xl font-bold text-warning">
                        {portfolioData.activeInvestments}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Target className="h-4 w-4 text-warning" />
                        <span className="text-sm text-warning">Projects Running</span>
                      </div>
                    </div>
                    <div className="p-3 bg-warning/10 rounded-xl">
                      <Building className="h-8 w-8 text-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Cashflow</p>
                      <p className="text-3xl font-bold text-accent">
                        AED {portfolioData.monthlyCashflow.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <DollarSign className="h-4 w-4 text-accent" />
                        <span className="text-sm text-accent">Recurring</span>
                      </div>
                    </div>
                    <div className="p-3 bg-accent/10 rounded-xl">
                      <DollarSign className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Projects Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Active Projects Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentProjects.map((project) => (
                    <div key={project.id} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{project.name}</h4>
                        <Badge variant="outline">{project.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Next: {project.nextMilestone}</span>
                        <span>{project.daysRemaining} days remaining</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Performing Investments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-success" />
                    Top Performing Investments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {investments.slice(0, 2).map((investment) => (
                    <div key={investment.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{investment.type}</h4>
                        <Badge className="bg-success/10 text-success">
                          +{investment.roi}% ROI
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {investment.location}
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Value</p>
                          <p className="font-semibold">AED {investment.currentValue.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-1 text-success">
                          <ArrowUp className="h-4 w-4" />
                          <span className="text-sm font-medium">+AED {(investment.currentValue - investment.invested).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {investments.map((investment) => (
                <Card key={investment.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <img 
                      src={investment.image} 
                      alt={investment.type}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-background/80 text-foreground">
                      {investment.status}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg">{investment.type}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {investment.location}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Invested</p>
                        <p className="font-semibold">AED {investment.invested.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="font-semibold">AED {investment.currentValue.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-success font-semibold">+{investment.roi}% ROI</span>
                      </div>
                      <Badge variant="outline">{investment.duration}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-6">
              {currentProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{project.name}</h3>
                        <p className="text-muted-foreground">Next milestone: {project.nextMilestone}</p>
                      </div>
                      <Badge>{project.status}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{project.progress}%</p>
                        <p className="text-sm text-muted-foreground">Complete</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <Clock className="h-6 w-6 mx-auto mb-2 text-warning" />
                        <p className="text-2xl font-bold">{project.daysRemaining}</p>
                        <p className="text-sm text-muted-foreground">Days Remaining</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <CheckCircle className="h-6 w-6 mx-auto mb-2 text-success" />
                        <p className="text-2xl font-bold">On Track</p>
                        <p className="text-sm text-muted-foreground">Status</p>
                      </div>
                    </div>

                    <Progress value={project.progress} className="mb-4" />
                    
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-2" />
                        View Photos
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message Team
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <img 
                      src={opportunity.image} 
                      alt={opportunity.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-background/80 text-foreground">
                      {opportunity.spotsAvailable}/{opportunity.totalSpots} spots
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg">{opportunity.title}</h3>
                      <Badge variant="outline" className="mt-2">{opportunity.category}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm">{opportunity.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Min Investment</p>
                        <p className="font-semibold">AED {opportunity.minInvestment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expected ROI</p>
                        <p className="font-semibold text-success">{opportunity.expectedRoi}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={opportunity.riskLevel === 'Medium' ? 'default' : 'destructive'}>
                          {opportunity.riskLevel} Risk
                        </Badge>
                      </div>
                      <Badge variant="outline">{opportunity.duration}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Gift className="h-4 w-4 mr-2" />
                        Express Interest
                      </Button>
                      <Button variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {performanceData.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.period}</p>
                        <p className="text-2xl font-bold">AED {metric.value.toLocaleString()}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {metric.positive ? (
                            <ArrowUp className="h-4 w-4 text-success" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-destructive" />
                          )}
                          <span className={`text-sm ${metric.positive ? 'text-success' : 'text-destructive'}`}>
                            {metric.positive ? '+' : '-'}{metric.change}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <BarChart3 className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Performance chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default ClientProfile