import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import {
  Building,
  MapPin,
  DollarSign,
  Camera,
  FileText,
  CheckCircle,
  Upload,
  Bed,
  Bath,
  Square,
  Car
} from 'lucide-react'

interface AddListingModalProps {
  open: boolean
  onClose: () => void
  agentId?: string
}

type ListingStep = 'property' | 'details' | 'financial' | 'media' | 'review'

interface PropertyListing {
  basicInfo: {
    title: string
    propertyType: string
    address: string
    city: string
    area: string
    description: string
  }
  details: {
    bedrooms: number
    bathrooms: number
    areaSqft: number
    parking: number
    furnished: boolean
    features: string[]
  }
  financial: {
    listingPrice: number
    estimatedValue: number
    renovationCost: number
    potentialROI: number
    monthlyRent: number
  }
  media: {
    images: File[]
    floorPlan: File | null
    virtualTour: string
  }
  source: {
    dldListed: boolean
    exclusiveListing: boolean
    commissionRate: number
  }
}

const DUBAI_AREAS = [
  'Downtown Dubai',
  'Dubai Marina',
  'Business Bay',
  'Jumeirah Beach Residence (JBR)',
  'Palm Jumeirah',
  'Dubai Hills Estate',
  'Emirates Hills',
  'Al Barari',
  'Jumeirah Golf Estates',
  'Dubai Investment Park',
  'Jumeirah Islands',
  'Arabian Ranches',
  'The Springs',
  'The Meadows'
]

const PROPERTY_FEATURES = [
  'Swimming Pool',
  'Gym/Fitness Center',
  'Security',
  'Parking',
  'Balcony/Terrace',
  'Garden',
  'Maids Room',
  'Study Room',
  'Walk-in Closet',
  'Central AC',
  'Built-in Wardrobes',
  'Kitchen Appliances',
  'Elevator',
  'Concierge',
  'Spa/Jacuzzi'
]

export function AddListingModal({ open, onClose, agentId }: AddListingModalProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<ListingStep>('property')
  const [listing, setListing] = useState<PropertyListing>({
    basicInfo: {
      title: '',
      propertyType: '',
      address: '',
      city: 'Dubai',
      area: '',
      description: ''
    },
    details: {
      bedrooms: 1,
      bathrooms: 1,
      areaSqft: 1000,
      parking: 1,
      furnished: false,
      features: []
    },
    financial: {
      listingPrice: 0,
      estimatedValue: 0,
      renovationCost: 0,
      potentialROI: 0,
      monthlyRent: 0
    },
    media: {
      images: [],
      floorPlan: null,
      virtualTour: ''
    },
    source: {
      dldListed: false,
      exclusiveListing: false,
      commissionRate: 2.5
    }
  })

  const steps = [
    { key: 'property', title: 'Property Info', icon: Building },
    { key: 'details', title: 'Details', icon: Bed },
    { key: 'financial', title: 'Financial', icon: DollarSign },
    { key: 'media', title: 'Media', icon: Camera },
    { key: 'review', title: 'Review', icon: CheckCircle }
  ]

  const currentStepIndex = steps.findIndex(step => step.key === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files)
      setListing(prev => ({
        ...prev,
        media: {
          ...prev.media,
          images: [...prev.media.images, ...newImages]
        }
      }))
      toast({
        title: "Images Uploaded",
        description: `${newImages.length} image(s) added to the listing.`
      })
    }
  }

  const handleSubmitListing = () => {
    // Mock listing submission
    toast({
      title: "Listing Created",
      description: `Property listing "${listing.basicInfo.title}" has been created and is now under review.`
    })
    onClose()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const nextStep = () => {
    const nextIndex = Math.min(currentStepIndex + 1, steps.length - 1)
    setCurrentStep(steps[nextIndex].key as ListingStep)
  }

  const prevStep = () => {
    const prevIndex = Math.max(currentStepIndex - 1, 0)
    setCurrentStep(steps[prevIndex].key as ListingStep)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'property':
        return listing.basicInfo.title && listing.basicInfo.propertyType && listing.basicInfo.address
      case 'details':
        return listing.details.bedrooms > 0 && listing.details.bathrooms > 0 && listing.details.areaSqft > 0
      case 'financial':
        return listing.financial.listingPrice > 0
      case 'media':
        return listing.media.images.length > 0
      default:
        return true
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            Add New Property Listing
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex
            
            return (
              <div key={step.key} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-primary text-primary-foreground' :
                  isActive ? 'bg-primary/20 text-primary border-2 border-primary' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? <CheckCircle className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                </div>
                <span className={`text-xs mt-1 text-center ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 'property' && (
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input
                      id="title"
                      value={listing.basicInfo.title}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        basicInfo: { ...prev.basicInfo, title: e.target.value }
                      }))}
                      placeholder="e.g., Luxury 2BR Apartment in Marina"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select 
                      value={listing.basicInfo.propertyType}
                      onValueChange={(value) => setListing(prev => ({
                        ...prev,
                        basicInfo: { ...prev.basicInfo, propertyType: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    value={listing.basicInfo.address}
                    onChange={(e) => setListing(prev => ({
                      ...prev,
                      basicInfo: { ...prev.basicInfo, address: e.target.value }
                    }))}
                    placeholder="Enter complete property address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select 
                      value={listing.basicInfo.city}
                      onValueChange={(value) => setListing(prev => ({
                        ...prev,
                        basicInfo: { ...prev.basicInfo, city: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dubai">Dubai</SelectItem>
                        <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="Sharjah">Sharjah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area/Community</Label>
                    <Select 
                      value={listing.basicInfo.area}
                      onValueChange={(value) => setListing(prev => ({
                        ...prev,
                        basicInfo: { ...prev.basicInfo, area: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        {DUBAI_AREAS.map(area => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    value={listing.basicInfo.description}
                    onChange={(e) => setListing(prev => ({
                      ...prev,
                      basicInfo: { ...prev.basicInfo, description: e.target.value }
                    }))}
                    placeholder="Describe the property features, location benefits, and unique selling points..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'details' && (
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Bed className="h-4 w-4" />
                      Bedrooms
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={listing.details.bedrooms}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        details: { ...prev.details, bedrooms: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Bath className="h-4 w-4" />
                      Bathrooms
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={listing.details.bathrooms}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        details: { ...prev.details, bathrooms: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Square className="h-4 w-4" />
                      Area (sqft)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={listing.details.areaSqft}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        details: { ...prev.details, areaSqft: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Parking
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={listing.details.parking}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        details: { ...prev.details, parking: Number(e.target.value) }
                      }))}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="furnished"
                    checked={listing.details.furnished}
                    onCheckedChange={(checked) => setListing(prev => ({
                      ...prev,
                      details: { ...prev.details, furnished: !!checked }
                    }))}
                  />
                  <Label htmlFor="furnished">Furnished Property</Label>
                </div>

                <div className="space-y-2">
                  <Label>Property Features</Label>
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                    {PROPERTY_FEATURES.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={listing.details.features.includes(feature)}
                          onCheckedChange={(checked) => {
                            setListing(prev => ({
                              ...prev,
                              details: {
                                ...prev.details,
                                features: checked 
                                  ? [...prev.details.features, feature]
                                  : prev.details.features.filter(f => f !== feature)
                              }
                            }))
                          }}
                        />
                        <Label htmlFor={feature} className="text-sm">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'financial' && (
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="listingPrice">Listing Price (AED)</Label>
                    <Input
                      id="listingPrice"
                      type="number"
                      value={listing.financial.listingPrice}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        financial: { ...prev.financial, listingPrice: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedValue">Estimated Market Value (AED)</Label>
                    <Input
                      id="estimatedValue"
                      type="number"
                      value={listing.financial.estimatedValue}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        financial: { ...prev.financial, estimatedValue: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="renovationCost">Renovation Cost (AED)</Label>
                    <Input
                      id="renovationCost"
                      type="number"
                      value={listing.financial.renovationCost}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        financial: { ...prev.financial, renovationCost: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="potentialROI">Potential ROI (%)</Label>
                    <Input
                      id="potentialROI"
                      type="number"
                      value={listing.financial.potentialROI}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        financial: { ...prev.financial, potentialROI: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyRent">Monthly Rent Potential (AED)</Label>
                    <Input
                      id="monthlyRent"
                      type="number"
                      value={listing.financial.monthlyRent}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        financial: { ...prev.financial, monthlyRent: Number(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      step="0.1"
                      value={listing.source.commissionRate}
                      onChange={(e) => setListing(prev => ({
                        ...prev,
                        source: { ...prev.source, commissionRate: Number(e.target.value) }
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dldListed"
                      checked={listing.source.dldListed}
                      onCheckedChange={(checked) => setListing(prev => ({
                        ...prev,
                        source: { ...prev.source, dldListed: !!checked }
                      }))}
                    />
                    <Label htmlFor="dldListed">Listed on DLD (Dubai Land Department)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exclusiveListing"
                      checked={listing.source.exclusiveListing}
                      onCheckedChange={(checked) => setListing(prev => ({
                        ...prev,
                        source: { ...prev.source, exclusiveListing: !!checked }
                      }))}
                    />
                    <Label htmlFor="exclusiveListing">Exclusive Listing</Label>
                  </div>
                </div>

                {(listing.financial.listingPrice > 0 && listing.financial.renovationCost > 0) && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Investment Projection</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Investment:</span>
                        <p className="font-medium">
                          {formatCurrency(listing.financial.listingPrice + listing.financial.renovationCost)}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Projected Return:</span>
                        <p className="font-medium text-green-600">
                          {formatCurrency((listing.financial.listingPrice + listing.financial.renovationCost) * (listing.financial.potentialROI / 100))}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 'media' && (
            <Card>
              <CardHeader>
                <CardTitle>Media & Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Property Images</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag & drop images here, or click to select
                      </p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  {listing.media.images.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {listing.media.images.length} image(s) uploaded
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Floor Plan (Optional)</Label>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setListing(prev => ({
                          ...prev,
                          media: { ...prev.media, floorPlan: file }
                        }))
                      }
                    }}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="virtualTour">Virtual Tour URL (Optional)</Label>
                  <Input
                    id="virtualTour"
                    type="url"
                    value={listing.media.virtualTour}
                    onChange={(e) => setListing(prev => ({
                      ...prev,
                      media: { ...prev.media, virtualTour: e.target.value }
                    }))}
                    placeholder="https://example.com/virtual-tour"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'review' && (
            <Card>
              <CardHeader>
                <CardTitle>Review Listing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Property Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Title:</span> {listing.basicInfo.title}</p>
                        <p><span className="text-muted-foreground">Type:</span> {listing.basicInfo.propertyType}</p>
                        <p><span className="text-muted-foreground">Location:</span> {listing.basicInfo.area}, {listing.basicInfo.city}</p>
                        <p><span className="text-muted-foreground">Size:</span> {listing.details.areaSqft} sqft</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Property Features</h4>
                      <div className="text-sm space-y-1">
                        <p>{listing.details.bedrooms} bed • {listing.details.bathrooms} bath • {listing.details.parking} parking</p>
                        <p>{listing.details.furnished ? 'Furnished' : 'Unfurnished'}</p>
                        <p>{listing.details.features.length} features selected</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Financial Details</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Listing Price:</span> {formatCurrency(listing.financial.listingPrice)}</p>
                        <p><span className="text-muted-foreground">Market Value:</span> {formatCurrency(listing.financial.estimatedValue)}</p>
                        <p><span className="text-muted-foreground">Potential ROI:</span> {listing.financial.potentialROI}%</p>
                        <p><span className="text-muted-foreground">Commission:</span> {listing.source.commissionRate}%</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Media & Documentation</h4>
                      <div className="text-sm space-y-1">
                        <p>{listing.media.images.length} property images</p>
                        <p>{listing.media.floorPlan ? 'Floor plan included' : 'No floor plan'}</p>
                        <p>{listing.media.virtualTour ? 'Virtual tour available' : 'No virtual tour'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Listing Status
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your listing will be reviewed by our team within 24 hours. Once approved, 
                    it will be visible to investors and available for opportunity creation.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStepIndex === 0}
          >
            Previous
          </Button>
          
          {currentStepIndex < steps.length - 1 ? (
            <Button 
              onClick={nextStep}
              disabled={!canProceed()}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmitListing} 
              className="bg-primary"
              disabled={!canProceed()}
            >
              Create Listing
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}