import React, { useState, useEffect } from 'react';
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
import { Trophy, DollarSign, TrendingUp, MapPin, Clock, User, Building, Crown, Diamond, Gem, Star, Sparkles, Award, Shield, Zap, ArrowUpDown, Phone, Mail } from 'lucide-react';
import { SplashCursor } from '@/components/ui/splash-cursor';

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
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
  };
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
      subtitle: 'Your luxury investment capacity',
      icon: <DollarSign className="w-7 h-7" />,
      type: 'investment-boxes',
      options: [
        { 
          value: '500000-1000000', 
          label: 'AED 500,000 - 1,000,000', 
          usdRange: '$136K - $272K',
          icon: <Shield className="w-5 h-5" />
        },
        { 
          value: '1000000-5000000', 
          label: 'AED 1,000,000 - 5,000,000', 
          usdRange: '$272K - $1.36M',
          icon: <Sparkles className="w-5 h-5" />
        },
        { 
          value: '5000000-15000000', 
          label: 'AED 5,000,000 - 15,000,000', 
          usdRange: '$1.36M - $4.08M',
          icon: <Diamond className="w-5 h-5" />
        },
        { 
          value: '15000000+', 
          label: 'Over AED 15,000,000', 
          usdRange: 'Over $4.08M',
          icon: <Crown className="w-5 h-5" />
        }
      ]
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
          label: 'When can you provide funds?',
          type: 'radio',
          options: [
            { value: '1-5', label: 'Immediately (1-5 days)', description: 'Funds ready for immediate deployment' },
            { value: '5-30', label: 'Shortly (5-30 days)', description: 'Funds available within a month' },
            { value: '30+', label: 'Later (more than 30 days)', description: 'Planning ahead for future investments' }
          ]
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
          value: 'in_uae', 
          label: 'In UAE', 
          description: 'Direct ownership or SPV structure in Dubai'
        },
        { 
          value: 'outside_uae', 
          label: 'Outside UAE', 
          description: 'International property investments'
        },
        { 
          value: 'skip', 
          label: 'Skip', 
          description: 'Let\'s discuss structure options during consultation'
        }
      ]
    }
  ];

  // Add contact info question for unauthenticated users
  const allQuestions = !user 
    ? [
        ...questions,
        {
          id: 'contactInfo',
          title: 'Contact Information',
          subtitle: 'Complete your submission with your details',
          icon: <User className="w-7 h-7" />,
          type: 'contact',
          fields: [
            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', required: true },
            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@example.com', required: true },
            { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+971 50 123 4567', required: true }
          ]
        }
      ]
    : questions;

  const progress = ((currentStep + 1) / allQuestions.length) * 100;

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < allQuestions.length - 1) {
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
    setIsSubmitting(true);
    try {
      if (user) {
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
        console.log('Saving to investor_settings:', { user_id: user.id })
        const { error } = await supabase
          .from('investor_settings')
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
      } else {
        // For unauthenticated users, just show success
        toast({
          title: "Assessment Complete!",
          description: "Thank you for completing your investor profile. We'll contact you soon."
        });
      }

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

  const currentQuestion = allQuestions[currentStep];
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
                {'options' in currentQuestion && currentQuestion.options?.map((option: any) => (
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
        // Check if this is the engagement style or investment structure question
        const isCompactStyle = currentQuestion.id === 'involvementPreference' || currentQuestion.id === 'investmentTypePreference';
        
        return (
          <RadioGroup
            value={currentAnswer as string}
            onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
            className="space-y-3"
          >
            {'options' in currentQuestion && currentQuestion.options?.map((option: any, index: number) => (
              <div 
                key={option.value} 
                className={`group flex items-start space-x-3 ${isCompactStyle ? 'p-4' : 'p-6'} rounded-xl border-2 hover:border-primary/40 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg animate-fade-in bg-gradient-to-r from-background to-muted/10 ${
                  currentAnswer === option.value ? 'border-primary bg-primary/5 shadow-lg scale-[1.01]' : 'border-muted'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex items-start space-x-2 flex-1">
                  {option.icon && (
                    <div className={`${isCompactStyle ? 'p-1.5' : 'p-2'} rounded-lg transition-all duration-300 ${
                      currentAnswer === option.value 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                      {option.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <Label htmlFor={option.value} className={`font-semibold cursor-pointer ${isCompactStyle ? 'text-base' : 'text-lg'} group-hover:text-primary transition-colors`}>
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{option.description}</p>
                    )}
                    {option.details && !isCompactStyle && (
                      <div className="text-xs text-muted-foreground mt-2 pl-3 border-l-2 border-primary/20 bg-muted/20 rounded-r-lg p-2">
                        {option.details}
                      </div>
                    )}
                  </div>
                </div>
                {currentAnswer === option.value && (
                  <div className="text-primary animate-scale-in">
                    <Sparkles className={`${isCompactStyle ? 'w-4 h-4' : 'w-5 h-5'}`} />
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
            {'options' in currentQuestion && currentQuestion.options?.map((option: any) => (
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
              {'options' in currentQuestion && currentQuestion.options?.map((option: any, index: number) => (
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

      case 'investment-boxes':
        const selectedInvestment = currentAnswer as string;
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {'options' in currentQuestion && currentQuestion.options?.map((option: any) => {
              const isSelected = selectedInvestment === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`
                    relative p-8 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105
                    ${isSelected 
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105' 
                      : 'border-muted hover:border-primary/50 hover:shadow-md'
                    }
                  `}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {option.icon}
                      </div>
                      {isSelected && (
                        <div className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          <Sparkles className="w-3 h-3" />
                          <span>Selected</span>
                        </div>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold mb-3 transition-colors ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                      {option.label}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm font-medium">{option.usdRange}</span>
                    </div>
                  </div>
                </button>
              );
            })}
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
          const minValue = ('min' in currentQuestion && typeof currentQuestion.min === 'number') ? currentQuestion.min : 0;
          const maxValue = ('max' in currentQuestion && typeof currentQuestion.max === 'number') ? currentQuestion.max : 0;
          
          if (isUSDInput) {
            return {
              min: Math.round(minValue / 3.67),
              max: Math.round(maxValue / 3.67)
            };
          }
          return {
            min: minValue,
            max: maxValue
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
            {'fields' in currentQuestion && currentQuestion.fields?.map((field: any) => (
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

      case 'contact':
        const contactData = (currentAnswer as { name: string; email: string; phone: string }) || { name: '', email: '', phone: '' };
        
        return (
          <div className="space-y-6">
            {'fields' in currentQuestion && currentQuestion.fields?.map((field: any) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-base font-medium">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                <div className="relative">
                  {field.id === 'email' && <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
                  {field.id === 'name' && <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
                  {field.id === 'phone' && <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />}
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={contactData[field.id as keyof typeof contactData] || ''}
                    onChange={(e) => handleAnswer(currentQuestion.id, {
                      ...contactData,
                      [field.id]: e.target.value
                    })}
                    className="text-base pl-10"
                    required={field.required}
                  />
                </div>
              </div>
            ))}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <Shield className="w-4 h-4 inline mr-2 text-primary" />
                Your information is secure and will only be used to contact you about investment opportunities.
              </p>
            </div>
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

    if (currentQuestion.type === 'contact') {
      const contactData = answer as { name: string; email: string; phone: string };
      return contactData.name && contactData.email && contactData.phone;
    }
    
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    
    return true;
  };

  if (standalone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 relative">
          <SplashCursor />
          <div className="max-w-4xl mx-auto relative z-10">
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
                    Step {currentStep + 1} of {allQuestions.length}
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
                {isSubmitting ? 'Saving...' : currentStep === allQuestions.length - 1 ? 'Complete Profile' : 'Next'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <SplashCursor />
      <Card className="relative z-10">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">
              Step {currentStep + 1} of {allQuestions.length}
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
          {isSubmitting ? 'Saving...' : currentStep === allQuestions.length - 1 ? 'Complete Profile' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
    </>
  );
};