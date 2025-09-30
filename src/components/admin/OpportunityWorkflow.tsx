import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Building2,
  Target,
  Eye,
  Users,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  MessageSquare,
  Send,
  FileText,
  Clock
} from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  location: string;
  opportunity_type: string;
  investment_required: number;
  expected_roi: number;
  status: string;
  created_at: string;
  views: number;
  interests: number;
}

interface OpportunityInterest {
  id: string;
  opportunity_id: string;
  investor_email: string;
  investor_name: string;
  investment_amount: number;
  notes: string;
  status: string;
  created_at: string;
}

export function OpportunityWorkflow() {
  const { toast } = useToast();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [interests, setInterests] = useState<OpportunityInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      setLoading(true);

      // Fetch opportunities with analytics
      const { data: opportunitiesData, error } = await (supabase as any)
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get analytics for each opportunity
      const opportunitiesWithAnalytics = await Promise.all(
        (opportunitiesData || []).map(async (opp: any) => {
          const { data: analyticsData } = await (supabase as any)
            .from('opportunity_analytics')
            .select('action_type')
            .eq('opportunity_id', opp.id);

          const views = analyticsData?.filter((a: any) => a.action_type === 'view').length || 0;
          const interests = analyticsData?.filter((a: any) => a.action_type === 'express_interest').length || 0;

          return {
            id: opp.id,
            title: opp.title,
            location: opp.location || opp.property_address,
            opportunity_type: opp.opportunity_type,
            investment_required: opp.investment_required || opp.current_value || 0,
            expected_roi: opp.expected_roi || opp.potential_roi || 0,
            status: opp.status,
            created_at: opp.created_at,
            views,
            interests
          };
        })
      );

      setOpportunities(opportunitiesWithAnalytics);
    } catch (error) {
      console.error('Error loading opportunities:', error);
      toast({
        title: 'Error',
        description: 'Failed to load opportunities',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadOpportunityInterests = async (opportunityId: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('opportunity_interests')
        .select('*')
        .eq('opportunity_id', opportunityId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setInterests(data || []);
    } catch (error) {
      console.error('Error loading interests:', error);
    }
  };

  const updateOpportunityStatus = async (opportunityId: string, newStatus: string) => {
    try {
      const { error } = await (supabase as any)
        .from('opportunities')
        .update({ status: newStatus })
        .eq('id', opportunityId);

      if (error) throw error;

      toast({
        title: 'Status Updated',
        description: `Opportunity status changed to ${newStatus}`
      });

      loadOpportunities();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update opportunity status',
        variant: 'destructive'
      });
    }
  };

  const deleteOpportunity = async (opportunityId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('opportunities')
        .delete()
        .eq('id', opportunityId);

      if (error) throw error;

      toast({
        title: 'Opportunity Deleted',
        description: 'The opportunity has been removed'
      });

      setDeleteDialogOpen(false);
      setSelectedOpportunity(null);
      loadOpportunities();
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete opportunity',
        variant: 'destructive'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
      case 'evaluation':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'converted_to_project':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return ['pending', 'evaluation'].includes(opp.status.toLowerCase());
    if (activeTab === 'approved') return opp.status.toLowerCase() === 'approved';
    if (activeTab === 'active') return ['approved', 'in_progress'].includes(opp.status.toLowerCase());
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Opportunity Management</h2>
          <p className="text-muted-foreground">Manage investment opportunities and track investor interest</p>
        </div>
        <Button onClick={() => window.location.href = '/opportunities'}>
          <Plus className="h-4 w-4 mr-2" />
          Create Opportunity
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {opportunities.filter(o => o.status === 'approved').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {opportunities.reduce((sum, o) => sum + o.views, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {opportunities.reduce((sum, o) => sum + o.interests, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities Table */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOpportunities.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No opportunities found</p>
              </div>
            ) : (
              filteredOpportunities.map((opp) => (
                <Card key={opp.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{opp.title}</h3>
                          <Badge className={getStatusColor(opp.status)}>{opp.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Location</p>
                            <p className="font-medium">{opp.location}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Investment</p>
                            <p className="font-medium">{formatCurrency(opp.investment_required)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Expected ROI</p>
                            <p className="font-medium text-green-600">{opp.expected_roi}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Engagement</p>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {opp.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {opp.interests}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOpportunity(opp);
                            loadOpportunityInterests(opp.id);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {opp.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateOpportunityStatus(opp.id, 'approved')}
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateOpportunityStatus(opp.id, 'rejected')}
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOpportunity(opp);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interest Details Dialog */}
      <Dialog open={selectedOpportunity !== null && !deleteDialogOpen} onOpenChange={() => setSelectedOpportunity(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedOpportunity?.title}</DialogTitle>
            <DialogDescription>View investor interests and engagement</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Eye className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">{selectedOpportunity?.views}</p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">{selectedOpportunity?.interests}</p>
                <p className="text-xs text-muted-foreground">Interests</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{selectedOpportunity?.expected_roi}%</p>
                <p className="text-xs text-muted-foreground">ROI</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Interested Investors</h4>
              {interests.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No interests yet</p>
              ) : (
                <div className="space-y-2">
                  {interests.map((interest) => (
                    <Card key={interest.id}>
                      <CardContent className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{interest.investor_name || interest.investor_email}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(interest.investment_amount)}
                            </p>
                          </div>
                          <Badge className={getStatusColor(interest.status)}>
                            {interest.status}
                          </Badge>
                        </div>
                        {interest.notes && (
                          <p className="text-sm text-muted-foreground mt-2">{interest.notes}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Opportunity</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedOpportunity?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedOpportunity && deleteOpportunity(selectedOpportunity.id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
