import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, Plus, Phone, Mail, Building, MessageSquare, Calendar, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAsyncOperation } from "@/hooks/useAsyncOperation"

interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  contact_type: string
  company?: string
  status: string
  notes?: string
  tags: string[]
  created_at: string
}

interface ContactInteraction {
  id: string
  contact_id: string
  interaction_type: string
  subject: string
  description?: string
  scheduled_at?: string
  completed_at?: string
  created_at: string
}

export function ContactManagement() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [interactions, setInteractions] = useState<ContactInteraction[]>([])
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isInteractionDialogOpen, setIsInteractionDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    contact_type: "",
    company: "",
    status: "active",
    notes: ""
  })
  const [interactionForm, setInteractionForm] = useState({
    interaction_type: "",
    subject: "",
    description: ""
  })
  const { toast } = useToast()

  const { execute: loadContacts } = useAsyncOperation(
    async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      
      const typedContacts = (data || []).map(contact => ({
        ...contact,
        tags: Array.isArray(contact.tags) ? contact.tags : []
      }))
      
      setContacts(typedContacts as Contact[])
      return { data: typedContacts, error: null }
    },
    {
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to load contacts",
          variant: "destructive",
        })
      }
    }
  )

  const { execute: loadInteractions } = useAsyncOperation(
    async (contactId: string) => {
      const { data, error } = await supabase
        .from('contact_interactions')
        .select('*')
        .eq('contact_id', contactId)
        .order('created_at', { ascending: false })

      if (error) return { data: null, error: error.message }
      
      setInteractions(data || [])
      return { data, error: null }
    },
    {
      onError: (error) => {
        toast({
          title: "Error",
          description: "Failed to load interactions",
          variant: "destructive",
        })
      }
    }
  )

  const { execute: createContact } = useAsyncOperation(
    async () => {
      if (!contactForm.name || !contactForm.contact_type) {
        return { data: null, error: "Name and contact type are required" }
      }

      const { data, error } = await supabase
        .from('contacts')
        .insert({
          name: contactForm.name,
          email: contactForm.email || null,
          phone: contactForm.phone || null,
          contact_type: contactForm.contact_type,
          company: contactForm.company || null,
          status: contactForm.status,
          notes: contactForm.notes || null,
          tags: []
        })
        .select()

      if (error) return { data: null, error: error.message }

      setIsContactDialogOpen(false)
      setContactForm({
        name: "",
        email: "",
        phone: "",
        contact_type: "",
        company: "",
        status: "active",
        notes: ""
      })
      loadContacts()
      
      return { data, error: null }
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Contact created successfully",
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

  const { execute: createInteraction } = useAsyncOperation(
    async () => {
      if (!selectedContact || !interactionForm.interaction_type || !interactionForm.subject) {
        return { data: null, error: "Please fill in all required fields" }
      }

      const { data, error } = await supabase
        .from('contact_interactions')
        .insert({
          contact_id: selectedContact.id,
          interaction_type: interactionForm.interaction_type,
          subject: interactionForm.subject,
          description: interactionForm.description || null
        })
        .select()

      if (error) return { data: null, error: error.message }

      setIsInteractionDialogOpen(false)
      setInteractionForm({
        interaction_type: "",
        subject: "",
        description: ""
      })
      loadInteractions(selectedContact.id)
      
      return { data, error: null }
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Interaction logged successfully",
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
    loadContacts()
  }, [])

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !filterType || contact.contact_type === filterType
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground'
      case 'prospect': return 'bg-warning text-warning-foreground'
      default: return 'bg-secondary text-secondary-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'client': return <Users className="h-4 w-4" />
      case 'investor': return <Building className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Management</h2>
          <p className="text-muted-foreground">Manage your clients, investors, and business contacts</p>
        </div>
        <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>Create a new contact record</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Contact Type *</Label>
                <Select value={contactForm.contact_type} onValueChange={(value) => setContactForm({ ...contactForm, contact_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={contactForm.company}
                  onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                  placeholder="Acme Corp"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={contactForm.notes}
                  onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                  placeholder="Additional notes about this contact..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => createContact()}>
                Create Contact
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="client">Clients</SelectItem>
            <SelectItem value="investor">Investors</SelectItem>
            <SelectItem value="vendor">Vendors</SelectItem>
            <SelectItem value="partner">Partners</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setSelectedContact(contact)}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getTypeIcon(contact.contact_type)}
                    {contact.name}
                  </CardTitle>
                  {contact.company && (
                    <CardDescription>{contact.company}</CardDescription>
                  )}
                </div>
                <Badge className={getStatusColor(contact.status)}>
                  {contact.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {contact.email}
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {contact.phone}
                  </div>
                )}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-muted-foreground">
                    {contact.contact_type.charAt(0).toUpperCase() + contact.contact_type.slice(1)}
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={(e) => {
                      e.stopPropagation()
                      setSelectedContact(contact)
                      setIsInteractionDialogOpen(true)
                    }}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={(e) => {
                      e.stopPropagation()
                      // Edit functionality would go here
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interaction Dialog */}
      <Dialog open={isInteractionDialogOpen} onOpenChange={setIsInteractionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Log Interaction</DialogTitle>
            <DialogDescription>
              Record a new interaction with {selectedContact?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="interaction_type">Interaction Type *</Label>
              <Select value={interactionForm.interaction_type} onValueChange={(value) => setInteractionForm({ ...interactionForm, interaction_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Phone Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={interactionForm.subject}
                onChange={(e) => setInteractionForm({ ...interactionForm, subject: e.target.value })}
                placeholder="Follow-up on property viewing"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={interactionForm.description}
                onChange={(e) => setInteractionForm({ ...interactionForm, description: e.target.value })}
                placeholder="Detailed notes about this interaction..."
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsInteractionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => createInteraction()}>
              Log Interaction
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Contacts Found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || filterType ? "No contacts match your current filters" : "Add your first contact to get started"}
            </p>
            <Button onClick={() => setIsContactDialogOpen(true)}>
              Add Contact
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}