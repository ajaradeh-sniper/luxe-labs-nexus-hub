import { useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  MapPin, 
  Image as ImageIcon, 
  FileText, 
  X, 
  Plus,
  Home,
  Building,
  ChevronLeft,
  ChevronRight,
  Map as MapIcon
} from 'lucide-react';

const opportunitySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  property_address: z.string().min(1, 'Property address is required'),
  property_type: z.enum(['apartment', 'villa', 'townhouse', 'commercial', 'land']),
  current_value: z.number().min(1, 'Current value must be greater than 0'),
  estimated_renovation_cost: z.number().min(0, 'Renovation cost cannot be negative'),
  estimated_after_value: z.number().min(1, 'After value must be greater than 0'),
  area: z.string().min(1, 'Area is required'),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  area_sqft: z.number().min(1, 'Area in sqft is required'),
  parking: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  asking_price: z.number().min(1, 'Asking price must be greater than 0'),
  estimated_purchase_price: z.number().min(1, 'Estimated purchase price must be greater than 0'),
  holding_costs: z.number().min(0, 'Holding costs cannot be negative'),
  selling_costs: z.number().min(0, 'Selling costs cannot be negative'),
  financing_required: z.boolean(),
  estimated_purchase_date: z.string().min(1, 'Purchase date is required'),
  estimated_renovation_duration: z.number().min(1, 'Renovation duration must be at least 1 month'),
  estimated_sale_date: z.string().min(1, 'Sale date is required'),
  notes: z.string().optional(),
  // Investment fields
  required_investment: z.number().min(1, 'Required investment must be greater than 0'),
  minimum_investment: z.number().min(1, 'Minimum investment must be greater than 0'),
  target_investors: z.number().min(1, 'Target number of investors is required'),
  current_investors: z.number().min(0, 'Current investors cannot be negative'),
  investment_structure: z.enum(['equity', 'debt', 'hybrid']),
  expected_return_timeframe: z.number().min(1, 'Return timeframe must be at least 1 month'),
  exit_strategy: z.enum(['sale', 'refinance', 'hold', 'other']),
  process_stage: z.enum(['sourcing', 'due_diligence', 'legal_review', 'funding', 'execution']),
  key_milestones: z.string().optional(),
  risk_factors: z.string().optional(),
  investment_highlights: z.string().optional(),
});

type OpportunityFormData = z.infer<typeof opportunitySchema>;

interface ImageFile {
  id: string;
  file: File;
  url: string;
  type: 'main' | 'gallery' | 'blueprint';
  description?: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

interface EnhancedOpportunityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OpportunityFormData & { images: ImageFile[]; location: LocationData | null }) => void;
}

const MAPBOX_TOKEN = process.env.VITE_MAPBOX_TOKEN || '';

export function EnhancedOpportunityModal({ open, onOpenChange, onSubmit }: EnhancedOpportunityModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  const [images, setImages] = useState<ImageFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [mapboxToken, setMapboxToken] = useState(MAPBOX_TOKEN);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const blueprintInputRef = useRef<HTMLInputElement>(null);

  // Viewport state for map
  const [viewState, setViewState] = useState({
    longitude: 55.2708, // Dubai longitude
    latitude: 25.2048,  // Dubai latitude
    zoom: 10
  });

  const form = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      financing_required: false,
      estimated_renovation_duration: 6,
      amenities: [],
    }
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFiles(Array.from(e.dataTransfer.files), 'gallery');
    }
  }, []);

  const handleImageFiles = (files: File[], type: 'main' | 'gallery' | 'blueprint') => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const validFiles = files.filter(file => {
      if (type === 'blueprint') {
        return validImageTypes.includes(file.type) || file.type === 'application/pdf';
      }
      return validImageTypes.includes(file.type);
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: `Only ${type === 'blueprint' ? 'images and PDF files' : 'image files'} are allowed.`,
        variant: "destructive"
      });
    }

    const newImages: ImageFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file),
      type,
      description: ''
    }));

    // If main image, replace existing main image
    if (type === 'main') {
      setImages(prev => prev.filter(img => img.type !== 'main').concat(newImages.slice(0, 1)));
    } else {
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      URL.revokeObjectURL(prev.find(img => img.id === id)?.url || '');
      return filtered;
    });
  };

  const updateImageDescription = (id: string, description: string) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, description } : img
    ));
  };

  const handleMapClick = (lat: number, lng: number) => {
    setLocation({
      latitude: lat,
      longitude: lng,
      address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    });
  };

  const geocodeAddress = async (address: string) => {
    if (!mapboxToken) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&limit=1`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setLocation({
          latitude: lat,
          longitude: lng,
          address: data.features[0].place_name
        });
        setViewState({
          longitude: lng,
          latitude: lat,
          zoom: 15
        });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const onFormSubmit = (data: OpportunityFormData) => {
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please mark the property location on the map.",
        variant: "destructive"
      });
      return;
    }

    const mainImage = images.find(img => img.type === 'main');
    if (!mainImage) {
      toast({
        title: "Main Image Required",
        description: "Please upload a main property image.",
        variant: "destructive"
      });
      return;
    }

    onSubmit({ ...data, images, location });
    
    // Reset form
    form.reset();
    setImages([]);
    setLocation(null);
    setActiveTab('basic');
    
    toast({
      title: "Opportunity Created",
      description: "Investment opportunity has been created successfully.",
    });
  };

  const mainImages = images.filter(img => img.type === 'main');
  const galleryImages = images.filter(img => img.type === 'gallery');
  const blueprintImages = images.filter(img => img.type === 'blueprint');

  const calculateROI = () => {
    const values = form.getValues();
    if (values.estimated_after_value && values.estimated_purchase_price && values.estimated_renovation_cost) {
      const totalCost = values.estimated_purchase_price + values.estimated_renovation_cost + (values.holding_costs || 0) + (values.selling_costs || 0);
      const profit = values.estimated_after_value - totalCost;
      const roi = (profit / totalCost) * 100;
      return roi.toFixed(1);
    }
    return '0.0';
  };

  if (!mapboxToken) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Setup Required</DialogTitle>
            <DialogDescription>
              Please enter your Mapbox public token to enable map functionality.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
              <Input
                id="mapbox-token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6..."
              />
              <p className="text-sm text-muted-foreground mt-1">
                Get your token from{' '}
                <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  mapbox.com
                </a>
              </p>
            </div>
            <Button onClick={() => setMapboxToken(mapboxToken)} disabled={!mapboxToken}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Investment Opportunity</DialogTitle>
          <DialogDescription>
            Add comprehensive property details, images, blueprints, and location data for investor evaluation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="blueprints">Blueprints</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Luxury Penthouse - DIFC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="property_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="property_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Address</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input placeholder="Full property address" {...field} />
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => geocodeAddress(field.value)}
                            disabled={!field.value}
                          >
                            <MapIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Detailed property description and investment highlights..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="area_sqft"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area (sqft)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parking Spaces</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-6">
                {/* Main Property Image */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Main Property Image
                    </CardTitle>
                    <CardDescription>
                      Upload the primary image that represents this property
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mainImages.length === 0 ? (
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-4">Upload main property image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files && handleImageFiles(Array.from(e.target.files), 'main')}
                          className="hidden"
                          ref={fileInputRef}
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Choose Main Image
                        </Button>
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={mainImages[0].url} 
                          alt="Main property" 
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                          onClick={() => removeImage(mainImages[0].id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Gallery Images */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Property Gallery
                    </CardTitle>
                    <CardDescription>
                      Add additional images showcasing different aspects of the property
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                        dragActive 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag & drop images here or click to browse
                      </p>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.multiple = true;
                          input.onchange = (e) => {
                            const files = (e.target as HTMLInputElement).files;
                            if (files) handleImageFiles(Array.from(files), 'gallery');
                          };
                          input.click();
                        }}
                      >
                        Add Gallery Images
                      </Button>
                    </div>

                    {galleryImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <img 
                              src={image.url} 
                              alt="Property gallery" 
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
                              onClick={() => removeImage(image.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <Input
                              placeholder="Image description..."
                              value={image.description || ''}
                              onChange={(e) => updateImageDescription(image.id, e.target.value)}
                              className="absolute bottom-2 left-2 right-2 text-xs h-6 bg-background/80 backdrop-blur-sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blueprints" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Blueprints & Floor Plans
                    </CardTitle>
                    <CardDescription>
                      Upload architectural drawings, floor plans, and technical documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload blueprints, floor plans, and technical drawings
                      </p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        onChange={(e) => e.target.files && handleImageFiles(Array.from(e.target.files), 'blueprint')}
                        className="hidden"
                        ref={blueprintInputRef}
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => blueprintInputRef.current?.click()}
                      >
                        Upload Blueprints
                      </Button>
                    </div>

                    {blueprintImages.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {blueprintImages.map((blueprint) => (
                          <div key={blueprint.id} className="relative group border rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <FileText className="h-8 w-8 text-muted-foreground" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{blueprint.file.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {(blueprint.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeImage(blueprint.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <Input
                              placeholder="Blueprint description..."
                              value={blueprint.description || ''}
                              onChange={(e) => updateImageDescription(blueprint.id, e.target.value)}
                              className="mt-3"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Property Location
                    </CardTitle>
                    <CardDescription>
                      Mark the exact location of the property on the map
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area/District</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., DIFC, Marina, Downtown" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="h-96 rounded-lg overflow-hidden border relative">
                        {mapboxToken ? (
                          <div 
                            className="w-full h-full bg-muted flex items-center justify-center cursor-crosshair"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const y = e.clientY - rect.top;
                              const lng = viewState.longitude + ((x - rect.width / 2) / rect.width) * 0.01;
                              const lat = viewState.latitude - ((y - rect.height / 2) / rect.height) * 0.01;
                              setLocation({
                                latitude: lat,
                                longitude: lng,
                                address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
                              });
                            }}
                          >
                            <div className="text-center">
                              <MapIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Click to mark property location</p>
                              {location && (
                                <div className="mt-4 p-3 bg-background rounded-lg border">
                                  <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-red-500" />
                                    <span>Location marked at {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <div className="text-center">
                              <MapIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Map requires Mapbox token</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {location && (
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm font-medium">Selected Location:</p>
                          <p className="text-sm text-muted-foreground">
                            Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setLocation(null)}
                          >
                            Clear Location
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="investment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Investment Requirements
                    </CardTitle>
                    <CardDescription>
                      Define the funding requirements and investment structure for this opportunity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="required_investment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Required Investment (AED)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="minimum_investment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Investment Per Investor (AED)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="target_investors"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Number of Investors</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="current_investors"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Committed Investors</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="investment_structure"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Investment Structure</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select structure" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="equity">Equity Partnership</SelectItem>
                                <SelectItem value="debt">Debt Financing</SelectItem>
                                <SelectItem value="hybrid">Hybrid (Equity + Debt)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="expected_return_timeframe"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expected Return Timeframe (months)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="12"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Process & Timeline</CardTitle>
                    <CardDescription>
                      Current stage and key milestones for this investment opportunity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="process_stage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Process Stage</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sourcing">Property Sourcing</SelectItem>
                                <SelectItem value="due_diligence">Due Diligence</SelectItem>
                                <SelectItem value="legal_review">Legal Review</SelectItem>
                                <SelectItem value="funding">Securing Funding</SelectItem>
                                <SelectItem value="execution">Ready for Execution</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="exit_strategy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exit Strategy</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select exit strategy" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sale">Sale After Renovation</SelectItem>
                                <SelectItem value="refinance">Refinance & Hold</SelectItem>
                                <SelectItem value="hold">Long-term Hold</SelectItem>
                                <SelectItem value="other">Other Strategy</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="key_milestones"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Project Milestones</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List major milestones and deadlines for this project..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Analysis</CardTitle>
                    <CardDescription>
                      Risk assessment and investment highlights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="investment_highlights"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Investment Highlights</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Key selling points and unique advantages of this investment opportunity..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="risk_factors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Risk Factors & Mitigation</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Identify potential risks and how they will be mitigated..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financial" className="space-y-6">
                {/* Current ROI Display */}
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {calculateROI()}% ROI
                      </div>
                      <p className="text-sm text-muted-foreground">Expected Return on Investment</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="current_value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Market Value (AED)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="asking_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Asking Price (AED)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimated_purchase_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Purchase Price (AED)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimated_renovation_cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Renovation Cost (AED)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimated_after_value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated After Value (AED)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="holding_costs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Holding Costs (AED)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="selling_costs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selling Costs (AED)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimated_renovation_duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Renovation Duration (months)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="6"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="estimated_purchase_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Purchase Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimated_sale_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Sale Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional information about the investment opportunity..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Separator />

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              
              <div className="flex gap-2">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit">
                  Submit for Review
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}