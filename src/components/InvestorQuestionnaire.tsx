import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

interface InvestorQuestionnaireProps {
  onSuccess?: () => void;
  standalone?: boolean;
}

export function InvestorQuestionnaire({ onSuccess, standalone = false }: InvestorQuestionnaireProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    investment_appetite: '',
    investment_range_min: '',
    investment_range_max: '',
    interested_in_luxury_flips: false,
    interested_in_luxury_funds: false,
    investment_timeline: '',
    risk_tolerance: '',
    preferred_locations: [] as string[],
    investment_objectives: '',
    additional_notes: '',
  });

  const { toast } = useToast();

  const handleLocationToggle = (location: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        preferred_locations: [...prev.preferred_locations, location]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        preferred_locations: prev.preferred_locations.filter(loc => loc !== location)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        investment_appetite: formData.investment_appetite ? Number(formData.investment_appetite) : null,
        investment_range_min: formData.investment_range_min ? Number(formData.investment_range_min) : null,
        investment_range_max: formData.investment_range_max ? Number(formData.investment_range_max) : null,
        status: 'new',
      };

      const { error } = await supabase
        .from('investor_questionnaires')
        .insert([submitData]);

      if (error) throw error;

      toast({
        title: 'Questionnaire Submitted',
        description: 'Thank you for your interest. We will contact you soon!',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        investment_appetite: '',
        investment_range_min: '',
        investment_range_max: '',
        interested_in_luxury_flips: false,
        interested_in_luxury_funds: false,
        investment_timeline: '',
        risk_tolerance: '',
        preferred_locations: [],
        investment_objectives: '',
        additional_notes: '',
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your questionnaire. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const questionnaire = (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Investor Interest Questionnaire</CardTitle>
        <CardDescription>
          Help us understand your investment preferences and objectives so we can match you with the right luxury opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Investment Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Investment Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investment_appetite">Investment Appetite (AED)</Label>
                <Input
                  id="investment_appetite"
                  type="number"
                  placeholder="e.g., 1000000"
                  value={formData.investment_appetite}
                  onChange={(e) => setFormData(prev => ({ ...prev, investment_appetite: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investment_timeline">Investment Timeline</Label>
                <Select
                  value={formData.investment_timeline}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, investment_timeline: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                    <SelectItem value="short_term">Short term (3-6 months)</SelectItem>
                    <SelectItem value="medium_term">Medium term (6-12 months)</SelectItem>
                    <SelectItem value="long_term">Long term (1+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investment_range_min">Minimum Investment Range (AED)</Label>
                <Input
                  id="investment_range_min"
                  type="number"
                  placeholder="e.g., 500000"
                  value={formData.investment_range_min}
                  onChange={(e) => setFormData(prev => ({ ...prev, investment_range_min: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investment_range_max">Maximum Investment Range (AED)</Label>
                <Input
                  id="investment_range_max"
                  type="number"
                  placeholder="e.g., 5000000"
                  value={formData.investment_range_max}
                  onChange={(e) => setFormData(prev => ({ ...prev, investment_range_max: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk_tolerance">Risk Tolerance</Label>
              <Select
                value={formData.risk_tolerance}
                onValueChange={(value) => setFormData(prev => ({ ...prev, risk_tolerance: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Investment Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Investment Types of Interest</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="luxury_flips"
                  checked={formData.interested_in_luxury_flips}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, interested_in_luxury_flips: checked as boolean }))
                  }
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="luxury_flips">
                    Luxury Property Flips
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    High-end property renovation and resale opportunities
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="luxury_funds"
                  checked={formData.interested_in_luxury_funds}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, interested_in_luxury_funds: checked as boolean }))
                  }
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="luxury_funds">
                    Luxury Real Estate Funds
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Diversified luxury real estate investment funds
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preferred Locations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Preferred Locations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Downtown Dubai',
                'Dubai Marina',
                'Business Bay',
                'Palm Jumeirah',
                'Emirates Hills',
                'Dubai Hills',
                'Jumeirah',
                'Al Barari',
                'DIFC',
                'Other'
              ].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={formData.preferred_locations.includes(location)}
                    onCheckedChange={(checked) => handleLocationToggle(location, checked as boolean)}
                  />
                  <Label
                    htmlFor={location}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Objectives */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Investment Objectives & Additional Information</h3>
            <div className="space-y-2">
              <Label htmlFor="investment_objectives">Primary Investment Objectives</Label>
              <Textarea
                id="investment_objectives"
                placeholder="Describe your investment goals, expected returns, and what you're looking to achieve..."
                className="min-h-[100px]"
                value={formData.investment_objectives}
                onChange={(e) => setFormData(prev => ({ ...prev, investment_objectives: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additional_notes">Additional Notes or Questions</Label>
              <Textarea
                id="additional_notes"
                placeholder="Any additional information you'd like to share or questions you have..."
                className="min-h-[80px]"
                value={formData.additional_notes}
                onChange={(e) => setFormData(prev => ({ ...prev, additional_notes: e.target.value }))}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Questionnaire
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  if (standalone) {
    return (
      <div className="min-h-screen bg-gradient-elegant p-4">
        <div className="container mx-auto py-8">
          {questionnaire}
        </div>
      </div>
    );
  }

  return questionnaire;
}