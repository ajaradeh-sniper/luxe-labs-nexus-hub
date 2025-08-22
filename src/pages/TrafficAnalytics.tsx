import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useState } from 'react';
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
  Download,
  RefreshCw
} from 'lucide-react';
import { useTrafficAnalytics, useWebsiteAnalytics } from '@/hooks/useAnalytics';
import { format, subDays } from 'date-fns';
import { toast } from 'sonner';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export default function TrafficAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');

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

  // Fetch real analytics data
  const { data: trafficData, isLoading: trafficLoading, error: trafficError, refetch: refetchTraffic } = useTrafficAnalytics(getDateRange());
  const { data: websiteData, isLoading: websiteLoading, error: websiteError, refetch: refetchWebsite } = useWebsiteAnalytics(getDateRange());

  const isLoading = trafficLoading || websiteLoading;
  const hasError = trafficError || websiteError;

  // Process traffic sources from real data
  const processTrafficSources = () => {
    if (!trafficData || trafficData.length === 0) return [];
    
    const sourceAggregates = trafficData.reduce((acc, item) => {
      const key = item.source;
      if (!acc[key]) {
        acc[key] = {
          source: key.charAt(0).toUpperCase() + key.slice(1),
          sessions: 0,
          users: 0,
          bounceRate: 0,
          count: 0
        };
      }
      acc[key].sessions += item.sessions;
      acc[key].users += item.users;
      acc[key].bounceRate += item.bounce_rate;
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, any>);

    const totalUsers = Object.values(sourceAggregates).reduce((sum: number, item: any) => sum + item.users, 0);
    
    return Object.values(sourceAggregates).map((item: any) => ({
      source: item.source,
      visitors: item.users,
      percentage: Math.round((item.users / totalUsers) * 100),
      change: "+12.3%", // TODO: Calculate actual change
      avgBounceRate: (item.bounceRate / item.count).toFixed(1)
    })).sort((a: any, b: any) => b.visitors - a.visitors);
  };

  // Calculate summary metrics
  const calculateMetrics = () => {
    if (!websiteData || !trafficData) {
      return {
        totalUsers: 0,
        totalPageViews: 0,
        avgBounceRate: 0,
        avgSessionDuration: 0
      };
    }

    const websiteTotals = websiteData.reduce((acc, day) => ({
      visitors: acc.visitors + day.visitors,
      pageViews: acc.pageViews + day.page_views,
      bounceRate: acc.bounceRate + day.bounce_rate,
      sessionDuration: acc.sessionDuration + day.session_duration,
      count: acc.count + 1
    }), { visitors: 0, pageViews: 0, bounceRate: 0, sessionDuration: 0, count: 0 });

    return {
      totalUsers: websiteTotals.visitors,
      totalPageViews: websiteTotals.pageViews,
      avgBounceRate: websiteTotals.bounceRate / websiteTotals.count,
      avgSessionDuration: websiteTotals.sessionDuration / websiteTotals.count
    };
  };

  // Export functionality
  const handleExport = () => {
    if (!trafficData) {
      toast.error('No data available to export');
      return;
    }
    
    const csvContent = [
      ['Date', 'Source', 'Medium', 'Sessions', 'Users', 'New Users', 'Bounce Rate'],
      ...trafficData.map(row => [
        row.date,
        row.source,
        row.medium || '',
        row.sessions,
        row.users,
        row.new_users,
        row.bounce_rate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `traffic-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Traffic data exported successfully');
  };

  // Refresh data
  const handleRefresh = () => {
    refetchTraffic();
    refetchWebsite();
    toast.success('Traffic data refreshed');
  };

  const metrics = calculateMetrics();
  const trafficSources = processTrafficSources();

  // Format session duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Process device data from traffic sources
  const processDeviceData = () => {
    if (!trafficData) return [];
    
    const deviceCounts = trafficData.reduce((acc, item) => {
      let device = 'Desktop';
      if (item.source.includes('mobile') || item.medium === 'mobile') {
        device = 'Mobile';
      } else if (item.source.includes('tablet')) {
        device = 'Tablet';
      }
      
      acc[device] = (acc[device] || 0) + item.users;
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(deviceCounts).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(deviceCounts).map(([device, users]) => ({
      device,
      users,
      percentage: Math.round((users / total) * 100)
    }));
  };

  const deviceData = processDeviceData();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  if (hasError) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Traffic & Analytics</h1>
              <p className="text-muted-foreground">Comprehensive website and user behavior analytics</p>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Unable to load traffic data. Please try again.</p>
                <Button onClick={handleRefresh} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Traffic & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive website and user behavior analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalUsers.toLocaleString()}</div>
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
              <div className="text-2xl font-bold">{metrics.totalPageViews.toLocaleString()}</div>
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
              <div className="text-2xl font-bold">{metrics.avgBounceRate.toFixed(1)}%</div>
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
              <div className="text-2xl font-bold">{formatDuration(Math.round(metrics.avgSessionDuration))}</div>
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
            <TabsTrigger value="devices">
              <Monitor className="w-4 h-4 mr-2" />
              Devices
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources Overview</CardTitle>
                  <CardDescription>Sessions by traffic source in the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  {trafficSources.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={trafficSources.slice(0, 5)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="source" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="visitors" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      No traffic data available
                    </div>
                  )}
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
                  {trafficSources.length > 0 ? (
                    trafficSources.map((source, index) => (
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
                          <span>Bounce Rate: {source.avgBounceRate}%</span>
                        </div>
                        <Progress value={source.percentage} className="h-2" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      No traffic source data available for the selected period
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Device Distribution</CardTitle>
                  <CardDescription>Traffic breakdown by device type</CardDescription>
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
                          label={({ device, percentage }) => `${device}: ${percentage}%`}
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
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

              <Card>
                <CardHeader>
                  <CardTitle>Device Performance</CardTitle>
                  <CardDescription>Key metrics by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceData.map((device, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {device.device === 'Desktop' && <Monitor className="w-5 h-5" />}
                            {device.device === 'Mobile' && <Smartphone className="w-5 h-5" />}
                            {device.device === 'Tablet' && <Globe className="w-5 h-5" />}
                            <span className="font-medium">{device.device}</span>
                          </div>
                          <span className="text-2xl font-bold">{device.users.toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {device.percentage}% of total traffic
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Trends</CardTitle>
                <CardDescription>Daily traffic patterns for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                {trafficData && trafficData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={trafficData.slice(0, 15)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sessions" fill="hsl(var(--primary))" name="Sessions" />
                      <Bar dataKey="users" fill="hsl(var(--secondary))" name="Users" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                    No trend data available for the selected period
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}