import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { InvestorQuestionnaire } from '@/components/InvestorQuestionnaire';
import { 
  Users, 
  Eye, 
  Edit, 
  Share2, 
  Plus, 
  Filter,
  Download,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface InvestorQuestionnaire {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  investment_appetite?: number;
  investment_range_min?: number;
  investment_range_max?: number;
  interested_in_luxury_flips: boolean;
  interested_in_luxury_funds: boolean;
  investment_timeline?: string;
  risk_tolerance?: string;
  preferred_locations: string[];
  investment_objectives?: string;
  additional_notes?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function LeadsManagement() {
  const [questionnaires, setQuestionnaires] = useState<InvestorQuestionnaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<InvestorQuestionnaire | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchQuestionnaires();
  }, []);

  const fetchQuestionnaires = async () => {
    try {
      const { data, error } = await supabase
        .from('investor_questionnaires')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestionnaires(data || []);
    } catch (error) {
      console.error('Error fetching questionnaires:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch questionnaires',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('investor_questionnaires')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setQuestionnaires(prev => 
        prev.map(q => q.id === id ? { ...q, status } : q)
      );

      toast({
        title: 'Status Updated',
        description: 'Lead status has been updated successfully',
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update lead status',
        variant: 'destructive',
      });
    }
  };

  const filteredQuestionnaires = questionnaires.filter(q => {
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    const matchesSearch = q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (q.company?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { variant: 'secondary' as const, label: 'New' },
      contacted: { variant: 'default' as const, label: 'Contacted' },
      qualified: { variant: 'default' as const, label: 'Qualified' },
      converted: { variant: 'default' as const, label: 'Converted' },
      rejected: { variant: 'destructive' as const, label: 'Rejected' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = {
    total: questionnaires.length,
    new: questionnaires.filter(q => q.status === 'new').length,
    qualified: questionnaires.filter(q => q.status === 'qualified').length,
    converted: questionnaires.filter(q => q.status === 'converted').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Leads Management</h1>
          <p className="text-muted-foreground">Business Development & Sales</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share Questionnaire
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Share Investor Questionnaire</DialogTitle>
                <DialogDescription>
                  Share this link with potential investors to collect their information and preferences.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input 
                  value={`${window.location.origin}/investor-questionnaire`}
                  readOnly
                  className="bg-muted"
                />
                <Button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/investor-questionnaire`);
                    toast({ title: 'Link copied to clipboard!' });
                  }}
                  className="w-full"
                >
                  Copy Link
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Leads</p>
                <p className="text-2xl font-bold">{stats.new}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Qualified</p>
                <p className="text-2xl font-bold">{stats.qualified}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Converted</p>
                <p className="text-2xl font-bold">{stats.converted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Investor Leads</CardTitle>
          <CardDescription>
            Manage and track investor questionnaire submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading leads...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Investment Range</TableHead>
                  <TableHead>Interests</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestionnaires.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.company || 'N/A'}</TableCell>
                    <TableCell>
                      {lead.investment_range_min && lead.investment_range_max ? (
                        <div className="text-sm">
                          {formatCurrency(lead.investment_range_min)} - {formatCurrency(lead.investment_range_max)}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {lead.interested_in_luxury_flips && (
                          <Badge variant="outline" className="text-xs">Flips</Badge>
                        )}
                        {lead.interested_in_luxury_funds && (
                          <Badge variant="outline" className="text-xs">Funds</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell>{format(new Date(lead.created_at), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedLead(lead)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Lead Details - {selectedLead?.name}</DialogTitle>
                            </DialogHeader>
                            {selectedLead && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-semibold">Email</label>
                                    <p className="text-sm">{selectedLead.email}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-semibold">Phone</label>
                                    <p className="text-sm">{selectedLead.phone || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-semibold">Company</label>
                                    <p className="text-sm">{selectedLead.company || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-semibold">Investment Appetite</label>
                                    <p className="text-sm">{formatCurrency(selectedLead.investment_appetite)}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-semibold">Timeline</label>
                                    <p className="text-sm">{selectedLead.investment_timeline || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-semibold">Risk Tolerance</label>
                                    <p className="text-sm">{selectedLead.risk_tolerance || 'N/A'}</p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-semibold">Preferred Locations</label>
                                  <p className="text-sm">{selectedLead.preferred_locations.join(', ') || 'N/A'}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-semibold">Investment Objectives</label>
                                  <p className="text-sm">{selectedLead.investment_objectives || 'N/A'}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-semibold">Additional Notes</label>
                                  <p className="text-sm">{selectedLead.additional_notes || 'N/A'}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-semibold">Status</label>
                                  <Select 
                                    defaultValue={selectedLead.status}
                                    onValueChange={(value) => updateLeadStatus(selectedLead.id, value)}
                                  >
                                    <SelectTrigger className="w-40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="contacted">Contacted</SelectItem>
                                      <SelectItem value="qualified">Qualified</SelectItem>
                                      <SelectItem value="converted">Converted</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Select 
                          defaultValue={lead.status}
                          onValueChange={(value) => updateLeadStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}