import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Edit
} from "lucide-react"

export default function MarketingTools() {
  const [selectedCampaign, setSelectedCampaign] = useState("email")

  const campaigns = [
    {
      id: 1,
      name: "Marina Tower Launch Campaign",
      type: "Email",
      status: "active",
      sent: 2450,
      opens: 1120,
      clicks: 340,
      conversions: 28,
      budget: 5000,
      spent: 3200
    },
    {
      id: 2,
      name: "Downtown Luxury Social Media",
      type: "Social",
      status: "paused",
      impressions: 85000,
      engagements: 4200,
      clicks: 850,
      conversions: 15,
      budget: 8000,
      spent: 4500
    },
    {
      id: 3,
      name: "Investment Portfolio Newsletter",
      type: "Newsletter",
      status: "draft",
      subscribers: 5600,
      scheduled: "2024-01-20",
      budget: 2000,
      spent: 0
    }
  ]

  const marketingStats = [
    {
      title: "Total Reach",
      value: "125K",
      change: "+18.5%",
      icon: Users
    },
    {
      title: "Campaign ROI",
      value: "340%",
      change: "+25.2%", 
      icon: Target
    },
    {
      title: "Email Open Rate",
      value: "45.7%",
      change: "+12.3%",
      icon: Mail
    },
    {
      title: "Conversion Rate",
      value: "2.8%",
      change: "+5.1%",
      icon: BarChart3
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20'
      case 'paused': return 'bg-warning/10 text-warning border-warning/20'
      case 'draft': return 'bg-muted text-muted-foreground border-muted'
      case 'completed': return 'bg-primary/10 text-primary border-primary/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const calculateRate = (num: number, total: number) => {
    return total > 0 ? ((num / total) * 100).toFixed(1) : '0.0'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marketing Tools</h1>
          <p className="text-muted-foreground">Manage your marketing campaigns and analytics</p>
        </div>
        <Button variant="luxury">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
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
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-6 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{campaign.name}</h3>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{campaign.type} Campaign</p>
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
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {campaign.type === "Email" && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Sent</p>
                          <p className="font-semibold">{campaign.sent?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Opens</p>
                          <p className="font-semibold">
                            {campaign.opens?.toLocaleString()} 
                            <span className="text-success ml-1">
                              ({calculateRate(campaign.opens!, campaign.sent!)}%)
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Clicks</p>
                          <p className="font-semibold">
                            {campaign.clicks?.toLocaleString()}
                            <span className="text-success ml-1">
                              ({calculateRate(campaign.clicks!, campaign.opens!)}%)
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversions</p>
                          <p className="font-semibold">
                            {campaign.conversions}
                            <span className="text-success ml-1">
                              ({calculateRate(campaign.conversions!, campaign.clicks!)}%)
                            </span>
                          </p>
                        </div>
                      </div>
                    )}

                    {campaign.type === "Social" && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Impressions</p>
                          <p className="font-semibold">{campaign.impressions?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Engagements</p>
                          <p className="font-semibold">
                            {campaign.engagements?.toLocaleString()}
                            <span className="text-success ml-1">
                              ({calculateRate(campaign.engagements!, campaign.impressions!)}%)
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Clicks</p>
                          <p className="font-semibold">{campaign.clicks?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversions</p>
                          <p className="font-semibold">{campaign.conversions}</p>
                        </div>
                      </div>
                    )}

                    {campaign.type === "Newsletter" && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Subscribers</p>
                          <p className="font-semibold">{campaign.subscribers?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Scheduled</p>
                          <p className="font-semibold">{campaign.scheduled}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p className="font-semibold">Ready to Send</p>
                        </div>
                      </div>
                    )}

                    {/* Budget Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Utilization</span>
                        <span>${campaign.spent?.toLocaleString()} / ${campaign.budget?.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(campaign.spent! / campaign.budget!) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                      <p className="text-muted-foreground">Create and manage email templates</p>
                      <Button className="mt-4" variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        New Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Subscriber Lists</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                      <p className="text-muted-foreground">Manage your subscriber lists</p>
                      <Button className="mt-4" variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        New List
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Social Media Tools</h3>
                <p className="text-muted-foreground">Social media scheduling and analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground">Detailed marketing analytics and insights coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}