import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  PieChart,
  Activity,
  Target,
  Calendar,
  Download,
  Filter,
  Building2,
  DollarSign,
  Users,
  Clock
} from "lucide-react"

const Analytics = () => {
  const analyticsData = {
    portfolioGrowth: {
      currentMonth: 15.3,
      previousMonth: 12.8,
      yearToDate: 22.4
    },
    propertyPerformance: [
      { property: "Marina Bay Tower", roi: 18.5, trend: "up", performance: 92 },
      { property: "Downtown Luxury", roi: 22.3, trend: "up", performance: 96 },
      { property: "Business Bay Complex", roi: 6.6, trend: "down", performance: 58 },
      { property: "Palm Residence", roi: 25.2, trend: "up", performance: 98 }
    ],
    investmentMetrics: {
      totalROI: 18.2,
      averageProjectDuration: 5.2,
      successRate: 94.5,
      clientSatisfaction: 4.8
    },
    marketTrends: [
      { location: "Dubai Marina", growth: 8.5, demand: "High", pricePoint: "$850K avg" },
      { location: "Downtown Dubai", growth: 12.3, demand: "Very High", pricePoint: "$1.2M avg" },
      { location: "Palm Jumeirah", growth: 15.8, demand: "Ultra High", pricePoint: "$2.8M avg" },
      { location: "Business Bay", growth: 4.2, demand: "Medium", pricePoint: "$680K avg" }
    ]
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.investmentMetrics.totalROI}%</p>
                  <p className="text-sm text-muted-foreground">Portfolio ROI</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-success">+{analyticsData.portfolioGrowth.currentMonth}%</span>
                <span className="text-muted-foreground">this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.investmentMetrics.successRate}%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
              <Progress value={analyticsData.investmentMetrics.successRate} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.investmentMetrics.averageProjectDuration}</p>
                  <p className="text-sm text-muted-foreground">Avg Duration (months)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.investmentMetrics.clientSatisfaction}</p>
                  <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Portfolio Growth Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 border border-border rounded-lg">
                <p className="text-2xl font-bold text-foreground">{analyticsData.portfolioGrowth.currentMonth}%</p>
                <p className="text-sm text-muted-foreground">Current Month</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">vs last month</span>
                </div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <p className="text-2xl font-bold text-foreground">{analyticsData.portfolioGrowth.previousMonth}%</p>
                <p className="text-sm text-muted-foreground">Previous Month</p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <p className="text-2xl font-bold text-foreground">{analyticsData.portfolioGrowth.yearToDate}%</p>
                <p className="text-sm text-muted-foreground">Year to Date</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">Above target</span>
                </div>
              </div>
            </div>
            
            {/* Placeholder for chart */}
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-dashed border-border">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">Portfolio Growth Chart</p>
                <p className="text-sm text-muted-foreground/70">Interactive chart would display here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Property Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.propertyPerformance.map((property, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{property.property}</h3>
                      <p className="text-sm text-muted-foreground">ROI: {property.roi}%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {property.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <Badge variant="secondary" className={
                        property.performance > 90 
                          ? 'bg-success/10 text-success border-success/20'
                          : property.performance > 70
                          ? 'bg-warning/10 text-warning border-warning/20'
                          : 'bg-destructive/10 text-destructive border-destructive/20'
                      }>
                        {property.performance > 90 ? 'Excellent' : property.performance > 70 ? 'Good' : 'Needs Attention'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Performance Score</span>
                      <span className="font-medium">{property.performance}/100</span>
                    </div>
                    <Progress value={property.performance} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Dubai Market Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analyticsData.marketTrends.map((trend, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{trend.location}</h3>
                    <Badge variant="secondary" className={
                      trend.demand === 'Ultra High' || trend.demand === 'Very High'
                        ? 'bg-success/10 text-success border-success/20'
                        : trend.demand === 'High'
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-warning/10 text-warning border-warning/20'
                    }>
                      {trend.demand} Demand
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Price Growth</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="font-medium text-success">+{trend.growth}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg Price Point</span>
                      <span className="font-medium">{trend.pricePoint}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Investment Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg text-center">
                <Building2 className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-foreground mb-1">Emerging Areas</h3>
                <p className="text-sm text-muted-foreground mb-3">3 new locations identified</p>
                <Button variant="outline" size="sm">Explore</Button>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-3 text-success" />
                <h3 className="font-semibold text-foreground mb-1">High ROI Projects</h3>
                <p className="text-sm text-muted-foreground mb-3">5 projects above 20% ROI</p>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="p-4 border border-border rounded-lg text-center">
                <Activity className="h-8 w-8 mx-auto mb-3 text-warning" />
                <h3 className="font-semibold text-foreground mb-1">Market Alerts</h3>
                <p className="text-sm text-muted-foreground mb-3">2 new market alerts</p>
                <Button variant="outline" size="sm">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Analytics