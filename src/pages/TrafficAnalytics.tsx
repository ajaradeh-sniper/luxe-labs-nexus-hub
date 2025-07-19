import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  Globe, 
  Smartphone, 
  Monitor,
  TrendingUp,
  TrendingDown,
  MousePointer,
  Clock,
  Target,
  Download
} from 'lucide-react';

export default function TrafficAnalytics() {
  const trafficSources = [
    { source: "Organic Search", visitors: 8420, percentage: 42.1, change: "+12.3%" },
    { source: "Direct", visitors: 4230, percentage: 21.2, change: "+8.7%" },
    { source: "Social Media", visitors: 3150, percentage: 15.8, change: "+15.2%" },
    { source: "Paid Search", visitors: 2890, percentage: 14.5, change: "+22.4%" },
    { source: "Referral", visitors: 1290, percentage: 6.4, change: "-3.1%" }
  ];

  const topPages = [
    { page: "/", title: "Homepage", views: 12450, bounce: "32%", time: "3:42" },
    { page: "/properties", title: "Properties", views: 8730, bounce: "28%", time: "4:15" },
    { page: "/services", title: "Services", views: 6540, bounce: "35%", time: "2:58" },
    { page: "/about", title: "About Us", views: 4320, bounce: "42%", time: "2:31" },
    { page: "/contact", title: "Contact", views: 3210, bounce: "25%", time: "1:47" }
  ];

  const deviceData = [
    { device: "Desktop", users: 11230, percentage: 56.2 },
    { device: "Mobile", users: 7890, percentage: 39.4 },
    { device: "Tablet", users: 880, percentage: 4.4 }
  ];

  const conversionFunnels = [
    { step: "Landing Page Visit", users: 20000, conversion: 100 },
    { step: "Property View", users: 8500, conversion: 42.5 },
    { step: "Contact Form", users: 1700, conversion: 8.5 },
    { step: "Lead Qualified", users: 680, conversion: 3.4 },
    { step: "Investment Inquiry", users: 340, conversion: 1.7 }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Traffic & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive website and user behavior analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <BarChart3 className="w-4 h-4 mr-2" />
              Custom Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20,000</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.3%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,250</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.7%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32.4%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -2.1%
                </span>
                improvement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3:24</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +18s
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="sources">
              <Target className="w-4 h-4 mr-2" />
              Traffic Sources
            </TabsTrigger>
            <TabsTrigger value="behavior">
              <MousePointer className="w-4 h-4 mr-2" />
              User Behavior
            </TabsTrigger>
            <TabsTrigger value="conversions">
              <TrendingUp className="w-4 h-4 mr-2" />
              Conversions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                  <CardDescription>Most visited pages in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{page.title}</p>
                          <p className="text-sm text-muted-foreground">{page.page}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-bold">{page.views.toLocaleString()}</p>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span>Bounce: {page.bounce}</span>
                            <span>Time: {page.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>User device preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceData.map((device, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            {device.device === 'Desktop' && <Monitor className="w-4 h-4" />}
                            {device.device === 'Mobile' && <Smartphone className="w-4 h-4" />}
                            {device.device === 'Tablet' && <Globe className="w-4 h-4" />}
                            <span className="font-medium">{device.device}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{device.users.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{device.percentage}%</p>
                          </div>
                        </div>
                        <Progress value={device.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{source.source}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{source.visitors.toLocaleString()}</span>
                          <Badge 
                            variant={source.change.startsWith('+') ? 'default' : 'secondary'}
                            className={source.change.startsWith('+') ? 'bg-green-500' : 'bg-red-500'}
                          >
                            {source.change}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{source.percentage}% of total traffic</span>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Flow</CardTitle>
                  <CardDescription>Common user journeys</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="font-medium">Most Common Path:</div>
                      <div className="text-muted-foreground mt-1">
                        Homepage → Properties → Property Details → Contact
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Conversion Rate:</div>
                      <div className="text-green-600 font-bold">8.7%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Content</CardTitle>
                  <CardDescription>Most engaging content types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Property Galleries</span>
                      <span className="font-bold">4:32 avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investment Guides</span>
                      <span className="font-bold">6:18 avg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Reports</span>
                      <span className="font-bold">3:45 avg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exit Pages</CardTitle>
                  <CardDescription>Where users typically leave</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Contact Form</span>
                      <span className="text-red-600">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pricing Page</span>
                      <span className="text-red-600">22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Property Details</span>
                      <span className="text-red-600">18%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>User journey from visit to conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFunnels.map((step, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{step.step}</span>
                        <div className="text-right">
                          <span className="font-bold">{step.users.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-2">({step.conversion}%)</span>
                        </div>
                      </div>
                      <Progress value={step.conversion} className="h-3" />
                      {index < conversionFunnels.length - 1 && (
                        <div className="text-center text-sm text-muted-foreground">
                          ↓ {((conversionFunnels[index + 1].users / step.users) * 100).toFixed(1)}% continue
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}