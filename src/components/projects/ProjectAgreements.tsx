import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ProjectAgreement, ProjectRole, Commission } from '@/types/projects';
import { Plus, FileText, Users, DollarSign, Clock, Edit, Trash2, CheckCircle, FileSignature, Eye } from 'lucide-react';

// Mock data
const mockAgreements: ProjectAgreement[] = [
  {
    id: '1',
    project_id: 'proj-1',
    opportunity_id: 'opp-1',
    agreement_type: 'agent_commission',
    parties: {
      luxury_labs: true,
      counterparty: {
        user_id: 'agent-1',
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@example.com',
        role: 'real_estate_agent'
      }
    },
    terms: {
      role_description: 'Lead Real Estate Agent for Business Bay Project',
      responsibilities: [
        'Source and qualify potential properties',
        'Negotiate purchase terms',
        'Coordinate property inspections',
        'Handle closing documentation'
      ],
      deliverables: [
        'Signed purchase agreement',
        'Property inspection report',
        'Title verification',
        'Closing documentation'
      ],
      deadlines: [
        {
          description: 'Property under contract',
          due_date: '2024-03-15',
          penalty: 5000
        },
        {
          description: 'Closing completed',
          due_date: '2024-04-15',
          penalty: 10000
        }
      ],
      payment_structure: {
        type: 'commission',
        amount: 50000,
        currency: 'AED',
        payment_schedule: 'Upon successful closing',
        commission_rates: {
          purchase_commission: 2.5,
          sale_commission: 1.5,
          rental_commission: 5.0
        }
      },
      performance_metrics: [
        {
          metric: 'Time to closing',
          target: '60 days',
          measurement_method: 'Calendar days from contract execution'
        },
        {
          metric: 'Purchase price vs target',
          target: 'Within 5% of estimated purchase price',
          measurement_method: 'Final purchase price comparison'
        }
      ]
    },
    legal_terms: {
      jurisdiction: 'UAE',
      dispute_resolution: 'Dubai International Arbitration Centre',
      termination_clause: '30 days written notice',
      confidentiality: true
    },
    status: 'pending_signature',
    signatures: {
      luxury_labs_signed: false,
      counterparty_signed: false
    },
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  }
];

const mockProjectRoles: ProjectRole[] = [
  {
    id: '1',
    project_id: 'proj-1',
    user_id: 'agent-1',
    agreement_id: '1',
    role: 'Lead Agent',
    permissions: {
      view_project: true,
      edit_project: false,
      view_financials: true,
      edit_financials: false,
      view_documents: true,
      upload_documents: true,
      view_team: true,
      manage_team: false,
      approve_changes: false
    },
    access_level: 'limited',
    start_date: '2024-02-01',
    status: 'active',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  }
];

export function ProjectAgreements() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [agreements, setAgreements] = useState<ProjectAgreement[]>(mockAgreements);
  const [projectRoles, setProjectRoles] = useState<ProjectRole[]>(mockProjectRoles);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<ProjectAgreement | null>(null);

  const canManageAgreements = user?.role === 'administrator';

  const handleCreateAgreement = () => {
    toast({
      title: "Agreement Created",
      description: "New project agreement has been created and sent for signatures.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleSignAgreement = (id: string) => {
    setAgreements(prev => 
      prev.map(agreement => 
        agreement.id === id 
          ? {
              ...agreement,
              signatures: {
                ...agreement.signatures,
                luxury_labs_signed: true,
                luxury_labs_signed_date: new Date().toISOString(),
                luxury_labs_signer: user?.id || ''
              },
              status: agreement.signatures.counterparty_signed ? 'signed' as const : 'pending_signature' as const
            }
          : agreement
      )
    );
    toast({
      title: "Agreement Signed",
      description: "You have successfully signed the agreement.",
    });
  };

  const getStatusColor = (status: ProjectAgreement['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'pending_signature': return 'bg-yellow-500';
      case 'signed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-purple-500';
      case 'terminated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Agreements</h2>
          <p className="text-muted-foreground">Manage contracts and role assignments</p>
        </div>
        {canManageAgreements && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="hover-scale">
                <Plus className="h-4 w-4 mr-2" />
                New Agreement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Project Agreement</DialogTitle>
                <DialogDescription>
                  Define roles, responsibilities, and terms for project participants
                </DialogDescription>
              </DialogHeader>
              <CreateAgreementForm onSubmit={handleCreateAgreement} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="agreements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agreements">Agreements</TabsTrigger>
          <TabsTrigger value="roles">Project Roles</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>

        <TabsContent value="agreements" className="space-y-4">
          <div className="grid gap-6">
            {agreements.map((agreement) => (
              <Card key={agreement.id} className="hover-scale animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {agreement.terms.role_description}
                      </CardTitle>
                      <CardDescription>
                        {agreement.parties.counterparty.name} - {agreement.parties.counterparty.role}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(agreement.status)}>
                      {agreement.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Agreement Type</div>
                      <div className="font-medium">{agreement.agreement_type.replace('_', ' ')}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Payment</div>
                      <div className="font-medium">{formatCurrency(agreement.terms.payment_structure.amount)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Commission Rate</div>
                      <div className="font-medium">
                        {agreement.terms.payment_structure.commission_rates?.purchase_commission}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Deadlines</div>
                      <div className="font-medium">{agreement.terms.deadlines.length} milestones</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${agreement.signatures.luxury_labs_signed ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>Luxury Labs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${agreement.signatures.counterparty_signed ? 'text-green-500' : 'text-gray-300'}`} />
                      <span>{agreement.parties.counterparty.name}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAgreement(agreement)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    
                    {agreement.status === 'pending_signature' && !agreement.signatures.luxury_labs_signed && canManageAgreements && (
                      <Button
                        size="sm"
                        onClick={() => handleSignAgreement(agreement.id)}
                        className="bg-primary"
                      >
                        <FileSignature className="h-3 w-3 mr-1" />
                        Sign Agreement
                      </Button>
                    )}
                    
                    {canManageAgreements && (
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Project Team Roles
              </CardTitle>
              <CardDescription>
                Active role assignments and permissions for project team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectRoles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{role.role}</h4>
                      <p className="text-sm text-muted-foreground">User ID: {role.user_id}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="outline">{role.access_level}</Badge>
                        <span>Start: {new Date(role.start_date).toLocaleDateString()}</span>
                        <Badge className={role.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                          {role.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View Permissions
                      </Button>
                      {canManageAgreements && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit Role
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Commission Tracking
              </CardTitle>
              <CardDescription>
                Track earnings and commission payments for project participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No commissions calculated yet
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Agreement Detail Dialog */}
      {selectedAgreement && (
        <AgreementDetailDialog
          agreement={selectedAgreement}
          open={!!selectedAgreement}
          onClose={() => setSelectedAgreement(null)}
          canManage={canManageAgreements}
          onSign={() => handleSignAgreement(selectedAgreement.id)}
        />
      )}
    </div>
  );
}

function CreateAgreementForm({ onSubmit }: { onSubmit: () => void }) {
  const [agreementType, setAgreementType] = useState<string>('');

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="terms">Terms & Payment</TabsTrigger>
          <TabsTrigger value="legal">Legal Terms</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="agreement-type">Agreement Type</Label>
              <Select value={agreementType} onValueChange={setAgreementType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select agreement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent_commission">Agent Commission</SelectItem>
                  <SelectItem value="partner_contract">Partner Contract</SelectItem>
                  <SelectItem value="vendor_agreement">Vendor Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="counterparty">Counterparty</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent-1">Ahmed Al-Rashid (Real Estate Agent)</SelectItem>
                  <SelectItem value="partner-1">Construction Partner LLC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role-description">Role Description</Label>
            <Input id="role-description" placeholder="e.g., Lead Real Estate Agent" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities</Label>
            <Textarea id="responsibilities" placeholder="List key responsibilities..." />
          </div>
        </TabsContent>

        <TabsContent value="terms" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commission">Commission</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="milestone">Milestone-based</SelectItem>
                  <SelectItem value="hourly">Hourly Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (AED)</Label>
              <Input id="amount" type="number" placeholder="50000" />
            </div>
          </div>

          {agreementType === 'agent_commission' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchase-commission">Purchase Commission (%)</Label>
                <Input id="purchase-commission" type="number" step="0.1" placeholder="2.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sale-commission">Sale Commission (%)</Label>
                <Input id="sale-commission" type="number" step="0.1" placeholder="1.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rental-commission">Rental Commission (%)</Label>
                <Input id="rental-commission" type="number" step="0.1" placeholder="5.0" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="payment-schedule">Payment Schedule</Label>
            <Input id="payment-schedule" placeholder="e.g., Upon successful closing" />
          </div>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Input id="jurisdiction" placeholder="UAE" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="termination">Termination Clause</Label>
              <Input id="termination" placeholder="30 days written notice" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dispute">Dispute Resolution</Label>
            <Input id="dispute" placeholder="Dubai International Arbitration Centre" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="confidentiality" />
            <Label htmlFor="confidentiality">Include confidentiality clause</Label>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={onSubmit}>Create Agreement</Button>
      </div>
    </div>
  );
}

function AgreementDetailDialog({
  agreement,
  open,
  onClose,
  canManage,
  onSign
}: {
  agreement: ProjectAgreement;
  open: boolean;
  onClose: () => void;
  canManage: boolean;
  onSign: () => void;
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{agreement.terms.role_description}</DialogTitle>
          <DialogDescription>
            Agreement with {agreement.parties.counterparty.name}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="terms">Terms & Payment</TabsTrigger>
            <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
            <TabsTrigger value="legal">Legal Terms</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Counterparty</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium">{agreement.parties.counterparty.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">{agreement.parties.counterparty.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Role:</span>
                    <span className="font-medium">{agreement.parties.counterparty.role}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Signature Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Luxury Labs:</span>
                    <CheckCircle className={`h-5 w-5 ${agreement.signatures.luxury_labs_signed ? 'text-green-500' : 'text-gray-300'}`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{agreement.parties.counterparty.name}:</span>
                    <CheckCircle className={`h-5 w-5 ${agreement.signatures.counterparty_signed ? 'text-green-500' : 'text-gray-300'}`} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {agreement.terms.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Payment Type:</span>
                      <span className="font-medium">{agreement.terms.payment_structure.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">{formatCurrency(agreement.terms.payment_structure.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Schedule:</span>
                      <span className="font-medium">{agreement.terms.payment_structure.payment_schedule}</span>
                    </div>
                  </div>
                  
                  {agreement.terms.payment_structure.commission_rates && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Purchase Commission:</span>
                        <span className="font-medium">{agreement.terms.payment_structure.commission_rates.purchase_commission}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sale Commission:</span>
                        <span className="font-medium">{agreement.terms.payment_structure.commission_rates.sale_commission}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rental Commission:</span>
                        <span className="font-medium">{agreement.terms.payment_structure.commission_rates.rental_commission}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deadlines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agreement.terms.deadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{deadline.description}</h4>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(deadline.due_date).toLocaleDateString()}
                        </p>
                      </div>
                      {deadline.penalty && (
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Penalty</div>
                          <div className="font-medium text-red-600">{formatCurrency(deadline.penalty)}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Legal Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Jurisdiction:</span>
                    <span className="font-medium">{agreement.legal_terms.jurisdiction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dispute Resolution:</span>
                    <span className="font-medium">{agreement.legal_terms.dispute_resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Termination:</span>
                    <span className="font-medium">{agreement.legal_terms.termination_clause}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidentiality:</span>
                    <span className="font-medium">{agreement.legal_terms.confidentiality ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          {agreement.status === 'pending_signature' && !agreement.signatures.luxury_labs_signed && canManage && (
            <Button onClick={onSign} className="bg-primary">
              <FileSignature className="h-4 w-4 mr-2" />
              Sign Agreement
            </Button>
          )}
          
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}