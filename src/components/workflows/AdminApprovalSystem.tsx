import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign,
  FileText,
  Shield,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApprovalRequest {
  id: string;
  type: 'investment' | 'kyc' | 'project' | 'withdrawal';
  title: string;
  description: string;
  requestedBy: string;
  requestedByEmail: string;
  amount?: number;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  reviewDeadline?: string;
  attachments?: string[];
  metadata?: any;
}

const mockRequests: ApprovalRequest[] = [
  {
    id: '1',
    type: 'investment',
    title: 'Investment Request - Palm Jumeirah Villa',
    description: 'Request to invest $500,000 in luxury villa renovation project',
    requestedBy: 'Michael Chen',
    requestedByEmail: 'michael.c@investor.com',
    amount: 500000,
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-15T10:00:00Z',
    reviewDeadline: '2024-01-20T10:00:00Z',
    attachments: ['bank_statement.pdf', 'investment_proposal.pdf']
  },
  {
    id: '2',
    type: 'kyc',
    title: 'KYC Verification - Sarah Johnson',
    description: 'Complete KYC documentation submitted for verification',
    requestedBy: 'Sarah Johnson',
    requestedByEmail: 'sarah.j@investor.com',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-01-14T15:30:00Z',
    attachments: ['passport.pdf', 'utility_bill.pdf', 'bank_statement.pdf']
  },
  {
    id: '3',
    type: 'withdrawal',
    title: 'Profit Withdrawal Request',
    description: 'Request to withdraw quarterly profits from Dubai Hills project',
    requestedBy: 'Emma Wilson',
    requestedByEmail: 'emma.w@investor.com',
    amount: 75000,
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-01-13T09:15:00Z'
  }
];

const typeIcons = {
  investment: DollarSign,
  kyc: Shield,
  project: FileText,
  withdrawal: TrendingUp
};

const typeColors = {
  investment: 'bg-green-100 text-green-800',
  kyc: 'bg-blue-100 text-blue-800',
  project: 'bg-purple-100 text-purple-800',
  withdrawal: 'bg-orange-100 text-orange-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

export function AdminApprovalSystem() {
  const [requests, setRequests] = useState<ApprovalRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const { toast } = useToast();

  const getRequestsByStatus = (status: string) => {
    if (status === 'all') return requests;
    return requests.filter(request => request.status === status);
  };

  const handleApprovalAction = (action: 'approve' | 'reject') => {
    if (!selectedRequest) return;

    setRequests(prev => prev.map(request => 
      request.id === selectedRequest.id 
        ? { 
            ...request, 
            status: action === 'approve' ? 'approved' : 'rejected'
          }
        : request
    ));

    setIsReviewDialogOpen(false);
    setSelectedRequest(null);
    setReviewNotes('');

    toast({
      title: `Request ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `${selectedRequest.title} has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
    });
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return AlertTriangle;
      case 'high': return Clock;
      default: return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const filteredRequests = getRequestsByStatus(activeTab);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Approval System
          </CardTitle>
          <CardDescription>
            Review and approve investment requests, KYC verifications, and other administrative actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({requests.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({requests.filter(r => r.status === 'pending').length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({requests.filter(r => r.status === 'approved').length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({requests.filter(r => r.status === 'rejected').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredRequests.map((request) => {
                  const TypeIcon = typeIcons[request.type];
                  const PriorityIcon = getPriorityIcon(request.priority);
                  
                  return (
                    <Card 
                      key={request.id} 
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        isOverdue(request.reviewDeadline) ? 'border-red-200 bg-red-50' : ''
                      }`}
                      onClick={() => {
                        setSelectedRequest(request);
                        setIsReviewDialogOpen(true);
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-primary/10">
                              <TypeIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{request.title}</h3>
                                {PriorityIcon && (
                                  <PriorityIcon className="h-4 w-4 text-orange-500" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {request.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Requested by: {request.requestedBy}</span>
                                <span>•</span>
                                <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                                {request.reviewDeadline && (
                                  <>
                                    <span>•</span>
                                    <span className={isOverdue(request.reviewDeadline) ? 'text-red-600 font-medium' : ''}>
                                      Due: {new Date(request.reviewDeadline).toLocaleDateString()}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {request.amount && (
                              <div className="text-right mr-4">
                                <div className="font-semibold text-lg">
                                  {formatCurrency(request.amount)}
                                </div>
                              </div>
                            )}
                            <div className="flex flex-col gap-2">
                              <Badge className={typeColors[request.type]}>
                                {request.type.replace('_', ' ')}
                              </Badge>
                              <Badge className={priorityColors[request.priority]}>
                                {request.priority}
                              </Badge>
                              <Badge className={statusColors[request.status]}>
                                {request.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Request</DialogTitle>
            <DialogDescription>
              Review and take action on this approval request
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="p-3 rounded-lg bg-primary/10">
                  {(() => {
                    const TypeIcon = typeIcons[selectedRequest.type];
                    return <TypeIcon className="h-6 w-6 text-primary" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedRequest.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Requested by {selectedRequest.requestedBy}
                  </p>
                </div>
                {selectedRequest.amount && (
                  <div className="text-right">
                    <div className="font-semibold text-lg">
                      {formatCurrency(selectedRequest.amount)}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                  {selectedRequest.description}
                </p>
              </div>

              {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                <div>
                  <label className="text-sm font-medium">Attachments</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer">
                        <FileText className="h-3 w-3 mr-1" />
                        {attachment}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedRequest.status === 'pending' && (
                <div>
                  <label className="text-sm font-medium">Review Notes</label>
                  <Textarea
                    placeholder="Add notes about this review..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Close
            </Button>
            {selectedRequest?.status === 'pending' && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => handleApprovalAction('reject')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprovalAction('approve')}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}