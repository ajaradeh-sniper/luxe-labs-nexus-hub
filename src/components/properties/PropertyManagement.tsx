import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { usePermissions } from '@/hooks/usePermissions'
import { SupabaseService } from '@/lib/supabase-service'
import { useAsyncOperation } from '@/hooks/useAsyncOperation'
import { toast } from '@/hooks/use-toast'
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Bed,
  Bath,
  Square,
  Calendar
} from 'lucide-react'

interface PropertyFormData {
  title: string
  property_type: string
  location: string
  address: string
  price: number
  description: string
  bedrooms: number | null
  bathrooms: number | null
  area_sqft: number | null
  status: string
  features: string[]
}

export function PropertyManagement() {
  const { user } = useAuth()
  const { canView, canEdit, canDelete } = usePermissions('properties')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<any>(null)
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    property_type: 'residential',
    location: '',
    address: '',
    price: 0,
    description: '',
    bedrooms: null,
    bathrooms: null,
    area_sqft: null,
    status: 'available',
    features: []
  })

  const { data: properties, loading, execute: fetchProperties } = useAsyncOperation(
    SupabaseService.getProperties,
    { showErrorToast: true, errorMessage: "Failed to load properties" }
  )

  const { execute: createProperty, loading: creating } = useAsyncOperation(
    (propertyData: any) => SupabaseService.createProperty(propertyData),
    { 
      showErrorToast: true, 
      errorMessage: "Failed to create property",
      onSuccess: () => {
        toast({ title: "Success", description: "Property created successfully" })
        setIsDialogOpen(false)
        resetForm()
        fetchProperties()
      }
    }
  )

  useEffect(() => {
    if (user && canView) {
      fetchProperties()
    }
  }, [user, canView, fetchProperties])

  const resetForm = () => {
    setFormData({
      title: '',
      property_type: 'residential',
      location: '',
      address: '',
      price: 0,
      description: '',
      bedrooms: null,
      bathrooms: null,
      area_sqft: null,
      status: 'available',
      features: []
    })
    setEditingProperty(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const propertyData = {
      ...formData,
      created_by: user?.id,
      features: JSON.stringify(formData.features),
      images: JSON.stringify([])
    }

    if (editingProperty) {
      // TODO: Implement update functionality
      toast({ title: "Info", description: "Update functionality coming soon" })
    } else {
      await createProperty(propertyData)
    }
  }

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddFeature = (feature: string) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }))
    }
  }

  const handleRemoveFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success/10 text-success border-success/20'
      case 'sold': return 'bg-primary/10 text-primary border-primary/20'
      case 'pending': return 'bg-warning/10 text-warning border-warning/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (!canView) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>You don't have permission to view properties</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
            Property Management
          </h2>
          <p className="text-muted-foreground">Manage your luxury property portfolio</p>
        </div>
        
        {canEdit && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="luxury" onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Marina Bay Tower - Unit 2504"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="property_type">Property Type *</Label>
                    <Select
                      value={formData.property_type}
                      onValueChange={(value) => handleInputChange('property_type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="mixed">Mixed Use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="e.g., Dubai Marina"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (AED) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => handleInputChange('price', Number(e.target.value))}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Complete address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms || ''}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value ? Number(e.target.value) : null)}
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms || ''}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value ? Number(e.target.value) : null)}
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="area_sqft">Area (sq ft)</Label>
                    <Input
                      id="area_sqft"
                      type="number"
                      value={formData.area_sqft || ''}
                      onChange={(e) => handleInputChange('area_sqft', e.target.value ? Number(e.target.value) : null)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Property description..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer">
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(feature)}
                          className="ml-1 text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add feature..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddFeature(e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="luxury" disabled={creating}>
                    {creating ? 'Creating...' : editingProperty ? 'Update Property' : 'Create Property'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Properties Grid */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        ) : properties?.data?.length > 0 ? (
          properties.data.map((property: any) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-luxury transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-80 h-48 md:h-auto bg-gradient-luxury flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-primary-foreground opacity-50" />
                </div>
                
                <CardContent className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{property.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        {property.location}
                      </div>
                      <Badge className={getStatusColor(property.status)}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {canEdit && (
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-accent/30 rounded-lg">
                      <DollarSign className="h-6 w-6 mx-auto mb-1 text-success" />
                      <p className="font-bold text-lg">{formatPrice(property.price)}</p>
                      <p className="text-xs text-muted-foreground">Price</p>
                    </div>
                    
                    {property.bedrooms && (
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <Bed className="h-6 w-6 mx-auto mb-1" />
                        <p className="font-bold text-lg">{property.bedrooms}</p>
                        <p className="text-xs text-muted-foreground">Bedrooms</p>
                      </div>
                    )}
                    
                    {property.bathrooms && (
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <Bath className="h-6 w-6 mx-auto mb-1" />
                        <p className="font-bold text-lg">{property.bathrooms}</p>
                        <p className="text-xs text-muted-foreground">Bathrooms</p>
                      </div>
                    )}
                    
                    {property.area_sqft && (
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <Square className="h-6 w-6 mx-auto mb-1" />
                        <p className="font-bold text-lg">{property.area_sqft.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Sq Ft</p>
                      </div>
                    )}
                  </div>

                  {property.description && (
                    <p className="text-sm text-muted-foreground mb-4">{property.description}</p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Added {new Date(property.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No properties found</p>
                {canEdit && (
                  <p className="text-sm">Add your first property to get started</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}