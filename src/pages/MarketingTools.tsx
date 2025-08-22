import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { 
  Target, 
  Mail, 
  MessageSquare, 
  Globe,
  BarChart3,
  Users,
  Eye,
  Plus,
  Settings,
  Send,
  Edit,
  Download,
  RefreshCw,
  Play,
  Pause,
  TrendingUp
} from "lucide-react"
import { useMarketingAnalytics } from "@/hooks/useAnalytics"
import { format, subDays } from 'date-fns'
import { toast } from 'sonner'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts'

export default function MarketingTools() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCampaign, setSelectedCampaign] = useState("email");

  // Calculate date range based on selection
  const getDateRange = () => {
    const to = new Date();
    let from: Date;
    
    switch (timeRange) {
      case '7d':
        from = subDays(to, 7);
        break;
      case '30d':
        from = subDays(to, 30);
        break;
      case '90d':
        from = subDays(to, 90);
        break;
      default:
        from = subDays(to, 30);
    }
    
    return { from, to };
  };

  // Fetch real marketing analytics data
  const { data: marketingData, isLoading, error, refetch } = useMarketingAnalytics(getDateRange());

  // Calculate summary metrics from real data
  const calculateMetrics = () => {
    if (!marketingData || marketingData.length === 0) {
      return {
        totalReach: 0,
        totalRevenue: 0,
        totalCost: 0,
        avgROAS: 0,
        totalConversions: 0,
        totalClicks: 0,
        totalImpressions: 0
      };
    }

    const totals = marketingData.reduce((acc, day) => ({
      impressions: acc.impressions + day.impressions,
      clicks: acc.clicks + day.clicks,
      conversions: acc.conversions + day.conversions,
      revenue: acc.revenue + day.revenue,
      cost: acc.cost + day.cost
    }), { impressions: 0, clicks: 0, conversions: 0, revenue: 0, cost: 0 });

    const avgROAS = totals.cost > 0 ? (totals.revenue / totals.cost) * 100 : 0;

    return {
      totalReach: totals.impressions,
      totalRevenue: totals.revenue,
      totalCost: totals.cost,
      avgROAS,
      totalConversions: totals.conversions,
      totalClicks: totals.clicks,
      totalImpressions: totals.impressions
    };
  };

  // Process campaign data from marketing analytics
  const processCampaignData = () => {
    if (!marketingData) return [];
    
    const campaignGroups = marketingData.reduce((acc, item) => {
      const key = item.campaign_name || item.channel;
      if (!acc[key]) {
        acc[key] = {
          name: key,
          channel: item.channel,
          impressions: 0,
          clicks: 0,
          conversions: 0,
          cost: 0,
          revenue: 0,
          status: 'active'
        };
      }
      acc[key].impressions += item.impressions;
      acc[key].clicks += item.clicks;
      acc[key].conversions += item.conversions;
      acc[key].cost += item.cost;
      acc[key].revenue += item.revenue;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(campaignGroups);
  };

  // Export functionality
  const handleExport = () => {
    if (!marketingData) {
      toast.error('No data available to export');
      return;
    }
    
    const csvContent = [
      ['Date', 'Channel', 'Campaign', 'Impressions', 'Clicks', 'Conversions', 'Cost', 'Revenue', 'ROAS'],
      ...marketingData.map(row => [
        row.date,
        row.channel,
        row.campaign_name || '',
        row.impressions,
        row.clicks,
        row.conversions,
        row.cost,
        row.revenue,
        row.roas
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Marketing data exported successfully');
  };

  // Refresh data
  const handleRefresh = () => {
    refetch();
    toast.success('Marketing data refreshed');
  };

  const metrics = calculateMetrics();
  const campaigns = processCampaignData();

  const marketingStats = [
    {
      title: "Total Reach",
      value: metrics.totalReach.toLocaleString(),
      change: "+18.5%",
      icon: Users
    },
    {
      title: "Campaign ROAS",
      value: `${metrics.avgROAS.toFixed(0)}%`,
      change: "+25.2%", 
      icon: Target
    },
    {
      title: "Total Revenue",
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      change: "+12.3%",
      icon: TrendingUp
    },
    {
      title: "Conversion Rate",
      value: `${metrics.totalClicks > 0 ? ((metrics.totalConversions / metrics.totalClicks) * 100).toFixed(1) : '0.0'}%`,
      change: "+5.1%",
      icon: BarChart3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20'
      case 'paused': return 'bg-warning/10 text-warning border-warning/20'
      case 'draft': return 'bg-muted text-muted-foreground border-muted'
      case 'completed': return 'bg-primary/10 text-primary border-primary/20'
      default: return 'bg-muted text-muted-foreground'
    }
  };

  const calculateRate = (num: number, total: number) => {
    return total > 0 ? ((num / total) * 100).toFixed(1) : '0.0'
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Marketing Tools</h1>
            <p className="text-muted-foreground">Manage your marketing campaigns and analytics</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Unable to load marketing data. Please try again.</p>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketing Tools</h1>
          <p className="text-muted-foreground">Manage your marketing campaigns and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <Badge 
              variant={timeRange === '7d' ? 'default' : 'outline'} 
              className="cursor-pointer" 
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </Badge>
            <Badge 
              variant={timeRange === '30d' ? 'default' : 'outline'} 
              className="cursor-pointer" 
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </Badge>
            <Badge 
              variant={timeRange === '90d' ? 'default' : 'outline'} 
              className="cursor-pointer" 
              onClick={() => setTimeRange('90d')}
            >
              90 Days
            </Badge>
          </div>
        </div>
      </div>

      {/* Marketing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketingStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <stat.icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <span className="text-sm text-success">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaigns.length > 0 ? (
                  campaigns.map((campaign, index) => (
                    <div key={index} className="p-6 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{campaign.name}</h3>
                            <Badge className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{campaign.channel} Campaign</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-1 h-3 w-3" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            {campaign.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Impressions</p>
                          <p className="font-semibold">{campaign.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Clicks</p>
                          <p className="font-semibold">
                            {campaign.clicks.toLocaleString()} 
                            <span className="text-success ml-1">
                              ({calculateRate(campaign.clicks, campaign.impressions)}%)
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversions</p>
                          <p className="font-semibold">
                            {campaign.conversions}
                            <span className="text-success ml-1">
                              ({calculateRate(campaign.conversions, campaign.clicks)}%)
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cost</p>
                          <p className="font-semibold">${campaign.cost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="font-semibold text-success">${campaign.revenue.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* ROAS Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Return on Ad Spend (ROAS)</span>
                          <span>{campaign.cost > 0 ? ((campaign.revenue / campaign.cost) * 100).toFixed(0) : '0'}%</span>
                        </div>
                        <Progress 
                          value={campaign.cost > 0 ? Math.min(((campaign.revenue / campaign.cost) * 100), 100) : 0} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                    <h3 className="text-lg font-semibold mb-2">No Campaigns Found</h3>
                    <p className="text-muted-foreground mb-4">No marketing campaign data available for the selected period</p>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Campaign
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Cost Trend</CardTitle>
              </CardHeader>
              <CardContent>
                {marketingData && marketingData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={marketingData.slice(0, 15)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name]} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="hsl(var(--success))" name="Revenue" />
                      <Line type="monotone" dataKey="cost" stroke="hsl(var(--destructive))" name="Cost" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    No analytics data available
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                {campaigns.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={campaigns.slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="channel" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [Number(value).toLocaleString(), name]} />
                      <Legend />
                      <Bar dataKey="clicks" fill="hsl(var(--primary))" name="Clicks" />
                      <Bar dataKey="conversions" fill="hsl(var(--secondary))" name="Conversions" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    No campaign data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Click-Through Rate</h3>
                  <p className="text-3xl font-bold text-primary">
                    {metrics.totalImpressions > 0 ? ((metrics.totalClicks / metrics.totalImpressions) * 100).toFixed(2) : '0.00'}%
                  </p>
                  <p className="text-sm text-muted-foreground">Average CTR across all campaigns</p>
                </div>
                
                <div className="text-center p-6 border rounded-lg">
                  <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Conversion Rate</h3>
                  <p className="text-3xl font-bold text-primary">
                    {metrics.totalClicks > 0 ? ((metrics.totalConversions / metrics.totalClicks) * 100).toFixed(2) : '0.00'}%
                  </p>
                  <p className="text-sm text-muted-foreground">Clicks to conversion ratio</p>
                </div>
                
                <div className="text-center p-6 border rounded-lg">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Cost Per Conversion</h3>
                  <p className="text-3xl font-bold text-primary">
                    ${metrics.totalConversions > 0 ? (metrics.totalCost / metrics.totalConversions).toFixed(2) : '0.00'}
                  </p>
                  <p className="text-sm text-muted-foreground">Average cost per conversion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Marketing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-muted-foreground mb-4">Create and manage email campaigns</p>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    New Email Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-muted-foreground mb-4">Schedule and manage social posts</p>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}