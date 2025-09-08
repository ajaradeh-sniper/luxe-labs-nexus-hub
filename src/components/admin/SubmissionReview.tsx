import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Eye,
  Mail,
  Phone,
  Building,
  UserPlus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Submission {
  id: string;
  submission_type: 'signup' | 'contact' | 'referral';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  requested_role: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  submission_data: any;
  created_at: string;
  updated_at: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const typeColors = {
  signup: 'bg-blue-100 text-blue-800',
  contact: 'bg-purple-100 text-purple-800',
  referral: 'bg-orange-100 text-orange-800'
};

export function SubmissionReview() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('user_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions((data || []) as Submission[]);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSubmissionsByStatus = (status: string) => {
    let filteredSubmissions = submissions;
    
    if (status !== 'all') {
      filteredSubmissions = submissions.filter(s => s.status === status);
    }

    return filteredSubmissions.filter(submission => {
      const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (submission.company && submission.company.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = typeFilter === 'all' || submission.submission_type === typeFilter;
      
      return matchesSearch && matchesType;
    });
  };

  const handleReviewSubmission = async (action: 'approve' | 'reject') => {
    if (!selectedSubmission) return;

    try {
      setLoading(true);
      
      if (action === 'approve' && selectedSubmission.submission_type === 'signup') {
        // Create user account and profile
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: selectedSubmission.email,
          password: Math.random().toString(36).slice(-8), // Temporary password
          email_confirm: true,
          user_metadata: {
            name: selectedSubmission.name,
            role: selectedRole || selectedSubmission.requested_role
          }
        });

        if (authError) throw authError;

        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: authData.user.id,
            name: selectedSubmission.name,
            role: selectedRole || selectedSubmission.requested_role
          });

        if (profileError) throw profileError;
      }

      // Update submission status
      const { error } = await supabase
        .from('user_submissions')
        .update({
          status: action === 'approve' ? 'approved' : 'rejected',
          admin_notes: reviewNotes,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      await fetchSubmissions();
      setIsReviewDialogOpen(false);
      setSelectedSubmission(null);
      setReviewNotes('');
      setSelectedRole('');

      toast({
        title: `Submission ${action === 'approve' ? 'Approved' : 'Rejected'}`,
        description: `${selectedSubmission.name}'s submission has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
      });
    } catch (error) {
      console.error('Error reviewing submission:', error);
      toast({
        title: "Error",
        description: "Failed to process submission",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = getSubmissionsByStatus(activeTab);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            User Access Requests
          </CardTitle>
          <CardDescription>
            Review and approve user submissions, signups, and contact requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="signup">Sign Up Requests</SelectItem>
                <SelectItem value="contact">Contact Forms</SelectItem>
                <SelectItem value="referral">Referrals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({submissions.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({submissions.filter(s => s.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({submissions.filter(s => s.status === 'approved').length})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({submissions.filter(s => s.status === 'rejected').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {loading ? (
                <div className="text-center py-8">Loading submissions...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Requested Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{submission.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {submission.email}
                            </div>
                            {submission.phone && (
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {submission.phone}
                              </div>
                            )}
                            {submission.company && (
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {submission.company}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={typeColors[submission.submission_type]}>
                            {submission.submission_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {submission.requested_role.replace('_', ' ').split(' ').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[submission.status]}>
                            {submission.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setReviewNotes(submission.admin_notes || '');
                              setSelectedRole(submission.requested_role);
                              setIsReviewDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Submission</DialogTitle>
            <DialogDescription>
              Review and take action on this user access request
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.email}</p>
                </div>
                {selectedSubmission.phone && (
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-muted-foreground">{selectedSubmission.phone}</p>
                  </div>
                )}
                {selectedSubmission.company && (
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <p className="text-sm text-muted-foreground">{selectedSubmission.company}</p>
                  </div>
                )}
              </div>

              {selectedSubmission.message && (
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                    {selectedSubmission.message}
                  </p>
                </div>
              )}

              {selectedSubmission.status === 'pending' && (
                <>
                  <div>
                    <label className="text-sm font-medium">Assign Role</label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="real_estate_agent">Real Estate Agent</SelectItem>
                        <SelectItem value="project_manager">Project Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Admin Notes</label>
                    <Textarea
                      placeholder="Add notes about this review..."
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                    />
                  </div>
                </>
              )}

              {selectedSubmission.admin_notes && (
                <div>
                  <label className="text-sm font-medium">Previous Notes</label>
                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                    {selectedSubmission.admin_notes}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            {selectedSubmission?.status === 'pending' && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => handleReviewSubmission('reject')}
                  disabled={loading}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleReviewSubmission('approve')}
                  disabled={loading || !selectedRole}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve & Create User
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}