import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Shield, 
  Edit, 
  Trash2, 
  Eye,
  Mail,
  Phone,
  Building,
  Calendar,
  Activity
} from 'lucide-react';
import { UserRole } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

interface DetailedUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin: string;
  joinedDate: string;
  projectsAssigned: number;
  totalInvestment?: number;
  kycStatus?: 'pending' | 'approved' | 'rejected';
  notes: string;
  avatar?: string;
}

const mockDetailedUsers: DetailedUser[] = [
  {
    id: '1',
    name: 'System Administrator',
    email: 'admin@luxurylabs.com',
    phone: '+971-50-123-4567',
    role: 'administrator',
    department: 'IT',
    status: 'active',
    lastLogin: '2024-01-15 14:30',
    joinedDate: '2023-01-01',
    projectsAssigned: 0,
    notes: 'Primary system administrator with full access'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@luxurylabs.com',
    phone: '+971-50-234-5678',
    role: 'project_manager',
    department: 'Operations',
    status: 'active',
    lastLogin: '2024-01-14 16:45',
    joinedDate: '2023-03-15',
    projectsAssigned: 8,
    notes: 'Senior project manager handling luxury villa projects'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@luxurylabs.com',
    phone: '+971-50-345-6789',
    role: 'investor',
    department: 'Investment',
    status: 'active',
    lastLogin: '2024-01-13 09:20',
    joinedDate: '2023-06-20',
    projectsAssigned: 0,
    totalInvestment: 2500000,
    kycStatus: 'approved',
    notes: 'High-value investor focused on Dubai Marina properties'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.w@luxurylabs.com',
    phone: '+971-50-456-7890',
    role: 'real_estate_director',
    department: 'Real Estate',
    status: 'pending',
    lastLogin: 'Never',
    joinedDate: '2024-01-10',
    projectsAssigned: 0,
    notes: 'New hire, pending onboarding completion'
  },
  {
    id: '5',
    name: 'Ahmed Al-Rashid',
    email: 'ahmed.r@luxurylabs.com',
    phone: '+971-50-567-8901',
    role: 'finance_lead',
    department: 'Finance',
    status: 'active',
    lastLogin: '2024-01-15 11:15',
    joinedDate: '2023-02-01',
    projectsAssigned: 15,
    notes: 'Senior finance lead overseeing all project budgets'
  },
  {
    id: '6',
    name: 'Maria Rodriguez',
    email: 'maria.r@luxurylabs.com',
    phone: '+971-50-678-9012',
    role: 'head_of_design',
    department: 'Design',
    status: 'active',
    lastLogin: '2024-01-15 10:30',
    joinedDate: '2023-05-12',
    projectsAssigned: 12,
    notes: 'Leading all design initiatives and contractor coordination'
  },
  {
    id: '7',
    name: 'David Thompson',
    email: 'david.t@luxurylabs.com',
    phone: '+971-50-789-0123',
    role: 'lawyer',
    department: 'Legal',
    status: 'active',
    lastLogin: '2024-01-14 09:15',
    joinedDate: '2023-04-18',
    projectsAssigned: 25,
    notes: 'Senior legal counsel handling all property contracts'
  },
  {
    id: '8',
    name: 'Lisa Park',
    email: 'lisa.p@luxurylabs.com',
    phone: '+971-50-890-1234',
    role: 'marketing_lead',
    department: 'Marketing',
    status: 'active',
    lastLogin: '2024-01-15 13:45',
    joinedDate: '2023-07-22',
    projectsAssigned: 6,
    notes: 'Overseeing all marketing campaigns and social media'
  },
  {
    id: '9',
    name: 'James Wilson',
    email: 'james.w@luxurylabs.com',
    phone: '+971-50-901-2345',
    role: 'vendor_manager',
    department: 'Procurement',
    status: 'active',
    lastLogin: '2024-01-14 16:20',
    joinedDate: '2023-08-10',
    projectsAssigned: 18,
    notes: 'Managing all vendor relationships and contracts'
  },
  {
    id: '10',
    name: 'Isabella Garcia',
    email: 'isabella.g@luxurylabs.com',
    phone: '+971-50-012-3456',
    role: 'real_estate_agent',
    department: 'Sales',
    status: 'active',
    lastLogin: '2024-01-15 12:00',
    joinedDate: '2023-09-15',
    projectsAssigned: 8,
    notes: 'Top performing agent specializing in luxury properties'
  },
  {
    id: '11',
    name: 'Alex Thompson',
    email: 'alex.t@client.com',
    phone: '+971-50-123-7890',
    role: 'client',
    department: 'External',
    status: 'active',
    lastLogin: '2024-01-14 18:30',
    joinedDate: '2024-01-05',
    projectsAssigned: 1,
    notes: 'VIP client with ongoing downtown apartment renovation'
  },
  {
    id: '12',
    name: 'Premium Contractors LLC',
    email: 'contact@premiumcontractors.ae',
    phone: '+971-50-234-8901',
    role: 'partner',
    department: 'External',
    status: 'active',
    lastLogin: '2024-01-15 08:45',
    joinedDate: '2023-11-20',
    projectsAssigned: 5,
    notes: 'Trusted contractor partner for high-end renovations'
  }
];

const roleLabels: Record<UserRole, string> = {
  administrator: 'Administrator',
  real_estate_director: 'Real Estate Director',
  real_estate_agent: 'Real Estate Agent',
  investor_relations_manager: 'Investor Relations Manager',
  property_sales_lead: 'Property Sales Lead',
  bd_manager: 'BD Manager',
  project_manager: 'Project Manager',
  head_of_design: 'Head of Design',
  lawyer: 'Lawyer',
  finance_lead: 'Finance Lead',
  marketing_lead: 'Marketing Lead',
  vendor_manager: 'Vendor Manager',
  automation_lead: 'Automation Lead',
  investor: 'Investor',
  client: 'Client',
  partner: 'Partner'
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  suspended: 'bg-red-100 text-red-800'
};

const roleColors = {
  administrator: 'bg-red-100 text-red-800',
  real_estate_director: 'bg-orange-100 text-orange-800',
  real_estate_agent: 'bg-amber-100 text-amber-800',
  investor_relations_manager: 'bg-cyan-100 text-cyan-800',
  property_sales_lead: 'bg-lime-100 text-lime-800',
  bd_manager: 'bg-emerald-100 text-emerald-800',
  project_manager: 'bg-blue-100 text-blue-800',
  head_of_design: 'bg-violet-100 text-violet-800',
  lawyer: 'bg-slate-100 text-slate-800',
  finance_lead: 'bg-purple-100 text-purple-800',
  marketing_lead: 'bg-pink-100 text-pink-800',
  vendor_manager: 'bg-rose-100 text-rose-800',
  automation_lead: 'bg-teal-100 text-teal-800',
  investor: 'bg-green-100 text-green-800',
  client: 'bg-indigo-100 text-indigo-800',
  partner: 'bg-yellow-100 text-yellow-800'
};

export function DetailedUserManagement() {
  const [users, setUsers] = useState<DetailedUser[]>(mockDetailedUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<DetailedUser | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleUserAction = (action: string, user: DetailedUser) => {
    setSelectedUser(user);
    switch (action) {
      case 'view':
        setIsViewDialogOpen(true);
        break;
      case 'edit':
        setIsEditDialogOpen(true);
        break;
      case 'suspend':
        // Handle suspend logic
        toast({
          title: "User Suspended",
          description: `${user.name} has been suspended successfully.`,
        });
        break;
      case 'activate':
        // Handle activate logic
        toast({
          title: "User Activated", 
          description: `${user.name} has been activated successfully.`,
        });
        break;
      case 'delete':
        // Handle delete logic
        toast({
          title: "User Deleted",
          description: `${user.name} has been deleted successfully.`,
          variant: "destructive"
        });
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Advanced User Management</h2>
          <p className="text-muted-foreground">Complete user lifecycle management with detailed profiles</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            User Directory
          </CardTitle>
          <CardDescription>
            Advanced user management with comprehensive filtering and bulk actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users, email, department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {Object.entries(roleLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing {filteredUsers.length} of {users.length} users</span>
            <Badge variant="outline">{users.filter(u => u.status === 'active').length} Active</Badge>
            <Badge variant="outline">{users.filter(u => u.status === 'pending').length} Pending</Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Details</TableHead>
                <TableHead>Role & Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Projects/Investment</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-elegant rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-foreground">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={roleColors[user.role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'}>
                        {roleLabels[user.role]}
                      </Badge>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {user.department}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={statusColors[user.status]}>
                        {user.status}
                      </Badge>
                      {user.kycStatus && (
                        <div className="text-xs text-muted-foreground">
                          KYC: {user.kycStatus}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {user.lastLogin}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined: {user.joinedDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {user.projectsAssigned > 0 && (
                        <div className="text-sm font-medium">
                          {user.projectsAssigned} Projects
                        </div>
                      )}
                      {user.totalInvestment && (
                        <div className="text-sm text-green-600 font-medium">
                          ${user.totalInvestment.toLocaleString()}
                        </div>
                      )}
                      {user.projectsAssigned === 0 && !user.totalInvestment && (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleUserAction('view', user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleUserAction('edit', user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleUserAction('delete', user)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Complete profile information for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-lg">{selectedUser.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p>{selectedUser.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <p>{selectedUser.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <Badge className={roleColors[selectedUser.role as keyof typeof roleColors]}>
                    {roleLabels[selectedUser.role]}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge className={statusColors[selectedUser.status]}>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <p className="text-sm text-muted-foreground mt-1">{selectedUser.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}