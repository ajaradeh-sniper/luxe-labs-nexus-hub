import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BarChart3, Plus, Edit, Trash2, Download, Filter, Calendar, TrendingUp, Users, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DatePickerWithRange } from "@/components/ui/date-picker"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AnalyticsCenterProps {
  open: boolean
  onClose: () => void
}

interface AnalyticsData {
  website: any[]
  traffic: any[]
  marketing: any[]
  conversion: any[]
  campaign: any[]
}

interface MetricData {
  id: string
  date: string
  metric_type: string
  metric_value: number
  category: string
  metadata: any
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))']

export function AnalyticsCenter({ open, onClose }: AnalyticsCenterProps) {
  const { toast } = useToast()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    website: [],
    traffic: [],
    marketing: [],
    conversion: [],
    campaign: []
  })
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [selectedDateRange, setSelectedDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  })
  const [selectedMetric, setSelectedMetric] = useState("website")
  const [loading, setLoading] = useState(false)
  const [newMetric, setNewMetric] = useState({
    metric_type: "",
    metric_value: 0,
    category: ""
  })
  const [editingMetric, setEditingMetric] = useState<MetricData | null>(null)

  useEffect(() => {
    if (open) {
      loadAnalyticsData()
      loadMetrics()
    }
  }, [open, selectedDateRange])

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      const startDate = selectedDateRange.from.toISOString().split('T')[0]
      const endDate = selectedDateRange.to.toISOString().split('T')[0]

      const [website, traffic, marketing, conversion, campaign] = await Promise.all([
        supabase.from('website_analytics').select('*').gte('date', startDate).lte('date', endDate),
        supabase.from('traffic_analytics').select('*').gte('date', startDate).lte('date', endDate),
        supabase.from('marketing_analytics').select('*').gte('date', startDate).lte('date', endDate),
        supabase.from('conversion_analytics').select('*').gte('date', startDate).lte('date', endDate),
        supabase.from('campaign_analytics').select('*').gte('date', startDate).lte('date', endDate)
      ])

      setAnalyticsData({
        website: website.data || [],
        traffic: traffic.data || [],
        marketing: marketing.data || [],
        conversion: conversion.data || [],
        campaign: campaign.data || []
      })
    } catch (error) {
      console.error('Error loading analytics:', error)
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const loadMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('system_analytics')
        .select('*')
        .order('recorded_at', { ascending: false })

      if (error) throw error
      const transformedData = (data || []).map(item => ({
        ...item,
        date: item.recorded_at.split('T')[0] // Convert timestamp to date
      }))
      setMetrics(transformedData)
    } catch (error) {
      console.error('Error loading metrics:', error)
    }
  }

  const addMetric = async () => {
    if (!newMetric.metric_type) return

    try {
      const { error } = await supabase
        .from('system_analytics')
        .insert({
          metric_name: newMetric.metric_type,
          metric_type: newMetric.metric_type,
          metric_value: newMetric.metric_value,
          category: newMetric.category
        })

      if (error) throw error

      toast({
        title: "Metric added",
        description: "New metric has been created successfully"
      })

      setNewMetric({ metric_type: "", metric_value: 0, category: "" })
      loadMetrics()
    } catch (error) {
      console.error('Error adding metric:', error)
      toast({
        title: "Error",
        description: "Failed to add metric",
        variant: "destructive"
      })
    }
  }

  const updateMetric = async () => {
    if (!editingMetric) return

    try {
      const { error } = await supabase
        .from('system_analytics')
        .update({
          metric_type: editingMetric.metric_type,
          metric_value: editingMetric.metric_value,
          category: editingMetric.category
        })
        .eq('id', editingMetric.id)

      if (error) throw error

      toast({
        title: "Metric updated",
        description: "Metric has been updated successfully"
      })

      setEditingMetric(null)
      loadMetrics()
    } catch (error) {
      console.error('Error updating metric:', error)
      toast({
        title: "Error",
        description: "Failed to update metric",
        variant: "destructive"
      })
    }
  }

  const deleteMetric = async (id: string) => {
    try {
      const { error } = await supabase
        .from('system_analytics')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Metric deleted",
        description: "Metric has been deleted successfully"
      })

      loadMetrics()
    } catch (error) {
      console.error('Error deleting metric:', error)
      toast({
        title: "Error",
        description: "Failed to delete metric",
        variant: "destructive"
      })
    }
  }

  const exportData = () => {
    const dataToExport = analyticsData[selectedMetric as keyof AnalyticsData]
    const csv = [
      Object.keys(dataToExport[0] || {}).join(','),
      ...dataToExport.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedMetric}_analytics.csv`
    a.click()
  }

  const getSummaryStats = () => {
    const data = analyticsData[selectedMetric as keyof AnalyticsData]
    if (!data.length) return { total: 0, average: 0, growth: 0 }

    const total = data.reduce((sum, item) => sum + (item.value || item.visitors || item.sessions || item.impressions || 0), 0)
    const average = total / data.length
    const growth = data.length > 1 ? ((data[data.length - 1]?.value || 0) - (data[0]?.value || 0)) / (data[0]?.value || 1) * 100 : 0

    return { total, average, growth }
  }

  const stats = getSummaryStats()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics Center
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Input type="date" className="w-32" />
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.average.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.growth.toFixed(1)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Points</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData[selectedMetric as keyof AnalyticsData].length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="charts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="metrics">Custom Metrics</TabsTrigger>
            <TabsTrigger value="data">Raw Data</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website Analytics</SelectItem>
                  <SelectItem value="traffic">Traffic Analytics</SelectItem>
                  <SelectItem value="marketing">Marketing Analytics</SelectItem>
                  <SelectItem value="conversion">Conversion Analytics</SelectItem>
                  <SelectItem value="campaign">Campaign Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData[selectedMetric as keyof AnalyticsData]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData[selectedMetric as keyof AnalyticsData]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Custom Metrics</h3>
              <Button onClick={() => setEditingMetric({} as MetricData)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Metric
              </Button>
            </div>

            {editingMetric !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingMetric.id ? 'Edit Metric' : 'Add New Metric'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="metric_type">Type</Label>
                      <Input
                        id="metric_type"
                        value={editingMetric.metric_type || newMetric.metric_type}
                        onChange={(e) => editingMetric.id 
                          ? setEditingMetric({...editingMetric, metric_type: e.target.value})
                          : setNewMetric({...newMetric, metric_type: e.target.value})
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="metric_type">Type</Label>
                      <Select 
                        value={editingMetric.metric_type || newMetric.metric_type}
                        onValueChange={(value) => editingMetric.id
                          ? setEditingMetric({...editingMetric, metric_type: value})
                          : setNewMetric({...newMetric, metric_type: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">Revenue</SelectItem>
                          <SelectItem value="growth">Growth</SelectItem>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="metric_value">Value</Label>
                      <Input
                        id="metric_value"
                        type="number"
                        value={editingMetric.metric_value || newMetric.metric_value}
                        onChange={(e) => editingMetric.id
                          ? setEditingMetric({...editingMetric, metric_value: parseFloat(e.target.value)})
                          : setNewMetric({...newMetric, metric_value: parseFloat(e.target.value)})
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={editingMetric.category || newMetric.category}
                        onChange={(e) => editingMetric.id
                          ? setEditingMetric({...editingMetric, category: e.target.value})
                          : setNewMetric({...newMetric, category: e.target.value})
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={editingMetric.id ? updateMetric : addMetric}>
                      {editingMetric.id ? 'Update' : 'Add'} Metric
                    </Button>
                    <Button variant="outline" onClick={() => setEditingMetric(null)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 gap-4">
              {metrics.map((metric) => (
                <Card key={metric.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <h4 className="font-medium">{metric.metric_type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {metric.metric_type} • {metric.category}
                      </p>
                      <p className="text-2xl font-bold">{metric.metric_value}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingMetric(metric)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMetric(metric.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Raw Data - {selectedMetric}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analyticsData[selectedMetric as keyof AnalyticsData].map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.value || item.visitors || item.sessions || item.impressions || 0}</TableCell>
                        <TableCell>{item.source || item.channel || 'N/A'}</TableCell>
                        <TableCell>{selectedMetric}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}