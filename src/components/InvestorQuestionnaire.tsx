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
import { Trophy, Target, DollarSign, TrendingUp, MapPin, Clock, User, Building } from 'lucide-react';

interface QuestionnaireData {
  investorType: string;
  otherDescription?: string;
  investmentExperience: string;
  riskTolerance: string;
  investmentPreference: string;
  investmentTimeline: {
    fundsAvailable: string;
    paybackPeriod: string;
  };
  preferredInvestmentSize: number;
  timeHorizon: string;
  geographicPreference: string[];
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
  const { toast } = useToast();
  const { user } = useAuth();

  const questions = [
    {
      id: 'investorType',
      title: 'Investor Type',
      subtitle: 'Which category best describes you?',
      icon: <User className="w-6 h-6" />,
      type: 'select',
      options: [
        { value: 'real-estate-short-term', label: 'Real Estate Investors / Short term Investors' },
        { value: 'wealth-managers', label: 'Wealth Managers' },
        { value: 'family-offices', label: 'Family Offices' },
        { value: 'hnwi-vip-relocators', label: 'HNWI & VIP Dubai Relocators' },
        { value: 'venture-capital', label: 'Venture Capital' },
        { value: 'private-equity', label: 'Private Equity' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'investmentExperience',
      title: 'Investment Experience',
      subtitle: 'Tell us about your real estate investment background',
      icon: <Trophy className="w-6 h-6" />,
      type: 'radio',
      options: [
        { value: 'beginner', label: 'New to real estate investing', description: 'First investment or limited experience' },
        { value: 'intermediate', label: 'Some experience', description: '2-5 successful investments' },
        { value: 'experienced', label: 'Experienced investor', description: '5+ investments, understand market dynamics' },
        { value: 'expert', label: 'Real estate professional', description: 'Extensive portfolio, industry expertise' }
      ]
    },
    {
      id: 'riskTolerance',
      title: 'Risk Tolerance',
      subtitle: 'How comfortable are you with investment risk?',
      icon: <Target className="w-6 h-6" />,
      type: 'radio',
      options: [
        { value: 'conservative', label: 'Conservative', description: 'Prefer stable, low-risk investments' },
        { value: 'moderate', label: 'Moderate', description: 'Balanced approach to risk and return' },
        { value: 'aggressive', label: 'Aggressive', description: 'Comfortable with higher risk for higher returns' }
      ]
    },
    {
      id: 'investmentPreference',
      title: 'Investment Preference',
      subtitle: 'Select your preferred investment range and expected returns',
      icon: <DollarSign className="w-6 h-6" />,
      type: 'preference-boxes',
      options: [
        { 
          value: 'conservative', 
          label: 'Conservative', 
          range: 'AED 5M-15M', 
          returns: '6%-15%',
          description: 'Lower risk, stable returns'
        },
        { 
          value: 'moderate', 
          label: 'Moderate', 
          range: 'AED 15M-45M', 
          returns: '15%-30%',
          description: 'Balanced risk and reward'
        },
        { 
          value: 'aggressive', 
          label: 'Aggressive', 
          range: 'AED 45M+', 
          returns: '25%-60%',
          description: 'Higher risk, premium returns'
        }
      ]
    },
    {
      id: 'preferredInvestmentSize',
      title: 'Investment Capacity',
      subtitle: 'Enter your preferred investment amount in AED',
      icon: <DollarSign className="w-6 h-6" />,
      type: 'number',
      placeholder: 'Enter amount in AED (e.g., 5000000)',
      min: 100000,
      max: 100000000
    },
    {
      id: 'investmentTimeline',
      title: 'Investment Timeline',
      subtitle: 'Tell us about your funding and payback preferences',
      icon: <TrendingUp className="w-6 h-6" />,
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
      title: 'Location Preferences',
      subtitle: 'Which areas interest you most?',
      icon: <MapPin className="w-6 h-6" />,
      type: 'checkbox',
      options: [
        { value: 'highest_roi', label: "I don't care about location", description: 'As long as highest ROI' },
        { value: 'downtown', label: 'Downtown Dubai', description: 'City center, business district' },
        { value: 'marina', label: 'Dubai Marina', description: 'Waterfront luxury living' },
        { value: 'palm', label: 'Palm Jumeirah', description: 'Iconic man-made island' },
        { value: 'emirates_hills', label: 'Emirates Hills', description: 'Exclusive villa community' },
        { value: 'business_bay', label: 'Business Bay', description: 'Commercial and residential hub' },
        { value: 'difc', label: 'DIFC', description: 'Financial district' }
      ]
    },
    {
      id: 'involvementPreference',
      title: 'Involvement Preference',
      subtitle: 'How involved would you like to be in the investment process?',
      icon: <User className="w-6 h-6" />,
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
          label: 'Other', 
          description: 'Please specify your preferred involvement level',
          details: 'Describe your custom involvement preferences. We can create a tailored engagement model that fits your specific needs and time availability.'
        }
      ]
    },
    {
      id: 'investmentTypePreference',
      title: 'Investment Type Preference',
      subtitle: 'Select your preferred investment structure',
      icon: <Building className="w-6 h-6" />,
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
          label: 'Other', 
          description: 'Please specify your preferred investment structure',
          details: 'Describe your specific investment structure requirements. We can explore alternative structures like REITs, property funds, or custom arrangements based on your jurisdiction and preferences.'
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
            {currentQuestion.options?.map((option: any) => (
              <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  )}
                  {option.details && (
                    <div className="text-xs text-muted-foreground mt-2 pl-2 border-l-2 border-muted">
                      {option.details}
                    </div>
                  )}
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentQuestion.options?.map((option: any) => (
                <div 
                  key={option.value}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                    selectedPreference === option.value 
                      ? 'border-primary bg-primary/10 shadow-lg' 
                      : 'border-muted hover:border-primary/40 bg-gradient-to-br from-muted/20 to-muted/40'
                  }`}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                >
                  <div className="text-center">
                    <h4 className={`font-semibold mb-3 ${selectedPreference === option.value ? 'text-primary' : 'text-foreground'}`}>
                      {option.label}
                    </h4>
                    <div className="text-2xl font-bold mb-2">{option.range}</div>
                    <div className="text-lg text-muted-foreground mb-3">{option.returns}</div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    {selectedPreference === option.value && (
                      <div className="mt-3 text-primary font-medium">✓ Selected</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'number':
        const numberValue = (typeof currentAnswer === 'number') ? currentAnswer : 0;
        const formatCurrency = (value: number) => {
          if (value >= 1000000) {
            return `AED ${(value / 1000000).toFixed(1)}M`;
          }
          return `AED ${value.toLocaleString()}`;
        };

        const formatUSDCurrency = (aedValue: number) => {
          const usdValue = aedValue / 3.67;
          if (usdValue >= 1000000) {
            return `USD ${(usdValue / 1000000).toFixed(1)}M`;
          }
          return `USD ${usdValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
        };
        
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {numberValue ? formatCurrency(numberValue) : 'Enter Amount'}
              </div>
              {numberValue > 0 && (
                <div className="text-xl font-semibold text-muted-foreground mb-2">
                  ≈ {formatUSDCurrency(numberValue)}
                </div>
              )}
              <p className="text-muted-foreground">Enter your preferred investment amount</p>
              <p className="text-sm text-muted-foreground mt-1">
                Conversion rate: 3.67 AED = 1 USD
              </p>
            </div>
            <Input
              type="number"
              placeholder={currentQuestion.placeholder}
              value={numberValue || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, parseInt(e.target.value) || 0)}
              min={currentQuestion.min}
              max={currentQuestion.max}
              className="text-center text-lg"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Min: AED {currentQuestion.min?.toLocaleString()}</span>
              <span>Max: AED {currentQuestion.max?.toLocaleString()}</span>
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
              
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {currentQuestion.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
                  <CardDescription className="text-base">{currentQuestion.subtitle}</CardDescription>
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
        
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {currentQuestion.icon}
          </div>
          <div>
            <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
            <CardDescription className="text-base">{currentQuestion.subtitle}</CardDescription>
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