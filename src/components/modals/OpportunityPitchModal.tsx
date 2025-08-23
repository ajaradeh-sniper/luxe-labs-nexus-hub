import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { 
  FileText, 
  Upload,
  Mail,
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Download,
  Eye
} from "lucide-react"

interface TargetInvestor {
  id: string
  name: string
  email: string
  type: string
  selected: boolean
}

interface OpportunityPitchModalProps {
  open: boolean
  onClose: () => void
  opportunityId?: string
  onSuccess?: () => void
}

export function OpportunityPitchModal({ open, onClose, opportunityId, onSuccess }: OpportunityPitchModalProps) {
  const [step, setStep] = useState<'opportunity' | 'pitch' | 'investors' | 'confirmation'>('opportunity')
  const [loading, setLoading] = useState(false)
  const [pitchDeck, setPitchDeck] = useState<File | null>(null)
  const [targetInvestors, setTargetInvestors] = useState<TargetInvestor[]>([
    { id: '1', name: 'John Investor', email: 'john@investor.com', type: 'Individual', selected: false },
    { id: '2', name: 'Investment Corp', email: 'deals@investcorp.com', type: 'Institutional', selected: false },
    { id: '3', name: 'Jane Capital', email: 'jane@capital.com', type: 'Accredited', selected: false },
    { id: '4', name: 'Fund Partners LLC', email: 'partners@fund.com', type: 'Fund Partner', selected: false }
  ])
  
  const [opportunityData, setOpportunityData] = useState({
    title: '',
    description: '',
    location: '',
    opportunityType: '',
    investmentRequired: '',
    expectedRoi: '',
    deadline: '',
    riskRating: 'medium',
    keyHighlights: '',
    marketAnalysis: '',
    financialProjections: '',
    exitStrategy: ''
  })

  const [pitchData, setPitchData] = useState({
    executiveSummary: '',
    investmentThesis: '',
    marketOpportunity: '',
    competitiveAdvantage: '',
    financialSummary: '',
    riskMitigation: '',
    callToAction: '',
    contactInfo: '',
    presentationDate: '',
    followUpDeadline: ''
  })
  
  const { user } = useAuth()
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf' || file.type.includes('presentation')) {
        setPitchDeck(file)
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or presentation file.",
          variant: "destructive"
        })
      }
    }
  }

  const handleInvestorSelect = (investorId: string, selected: boolean) => {
    setTargetInvestors(prev => 
      prev.map(investor => 
        investor.id === investorId ? { ...investor, selected } : investor
      )
    )
  }

  const handleCreateOpportunity = async () => {
    if (!user) return

    setLoading(true)
    try {
      // Create opportunity in database
      const { data: opportunity, error: opportunityError } = await supabase
        .from('opportunities')
        .insert({
          title: opportunityData.title,
          description: opportunityData.description,
          location: opportunityData.location,
          opportunity_type: opportunityData.opportunityType,
          investment_required: opportunityData.investmentRequired ? parseFloat(opportunityData.investmentRequired) : null,
          expected_roi: opportunityData.expectedRoi ? parseFloat(opportunityData.expectedRoi) : null,
          deadline: opportunityData.deadline || null,
          risk_rating: opportunityData.riskRating,
          status: 'evaluation',
          created_by: user.id,
          contact_info: {
            executiveSummary: pitchData.executiveSummary,
            investmentThesis: pitchData.investmentThesis,
            marketOpportunity: pitchData.marketOpportunity,
            competitiveAdvantage: pitchData.competitiveAdvantage,
            financialSummary: pitchData.financialSummary,
            riskMitigation: pitchData.riskMitigation,
            callToAction: pitchData.callToAction,
            contactInfo: pitchData.contactInfo
          }
        })
        .select()
        .single()

      if (opportunityError) throw opportunityError

      // Upload pitch deck if provided
      if (pitchDeck) {
        const fileExt = pitchDeck.name.split('.').pop()
        const fileName = `${opportunity.id}/pitch-deck.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(fileName, pitchDeck)

        if (uploadError) {
          console.error('Error uploading pitch deck:', uploadError)
        }
      }

      // Create contact interactions for selected investors
      const selectedInvestorsList = targetInvestors.filter(inv => inv.selected)
      
      for (const investor of selectedInvestorsList) {
        await supabase
          .from('contact_interactions')
          .insert({
            subject: `New Investment Opportunity: ${opportunityData.title}`,
            description: `Pitch deck sent for ${opportunityData.title}`,
            interaction_type: 'email',
            created_by: user.id,
            scheduled_at: new Date().toISOString()
          })
      }

      toast({
        title: "Opportunity Created & Pitch Sent",
        description: `Pitch deck sent to ${selectedInvestorsList.length} investors for "${opportunityData.title}".`,
      })

      onSuccess?.()
      onClose()
      resetForm()
    } catch (error) {
      console.error('Error creating opportunity:', error)
      toast({
        title: "Error",
        description: "Failed to create opportunity. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep('opportunity')
    setPitchDeck(null)
    setOpportunityData({
      title: '',
      description: '',
      location: '',
      opportunityType: '',
      investmentRequired: '',
      expectedRoi: '',
      deadline: '',
      riskRating: 'medium',
      keyHighlights: '',
      marketAnalysis: '',
      financialProjections: '',
      exitStrategy: ''
    })
    setPitchData({
      executiveSummary: '',
      investmentThesis: '',
      marketOpportunity: '',
      competitiveAdvantage: '',
      financialSummary: '',
      riskMitigation: '',
      callToAction: '',
      contactInfo: '',
      presentationDate: '',
      followUpDeadline: ''
    })
    setTargetInvestors(prev => prev.map(inv => ({ ...inv, selected: false })))
  }

  const handleNext = () => {
    if (step === 'opportunity') setStep('pitch')
    else if (step === 'pitch') setStep('investors')
    else if (step === 'investors') setStep('confirmation')
  }

  const handleBack = () => {
    if (step === 'pitch') setStep('opportunity')
    else if (step === 'investors') setStep('pitch')
    else if (step === 'confirmation') setStep('investors')
  }

  const isOpportunityValid = opportunityData.title.trim() && opportunityData.description.trim() && opportunityData.location.trim()
  const isPitchValid = pitchData.executiveSummary.trim() && pitchData.investmentThesis.trim()
  const selectedInvestorsCount = targetInvestors.filter(inv => inv.selected).length

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {step === 'opportunity' && "Create Investment Opportunity"}
            {step === 'pitch' && "Prepare Pitch Deck"}
            {step === 'investors' && "Select Target Investors"}
            {step === 'confirmation' && "Confirm & Send Pitch"}
          </DialogTitle>
        </DialogHeader>

        {step === 'opportunity' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Opportunity Title *</Label>
                <Input
                  id="title"
                  value={opportunityData.title}
                  onChange={(e) => setOpportunityData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Luxury Marina Towers Development"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={opportunityData.location}
                  onChange={(e) => setOpportunityData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Dubai Marina, UAE"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={opportunityData.description}
                onChange={(e) => setOpportunityData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the investment opportunity..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="opportunityType">Opportunity Type</Label>
                <Select value={opportunityData.opportunityType} onValueChange={(value) => setOpportunityData(prev => ({ ...prev, opportunityType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flip">Property Flip</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="fund">Investment Fund</SelectItem>
                    <SelectItem value="acquisition">Acquisition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="investmentRequired">Investment Required</Label>
                <Input
                  id="investmentRequired"
                  type="number"
                  value={opportunityData.investmentRequired}
                  onChange={(e) => setOpportunityData(prev => ({ ...prev, investmentRequired: e.target.value }))}
                  placeholder="2500000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedRoi">Expected ROI (%)</Label>
                <Input
                  id="expectedRoi"
                  type="number"
                  value={opportunityData.expectedRoi}
                  onChange={(e) => setOpportunityData(prev => ({ ...prev, expectedRoi: e.target.value }))}
                  placeholder="25"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deadline">Investment Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={opportunityData.deadline}
                  onChange={(e) => setOpportunityData(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="riskRating">Risk Rating</Label>
                <Select value={opportunityData.riskRating} onValueChange={(value) => setOpportunityData(prev => ({ ...prev, riskRating: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 'pitch' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pitchDeck">Upload Pitch Deck (PDF/PPT)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <div className="text-sm text-muted-foreground">
                          {pitchDeck ? pitchDeck.name : 'Click to upload or drag and drop'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          PDF, PPT, PPTX up to 10MB
                        </div>
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".pdf,.ppt,.pptx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button variant="outline" size="sm" asChild>
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </Label>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="executiveSummary">Executive Summary *</Label>
                <Textarea
                  id="executiveSummary"
                  value={pitchData.executiveSummary}
                  onChange={(e) => setPitchData(prev => ({ ...prev, executiveSummary: e.target.value }))}
                  placeholder="Brief overview of the opportunity and key value proposition..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentThesis">Investment Thesis *</Label>
                <Textarea
                  id="investmentThesis"
                  value={pitchData.investmentThesis}
                  onChange={(e) => setPitchData(prev => ({ ...prev, investmentThesis: e.target.value }))}
                  placeholder="Why this is a compelling investment opportunity..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marketOpportunity">Market Opportunity</Label>
                  <Textarea
                    id="marketOpportunity"
                    value={pitchData.marketOpportunity}
                    onChange={(e) => setPitchData(prev => ({ ...prev, marketOpportunity: e.target.value }))}
                    placeholder="Market size, trends, and growth potential..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competitiveAdvantage">Competitive Advantage</Label>
                  <Textarea
                    id="competitiveAdvantage"
                    value={pitchData.competitiveAdvantage}
                    onChange={(e) => setPitchData(prev => ({ ...prev, competitiveAdvantage: e.target.value }))}
                    placeholder="What sets this opportunity apart..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="financialSummary">Financial Summary</Label>
                  <Textarea
                    id="financialSummary"
                    value={pitchData.financialSummary}
                    onChange={(e) => setPitchData(prev => ({ ...prev, financialSummary: e.target.value }))}
                    placeholder="Key financial metrics and projections..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="riskMitigation">Risk Mitigation</Label>
                  <Textarea
                    id="riskMitigation"
                    value={pitchData.riskMitigation}
                    onChange={(e) => setPitchData(prev => ({ ...prev, riskMitigation: e.target.value }))}
                    placeholder="How risks are being managed..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="callToAction">Call to Action</Label>
                <Textarea
                  id="callToAction"
                  value={pitchData.callToAction}
                  onChange={(e) => setPitchData(prev => ({ ...prev, callToAction: e.target.value }))}
                  placeholder="Next steps for interested investors..."
                  rows={2}
                />
              </div>
            </div>
          </div>
        )}

        {step === 'investors' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Select Target Investors</h3>
              <p className="text-muted-foreground">Choose which investors should receive this pitch</p>
            </div>

            <div className="grid gap-4">
              {targetInvestors.map((investor) => (
                <Card key={investor.id} className="cursor-pointer" onClick={() => handleInvestorSelect(investor.id, !investor.selected)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={investor.selected}
                          onChange={() => handleInvestorSelect(investor.id, !investor.selected)}
                        />
                        <div>
                          <h4 className="font-medium">{investor.name}</h4>
                          <p className="text-sm text-muted-foreground">{investor.email}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{investor.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {selectedInvestorsCount} investor{selectedInvestorsCount !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {opportunityData.title}
                </CardTitle>
                <CardDescription>Investment Opportunity Summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{opportunityData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {opportunityData.investmentRequired ? `$${parseInt(opportunityData.investmentRequired).toLocaleString()}` : 'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {opportunityData.expectedRoi ? `${opportunityData.expectedRoi}% ROI` : 'ROI not specified'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {opportunityData.deadline ? new Date(opportunityData.deadline).toLocaleDateString() : 'No deadline'}
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Executive Summary</Label>
                  <p className="text-sm text-muted-foreground mt-1">{pitchData.executiveSummary}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {pitchDeck ? pitchDeck.name : 'No pitch deck attached'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedInvestorsCount} investor{selectedInvestorsCount !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Investors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {targetInvestors.filter(inv => inv.selected).map((investor) => (
                    <div key={investor.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{investor.name}</p>
                        <p className="text-sm text-muted-foreground">{investor.email}</p>
                      </div>
                      <Badge variant="outline">{investor.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <div>
            {step !== 'opportunity' && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step === 'opportunity' && (
              <Button onClick={handleNext} disabled={!isOpportunityValid}>
                Continue
              </Button>
            )}
            {step === 'pitch' && (
              <Button onClick={handleNext} disabled={!isPitchValid}>
                Continue
              </Button>
            )}
            {step === 'investors' && (
              <Button onClick={handleNext} disabled={selectedInvestorsCount === 0}>
                Continue
              </Button>
            )}
            {step === 'confirmation' && (
              <Button onClick={handleCreateOpportunity} disabled={loading}>
                {loading ? "Sending..." : "Create & Send Pitch"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}