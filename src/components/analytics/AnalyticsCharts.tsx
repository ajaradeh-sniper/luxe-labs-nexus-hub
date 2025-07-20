import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react'

// Sample data - in real app this would come from API
const performanceData = [
  { month: 'Jan', revenue: 45000, projects: 8, roi: 12.5 },
  { month: 'Feb', revenue: 52000, projects: 10, roi: 15.2 },
  { month: 'Mar', revenue: 48000, projects: 9, roi: 11.8 },
  { month: 'Apr', revenue: 61000, projects: 12, roi: 18.4 },
  { month: 'May', revenue: 55000, projects: 11, roi: 16.7 },
  { month: 'Jun', revenue: 67000, projects: 14, roi: 21.3 }
]

const projectStatusData = [
  { name: 'Completed', value: 35, color: 'hsl(var(--success))' },
  { name: 'In Progress', value: 28, color: 'hsl(var(--primary))' },
  { name: 'Planning', value: 15, color: 'hsl(var(--warning))' },
  { name: 'On Hold', value: 8, color: 'hsl(var(--muted))' }
]

const investmentData = [
  { quarter: 'Q1', residential: 2.4, commercial: 1.8, luxury: 3.2 },
  { quarter: 'Q2', residential: 2.8, commercial: 2.1, luxury: 3.8 },
  { quarter: 'Q3', residential: 3.1, commercial: 2.4, luxury: 4.1 },
  { quarter: 'Q4', residential: 3.5, commercial: 2.7, luxury: 4.6 }
]

const kpiData = [
  {
    title: "Total Revenue",
    value: "$328K",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign
  },
  {
    title: "Active Projects",
    value: "42",
    change: "+8.2%",
    trend: "up",
    icon: Activity
  },
  {
    title: "Average ROI",
    value: "16.8%",
    change: "+2.3%",
    trend: "up",
    icon: TrendingUp
  },
  {
    title: "Client Satisfaction",
    value: "94%",
    change: "-1.2%",
    trend: "down",
    icon: TrendingDown
  }
]

export function AnalyticsCharts() {
  return (
    <div className="space-y-6" role="main" aria-label="Analytics Dashboard">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="elegant-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {kpi.title}
                    </p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className={`text-sm flex items-center gap-1 ${
                      kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {kpi.change}
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Revenue and ROI Chart */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle>Revenue & ROI Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  name="Revenue ($)"
                />
                <Line 
                  type="monotone" 
                  dataKey="roi" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3} 
                  name="ROI (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Distribution */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Investment by Property Type */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle>Investment by Property Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={investmentData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="quarter" 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="residential" fill="hsl(var(--primary))" name="Residential" />
                  <Bar dataKey="commercial" fill="hsl(var(--secondary))" name="Commercial" />
                  <Bar dataKey="luxury" fill="hsl(var(--primary-glow))" name="Luxury" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Area Chart */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle>Project Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  name="Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="projects" 
                  stroke="hsl(var(--success))" 
                  fillOpacity={1} 
                  fill="url(#colorProjects)" 
                  name="Projects"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}