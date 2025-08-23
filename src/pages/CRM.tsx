import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  Filter,
  Star,
  Calendar,
  MessageSquare
} from "lucide-react"

export default function CRM() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+971 50 123 4567",
      location: "Dubai Marina",
      status: "hot",
      interest: "Luxury Apartment",
      lastContact: "2024-01-15",
      value: 850000,
      notes: "Interested in 2BR with marina view"
    },
    {
      id: 2,
      name: "Ahmed Al-Rashid", 
      email: "ahmed.rashid@email.com",
      phone: "+971 55 987 6543",
      location: "Business Bay",
      status: "warm",
      interest: "Commercial Space",
      lastContact: "2024-01-12",
      value: 1200000,
      notes: "Looking for office space 200-300 sqm"
    },
    {
      id: 3,
      name: "Emma Thompson",
      email: "emma.thompson@email.com", 
      phone: "+971 52 456 7890",
      location: "Downtown Dubai",
      status: "cold",
      interest: "Investment Portfolio",
      lastContact: "2024-01-08",
      value: 2500000,
      notes: "Seeking multiple properties for investment"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-destructive/10 text-destructive border-destructive/20'
      case 'warm': return 'bg-warning/10 text-warning border-warning/20'
      case 'cold': return 'bg-primary/10 text-primary border-primary/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">

      {/* CRM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">284</p>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Follow-ups Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Conversions This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="leads">Leads Pipeline</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('all')}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={statusFilter === 'hot' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('hot')}
                    size="sm"
                  >
                    Hot
                  </Button>
                  <Button
                    variant={statusFilter === 'warm' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('warm')}
                    size="sm"
                  >
                    Warm
                  </Button>
                  <Button
                    variant={statusFilter === 'cold' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('cold')}
                    size="sm"
                  >
                    Cold
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contacts List */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div key={contact.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{contact.name}</h3>
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status} lead
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{contact.interest}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>{contact.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{contact.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{formatCurrency(contact.value)}</p>
                        <p className="text-sm text-muted-foreground">Potential Value</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Last Contact: {contact.lastContact}</p>
                        <p className="text-sm">{contact.notes}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="mr-1 h-3 w-3" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="mr-1 h-3 w-3" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Leads Pipeline</h3>
                <p className="text-muted-foreground">Visual pipeline and lead tracking coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">Activity Timeline</h3>
                <p className="text-muted-foreground">Activity tracking and timeline coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}