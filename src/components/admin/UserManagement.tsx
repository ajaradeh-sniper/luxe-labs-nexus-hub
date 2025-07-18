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
import { UserPlus, Search, MoreHorizontal, Shield } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
}

const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'System Administrator',
    email: 'admin@luxurylabs.com',
    role: 'administrator',
    status: 'active',
    lastLogin: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@luxurylabs.com',
    role: 'project_manager',
    status: 'active',
    lastLogin: '2024-01-14'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@luxurylabs.com',
    role: 'investor',
    status: 'active',
    lastLogin: '2024-01-13'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.w@luxurylabs.com',
    role: 'real_estate_director',
    status: 'pending',
    lastLogin: 'Never'
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
  pending: 'bg-yellow-100 text-yellow-800'
};

export function UserManagement() {
  const [users] = useState<MockUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage system users and their roles</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            System Users
          </CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="administrator">Administrator</SelectItem>
                <SelectItem value="project_manager">Project Manager</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[user.status]}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}