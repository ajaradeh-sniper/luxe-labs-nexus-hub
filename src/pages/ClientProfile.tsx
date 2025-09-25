import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Target, 
  FileText, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MessageSquare,
  Download,
  Eye,
  BarChart3,
  Clock,
  CheckCircle2
} from "lucide-react"

const ClientProfile = () => {
  // Mock data for demonstration
  const portfolioData = {
    totalInvestment: "AED 2.5M",
    currentValue: "AED 3.1M",
    totalReturn: "24.2%",
    monthlyReturn: "2.1%"
  }

  const investments = [
    {
      id: 1,
      name: "Palm Jumeirah Villa Flip",
      type: "Single Property",
      investment: "AED 1.2M",
      currentValue: "AED 1.54M",
      returns: "+28.3%",
      status: "In Progress",
      completion: 75,
      image: "/lovable-uploads/palm-jumeirah-luxury-villa.jpg"
    },
    {
      id: 2,
      name: "Dubai Hills Shared Stake",
      type: "Shared Investment", 
      investment: "AED 800K",
      currentValue: "AED 950K",
      returns: "+18.8%",
      status: "Completed",
      completion: 100,
      image: "/lovable-uploads/dubai-hills-luxury-villa.jpg"
    },
    {
      id: 3,
      name: "Emirates Hills Premium",
      type: "Diversified Fund",
      investment: "AED 500K",
      currentValue: "AED 580K", 
      returns: "+16.0%",
      status: "Active",
      completion: 60,
      image: "/lovable-uploads/emirates-hills-luxury-villa.jpg"
    }
  ]

  const opportunities = [
    {
      id: 1,
      title: "Jumeirah Islands Waterfront Villa",
      investment: "AED 15M - 25M",
      expectedReturn: "22-28%",
      duration: "8-10 months",
      status: "Invited",
      deadline: "Dec 31, 2024"
    },
    {
      id: 2,
      title: "Business Bay Luxury Apartment", 
      investment: "AED 3M - 5M",
      expectedReturn: "18-22%",
      duration: "6-8 months",
      status: "Invited",
      deadline: "Jan 15, 2025"
    }
  ]

  const quickActions = [
    { icon: MessageSquare, label: "Contact Advisor", action: () => {} },
    { icon: FileText, label: "View Documents", action: () => {} },
    { icon: Download, label: "Download Reports", action: () => {} },
    { icon: Calendar, label: "Schedule Meeting", action: () => {} }
  ]

  return (
    <>
      <Helmet>
        <title>Client Dashboard | Luxury Labs</title>
        <meta name="description" content="Your investment portfolio and opportunities with Luxury Labs Dubai" />
      </Helmet>

      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Ahmed</h1>
              <p className="text-muted-foreground">Here's your investment overview and latest opportunities</p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolioData.totalInvestment}</div>
                <p className="text-xs text-muted-foreground">Across all projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolioData.currentValue}</div>
                <p className="text-xs text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +{portfolioData.totalReturn}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+{portfolioData.totalReturn}</div>
                <p className="text-xs text-muted-foreground">Since inception</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Return</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">+{portfolioData.monthlyReturn}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Investments */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Your Investments
                  </CardTitle>
                  <CardDescription>Track your active property investments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
                        <img 
                          src={investment.image} 
                          alt={investment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{investment.name}</h4>
                          <Badge variant={investment.status === 'Completed' ? 'default' : investment.status === 'Active' ? 'secondary' : 'outline'}>
                            {investment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{investment.type}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span>Investment: {investment.investment}</span>
                          <span className="text-green-600 font-medium">{investment.returns}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={investment.completion} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">{investment.completion}%</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Performance */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="h-auto p-4 flex-col space-y-2"
                      onClick={action.action}
                    >
                      <action.icon className="h-5 w-5" />
                      <span className="text-xs text-center">{action.label}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Best Performing</span>
                      <span className="font-medium text-green-600">+28.3%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Return</span>
                      <span className="font-medium">+21.0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Projects Completed</span>
                      <span className="font-medium">1 of 3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Opportunities Invited To */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Investment Opportunities
                  </CardTitle>
                  <CardDescription>Exclusive opportunities you've been invited to</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{opportunity.title}</h4>
                      <Badge variant="secondary">{opportunity.status}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Investment Range:</span>
                        <span>{opportunity.investment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expected Return:</span>
                        <span className="text-green-600">{opportunity.expectedReturn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{opportunity.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deadline:</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {opportunity.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        Express Interest
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  )
}

export default ClientProfile