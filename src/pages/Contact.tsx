import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, Building, Users, TrendingUp, Search, FileText, HelpCircle } from "lucide-react";
import dubaiMarinaImage from "@/assets/dubai-marina-luxury.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const Contact = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const faqData = [{
    category: "Investment Opportunities",
    items: [{
      question: "What types of investment opportunities does Luxury Labs offer?",
      answer: "We offer three main investment models: Co-Investment (join transformation projects with other investors), Fund Investment (diversified portfolio for long-term growth including flips to sell and rent), and HNWI Concierge (personalized luxury property renovation services)."
    }, {
      question: "What is the minimum investment amount?",
      answer: "Investment minimums vary by opportunity type. Co-investment projects typically start from $100K, while our diversified fund has a minimum of $500K. HNWI concierge services are customized based on project scope."
    }, {
      question: "What returns can I expect from Dubai property investments?",
      answer: "Historical returns vary, but Dubai luxury properties have shown strong performance. Our transformation projects typically target 20-35% returns, while our diversified fund aims for steady long-term growth through both capital appreciation and rental yields."
    }]
  }, {
    category: "Services & Process",
    items: [{
      question: "What areas of Dubai do you focus on?",
      answer: "We specialize in premium locations including Emirates Hills, Palm Jumeirah, Dubai Hills, Jumeirah Golf Estates, Jumeirah Islands, Al Barari, and other luxury communities known for high-end villa properties."
    }, {
      question: "How long does a typical villa transformation take?",
      answer: "Project timelines vary based on scope, but most villa transformations take 4-8 months from start to finish. We provide detailed project timelines during the consultation phase and keep investors updated throughout the process."
    }, {
      question: "Do you handle all aspects of the renovation process?",
      answer: "Yes, we provide end-to-end services including design, permits, construction management, quality control, and final staging. Our team handles everything so you can focus on the investment opportunity."
    }]
  }, {
    category: "Getting Started",
    items: [{
      question: "How do I get started with Luxury Labs?",
      answer: "Start by filling out our contact form or booking a consultation call. We'll discuss your investment goals, budget, and preferences to recommend the best opportunities for your portfolio."
    }, {
      question: "What documents do I need to invest?",
      answer: "Required documentation typically includes proof of funds, identification, and investment agreements. Our team will guide you through the complete documentation process for each specific opportunity."
    }, {
      question: "Can international investors participate?",
      answer: "Yes, we welcome international investors. Dubai's property market is open to foreign investment, and we assist with the legal and regulatory requirements for international clients."
    }]
  }, {
    category: "Market & Strategy",
    items: [{
      question: "Why focus on Dubai's luxury property market?",
      answer: "Dubai offers unique advantages: no property taxes, strong rental yields, growing expat population, world-class infrastructure, and government initiatives supporting real estate growth. The luxury segment has shown particular resilience and growth potential."
    }, {
      question: "How do you select properties for transformation?",
      answer: "Our selection criteria include location desirability, transformation potential, market demand analysis, and projected returns. We use data-driven analysis combined with local market expertise to identify the best opportunities."
    }]
  }];
  const filteredFAQs = faqData.map(category => ({
    ...category,
    items: category.items.filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase()) || category.category.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(category => category.items.length > 0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Service Interest:</strong> ${formData.service}</p>
        <p><strong>Budget Range:</strong> ${formData.budget || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `;
      const {
        error
      } = await supabase.functions.invoke('send-email', {
        body: {
          to: 'info@luxurylabs.ae',
          subject: `New Contact Form Submission from ${formData.name}`,
          html: emailHtml,
          reply_to: formData.email
        }
      });
      if (error) throw error;
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We\'ll get back to you within 24 hours.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again or contact us directly.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const services = [{
    value: 'investment-flip',
    label: 'Property Investment Flip'
  }, {
    value: 'hnwi-renovation',
    label: 'HNWI Concierge Renovation'
  }, {
    value: 'investment-opportunity',
    label: 'Investment Opportunity'
  }, {
    value: 'consultation',
    label: 'General Consultation'
  }, {
    value: 'other',
    label: 'Other Services'
  }];
  const budgetRanges = [{
    value: '100k-500k',
    label: '$100K - $500K'
  }, {
    value: '500k-1m',
    label: '$500K - $1M'
  }, {
    value: '1m-5m',
    label: '$1M - $5M'
  }, {
    value: '5m-plus',
    label: '$5M+'
  }, {
    value: 'undisclosed',
    label: 'Prefer not to say'
  }];
  return <>
      <Helmet>
        <title>Contact Luxury Labs | Dubai Villa Investment & Renovation Services</title>
        <meta name="description" content="Connect with Luxury Labs for investor opportunities, villa flipping services, or Dubai luxury property consultations. Start your transformation today." />
        <meta name="keywords" content="Contact Luxury Labs, Dubai property consultation, villa investment Dubai, luxury property services, real estate contact" />
        <meta property="og:title" content="Contact Luxury Labs | Dubai Villa Investment & Renovation Services" />
        <meta property="og:description" content="Connect with Luxury Labs for investor opportunities, villa flipping services, or Dubai luxury property consultations. Start your transformation today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luxurylabs.ae/contact" />
        <meta name="twitter:title" content="Contact Luxury Labs | Dubai Villa Investment & Renovation Services" />
        <meta name="twitter:description" content="Connect with Luxury Labs for investor opportunities, villa flipping services, or Dubai luxury property consultations. Start your transformation today." />
        <link rel="canonical" href="https://luxurylabs.ae/contact" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
      </Helmet>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${dubaiMarinaImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        
        <div className="relative container mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-playfair">Contact Us</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Ready to start your luxury property journey? Get in touch with our expert team 
            for personalized consultation and investment opportunities.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
          {/* Contact Form */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input placeholder="Enter your full name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email Address *</label>
                      <Input type="email" placeholder="Enter your email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number</label>
                      <Input placeholder="+971 50 123 4567" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Service Interest *</label>
                      <Select value={formData.service} onValueChange={value => handleInputChange('service', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map(service => <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>)}
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
                        {budgetRanges.map(range => <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <Textarea placeholder="Tell us about your project requirements, investment goals, or any questions you have..." rows={6} value={formData.message} onChange={e => handleInputChange('message', e.target.value)} required />
                  </div>

                <Button type="submit" variant="luxury" size="lg" className="w-full" disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                </form>
              </CardContent>
            </Card>

            {/* Calendly Scheduling Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Schedule a Consultation
                </CardTitle>
                <p className="text-muted-foreground">
                  Book a time that works for you to discuss your investment goals and opportunities.
                </p>
              </CardHeader>
              <CardContent>
                <div className="calendly-inline-widget" data-url="https://calendly.com/ali-luxurylabs" style={{
                minWidth: '320px',
                height: '700px'
              }} />
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Address */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-10 h-10 bg-gradient-luxury rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-background" />
                  </div>
                  Office Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Luxury Labs Real Estate Transformation FZO</p>
                  <p className="text-sm text-muted-foreground">UAE - Dubai</p>
                  <p className="text-sm text-muted-foreground">United Arab Emirates</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" onClick={() => window.location.href = 'mailto:info@luxurylabs.ae'}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email us: info@luxurylabs.ae
                </Button>
                <Button className="w-full" variant="outline" onClick={() => window.location.href = 'tel:+971555565345'}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call us: +971 55 556 5345
                </Button>
                <Button className="w-full" variant="outline" onClick={() => {
                document.querySelector('.calendly-inline-widget')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
              }}>
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <p className="text-muted-foreground">
                  Find answers to common questions about our services and investment opportunities.
                </p>
                
                {/* Search Bar */}
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search FAQ, documentation, and articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  {filteredFAQs.length > 0 ? <div className="space-y-4">
                      {filteredFAQs.map((category, categoryIndex) => <div key={categoryIndex}>
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="h-4 w-4 text-primary" />
                            <h4 className="font-semibold text-sm text-primary">{category.category}</h4>
                          </div>
                          <Accordion type="single" collapsible className="w-full">
                            {category.items.map((item, itemIndex) => <AccordionItem key={itemIndex} value={`${categoryIndex}-${itemIndex}`}>
                                <AccordionTrigger className="text-left">
                                  {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-muted-foreground leading-relaxed">
                                    {item.answer}
                                  </p>
                                </AccordionContent>
                              </AccordionItem>)}
                          </Accordion>
                        </div>)}
                    </div> : <div className="text-center py-8">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try different keywords or browse all categories above
                      </p>
                    </div>}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        

        {/* Footer */}
        <footer className="bg-secondary text-secondary-foreground py-12 px-4 mt-16">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <img src="/lovable-uploads/341fb04c-ec6c-4a68-8851-829da0b5a18b.png" alt="Luxury Labs Logo" className="h-16 w-auto" />
                </div>
                <p className="text-secondary-foreground/80 font-montserrat text-sm">
                  Dubai's premier property investment and transformation platform.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-secondary-foreground font-playfair mb-4">Services</h4>
                <ul className="space-y-2 font-montserrat text-sm">
                  <li><a href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Investment Services</a></li>
                  <li><a href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Transformation Services</a></li>
                  <li><a href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Advisory Services</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-secondary-foreground font-playfair mb-4">Company</h4>
                <ul className="space-y-2 font-montserrat text-sm">
                  <li><a href="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="/partners" className="text-secondary-foreground/80 hover:text-primary transition-colors">Partners</a></li>
                  <li><a href="/contact" className="text-secondary-foreground/80 hover:text-primary transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-secondary-foreground font-playfair mb-4">Legal</h4>
                <ul className="space-y-2 font-montserrat text-sm">
                  <li><a href="/legal/legal-notice" className="text-secondary-foreground/80 hover:text-primary transition-colors">Legal Notice</a></li>
                  <li><a href="/legal/privacy-policy" className="text-secondary-foreground/80 hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="/legal/terms-of-service" className="text-secondary-foreground/80 hover:text-primary transition-colors">Terms of Service</a></li>
                  <li><a href="/legal/investment-disclaimer" className="text-secondary-foreground/80 hover:text-primary transition-colors">Investment Disclaimer</a></li>
                  <li><a href="/legal/cookie-policy" className="text-secondary-foreground/80 hover:text-primary transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center">
              <p className="text-secondary-foreground/60 font-montserrat text-sm">
                © 2025 Luxury Labs. All rights reserved. Licensed by RERA.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>;
};
export default Contact;