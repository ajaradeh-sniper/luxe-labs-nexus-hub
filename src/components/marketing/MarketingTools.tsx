import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Target, TrendingUp, Users, DollarSign, Calendar, Plus, Eye, Edit, Play, Pause } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAsyncOperation } from "@/hooks/useAsyncOperation"

interface MarketingCampaign {
  id: string
  name: string
  campaign_type: string
  status: string
  target_audience?: string
  budget?: number
  start_date?: string
  end_date?: string
  metrics: any
  created_at: string
}

export function MarketingTools() {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("campaigns")
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    campaign_type: "",
    target_audience: "",
    budget: "",
    start_date: "",
    end_date: "",
    description: ""
  })
  const { toast } = useToast()

  const { execute: loadCampaigns } = useAsyncOperation(
    async () => {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      
      setCampaigns(data || [])
      return { data, error: null }
    },
    {
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to load marketing campaigns",
          variant: "destructive",
        })
      }
    }
  )

  const { execute: createCampaign } = useAsyncOperation(
    async () => {
      if (!campaignForm.name || !campaignForm.campaign_type) {
        return { data: null, error: "Name and campaign type are required" }
      }

      const { data, error } = await supabase
        .from('marketing_campaigns')
        .insert({
          name: campaignForm.name,
          campaign_type: campaignForm.campaign_type,
          target_audience: campaignForm.target_audience || null,
          budget: campaignForm.budget ? parseFloat(campaignForm.budget) : null,
          start_date: campaignForm.start_date || null,
          end_date: campaignForm.end_date || null,
          metrics: { impressions: 0, clicks: 0, conversions: 0, ctr: 0 }
        })
        .select()

      if (error) return { data: null, error: error.message }

      setIsDialogOpen(false)
      setCampaignForm({
        name: "",
        campaign_type: "",
        target_audience: "",
        budget: "",
        start_date: "",
        end_date: "",
        description: ""
      })
      loadCampaigns()
      
      return { data, error: null }
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Marketing campaign created successfully",
        })
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        })
      }
    }
  )

  const { execute: updateCampaignStatus } = useAsyncOperation(
    async (campaignId: string, newStatus: string) => {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .update({ status: newStatus })
        .eq('id', campaignId)
        .select()

      if (error) return { data: null, error: error.message }
      
      loadCampaigns()
      return { data, error: null }
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Campaign status updated",
        })
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        })
      }
    }
  )

  useEffect(() => {
    loadCampaigns()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground'
      case 'paused': return 'bg-warning text-warning-foreground'
      case 'completed': return 'bg-primary text-primary-foreground'
      default: return 'bg-secondary text-secondary-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'social': return <Users className="h-4 w-4" />
      case 'listing': return <Target className="h-4 w-4" />
      default: return <TrendingUp className="h-4 w-4" />
    }
  }

  const calculateCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0.00'
  }

  // Mock data for analytics
  const analyticsData = {
    totalImpressions: 125400,
    totalClicks: 3456,
    totalConversions: 89,
    averageCTR: 2.76,
    totalSpend: 12450,
    roi: 156
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing Tools</h2>
          <p className="text-muted-foreground">Manage campaigns, track performance, and generate leads</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Marketing Campaign</DialogTitle>
              <DialogDescription>Set up a new marketing campaign to promote your properties</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                  placeholder="Downtown Luxury Apartments - Q1 2024"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Campaign Type *</Label>
                <Select value={campaignForm.campaign_type} onValueChange={(value) => setCampaignForm({ ...campaignForm, campaign_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Marketing</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="listing">Property Listings</SelectItem>
                    <SelectItem value="event">Events & Open Houses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="target_audience">Target Audience</Label>
                  <Input
                    id="target_audience"
                    value={campaignForm.target_audience}
                    onChange={(e) => setCampaignForm({ ...campaignForm, target_audience: e.target.value })}
                    placeholder="Young professionals, 25-40"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={campaignForm.budget}
                    onChange={(e) => setCampaignForm({ ...campaignForm, budget: e.target.value })}
                    placeholder="5000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={campaignForm.start_date}
                    onChange={(e) => setCampaignForm({ ...campaignForm, start_date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={campaignForm.end_date}
                    onChange={(e) => setCampaignForm({ ...campaignForm, end_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                  placeholder="Campaign objectives and strategy..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => createCampaign()}>
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="leads">Lead Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {getTypeIcon(campaign.campaign_type)}
                        {campaign.name}
                      </CardTitle>
                      <CardDescription>
                        {campaign.target_audience && `Target: ${campaign.target_audience}`}
                        {campaign.budget && ` • Budget: $${campaign.budget.toLocaleString()}`}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      <div className="flex gap-1">
                        {campaign.status === 'active' ? (
                          <Button size="sm" variant="outline" onClick={() => updateCampaignStatus(campaign.id, 'paused')}>
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : campaign.status === 'paused' ? (
                          <Button size="sm" variant="outline" onClick={() => updateCampaignStatus(campaign.id, 'active')}>
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : null}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Impressions</div>
                      <div className="font-medium">{campaign.metrics?.impressions?.toLocaleString() || '0'}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Clicks</div>
                      <div className="font-medium">{campaign.metrics?.clicks?.toLocaleString() || '0'}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">CTR</div>
                      <div className="font-medium">{calculateCTR(campaign.metrics?.clicks || 0, campaign.metrics?.impressions || 0)}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Conversions</div>
                      <div className="font-medium">{campaign.metrics?.conversions || 0}</div>
                    </div>
                  </div>
                  {campaign.start_date && campaign.end_date && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Campaign Progress</span>
                        <span>{new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {campaigns.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Campaigns Yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Create your first marketing campaign to start promoting your properties
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalImpressions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalClicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalConversions}</div>
                <p className="text-xs text-muted-foreground">+23.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.averageCTR}%</div>
                <p className="text-xs text-muted-foreground">+0.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analyticsData.totalSpend.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+5.7% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROI</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.roi}%</div>
                <p className="text-xs text-muted-foreground">+15.2% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Generation Tools</CardTitle>
              <CardDescription>Capture and nurture potential clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Property Interest Forms</h4>
                    <p className="text-sm text-muted-foreground">Embed forms on property listings to capture leads</p>
                  </div>
                  <Button>Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Newsletter Signup</h4>
                    <p className="text-sm text-muted-foreground">Build your subscriber list with property updates</p>
                  </div>
                  <Button>Set Up</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Virtual Tour Requests</h4>
                    <p className="text-sm text-muted-foreground">Allow prospects to request virtual property tours</p>
                  </div>
                  <Button>Enable</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Investment Calculator</h4>
                    <p className="text-sm text-muted-foreground">Interactive ROI calculator for investor leads</p>
                  </div>
                  <Button>Create</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}