import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Target, 
  Clock, 
  UserCheck, 
  UserPlus,
  Mail,
  Phone,
  Building,
  FileText,
  Tag
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserSource {
  type: 'luxury_labs' | 'referral' | 'website_application';
  referredBy?: string;
  applicationId?: string;
  approvedBy?: string;
  approvedAt?: string;
}

interface InvestorData {
  investmentCapacity?: number;
  riskTolerance?: string;
  investmentHorizon?: string;
  preferredLocations?: string[];
  propertyTypes?: string[];
  investmentGoals?: string[];
  experience?: string;
  kycStatus?: 'pending' | 'approved' | 'rejected';
}

interface EnhancedUserProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    status: string;
    lastLogin: string;
    joinedDate: string;
    avatar?: string;
    notes?: string;
  };
  showInvestorData?: boolean;
}

export function EnhancedUserDisplay({ user, showInvestorData = false }: EnhancedUserProps) {
  const [userSource, setUserSource] = useState<UserSource | null>(null);
  const [investorData, setInvestorData] = useState<InvestorData | null>(null);
  const [referralData, setReferralData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (showInvestorData && (user.role === 'investor' || user.role === 'client')) {
      fetchUserEnhancedData();
    }
  }, [user.id, showInvestorData]);

  const fetchUserEnhancedData = async () => {
    setLoading(true);
    try {
      // Fetch investor preferences if demo user
      if (user.id === 'demo-admin') {
        const demoData = localStorage.getItem('demo_investor_preferences');
        if (demoData) {
          const parsed = JSON.parse(demoData);
          setInvestorData(parsed.preferences);
        }
        // Mock source data for demo
        setUserSource({
          type: 'luxury_labs',
        });
      } else {
        // Fetch real data for actual users
        const [preferencesResult, referralResult, submissionResult] = await Promise.all([
          supabase
            .from('investor_settings')
            .select('preferences, completed_at')
            .eq('user_id', user.id)
            .maybeSingle(),
          
          supabase
            .from('referrals')
            .select('referrer_id, referred_name, created_at, status')
            .eq('referred_email', user.email)
            .maybeSingle(),
          
          supabase
            .from('user_submissions')
            .select('submission_type, status, reviewed_by, reviewed_at, created_at')
            .eq('email', user.email)
            .maybeSingle()
        ]);

        if (preferencesResult.data) {
          setInvestorData(preferencesResult.data.preferences as InvestorData);
        }

        if (referralResult.data) {
          setReferralData(referralResult.data);
          setUserSource({
            type: 'referral',
            referredBy: referralResult.data.referred_name
          });
        } else if (submissionResult.data) {
          setUserSource({
            type: 'website_application',
            applicationId: submissionResult.data.submission_type,
            approvedBy: submissionResult.data.reviewed_by,
            approvedAt: submissionResult.data.reviewed_at
          });
        } else {
          setUserSource({
            type: 'luxury_labs'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching enhanced user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    const usdAmount = amount / 3.67;
    return `AED ${amount.toLocaleString()} (~$${Math.round(usdAmount).toLocaleString()})`;
  };

  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'conservative': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'aggressive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'luxury_labs': return <Tag className="h-4 w-4" />;
      case 'referral': return <UserPlus className="h-4 w-4" />;
      case 'website_application': return <FileText className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getSourceLabel = (source: UserSource) => {
    switch (source.type) {
      case 'luxury_labs': return 'Added by Luxury Labs';
      case 'referral': return `Referred by ${source.referredBy}`;
      case 'website_application': return 'Website Application';
      default: return 'Unknown Source';
    }
  };

  const getSourceColor = (sourceType: string) => {
    switch (sourceType) {
      case 'luxury_labs': return 'bg-blue-100 text-blue-800';
      case 'referral': return 'bg-purple-100 text-purple-800';
      case 'website_application': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-luxury text-primary-foreground font-semibold">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <Badge variant="outline">{user.role}</Badge>
              {userSource && (
                <Badge className={getSourceColor(userSource.type)}>
                  {getSourceIcon(userSource.type)}
                  <span className="ml-1">{getSourceLabel(userSource)}</span>
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
              {user.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {user.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      {showInvestorData && investorData && (
        <CardContent className="space-y-4">
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Investor Profile
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Investment Capacity */}
              {investorData.investmentCapacity && (
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Investment Capacity</p>
                    <p className="text-sm text-primary font-semibold">
                      {formatCurrency(investorData.investmentCapacity)}
                    </p>
                  </div>
                </div>
              )}

              {/* Risk Tolerance */}
              {investorData.riskTolerance && (
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Risk Tolerance</p>
                    <Badge className={getRiskColor(investorData.riskTolerance)} variant="secondary">
                      {investorData.riskTolerance}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Investment Horizon */}
              {investorData.investmentHorizon && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Investment Horizon</p>
                    <p className="text-sm text-muted-foreground">{investorData.investmentHorizon}</p>
                  </div>
                </div>
              )}

              {/* Experience */}
              {investorData.experience && (
                <div className="flex items-center gap-3">
                  <UserCheck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-muted-foreground">{investorData.experience}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Preferred Locations */}
            {investorData.preferredLocations && investorData.preferredLocations.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Preferred Locations</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {investorData.preferredLocations.map((location, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Property Types */}
            {investorData.propertyTypes && investorData.propertyTypes.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Property Types</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {investorData.propertyTypes.map((type, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Investment Goals */}
            {investorData.investmentGoals && investorData.investmentGoals.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Investment Goals</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {investorData.investmentGoals.map((goal, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}