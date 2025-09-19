import { useState } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { Opportunity, OpportunityEvaluation } from '@/types/opportunities';
import { Plus, Eye, Edit, Trash2, CheckCircle, XCircle, DollarSign, Clock, MapPin, Building, ArrowUpCircle } from 'lucide-react';
import { InvestmentRequestModal } from '@/components/workflows/InvestmentRequestModal';
import { ConvertOpportunityToProjectModal } from '@/components/modals/ConvertOpportunityToProjectModal';

// Mock data - in real app this would come from Supabase
const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Luxury Apartment - Business Bay',
    description: 'High-end 2BR apartment with stunning views',
    property_address: 'Business Bay Tower, Dubai',
    property_type: 'apartment',
    current_value: 1200000,
    estimated_renovation_cost: 150000,
    estimated_after_value: 1500000,
    potential_roi: 12.5,
    sourced_by: 'agent-1',
    sourced_date: '2024-01-15',
    status: 'under_review',
    location: {
      area: 'Business Bay',
      city: 'Dubai'
    },
    property_details: {
      bedrooms: 2,
      bathrooms: 2,
      area_sqft: 1200,
      parking: 1,
      amenities: ['Pool', 'Gym', 'Concierge']
    },
    financial_details: {
      asking_price: 1200000,
      estimated_purchase_price: 1150000,
      holding_costs: 25000,
      selling_costs: 45000,
      financing_required: true
    },
    timeline: {
      estimated_purchase_date: '2024-03-01',
      estimated_renovation_duration: 4,
      estimated_sale_date: '2024-08-01'
    },
    documents: [],
    notes: 'Prime location with excellent rental potential',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z'
  }
];

export function OpportunityManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [selectedOpportunityForInvestment, setSelectedOpportunityForInvestment] = useState<Opportunity | null>(null);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [selectedOpportunityForConversion, setSelectedOpportunityForConversion] = useState<Opportunity | null>(null);

  const canCreateOpportunity = user?.role === 'real_estate_agent' || user?.role === 'administrator';
  const canEvaluate = user?.role === 'real_estate_director' || user?.role === 'administrator';

  const handleCreateOpportunity = () => {
    // Mock creation - in real app would call Supabase
    toast({
      title: "Opportunity Created",
      description: "New opportunity has been added for review.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleApproveOpportunity = async (id: string) => {
    try {
      const { error } = await supabase
        .from('opportunities')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) throw error;

      setOpportunities(prev => 
        prev.map(opp => 
          opp.id === id ? { ...opp, status: 'approved' as const } : opp
        )
      );
      
      toast({
        title: "Opportunity Approved",
        description: "Opportunity has been approved and can now be converted to a project.",
      });
    } catch (error) {
      console.error('Error approving opportunity:', error);
      toast({
        title: "Approval Failed",
        description: "Failed to approve opportunity. Please try again.",
        variant: "destructive"
      });
    }
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
    });
  };

  const handleConvertToProject = (id: string) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === id ? { ...opp, status: 'converted_to_project' as const } : opp
      )
    );
    toast({
      title: "Project Created",
      description: "Opportunity has been converted to a project and agreement process initiated.",
    });
  };

  const getStatusColor = (status: Opportunity['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'under_review': return 'bg-blue-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'converted_to_project': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Opportunity Management</h2>
          <p className="text-muted-foreground">Source and evaluate investment opportunities</p>
        </div>
        {canCreateOpportunity && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="hover-scale">
                <Plus className="h-4 w-4 mr-2" />
                New Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Opportunity</DialogTitle>
                <DialogDescription>
                  Add a new investment opportunity for evaluation
                </DialogDescription>
              </DialogHeader>
              <CreateOpportunityForm onSubmit={handleCreateOpportunity} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          {canEvaluate && <TabsTrigger value="evaluation">Evaluation</TabsTrigger>}
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover-scale cursor-pointer animate-fade-in">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(opportunity.status)}>
                      {opportunity.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      ROI: {opportunity.potential_roi}%
                    </span>
                  </div>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {opportunity.location.area}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3 text-muted-foreground" />
                      <span>{opportunity.property_type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span>{formatCurrency(opportunity.current_value)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Value:</span>
                      <span>{formatCurrency(opportunity.current_value)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Renovation Cost:</span>
                      <span>{formatCurrency(opportunity.estimated_renovation_cost)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>After Value:</span>
                      <span className="text-green-600">{formatCurrency(opportunity.estimated_after_value)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedOpportunity(opportunity)}
                      className="flex-1"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    
                    {canEvaluate && opportunity.status === 'under_review' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApproveOpportunity(opportunity.id)}
                          className="text-green-600 hover:bg-green-50"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRejectOpportunity(opportunity.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    
                    {opportunity.status === 'approved' && (
                      <Button
                        size="sm"
                        onClick={() => handleConvertToProject(opportunity.id)}
                        className="bg-primary"
                      >
                        Convert to Project
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{opportunity.title}</h4>
                      <p className="text-sm text-muted-foreground">{opportunity.property_address}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span>ROI: {opportunity.potential_roi}%</span>
                        <span>{formatCurrency(opportunity.current_value)}</span>
                        <Badge className={getStatusColor(opportunity.status)}>
                          {opportunity.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      {canEvaluate && opportunity.status === 'under_review' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600">Approve</Button>
                          <Button variant="outline" size="sm" className="text-red-600">Reject</Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {canEvaluate && (
          <TabsContent value="evaluation">
            <Card>
              <CardHeader>
                <CardTitle>Opportunity Evaluation</CardTitle>
                <CardDescription>
                  Review and evaluate opportunities for approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Evaluation tools coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Opportunity Detail Dialog */}
      {selectedOpportunity && (
        <OpportunityDetailDialog
          opportunity={selectedOpportunity}
          open={!!selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          canEvaluate={canEvaluate}
          onApprove={() => handleApproveOpportunity(selectedOpportunity.id)}
          onReject={() => handleRejectOpportunity(selectedOpportunity.id)}
          onConvert={() => handleConvertToProject(selectedOpportunity.id)}
        />
      )}
    </div>
  );
}

function CreateOpportunityForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Opportunity Title</Label>
          <Input id="title" placeholder="Enter opportunity title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="property-type">Property Type</Label>
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

      <div className="space-y-2">
        <Label htmlFor="address">Property Address</Label>
        <Input id="address" placeholder="Enter full property address" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Describe the opportunity..." />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="current-value">Current Value (AED)</Label>
          <Input id="current-value" type="number" placeholder="1200000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="renovation-cost">Renovation Cost (AED)</Label>
          <Input id="renovation-cost" type="number" placeholder="150000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="after-value">After Value (AED)</Label>
          <Input id="after-value" type="number" placeholder="1500000" />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={onSubmit}>Submit for Review</Button>
      </div>
    </div>
  );
}

function OpportunityDetailDialog({
  opportunity,
  open,
  onClose,
  canEvaluate,
  onApprove,
  onReject,
  onConvert
}: {
  opportunity: Opportunity;
  open: boolean;
  onClose: () => void;
  canEvaluate: boolean;
  onApprove: () => void;
  onReject: () => void;
  onConvert: () => void;
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{opportunity.title}</DialogTitle>
          <DialogDescription>{opportunity.property_address}</DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{opportunity.property_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bedrooms:</span>
                    <span className="font-medium">{opportunity.property_details.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bathrooms:</span>
                    <span className="font-medium">{opportunity.property_details.bathrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Area:</span>
                    <span className="font-medium">{opportunity.property_details.area_sqft} sqft</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Area:</span>
                    <span className="font-medium">{opportunity.location.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>City:</span>
                    <span className="font-medium">{opportunity.location.city}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description & Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{opportunity.description}</p>
                {opportunity.notes && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Notes:</h4>
                    <p className="text-muted-foreground">{opportunity.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Asking Price:</span>
                      <span>{formatCurrency(opportunity.financial_details.asking_price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Purchase:</span>
                      <span>{formatCurrency(opportunity.financial_details.estimated_purchase_price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renovation Cost:</span>
                      <span>{formatCurrency(opportunity.estimated_renovation_cost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Holding Costs:</span>
                      <span>{formatCurrency(opportunity.financial_details.holding_costs)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Selling Costs:</span>
                      <span>{formatCurrency(opportunity.financial_details.selling_costs)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between font-medium">
                      <span>After Renovation Value:</span>
                      <span className="text-green-600">{formatCurrency(opportunity.estimated_after_value)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Potential ROI:</span>
                      <span className="text-green-600">{opportunity.potential_roi}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Estimated Purchase Date:</span>
                    <span>{new Date(opportunity.timeline.estimated_purchase_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Renovation Duration:</span>
                    <span>{opportunity.timeline.estimated_renovation_duration} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sale Date:</span>
                    <span>{new Date(opportunity.timeline.estimated_sale_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No documents uploaded yet
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          {canEvaluate && opportunity.status === 'under_review' && (
            <>
              <Button variant="outline" onClick={onReject} className="text-red-600">
                Reject
              </Button>
              <Button onClick={onApprove} className="text-green-600">
                Approve
              </Button>
            </>
          )}
          
          {opportunity.status === 'approved' && (
            <Button onClick={onConvert} className="bg-primary">
              Convert to Project
            </Button>
          )}
          
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}