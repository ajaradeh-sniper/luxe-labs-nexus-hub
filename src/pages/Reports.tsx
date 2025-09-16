import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { DashboardLayout } from "@/components/DashboardLayout"
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  DollarSign,
  Building,
  Users,
  Share,
  Eye
} from "lucide-react"

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReport, setSelectedReport] = useState("financial")

  const reportTypes = [
    {
      id: "financial",
      name: "Financial Performance",
      description: "Revenue, expenses, and profitability analysis",
      icon: DollarSign,
      lastUpdated: "2024-01-15",
      status: "ready"
    },
    {
      id: "property",
      name: "Property Performance", 
      description: "Property valuations, occupancy, and market trends",
      icon: Building,
      lastUpdated: "2024-01-14",
      status: "ready"
    },
    {
      id: "sales",
      name: "Sales & Marketing",
      description: "Lead conversion, campaign performance, and ROI",
      icon: TrendingUp,
      lastUpdated: "2024-01-13",
      status: "processing"
    },
    {
      id: "client",
      name: "Client Analytics",
      description: "Client satisfaction, retention, and engagement metrics",
      icon: Users,
      lastUpdated: "2024-01-12",
      status: "ready"
    }
  ]

  const quickStats = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+12.5%",
      period: "This Month",
      trend: "up"
    },
    {
      title: "Properties Sold",
      value: "24",
      change: "+8.3%",
      period: "This Month", 
      trend: "up"
    },
    {
      title: "Active Leads",
      value: "156",
      change: "-2.1%",
      period: "This Week",
      trend: "down"
    },
    {
      title: "Avg. Deal Size",
      value: "$485K",
      change: "+15.7%",
      period: "This Quarter",
      trend: "up"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-success/10 text-success border-success/20'
      case 'processing': return 'bg-warning/10 text-warning border-warning/20'
      case 'error': return 'bg-destructive/10 text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 space-y-6">

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">{stat.period}</span>
                  </div>
                </div>
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-8 w-8 text-success" />
                ) : (
                  <TrendingUp className="h-8 w-8 text-destructive rotate-180" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Report Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTypes.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <report.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Last updated: {report.lastUpdated}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Monthly Financial Summary - December 2024",
                    type: "Financial",
                    generated: "2024-01-15 09:30",
                    size: "2.4 MB"
                  },
                  {
                    name: "Property Performance Analysis Q4 2024",
                    type: "Operations",
                    generated: "2024-01-14 16:45",
                    size: "1.8 MB"
                  },
                  {
                    name: "Sales Pipeline Report - Week 2",
                    type: "Sales",
                    generated: "2024-01-13 11:15",
                    size: "956 KB"
                  }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{report.type}</span>
                          <span>Generated: {report.generated}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Financial Analytics</h3>
                <p className="text-muted-foreground">Detailed financial reports and analysis coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operational Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Building className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Operations Analytics</h3>
                <p className="text-muted-foreground">Operational performance reports coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Custom Reports</h3>
                <p className="text-muted-foreground">Build your own custom reports with our report builder</p>
                <Button className="mt-4" variant="luxury">
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}