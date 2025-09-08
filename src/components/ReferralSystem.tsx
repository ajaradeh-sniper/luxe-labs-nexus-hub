import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Users, 
  Gift, 
  DollarSign, 
  Plus,
  Share2,
  UserPlus,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Referral {
  id: string;
  referrer_id: string;
  referred_name: string;
  referred_email: string;
  referred_phone?: string;
  referral_type: 'investor' | 'client' | 'partner';
  status: 'pending' | 'contacted' | 'converted' | 'declined';
  reward_amount: number;
  reward_status: 'pending' | 'approved' | 'paid';
  notes?: string;
  created_at: string;
  updated_at: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  converted: 'bg-green-100 text-green-800',
  declined: 'bg-red-100 text-red-800'
};

const rewardStatusColors = {
  pending: 'bg-gray-100 text-gray-800',
  approved: 'bg-green-100 text-green-800',
  paid: 'bg-emerald-100 text-emerald-800'
};

const typeColors = {
  investor: 'bg-purple-100 text-purple-800',
  client: 'bg-blue-100 text-blue-800',
  partner: 'bg-orange-100 text-orange-800'
};

export function ReferralSystem() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [referredName, setReferredName] = useState('');
  const [referredEmail, setReferredEmail] = useState('');
  const [referredPhone, setReferredPhone] = useState('');
  const [referralType, setReferralType] = useState<'investor' | 'client' | 'partner'>('client');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchReferrals();
    }
  }, [user]);

  const fetchReferrals = async () => {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals((data || []) as Referral[]);
    } catch (error) {
      console.error('Error fetching referrals:', error);
      toast({
        title: "Error",
        description: "Failed to fetch referrals",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReferral = async () => {
    if (!referredName || !referredEmail) {
      toast({
        title: "Validation Error",
        description: "Please fill in name and email",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('referrals')
        .insert({
          referrer_id: user?.id,
          referred_name: referredName,
          referred_email: referredEmail,
          referred_phone: referredPhone,
          referral_type: referralType,
          notes: notes,
          status: 'pending',
          reward_amount: getReferralReward(referralType)
        });

      if (error) throw error;

      await fetchReferrals();
      setIsCreateDialogOpen(false);
      resetForm();

      toast({
        title: "Referral Created",
        description: "Your referral has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error creating referral:', error);
      toast({
        title: "Error",
        description: "Failed to create referral",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getReferralReward = (type: 'investor' | 'client' | 'partner') => {
    const rewards = {
      investor: 5000,
      client: 1000,
      partner: 2500
    };
    return rewards[type];
  };

  const resetForm = () => {
    setReferredName('');
    setReferredEmail('');
    setReferredPhone('');
    setReferralType('client');
    setNotes('');
  };

  const getTotalEarnings = () => {
    return referrals
      .filter(r => r.reward_status === 'paid')
      .reduce((total, r) => total + r.reward_amount, 0);
  };

  const getPendingEarnings = () => {
    return referrals
      .filter(r => r.status === 'converted' && r.reward_status !== 'paid')
      .reduce((total, r) => total + r.reward_amount, 0);
  };

  const getConversionRate = () => {
    if (referrals.length === 0) return 0;
    const converted = referrals.filter(r => r.status === 'converted').length;
    return Math.round((converted / referrals.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Referrals</p>
                <p className="text-2xl font-bold">{referrals.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground ml-auto" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{getConversionRate()}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground ml-auto" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold">${getTotalEarnings().toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground ml-auto" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Rewards</p>
                <p className="text-2xl font-bold">${getPendingEarnings().toLocaleString()}</p>
              </div>
              <Gift className="h-8 w-8 text-muted-foreground ml-auto" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Program Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Referral Program
          </CardTitle>
          <CardDescription>
            Earn rewards by referring new investors, clients, and partners to our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">$5,000</div>
              <div className="font-medium">Investor Referral</div>
              <div className="text-sm text-muted-foreground">Per successful conversion</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">$1,000</div>
              <div className="font-medium">Client Referral</div>
              <div className="text-sm text-muted-foreground">Per successful conversion</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">$2,500</div>
              <div className="font-medium">Partner Referral</div>
              <div className="text-sm text-muted-foreground">Per successful conversion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referrals Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Referrals</CardTitle>
              <CardDescription>
                Track the status and rewards of your referrals
              </CardDescription>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Referral
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading referrals...</div>
          ) : referrals.length === 0 ? (
            <div className="text-center py-8">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No referrals yet</h3>
              <p className="text-muted-foreground mb-4">Start referring people to earn rewards</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                Create Your First Referral
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referred Person</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reward</TableHead>
                  <TableHead>Reward Status</TableHead>
                  <TableHead>Referred Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{referral.referred_name}</div>
                        <div className="text-sm text-muted-foreground">{referral.referred_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={typeColors[referral.referral_type]}>
                        {referral.referral_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[referral.status]}>
                        {referral.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${referral.reward_amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={rewardStatusColors[referral.reward_status]}>
                        {referral.reward_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(referral.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Referral Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Refer Someone</DialogTitle>
            <DialogDescription>
              Refer a new investor, client, or partner to earn rewards
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name *</label>
              <Input
                placeholder="Enter their full name"
                value={referredName}
                onChange={(e) => setReferredName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email Address *</label>
              <Input
                type="email"
                placeholder="Enter their email"
                value={referredEmail}
                onChange={(e) => setReferredEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                placeholder="Enter their phone number"
                value={referredPhone}
                onChange={(e) => setReferredPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Referral Type *</label>
              <Select value={referralType} onValueChange={(value: any) => setReferralType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select referral type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client ($1,000 reward)</SelectItem>
                  <SelectItem value="partner">Partner ($2,500 reward)</SelectItem>
                  <SelectItem value="investor">Investor ($5,000 reward)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Additional Notes</label>
              <Textarea
                placeholder="Any additional information about this referral..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReferral} disabled={loading}>
              Submit Referral
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}