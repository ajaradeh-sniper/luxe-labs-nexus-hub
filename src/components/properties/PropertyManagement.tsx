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
  Building2, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { AddListingModal } from '@/components/workflows/AddListingModal'

interface Property {
  id: string
  title: string
  description: string | null
  property_type: string
  location: string
  address: string | null
  price: number
  area_sqft: number | null
  bedrooms: number | null
  bathrooms: number | null
  status: string
  features: any
  images: any
  created_at: string
}

export function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showAddListingModal, setShowAddListingModal] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProperties(data || [])
    } catch (error) {
      console.error('Error fetching properties:', error)
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter
    const matchesType = typeFilter === 'all' || property.property_type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success/10 text-success border-success/20'
      case 'sold': return 'bg-muted text-muted-foreground border-muted'
      case 'pending': return 'bg-warning/10 text-warning border-warning/20'
      case 'reserved': return 'bg-primary/10 text-primary border-primary/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  if (loading) {
    return <LoadingOverlay isLoading={true} loadingText="Loading properties..."><div /></LoadingOverlay>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
          <p className="text-muted-foreground">Manage your real estate portfolio</p>
        </div>
        <Button variant="luxury" onClick={() => setShowAddListingModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-0">
              <div className="h-48 bg-gradient-subtle rounded-t-lg flex items-center justify-center">
                <Building2 className="h-16 w-16 text-muted-foreground/30" />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(property.status)}>
                  {property.status}
                </Badge>
              </div>

              <div className="flex items-center gap-1 text-primary">
                <DollarSign className="h-5 w-5" />
                <span className="text-xl font-bold">{formatPrice(property.price)}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{property.area_sqft || 'N/A'} sqft</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {property.description || 'No description available'}
              </p>

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
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-lg font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              {properties.length === 0 
                ? "Get started by adding your first property" 
                : "Try adjusting your search or filters"}
            </p>
            {properties.length === 0 && (
              <Button variant="luxury">
                <Plus className="mr-2 h-4 w-4" />
                Add First Property
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <AddListingModal 
        open={showAddListingModal}
        onClose={() => setShowAddListingModal(false)}
      />
    </div>
  )
}