import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, MapPin, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const leadSchema = z.object({
  source: z.string().min(1, 'Source is required'),
  area: z.string().min(1, 'Area is required'),
  address: z.string().optional(),
  property_type: z.enum(['apartment', 'villa', 'townhouse', 'commercial', 'land']),
  size_sqm: z.number().min(1, 'Size is required'),
  asking_price: z.number().min(1, 'Asking price is required'),
  estimated_budget: z.number().min(1, 'Estimated budget is required'),
  description: z.string().optional(),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_email: z.string().email('Valid email is required'),
  contact_phone: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadIntakeFormProps {
  onSuccess?: (leadId: string) => void;
}

export function LeadIntakeForm({ onSuccess }: LeadIntakeFormProps) {
  const [loading, setLoading] = useState(false);
  const [qualificationResult, setQualificationResult] = useState<{
    status: 'qualified' | 'needs_review' | 'rejected';
    reasons: string[];
    estimated_roi?: number;
  } | null>(null);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      source: '',
      area: '',
      property_type: 'apartment' as const,
      size_sqm: 0,
      asking_price: 0,
      estimated_budget: 0,
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      description: '',
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setLoading(true);
    try {
      // Auto-qualify the lead based on basic criteria
      const qualification = qualifyLead(data);
      setQualificationResult(qualification);

      // Insert lead into database
      const { data: leadData, error } = await supabase
        .from('ll_leads')
        .insert({
          source: data.source,
          area: data.area,
          property_type: data.property_type,
          size_sqm: data.size_sqm,
          asking_price: data.asking_price,
          estimated_budget: data.estimated_budget,
          status: qualification.status === 'qualified' ? 'qualified' : 'new',
          qualification_notes: qualification.reasons.join('; '),
        })
        .select()
        .single();

      if (error) throw error;

      // Note: Event logging would be implemented with custom function
      console.log('Lead created:', leadData.id, {
        source: data.source,
        area: data.area,
        auto_qualified: qualification.status === 'qualified'
      });

      toast({
        title: 'Lead Created Successfully',
        description: `Lead has been ${qualification.status === 'qualified' ? 'auto-qualified' : 'submitted for review'}`,
      });

      form.reset();
      onSuccess?.(leadData.id);

    } catch (error) {
      console.error('Error creating lead:', error);
      toast({
        title: 'Error',
        description: 'Failed to create lead. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const qualifyLead = (data: LeadFormData) => {
    const reasons: string[] = [];
    let score = 0;

    // Size criteria (apartments: 80-300 sqm, villas: 200-600 sqm)
    if (data.property_type === 'apartment' && data.size_sqm >= 80 && data.size_sqm <= 300) {
      score += 20;
      reasons.push('Good size for apartment renovation');
    } else if (data.property_type === 'villa' && data.size_sqm >= 200 && data.size_sqm <= 600) {
      score += 20;
      reasons.push('Good size for villa renovation');
    } else {
      reasons.push('Size may be challenging for renovation');
    }

    // Budget to asking price ratio (should be 10-25% of asking price)
    const budgetRatio = (data.estimated_budget / data.asking_price) * 100;
    if (budgetRatio >= 10 && budgetRatio <= 25) {
      score += 25;
      reasons.push('Renovation budget is appropriate');
    } else if (budgetRatio < 10) {
      reasons.push('Budget may be too low for meaningful renovation');
    } else {
      reasons.push('Budget seems high - verify scope');
    }

    // Premium areas get higher score
    const premiumAreas = ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Emirates Hills', 'Dubai Hills'];
    if (premiumAreas.some(area => data.area.toLowerCase().includes(area.toLowerCase()))) {
      score += 25;
      reasons.push('Premium location with good resale potential');
    } else {
      score += 10;
      reasons.push('Standard area - verify market conditions');
    }

    // Minimum investment threshold
    if (data.asking_price >= 800000) {
      score += 20;
      reasons.push('Meets minimum investment threshold');
    } else {
      reasons.push('Below minimum investment threshold');
    }

    // ROI estimation (simplified)
    const estimatedRoi = ((data.asking_price * 1.3) - (data.asking_price + data.estimated_budget)) / (data.asking_price + data.estimated_budget) * 100;

    if (score >= 70) {
      return {
        status: 'qualified' as const,
        reasons: [...reasons, `Estimated ROI: ${estimatedRoi.toFixed(1)}%`],
        estimated_roi: estimatedRoi
      };
    } else if (score >= 50) {
      return {
        status: 'needs_review' as const,
        reasons: [...reasons, 'Requires manual review'],
        estimated_roi: estimatedRoi
      };
    } else {
      return {
        status: 'rejected' as const,
        reasons: [...reasons, 'Does not meet qualification criteria'],
        estimated_roi: estimatedRoi
      };
    }
  };

  const getQualificationIcon = () => {
    if (!qualificationResult) return null;
    
    switch (qualificationResult.status) {
      case 'qualified':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'needs_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getQualificationColor = () => {
    if (!qualificationResult) return '';
    
    switch (qualificationResult.status) {
      case 'qualified':
        return 'bg-green-50 border-green-200';
      case 'needs_review':
        return 'bg-yellow-50 border-yellow-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Lead Intake & Auto-Qualification
          </CardTitle>
          <CardDescription>
            Submit a new property opportunity for automatic qualification and review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Source */}
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select lead source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Agent Referral">Agent Referral</SelectItem>
                          <SelectItem value="Direct Contact">Direct Contact</SelectItem>
                          <SelectItem value="Social Media">Social Media</SelectItem>
                          <SelectItem value="Partner Network">Partner Network</SelectItem>
                          <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Area */}
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dubai Marina">Dubai Marina</SelectItem>
                          <SelectItem value="Downtown Dubai">Downtown Dubai</SelectItem>
                          <SelectItem value="Palm Jumeirah">Palm Jumeirah</SelectItem>
                          <SelectItem value="Business Bay">Business Bay</SelectItem>
                          <SelectItem value="JVC">JVC</SelectItem>
                          <SelectItem value="Dubai Hills">Dubai Hills</SelectItem>
                          <SelectItem value="Emirates Hills">Emirates Hills</SelectItem>
                          <SelectItem value="Jumeirah">Jumeirah</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Property Type */}
                <FormField
                  control={form.control}
                  name="property_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Size */}
                <FormField
                  control={form.control}
                  name="size_sqm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size (sqm)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="120" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Asking Price */}
                <FormField
                  control={form.control}
                  name="asking_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asking Price (AED)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="1200000" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Estimated Budget */}
                <FormField
                  control={form.control}
                  name="estimated_budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Renovation Budget (AED)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="150000" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormDescription>
                        Estimated cost for renovation and improvements
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="contact_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Ahmed Al Mansouri" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="ahmed@example.ae" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+971 50 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Property condition, special requirements, timeline constraints, etc."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Processing...' : 'Submit Lead for Qualification'}
                <DollarSign className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Qualification Result */}
      {qualificationResult && (
        <Card className={`${getQualificationColor()}`}>
          <CardHeader>
            <CardTitle className="flex items-center">
              {getQualificationIcon()}
              <span className="ml-2">Auto-Qualification Result</span>
              <Badge 
                variant="secondary" 
                className={`ml-auto ${
                  qualificationResult.status === 'qualified' ? 'bg-green-100 text-green-800' :
                  qualificationResult.status === 'needs_review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}
              >
                {qualificationResult.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {qualificationResult.reasons.map((reason, index) => (
                <p key={index} className="text-sm">{reason}</p>
              ))}
              {qualificationResult.status === 'qualified' && (
                <div className="mt-4 p-3 bg-white rounded border">
                  <p className="text-sm font-medium">
                    ✅ Lead has been automatically qualified and added to the pipeline
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}