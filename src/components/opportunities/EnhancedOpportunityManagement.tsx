import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useOpportunities } from '@/hooks/useOpportunities';
import { useEOI } from '@/hooks/useEOI';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ComprehensiveOpportunityModal } from '@/components/modals/ComprehensiveOpportunityModal';
import { 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  MapPin, 
  Search,
  TrendingUp,
  AlertTriangle,
  HandHeart
} from 'lucide-react';

export function EnhancedOpportunityManagement() {
  const { toast } = useToast();
  const { user } = useAuth();
  const { opportunities, loading, error, fetchOpportunities, createOpportunity, updateOpportunity } = useOpportunities();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const canCreateOpportunity = ['real_estate_agent', 'real_estate_director', 'administrator'].includes(user?.role || '');
  const canEvaluate = ['real_estate_director', 'administrator'].includes(user?.role || '');
  const isInvestor = user?.role === 'investor';

  const handleCreateOpportunity = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpportunityCreated = () => {
    fetchOpportunities();
    setIsCreateModalOpen(false);
  };

  const handleApproveOpportunity = async (id: string) => {
    try {
      await updateOpportunity(id, { status: 'approved' });
      toast({
        title: "Opportunity Approved",
        description: "Opportunity approved and ready for investor pitch.",
      });
    } catch (error) {
      console.error('Failed to approve opportunity:', error);
    }
  };

  const handleRejectOpportunity = async (id: string) => {
    try {
      await updateOpportunity(id, { status: 'rejected' });
      toast({
        title: "Opportunity Rejected",
        description: "Opportunity has been rejected.",
      });
    } catch (error) {
      console.error('Failed to reject opportunity:', error);
    }
  };

  // Filter opportunities
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || opp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'evaluation': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoiColor = (roi: number | null) => {
    if (!roi) return 'text-gray-600';
    if (roi >= 30) return 'font-bold text-green-600';
    if (roi >= 20) return 'font-medium text-blue-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Opportunities</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchOpportunities}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Investment Opportunities</h1>
          <p className="text-muted-foreground">
            Manage and evaluate real estate investment opportunities
          </p>
        </div>
        {canCreateOpportunity && (
          <Button onClick={handleCreateOpportunity}>
            <Plus className="h-4 w-4 mr-2" />
            Add Opportunity
          </Button>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Opportunities</p>
                <p className="text-2xl font-bold">{opportunities.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">
                  {opportunities.filter(o => o.status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                <p className="text-2xl font-bold">
                  {opportunities.filter(o => o.status === 'under_review' || o.status === 'evaluation').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg. ROI</p>
                <p className="text-2xl font-bold">
                  {opportunities.length > 0 
                    ? `${Math.round(opportunities.reduce((acc, o) => acc + (o.expected_roi || 0), 0) / opportunities.length)}%`
                    : '0%'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="evaluation">Evaluation</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {opportunity.title}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {opportunity.location}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(opportunity.status)}>
                  {opportunity.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Investment Required</p>
                    <p className="font-medium">{formatCurrency(opportunity.investment_required)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expected ROI</p>
                    <p className={getRoiColor(opportunity.expected_roi)}>
                      {opportunity.expected_roi ? `${opportunity.expected_roi}%` : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedOpportunity(opportunity);
                      setIsDetailsDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  {isInvestor && opportunity.status === 'approved' && (
                    <EOIButton opportunity={opportunity} />
                  )}
                  
                  {canEvaluate && (opportunity.status === 'under_review' || opportunity.status === 'evaluation') && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() => handleApproveOpportunity(opportunity.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleRejectOpportunity(opportunity.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== 'all' 
              ? "Try adjusting your filters" 
              : "Create your first investment opportunity"
            }
          </p>
        </div>
      )}

      {/* Opportunity Details Dialog */}
      {selectedOpportunity && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedOpportunity.title}</DialogTitle>
              <DialogDescription>
                Investment opportunity details and analysis
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 max-h-[500px] overflow-y-auto">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground">
                  {selectedOpportunity.description || 'No description available'}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Financial Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Investment Required</p>
                    <p className="font-medium">{formatCurrency(selectedOpportunity.investment_required)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected ROI</p>
                    <p className="font-medium">
                      {selectedOpportunity.expected_roi ? `${selectedOpportunity.expected_roi}%` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Timeline</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="font-medium">
                      {selectedOpportunity.deadline ? new Date(selectedOpportunity.deadline).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={getStatusColor(selectedOpportunity.status)}>
                      {selectedOpportunity.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Comprehensive Opportunity Creation Modal */}
      <ComprehensiveOpportunityModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onOpportunityCreated={handleOpportunityCreated}
      />
    </div>
  );
}

// EOI Button Component
function EOIButton({ opportunity }: { opportunity: any }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(Number(opportunity.investment_required || 0));
  const [note, setNote] = useState<string>('');
  const { submitEOI, loading } = useEOI(opportunity.id);

  const handleSubmit = async () => {
    const result = await submitEOI(amount, note);
    if (result) {
      setOpen(false);
      setNote('');
    }
  };

  return (
    <>
      <Button 
        variant="default" 
        size="sm"
        onClick={() => setOpen(true)}
      >
        <HandHeart className="h-4 w-4 mr-1" />
        Express Interest
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Express Interest – {opportunity.title}</DialogTitle>
            <DialogDescription>
              Indicate your investment amount and any additional notes
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount (AED)</Label>
              <Input 
                id="amount"
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value || 0))}
                min={0}
              />
              <p className="text-sm text-muted-foreground">
                Min: {new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(opportunity.investment_required || 0)}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any questions or special requirements..."
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button disabled={loading || amount <= 0} onClick={handleSubmit}>
              {loading ? "Submitting..." : "Submit Interest"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}