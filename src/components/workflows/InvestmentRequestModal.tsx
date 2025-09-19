import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { 
  DollarSign, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Clock,
  TrendingUp,
  Building
} from 'lucide-react'

interface InvestmentRequestModalProps {
  open: boolean
  onClose: () => void
  opportunityId?: string
  opportunityTitle?: string
  minimumInvestment?: number
  expectedROI?: number
}

type InvestmentStep = 'details' | 'financial' | 'risk' | 'legal' | 'review'

interface InvestmentRequest {
  investmentAmount: number
  investmentType: 'full_cash' | 'financed' | 'partnership'
  timeline: string
  riskTolerance: 'low' | 'medium' | 'high'
  expectedReturn: number
  financialInfo: {
    annualIncome: number
    netWorth: number
    liquidAssets: number
    investmentExperience: string
  }
  legalAgreements: {
    termsAccepted: boolean
    riskDisclosureAccepted: boolean
    privacyPolicyAccepted: boolean
  }
  additionalNotes: string
}

export function InvestmentRequestModal({ 
  open, 
  onClose, 
  opportunityId, 
  opportunityTitle = "Luxury Villa Project",
  minimumInvestment = 500000,
  expectedROI = 25
}: InvestmentRequestModalProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<InvestmentStep>('details')
  const [investmentRequest, setInvestmentRequest] = useState<InvestmentRequest>({
    investmentAmount: minimumInvestment,
    investmentType: 'full_cash',
    timeline: '12',
    riskTolerance: 'medium',
    expectedReturn: expectedROI,
    financialInfo: {
      annualIncome: 0,
      netWorth: 0,
      liquidAssets: 0,
      investmentExperience: ''
    },
    legalAgreements: {
      termsAccepted: false,
      riskDisclosureAccepted: false,
      privacyPolicyAccepted: false
    },
    additionalNotes: ''
  })

  const steps = [
    { key: 'details', title: 'Investment Details', icon: DollarSign },
    { key: 'financial', title: 'Financial Info', icon: TrendingUp },
    { key: 'risk', title: 'Risk Assessment', icon: Shield },
    { key: 'legal', title: 'Legal Documents', icon: FileText },
    { key: 'review', title: 'Review & Submit', icon: CheckCircle }
  ]

  const currentStepIndex = steps.findIndex(step => step.key === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleSubmitRequest = () => {
    // Mock investment request submission
    toast({
      title: "Investment Request Submitted",
      description: `Your investment request for ${formatCurrency(investmentRequest.investmentAmount)} has been submitted for review. You'll receive an update within 2-3 business days.`
    })
    onClose()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const nextStep = () => {
    const nextIndex = Math.min(currentStepIndex + 1, steps.length - 1)
    setCurrentStep(steps[nextIndex].key as InvestmentStep)
  }

  const prevStep = () => {
    const prevIndex = Math.max(currentStepIndex - 1, 0)
    setCurrentStep(steps[prevIndex].key as InvestmentStep)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'details':
        return investmentRequest.investmentAmount >= minimumInvestment
      case 'financial':
        return investmentRequest.financialInfo.annualIncome > 0 && investmentRequest.financialInfo.netWorth > 0
      case 'risk':
        return investmentRequest.riskTolerance && investmentRequest.expectedReturn > 0
      case 'legal':
        return investmentRequest.legalAgreements.termsAccepted && 
               investmentRequest.legalAgreements.riskDisclosureAccepted &&
               investmentRequest.legalAgreements.privacyPolicyAccepted
      default:
        return true
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            Investment Request - {opportunityTitle}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex
            
            return (
              <div key={step.key} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-primary text-primary-foreground' :
                  isActive ? 'bg-primary/20 text-primary border-2 border-primary' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? <CheckCircle className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                </div>
                <span className={`text-xs mt-1 text-center ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 'details' && (
            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="investmentAmount">Investment Amount (AED)</Label>
                    <Input
                      id="investmentAmount"
                      type="number"
                      min={minimumInvestment}
                      value={investmentRequest.investmentAmount}
                      onChange={(e) => setInvestmentRequest(prev => ({
                        ...prev,
                        investmentAmount: Number(e.target.value)
                      }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum investment: {formatCurrency(minimumInvestment)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentType">Investment Type</Label>
                    <Select 
                      value={investmentRequest.investmentType}
                      onValueChange={(value: any) => setInvestmentRequest(prev => ({
                        ...prev,
                        investmentType: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_cash">Full Cash Investment</SelectItem>
                        <SelectItem value="financed">Financed Investment</SelectItem>
                        <SelectItem value="partnership">Partnership/Joint Venture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Expected Timeline (months)</Label>
                    <Select 
                      value={investmentRequest.timeline}
                      onValueChange={(value) => setInvestmentRequest(prev => ({
                        ...prev,
                        timeline: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedReturn">Expected Return (%)</Label>
                    <Input
                      id="expectedReturn"
                      type="number"
                      min="0"
                      max="100"
                      value={investmentRequest.expectedReturn}
                      onChange={(e) => setInvestmentRequest(prev => ({
                        ...prev,
                        expectedReturn: Number(e.target.value)
                      }))}
                    />
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Projected Returns</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Investment Amount:</span>
                      <p className="font-medium">{formatCurrency(investmentRequest.investmentAmount)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Projected Return:</span>
                      <p className="font-medium text-green-600">
                        {formatCurrency(investmentRequest.investmentAmount * (investmentRequest.expectedReturn / 100))}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'financial' && (
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome">Annual Income (AED)</Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={investmentRequest.financialInfo.annualIncome}
                      onChange={(e) => setInvestmentRequest(prev => ({
                        ...prev,
                        financialInfo: {
                          ...prev.financialInfo,
                          annualIncome: Number(e.target.value)
                        }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="netWorth">Net Worth (AED)</Label>
                    <Input
                      id="netWorth"
                      type="number"
                      value={investmentRequest.financialInfo.netWorth}
                      onChange={(e) => setInvestmentRequest(prev => ({
                        ...prev,
                        financialInfo: {
                          ...prev.financialInfo,
                          netWorth: Number(e.target.value)
                        }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="liquidAssets">Liquid Assets (AED)</Label>
                    <Input
                      id="liquidAssets"
                      type="number"
                      value={investmentRequest.financialInfo.liquidAssets}
                      onChange={(e) => setInvestmentRequest(prev => ({
                        ...prev,
                        financialInfo: {
                          ...prev.financialInfo,
                          liquidAssets: Number(e.target.value)
                        }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentExperience">Investment Experience</Label>
                    <Select 
                      value={investmentRequest.financialInfo.investmentExperience}
                      onValueChange={(value) => setInvestmentRequest(prev => ({
                        ...prev,
                        financialInfo: {
                          ...prev.financialInfo,
                          investmentExperience: value
                        }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                        <SelectItem value="professional">Professional Investor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'risk' && (
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risk Tolerance</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { key: 'low', label: 'Conservative', desc: 'Minimal risk, stable returns' },
                        { key: 'medium', label: 'Moderate', desc: 'Balanced risk and return' },
                        { key: 'high', label: 'Aggressive', desc: 'High risk, high potential return' }
                      ].map((option) => (
                        <div 
                          key={option.key}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            investmentRequest.riskTolerance === option.key 
                              ? 'border-primary bg-primary/5' 
                              : 'border-muted hover:border-primary/50'
                          }`}
                          onClick={() => setInvestmentRequest(prev => ({
                            ...prev,
                            riskTolerance: option.key as any
                          }))}
                        >
                          <h4 className="font-medium">{option.label}</h4>
                          <p className="text-xs text-muted-foreground">{option.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      Risk Disclosure
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Real estate investments carry inherent risks including market fluctuations, 
                      property depreciation, and liquidity constraints. Past performance does not 
                      guarantee future results.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'legal' && (
            <Card>
              <CardHeader>
                <CardTitle>Legal Documents & Agreements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      key: 'termsAccepted',
                      title: 'Terms & Conditions',
                      description: 'I have read and agree to the investment terms and conditions'
                    },
                    {
                      key: 'riskDisclosureAccepted',
                      title: 'Risk Disclosure Statement',
                      description: 'I understand and accept the risks associated with this investment'
                    },
                    {
                      key: 'privacyPolicyAccepted',
                      title: 'Privacy Policy',
                      description: 'I agree to the privacy policy and data processing terms'
                    }
                  ].map((agreement) => (
                    <div key={agreement.key} className="flex items-start space-x-3 p-4 border rounded-lg">
                      <Checkbox
                        id={agreement.key}
                        checked={investmentRequest.legalAgreements[agreement.key as keyof typeof investmentRequest.legalAgreements]}
                        onCheckedChange={(checked) => setInvestmentRequest(prev => ({
                          ...prev,
                          legalAgreements: {
                            ...prev.legalAgreements,
                            [agreement.key]: checked
                          }
                        }))}
                      />
                      <div className="flex-1">
                        <Label htmlFor={agreement.key} className="cursor-pointer">
                          {agreement.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {agreement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'review' && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Investment Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Investment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-medium">{formatCurrency(investmentRequest.investmentAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-medium">{investmentRequest.investmentType.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Timeline:</span>
                          <span className="font-medium">{investmentRequest.timeline} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expected Return:</span>
                          <span className="font-medium text-green-600">{investmentRequest.expectedReturn}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Risk Profile</h4>
                      <div className="text-sm">
                        <Badge className="mb-2">
                          {investmentRequest.riskTolerance} Risk Tolerance
                        </Badge>
                        <p className="text-muted-foreground">
                          Experience: {investmentRequest.financialInfo.investmentExperience}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="additionalNotes"
                    value={investmentRequest.additionalNotes}
                    onChange={(e) => setInvestmentRequest(prev => ({
                      ...prev,
                      additionalNotes: e.target.value
                    }))}
                    placeholder="Any additional information or special requirements..."
                    rows={3}
                  />
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Next Steps
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your request will be reviewed within 2-3 business days</li>
                    <li>• You'll receive an email with the outcome and next steps</li>
                    <li>• If approved, legal documents will be prepared for signing</li>
                    <li>• Fund transfer instructions will be provided upon agreement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStepIndex === 0}
          >
            Previous
          </Button>
          
          {currentStepIndex < steps.length - 1 ? (
            <Button 
              onClick={nextStep}
              disabled={!canProceed()}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmitRequest} 
              className="bg-primary"
              disabled={!canProceed()}
            >
              Submit Investment Request
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}