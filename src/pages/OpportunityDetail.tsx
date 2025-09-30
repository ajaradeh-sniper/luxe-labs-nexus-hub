import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, MapPin, Building2, DollarSign, TrendingUp, 
  Calendar, Bed, Bath, Square, Car, Home, CheckCircle,
  AlertCircle, Clock, Eye, Users, Share2
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Temporary: bypass strict Supabase types for newly added tables
const sb = supabase as any;

interface Opportunity {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  investment_required: number;
  expected_roi: number;
  risk_level: string;
  status: string;
  deadline: string;
  property_details: {
    bedrooms?: number;
    bathrooms?: number;
    area_sqft?: number;
    parking?: number;
    amenities?: string[];
  };
  financial_details: {
    asking_price: number;
    renovation_cost: number;
    after_value: number;
    holding_costs?: number;
  };
  created_by: string;
  created_at: string;
}

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [expressInterestOpen, setExpressInterestOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investorNotes, setInvestorNotes] = useState('');
  const [analytics, setAnalytics] = useState({
    views: 0,
    interests: 0,
    shares: 0
  });

  useEffect(() => {
    if (id) {
      loadOpportunityDetails();
      trackView();
      loadAnalytics();
    }
  }, [id]);

  const loadOpportunityDetails = async () => {
    try {
      // For now using mock data - would fetch from opportunities table
      const mockOpportunity: Opportunity = {
        id: id!,
        title: "Luxury Villa - Palm Jumeirah",
        description: "Stunning villa with panoramic views, prime location on the Palm Jumeirah frond. Excellent opportunity for renovation and value appreciation.",
        location: "Palm Jumeirah, Dubai",
        type: "Renovation & Flip",
        investment_required: 850000,
        expected_roi: 28,
        risk_level: "Medium",
        status: "Active",
        deadline: "2024-03-15",
        property_details: {
          bedrooms: 5,
          bathrooms: 6,
          area_sqft: 4500,
          parking: 3,
          amenities: ["Private Pool", "Beach Access", "Gym", "Smart Home", "Landscaped Garden"]
        },
        financial_details: {
          asking_price: 3200000,
          renovation_cost: 450000,
          after_value: 4500000,
          holding_costs: 85000
        },
        created_by: user?.id || '',
        created_at: new Date().toISOString()
      };
      
      setOpportunity(mockOpportunity);
    } catch (error) {
      console.error('Error loading opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to load opportunity details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    if (!user || !id) return;
    
    try {
      const { error } = await sb
        .from('opportunity_analytics')
        .insert({
          opportunity_id: id,
          user_id: user.id,
          action_type: 'view',
          metadata: {
            timestamp: new Date().toISOString(),
            user_role: user.role
          }
        });

      if (error) console.error('Error tracking view:', error);
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const loadAnalytics = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await sb
        .from('opportunity_analytics')
        .select('action_type')
        .eq('opportunity_id', id);

      if (data && !error) {
        const viewsCount = data.filter(a => a.action_type === 'view').length;
        const interestsCount = data.filter(a => a.action_type === 'express_interest').length;
        const sharesCount = data.filter(a => a.action_type === 'share').length;
        
        setAnalytics({
          views: viewsCount,
          interests: interestsCount,
          shares: sharesCount
        });
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const handleExpressInterest = async () => {
    if (!user || !id) return;

    try {
      // Record interest in database
      const { error: interestError } = await sb
        .from('opportunity_interests')
        .insert({
          opportunity_id: id,
          investor_id: user.id,
          investment_amount: parseFloat(investmentAmount) || null,
          notes: investorNotes,
          status: 'pending'
        });

      if (interestError) throw interestError;

      // Track analytics
      await sb
        .from('opportunity_analytics')
        .insert({
          opportunity_id: id,
          user_id: user.id,
          action_type: 'express_interest',
          metadata: {
            investment_amount: investmentAmount,
            timestamp: new Date().toISOString()
          }
        });

      toast({
        title: "Interest Recorded",
        description: "Our team will contact you shortly with next steps."
      });

      setExpressInterestOpen(false);
      setInvestmentAmount('');
      setInvestorNotes('');
      loadAnalytics();
    } catch (error) {
      console.error('Error expressing interest:', error);
      toast({
        title: "Error",
        description: "Failed to record your interest. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!opportunity) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Opportunity Not Found</h2>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{opportunity.title}</h1>
              <Badge className={getRiskColor(opportunity.risk_level)}>
                {opportunity.risk_level} Risk
              </Badge>
              <Badge variant="outline">{opportunity.status}</Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {opportunity.location}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {opportunity.type}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={() => setExpressInterestOpen(true)} size="lg">
              Express Interest
            </Button>
          </div>
        </div>

        {/* Analytics Bar */}
        <Card>
          <CardContent className="py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {analytics.views} views
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {analytics.interests} interests
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {analytics.shares} shares
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Investment Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(opportunity.investment_required)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Expected ROI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{opportunity.expected_roi}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Deadline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(opportunity.deadline).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Project Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{opportunity.type}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="property">Property Details</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Opportunity Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {opportunity.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Prime Location</p>
                      <p className="text-sm text-muted-foreground">High-demand area with strong appreciation potential</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Proven Track Record</p>
                      <p className="text-sm text-muted-foreground">Similar projects have exceeded ROI expectations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Expert Management</p>
                      <p className="text-sm text-muted-foreground">Experienced team handling all aspects</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Clear Exit Strategy</p>
                      <p className="text-sm text-muted-foreground">Well-defined timeline and market analysis</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="property" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <Bed className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{opportunity.property_details.bedrooms}</p>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bath className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{opportunity.property_details.bathrooms}</p>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Square className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{opportunity.property_details.area_sqft?.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Sq Ft</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{opportunity.property_details.parking}</p>
                      <p className="text-sm text-muted-foreground">Parking</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {opportunity.property_details.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Asking Price</span>
                    <span className="font-semibold">{formatCurrency(opportunity.financial_details.asking_price)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Renovation Cost</span>
                    <span className="font-semibold">{formatCurrency(opportunity.financial_details.renovation_cost)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="text-muted-foreground">Holding Costs</span>
                    <span className="font-semibold">{formatCurrency(opportunity.financial_details.holding_costs || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">Total Investment</span>
                    <span className="font-bold text-lg">{formatCurrency(opportunity.investment_required)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                    <span className="font-medium">Expected After Value</span>
                    <span className="font-bold text-lg text-green-600">{formatCurrency(opportunity.financial_details.after_value)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-lg font-bold">Projected Profit</span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(opportunity.financial_details.after_value - opportunity.investment_required)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { phase: "Due Diligence", duration: "2 weeks", status: "upcoming" },
                    { phase: "Purchase & Financing", duration: "3 weeks", status: "upcoming" },
                    { phase: "Renovation", duration: "3 months", status: "upcoming" },
                    { phase: "Marketing & Sale", duration: "1 month", status: "upcoming" }
                  ].map((phase, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`mt-1 rounded-full p-2 ${
                        phase.status === 'complete' ? 'bg-green-500' : 
                        phase.status === 'active' ? 'bg-blue-500' : 'bg-muted'
                      }`}>
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{phase.phase}</h4>
                        <p className="text-sm text-muted-foreground">{phase.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Express Interest Dialog */}
      <Dialog open={expressInterestOpen} onOpenChange={setExpressInterestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Express Interest</DialogTitle>
            <DialogDescription>
              Let us know you're interested in this opportunity. Our team will contact you with next steps.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="investment-amount">Investment Amount (Optional)</Label>
              <Input
                id="investment-amount"
                type="number"
                placeholder="Enter amount in AED"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any questions or specific requirements?"
                value={investorNotes}
                onChange={(e) => setInvestorNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setExpressInterestOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExpressInterest}>
              Submit Interest
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
