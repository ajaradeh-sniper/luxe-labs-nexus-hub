import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Send,
  Plus,
  Settings,
  Users,
  FileText as Template,
  Calendar,
  Clock,
  Check,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  variables: string[]
  category: string
  is_active: boolean
  created_at: string
}

interface EmailCampaign {
  id: string
  name: string
  template_id: string
  recipients: string[]
  scheduled_at?: string
  sent_at?: string
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
  stats: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    bounced: number
  }
}

interface EmailSettings {
  smtp_host: string
  smtp_port: number
  smtp_username: string
  smtp_password: string
  from_email: string
  from_name: string
  reply_to: string
  use_resend: boolean
  resend_api_key: string
}

export function EmailSystem() {
  const { user } = useAuth()
  const { toast } = useToast()
  
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([])
  const [settings, setSettings] = useState<EmailSettings>({
    smtp_host: "",
    smtp_port: 587,
    smtp_username: "",
    smtp_password: "",
    from_email: "",
    from_name: "",
    reply_to: "",
    use_resend: true,
    resend_api_key: ""
  })
  
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    content: "",
    category: "",
    variables: [] as string[]
  })
  
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    template_id: "",
    recipients: [] as string[],
    scheduled_at: ""
  })
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [recipientEmail, setRecipientEmail] = useState("")

  const templateCategories = [
    "Welcome",
    "Notification",
    "Marketing",
    "System",
    "Investment",
    "Project Update",
    "Approval Request",
    "Reminder"
  ]

  const emailVariables = [
    "{{user_name}}",
    "{{user_email}}",
    "{{company_name}}",
    "{{project_name}}",
    "{{amount}}",
    "{{deadline}}",
    "{{link}}",
    "{{date}}"
  ]

  useEffect(() => {
    loadTemplates()
    loadCampaigns()
    loadSettings()
  }, [])

  const loadTemplates = async () => {
    try {
      // Mock data - replace with actual Supabase query
      const mockTemplates: EmailTemplate[] = [
        {
          id: "1",
          name: "Welcome Email",
          subject: "Welcome to {{company_name}}",
          content: "Hi {{user_name}},\n\nWelcome to our platform!",
          variables: ["user_name", "company_name"],
          category: "Welcome",
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: "2", 
          name: "Investment Opportunity",
          subject: "New Investment Opportunity: {{project_name}}",
          content: "Hi {{user_name}},\n\nWe have a new investment opportunity for {{amount}}.",
          variables: ["user_name", "project_name", "amount"],
          category: "Investment",
          is_active: true,
          created_at: new Date().toISOString()
        }
      ]
      setTemplates(mockTemplates)
    } catch (error) {
      console.error('Error loading templates:', error)
    }
  }

  const loadCampaigns = async () => {
    try {
      // Mock data - replace with actual Supabase query
      const mockCampaigns: EmailCampaign[] = [
        {
          id: "1",
          name: "Welcome Series",
          template_id: "1",
          recipients: ["john@example.com", "jane@example.com"],
          status: "sent",
          stats: { sent: 2, delivered: 2, opened: 1, clicked: 0, bounced: 0 }
        }
      ]
      setCampaigns(mockCampaigns)
    } catch (error) {
      console.error('Error loading campaigns:', error)
    }
  }

  const loadSettings = async () => {
    try {
      // Load email settings from database or local storage
      const savedSettings = localStorage.getItem('email_settings')
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const saveTemplate = async () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const template: EmailTemplate = {
        id: `template-${Date.now()}`,
        ...newTemplate,
        is_active: true,
        created_at: new Date().toISOString()
      }

      setTemplates(prev => [...prev, template])
      setNewTemplate({ name: "", subject: "", content: "", category: "", variables: [] })

      toast({
        title: "Template saved",
        description: "Email template has been created successfully"
      })
    } catch (error) {
      console.error('Error saving template:', error)
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      })
    }
  }

  const sendEmail = async (templateId: string, recipients: string[], variables: Record<string, string> = {}) => {
    try {
      const template = templates.find(t => t.id === templateId)
      if (!template) throw new Error("Template not found")

      // Replace variables in subject and content
      let subject = template.subject
      let content = template.content

      Object.entries(variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`
        subject = subject.replace(new RegExp(placeholder, 'g'), value)
        content = content.replace(new RegExp(placeholder, 'g'), value)
      })

      // Call Supabase Edge Function to send email
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: recipients,
          subject: subject,
          html: content.replace(/\n/g, '<br>'),
          from: settings.from_email || 'noreply@luxurylabs.com'
        }
      })

      if (error) throw error

      toast({
        title: "Email sent",
        description: `Email sent to ${recipients.length} recipient(s)`
      })

      return true
    } catch (error) {
      console.error('Error sending email:', error)
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive"
      })
      return false
    }
  }

  const createCampaign = async () => {
    if (!newCampaign.name || !newCampaign.template_id || newCampaign.recipients.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const campaign: EmailCampaign = {
        id: `campaign-${Date.now()}`,
        ...newCampaign,
        status: newCampaign.scheduled_at ? 'scheduled' : 'draft',
        stats: { sent: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0 }
      }

      setCampaigns(prev => [...prev, campaign])
      setNewCampaign({ name: "", template_id: "", recipients: [], scheduled_at: "" })

      toast({
        title: "Campaign created",
        description: "Email campaign has been created successfully"
      })
    } catch (error) {
      console.error('Error creating campaign:', error)
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive"
      })
    }
  }

  const saveSettings = async () => {
    try {
      localStorage.setItem('email_settings', JSON.stringify(settings))
      
      // If using Resend, save API key to Supabase secrets
      if (settings.use_resend && settings.resend_api_key) {
        // This would typically be handled by an admin function
        console.log('Saving Resend API key to secrets...')
      }

      toast({
        title: "Settings saved",
        description: "Email settings have been updated"
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      })
    }
  }

  const addRecipient = () => {
    if (recipientEmail && !newCampaign.recipients.includes(recipientEmail)) {
      setNewCampaign(prev => ({
        ...prev,
        recipients: [...prev.recipients, recipientEmail]
      }))
      setRecipientEmail("")
    }
  }

  const removeRecipient = (email: string) => {
    setNewCampaign(prev => ({
      ...prev,
      recipients: prev.recipients.filter(r => r !== email)
    }))
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Email System</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Email Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="Enter template name..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-category">Category</Label>
                    <Select value={newTemplate.category} onValueChange={(value) => 
                      setNewTemplate({...newTemplate, category: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {templateCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="template-subject">Subject Line</Label>
                  <Input
                    id="template-subject"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                    placeholder="Enter email subject..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="template-content">Email Content</Label>
                  <Textarea
                    id="template-content"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    placeholder="Enter email content..."
                    rows={8}
                  />
                </div>
                
                <div>
                  <Label>Available Variables</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {emailVariables.map(variable => (
                      <Badge 
                        key={variable} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => {
                          const textArea = document.getElementById('template-content') as HTMLTextAreaElement
                          if (textArea) {
                            const start = textArea.selectionStart
                            const end = textArea.selectionEnd
                            const newContent = newTemplate.content.substring(0, start) + 
                                             variable + 
                                             newTemplate.content.substring(end)
                            setNewTemplate({...newTemplate, content: newContent})
                          }
                        }}
                      >
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button onClick={saveTemplate} className="w-full">
                  Save Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Email Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    placeholder="Enter campaign name..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="campaign-template">Email Template</Label>
                  <Select value={newCampaign.template_id} onValueChange={(value) => 
                    setNewCampaign({...newCampaign, template_id: value})
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Recipients</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="Enter email address..."
                      onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
                    />
                    <Button onClick={addRecipient}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newCampaign.recipients.map(email => (
                      <Badge key={email} variant="secondary" className="cursor-pointer">
                        {email}
                        <button 
                          onClick={() => removeRecipient(email)}
                          className="ml-1 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="schedule-date">Schedule (Optional)</Label>
                  <Input
                    id="schedule-date"
                    type="datetime-local"
                    value={newCampaign.scheduled_at}
                    onChange={(e) => setNewCampaign({...newCampaign, scheduled_at: e.target.value})}
                  />
                </div>
                
                <Button onClick={createCampaign} className="w-full">
                  Create Campaign
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {templateCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.category}</CardDescription>
                    </div>
                    <Badge variant={template.is_active ? "default" : "secondary"}>
                      {template.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Subject:</p>
                    <p className="text-xs text-muted-foreground truncate">{template.subject}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Preview:</p>
                    <p className="text-xs text-muted-foreground line-clamp-3">{template.content}</p>
                  </div>
                  
                  {template.variables.length > 0 && (
                    <div>
                      <p className="text-sm font-medium">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map(variable => (
                          <Badge key={variable} variant="outline" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => sendEmail(template.id, ['test@example.com'])}
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {campaigns.map((campaign) => {
              const template = templates.find(t => t.id === campaign.template_id)
              return (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-5 w-5" />
                          {campaign.name}
                        </CardTitle>
                        <CardDescription>
                          Template: {template?.name} • Recipients: {campaign.recipients.length}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={
                        campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'sending' ? 'bg-yellow-100 text-yellow-800' :
                        campaign.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold">{campaign.stats.sent}</p>
                        <p className="text-xs text-muted-foreground">Sent</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{campaign.stats.delivered}</p>
                        <p className="text-xs text-muted-foreground">Delivered</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{campaign.stats.opened}</p>
                        <p className="text-xs text-muted-foreground">Opened</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{campaign.stats.clicked}</p>
                        <p className="text-xs text-muted-foreground">Clicked</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{campaign.stats.bounced}</p>
                        <p className="text-xs text-muted-foreground">Bounced</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {campaign.status === 'draft' && (
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Send Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{templates.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{campaigns.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((sum, c) => sum + c.stats.sent, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.length > 0 
                    ? Math.round((campaigns.reduce((sum, c) => sum + c.stats.opened, 0) / campaigns.reduce((sum, c) => sum + c.stats.sent, 0)) * 100)
                    : 0}%
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure your email sending settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="use-resend"
                  checked={settings.use_resend}
                  onCheckedChange={(checked) => setSettings({...settings, use_resend: checked})}
                />
                <Label htmlFor="use-resend">Use Resend (Recommended)</Label>
              </div>

              {settings.use_resend ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resend-key">Resend API Key</Label>
                    <Input
                      id="resend-key"
                      type="password"
                      value={settings.resend_api_key}
                      onChange={(e) => setSettings({...settings, resend_api_key: e.target.value})}
                      placeholder="re_..."
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input
                      id="smtp-host"
                      value={settings.smtp_host}
                      onChange={(e) => setSettings({...settings, smtp_host: e.target.value})}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      value={settings.smtp_port}
                      onChange={(e) => setSettings({...settings, smtp_port: parseInt(e.target.value)})}
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-username">Username</Label>
                    <Input
                      id="smtp-username"
                      value={settings.smtp_username}
                      onChange={(e) => setSettings({...settings, smtp_username: e.target.value})}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-password">Password</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      value={settings.smtp_password}
                      onChange={(e) => setSettings({...settings, smtp_password: e.target.value})}
                      placeholder="your-password"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from-email">From Email</Label>
                  <Input
                    id="from-email"
                    value={settings.from_email}
                    onChange={(e) => setSettings({...settings, from_email: e.target.value})}
                    placeholder="noreply@luxurylabs.com"
                  />
                </div>
                <div>
                  <Label htmlFor="from-name">From Name</Label>
                  <Input
                    id="from-name"
                    value={settings.from_name}
                    onChange={(e) => setSettings({...settings, from_name: e.target.value})}
                    placeholder="Luxury Labs"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reply-to">Reply To</Label>
                <Input
                  id="reply-to"
                  value={settings.reply_to}
                  onChange={(e) => setSettings({...settings, reply_to: e.target.value})}
                  placeholder="support@luxurylabs.com"
                />
              </div>

              <Button onClick={saveSettings}>
                <Settings className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}