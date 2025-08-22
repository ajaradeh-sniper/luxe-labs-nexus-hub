import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { useActionRouter } from "@/components/ActionRouter"
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Calendar,
  Download,
  Eye,
  FileText,
  PieChart,
  BarChart3,
  Star,
  UserPlus,
  Target,
  ArrowUpRight,
  Briefcase
} from "lucide-react"

const InvestorDashboard = () => {
  const { user } = useAuth()
  const { open, portal } = useActionRouter()
  const [activeTab, setActiveTab] = useState("portfolio")

  const portfolioStats = {
    totalInvestment: "$2.8M",
    currentValue: "$3.4M",
    totalROI: 21.4,
    monthlyIncome: "$24.5K",
    properties: 4,
    avgROI: 18.2,
    upcomingPayouts: "$95K"
  }

  const investments = [
    {
      id: "1",
      property: "Marina Bay Tower",
      investment: "$750K",
      currentValue: "$920K",
      roi: 22.7,
      monthlyIncome: "$6.8K",
      status: "performing",
      purchaseDate: "2023-08-15",
      type: "Luxury Apartment",
      nextPayout: "2025-02-01",
      payoutAmount: "$18.5K"
    },
    {
      id: "2", 
      property: "Downtown Luxury Apartments",
      investment: "$1.2M",
      currentValue: "$1.4M",
      roi: 16.7,
      monthlyIncome: "$9.2K",
      status: "performing",
      purchaseDate: "2023-06-10",
      type: "Residential Complex",
      nextPayout: "2025-01-28",
      payoutAmount: "$22.8K"
    },
    {
      id: "3",
      property: "Business Bay Complex",
      investment: "$550K",
      currentValue: "$640K",
      roi: 16.4,
      monthlyIncome: "$4.8K",
      status: "stable",
      purchaseDate: "2024-01-20",
      type: "Commercial Office",
      nextPayout: "2025-02-15",
      payoutAmount: "$12.2K"
    },
    {
      id: "4",
      property: "Palm Residence Villa",
      investment: "$300K",
      currentValue: "$440K",
      roi: 46.7,
      monthlyIncome: "$3.7K",
      status: "outstanding",
      purchaseDate: "2023-11-05",
      type: "Luxury Villa",
      nextPayout: "2025-01-25",
      payoutAmount: "$41.5K"
    }
  ]

  const newOpportunities = [
    {
      id: "5",
      title: "Jumeirah Beach Penthouse",
      location: "Jumeirah Beach Residence",
      targetROI: "28-35%",
      minInvestment: "$500K",
      totalRequired: "$2.8M",
      raised: "$1.4M",
      daysLeft: 12,
      riskLevel: "Medium"
    },
    {
      id: "6",
      title: "Dubai Hills Premium Villa",
      location: "Dubai Hills Estate",
      targetROI: "22-28%",
      minInvestment: "$300K",
      totalRequired: "$1.9M",
      raised: "$950K",
      daysLeft: 8,
      riskLevel: "Low"
    }
  ]

  const marketInsights = [
    {
      title: "Q1 2025 Market Outlook",
      summary: "Dubai luxury market shows strong momentum with 15% YoY growth",
      author: "Real Estate Director",
      date: "Jan 15, 2025",
      category: "Market Analysis"
    },
    {
      title: "Marina District Performance",
      summary: "Marina properties outperforming with 18% average returns",
      author: "Investment Team",
      date: "Jan 12, 2025", 
      category: "Area Focus"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'outstanding': return 'bg-success/10 text-success border-success/20'
      case 'performing': return 'bg-primary/10 text-primary border-primary/20'
      case 'stable': return 'bg-warning/10 text-warning border-warning/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-success/10 text-success'
      case 'Medium': return 'bg-warning/10 text-warning'
      case 'High': return 'bg-destructive/10 text-destructive'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getROIIcon = (roi: number) => {
    return roi > 20 ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-warning" />
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Card className="md:col-span-2 luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{portfolioStats.totalInvestment}</p>
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <div className="mt-2">
                  <p className="text-xl font-semibold text-success">{portfolioStats.currentValue}</p>
                  <p className="text-xs text-muted-foreground">Current Value</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">+{portfolioStats.totalROI}%</p>
                <p className="text-sm text-muted-foreground">Total ROI</p>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{portfolioStats.monthlyIncome}</p>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{portfolioStats.properties}</p>
                <p className="text-sm text-muted-foreground">Properties</p>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-border">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{portfolioStats.upcomingPayouts}</p>
                <p className="text-sm text-muted-foreground">Next Payouts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            {/* ROI Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className={`p-4 rounded-lg border-2 ${getStatusColor(investment.status)}`}>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          {getROIIcon(investment.roi)}
                          <span className="ml-1 font-bold text-lg">+{investment.roi}%</span>
                        </div>
                        <p className="font-semibold text-sm">{investment.property}</p>
                        <p className="text-xs text-muted-foreground">{investment.type}</p>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Next Payout</p>
                          <p className="font-medium text-sm">{investment.payoutAmount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payouts */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-8 w-8 text-success" />
                        <div>
                          <p className="font-semibold">{investment.property}</p>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(investment.nextPayout).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-success">{investment.payoutAmount}</p>
                        <Badge variant="outline">Confirmed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-dashed border-border">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p className="text-muted-foreground">Market Performance Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-dashed border-border">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p className="text-muted-foreground">Asset Allocation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Market Insights from Real Estate Director</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights.map((insight, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground">By {insight.author} • {insight.date}</p>
                        </div>
                        <Badge variant="outline">{insight.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{insight.summary}</p>
                      <Button variant="link" size="sm" className="p-0">
                        Read Full Report <ArrowUpRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid gap-6">
              {newOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="luxury-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{opportunity.title}</h3>
                        <p className="text-muted-foreground">{opportunity.location}</p>
                      </div>
                      <Badge className={getRiskColor(opportunity.riskLevel)}>
                        {opportunity.riskLevel} Risk
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Target ROI</p>
                        <p className="font-bold text-lg text-success">{opportunity.targetROI}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Min Investment</p>
                        <p className="font-bold">{opportunity.minInvestment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Funding Progress</p>
                        <p className="font-bold">{opportunity.raised} / {opportunity.totalRequired}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Days Left</p>
                        <p className="font-bold text-warning">{opportunity.daysLeft} days</p>
                      </div>
                    </div>

                    <Progress 
                      value={(parseInt(opportunity.raised.replace(/[$MK]/g, '')) / parseInt(opportunity.totalRequired.replace(/[$MK]/g, ''))) * 100} 
                      className="mb-4" 
                    />

                    <div className="flex gap-2">
                      <Button onClick={() => open('join-investment')} className="luxury-gradient text-primary-foreground">
                        <Briefcase className="h-4 w-4 mr-2" />
                        View Pitch Deck
                      </Button>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Investor Referral Program</CardTitle>
                  <Button onClick={() => open('refer-investor')} className="luxury-gradient text-primary-foreground">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Refer New Investor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <UserPlus className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Earn 2% of First Investment</h3>
                  <p className="text-muted-foreground mb-6">
                    Refer qualified investors and earn 2% commission on their first investment with us.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-primary">5</p>
                      <p className="text-sm text-muted-foreground">Referrals Sent</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-success">3</p>
                      <p className="text-sm text-muted-foreground">Approved</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-warning">$24K</p>
                      <p className="text-sm text-muted-foreground">Earned</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {portal}
    </DashboardLayout>
  )
}

export default InvestorDashboard