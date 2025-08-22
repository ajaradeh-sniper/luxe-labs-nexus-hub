import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  MousePointer, 
  Phone, 
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Eye,
  BarChart3,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useWebsiteAnalytics, useTrafficAnalytics } from '@/hooks/useAnalytics';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'sonner';
import { format, subDays } from 'date-fns';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export function WebsiteAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  
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
        from = subDays(to, 7);
    }
    
    return { from, to };
  };

  // Fetch real analytics data
  const { data: websiteData, isLoading: websiteLoading, error: websiteError, refetch: refetchWebsite } = useWebsiteAnalytics(getDateRange());
  const { data: trafficData, isLoading: trafficLoading, error: trafficError, refetch: refetchTraffic } = useTrafficAnalytics(getDateRange());

  const isLoading = websiteLoading || trafficLoading;
  const hasError = websiteError || trafficError;

  // Calculate key metrics from real data
  const calculateMetrics = () => {
    if (!websiteData || websiteData.length === 0) {
      return {
        totalVisitors: 0,
        totalPageViews: 0,
        avgBounceRate: 0,
        avgSessionDuration: 0,
        uniqueVisitors: 0
      };
    }

    const totals = websiteData.reduce((acc, day) => ({
      visitors: acc.visitors + day.visitors,
      pageViews: acc.pageViews + day.page_views,
      uniqueVisitors: acc.uniqueVisitors + day.unique_visitors,
      bounceRate: acc.bounceRate + day.bounce_rate,
      sessionDuration: acc.sessionDuration + day.session_duration
    }), { visitors: 0, pageViews: 0, uniqueVisitors: 0, bounceRate: 0, sessionDuration: 0 });

    return {
      totalVisitors: totals.visitors,
      totalPageViews: totals.pageViews,
      avgBounceRate: totals.bounceRate / websiteData.length,
      avgSessionDuration: totals.sessionDuration / websiteData.length,
      uniqueVisitors: totals.uniqueVisitors
    };
  };

  const metrics = calculateMetrics();

  // Format session duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Export functionality
  const handleExport = () => {
    if (!websiteData) {
      toast.error('No data available to export');
      return;
    }
    
    const csvContent = [
      ['Date', 'Visitors', 'Page Views', 'Unique Visitors', 'Bounce Rate', 'Session Duration'],
      ...websiteData.map(row => [
        row.date,
        row.visitors,
        row.page_views,
        row.unique_visitors,
        row.bounce_rate,
        row.session_duration
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Analytics data exported successfully');
  };

  // Refresh data
  const handleRefresh = () => {
    refetchWebsite();
    refetchTraffic();
    toast.success('Analytics data refreshed');
  };

  const keyMetrics = [
    {
      title: 'Total Visitors',
      value: metrics.totalVisitors.toLocaleString(),
      change: '+12.5%', // TODO: Calculate actual change
      trend: 'up',
      icon: Users,
      description: 'Unique visitors in selected period'
    },
    {
      title: 'Unique Visitors',
      value: metrics.uniqueVisitors.toLocaleString(),
      change: '+8.3%',
      trend: 'up',
      icon: UserCheck,
      description: 'First-time visitors'
    },
    {
      title: 'Page Views',
      value: metrics.totalPageViews.toLocaleString(),
      change: '+5.7%',
      trend: 'up',
      icon: Eye,
      description: 'Total page views'
    },
    {
      title: 'Avg Session Duration',
      value: formatDuration(Math.round(metrics.avgSessionDuration)),
      change: '+2.1%',
      trend: 'up',
      icon: Calendar,
      description: 'Time spent on site'
    },
    {
      title: 'Bounce Rate',
      value: `${metrics.avgBounceRate.toFixed(1)}%`,
      change: '-3.2%',
      trend: 'down',
      icon: TrendingDown,
      description: 'Single page sessions'
    }
  ];

  // Process traffic data for device breakdown
  const processDeviceData = () => {
    if (!trafficData) return [];
    
    const deviceCounts = trafficData.reduce((acc, item) => {
      // Simplified device detection based on source
      let device = 'Desktop';
      if (item.source.includes('mobile') || item.medium === 'mobile') {
        device = 'Mobile';
      } else if (item.source.includes('tablet')) {
        device = 'Tablet';
      }
      
      acc[device] = (acc[device] || 0) + item.sessions;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(deviceCounts).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(deviceCounts).map(([device, count]) => ({
      device,
      users: count,
      percentage: Math.round((count / total) * 100)
    }));
  };

  const deviceData = processDeviceData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Website Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights into your website performance</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Unable to load analytics data. Please try again.</p>
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
          <h1 className="text-3xl font-bold text-foreground">Website Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your website performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
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

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <metric.icon className="h-5 w-5 text-muted-foreground" />
                <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visitors Trend</CardTitle>
                <CardDescription>Daily visitor count over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={websiteData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.6} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Visitors by device type</CardDescription>
              </CardHeader>
              <CardContent>
                {deviceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="users"
                        label={({ device, percentage }) => `${device} ${percentage}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                    No device data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Views vs Unique Visitors</CardTitle>
                <CardDescription>Comparison of total engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={websiteData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="page_views" fill="hsl(var(--primary))" />
                    <Bar dataKey="unique_visitors" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Device and platform analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {deviceData.map((device) => (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {device.device === 'Desktop' && <Monitor className="h-4 w-4" />}
                      {device.device === 'Mobile' && <Smartphone className="h-4 w-4" />}
                      {device.device === 'Tablet' && <Globe className="h-4 w-4" />}
                      <span className="text-sm font-medium">{device.device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={device.percentage} className="w-20" />
                      <span className="text-sm text-muted-foreground">{device.percentage}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traffic Sources Tab */}
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficData && trafficData.length > 0 ? (
                  trafficData.slice(0, 10).map((traffic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium capitalize">{traffic.source}</h4>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{traffic.sessions.toLocaleString()} sessions</span>
                          <span>{traffic.users.toLocaleString()} users</span>
                          {traffic.medium && <span>via {traffic.medium}</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Bounce Rate</div>
                        <div className="text-2xl font-bold">{traffic.bounce_rate}%</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No traffic data available for the selected period
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Performance</CardTitle>
              <CardDescription>Bounce rate and session duration trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={websiteData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="bounce_rate" 
                    stroke="hsl(var(--destructive))" 
                    name="Bounce Rate (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="session_duration" 
                    stroke="hsl(var(--primary))" 
                    name="Session Duration (s)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}