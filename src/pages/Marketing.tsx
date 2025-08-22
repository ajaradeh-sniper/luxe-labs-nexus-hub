import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  MousePointer, 
  DollarSign, 
  Search,
  Share2,
  Target,
  FileText,
  BarChart3,
  Plus
} from 'lucide-react';

export default function Marketing() {
  const campaignData = [
    {
      name: "Luxury Real Estate Dubai",
      type: "Google Ads",
      status: "Active",
      budget: "$2,500",
      spent: "$1,890",
      clicks: 1254,
      conversions: 23,
      roi: "340%"
    },
    {
      name: "Instagram Luxury Homes",
      type: "Social Media",
      status: "Active", 
      budget: "$1,800",
      spent: "$1,200",
      clicks: 890,
      conversions: 15,
      roi: "280%"
    },
    {
      name: "LinkedIn Investment Targeting",
      type: "Social Media",
      status: "Paused",
      budget: "$1,200",
      spent: "$950",
      clicks: 445,
      conversions: 8,
      roi: "190%"
    }
  ];

  const seoKeywords = [
    { keyword: "luxury real estate Dubai", position: 3, volume: 8100, difficulty: "High" },
    { keyword: "Dubai property investment", position: 7, volume: 5400, difficulty: "Medium" },
    { keyword: "high ROI property flips", position: 12, volume: 2200, difficulty: "Medium" },
    { keyword: "luxury apartments Dubai Marina", position: 5, volume: 3300, difficulty: "High" }
  ];

  const contentPipeline = [
    { title: "Ultimate Guide to Dubai Property Investment", type: "Blog Post", status: "Published", views: 2341 },
    { title: "ROI Flip Strategy Downloadable Guide", type: "Lead Magnet", status: "In Review", views: 0 },
    { title: "Q4 Market Insights Report", type: "Report", status: "Draft", views: 0 },
    { title: "Luxury Living in Business Bay", type: "Video", status: "Published", views: 1876 }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-500';
      case 'Paused': return 'bg-yellow-500';
      case 'Published': return 'bg-blue-500';
      case 'In Review': return 'bg-orange-500';
      case 'Draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">

        {/* Marketing KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,589</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lead Conversion</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0.4%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ad Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,040</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROAS</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2x</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0.3x</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns">
              <Target className="w-4 h-4 mr-2" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="seo">
              <Search className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="w-4 h-4 mr-2" />
              Social Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Monitor and manage your advertising campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignData.map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{campaign.name}</h4>
                          <Badge variant="secondary">{campaign.type}</Badge>
                          <Badge 
                            className={`${getStatusColor(campaign.status)} text-white`}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Budget: {campaign.budget}</span>
                          <span>Spent: {campaign.spent}</span>
                          <span>Clicks: {campaign.clicks}</span>
                          <span>Conversions: {campaign.conversions}</span>
                          <span className="text-green-600 font-medium">ROI: {campaign.roi}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Performance</CardTitle>
                <CardDescription>Track keyword rankings and optimization progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seoKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{keyword.keyword}</h4>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Position: #{keyword.position}</span>
                          <span>Volume: {keyword.volume.toLocaleString()}</span>
                          <span>Difficulty: {keyword.difficulty}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">#{keyword.position}</div>
                        <Progress value={Math.max(0, 100 - keyword.position * 3)} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Pipeline</CardTitle>
                <CardDescription>Manage your content creation and publishing schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentPipeline.map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{content.title}</h4>
                          <Badge variant="secondary">{content.type}</Badge>
                          <Badge 
                            className={`${getStatusColor(content.status)} text-white`}
                          >
                            {content.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Views: {content.views.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Analytics</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instagram Insights</CardTitle>
                  <CardDescription>Last 30 days performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Followers</span>
                    <span className="font-bold">12,453</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engagement Rate</span>
                    <span className="font-bold text-green-600">4.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reach</span>
                    <span className="font-bold">89,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Story Views</span>
                    <span className="font-bold">15,678</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>LinkedIn Analytics</CardTitle>
                  <CardDescription>Professional network performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Page Followers</span>
                    <span className="font-bold">3,287</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Post Engagement</span>
                    <span className="font-bold text-green-600">6.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impressions</span>
                    <span className="font-bold">24,567</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Click-through Rate</span>
                    <span className="font-bold text-green-600">2.1%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}