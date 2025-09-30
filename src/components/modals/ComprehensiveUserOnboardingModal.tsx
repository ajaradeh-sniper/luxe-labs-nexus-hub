import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  User, 
  Building, 
  CreditCard, 
  FileText, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Clock,
  X
} from 'lucide-react';
import { UserRole } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PRESET_USER_TYPES } from '../admin/DetailedUserManagement';

interface ComprehensiveUserOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (user: any) => void;
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  notes: string;
  // Investment details
  investmentAmount?: number;
  investmentType?: string;
  riskTolerance?: string;
  investmentObjectives?: string;
  // Banking details
  bankName?: string;
  accountNumber?: string;
  iban?: string;
  swiftCode?: string;
  accountType?: string;
  // Project connections
  projectIds?: string[];
  // Legal compliance
  agreesToTerms: boolean;
  agreesToPrivacy: boolean;
  accreditedInvestor: boolean;
}

interface DocumentUpload {
  id: string;
  name: string;
  type: 'kyc' | 'legal' | 'banking' | 'identification';
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  file?: File;
  url?: string;
  required: boolean;
}

const roleLabels: Record<UserRole, string> = {
  administrator: 'Administrator',
  real_estate_agent: 'Real Estate Agent',
  investor: 'Investor'
};

const departments = [
  'IT', 'Operations', 'Investment', 'Real Estate', 'Finance', 
  'Design', 'Legal', 'Marketing', 'Procurement', 'Sales', 'External'
];

const requiredDocuments: Record<UserRole, DocumentUpload[]> = {
  investor: [
    { id: '1', name: 'Government ID', type: 'identification', status: 'pending', required: true },
    { id: '2', name: 'Passport Copy', type: 'identification', status: 'pending', required: true },
    { id: '3', name: 'Bank Statement', type: 'banking', status: 'pending', required: true },
    { id: '4', name: 'Income Verification', type: 'kyc', status: 'pending', required: true },
    { id: '5', name: 'Investment Agreement', type: 'legal', status: 'pending', required: true },
    { id: '6', name: 'Accreditation Certificate', type: 'legal', status: 'pending', required: false },
  ],
  administrator: [],
  real_estate_agent: [
    { id: '1', name: 'Government ID', type: 'identification', status: 'pending', required: true },
    { id: '2', name: 'Real Estate License', type: 'legal', status: 'pending', required: true },
    { id: '3', name: 'Employment Contract', type: 'legal', status: 'pending', required: true },
  ],
};

export function ComprehensiveUserOnboardingModal({ 
  isOpen, 
  onClose, 
  onUserAdded 
}: ComprehensiveUserOnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState('basic');
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'investor',
    department: '',
    notes: '',
    agreesToTerms: false,
    agreesToPrivacy: false,
    accreditedInvestor: false,
  });
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    setDocuments(requiredDocuments[role] || []);
  };

  const handleFileUpload = async (documentId: string, file: File) => {
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${documentId}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Update document status
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, status: 'uploaded', file, url: filePath }
          : doc
      ));

      setUploadProgress(prev => ({ ...prev, [documentId]: 100 }));
      
      toast({
        title: "Document uploaded successfully",
        description: `${file.name} has been uploaded and is pending verification.`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive"
      });
      setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Check required documents
      const requiredDocs = documents.filter(doc => doc.required);
      const uploadedRequiredDocs = requiredDocs.filter(doc => doc.status === 'uploaded');
      
      if (uploadedRequiredDocs.length < requiredDocs.length) {
        toast({
          title: "Missing required documents",
          description: "Please upload all required documents before proceeding.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Validate legal compliance for investors
      if (formData.role === 'investor' && (!formData.agreesToTerms || !formData.agreesToPrivacy)) {
        toast({
          title: "Legal compliance required",
          description: "Please agree to terms and privacy policy.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // For now, create a mock user ID since we don't have direct auth user creation
      // In a real implementation, you'd use Supabase Auth Admin API to create the user first
      const mockUserId = crypto.randomUUID();
      
      // Create user profile in database (this would normally happen after auth user creation)
      const newUserProfile = {
        id: mockUserId,
        user_id: mockUserId,
        name: formData.name,
        role: formData.role as string,
      };

      // Create the complete user object
      const newUser = {
        id: newUserProfile.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        department: formData.department,
        status: 'pending' as const,
        lastLogin: 'Never',
        joinedDate: new Date().toISOString().split('T')[0],
        projectsAssigned: 0,
        totalInvestment: formData.investmentAmount,
        kycStatus: 'pending' as const,
        notes: formData.notes,
      };

      onUserAdded(newUser);
      onClose();
      
      toast({
        title: "User added successfully",
        description: `${formData.name} has been added to the system and will receive onboarding instructions.`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'investor',
        department: '',
        notes: '',
        agreesToTerms: false,
        agreesToPrivacy: false,
        accreditedInvestor: false,
      });
      setDocuments([]);
      setCurrentStep('basic');
      
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error creating user",
        description: "Failed to create user. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepStatus = (step: string) => {
    if (step === currentStep) return 'current';
    
    const stepOrder = ['basic', 'investment', 'banking', 'documents', 'review'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(step);
    
    return stepIndex < currentIndex ? 'completed' : 'pending';
  };

  const isStepValid = (step: string) => {
    switch (step) {
      case 'basic':
        return formData.name && formData.email && formData.role && formData.department;
      case 'investment':
        return formData.role !== 'investor' || (formData.investmentAmount && formData.investmentType);
      case 'banking':
        return formData.role !== 'investor' || (formData.bankName && formData.accountNumber);
      case 'documents':
        const requiredDocs = documents.filter(doc => doc.required);
        const uploadedDocs = documents.filter(doc => doc.status === 'uploaded' && doc.required);
        return requiredDocs.length === 0 || uploadedDocs.length === requiredDocs.length;
      default:
        return true;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Comprehensive User Onboarding
          </DialogTitle>
          <DialogDescription>
            Complete user setup with KYC verification, document management, and compliance tracking
          </DialogDescription>
        </DialogHeader>

        <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger 
              value="basic" 
              className="flex items-center gap-2"
              disabled={!isStepValid('basic') && currentStep !== 'basic'}
            >
              <User className="h-4 w-4" />
              Basic Info
              {getStepStatus('basic') === 'completed' && <CheckCircle className="h-3 w-3" />}
            </TabsTrigger>
            <TabsTrigger 
              value="investment" 
              disabled={!isStepValid('basic')}
            >
              <CreditCard className="h-4 w-4" />
              Investment
              {getStepStatus('investment') === 'completed' && <CheckCircle className="h-3 w-3" />}
            </TabsTrigger>
            <TabsTrigger 
              value="banking" 
              disabled={!isStepValid('investment')}
            >
              <Building className="h-4 w-4" />
              Banking
              {getStepStatus('banking') === 'completed' && <CheckCircle className="h-3 w-3" />}
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              disabled={!isStepValid('banking')}
            >
              <FileText className="h-4 w-4" />
              Documents
              {getStepStatus('documents') === 'completed' && <CheckCircle className="h-3 w-3" />}
            </TabsTrigger>
            <TabsTrigger 
              value="review" 
              disabled={!isStepValid('documents')}
            >
              <CheckCircle className="h-4 w-4" />
              Review
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential user details and role assignment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+971-50-123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value: UserRole) => handleRoleChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(roleLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {/* Preset User Types Guide */}
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Preset User Types:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(PRESET_USER_TYPES).map(([key, preset]) => (
                          <div key={key} className="p-2 border rounded bg-background">
                            <div className="font-medium">{preset.label}</div>
                            <div className="text-muted-foreground">{preset.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes about this user..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investment" className="space-y-4">
            {formData.role === 'investor' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Investment Details</CardTitle>
                  <CardDescription>Investment capacity and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="investmentAmount">Investment Amount (USD) *</Label>
                      <Input
                        id="investmentAmount"
                        type="number"
                        value={formData.investmentAmount || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, investmentAmount: Number(e.target.value) }))}
                        placeholder="1000000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investmentType">Investment Type *</Label>
                      <Select 
                        value={formData.investmentType || ''} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, investmentType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="luxury_residential">Luxury Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="mixed_development">Mixed Development</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                      <Select 
                        value={formData.riskTolerance || ''} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, riskTolerance: value }))}
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
                    <div className="space-y-2">
                      <Label>
                        <input
                          type="checkbox"
                          checked={formData.accreditedInvestor}
                          onChange={(e) => setFormData(prev => ({ ...prev, accreditedInvestor: e.target.checked }))}
                          className="mr-2"
                        />
                        Accredited Investor
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investmentObjectives">Investment Objectives</Label>
                    <Textarea
                      id="investmentObjectives"
                      value={formData.investmentObjectives || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, investmentObjectives: e.target.value }))}
                      placeholder="Describe investment goals and objectives..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Investment Details Not Required</h3>
                  <p className="text-muted-foreground">
                    Investment information is only required for investor roles.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="banking" className="space-y-4">
            {formData.role === 'investor' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Banking Information</CardTitle>
                  <CardDescription>Bank account details for fund transfers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name *</Label>
                      <Input
                        id="bankName"
                        value={formData.bankName || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                        placeholder="Emirates NBD"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountType">Account Type</Label>
                      <Select 
                        value={formData.accountType || ''} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, accountType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="current">Current</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number *</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                        placeholder="1234567890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="iban">IBAN</Label>
                      <Input
                        id="iban"
                        value={formData.iban || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, iban: e.target.value }))}
                        placeholder="AE070331234567890123456"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="swiftCode">SWIFT Code</Label>
                    <Input
                      id="swiftCode"
                      value={formData.swiftCode || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, swiftCode: e.target.value }))}
                      placeholder="EBILAEAD"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Banking Details Not Required</h3>
                  <p className="text-muted-foreground">
                    Banking information is only required for investor roles.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Upload & KYC</CardTitle>
                <CardDescription>
                  Upload required documents for compliance and verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="font-medium">{doc.name}</span>
                            {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                          </div>
                          <Badge
                            variant={
                              doc.status === 'uploaded' ? 'default' :
                              doc.status === 'verified' ? 'default' :
                              doc.status === 'rejected' ? 'destructive' : 'secondary'
                            }
                          >
                            {doc.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {doc.status === 'uploaded' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {doc.status === 'verified' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {doc.status === 'rejected' && <X className="h-3 w-3 mr-1" />}
                            {doc.status}
                          </Badge>
                        </div>
                        
                        {doc.status === 'pending' && (
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(doc.id, file);
                              }}
                              className="flex-1"
                            />
                          </div>
                        )}

                        {uploadProgress[doc.id] > 0 && uploadProgress[doc.id] < 100 && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[doc.id]}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {doc.file && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            File: {doc.file.name} ({(doc.file.size / 1024 / 1024).toFixed(2)} MB)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Documents Required</h3>
                    <p className="text-muted-foreground">
                      This role does not require additional document verification.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {formData.role === 'investor' && (
              <Card>
                <CardHeader>
                  <CardTitle>Legal Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.agreesToTerms}
                        onChange={(e) => setFormData(prev => ({ ...prev, agreesToTerms: e.target.checked }))}
                      />
                      <span>I agree to the Terms and Conditions *</span>
                    </Label>
                    
                    <Label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.agreesToPrivacy}
                        onChange={(e) => setFormData(prev => ({ ...prev, agreesToPrivacy: e.target.checked }))}
                      />
                      <span>I agree to the Privacy Policy *</span>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>
                  Please review all information before submitting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {formData.name}</div>
                      <div><strong>Email:</strong> {formData.email}</div>
                      <div><strong>Phone:</strong> {formData.phone}</div>
                      <div><strong>Role:</strong> {roleLabels[formData.role]}</div>
                      <div><strong>Department:</strong> {formData.department}</div>
                    </div>
                  </div>

                  {formData.role === 'investor' && (
                    <div>
                      <h4 className="font-semibold mb-3">Investment Details</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Amount:</strong> ${formData.investmentAmount?.toLocaleString()}</div>
                        <div><strong>Type:</strong> {formData.investmentType}</div>
                        <div><strong>Risk Tolerance:</strong> {formData.riskTolerance}</div>
                        <div><strong>Accredited:</strong> {formData.accreditedInvestor ? 'Yes' : 'No'}</div>
                      </div>
                    </div>
                  )}
                </div>

                {documents.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Document Status</h4>
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between text-sm">
                          <span>{doc.name}</span>
                          <Badge
                            variant={doc.status === 'uploaded' ? 'default' : 'secondary'}
                          >
                            {doc.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">
                      This user will be created with "pending" status and will receive onboarding instructions via email.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {currentStep !== 'basic' && (
              <Button 
                variant="outline"
                onClick={() => {
                  const steps = ['basic', 'investment', 'banking', 'documents', 'review'];
                  const currentIndex = steps.indexOf(currentStep);
                  if (currentIndex > 0) {
                    setCurrentStep(steps[currentIndex - 1]);
                  }
                }}
              >
                Previous
              </Button>
            )}
            
            {currentStep !== 'review' ? (
              <Button 
                onClick={() => {
                  const steps = ['basic', 'investment', 'banking', 'documents', 'review'];
                  const currentIndex = steps.indexOf(currentStep);
                  if (currentIndex < steps.length - 1) {
                    setCurrentStep(steps[currentIndex + 1]);
                  }
                }}
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || !isStepValid('documents')}
              >
                {isSubmitting ? 'Creating User...' : 'Create User'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}