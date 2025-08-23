import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { 
  TrendingUp, 
  DollarSign,
  Mail,
  Phone,
  Building,
  FileText,
  Shield,
  User
} from "lucide-react"

interface InvestorType {
  id: string
  name: string
  description: string
  minimumInvestment: string
  privileges: string[]
  accessLevel: string
}

const INVESTOR_TYPES: InvestorType[] = [
  {
    id: 'individual',
    name: 'Individual Investor',
    description: 'Private individuals seeking real estate investment opportunities',
    minimumInvestment: '$25,000',
    privileges: [
      'Access to investment opportunities',
      'Quarterly performance reports',
      'Investor portal access',
      'Annual investor meetings'
    ],
    accessLevel: 'Standard'
  },
  {
    id: 'institutional',
    name: 'Institutional Investor',
    description: 'Banks, insurance companies, pension funds, and other institutions',
    minimumInvestment: '$500,000',
    privileges: [
      'Priority access to deals',
      'Monthly detailed reports',
      'Direct communication channel',
      'Custom investment structures',
      'Board representation options'
    ],
    accessLevel: 'Premium'
  },
  {
    id: 'accredited',
    name: 'Accredited Investor',
    description: 'High net worth individuals meeting SEC accreditation requirements',
    minimumInvestment: '$100,000',
    privileges: [
      'Access to private placements',
      'Advanced due diligence materials',
      'Bi-weekly updates',
      'Priority customer support',
      'Tax optimization guidance'
    ],
    accessLevel: 'Enhanced'
  },
  {
    id: 'fund',
    name: 'Fund Partner',
    description: 'Strategic partners and fund co-managers',
    minimumInvestment: '$1,000,000',
    privileges: [
      'Fund management participation',
      'Deal sourcing collaboration',
      'Profit sharing agreements',
      'Strategic decision involvement',
      'White-label opportunities'
    ],
    accessLevel: 'Executive'
  }
]

interface InvestorManagementModalProps {
  open: boolean
  onClose: () => void
  mode: 'add' | 'invite'
  onSuccess?: () => void
}

export function InvestorManagementModal({ open, onClose, mode, onSuccess }: InvestorManagementModalProps) {
  const [step, setStep] = useState<'type' | 'details' | 'confirmation'>('type')
  const [selectedType, setSelectedType] = useState<InvestorType | null>(null)
  const [loading, setLoading] = useState(false)
  const [investorData, setInvestorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    investmentCapacity: '',
    riskTolerance: 'moderate',
    investmentFocus: '',
    accreditationStatus: false,
    notes: '',
    address: '',
    linkedIn: ''
  })
  
  const { user } = useAuth()
  const { toast } = useToast()

  const handleTypeSelect = (type: InvestorType) => {
    setSelectedType(type)
    setStep('details')
  }

  const handleCreateInvestor = async () => {
    if (!selectedType || !user) return

    setLoading(true)
    try {
      // Create investor profile
      const { data: investor, error: investorError } = await supabase
        .from('profiles')
        .insert({
          user_id: crypto.randomUUID(), // Temporary - will be replaced when user signs up
          name: `${investorData.firstName} ${investorData.lastName}`,
          role: 'investor'
        })
        .select()
        .single()

      if (investorError) throw investorError

      // Create contact entry
      const { error: contactError } = await supabase
        .from('contacts')
        .insert({
          name: `${investorData.firstName} ${investorData.lastName}`,
          email: investorData.email,
          phone: investorData.phone,
          company: investorData.company,
          contact_type: 'investor',
          status: 'active',
          notes: `Investor Type: ${selectedType.name}\nInvestment Capacity: ${investorData.investmentCapacity}\nRisk Tolerance: ${investorData.riskTolerance}\nAdditional Notes: ${investorData.notes}`,
          created_by: user.id
        })

      if (contactError) throw contactError

      if (mode === 'invite') {
        // Send invitation email (you would implement this with an edge function)
        toast({
          title: "Invitation Sent",
          description: `Investor invitation has been sent to ${investorData.email}`,
        })
      } else {
        toast({
          title: "Investor Added",
          description: `${investorData.firstName} ${investorData.lastName} has been added to the investor database.`,
        })
      }

      onSuccess?.()
      onClose()
      resetForm()
    } catch (error) {
      console.error('Error creating investor:', error)
      toast({
        title: "Error",
        description: "Failed to create investor. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep('type')
    setSelectedType(null)
    setInvestorData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      title: '',
      investmentCapacity: '',
      riskTolerance: 'moderate',
      investmentFocus: '',
      accreditationStatus: false,
      notes: '',
      address: '',
      linkedIn: ''
    })
  }

  const handleBack = () => {
    if (step === 'details') {
      setStep('type')
    } else if (step === 'confirmation') {
      setStep('details')
    }
  }

  const handleNext = () => {
    if (step === 'details') {
      setStep('confirmation')
    }
  }

  const isDetailsValid = investorData.firstName.trim() && investorData.lastName.trim() && investorData.email.trim()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {mode === 'add' ? 'Add New Investor' : 'Invite Investor'}
            {step === 'type' && " - Select Investor Type"}
            {step === 'details' && selectedType && ` - ${selectedType.name} Details`}
            {step === 'confirmation' && " - Confirm Details"}
          </DialogTitle>
        </DialogHeader>

        {step === 'type' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INVESTOR_TYPES.map((type) => (
              <Card 
                key={type.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleTypeSelect(type)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{type.accessLevel}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Min. Investment: {type.minimumInvestment}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Privileges & Access:</p>
                    <div className="space-y-1">
                      {type.privileges.map((privilege, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Shield className="h-3 w-3 text-green-500" />
                          <span>{privilege}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 'details' && selectedType && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={investorData.firstName}
                  onChange={(e) => setInvestorData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={investorData.lastName}
                  onChange={(e) => setInvestorData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={investorData.email}
                  onChange={(e) => setInvestorData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="investor@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={investorData.phone}
                  onChange={(e) => setInvestorData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  value={investorData.company}
                  onChange={(e) => setInvestorData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={investorData.title}
                  onChange={(e) => setInvestorData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Professional title"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investmentCapacity">Investment Capacity</Label>
                <Input
                  id="investmentCapacity"
                  value={investorData.investmentCapacity}
                  onChange={(e) => setInvestorData(prev => ({ ...prev, investmentCapacity: e.target.value }))}
                  placeholder="e.g., $100,000 - $500,000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <Select value={investorData.riskTolerance} onValueChange={(value) => setInvestorData(prev => ({ ...prev, riskTolerance: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="investmentFocus">Investment Focus Areas</Label>
              <Input
                id="investmentFocus"
                value={investorData.investmentFocus}
                onChange={(e) => setInvestorData(prev => ({ ...prev, investmentFocus: e.target.value }))}
                placeholder="e.g., Residential flips, Commercial development, Mixed-use"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={investorData.notes}
                onChange={(e) => setInvestorData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Investment preferences, special requirements, etc."
                rows={3}
              />
            </div>
          </div>
        )}

        {step === 'confirmation' && selectedType && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-green-500 text-white">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{investorData.firstName} {investorData.lastName}</CardTitle>
                      <CardDescription>{selectedType.name}</CardDescription>
                    </div>
                  </div>
                  <Badge>{selectedType.accessLevel} Access</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{investorData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{investorData.phone || 'Not provided'}</span>
                  </div>
                  {investorData.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{investorData.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{investorData.investmentCapacity || 'Not specified'}</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Investor Privileges</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {selectedType.privileges.map((privilege, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Shield className="h-3 w-3 text-green-500" />
                        <span>{privilege}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <div>
            {step !== 'type' && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step === 'details' && (
              <Button onClick={handleNext} disabled={!isDetailsValid}>
                Continue
              </Button>
            )}
            {step === 'confirmation' && (
              <Button onClick={handleCreateInvestor} disabled={loading}>
                {loading ? "Processing..." : mode === 'add' ? "Add Investor" : "Send Invitation"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}