import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Camera,
  Shield,
  User,
  Phone,
  MapPin
} from 'lucide-react'

interface KYCVerificationModalProps {
  open: boolean
  onClose: () => void
  userId?: string
}

type KYCStep = 'identity' | 'address' | 'phone' | 'documents' | 'review'

interface KYCData {
  personalInfo: {
    fullName: string
    dateOfBirth: string
    nationality: string
    phoneNumber: string
  }
  address: {
    street: string
    city: string
    country: string
    postalCode: string
  }
  documents: {
    passportId: File | null
    visaResidence: File | null
    bankStatement: File | null
    proofOfAddress: File | null
  }
  verification: {
    phoneVerified: boolean
    identityVerified: boolean
    addressVerified: boolean
    documentsVerified: boolean
  }
}

export function KYCVerificationModal({ open, onClose, userId }: KYCVerificationModalProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<KYCStep>('identity')
  const [kycData, setKycData] = useState<KYCData>({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      nationality: '',
      phoneNumber: ''
    },
    address: {
      street: '',
      city: '',
      country: '',
      postalCode: ''
    },
    documents: {
      passportId: null,
      visaResidence: null,
      bankStatement: null,
      proofOfAddress: null
    },
    verification: {
      phoneVerified: false,
      identityVerified: false,
      addressVerified: false,
      documentsVerified: false
    }
  })

  const steps = [
    { key: 'identity', title: 'Identity', icon: User },
    { key: 'address', title: 'Address', icon: MapPin },
    { key: 'phone', title: 'Phone', icon: Phone },
    { key: 'documents', title: 'Documents', icon: FileText },
    { key: 'review', title: 'Review', icon: Shield }
  ]

  const currentStepIndex = steps.findIndex(step => step.key === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleFileUpload = (docType: keyof KYCData['documents'], file: File) => {
    setKycData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: file
      }
    }))
    toast({
      title: "Document Uploaded",
      description: `${docType.replace(/([A-Z])/g, ' $1').toLowerCase()} has been uploaded successfully.`
    })
  }

  const handleVerifyPhone = () => {
    // Mock phone verification
    setTimeout(() => {
      setKycData(prev => ({
        ...prev,
        verification: { ...prev.verification, phoneVerified: true }
      }))
      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully."
      })
    }, 2000)
  }

  const handleSubmitKYC = () => {
    // Mock KYC submission
    toast({
      title: "KYC Submitted",
      description: "Your KYC application has been submitted for review. You'll receive an update within 24-48 hours."
    })
    onClose()
  }

  const nextStep = () => {
    const nextIndex = Math.min(currentStepIndex + 1, steps.length - 1)
    setCurrentStep(steps[nextIndex].key as KYCStep)
  }

  const prevStep = () => {
    const prevIndex = Math.max(currentStepIndex - 1, 0)
    setCurrentStep(steps[prevIndex].key as KYCStep)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            KYC Verification
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
                <span className={`text-xs mt-1 ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 'identity' && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={kycData.personalInfo.fullName}
                      onChange={(e) => setKycData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                      }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={kycData.personalInfo.dateOfBirth}
                      onChange={(e) => setKycData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={kycData.personalInfo.nationality}
                      onChange={(e) => setKycData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, nationality: e.target.value }
                      }))}
                      placeholder="Enter your nationality"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={kycData.personalInfo.phoneNumber}
                      onChange={(e) => setKycData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phoneNumber: e.target.value }
                      }))}
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'address' && (
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={kycData.address.street}
                    onChange={(e) => setKycData(prev => ({
                      ...prev,
                      address: { ...prev.address, street: e.target.value }
                    }))}
                    placeholder="Enter your street address"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={kycData.address.city}
                      onChange={(e) => setKycData(prev => ({
                        ...prev,
                        address: { ...prev.address, city: e.target.value }
                      }))}
                      placeholder="Dubai"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={kycData.address.country}
                      onChange={(e) => setKycData(prev => ({
                        ...prev,
                        address: { ...prev.address, country: e.target.value }
                      }))}
                      placeholder="UAE"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={kycData.address.postalCode}
                      onChange={(e) => setKycData(prev => ({
                        ...prev,
                        address: { ...prev.address, postalCode: e.target.value }
                      }))}
                      placeholder="12345"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'phone' && (
            <Card>
              <CardHeader>
                <CardTitle>Phone Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{kycData.personalInfo.phoneNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {kycData.verification.phoneVerified ? 'Verified' : 'Click to verify your phone number'}
                    </p>
                  </div>
                  {kycData.verification.phoneVerified ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Button onClick={handleVerifyPhone}>
                      <Phone className="h-4 w-4 mr-2" />
                      Verify Phone
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 'documents' && (
            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'passportId', label: 'Passport/Emirates ID', required: true },
                  { key: 'visaResidence', label: 'Visa/Residence Permit', required: true },
                  { key: 'bankStatement', label: 'Bank Statement (3 months)', required: true },
                  { key: 'proofOfAddress', label: 'Proof of Address', required: false }
                ].map((doc) => (
                  <div key={doc.key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {doc.label}
                        {doc.required && <span className="text-red-500">*</span>}
                      </Label>
                      {kycData.documents[doc.key as keyof KYCData['documents']] ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      ) : (
                        <Badge variant="outline">Required</Badge>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleFileUpload(doc.key as keyof KYCData['documents'], file)
                        }
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {currentStep === 'review' && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Personal Information</h4>
                    <div className="text-sm space-y-1">
                      <p><span className="text-muted-foreground">Name:</span> {kycData.personalInfo.fullName}</p>
                      <p><span className="text-muted-foreground">DOB:</span> {kycData.personalInfo.dateOfBirth}</p>
                      <p><span className="text-muted-foreground">Nationality:</span> {kycData.personalInfo.nationality}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Verification Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {kycData.verification.phoneVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        )}
                        <span className="text-sm">Phone Verified</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {Object.values(kycData.documents).filter(Boolean).length} of 4 documents uploaded
                      </p>
                    </div>
                  </div>
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
            <Button onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmitKYC} className="bg-primary">
              Submit KYC Application
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}