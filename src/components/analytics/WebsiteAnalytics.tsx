import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Monitor
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data - in real app this would come from analytics API
const visitorData = [
  { date: '2024-01-01', visitors: 1200, returning: 480, new: 720 },
  { date: '2024-01-02', visitors: 1450, returning: 580, new: 870 },
  { date: '2024-01-03', visitors: 1300, returning: 520, new: 780 },
  { date: '2024-01-04', visitors: 1600, returning: 640, new: 960 },
  { date: '2024-01-05', visitors: 1750, returning: 700, new: 1050 },
  { date: '2024-01-06', visitors: 1900, returning: 760, new: 1140 },
  { date: '2024-01-07', visitors: 2100, returning: 840, new: 1260 }
];

const conversionData = [
  { action: 'Sign Up', count: 125, rate: 8.5 },
  { action: 'Sign In', count: 890, rate: 45.2 },
  { action: 'Request Callback', count: 67, rate: 4.3 },
  { action: 'Send Message', count: 234, rate: 15.8 },
  { action: 'Newsletter Subscribe', count: 156, rate: 10.5 }
];

const deviceData = [
  { device: 'Desktop', users: 1245, percentage: 52 },
  { device: 'Mobile', users: 892, percentage: 37 },
  { device: 'Tablet', users: 263, percentage: 11 }
];

const pageViewsData = [
  { page: 'Homepage', views: 4562, uniqueViews: 3234, bounceRate: 23.5 },
  { page: 'Properties', views: 3421, uniqueViews: 2891, bounceRate: 18.7 },
  { page: 'About', views: 1876, uniqueViews: 1654, bounceRate: 32.1 },
  { page: 'Contact', views: 987, uniqueViews: 823, bounceRate: 41.2 },
  { page: 'Services', views: 2134, uniqueViews: 1876, bounceRate: 28.9 }
];

const heatmapData = [
  { zone: 'Header Navigation', clicks: 2345, engagement: 85 },
  { zone: 'Hero CTA Button', clicks: 1876, engagement: 92 },
  { zone: 'Property Listings', clicks: 3421, engagement: 78 },
  { zone: 'Contact Form', clicks: 567, engagement: 65 },
  { zone: 'Footer Links', clicks: 234, engagement: 34 }
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

export function WebsiteAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');

  const keyMetrics = [
    {
      title: 'Total Visitors',
      value: '12,453',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      description: 'Unique visitors this week'
    },
    {
      title: 'Returning Visitors',
      value: '4,982',
      change: '+8.3%',
      trend: 'up',
      icon: UserCheck,
      description: '40% of total visitors'
    },
    {
      title: 'New Sign Ups',
      value: '125',
      change: '+15.2%',
      trend: 'up',
      icon: UserPlus,
      description: 'New registrations'
    },
    {
      title: 'Page Views',
      value: '45,673',
      change: '+5.7%',
      trend: 'up',
      icon: Eye,
      description: 'Total page views'
    },
    {
      title: 'Avg Session Duration',
      value: '4m 32s',
      change: '+2.1%',
      trend: 'up',
      icon: Calendar,
      description: 'Time spent on site'
    },
    {
      title: 'Bounce Rate',
      value: '24.5%',
      change: '-3.2%',
      trend: 'down',
      icon: TrendingDown,
      description: 'Single page sessions'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Website Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your website performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="cursor-pointer" onClick={() => setTimeRange('7d')}>
            7 Days
          </Badge>
          <Badge variant="outline" className="cursor-pointer" onClick={() => setTimeRange('30d')}>
            30 Days
          </Badge>
          <Badge variant="outline" className="cursor-pointer" onClick={() => setTimeRange('90d')}>
            90 Days
          </Badge>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="heatmaps">Heatmaps</TabsTrigger>
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
                  <AreaChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="visitors" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>New vs Returning Visitors</CardTitle>
                <CardDescription>User acquisition and retention</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="new" stackId="visitors" fill="hsl(var(--primary))" />
                    <Bar dataKey="returning" stackId="visitors" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
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

        {/* Behavior Tab */}
        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Performance</CardTitle>
              <CardDescription>Most visited pages and their metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pageViewsData.map((page) => (
                  <div key={page.page} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{page.page}</h4>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{page.views.toLocaleString()} views</span>
                        <span>{page.uniqueViews.toLocaleString()} unique</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Bounce Rate</div>
                      <div className="text-2xl font-bold">{page.bounceRate}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversions Tab */}
        <TabsContent value="conversions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Actions</CardTitle>
                <CardDescription>User interactions and conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionData.map((action) => (
                    <div key={action.action} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {action.action === 'Sign Up' && <UserPlus className="h-4 w-4" />}
                        {action.action === 'Sign In' && <UserCheck className="h-4 w-4" />}
                        {action.action === 'Request Callback' && <Phone className="h-4 w-4" />}
                        {action.action === 'Send Message' && <MessageSquare className="h-4 w-4" />}
                        {action.action === 'Newsletter Subscribe' && <BarChart3 className="h-4 w-4" />}
                        <span className="font-medium">{action.action}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{action.count}</div>
                        <div className="text-sm text-muted-foreground">{action.rate}% rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>User journey through key actions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-muted-foreground" />
                    <YAxis dataKey="action" type="category" className="text-muted-foreground" />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Heatmaps Tab */}
        <TabsContent value="heatmaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Click Heatmap Data</CardTitle>
              <CardDescription>Most engaged areas of your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {heatmapData.map((zone) => (
                  <div key={zone.zone} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MousePointer className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">{zone.zone}</h4>
                        <p className="text-sm text-muted-foreground">{zone.clicks.toLocaleString()} clicks</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={zone.engagement} className="w-24" />
                      <span className="text-sm font-medium">{zone.engagement}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}