import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/integrations/supabase/client'
import { LoadingOverlay } from '@/components/LoadingSpinner'
import { useToast } from '@/hooks/use-toast'
import { 
  Users,
  Phone,
  Mail,
  Building,
  Plus,
  Search,
  Edit,
  Eye,
  MessageSquare,
  Calendar,
  Filter,
  UserPlus
} from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  contact_type: string
  status: string
  notes: string | null
  tags: any
  created_at: string
}

interface ContactInteraction {
  id: string
  contact_id: string | null
  interaction_type: string
  subject: string
  description: string | null
  scheduled_at: string | null
  completed_at: string | null
  created_at: string
}

export function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [interactions, setInteractions] = useState<ContactInteraction[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('contacts')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [contactsResponse, interactionsResponse] = await Promise.all([
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_interactions').select('*').order('created_at', { ascending: false })
      ])

      if (contactsResponse.error) throw contactsResponse.error
      if (interactionsResponse.error) throw interactionsResponse.error

      setContacts(contactsResponse.data || [])
      setInteractions(interactionsResponse.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to load contact data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'all' || contact.contact_type === typeFilter
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20'
      case 'inactive': return 'bg-muted text-muted-foreground border-muted'
      case 'lead': return 'bg-primary/10 text-primary border-primary/20'
      case 'client': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'investor': return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      case 'client': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'vendor': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'partner': return 'bg-green-500/10 text-green-500 border-green-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getContactInteractions = (contactId: string) => {
    return interactions.filter(interaction => interaction.contact_id === contactId)
  }

  if (loading) {
    return <LoadingOverlay isLoading={true} loadingText="Loading contacts..."><div /></LoadingOverlay>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Management</h1>
          <p className="text-muted-foreground">Manage your clients, investors, and business contacts</p>
        </div>
        <Button variant="luxury">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contacts.length}</p>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contacts.filter(c => c.status === 'lead').length}</p>
                <p className="text-sm text-muted-foreground">Active Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contacts.filter(c => c.contact_type === 'client').length}</p>
                <p className="text-sm text-muted-foreground">Active Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{interactions.length}</p>
                <p className="text-sm text-muted-foreground">Total Interactions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-6">
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
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      {contact.company && (
                        <p className="text-sm text-muted-foreground">{contact.company}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </div>
                  </div>

                  <Badge className={getTypeColor(contact.contact_type)}>
                    {contact.contact_type}
                  </Badge>

                  <div className="space-y-2">
                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                  </div>

                  {contact.tags && Array.isArray(contact.tags) && contact.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    {getContactInteractions(contact.id).length} interactions
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
                <p className="text-muted-foreground mb-4">
                  {contacts.length === 0 
                    ? "Get started by adding your first contact" 
                    : "Try adjusting your search or filters"}
                </p>
                {contacts.length === 0 && (
                  <Button variant="luxury">
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Contact
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interactions.slice(0, 10).map((interaction) => (
                  <div key={interaction.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{interaction.subject}</h4>
                      <Badge variant="outline">
                        {interaction.interaction_type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {interaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(interaction.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-dashed border-border">
                <div className="text-center">
                  <Filter className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-muted-foreground">Sales Pipeline View</p>
                  <p className="text-sm text-muted-foreground/70">Interactive pipeline would display here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}