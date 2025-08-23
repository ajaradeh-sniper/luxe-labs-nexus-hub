import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FinancialReportGenerator } from "@/components/FinancialReportGenerator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  PieChart,
  BarChart3,
  Download,
  Calendar,
  Target,
  Wallet
} from "lucide-react"

const Financial = () => {
  const [reportGeneratorOpen, setReportGeneratorOpen] = useState(false)
  const portfolioMetrics = {
    totalValue: "$24.5M",
    totalInvestment: "$18.2M", 
    totalProfit: "$6.3M",
    averageROI: 14.7,
    monthlyRevenue: "$185K",
    yearlyGrowth: 22.8
  }

  const investments = [
    {
      property: "Marina Bay Tower",
      invested: "$2.5M",
      currentValue: "$2.8M",
      roi: 12.5,
      monthlyIncome: "$15K",
      status: "performing"
    },
    {
      property: "Downtown Luxury Apartments", 
      invested: "$4.2M",
      currentValue: "$4.8M",
      roi: 14.3,
      monthlyIncome: "$32K",
      status: "performing"
    },
    {
      property: "Business Bay Complex",
      invested: "$6.1M", 
      currentValue: "$6.5M",
      roi: 6.6,
      monthlyIncome: "$45K",
      status: "underperforming"
    },
    {
      property: "Palm Residence Villa",
      invested: "$5.4M",
      currentValue: "$6.0M", 
      roi: 11.1,
      monthlyIncome: "$28K",
      status: "performing"
    }
  ]

  const financialGoals = [
    {
      title: "Annual Revenue Target",
      target: "$2.2M",
      current: "$1.8M", 
      progress: 82,
      deadline: "Dec 2024"
    },
    {
      title: "Portfolio Diversification",
      target: "15 Properties",
      current: "12 Properties",
      progress: 80,
      deadline: "Q2 2025"
    },
    {
      title: "Average ROI Target", 
      target: "18%",
      current: "14.7%",
      progress: 73,
      deadline: "Ongoing"
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                {portfolioMetrics.totalValue}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">+{portfolioMetrics.yearlyGrowth}%</span>
                <span className="text-muted-foreground">this year</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Invested</p>
                  <p className="font-semibold">{portfolioMetrics.totalInvestment}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Profit</p>
                  <p className="font-semibold text-success">{portfolioMetrics.totalProfit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-warning" />
                Average ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                {portfolioMetrics.averageROI}%
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">Above target</span>
              </div>
              <div className="mt-4">
                <Progress value={portfolioMetrics.averageROI * 5} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">
                {portfolioMetrics.monthlyRevenue}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success font-medium">+8.5%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Investment Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.map((investment, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{investment.property}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>Invested: {investment.invested}</span>
                        <span>Current: {investment.currentValue}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className={
                      investment.status === 'performing' 
                        ? 'bg-success/10 text-success border-success/20'
                        : 'bg-warning/10 text-warning border-warning/20'
                    }>
                      {investment.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">ROI</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <p className="text-sm font-semibold text-success">+{investment.roi}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Monthly Income</p>
                      <p className="text-sm font-semibold">{investment.monthlyIncome}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Gain</p>
                      <p className="text-sm font-semibold text-success">
                        ${((parseFloat(investment.currentValue.replace('$', '').replace('M', '')) - 
                            parseFloat(investment.invested.replace('$', '').replace('M', ''))) * 1000000).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Performance</p>
                      <Progress 
                        value={investment.roi > 10 ? 100 : (investment.roi / 10) * 100} 
                        className="h-2 mt-1" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Financial Goals & Targets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {financialGoals.map((goal, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">{goal.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Target: {goal.target}</span>
                    <span className="text-sm font-medium">Current: {goal.current}</span>
                  </div>
                  <Progress value={goal.progress} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{goal.deadline}</span>
                    <span className="font-medium">{goal.progress}% complete</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <FinancialReportGenerator open={reportGeneratorOpen} onOpenChange={setReportGeneratorOpen} />
      </div>
    </DashboardLayout>
  )
}

export default Financial