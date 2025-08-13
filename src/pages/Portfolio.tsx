import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  DollarSign, 
  Building, 
  PieChart, 
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download
} from "lucide-react"

export default function Portfolio() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const portfolioData = {
    totalValue: 2450000,
    totalInvestment: 2100000,
    totalReturn: 350000,
    returnPercentage: 16.67,
    properties: 12,
    monthlyIncome: 45000
  }

  const investments = [
    {
      id: 1,
      name: "Marina Tower Luxury Apartments",
      type: "Residential",
      investment: 750000,
      currentValue: 850000,
      return: 100000,
      returnPercentage: 13.33,
      status: "performing",
      location: "Dubai Marina"
    },
    {
      id: 2,
      name: "Business Bay Commercial Complex",
      type: "Commercial", 
      investment: 500000,
      currentValue: 580000,
      return: 80000,
      returnPercentage: 16.0,
      status: "performing",
      location: "Business Bay"
    },
    {
      id: 3,
      name: "Downtown Luxury Residences",
      type: "Residential",
      investment: 850000,
      currentValue: 1020000,
      return: 170000,
      returnPercentage: 20.0,
      status: "outperforming",
      location: "Downtown Dubai"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'outperforming': return 'bg-success/10 text-success border-success/20'
      case 'performing': return 'bg-primary/10 text-primary border-primary/20'
      case 'underperforming': return 'bg-warning/10 text-warning border-warning/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Investment Portfolio</h1>
          <p className="text-muted-foreground">Track your real estate investments and returns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="luxury">
            <Eye className="mr-2 h-4 w-4" />
            Detailed View
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(portfolioData.totalValue)}</p>
                <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold flex items-center gap-1">
                  {formatCurrency(portfolioData.totalReturn)}
                  <ArrowUpRight className="h-4 w-4 text-success" />
                </p>
                <p className="text-sm text-muted-foreground">Total Returns</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <PieChart className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{portfolioData.returnPercentage}%</p>
                <p className="text-sm text-muted-foreground">Average Return</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Building className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{portfolioData.properties}</p>
                <p className="text-sm text-muted-foreground">Properties</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="investments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="investments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment) => (
                  <div key={investment.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{investment.name}</h3>
                        <p className="text-sm text-muted-foreground">{investment.location} • {investment.type}</p>
                      </div>
                      <Badge className={getStatusColor(investment.status)}>
                        {investment.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Investment</p>
                        <p className="font-semibold">{formatCurrency(investment.investment)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Value</p>
                        <p className="font-semibold">{formatCurrency(investment.currentValue)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Returns</p>
                        <p className="font-semibold text-success flex items-center gap-1">
                          {formatCurrency(investment.return)}
                          <ArrowUpRight className="h-3 w-3" />
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ROI</p>
                        <p className="font-semibold text-success">{investment.returnPercentage}%</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span>{investment.returnPercentage}%</span>
                      </div>
                      <Progress value={investment.returnPercentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
                <p className="text-muted-foreground">Detailed performance charts and analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground">Comprehensive investment analytics and insights coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}