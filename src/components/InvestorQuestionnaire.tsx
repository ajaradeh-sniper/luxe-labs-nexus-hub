import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, DollarSign, TrendingUp, MapPin, Clock, User, Building, Crown, Diamond, Gem, Star, Sparkles, Award, Shield, Zap, ArrowUpDown } from 'lucide-react';

interface QuestionnaireData {
  investorType: string;
  otherDescription?: string;
  investmentExperience: string;
  investmentPreference: string;
  investmentTimeline: {
    fundsAvailable: string;
    paybackPeriod: string;
  };
  preferredInvestmentSize: number;
  timeHorizon: string;
  geographicPreference: string[];
  involvementPreference: string;
  investmentTypePreference: string;
  propertyTypes: string[];
  expectedReturns: string;
  liquidityPreference: string;
  investmentApproach: string;
}

interface InvestorQuestionnaireProps {
  standalone?: boolean;
  onComplete?: (data: QuestionnaireData) => void;
}

export const InvestorQuestionnaire: React.FC<InvestorQuestionnaireProps> = ({ 
  standalone = false, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUSDInput, setIsUSDInput] = useState(false); // Track currency input mode
  const { toast } = useToast();
  const { user } = useAuth();

  const questions = [
    {
      id: 'investorType',
      title: 'Investor Profile',
      subtitle: 'Which elite category best describes you?',
      icon: <Crown className="w-7 h-7" />,
      type: 'select',
      options: [
        { value: 'real-estate-short-term', label: 'Real Estate Investors / Short term Investors' },
        { value: 'wealth-managers', label: 'Wealth Managers' },
        { value: 'family-offices', label: 'Family Offices' },
        { value: 'hnwi-vip-relocators', label: 'HNWI & VIP Dubai Relocators' },
        { value: 'venture-capital', label: 'Venture Capital' },
        { value: 'private-equity', label: 'Private Equity' },
        { value: 'other', label: 'Skip - Let\'s discuss later' }
      ]
    },
    {
      id: 'investmentExperience',
      title: 'Investment Mastery',
      subtitle: 'Your level of investment excellence',
      icon: <Trophy className="w-7 h-7" />,
      type: 'radio',
      options: [
        { value: 'beginner', label: 'Rising Investor', description: 'Starting your luxury investment journey', icon: <Star className="w-5 h-5" /> },
        { value: 'intermediate', label: 'Seasoned Investor', description: '2-5 successful luxury investments', icon: <Award className="w-5 h-5" /> },
        { value: 'experienced', label: 'Elite Investor', description: '5+ investments, market expertise', icon: <Diamond className="w-5 h-5" /> },
        { value: 'expert', label: 'Investment Virtuoso', description: 'Extensive portfolio, industry mastery', icon: <Crown className="w-5 h-5" /> }
      ]
    },
    {
      id: 'investmentPreference',
      title: 'Investment Tier',
      subtitle: 'Select your preferred luxury investment range',
      icon: <Gem className="w-7 h-7" />,
      type: 'preference-boxes',
      options: [
        { 
          value: 'conservative', 
          label: 'Emerald Tier', 
          range: 'AED 5M-15M', 
          returns: '6%-15%',
          description: 'Stable luxury returns',
          icon: <Shield className="w-6 h-6" />,
          gradient: 'from-emerald-500/20 to-green-600/20'
        },
        { 
          value: 'moderate', 
          label: 'Sapphire Tier', 
          range: 'AED 15M-45M', 
          returns: '15%-30%',
          description: 'Premium balanced growth',
          icon: <Sparkles className="w-6 h-6" />,
          gradient: 'from-blue-500/20 to-indigo-600/20'
        },
        { 
          value: 'aggressive', 
          label: 'Diamond Tier', 
          range: 'AED 45M+', 
          returns: '25%-60%',
          description: 'Ultra-premium returns',
          icon: <Diamond className="w-6 h-6" />,
          gradient: 'from-purple-500/20 to-pink-600/20'
        }
      ]
    },
    {
      id: 'preferredInvestmentSize',
      title: 'Investment Capital',
      subtitle: 'Your luxury investment capacity in AED',
      icon: <Zap className="w-7 h-7" />,
      type: 'number',
      placeholder: 'Enter amount in AED (e.g., 5000000)',
      min: 500000,
      max: 100000000
    },
    {
      id: 'investmentTimeline',
      title: 'Investment Timeline',
      subtitle: 'Your luxury investment schedule preferences',
      icon: <TrendingUp className="w-7 h-7" />,
      type: 'timeline',
      fields: [
        {
          id: 'fundsAvailable',
          label: 'When can you provide funds? (in days)',
          type: 'number',
          placeholder: 'Enter number of days (1-365)',
          min: 1,
          max: 365
        },
        {
          id: 'paybackPeriod',
          label: 'Preferred payback period',
          type: 'radio',
          options: [
            { value: '8-12', label: '8-12 months', description: 'Short-term investment' },
            { value: '10-15', label: '10-15 months', description: 'Medium-term investment' },
            { value: '24', label: '24 months', description: 'Long-term investment' },
            { value: '36', label: '36 months', description: 'Extended investment period' }
          ]
        }
      ]
    },
    {
      id: 'geographicPreference',
      title: 'Luxury Locations',
      subtitle: 'Your preferred prestigious areas',
      icon: <MapPin className="w-7 h-7" />,
      type: 'checkbox',
      options: [
        { value: 'highest_roi', label: "Skip - Let's discuss later", description: 'We can explore all location options during consultation' },
        { value: 'downtown', label: 'Downtown Dubai', description: 'City center, business district' },
        { value: 'marina', label: 'Dubai Marina', description: 'Waterfront luxury living' },
        { value: 'palm', label: 'Palm Jumeirah', description: 'Iconic man-made island' },
        { value: 'emirates_hills', label: 'Emirates Hills', description: 'Exclusive villa community' },
        { value: 'business_bay', label: 'Jumeirah', description: 'Commercial and residential hub' },
        { value: 'difc', label: 'DIFC', description: 'Financial district' }
      ]
    },
    {
      id: 'involvementPreference',
      title: 'Engagement Style',
      subtitle: 'Your preferred level of luxury project involvement',
      icon: <User className="w-7 h-7" />,
      type: 'radio',
      options: [
        { 
          value: 'no_involvement', 
          label: 'No Involvement', 
          description: 'Just financial payback and monthly updates and project monitoring',
          details: 'Perfect for busy investors who prefer passive involvement. You receive comprehensive monthly reports with financial updates, project photos, timeline progress, and milestone achievements. No decision-making required from your side.'
        },
        { 
          value: 'support_luxury_labs', 
          label: 'Support Luxury Labs', 
          description: 'Selection of property options, selection of design options, monthly updates and project monitoring',
          details: 'Ideal for investors who want strategic input without daily management. You participate in key decisions like property selection from curated options and approve major design choices. Includes all reporting benefits plus consultation calls.'
        },
        { 
          value: 'full_involvement', 
          label: 'Full Involvement', 
          description: 'Selection of property, selection of design, project management',
          details: 'For hands-on investors who want complete control. You participate in property sourcing, design development, contractor selection, timeline management, and all major project decisions. Includes weekly calls and real-time project access.'
        },
        { 
          value: 'other', 
          label: 'Skip - Let\'s discuss later', 
          description: 'We can customize your involvement level during our consultation',
          details: 'We\'ll discuss your custom involvement preferences during our initial consultation. We can create a tailored engagement model that fits your specific needs and time availability.'
        }
      ]
    },
    {
      id: 'investmentTypePreference',
      title: 'Investment Structure',
      subtitle: 'Your preferred luxury investment framework',
      icon: <Building className="w-7 h-7" />,
      type: 'radio',
      options: [
        { 
          value: 'uae_title_deed', 
          label: 'In UAE - Name on Title Deed', 
          description: 'Direct ownership with your name on the property title',
          details: 'You hold direct legal ownership of the property in Dubai. Your name appears on the official title deed. Suitable for amounts above AED 1M. Provides maximum ownership rights and potential for independent future decisions.'
        },
        { 
          value: 'uae_spv_cayman', 
          label: 'In UAE - Joint Venture - SPV (Cayman Island)', 
          description: 'Investment through Special Purpose Vehicle structure',
          details: 'Investment through a Cayman Islands SPV that owns the Dubai property. Offers tax optimization, limited liability protection, and professional fund management. Minimum investment typically AED 500K. Ideal for institutional or high-net-worth investors.'
        },
        { 
          value: 'outside_uae_title_deed', 
          label: 'Outside UAE - Name on Title Deed', 
          description: 'Direct ownership outside UAE with title deed',
          details: 'Direct property ownership in international markets like UK, Portugal, or other approved jurisdictions. Your name on the title deed with full ownership rights. Minimum investments vary by market (typically £200K-£500K+).'
        },
        { 
          value: 'outside_uae_spv_cayman', 
          label: 'Outside UAE - Joint Venture - SPV (Cayman Island)', 
          description: 'International investment through SPV structure',
          details: 'SPV-based investment in international real estate markets. Provides diversification, professional management, and tax efficiency. Suitable for multi-property portfolios and institutional-grade investments. Minimum typically $250K USD.'
        },
        { 
          value: 'other', 
          label: 'Skip - Let\'s discuss later', 
          description: 'We can explore structure options during our consultation',
          details: 'We\'ll discuss your specific investment structure requirements during our consultation. We can explore alternative structures like REITs, property funds, or custom arrangements based on your jurisdiction and preferences.'
        }
      ]
    }
  ];

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save your preferences.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Handle demo mode - don't try to save to database
      if (user.id === 'demo-admin') {
        // Store in localStorage for demo mode
        localStorage.setItem('demo_investor_preferences', JSON.stringify({
          user_id: user.id,
          preferences: answers,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));

        toast({
          title: "Profile Complete!",
          description: "Your investor profile has been saved successfully (demo mode)."
        });

        if (onComplete) {
          onComplete(answers as QuestionnaireData);
        }
        return;
      }

      // Normal database save for real users
      const { error } = await supabase
        .from('investor_preferences')
        .upsert({
          user_id: user.id,
          preferences: answers,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Profile Complete!",
        description: "Your investor profile has been saved successfully."
      });

      if (onComplete) {
        onComplete(answers as QuestionnaireData);
      }
    } catch (error) {
      console.error('Error saving questionnaire:', error);
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id as keyof QuestionnaireData];

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'select':
        const selectedValue = currentAnswer as string;
        const otherDescription = answers.otherDescription as string;
        
        return (
          <div className="space-y-6">
            <Select
              value={selectedValue || ''}
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
            >
              <SelectTrigger className="w-full text-base p-6 bg-background border-2 border-muted hover:border-primary transition-colors">
                <SelectValue placeholder="Select your investor type..." />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 border-muted shadow-lg z-50">
                {currentQuestion.options?.map((option: any) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-base p-4 hover:bg-muted focus:bg-muted cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedValue === 'other' && (
              <div className="space-y-3">
                <Label htmlFor="other-description" className="text-base font-medium">
                  Please describe your investor type:
                </Label>
                <Textarea
                  id="other-description"
                  placeholder="Please provide details about your investment background and focus..."
                  value={otherDescription || ''}
                  onChange={(e) => handleAnswer('otherDescription', e.target.value)}
                  className="min-h-[100px] text-base"
                />
              </div>
            )}
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            value={currentAnswer as string}
            onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
            className="space-y-4"
          >
            {currentQuestion.options?.map((option: any, index: number) => (
              <div 
                key={option.value} 
                className={`group flex items-start space-x-4 p-6 rounded-xl border-2 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fade-in bg-gradient-to-r from-background to-muted/10 ${
                  currentAnswer === option.value ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]' : 'border-muted'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1.5" />
                <div className="flex items-start space-x-3 flex-1">
                  {option.icon && (
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      currentAnswer === option.value 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                      {option.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="font-semibold cursor-pointer text-lg group-hover:text-primary transition-colors">
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{option.description}</p>
                    )}
                    {option.details && (
                      <div className="text-xs text-muted-foreground mt-3 pl-3 border-l-2 border-primary/20 bg-muted/20 rounded-r-lg p-2">
                        {option.details}
                      </div>
                    )}
                  </div>
                </div>
                {currentAnswer === option.value && (
                  <div className="text-primary animate-scale-in">
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        const selectedValues = (currentAnswer as string[]) || [];
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option: any) => (
              <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={option.value}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => {
                    const newValues = checked
                      ? [...selectedValues, option.value]
                      : selectedValues.filter(v => v !== option.value);
                    handleAnswer(currentQuestion.id, newValues);
                  }}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'preference-boxes':
        const selectedPreference = currentAnswer as string;
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentQuestion.options?.map((option: any, index: number) => (
                <div 
                  key={option.value}
                  className={`group relative p-8 border-2 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in ${
                    selectedPreference === option.value 
                      ? 'border-primary bg-gradient-to-br from-primary/10 via-background to-primary/5 shadow-2xl scale-105' 
                      : `border-muted hover:border-primary/40 bg-gradient-to-br ${option.gradient || 'from-muted/20 to-muted/40'}`
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                >
                  <div className="text-center relative">
                    <div className={`flex justify-center mb-4 transition-all duration-300 ${
                      selectedPreference === option.value ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    }`}>
                      {option.icon}
                    </div>
                    <h4 className={`font-bold text-xl mb-4 transition-colors ${
                      selectedPreference === option.value ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {option.label}
                    </h4>
                    <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {option.range}
                    </div>
                    <div className="text-xl font-semibold text-muted-foreground mb-4">{option.returns}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                    {selectedPreference === option.value && (
                      <div className="mt-6 flex justify-center animate-scale-in">
                        <div className="flex items-center space-x-2 bg-primary/20 text-primary px-4 py-2 rounded-full">
                          <Crown className="w-4 h-4" />
                          <span className="font-semibold">Selected</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {selectedPreference === option.value && (
                    <div className="absolute -top-2 -right-2 text-primary animate-scale-in">
                      <div className="bg-primary text-primary-foreground p-2 rounded-full">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'number':
        const numberValue = (typeof currentAnswer === 'number') ? currentAnswer : 0;
        
        const formatAEDCurrency = (aedValue: number) => {
          if (aedValue >= 1000000) {
            return `AED ${(aedValue / 1000000).toFixed(1)}M`;
          }
          return `AED ${aedValue.toLocaleString()}`;
        };

        const formatUSDCurrency = (aedValue: number) => {
          const usdValue = aedValue / 3.67;
          if (usdValue >= 1000000) {
            return `USD ${(usdValue / 1000000).toFixed(1)}M`;
          }
          return `USD ${usdValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
        };

        const formatUSDCurrencyDirect = (usdValue: number) => {
          if (usdValue >= 1000000) {
            return `USD ${(usdValue / 1000000).toFixed(1)}M`;
          }
          return `USD ${usdValue.toLocaleString()}`;
        };

        const formatAEDFromUSD = (usdValue: number) => {
          const aedValue = usdValue * 3.67;
          if (aedValue >= 1000000) {
            return `AED ${(aedValue / 1000000).toFixed(1)}M`;
          }
          return `AED ${aedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
        };

        const getDisplayValue = () => {
          if (!numberValue) return 'Enter Amount';
          return isUSDInput ? formatUSDCurrencyDirect(numberValue / 3.67) : formatAEDCurrency(numberValue);
        };

        const getConversionValue = () => {
          if (!numberValue) return '';
          return isUSDInput ? formatAEDCurrency(numberValue) : formatUSDCurrency(numberValue);
        };

        const handleCurrencySwap = () => {
          setIsUSDInput(!isUSDInput);
        };

        const handleNumberInput = (value: string) => {
          const inputValue = parseInt(value) || 0;
          // Always store as AED in the backend
          const aedValue = isUSDInput ? inputValue * 3.67 : inputValue;
          handleAnswer(currentQuestion.id, aedValue);
        };

        const getInputValue = () => {
          if (!numberValue) return '';
          return isUSDInput ? Math.round(numberValue / 3.67) : numberValue;
        };

        const getPlaceholder = () => {
          return isUSDInput ? 'Enter amount in USD (e.g., 1000000)' : 'Enter amount in AED (e.g., 5000000)';
        };

        const getMinMax = () => {
          if (isUSDInput) {
            return {
              min: Math.round((currentQuestion.min || 0) / 3.67),
              max: Math.round((currentQuestion.max || 0) / 3.67)
            };
          }
          return {
            min: currentQuestion.min || 0,
            max: currentQuestion.max || 0
          };
        };
        
        return (
          <div className="space-y-6">
            <div className="text-center relative">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-3xl font-bold text-primary">
                  {getDisplayValue()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCurrencySwap}
                  className="p-2 h-10 w-10 rounded-full hover:bg-primary/10 hover:border-primary transition-all duration-200"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
              {numberValue > 0 && (
                <div className="text-xl font-semibold text-muted-foreground mb-2">
                  ≈ {getConversionValue()}
                </div>
              )}
              <p className="text-muted-foreground">Enter your preferred investment amount</p>
              <p className="text-sm text-muted-foreground mt-1">
                Conversion rate: 3.67 AED = 1 USD
              </p>
            </div>
            <Input
              type="number"
              placeholder={getPlaceholder()}
              value={getInputValue() || ''}
              onChange={(e) => handleNumberInput(e.target.value)}
              min={getMinMax().min}
              max={getMinMax().max}
              className="text-center text-lg"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Min: {isUSDInput ? `USD ${getMinMax().min.toLocaleString()}` : `AED ${getMinMax().min.toLocaleString()}`}</span>
              <span>Max: {isUSDInput ? `USD ${getMinMax().max.toLocaleString()}` : `AED ${getMinMax().max.toLocaleString()}`}</span>
            </div>
          </div>
        );

      case 'timeline':
        const timelineData = (currentAnswer as { fundsAvailable: string; paybackPeriod: string }) || { fundsAvailable: '', paybackPeriod: '' };
        
        return (
          <div className="space-y-8">
            {currentQuestion.fields?.map((field: any) => (
              <div key={field.id} className="space-y-4">
                <h3 className="text-lg font-semibold">{field.label}</h3>
                
                {field.type === 'text' && (
                  <Input
                    type="text"
                    placeholder={field.placeholder}
                    value={timelineData[field.id as keyof typeof timelineData] || ''}
                    onChange={(e) => handleAnswer(currentQuestion.id, {
                      ...timelineData,
                      [field.id]: e.target.value
                    })}
                    className="text-base"
                  />
                )}
                
                {field.type === 'number' && (
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder={field.placeholder}
                      value={timelineData[field.id as keyof typeof timelineData] || ''}
                      onChange={(e) => handleAnswer(currentQuestion.id, {
                        ...timelineData,
                        [field.id]: e.target.value
                      })}
                      min={field.min}
                      max={field.max}
                      className="text-base"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Min: {field.min} day{field.min !== 1 ? 's' : ''}</span>
                      <span>Max: {field.max} days</span>
                    </div>
                  </div>
                )}
                
                {field.type === 'radio' && (
                  <RadioGroup
                    value={timelineData[field.id as keyof typeof timelineData] || ''}
                    onValueChange={(value) => handleAnswer(currentQuestion.id, {
                      ...timelineData,
                      [field.id]: value
                    })}
                    className="space-y-3"
                  >
                    {field.options?.map((option: any) => (
                      <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={`${field.id}-${option.value}`} className="font-medium cursor-pointer">
                            {option.label}
                          </Label>
                          {option.description && (
                            <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const isCurrentStepComplete = () => {
    const answer = currentAnswer;
    if (!answer) return false;
    
    // For select type questions, check if "other" is selected and needs description
    if (currentQuestion.type === 'select' && answer === 'other') {
      const otherDescription = answers.otherDescription as string;
      return otherDescription && otherDescription.trim().length > 0;
    }
    
    if (currentQuestion.type === 'timeline') {
      const timelineData = answer as { fundsAvailable: string; paybackPeriod: string };
      return timelineData.fundsAvailable && timelineData.paybackPeriod;
    }
    
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    
    return true;
  };

  if (standalone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Investor Profile Assessment</h1>
            <p className="text-xl text-muted-foreground">
              Help us understand your investment preferences to provide personalized opportunities
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">
                  Step {currentStep + 1} of {questions.length}
                </Badge>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="mb-6" />
              
        <div className="flex items-center space-x-4 animate-fade-in">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg animate-scale-in">
            {currentQuestion.icon}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {currentQuestion.title}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {currentQuestion.subtitle}
            </CardDescription>
          </div>
          <div className="flex-1 flex justify-end">
            <Sparkles className="w-6 h-6 text-primary/40 animate-pulse" />
          </div>
        </div>
            </CardHeader>
            
            <CardContent>
              {renderQuestion()}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isCurrentStepComplete() || isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? 'Saving...' : currentStep === questions.length - 1 ? 'Complete Profile' : 'Next'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">
            Step {currentStep + 1} of {questions.length}
          </Badge>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="mb-6" />
        
        <div className="flex items-center space-x-4 animate-fade-in">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg animate-scale-in">
            {currentQuestion.icon}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {currentQuestion.title}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {currentQuestion.subtitle}
            </CardDescription>
          </div>
          <div className="flex-1 flex justify-end">
            <Sparkles className="w-6 h-6 text-primary/40 animate-pulse" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {renderQuestion()}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!isCurrentStepComplete() || isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? 'Saving...' : currentStep === questions.length - 1 ? 'Complete Profile' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
};