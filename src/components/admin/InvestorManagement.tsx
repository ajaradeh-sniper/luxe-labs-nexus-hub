import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Search, 
  DollarSign, 
  Users, 
  Building, 
  FileCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Eye,
  UserPlus
} from 'lucide-react';

interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  totalInvestment: number;
  activeProjects: number;
  portfolioValue: number;
  roi: number;
  kycStatus: 'pending' | 'approved' | 'rejected' | 'expired';
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  joinedDate: string;
  lastActivity: string;
  documents: {
    passport: boolean;
    emirates_id: boolean;
    bank_statement: boolean;
    salary_certificate: boolean;
  };
  preferredLocations: string[];
  investmentGoals: string;
}

const mockInvestors: Investor[] = [
  {
    id: '1',
    name: 'Michael Chen',
    email: 'michael.c@investor.com',
    phone: '+971-50-345-6789',
    nationality: 'Singaporean',
    totalInvestment: 2500000,
    activeProjects: 3,
    portfolioValue: 2850000,
    roi: 14.2,
    kycStatus: 'approved',
    riskProfile: 'moderate',
    joinedDate: '2023-06-20',
    lastActivity: '2024-01-15',
    documents: {
      passport: true,
      emirates_id: true,
      bank_statement: true,
      salary_certificate: true
    },
    preferredLocations: ['Dubai Marina', 'Downtown Dubai'],
    investmentGoals: 'Capital appreciation with moderate risk'
  },
  {
    id: '2',
    name: 'Sarah Al-Zahra',
    email: 'sarah.z@investor.com',
    phone: '+971-50-456-7890',
    nationality: 'Emirati',
    totalInvestment: 4200000,
    activeProjects: 5,
    portfolioValue: 4950000,
    roi: 17.8,
    kycStatus: 'approved',
    riskProfile: 'aggressive',
    joinedDate: '2023-03-15',
    lastActivity: '2024-01-14',
    documents: {
      passport: true,
      emirates_id: true,
      bank_statement: true,
      salary_certificate: true
    },
    preferredLocations: ['Palm Jumeirah', 'Jumeirah Beach Residence'],
    investmentGoals: 'High growth luxury properties'
  },
  {
    id: '3',
    name: 'James Thompson',
    email: 'james.t@investor.com',
    phone: '+971-50-567-8901',
    nationality: 'British',
    totalInvestment: 1800000,
    activeProjects: 2,
    portfolioValue: 1980000,
    roi: 10.1,
    kycStatus: 'pending',
    riskProfile: 'conservative',
    joinedDate: '2023-09-10',
    lastActivity: '2024-01-13',
    documents: {
      passport: true,
      emirates_id: false,
      bank_statement: true,
      salary_certificate: false
    },
    preferredLocations: ['Business Bay', 'DIFC'],
    investmentGoals: 'Stable income with capital preservation'
  }
];

const kycStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-800'
};

const riskProfileColors = {
  conservative: 'bg-blue-100 text-blue-800',
  moderate: 'bg-orange-100 text-orange-800',
  aggressive: 'bg-red-100 text-red-800'
};

const kycStatusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: AlertCircle,
  expired: AlertCircle
};

export function InvestorManagement() {
  const [investors] = useState<Investor[]>(mockInvestors);
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKyc = kycFilter === 'all' || investor.kycStatus === kycFilter;
    const matchesRisk = riskFilter === 'all' || investor.riskProfile === riskFilter;
    
    return matchesSearch && matchesKyc && matchesRisk;
  });

  const totalInvestmentAmount = investors.reduce((sum, inv) => sum + inv.totalInvestment, 0);
  const totalPortfolioValue = investors.reduce((sum, inv) => sum + inv.portfolioValue, 0);
  const averageROI = investors.reduce((sum, inv) => sum + inv.roi, 0) / investors.length;
  const approvedInvestors = investors.filter(inv => inv.kycStatus === 'approved').length;

  const getDocumentCompletionRate = (docs: Investor['documents']) => {
    const total = Object.keys(docs).length;
    const completed = Object.values(docs).filter(Boolean).length;
    return (completed / total) * 100;
  };

  return (
    <div className="space-y-6">

      {/* Investment Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold">${(totalInvestmentAmount / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600 mt-1">+12% from last quarter</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
                <p className="text-2xl font-bold">${(totalPortfolioValue / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600 mt-1">+18% growth</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average ROI</p>
                <p className="text-2xl font-bold">{averageROI.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">Above market average</p>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved Investors</p>
                <p className="text-2xl font-bold">{approvedInvestors}</p>
                <p className="text-xs text-green-600 mt-1">{((approvedInvestors / investors.length) * 100).toFixed(0)}% completion rate</p>
              </div>
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investor Directory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Investor Directory
          </CardTitle>
          <CardDescription>
            Manage investor profiles, KYC status, and investment portfolios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search investors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={kycFilter} onValueChange={setKycFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by KYC status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All KYC Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by risk profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Profiles</SelectItem>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor Details</TableHead>
                <TableHead>Investment Portfolio</TableHead>
                <TableHead>KYC & Compliance</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestors.map((investor) => {
                const StatusIcon = kycStatusIcons[investor.kycStatus];
                const docCompletion = getDocumentCompletionRate(investor.documents);
                
                return (
                  <TableRow key={investor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-elegant rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary-foreground">
                            {investor.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{investor.name}</div>
                          <div className="text-sm text-muted-foreground">{investor.email}</div>
                          <div className="text-xs text-muted-foreground">{investor.nationality}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          ${investor.totalInvestment.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {investor.activeProjects} active projects
                        </div>
                        <Badge className={riskProfileColors[investor.riskProfile]}>
                          {investor.riskProfile}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={kycStatusColors[investor.kycStatus]}>
                            {investor.kycStatus}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Joined: {investor.joinedDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Progress value={docCompletion} className="h-2 w-16" />
                          <span className="text-xs">{docCompletion.toFixed(0)}%</span>
                        </div>
                        <div className="flex gap-1">
                          {investor.documents.passport && <FileCheck className="h-3 w-3 text-green-600" />}
                          {investor.documents.emirates_id && <FileCheck className="h-3 w-3 text-green-600" />}
                          {investor.documents.bank_statement && <FileCheck className="h-3 w-3 text-green-600" />}
                          {investor.documents.salary_certificate && <FileCheck className="h-3 w-3 text-green-600" />}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-green-600">
                          {investor.roi.toFixed(1)}% ROI
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Portfolio: ${investor.portfolioValue.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last activity: {investor.lastActivity}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}