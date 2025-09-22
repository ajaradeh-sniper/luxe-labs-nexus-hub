import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Send, X } from 'lucide-react';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  open,
  onOpenChange
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const services = [
    { value: 'investment-flip', label: 'Property Investment Flip' },
    { value: 'hnwi-renovation', label: 'HNWI Concierge Renovation' },
    { value: 'investment-opportunity', label: 'Investment Opportunity' },
    { value: 'consultation', label: 'General Consultation' },
    { value: 'other', label: 'Other Services' }
  ];

  const budgetRanges = [
    { value: '100k-500k', label: '$100K - $500K' },
    { value: '500k-1m', label: '$500K - $1M' },
    { value: '1m-5m', label: '$1M - $5M' },
    { value: '5m-plus', label: '$5M+' },
    { value: 'undisclosed', label: 'Prefer not to say' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
              <MessageSquare className="h-6 w-6 text-primary" />
              Contact Luxury Labs
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            Ready to start your luxury property journey? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </DialogHeader>
        
        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name *</label>
                    <Input 
                      placeholder="Enter your full name" 
                      value={formData.name} 
                      onChange={e => handleInputChange('name', e.target.value)} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address *</label>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.email} 
                      onChange={e => handleInputChange('email', e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input 
                      placeholder="+971 50 123 4567" 
                      value={formData.phone} 
                      onChange={e => handleInputChange('phone', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Service Interest *</label>
                    <Select value={formData.service} onValueChange={value => handleInputChange('service', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map(service => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Investment Budget</label>
                  <Select value={formData.budget} onValueChange={value => handleInputChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map(range => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message *</label>
                  <Textarea 
                    placeholder="Tell us about your project requirements, investment goals, or any questions you have..." 
                    rows={4} 
                    value={formData.message} 
                    onChange={e => handleInputChange('message', e.target.value)} 
                    required 
                  />
                </div>

                <Button type="submit" variant="luxury" size="lg" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};