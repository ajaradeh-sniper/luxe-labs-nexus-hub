import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Trophy, DollarSign, TrendingUp, User, Building, Crown, Diamond, 
  Star, Sparkles, Award, Shield, ArrowUpDown, Bitcoin, Landmark, 
  Globe, PenLine, CheckCircle, Loader2
} from 'lucide-react';

interface AssessmentData {
  investorType: string;
  otherDescription?: string;
  investmentExperience: string;
  investmentPreference: string;
  preferredInvestmentSize: string;
  investmentTimeline: {
    fundsAvailable: string;
    paybackPeriod: string;
  };
  involvementPreference: string;
  investmentTypePreference: string;
  fundsTransferPreference: string;
  fundsTransferOther?: string;
}

export const InvestorAssessmentReport: React.FC = () => {
  const [data, setData] = useState<Partial<AssessmentData>>({
    investmentTimeline: { fundsAvailable: '', paybackPeriod: '' }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadExistingData();
  }, [user]);

  const loadExistingData = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data: settings, error } = await supabase
        .from('investor_settings')
        .select('preferences, completed_at')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (settings?.preferences) {
        setData(settings.preferences as Partial<AssessmentData>);
        setIsCompleted(!!settings.completed_at);
      }
    } catch (error) {
      console.error('Error loading assessment data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimelineUpdate = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      investmentTimeline: {
        ...prev.investmentTimeline,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your assessment.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('investor_settings')
        .upsert({
          user_id: user.id,
          preferences: data,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setIsCompleted(true);
      toast({
        title: "Assessment Saved",
        description: "Your investor profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({
        title: "Error",
        description: "Failed to save your assessment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/10">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h2 className="text-4xl font-bold font-playfair">Investor Profile Assessment</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete your profile to access personalized investment opportunities
        </p>
        {isCompleted && (
          <Badge variant="outline" className="text-primary border-primary">
            <CheckCircle className="w-4 h-4 mr-2" />
            Assessment Completed
          </Badge>
        )}
      </div>

      {/* Section 1: Investor Profile */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Crown className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">Investor Profile</CardTitle>
              <CardDescription>Which category best describes you?</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Select
            value={data.investorType || ''}
            onValueChange={(value) => handleUpdate('investorType', value)}
          >
            <SelectTrigger className="w-full text-base p-6 bg-background">
              <SelectValue placeholder="Select your investor type..." />
            </SelectTrigger>
            <SelectContent className="bg-background z-[100000]">
              <SelectItem value="real-estate-short-term">Real Estate Investors / Short term Investors</SelectItem>
              <SelectItem value="wealth-managers">Wealth Managers</SelectItem>
              <SelectItem value="family-offices">Family Offices</SelectItem>
              <SelectItem value="hnwi-vip-relocators">HNWI & VIP Dubai Relocators</SelectItem>
              <SelectItem value="venture-capital">Venture Capital</SelectItem>
              <SelectItem value="private-equity">Private Equity</SelectItem>
              <SelectItem value="other">Skip - Let's discuss later</SelectItem>
            </SelectContent>
          </Select>
          
          {data.investorType === 'other' && (
            <Textarea
              placeholder="Please describe your investor type..."
              value={data.otherDescription || ''}
              onChange={(e) => handleUpdate('otherDescription', e.target.value)}
              className="mt-4"
            />
          )}
        </CardContent>
      </Card>

      {/* Section 2: Investment Experience */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">Investment Mastery</CardTitle>
              <CardDescription>Your level of investment excellence</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.investmentExperience || ''}
            onValueChange={(value) => handleUpdate('investmentExperience', value)}
            className="space-y-3"
          >
            {[
              { value: 'beginner', label: 'Rising Investor', description: 'Starting your luxury investment journey', icon: <Star className="w-5 h-5" /> },
              { value: 'intermediate', label: 'Seasoned Investor', description: '2-5 successful luxury investments', icon: <Award className="w-5 h-5" /> },
              { value: 'experienced', label: 'Elite Investor', description: '5+ investments, market expertise', icon: <Diamond className="w-5 h-5" /> },
              { value: 'expert', label: 'Investment Virtuoso', description: 'Extensive portfolio, industry mastery', icon: <Crown className="w-5 h-5" /> }
            ].map((option) => (
              <div
                key={option.value}
                className={`flex items-start space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  data.investmentExperience === option.value 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted hover:border-primary/30'
                }`}
                onClick={() => handleUpdate('investmentExperience', option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${data.investmentExperience === option.value ? 'bg-primary/20 text-primary' : 'bg-muted/50'}`}>
                    {option.icon}
                  </div>
                  <div>
                    <Label htmlFor={option.value} className="font-semibold cursor-pointer text-lg">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
                {data.investmentExperience === option.value && (
                  <Sparkles className="w-5 h-5 text-primary" />
                )}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Section 3: Investment Tier */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Diamond className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">Investment Tier</CardTitle>
              <CardDescription>Select your preferred luxury investment range</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                value: 'conservative', 
                label: 'Apartments & Townhouses', 
                range: 'AED 5M-15M', 
                returns: '6%-15%',
                description: 'Stable luxury returns',
                image: '/lovable-uploads/d4ad1a46-cb19-4670-bb37-9f665291308a.png'
              },
              { 
                value: 'moderate', 
                label: 'Luxury Villas & Penthouses', 
                range: 'AED 15M-45M', 
                returns: '15%-30%',
                description: 'Premium balanced growth',
                image: '/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png'
              },
              { 
                value: 'aggressive', 
                label: 'Luxury Mansions', 
                range: 'AED 45M+', 
                returns: '25%-60%',
                description: 'Ultra-premium returns',
                image: '/lovable-uploads/d6d93f42-4152-430f-bb17-3221a60d919b.png'
              }
            ].map((option) => (
              <div
                key={option.value}
                className={`group relative rounded-2xl cursor-pointer transition-all duration-200 overflow-hidden ${
                  data.investmentPreference === option.value 
                    ? 'ring-4 ring-primary shadow-xl' 
                    : 'hover:ring-2 hover:ring-primary/50'
                }`}
                onClick={() => handleUpdate('investmentPreference', option.value)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={option.image} 
                    alt={option.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h4 className="font-bold text-xl mb-2">{option.label}</h4>
                    <div className="text-2xl font-bold mb-2">{option.range}</div>
                    <div className="text-lg font-semibold text-white/90 mb-2">{option.returns}</div>
                    <p className="text-sm text-white/80">{option.description}</p>
                  </div>
                  {data.investmentPreference === option.value && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground p-2 rounded-full">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Investment Capital */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">Investment Capital</CardTitle>
              <CardDescription>Your luxury investment capacity</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { value: '500000-1000000', label: 'AED 500,000 - 1,000,000', usdRange: '$136K - $272K', icon: <Shield className="w-5 h-5" /> },
              { value: '1000000-5000000', label: 'AED 1,000,000 - 5,000,000', usdRange: '$272K - $1.36M', icon: <Sparkles className="w-5 h-5" /> },
              { value: '5000000-15000000', label: 'AED 5,000,000 - 15,000,000', usdRange: '$1.36M - $4.08M', icon: <Diamond className="w-5 h-5" /> },
              { value: '15000000+', label: 'Over AED 15,000,000', usdRange: 'Over $4.08M', icon: <Crown className="w-5 h-5" /> }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleUpdate('preferredInvestmentSize', option.value)}
                className={`relative p-8 rounded-2xl border-2 text-left transition-all duration-200 bg-gradient-to-br ${
                  data.preferredInvestmentSize === option.value 
                    ? 'border-primary from-primary/10 via-primary/5 to-transparent shadow-lg' 
                    : 'border-muted from-muted/20 to-transparent hover:border-primary/40 hover:from-primary/5'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-xl transition-colors ${
                    data.preferredInvestmentSize === option.value 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {option.icon}
                  </div>
                  {data.preferredInvestmentSize === option.value && (
                    <Badge variant="default" className="shadow-md">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Selected
                    </Badge>
                  )}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  data.preferredInvestmentSize === option.value ? 'text-primary' : ''
                }`}>
                  {option.label}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground bg-muted/30 rounded-lg px-4 py-3">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-base font-semibold">{option.usdRange}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Investment Timeline */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">Investment Timeline</CardTitle>
              <CardDescription>Your luxury investment schedule preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Funds Available */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">When can you provide funds?</h3>
            <RadioGroup
              value={data.investmentTimeline?.fundsAvailable || ''}
              onValueChange={(value) => handleTimelineUpdate('fundsAvailable', value)}
              className="space-y-3"
            >
              {[
                { value: '1-5', label: 'Immediately (1-5 days)', description: 'Funds ready for immediate deployment' },
                { value: '5-30', label: 'Shortly (5-30 days)', description: 'Funds available within a month' },
                { value: '30+', label: 'Later (more than 30 days)', description: 'Planning ahead for future investments' }
              ].map((option) => (
                <div
                  key={option.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer ${
                    data.investmentTimeline?.fundsAvailable === option.value 
                      ? 'border-primary bg-primary/10' 
                      : 'border-muted hover:bg-muted/50'
                  }`}
                  onClick={() => handleTimelineUpdate('fundsAvailable', option.value)}
                >
                  <RadioGroupItem value={option.value} id={`funds-${option.value}`} />
                  <div className="flex-1">
                    <Label htmlFor={`funds-${option.value}`} className="font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payback Period */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferred payback period</h3>
            <RadioGroup
              value={data.investmentTimeline?.paybackPeriod || ''}
              onValueChange={(value) => handleTimelineUpdate('paybackPeriod', value)}
              className="space-y-3"
            >
              {[
                { value: 'short-term', label: 'Short-term investment (One Flip)', description: '8-12 months' },
                { value: '24+', label: '24 Months+ (Long-Term investment - Fund)', description: 'Extended investment period' }
              ].map((option) => (
                <div
                  key={option.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer ${
                    data.investmentTimeline?.paybackPeriod === option.value 
                      ? 'border-primary bg-primary/10' 
                      : 'border-muted hover:bg-muted/50'
                  }`}
                  onClick={() => handleTimelineUpdate('paybackPeriod', option.value)}
                >
                  <RadioGroupItem value={option.value} id={`payback-${option.value}`} />
                  <div className="flex-1">
                    <Label htmlFor={`payback-${option.value}`} className="font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Engagement Style */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">Engagement Style</CardTitle>
              <CardDescription>Your preferred level of luxury project involvement</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.involvementPreference || ''}
            onValueChange={(value) => handleUpdate('involvementPreference', value)}
            className="space-y-3"
          >
            {[
              { 
                value: 'no_involvement', 
                label: 'No Involvement', 
                description: 'Just financial payback and monthly updates and project monitoring and luxury labs will do end to end service'
              },
              { 
                value: 'support_luxury_labs', 
                label: 'Support Luxury Labs', 
                description: 'Selection of property options, selection of design options, monthly updates and project monitoring'
              },
              { 
                value: 'full_involvement', 
                label: 'Full Involvement', 
                description: 'Lead the selection of property, design, materials and supplies, QA & PM'
              },
              { 
                value: 'other', 
                label: 'Skip - Let\'s discuss later', 
                description: 'We can customize your involvement level during our consultation'
              }
            ].map((option) => (
              <div
                key={option.value}
                className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  data.involvementPreference === option.value 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted hover:border-primary/30'
                }`}
                onClick={() => handleUpdate('involvementPreference', option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-semibold cursor-pointer text-base">
                    {option.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                </div>
                {data.involvementPreference === option.value && (
                  <Sparkles className="w-4 h-4 text-primary" />
                )}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Section 7: Investment Structure */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">Investment Structure</CardTitle>
              <CardDescription>Your preferred luxury investment framework</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.investmentTypePreference || ''}
            onValueChange={(value) => handleUpdate('investmentTypePreference', value)}
            className="space-y-3"
          >
            {[
              { 
                value: 'in_uae', 
                label: 'In UAE', 
                description: 'Direct ownership or SPV structure in Dubai',
                image: '/lovable-uploads/9bdf3759-8541-414d-a494-7d6f9d38185c.png'
              },
              { 
                value: 'outside_uae', 
                label: 'Outside UAE', 
                description: 'International property investments',
                image: '/lovable-uploads/b2b9ab2c-7e3d-4eab-b79f-a0b91cd6ba50.png'
              }
            ].map((option) => (
              <div
                key={option.value}
                className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  data.investmentTypePreference === option.value 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted hover:border-primary/30'
                }`}
                onClick={() => handleUpdate('investmentTypePreference', option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <div className="flex items-start space-x-3 flex-1">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={option.image} 
                      alt={option.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="font-semibold cursor-pointer text-base">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
                {data.investmentTypePreference === option.value && (
                  <Sparkles className="w-4 h-4 text-primary" />
                )}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Section 8: Funds Transfer */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ArrowUpDown className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-playfair">Funds Transfer Preference</CardTitle>
              <CardDescription>Your preferred method of transferring investment funds</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.fundsTransferPreference || ''}
            onValueChange={(value) => handleUpdate('fundsTransferPreference', value)}
            className="space-y-3"
          >
            {[
              { value: 'skip', label: 'Skip', description: 'Let\'s discuss transfer options during consultation', icon: <Star className="w-5 h-5" /> },
              { value: 'crypto', label: 'Crypto Transfer', description: 'Digital currency transfer', icon: <Bitcoin className="w-5 h-5" /> },
              { value: 'uae_transfer', label: 'UAE-UAE Transfer/Wire', description: 'Domestic bank transfer within UAE', icon: <Landmark className="w-5 h-5" /> },
              { value: 'international', label: 'International Transfer (UAE or Cayman Islands)', description: 'Cross-border transfer to SPV', icon: <Globe className="w-5 h-5" /> },
              { value: 'other', label: 'Other', description: 'Specify your preferred transfer method', icon: <PenLine className="w-5 h-5" /> }
            ].map((option) => (
              <div
                key={option.value}
                className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  data.fundsTransferPreference === option.value 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted hover:border-primary/30'
                }`}
                onClick={() => handleUpdate('fundsTransferPreference', option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${
                    data.fundsTransferPreference === option.value ? 'bg-primary/20 text-primary' : 'bg-muted/50'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="font-semibold cursor-pointer text-base">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
                {data.fundsTransferPreference === option.value && (
                  <Sparkles className="w-4 h-4 text-primary" />
                )}
              </div>
            ))}
          </RadioGroup>
          
          {data.fundsTransferPreference === 'other' && (
            <Input
              placeholder="Describe your preferred transfer method..."
              value={data.fundsTransferOther || ''}
              onChange={(e) => handleUpdate('fundsTransferOther', e.target.value)}
              className="mt-4"
            />
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center pt-8">
        <Button
          onClick={handleSave}
          disabled={isSaving || !user}
          size="lg"
          className="luxury-gradient text-primary-foreground px-12 py-6 text-lg font-semibold"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              {isCompleted ? 'Update Assessment' : 'Complete Assessment'}
            </>
          )}
        </Button>
      </div>

      {!user && (
        <div className="text-center p-6 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">
            Please <a href="/auth" className="text-primary hover:underline font-semibold">sign in</a> to save your assessment and access personalized opportunities.
          </p>
        </div>
      )}
    </div>
  );
};
