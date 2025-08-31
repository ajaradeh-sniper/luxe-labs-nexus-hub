import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Opportunity } from '@/types/opportunities';
import { EnhancedOpportunityModal } from '@/components/modals/EnhancedOpportunityModal';
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Clock, 
  MapPin, 
  Building, 
  Search,
  Filter,
  Download,
  Upload,
  Zap,
  Globe,
  TrendingUp,
  AlertTriangle,
  Users,
  FileText
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

// Mock data for demonstration
const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Luxury Penthouse - DIFC',
    description: 'Premium penthouse with panoramic city views and world-class amenities',
    property_address: 'Gate Tower, DIFC, Dubai',
    property_type: 'apartment',
    current_value: 8500000,
    estimated_renovation_cost: 500000,
    estimated_after_value: 12000000,
    potential_roi: 35.3,
    sourced_by: 'agent-1',
    sourced_date: '2024-01-15',
    status: 'under_review',
    location: {
      area: 'DIFC',
      city: 'Dubai',
      coordinates: { lat: 25.2048, lng: 55.2708 }
    },
    property_details: {
      bedrooms: 4,
      bathrooms: 5,
      area_sqft: 4500,
      parking: 3,
      amenities: ['Private Elevator', 'Pool', 'Gym', 'Concierge', 'Spa']
    },
    financial_details: {
      asking_price: 8500000,
      estimated_purchase_price: 8200000,
      holding_costs: 120000,
      selling_costs: 180000,
      financing_required: true
    },
    timeline: {
      estimated_purchase_date: '2024-03-01',
      estimated_renovation_duration: 6,
      estimated_sale_date: '2024-10-01'
    },
    documents: ['property_valuation.pdf', 'financial_analysis.xlsx'],
    notes: 'Prime location in Dubai\'s financial district with excellent investment potential',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    title: 'Luxury Villa - Emirates Hills',
    description: 'Exclusive villa in Dubai\'s most prestigious residential community',
    property_address: 'Emirates Hills, Dubai',
    property_type: 'villa',
    current_value: 15000000,
    estimated_renovation_cost: 800000,
    estimated_after_value: 20000000,
    potential_roi: 27.5,
    sourced_by: 'agent-2',
    sourced_date: '2024-01-18',
    status: 'approved',
    location: {
      area: 'Emirates Hills',
      city: 'Dubai',
      coordinates: { lat: 25.1057, lng: 55.1713 }
    },
    property_details: {
      bedrooms: 6,
      bathrooms: 8,
      area_sqft: 8500,
      parking: 5,
      amenities: ['Private Pool', 'Garden', 'Maid\'s Room', 'Driver\'s Room', 'Wine Cellar']
    },
    financial_details: {
      asking_price: 15000000,
      estimated_purchase_price: 14500000,
      holding_costs: 200000,
      selling_costs: 300000,
      financing_required: false
    },
    timeline: {
      estimated_purchase_date: '2024-02-15',
      estimated_renovation_duration: 8,
      estimated_sale_date: '2024-12-01'
    },
    documents: ['property_inspection.pdf', 'market_analysis.pdf'],
    notes: 'Ultra-luxury property with significant appreciation potential',
    created_at: '2024-01-18T14:30:00Z',
    updated_at: '2024-01-22T09:15:00Z'
  }
];

interface ApiIntegrationSettings {
  dldApiEnabled: boolean;
  propertyFinderEnabled: boolean;
  dubizzleEnabled: boolean;
  emiratesAuctionEnabled: boolean;
  autoScanInterval: number; // hours
}

export function EnhancedOpportunityManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [apiSettings, setApiSettings] = useState<ApiIntegrationSettings>({
    dldApiEnabled: false,
    propertyFinderEnabled: false,
    dubizzleEnabled: false,
    emiratesAuctionEnabled: false,
    autoScanInterval: 24
  });

  // Permission checks
  const canCreateOpportunity = ['real_estate_agent', 'real_estate_director', 'administrator'].includes(user?.role || '');
  const canEvaluate = ['real_estate_director', 'administrator'].includes(user?.role || '');
  const canManageApi = user?.role === 'administrator';

  // Filter opportunities based on search and filters
  useEffect(() => {
    let filtered = opportunities;

    if (searchTerm) {
      filtered = filtered.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.location.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(opp => opp.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(opp => opp.property_type === typeFilter);
    }

    setFilteredOpportunities(filtered);
  }, [searchTerm, statusFilter, typeFilter, opportunities]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'converted_to_project': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleCreateOpportunity = (data: any) => {
    console.log('New opportunity data:', data);
    // Here you would typically save to database
    toast({
      title: "Opportunity Created",
      description: "New investment opportunity has been added for review.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleApproveOpportunity = (id: string) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === id ? { ...opp, status: 'approved' as const } : opp
      )
    );
    toast({
      title: "Opportunity Approved",
      description: "Opportunity approved and ready for investor pitch.",
    });
  };

  const handleRejectOpportunity = (id: string) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === id ? { ...opp, status: 'rejected' as const } : opp
      )
    );
    toast({
      title: "Opportunity Rejected",
      description: "Opportunity has been rejected.",
      variant: "destructive"
    });
  };

  const handleConvertToProject = (id: string) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === id ? { ...opp, status: 'converted_to_project' as const } : opp
      )
    );
    toast({
      title: "Converted to Project",
      description: "Opportunity has been converted to an active project.",
    });
  };

  const handleAutoScan = async () => {
    toast({
      title: "Auto-Scan Started",
      description: "Scanning external sources for new opportunities...",
    });
    
    // Simulate API calls
    setTimeout(() => {
      toast({
        title: "Scan Complete",
        description: "Found 3 new opportunities from external sources.",
      });
    }, 3000);
  };

  const getRoiColor = (roi: number) => {
    if (roi >= 30) return 'text-green-600 font-bold';
    if (roi >= 20) return 'text-blue-600 font-semibold';
    if (roi >= 15) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Opportunities</h1>
          <p className="text-muted-foreground">
            Manage real estate investment opportunities and connect with investors
          </p>
        </div>
        
        <div className="flex gap-2">
          {canManageApi && (
            <Button variant="outline" onClick={() => setIsApiSettingsOpen(true)}>
              <Zap className="h-4 w-4 mr-2" />
              API Integrations
            </Button>
          )}
          
          <Button variant="outline" onClick={handleAutoScan}>
            <Search className="h-4 w-4 mr-2" />
            Auto Scan
          </Button>
          
          {canCreateOpportunity && (
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Opportunity
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.length}</div>
            <p className="text-xs text-muted-foreground">Active pipeline</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {opportunities.filter(o => o.status === 'under_review').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending evaluation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {opportunities.filter(o => o.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">Ready for investment</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(opportunities.reduce((sum, o) => sum + o.potential_roi, 0) / opportunities.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Expected returns</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="converted_to_project">Converted</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">
                    {opportunity.title}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {opportunity.location.area}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(opportunity.status)}>
                  {opportunity.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium capitalize">{opportunity.property_type}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Area:</span>
                  <p className="font-medium">{opportunity.property_details.area_sqft} sqft</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Current Value:</span>
                  <p className="font-medium">{formatCurrency(opportunity.current_value)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Expected ROI:</span>
                  <p className={getRoiColor(opportunity.potential_roi)}>
                    {opportunity.potential_roi}%
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedOpportunity(opportunity);
                    setIsDetailsDialogOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                
                <div className="flex gap-1">
                  {canEvaluate && opportunity.status === 'under_review' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleApproveOpportunity(opportunity.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRejectOpportunity(opportunity.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  
                  {opportunity.status === 'approved' && (
                    <Button 
                      size="sm"
                      onClick={() => handleConvertToProject(opportunity.id)}
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Convert
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Create Opportunity Modal */}
      <EnhancedOpportunityModal 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateOpportunity}
      />

      {/* Opportunity Details Dialog */}
      {selectedOpportunity && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedOpportunity.title}</DialogTitle>
              <DialogDescription>
                Investment opportunity details and analysis
              </DialogDescription>
            </DialogHeader>
            
            <OpportunityDetailView 
              opportunity={selectedOpportunity}
              canEvaluate={canEvaluate}
              onApprove={() => handleApproveOpportunity(selectedOpportunity.id)}
              onReject={() => handleRejectOpportunity(selectedOpportunity.id)}
              onConvert={() => handleConvertToProject(selectedOpportunity.id)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* API Settings Dialog */}
      <Dialog open={isApiSettingsOpen} onOpenChange={setIsApiSettingsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>API Integrations</DialogTitle>
            <DialogDescription>
              Configure external data sources for automatic opportunity discovery
            </DialogDescription>
          </DialogHeader>
          
          <ApiSettingsForm 
            settings={apiSettings}
            onSave={(newSettings) => {
              setApiSettings(newSettings);
              setIsApiSettingsOpen(false);
              toast({
                title: "Settings Saved",
                description: "API integration settings have been updated.",
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Create Opportunity Form Component
function CreateOpportunityForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="financial">Financial</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Property Title</Label>
            <Input id="title" placeholder="e.g., Luxury Apartment - Downtown" />
          </div>
          <div>
            <Label htmlFor="type">Property Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="address">Property Address</Label>
          <Input id="address" placeholder="Full property address" />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Detailed property description and investment highlights"
            rows={4}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="financial" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="current-value">Current Market Value (AED)</Label>
            <Input id="current-value" type="number" placeholder="0" />
          </div>
          <div>
            <Label htmlFor="asking-price">Asking Price (AED)</Label>
            <Input id="asking-price" type="number" placeholder="0" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="renovation-cost">Est. Renovation Cost (AED)</Label>
            <Input id="renovation-cost" type="number" placeholder="0" />
          </div>
          <div>
            <Label htmlFor="after-value">Est. After Value (AED)</Label>
            <Input id="after-value" type="number" placeholder="0" />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="timeline" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="purchase-date">Est. Purchase Date</Label>
            <Input id="purchase-date" type="date" />
          </div>
          <div>
            <Label htmlFor="renovation-duration">Renovation Duration (months)</Label>
            <Input id="renovation-duration" type="number" placeholder="6" />
          </div>
        </div>
        
        <div>
          <Label htmlFor="sale-date">Est. Sale/Exit Date</Label>
          <Input id="sale-date" type="date" />
        </div>
      </TabsContent>
      
      <TabsContent value="documents" className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Upload supporting documents</p>
          <p className="text-xs text-gray-400">Property valuations, floor plans, market analysis</p>
        </div>
      </TabsContent>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={onSubmit}>Submit for Review</Button>
      </div>
    </Tabs>
  );
}

// Opportunity Detail View Component
function OpportunityDetailView({ 
  opportunity, 
  canEvaluate, 
  onApprove, 
  onReject, 
  onConvert 
}: { 
  opportunity: Opportunity;
  canEvaluate: boolean;
  onApprove: () => void;
  onReject: () => void;
  onConvert: () => void;
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="financials">Financial Analysis</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium capitalize">{opportunity.property_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bedrooms:</span>
                <span className="font-medium">{opportunity.property_details.bedrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bathrooms:</span>
                <span className="font-medium">{opportunity.property_details.bathrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Area:</span>
                <span className="font-medium">{opportunity.property_details.area_sqft} sqft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parking:</span>
                <span className="font-medium">{opportunity.property_details.parking}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Investment Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Value:</span>
                <span className="font-medium">{formatCurrency(opportunity.current_value)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Renovation Cost:</span>
                <span className="font-medium">{formatCurrency(opportunity.estimated_renovation_cost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">After Value:</span>
                <span className="font-medium">{formatCurrency(opportunity.estimated_after_value)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected ROI:</span>
                <span className="font-bold text-green-600">{opportunity.potential_roi}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {opportunity.property_details.amenities?.map((amenity, index) => (
                <Badge key={index} variant="outline">{amenity}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="financials" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Purchase Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Asking Price:</span>
                <span className="font-medium">{formatCurrency(opportunity.financial_details.asking_price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Purchase Price:</span>
                <span className="font-medium">{formatCurrency(opportunity.financial_details.estimated_purchase_price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Holding Costs:</span>
                <span className="font-medium">{formatCurrency(opportunity.financial_details.holding_costs)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selling Costs:</span>
                <span className="font-medium">{formatCurrency(opportunity.financial_details.selling_costs)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Financing Required:</span>
                <span className="font-medium">{opportunity.financial_details.financing_required ? 'Yes' : 'No'}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ROI Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Investment:</span>
                  <span className="font-medium">
                    {formatCurrency(
                      opportunity.financial_details.estimated_purchase_price + 
                      opportunity.estimated_renovation_cost + 
                      opportunity.financial_details.holding_costs
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Return:</span>
                  <span className="font-medium">
                    {formatCurrency(
                      opportunity.estimated_after_value - 
                      opportunity.financial_details.selling_costs
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Profit:</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(
                      opportunity.estimated_after_value - 
                      opportunity.financial_details.estimated_purchase_price - 
                      opportunity.estimated_renovation_cost - 
                      opportunity.financial_details.holding_costs - 
                      opportunity.financial_details.selling_costs
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="timeline" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Purchase Date:</span>
                <span className="font-medium">{new Date(opportunity.timeline.estimated_purchase_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Renovation Duration:</span>
                <span className="font-medium">{opportunity.timeline.estimated_renovation_duration} months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Expected Sale Date:</span>
                <span className="font-medium">{new Date(opportunity.timeline.estimated_sale_date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Timeline Progress</span>
                <span>Est. {opportunity.timeline.estimated_renovation_duration} months</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="documents" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Supporting Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {opportunity.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{doc}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        {canEvaluate && opportunity.status === 'under_review' && (
          <>
            <Button variant="outline" onClick={onReject}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button onClick={onApprove}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </>
        )}
        
        {opportunity.status === 'approved' && (
          <Button onClick={onConvert}>
            <Users className="h-4 w-4 mr-2" />
            Convert to Project
          </Button>
        )}
      </div>
    </Tabs>
  );
}

// API Settings Form Component
function ApiSettingsForm({ 
  settings, 
  onSave 
}: { 
  settings: ApiIntegrationSettings;
  onSave: (settings: ApiIntegrationSettings) => void;
}) {
  const [localSettings, setLocalSettings] = useState(settings);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">External Data Sources</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Dubai Land Department (DLD)</Label>
              <p className="text-sm text-muted-foreground">
                Official property transaction data
              </p>
            </div>
            <Button
              variant={localSettings.dldApiEnabled ? "default" : "outline"}
              onClick={() => setLocalSettings(prev => ({ ...prev, dldApiEnabled: !prev.dldApiEnabled }))}
            >
              {localSettings.dldApiEnabled ? "Enabled" : "Disabled"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Property Finder</Label>
              <p className="text-sm text-muted-foreground">
                Property listings and market data
              </p>
            </div>
            <Button
              variant={localSettings.propertyFinderEnabled ? "default" : "outline"}
              onClick={() => setLocalSettings(prev => ({ ...prev, propertyFinderEnabled: !prev.propertyFinderEnabled }))}
            >
              {localSettings.propertyFinderEnabled ? "Enabled" : "Disabled"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Dubizzle</Label>
              <p className="text-sm text-muted-foreground">
                Classified property listings
              </p>
            </div>
            <Button
              variant={localSettings.dubizzleEnabled ? "default" : "outline"}
              onClick={() => setLocalSettings(prev => ({ ...prev, dubizzleEnabled: !prev.dubizzleEnabled }))}
            >
              {localSettings.dubizzleEnabled ? "Enabled" : "Disabled"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Emirates Auction</Label>
              <p className="text-sm text-muted-foreground">
                Auction properties and foreclosures
              </p>
            </div>
            <Button
              variant={localSettings.emiratesAuctionEnabled ? "default" : "outline"}
              onClick={() => setLocalSettings(prev => ({ ...prev, emiratesAuctionEnabled: !prev.emiratesAuctionEnabled }))}
            >
              {localSettings.emiratesAuctionEnabled ? "Enabled" : "Disabled"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="scan-interval">Auto-scan Interval (hours)</Label>
        <Input
          id="scan-interval"
          type="number"
          value={localSettings.autoScanInterval}
          onChange={(e) => setLocalSettings(prev => ({ ...prev, autoScanInterval: parseInt(e.target.value) || 24 }))}
          min="1"
          max="168"
        />
        <p className="text-sm text-muted-foreground">
          How often to automatically scan for new opportunities
        </p>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          Test Connections
        </Button>
        <Button onClick={() => onSave(localSettings)}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}