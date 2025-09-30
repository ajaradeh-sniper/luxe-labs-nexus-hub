import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { LocationMapPicker } from '@/components/LocationMapPicker';

// Temporary: bypass strict Supabase types for newly added tables
const sb = supabase as any;
import { 
  Upload, 
  X, 
  FileText, 
  Image, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Building, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Link2,
  Loader2
} from 'lucide-react';

// Location images
import palmJumeirahVilla from '@/assets/palm-jumeirah-villa-hd.jpg';
import dubaiHillsVilla from '@/assets/dubai-hills-villa-hd.jpg';
import jumeirahIslandsVilla from '@/assets/jumeirah-islands-villa-hd.jpg';
import emiratesHillsVilla from '@/assets/emirates-hills-villa-hd.jpg';
import jumeirahGolfEstateVilla from '@/assets/jumeirah-golf-estate-villa-hd.jpg';
import alBarariVilla from '@/assets/al-barari-villa-hd.jpg';

// Property type images
import luxuryPenthouse from '@/assets/luxury-penthouse.jpg';
import businessBay from '@/assets/business-bay.jpg';
import luxuryOffice from '@/assets/luxury-office.jpg';
import premiumTower from '@/assets/premium-tower.jpg';
import luxuryBuilding from '@/assets/luxury-building.jpg';
import marinaTower from '@/assets/marina-tower.jpg';
import downtownLuxury from '@/assets/downtown-luxury.jpg';

interface ComprehensiveOpportunityModalProps {
  open: boolean;
  onClose: () => void;
  onOpportunityCreated?: () => void;
}

interface ProjectInfo {
  title: string;
  description: string;
  location: string;
  custom_location: string;
  opportunity_type: string;
  property_type: string;
  investment_required: string;
  expected_roi: string;
  deadline: string;
  risk_rating: string;
  timeline_months: string;
  market_analysis: string;
  exit_strategy: string;
  map_coordinates?: [number, number];
  map_address?: string;
}

interface FileUpload {
  id: string;
  file: File;
  type: 'image' | 'document';
  progress: number;
  uploaded: boolean;
  url?: string;
}

export function ComprehensiveOpportunityModal({ 
  open, 
  onClose, 
  onOpportunityCreated 
}: ComprehensiveOpportunityModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [propertyUrl, setPropertyUrl] = useState("");
  
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    title: '',
    description: '',
    location: '',
    custom_location: '',
    opportunity_type: '',
    property_type: '',
    investment_required: '',
    expected_roi: '',
    deadline: '',
    risk_rating: '',
    timeline_months: '',
    market_analysis: '',
    exit_strategy: '',
    map_coordinates: undefined,
    map_address: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Image mappings
  const locationImages = {
    'palm-jumeirah': palmJumeirahVilla,
    'dubai-hills': dubaiHillsVilla,
    'jumeirah-islands': jumeirahIslandsVilla,
    'emirates-hills': emiratesHillsVilla,
    'jumeirah-golf-estate': jumeirahGolfEstateVilla,
    'al-barari': alBarariVilla,
    'other': downtownLuxury
  };

  const propertyTypeImages = {
    'villa': palmJumeirahVilla,
    'apartment': premiumTower,
    'penthouse': luxuryPenthouse,
    'townhouse': dubaiHillsVilla,
    'commercial': businessBay,
    'office': luxuryOffice,
    'retail': luxuryBuilding
  };

  const steps = [
    { number: 1, title: 'Project Information', icon: Building },
    { number: 2, title: 'Financial Details', icon: DollarSign },
    { number: 3, title: 'Media & Documents', icon: Upload },
    { number: 4, title: 'Review & Submit', icon: CheckCircle }
  ];

  const handleInputChange = (field: keyof ProjectInfo, value: string) => {
    setProjectInfo(prev => ({ ...prev, [field]: value }));
  };

  const extractPropertyData = async () => {
    if (!propertyUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a property listing URL",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExtracting(true);
      
      const { data, error } = await supabase.functions.invoke('extract-property-data', {
        body: { url: propertyUrl.trim() }
      });

      if (error) {
        console.error('Error extracting property data:', error);
        throw new Error(error.message || 'Failed to extract property data');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to extract property data');
      }

      const extractedData = data.data;
      
      // Auto-populate form with extracted data
      setProjectInfo(prev => ({
        ...prev,
        title: extractedData.title || prev.title,
        description: extractedData.description || prev.description,
        location: extractedData.location || prev.location,
        opportunity_type: extractedData.opportunity_type || prev.opportunity_type,
        property_type: extractedData.property_type || prev.property_type,
        investment_required: extractedData.investment_required?.toString() || prev.investment_required,
        expected_roi: extractedData.expected_roi?.toString() || prev.expected_roi,
        risk_rating: extractedData.risk_rating || prev.risk_rating,
      }));

      setShowUrlInput(false);
      setPropertyUrl("");
      
      toast({
        title: "Success",
        description: "Property data extracted and form populated!",
      });

    } catch (error) {
      console.error('Error extracting property data:', error);
      toast({
        title: "Extraction Failed",
        description: error.message || "Failed to extract property data. Please fill the form manually.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileUpload = async (files: FileList | null, type: 'image' | 'document') => {
    if (!files) return;

    const newFiles: FileUpload[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type,
      progress: 0,
      uploaded: false
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    for (const fileUpload of newFiles) {
      try {
        // Upload to Supabase storage
        const bucket = type === 'image' ? 'marketing' : 'documents';
        const fileName = `opportunities/${Date.now()}-${fileUpload.file.name}`;
        
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(fileName, fileUpload.file);

        if (error) {
          console.error('Upload error:', error);
          toast({
            title: "Upload Failed",
            description: `Failed to upload ${fileUpload.file.name}`,
            variant: "destructive"
          });
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);

        setUploadedFiles(prev => prev.map(f => 
          f.id === fileUpload.id 
            ? { ...f, progress: 100, uploaded: true, url: urlData.publicUrl }
            : f
        ));

        toast({
          title: "Upload Complete",
          description: `${fileUpload.file.name} uploaded successfully`
        });

      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Error",
          description: `Failed to upload ${fileUpload.file.name}`,
          variant: "destructive"
        });
      }
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'image' | 'document') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files, type);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(projectInfo.title && projectInfo.description && projectInfo.location && 
               projectInfo.opportunity_type && projectInfo.property_type);
      case 2:
        return !!(projectInfo.investment_required && projectInfo.expected_roi && 
               projectInfo.deadline && projectInfo.risk_rating);
      case 3:
        return true; // Files are optional
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const opportunityData = {
        title: projectInfo.title,
        description: projectInfo.description,
        location: projectInfo.location,
        opportunity_type: projectInfo.opportunity_type,
        investment_required: parseFloat(projectInfo.investment_required),
        expected_roi: parseFloat(projectInfo.expected_roi),
        deadline: projectInfo.deadline,
        risk_rating: projectInfo.risk_rating,
        status: 'evaluation',
        documents: uploadedFiles.filter(f => f.uploaded).map(f => ({
          name: f.file.name,
          url: f.url,
          type: f.type,
          size: f.file.size
        })),
        created_by: user.id
      };

      const { data, error } = await sb
        .from('opportunities')
        .insert([opportunityData])
        .select();

      if (error) {
        console.error('Error creating opportunity:', error);
        toast({
          title: "Creation Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Opportunity Created",
        description: "Investment opportunity has been successfully created and submitted for review.",
      });

      onOpportunityCreated?.();
      handleClose();
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setProjectInfo({
      title: '',
      description: '',
      location: '',
      custom_location: '',
      opportunity_type: '',
      property_type: '',
      investment_required: '',
      expected_roi: '',
      deadline: '',
      risk_rating: '',
      timeline_months: '',
      market_analysis: '',
      exit_strategy: '',
      map_coordinates: undefined,
      map_address: ''
    });
    setUploadedFiles([]);
    setPropertyUrl("");
    setShowUrlInput(false);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  value={projectInfo.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter project title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="property_type" className="text-sm font-medium">
                  Property Type *
                </Label>
                <Select value={projectInfo.property_type} onValueChange={(value) => handleInputChange('property_type', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-[100]">
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
                {projectInfo.property_type && propertyTypeImages[projectInfo.property_type as keyof typeof propertyTypeImages] && (
                  <div className="mt-3">
                    <img 
                      src={propertyTypeImages[projectInfo.property_type as keyof typeof propertyTypeImages]} 
                      alt={`${projectInfo.property_type} example`}
                      className="w-full h-32 object-cover rounded-lg border shadow-sm"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium">
                  Location *
                </Label>
                <Select value={projectInfo.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-[100]">
                    <SelectItem value="palm-jumeirah">🏝 Palm Jumeirah</SelectItem>
                    <SelectItem value="dubai-hills">🌳 Dubai Hills Estate</SelectItem>
                    <SelectItem value="jumeirah-islands">🌊 Jumeirah Islands</SelectItem>
                    <SelectItem value="emirates-hills">🏰 Emirates Hills</SelectItem>
                    <SelectItem value="jumeirah-golf-estate">⛳ Jumeirah Golf Estates</SelectItem>
                    <SelectItem value="al-barari">🌿 Al Barari</SelectItem>
                    <SelectItem value="other">📍 Other (specify below)</SelectItem>
                  </SelectContent>
                </Select>
                {projectInfo.location && locationImages[projectInfo.location as keyof typeof locationImages] && (
                  <div className="mt-3">
                    <img 
                      src={locationImages[projectInfo.location as keyof typeof locationImages]} 
                      alt={`${projectInfo.location} area`}
                      className="w-full h-32 object-cover rounded-lg border shadow-sm"
                    />
                  </div>
                )}
              </div>

              {projectInfo.location === 'other' && (
                <div className="md:col-span-2">
                  <Label htmlFor="custom_location" className="text-sm font-medium">
                    Specify Location *
                  </Label>
                  <Input
                    id="custom_location"
                    value={projectInfo.custom_location}
                    onChange={(e) => handleInputChange('custom_location', e.target.value)}
                    placeholder="Enter specific area/location"
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="opportunity_type" className="text-sm font-medium">
                  Opportunity Type *
                </Label>
                <Select value={projectInfo.opportunity_type} onValueChange={(value) => handleInputChange('opportunity_type', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-[100]">
                    <SelectItem value="flip">Flip</SelectItem>
                    <SelectItem value="renovation">Renovation</SelectItem>
                    <SelectItem value="other">Other...write down</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Map Location Picker */}
            <div className="mt-6">
              <Label className="text-sm font-medium mb-3 block">
                Pin Location on Map
              </Label>
              <LocationMapPicker
                className="h-80"
                initialLocation={[55.2708, 25.2048]} // Dubai center
                onLocationSelect={(coordinates, address) => {
                  setProjectInfo(prev => ({
                    ...prev,
                    map_coordinates: coordinates,
                    map_address: address
                  }));
                }}
              />
              {projectInfo.map_address && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Selected: {projectInfo.map_address}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Project Description *
              </Label>
              <Textarea
                id="description"
                value={projectInfo.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Provide a detailed description of the investment opportunity"
                rows={4}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="investment_required" className="text-sm font-medium">
                  Investment Required (AED) *
                </Label>
                <Input
                  id="investment_required"
                  type="number"
                  value={projectInfo.investment_required}
                  onChange={(e) => handleInputChange('investment_required', e.target.value)}
                  placeholder="1000000"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expected_roi" className="text-sm font-medium">
                  Expected ROI (%) *
                </Label>
                <Input
                  id="expected_roi"
                  type="number"
                  value={projectInfo.expected_roi}
                  onChange={(e) => handleInputChange('expected_roi', e.target.value)}
                  placeholder="25"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="deadline" className="text-sm font-medium">
                  Project Deadline *
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={projectInfo.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="risk_rating" className="text-sm font-medium">
                  Risk Rating *
                </Label>
                <Select value={projectInfo.risk_rating} onValueChange={(value) => handleInputChange('risk_rating', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timeline_months" className="text-sm font-medium">
                  Timeline (Months)
                </Label>
                <Input
                  id="timeline_months"
                  type="number"
                  value={projectInfo.timeline_months}
                  onChange={(e) => handleInputChange('timeline_months', e.target.value)}
                  placeholder="12"
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-1">
                <Label htmlFor="market_analysis" className="text-sm font-medium">
                  Market Analysis
                </Label>
                <Textarea
                  id="market_analysis"
                  value={projectInfo.market_analysis}
                  onChange={(e) => handleInputChange('market_analysis', e.target.value)}
                  placeholder="Brief market analysis and competitive landscape"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-1">
                <Label htmlFor="exit_strategy" className="text-sm font-medium">
                  Exit Strategy
                </Label>
                <Textarea
                  id="exit_strategy"
                  value={projectInfo.exit_strategy}
                  onChange={(e) => handleInputChange('exit_strategy', e.target.value)}
                  placeholder="Planned exit strategy and timeline"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Image Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Project Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, 'image')}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop images here, or{' '}
                    <label htmlFor="image-upload" className="text-primary cursor-pointer hover:underline">
                      browse files
                    </label>
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files, 'image')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Document Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Supporting Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, 'document')}
                >
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop documents here, or{' '}
                    <label htmlFor="document-upload" className="text-primary cursor-pointer hover:underline">
                      browse files
                    </label>
                  </p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, XLS, XLSX up to 10MB</p>
                  <input
                    id="document-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files, 'document')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {file.type === 'image' ? (
                            <Image className="h-5 w-5 text-blue-500" />
                          ) : (
                            <FileText className="h-5 w-5 text-green-500" />
                          )}
                          <div>
                            <p className="text-sm font-medium">{file.file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {file.uploaded && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Uploaded
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Opportunity Details</CardTitle>
                <CardDescription>
                  Please review all information before submitting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">PROJECT TITLE</Label>
                    <p className="text-sm font-medium">{projectInfo.title}</p>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">LOCATION</Label>
                    <p className="text-sm font-medium">{projectInfo.location}</p>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">INVESTMENT REQUIRED</Label>
                    <p className="text-sm font-medium">
                      AED {projectInfo.investment_required ? parseInt(projectInfo.investment_required).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">EXPECTED ROI</Label>
                    <p className="text-sm font-medium">{projectInfo.expected_roi}%</p>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">OPPORTUNITY TYPE</Label>
                    <p className="text-sm font-medium">{projectInfo.opportunity_type}</p>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">RISK RATING</Label>
                    <Badge variant="outline">{projectInfo.risk_rating}</Badge>
                  </div>
                </div>

                {projectInfo.description && (
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">DESCRIPTION</Label>
                    <p className="text-sm mt-1">{projectInfo.description}</p>
                  </div>
                )}

                {uploadedFiles.length > 0 && (
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">UPLOADED FILES</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {uploadedFiles.filter(f => f.uploaded).map(file => (
                        <Badge key={file.id} variant="secondary" className="text-xs">
                          {file.type === 'image' ? <Image className="h-3 w-3 mr-1" /> : <FileText className="h-3 w-3 mr-1" />}
                          {file.file.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <Label className="text-xs font-medium">SUBMISSION NOTICE</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This opportunity will be submitted for review and evaluation. You will be notified of the status updates via email.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Create Investment Opportunity
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="ml-auto"
            >
              <Link2 className="h-4 w-4 mr-2" />
              Import from URL
            </Button>
          </DialogTitle>
          <DialogDescription>
            Add a new investment opportunity with complete project information, financial details, and supporting documentation.
          </DialogDescription>
          {showUrlInput && (
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Paste property listing URL (e.g., from Bayut, Dubizzle, Property Finder, etc.)"
                value={propertyUrl}
                onChange={(e) => setPropertyUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={extractPropertyData}
                disabled={isExtracting}
                size="sm"
              >
                {isExtracting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Extract"
                )}
              </Button>
            </div>
          )}
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6 px-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${isActive ? 'border-primary bg-primary text-primary-foreground' : 
                    isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                    'border-muted-foreground/30 bg-background text-muted-foreground'}
                `}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3 text-left">
                  <p className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </p>
                </div>
                {step.number < steps.length && (
                  <div className="flex-1 mx-4 h-px bg-muted-foreground/20" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="px-4">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t px-4">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevStep}>
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            
            {currentStep < 4 ? (
              <Button 
                onClick={handleNextStep}
                disabled={!validateStep(currentStep)}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Creating...' : 'Submit Opportunity'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}