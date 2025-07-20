import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ProjectTender, TenderSubmission, EvaluationCriteria } from '@/types/projectManagement';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Users, 
  Plus, 
  Eye, 
  Edit, 
  Award,
  Clock,
  CheckCircle,
  XCircle 
} from 'lucide-react';

// Mock data
const mockTenders: ProjectTender[] = [
  {
    id: 't1',
    project_id: 'proj-1',
    title: 'Main Construction Work',
    description: 'Complete renovation and construction for luxury apartment',
    category: 'construction',
    tender_type: 'selective',
    status: 'under_evaluation',
    issue_date: '2024-02-01',
    submission_deadline: '2024-02-28',
    estimated_value: 300000,
    evaluation_criteria: [
      {
        id: 'ec1',
        criterion: 'Technical Capability',
        weight: 40,
        scoring_method: 'numerical'
      },
      {
        id: 'ec2',
        criterion: 'Price Competitiveness',
        weight: 35,
        scoring_method: 'numerical'
      },
      {
        id: 'ec3',
        criterion: 'Timeline',
        weight: 15,
        scoring_method: 'numerical'
      },
      {
        id: 'ec4',
        criterion: 'Experience & References',
        weight: 10,
        scoring_method: 'numerical'
      }
    ],
    submissions: [
      {
        id: 'ts1',
        vendor_name: 'Elite Construction LLC',
        vendor_id: 'v1',
        submission_date: '2024-02-25',
        bid_amount: 285000,
        technical_score: 85,
        commercial_score: 90,
        total_score: 87,
        status: 'shortlisted',
        documents: ['proposal.pdf', 'portfolio.pdf'],
        evaluation_notes: 'Strong technical proposal with competitive pricing'
      },
      {
        id: 'ts2',
        vendor_name: 'Premium Builders',
        vendor_id: 'v2',
        submission_date: '2024-02-27',
        bid_amount: 295000,
        technical_score: 90,
        commercial_score: 85,
        total_score: 88,
        status: 'shortlisted',
        documents: ['technical_proposal.pdf', 'references.pdf'],
        evaluation_notes: 'Excellent technical capabilities, slightly higher price'
      },
      {
        id: 'ts3',
        vendor_name: 'Budget Construction Co',
        vendor_id: 'v3',
        submission_date: '2024-02-28',
        bid_amount: 250000,
        technical_score: 70,
        commercial_score: 95,
        total_score: 78,
        status: 'under_review',
        documents: ['basic_proposal.pdf'],
        evaluation_notes: 'Low price but concerns about technical capability'
      }
    ],
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-03-01T15:30:00Z'
  },
  {
    id: 't2',
    project_id: 'proj-1',
    title: 'Interior Design Services',
    description: 'Complete interior design and furnishing',
    category: 'design',
    tender_type: 'open',
    status: 'awarded',
    issue_date: '2024-01-15',
    submission_deadline: '2024-02-15',
    estimated_value: 75000,
    evaluation_criteria: [
      {
        id: 'ec5',
        criterion: 'Design Portfolio',
        weight: 50,
        scoring_method: 'numerical'
      },
      {
        id: 'ec6',
        criterion: 'Price',
        weight: 30,
        scoring_method: 'numerical'
      },
      {
        id: 'ec7',
        criterion: 'Timeline',
        weight: 20,
        scoring_method: 'numerical'
      }
    ],
    submissions: [
      {
        id: 'ts4',
        vendor_name: 'Luxury Interiors Studio',
        vendor_id: 'v4',
        submission_date: '2024-02-10',
        bid_amount: 68000,
        technical_score: 95,
        commercial_score: 85,
        total_score: 92,
        status: 'awarded',
        documents: ['design_portfolio.pdf', 'proposal.pdf'],
        evaluation_notes: 'Outstanding portfolio with innovative designs'
      }
    ],
    awarded_to: 'v4',
    contract_value: 68000,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-02-20T14:20:00Z'
  }
];

interface TenderManagementProps {
  projectId?: string;
}

export function TenderManagement({ projectId }: TenderManagementProps = {}) {
  const [tenders, setTenders] = useState<ProjectTender[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTender, setSelectedTender] = useState<ProjectTender | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (projectId) {
      // In a real implementation, fetch tenders from Supabase
      setTenders(mockTenders);
    } else {
      setTenders(mockTenders);
    }
    setLoading(false);
  }, [projectId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: ProjectTender['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'published': return 'bg-blue-500';
      case 'submitted': return 'bg-yellow-500';
      case 'under_evaluation': return 'bg-orange-500';
      case 'awarded': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSubmissionStatusColor = (status: TenderSubmission['status']) => {
    switch (status) {
      case 'submitted': return 'bg-blue-500';
      case 'under_review': return 'bg-yellow-500';
      case 'shortlisted': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'awarded': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: ProjectTender['category']) => {
    switch (category) {
      case 'construction': return '🏗️';
      case 'design': return '🎨';
      case 'consulting': return '💼';
      case 'supplies': return '📦';
      case 'services': return '🔧';
      default: return '📄';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCreateTender = () => {
    toast({
      title: "Tender Created",
      description: "New tender has been created and published.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleAwardTender = (tenderId: string, submissionId: string) => {
    setTenders(prev => 
      prev.map(tender => 
        tender.id === tenderId 
          ? {
              ...tender,
              status: 'awarded' as const,
              awarded_to: tender.submissions.find(s => s.id === submissionId)?.vendor_id,
              contract_value: tender.submissions.find(s => s.id === submissionId)?.bid_amount,
              submissions: tender.submissions.map(s => 
                s.id === submissionId 
                  ? { ...s, status: 'awarded' as const }
                  : { ...s, status: 'rejected' as const }
              )
            }
          : tender
      )
    );
    toast({
      title: "Tender Awarded",
      description: "Contract has been awarded to the selected vendor.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Tender Management</h3>
          <p className="text-muted-foreground">Manage project tenders and vendor selection</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="h-4 w-4 mr-2" />
              Create Tender
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Tender</DialogTitle>
              <DialogDescription>
                Create a new tender for vendor bidding
              </DialogDescription>
            </DialogHeader>
            <CreateTenderForm onSubmit={handleCreateTender} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tender Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Total Tenders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Tenders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {tenders.filter(t => ['published', 'submitted', 'under_evaluation'].includes(t.status)).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Awarded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {tenders.filter(t => t.status === 'awarded').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(tenders.reduce((sum, t) => sum + (t.contract_value || t.estimated_value), 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tenders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tenders">Active Tenders</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
        </TabsList>

        <TabsContent value="tenders" className="space-y-4">
          <div className="grid gap-4">
            {tenders.map((tender) => (
              <Card key={tender.id} className="hover-scale animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryIcon(tender.category)}</span>
                      <div>
                        <CardTitle className="text-lg">{tender.title}</CardTitle>
                        <CardDescription>{tender.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(tender.status)}>
                        {tender.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline">
                        {tender.tender_type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Category</div>
                      <div className="font-medium capitalize">{tender.category}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Estimated Value</div>
                      <div className="font-medium">{formatCurrency(tender.estimated_value)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Submissions</div>
                      <div className="font-medium">{tender.submissions.length} received</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Deadline</div>
                      <div className="font-medium">{new Date(tender.submission_deadline).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>Issued: {new Date(tender.issue_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{tender.submissions.length} submission{tender.submissions.length !== 1 ? 's' : ''}</span>
                    </div>
                    {tender.awarded_to && (
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Awarded</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTender(tender)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    {tender.status === 'under_evaluation' && tender.submissions.length > 0 && (
                      <Button size="sm" className="bg-primary">
                        <Award className="h-3 w-3 mr-1" />
                        Evaluate & Award
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Submissions</CardTitle>
              <CardDescription>Vendor submissions across all tenders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tenders.flatMap(tender => 
                  tender.submissions.map(submission => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{submission.vendor_name}</h4>
                          <Badge className={getSubmissionStatusColor(submission.status)}>
                            {submission.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Tender: {tender.title}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Submitted: {new Date(submission.submission_date).toLocaleDateString()}</span>
                          <span>Bid: {formatCurrency(submission.bid_amount)}</span>
                          {submission.total_score && (
                            <span>Score: {submission.total_score}/100</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                        {tender.status === 'under_evaluation' && submission.status === 'shortlisted' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleAwardTender(tender.id, submission.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Award className="h-3 w-3 mr-1" />
                            Award
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tender Evaluation</CardTitle>
              <CardDescription>Score and compare vendor submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {tenders.filter(t => t.status === 'under_evaluation' && t.submissions.length > 0).map(tender => (
                <div key={tender.id} className="space-y-4">
                  <h4 className="font-medium">{tender.title}</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Vendor</th>
                          <th className="text-left p-2">Bid Amount</th>
                          <th className="text-left p-2">Technical Score</th>
                          <th className="text-left p-2">Commercial Score</th>
                          <th className="text-left p-2">Total Score</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tender.submissions.map(submission => (
                          <tr key={submission.id} className="border-b">
                            <td className="p-2 font-medium">{submission.vendor_name}</td>
                            <td className="p-2">{formatCurrency(submission.bid_amount)}</td>
                            <td className="p-2">{submission.technical_score || '-'}</td>
                            <td className="p-2">{submission.commercial_score || '-'}</td>
                            <td className="p-2">
                              <span className={`font-medium ${
                                submission.total_score && submission.total_score >= 85 ? 'text-green-600' :
                                submission.total_score && submission.total_score >= 70 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {submission.total_score || '-'}
                              </span>
                            </td>
                            <td className="p-2">
                              <Badge className={getSubmissionStatusColor(submission.status)} variant="outline">
                                {submission.status.replace('_', ' ')}
                              </Badge>
                            </td>
                            <td className="p-2">
                              <div className="flex gap-1">
                                <Button variant="outline" size="sm">
                                  Score
                                </Button>
                                {submission.status === 'shortlisted' && (
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleAwardTender(tender.id, submission.id)}
                                  >
                                    Award
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="awards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Awarded Contracts</CardTitle>
              <CardDescription>Successfully awarded tenders and contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tenders.filter(t => t.status === 'awarded').map(tender => {
                  const awardedSubmission = tender.submissions.find(s => s.status === 'awarded');
                  return (
                    <div key={tender.id} className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium flex items-center gap-2">
                            <Award className="h-4 w-4 text-green-600" />
                            {tender.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Awarded to: {awardedSubmission?.vendor_name}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Contract Value: {formatCurrency(tender.contract_value || 0)}</span>
                            <span>Score: {awardedSubmission?.total_score}/100</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(tender.contract_value || 0)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Contract Value
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tender Detail Dialog */}
      {selectedTender && (
        <TenderDetailDialog
          tender={selectedTender}
          open={!!selectedTender}
          onClose={() => setSelectedTender(null)}
          onAward={handleAwardTender}
        />
      )}
    </div>
  );
}

function CreateTenderForm({ onSubmit }: { onSubmit: () => void }) {
  const [submissionDate, setSubmissionDate] = useState<Date>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tender Title</Label>
          <Input id="title" placeholder="Enter tender title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Describe the tender requirements..." />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tender-type">Tender Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="selective">Selective</SelectItem>
              <SelectItem value="negotiated">Negotiated</SelectItem>
              <SelectItem value="framework">Framework</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="estimated-value">Estimated Value (AED)</Label>
          <Input id="estimated-value" type="number" placeholder="300000" />
        </div>
        <div className="space-y-2">
          <Label>Submission Deadline</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !submissionDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {submissionDate ? format(submissionDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={submissionDate}
                onSelect={setSubmissionDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Evaluation Criteria</h4>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Criterion name" />
            <Input placeholder="Weight %" type="number" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Scoring method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="numerical">Numerical</SelectItem>
                <SelectItem value="pass_fail">Pass/Fail</SelectItem>
                <SelectItem value="ranking">Ranking</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-3 w-3 mr-1" />
            Add Criterion
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={onSubmit}>Publish Tender</Button>
      </div>
    </div>
  );
}

function TenderDetailDialog({
  tender,
  open,
  onClose,
  onAward
}: {
  tender: ProjectTender;
  open: boolean;
  onClose: () => void;
  onAward: (tenderId: string, submissionId: string) => void;
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
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tender.title}</DialogTitle>
          <DialogDescription>{tender.description}</DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="criteria">Evaluation Criteria</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tender Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium capitalize">{tender.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium capitalize">{tender.tender_type.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium capitalize">{tender.status.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Value:</span>
                    <span className="font-medium">{formatCurrency(tender.estimated_value)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issue Date:</span>
                    <span className="font-medium">{new Date(tender.issue_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Submission Deadline:</span>
                    <span className="font-medium">{new Date(tender.submission_deadline).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Submission Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Submissions:</span>
                    <span className="font-medium">{tender.submissions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Under Review:</span>
                    <span className="font-medium">{tender.submissions.filter(s => s.status === 'under_review').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shortlisted:</span>
                    <span className="font-medium">{tender.submissions.filter(s => s.status === 'shortlisted').length}</span>
                  </div>
                  {tender.awarded_to && (
                    <>
                      <div className="flex justify-between">
                        <span>Awarded To:</span>
                        <span className="font-medium">{tender.submissions.find(s => s.vendor_id === tender.awarded_to)?.vendor_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contract Value:</span>
                        <span className="font-medium text-green-600">{formatCurrency(tender.contract_value || 0)}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="criteria" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Evaluation Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tender.evaluation_criteria.map((criterion) => (
                    <div key={criterion.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{criterion.criterion}</h4>
                        <p className="text-sm text-muted-foreground">
                          Scoring: {criterion.scoring_method.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{criterion.weight}%</div>
                        <div className="text-xs text-muted-foreground">Weight</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-4">
            <div className="space-y-4">
              {tender.submissions.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{submission.vendor_name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-${submission.status === 'awarded' ? 'green' : submission.status === 'shortlisted' ? 'blue' : 'gray'}-500`}>
                          {submission.status.replace('_', ' ')}
                        </Badge>
                        {submission.total_score && (
                          <Badge variant="outline">
                            Score: {submission.total_score}/100
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Bid Amount</div>
                        <div className="font-medium">{formatCurrency(submission.bid_amount)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Technical Score</div>
                        <div className="font-medium">{submission.technical_score || 'Pending'}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Commercial Score</div>
                        <div className="font-medium">{submission.commercial_score || 'Pending'}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Submission Date</div>
                        <div className="font-medium">{new Date(submission.submission_date).toLocaleDateString()}</div>
                      </div>
                    </div>

                    {submission.evaluation_notes && (
                      <div>
                        <h4 className="font-medium mb-1">Evaluation Notes:</h4>
                        <p className="text-sm text-muted-foreground">{submission.evaluation_notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View Documents
                      </Button>
                      {tender.status === 'under_evaluation' && submission.status === 'shortlisted' && (
                        <Button 
                          size="sm" 
                          onClick={() => onAward(tender.id, submission.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          Award Contract
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}