import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, CheckCircle, Loader2, Sparkles, Zap, Target, TrendingUp, Star } from 'lucide-react';

interface AssessmentData {
  investorType: string;
  investmentExperience: string;
  investmentPreference: string;
  preferredInvestmentSize: string;
  fundsAvailable: string;
  paybackPeriod: string;
  involvementPreference: string;
  investmentTypePreference: string;
  fundsTransferPreference: string;
}

const getInvestmentSizeLabel = (value: number): string => {
  if (value === 0) return 'AED 500K';
  if (value <= 20) {
    // 500K increments up to 10M
    return `AED ${(value * 0.5).toFixed(1)}M`;
  }
  if (value === 21) return 'AED 15M';
  if (value === 22) return 'AED 20M';
  if (value === 23) return 'AED 25M';
  if (value === 24) return 'AED 30M';
  if (value === 25) return 'AED 35M';
  if (value === 26) return 'AED 40M';
  if (value === 27) return 'AED 45M';
  if (value === 28) return 'AED 50M';
  return 'AED 100M+';
};

const getInvestmentSizeValue = (sizeString: string): number => {
  if (sizeString === '500000-1000000') return 1;
  if (sizeString === '1000000-5000000') return 8;
  if (sizeString === '5000000-15000000') return 16;
  if (sizeString === '15000000+') return 20;
  if (sizeString === '50000000+') return 28;
  if (sizeString === '100000000+') return 29;
  return 1;
};

export const InvestorAssessmentReport: React.FC = () => {
  const [data, setData] = useState<Partial<AssessmentData>>({});
  const [investmentSize, setInvestmentSize] = useState([1]);
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
        const prefs = settings.preferences as Partial<AssessmentData>;
        setData(prefs);
        setIsCompleted(!!settings.completed_at);
        
        // Set slider position based on saved data
        if (prefs.preferredInvestmentSize) {
          setInvestmentSize([getInvestmentSizeValue(prefs.preferredInvestmentSize)]);
        }
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

  const handleInvestmentSizeChange = (value: number[]) => {
    setInvestmentSize(value);
    // Map slider value to investment size range
    const sliderValue = value[0];
    let sizeRange: string;
    
    if (sliderValue === 0) {
      sizeRange = '500000-1000000';
    } else if (sliderValue <= 10) {
      sizeRange = '1000000-5000000';
    } else if (sliderValue <= 18) {
      sizeRange = '5000000-15000000';
    } else if (sliderValue <= 20) {
      sizeRange = '15000000+';
    } else if (sliderValue <= 28) {
      sizeRange = '50000000+';
    } else {
      sizeRange = '100000000+';
    }
    
    handleUpdate('preferredInvestmentSize', sizeRange);
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

      // Send email notification
      try {
        await supabase.functions.invoke('send-email', {
          body: {
            to: 'admin@luxurylabs.com',
            subject: 'Investor Assessment Completed',
            html: `
              <h2>New Investor Assessment Completed</h2>
              <p><strong>User:</strong> ${user.email}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <h3>Assessment Data:</h3>
              <pre>${JSON.stringify(data, null, 2)}</pre>
            `
          }
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }

      setIsCompleted(true);
      toast({
        title: "🎉 Assessment Saved!",
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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="space-y-3 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-playfair">Investor Profile Assessment</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete your profile in minutes
                </p>
              </div>
            </div>
            {isCompleted && (
              <Badge variant="outline" className="text-primary border-primary">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Object.keys(data).length}/9 fields</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300"
                style={{ width: `${Math.min((Object.keys(data).length / 9) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Investor Type
              </Label>
              <Select
                value={data.investorType || ''}
                onValueChange={(value) => handleUpdate('investorType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="real-estate-short-term">Real Estate / Short term</SelectItem>
                  <SelectItem value="wealth-managers">Wealth Managers</SelectItem>
                  <SelectItem value="family-offices">Family Offices</SelectItem>
                  <SelectItem value="hnwi-vip-relocators">HNWI & VIP Relocators</SelectItem>
                  <SelectItem value="venture-capital">Venture Capital</SelectItem>
                  <SelectItem value="private-equity">Private Equity</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                Investment Experience
              </Label>
              <Select
                value={data.investmentExperience || ''}
                onValueChange={(value) => handleUpdate('investmentExperience', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience..." />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="beginner">Rising Investor (Starting)</SelectItem>
                  <SelectItem value="intermediate">Seasoned (2-5 deals)</SelectItem>
                  <SelectItem value="experienced">Elite (5+ deals)</SelectItem>
                  <SelectItem value="expert">Virtuoso (Extensive)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Investment Tier
              </Label>
              <Select
                value={data.investmentPreference || ''}
                onValueChange={(value) => handleUpdate('investmentPreference', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tier..." />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="conservative">
                    <div className="flex items-center gap-2">
                      <span>🏢 Apartments & Townhouses</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="moderate">
                    <div className="flex items-center gap-2">
                      <span>🏠 Luxury Villas & Penthouses</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="aggressive">
                    <div className="flex items-center gap-2">
                      <span>🏰 Luxury Mansions</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Funds Available
              </Label>
              <Select
                value={data.fundsAvailable || ''}
                onValueChange={(value) => handleUpdate('fundsAvailable', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline..." />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="1-5">⚡ Immediately (1-5 days)</SelectItem>
                  <SelectItem value="5-30">📅 Shortly (5-30 days)</SelectItem>
                  <SelectItem value="30+">🗓️ Later (30+ days)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Investment Size Slider */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <Label className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Investment Capital
            </Label>
            <div className="space-y-3">
              <Slider
                value={investmentSize}
                onValueChange={handleInvestmentSizeChange}
                max={29}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>AED 500K</span>
                <span className="text-lg font-bold text-primary">{getInvestmentSizeLabel(investmentSize[0])}</span>
                <span>AED 100M+</span>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Payback Period</Label>
              <Select
                value={data.paybackPeriod || ''}
                onValueChange={(value) => handleUpdate('paybackPeriod', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select period..." />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="short-term">⚡ Short-term (One Flip)</SelectItem>
                  <SelectItem value="24+">📈 24 Months+ (Fund)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Involvement Level</Label>
              <Select
                value={data.involvementPreference || ''}
                onValueChange={(value) => handleUpdate('involvementPreference', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select involvement..." />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="no_involvement">🎯 No Involvement</SelectItem>
                  <SelectItem value="support_luxury_labs">🤝 Support Luxury Labs</SelectItem>
                  <SelectItem value="full_involvement">👨‍💼 Full Involvement</SelectItem>
                  <SelectItem value="other">💬 Let's discuss</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Investment Structure</Label>
              <Select
                value={data.investmentTypePreference || ''}
                onValueChange={(value) => handleUpdate('investmentTypePreference', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select structure..." />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="in_uae">🇦🇪 In UAE</SelectItem>
                  <SelectItem value="outside_uae">🌍 Outside UAE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Funds Transfer</Label>
              <Select
                value={data.fundsTransferPreference || ''}
                onValueChange={(value) => handleUpdate('fundsTransferPreference', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method..." />
                </SelectTrigger>
                <SelectContent className="z-[100000]">
                  <SelectItem value="skip">💬 Skip - Discuss later</SelectItem>
                  <SelectItem value="crypto">₿ Crypto Transfer</SelectItem>
                  <SelectItem value="uae_transfer">🏦 UAE-UAE Transfer</SelectItem>
                  <SelectItem value="international">🌐 International Transfer</SelectItem>
                  <SelectItem value="other">✏️ Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fun Completion Stats */}
          {Object.keys(data).length > 0 && (
            <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Object.keys(data).length}</div>
                <div className="text-xs text-muted-foreground">Fields Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.min(Math.round((Object.keys(data).length / 9) * 100), 100)}%</div>
                <div className="text-xs text-muted-foreground">Profile Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">{Object.keys(data).length >= 9 ? '🎉' : '⏳'}</div>
                <div className="text-xs text-muted-foreground">
                  {Object.keys(data).length >= 9 ? 'Complete!' : 'In Progress'}
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isSaving || !user || Object.keys(data).length === 0}
            size="lg"
            variant="luxury"
            className="w-full text-lg font-semibold"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                {isCompleted ? 'Update Profile' : 'Complete Assessment'}
              </>
            )}
          </Button>

          {!user && (
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <a href="/auth" className="text-primary hover:underline font-semibold">Sign in</a> to save your assessment
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
