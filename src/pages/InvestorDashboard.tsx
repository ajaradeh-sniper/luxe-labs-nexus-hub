import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
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
  Star
} from "lucide-react"

const InvestorDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("portfolio")

  const portfolioStats = {
    totalInvestment: "$2.8M",
    currentValue: "$3.4M",
    totalROI: 21.4,
    monthlyIncome: "$24.5K",
    properties: 4,
    avgROI: 18.2
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
      type: "Luxury Apartment"
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
      type: "Residential Complex"
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
      type: "Commercial Office"
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
      type: "Luxury Villa"
    }
  ]

  const roiReports = [
    {
      period: "Q4 2024",
      totalROI: 21.4,
      bestPerformer: "Palm Residence Villa",
      avgReturn: 18.2,
      generated: "2024-12-01"
    },
    {
      period: "Q3 2024", 
      totalROI: 19.8,
      bestPerformer: "Marina Bay Tower",
      avgReturn: 16.9,
      generated: "2024-09-01"
    },
    {
      period: "Q2 2024",
      totalROI: 18.5,
      bestPerformer: "Downtown Luxury",
      avgReturn: 15.2,
      generated: "2024-06-01"
    }
  ]

  const documents = [
    { name: "Investment Portfolio Summary Q4 2024", type: "PDF", date: "2024-12-01", category: "Report" },
    { name: "Marina Bay Purchase Agreement", type: "PDF", date: "2023-08-15", category: "Contract" },
    { name: "ROI Analysis Report Q4", type: "Excel", date: "2024-11-30", category: "Analysis" },
    { name: "Property Valuation Downtown", type: "PDF", date: "2024-10-15", category: "Valuation" },
    { name: "Annual Tax Summary 2024", type: "PDF", date: "2024-11-01", category: "Tax" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'outstanding': return 'bg-success/10 text-success border-success/20'
      case 'performing': return 'bg-primary/10 text-primary border-primary/20'
      case 'stable': return 'bg-warning/10 text-warning border-warning/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getROIIcon = (roi: number) => {
    return roi > 20 ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-warning" />
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Investor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button variant="luxury">
              <Eye className="mr-2 h-4 w-4" />
              View All Properties
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Card className="md:col-span-2">
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

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">+{portfolioStats.totalROI}%</p>
                <p className="text-sm text-muted-foreground">Total ROI</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{portfolioStats.monthlyIncome}</p>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{portfolioStats.properties}</p>
                <p className="text-sm text-muted-foreground">Properties</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{portfolioStats.avgROI}%</p>
                <p className="text-sm text-muted-foreground">Avg ROI</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio View</TabsTrigger>
            <TabsTrigger value="roi">ROI Reports</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="p-4 border border-border rounded-lg hover:bg-accent/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{investment.property}</h3>
                          <p className="text-sm text-muted-foreground">{investment.type}</p>
                          <p className="text-xs text-muted-foreground">Purchased: {new Date(investment.purchaseDate).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(investment.status)}>
                          {investment.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Investment</p>
                          <p className="font-semibold">{investment.investment}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Current Value</p>
                          <p className="font-semibold text-success">{investment.currentValue}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">ROI</p>
                          <div className="flex items-center gap-1">
                            {getROIIcon(investment.roi)}
                            <p className="font-semibold text-success">+{investment.roi}%</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Monthly Income</p>
                          <p className="font-semibold">{investment.monthlyIncome}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Performance</p>
                          <Progress value={Math.min(investment.roi * 2, 100)} className="h-2" />
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-1 h-3 w-3" />
                          Documents
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>ROI Reports</CardTitle>
                  <Button variant="luxury">
                    <Download className="mr-2 h-4 w-4" />
                    Generate New Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roiReports.map((report, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{report.period} Report</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Total ROI</p>
                          <p className="font-semibold text-success">+{report.totalROI}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Best Performer</p>
                          <p className="font-semibold">{report.bestPerformer}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Average Return</p>
                          <p className="font-semibold">{report.avgReturn}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Generated</p>
                          <p className="font-semibold">{new Date(report.generated).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.category} • {doc.type} • {new Date(doc.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
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
                      <p className="text-sm text-muted-foreground/70">Interactive chart would display here</p>
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
                      <p className="text-muted-foreground">Portfolio Distribution</p>
                      <p className="text-sm text-muted-foreground/70">Asset allocation chart would display here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default InvestorDashboard