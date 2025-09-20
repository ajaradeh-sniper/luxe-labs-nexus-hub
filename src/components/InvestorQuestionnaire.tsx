import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Target, DollarSign, TrendingUp, MapPin, Clock } from 'lucide-react';

interface QuestionnaireData {
  investmentExperience: string;
  riskTolerance: string;
  investmentGoals: string[];
  preferredInvestmentSize: number[];
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
      id: 'preferredInvestmentSize',
      title: 'Investment Capacity',
      subtitle: 'What is your preferred investment range?',
      icon: <DollarSign className="w-6 h-6" />,
      type: 'slider',
      min: 100000,
      max: 10000000,
      step: 100000,
      format: (value: number) => `AED ${(value / 1000000).toFixed(1)}M`
    },
    {
      id: 'investmentGoals',
      title: 'Investment Objectives',
      subtitle: 'What are your primary investment goals?',
      icon: <TrendingUp className="w-6 h-6" />,
      type: 'checkbox',
      options: [
        { value: 'capital_appreciation', label: 'Capital Appreciation', description: 'Long-term property value growth' },
        { value: 'rental_income', label: 'Rental Income', description: 'Regular monthly/annual income' },
        { value: 'diversification', label: 'Portfolio Diversification', description: 'Spread investment risk' },
        { value: 'tax_benefits', label: 'Tax Advantages', description: 'Optimize tax efficiency' },
        { value: 'legacy_building', label: 'Wealth Preservation', description: 'Build generational wealth' }
      ]
    },
    {
      id: 'geographicPreference',
      title: 'Location Preferences',
      subtitle: 'Which areas interest you most?',
      icon: <MapPin className="w-6 h-6" />,
      type: 'checkbox',
      options: [
        { value: 'downtown', label: 'Downtown Dubai', description: 'City center, business district' },
        { value: 'marina', label: 'Dubai Marina', description: 'Waterfront luxury living' },
        { value: 'palm', label: 'Palm Jumeirah', description: 'Iconic man-made island' },
        { value: 'emirates_hills', label: 'Emirates Hills', description: 'Exclusive villa community' },
        { value: 'business_bay', label: 'Business Bay', description: 'Commercial and residential hub' },
        { value: 'difc', label: 'DIFC', description: 'Financial district' }
      ]
    },
    {
      id: 'timeHorizon',
      title: 'Investment Timeline',
      subtitle: 'What is your expected holding period?',
      icon: <Clock className="w-6 h-6" />,
      type: 'radio',
      options: [
        { value: 'short', label: '1-3 years', description: 'Quick turnaround, flipping focus' },
        { value: 'medium', label: '3-7 years', description: 'Medium-term appreciation' },
        { value: 'long', label: '7+ years', description: 'Long-term wealth building' }
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

      case 'slider':
        const sliderValue = (currentAnswer as number[]) || [currentQuestion.min || 0];
        return (
          <div className="space-y-6">
            {/* Investment Preference Boxes */}
            {currentQuestion.id === 'preferredInvestmentSize' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-center">Investment Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border-2 border-primary/20 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/40 transition-all">
                    <div className="text-center">
                      <h4 className="font-semibold text-primary mb-2">Conservative</h4>
                      <div className="text-2xl font-bold mb-2">AED 5M-15M</div>
                      <div className="text-lg text-muted-foreground">6%-15%</div>
                      <p className="text-sm text-muted-foreground mt-2">Lower risk, stable returns</p>
                    </div>
                  </div>
                  <div className="p-4 border-2 border-secondary/20 rounded-lg bg-gradient-to-br from-secondary/5 to-secondary/10 hover:border-secondary/40 transition-all">
                    <div className="text-center">
                      <h4 className="font-semibold text-secondary-foreground mb-2">Moderate</h4>
                      <div className="text-2xl font-bold mb-2">AED 15M-45M</div>
                      <div className="text-lg text-muted-foreground">15%-30%</div>
                      <p className="text-sm text-muted-foreground mt-2">Balanced risk and reward</p>
                    </div>
                  </div>
                  <div className="p-4 border-2 border-accent/20 rounded-lg bg-gradient-to-br from-accent/5 to-accent/10 hover:border-accent/40 transition-all">
                    <div className="text-center">
                      <h4 className="font-semibold text-accent-foreground mb-2">Aggressive</h4>
                      <div className="text-2xl font-bold mb-2">AED 45M+</div>
                      <div className="text-lg text-muted-foreground">25%-60%</div>
                      <p className="text-sm text-muted-foreground mt-2">Higher risk, premium returns</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {currentQuestion.format ? currentQuestion.format(sliderValue[0]) : sliderValue[0]}
              </div>
              <p className="text-muted-foreground">Drag to adjust your preferred investment amount</p>
            </div>
            <Slider
              value={sliderValue}
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
              min={currentQuestion.min}
              max={currentQuestion.max}
              step={currentQuestion.step}
              className="mt-6"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentQuestion.format ? currentQuestion.format(currentQuestion.min!) : currentQuestion.min}</span>
              <span>{currentQuestion.format ? currentQuestion.format(currentQuestion.max!) : currentQuestion.max}</span>
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