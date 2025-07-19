import { useState } from "react"
import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  MapPin, 
  Phone, 
  Mail,
  MessageSquare,
  Clock,
  Send,
  Building,
  Users,
  TrendingUp
} from "lucide-react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Building,
      title: "Office Address",
      details: ["DMCC Business Centre", "Level 1, Jewellery & Gemplex 3", "Dubai Multi Commodities Centre", "Dubai, UAE"]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+971 4 123 4567", "+971 50 123 4567", "WhatsApp Available"]
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: ["info@luxurylabs.ae", "investments@luxurylabs.ae", "support@luxurylabs.ae"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Sunday - Thursday: 9:00 AM - 6:00 PM", "Friday: 9:00 AM - 1:00 PM", "Saturday: Closed"]
    }
  ]

  const services = [
    { value: 'investment-flip', label: 'Property Investment Flip' },
    { value: 'hnwi-renovation', label: 'HNWI Concierge Renovation' },
    { value: 'investment-opportunity', label: 'Investment Opportunity' },
    { value: 'consultation', label: 'General Consultation' },
    { value: 'other', label: 'Other Services' }
  ]

  const budgetRanges = [
    { value: '100k-500k', label: '$100K - $500K' },
    { value: '500k-1m', label: '$500K - $1M' },
    { value: '1m-5m', label: '$1M - $5M' },
    { value: '5m-plus', label: '$5M+' },
    { value: 'undisclosed', label: 'Prefer not to say' }
  ]

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your luxury property journey? Get in touch with our expert team 
            for personalized consultation and investment opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
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
                      <Input
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
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
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Service Interest *</label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
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
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
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
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
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

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="w-10 h-10 bg-gradient-luxury rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-background" />
                      </div>
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Quick Actions */}
            <Card className="bg-gradient-luxury text-background">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-background text-foreground hover:bg-background/90"
                    onClick={() => window.location.href = '/projects'}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Investment Opportunities
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-background text-foreground hover:bg-background/90"
                    onClick={() => {
                      const messageElement = document.querySelector('textarea[placeholder*="Tell us about your project"]') as HTMLTextAreaElement;
                      if (messageElement) {
                        messageElement.value = 'I would like to schedule a consultation to discuss my investment needs.';
                        messageElement.focus();
                      }
                    }}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Schedule Consultation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full bg-background text-foreground hover:bg-background/90"
                    onClick={() => window.open('https://wa.me/971501234567', '_blank')}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    WhatsApp Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Find Our Office
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Interactive map coming soon</p>
                <p className="text-sm text-muted-foreground mt-1">
                  DMCC Business Centre, Jewellery & Gemplex 3, Dubai
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Contact