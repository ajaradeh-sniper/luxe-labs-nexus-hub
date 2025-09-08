import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
} from '@/components/ui/dialog';
import { 
  Shield, 
  Search, 
  Edit,
  Plus,
  Trash2,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UserPermission {
  id: string;
  user_id: string;
  resource: string;
  permissions: string[];
  granted_by?: string;
  granted_at: string;
  expires_at?: string;
  is_active: boolean;
  user_name?: string;
  user_email?: string;
  user_role?: string;
}

const AVAILABLE_RESOURCES = [
  'projects',
  'opportunities',
  'properties',
  'users',
  'analytics',
  'documents',
  'financial',
  'marketing',
  'calendar',
  'messages',
  'reports',
  'settings'
];

const AVAILABLE_PERMISSIONS = ['view', 'edit', 'approve', 'delete'];

export function PermissionsManager() {
  const [permissions, setPermissions] = useState<UserPermission[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [selectedPermission, setSelectedPermission] = useState<UserPermission | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedResource, setSelectedResource] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [expiresAt, setExpiresAt] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPermissions();
    fetchUsers();
  }, []);

  const fetchPermissions = async () => {
    try {
      const { data, error } = await supabase
        .from('user_permissions')
        .select(`
          *,
          profiles!user_permissions_user_id_fkey (
            name,
            role
          )
        `)
        .order('granted_at', { ascending: false });

      if (error) throw error;
      
      const formattedPermissions = data?.map((p: any) => ({
        ...p,
        user_name: p.profiles?.name,
        user_role: p.profiles?.role
      })) || [];
      
      setPermissions(formattedPermissions);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch permissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_id, name, email, role')
        .order('name');

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = permission.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesResource = resourceFilter === 'all' || permission.resource === resourceFilter;
    
    return matchesSearch && matchesResource;
  });

  const handleCreatePermission = async () => {
    if (!selectedUser || !selectedResource || selectedPermissions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('user_permissions')
        .insert({
          user_id: selectedUser,
          resource: selectedResource,
          permissions: selectedPermissions,
          expires_at: expiresAt || null,
          is_active: true
        });

      if (error) throw error;

      await fetchPermissions();
      setIsCreateDialogOpen(false);
      resetForm();

      toast({
        title: "Permission Created",
        description: "New permission has been created successfully.",
      });
    } catch (error) {
      console.error('Error creating permission:', error);
      toast({
        title: "Error",
        description: "Failed to create permission",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePermission = async () => {
    if (!selectedPermission) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('user_permissions')
        .update({
          permissions: selectedPermissions,
          expires_at: expiresAt || null,
          is_active: true
        })
        .eq('id', selectedPermission.id);

      if (error) throw error;

      await fetchPermissions();
      setIsEditDialogOpen(false);
      setSelectedPermission(null);
      resetForm();

      toast({
        title: "Permission Updated",
        description: "Permission has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating permission:', error);
      toast({
        title: "Error",
        description: "Failed to update permission",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRevokePermission = async (permissionId: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('user_permissions')
        .update({ is_active: false })
        .eq('id', permissionId);

      if (error) throw error;

      await fetchPermissions();

      toast({
        title: "Permission Revoked",
        description: "Permission has been revoked successfully.",
      });
    } catch (error) {
      console.error('Error revoking permission:', error);
      toast({
        title: "Error",
        description: "Failed to revoke permission",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedUser('');
    setSelectedResource('');
    setSelectedPermissions([]);
    setExpiresAt('');
  };

  const openEditDialog = (permission: UserPermission) => {
    setSelectedPermission(permission);
    setSelectedPermissions([...permission.permissions]);
    setExpiresAt(permission.expires_at || '');
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Permissions Manager
              </CardTitle>
              <CardDescription>
                Manage granular user permissions for platform resources
              </CardDescription>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Permission
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users or resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                {AVAILABLE_RESOURCES.map(resource => (
                  <SelectItem key={resource} value={resource}>
                    {resource.charAt(0).toUpperCase() + resource.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading permissions...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{permission.user_name}</div>
                        <Badge variant="outline" className="text-xs">
                          {permission.user_role?.replace('_', ' ')}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {permission.resource}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {permission.permissions.map(perm => (
                          <Badge key={perm} variant="secondary" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={permission.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {permission.is_active ? 'Active' : 'Revoked'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {permission.expires_at ? (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(permission.expires_at).toLocaleDateString()}
                        </div>
                      ) : (
                        'Never'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(permission)}
                          disabled={!permission.is_active}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {permission.is_active && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevokePermission(permission.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Permission Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Permission</DialogTitle>
            <DialogDescription>
              Grant specific resource permissions to a user
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">User</label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.user_id} value={user.user_id}>
                      {user.name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Resource</label>
              <Select value={selectedResource} onValueChange={setSelectedResource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resource" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_RESOURCES.map(resource => (
                    <SelectItem key={resource} value={resource}>
                      {resource.charAt(0).toUpperCase() + resource.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Permissions</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {AVAILABLE_PERMISSIONS.map(permission => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={selectedPermissions.includes(permission)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPermissions([...selectedPermissions, permission]);
                        } else {
                          setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
                        }
                      }}
                    />
                    <label htmlFor={permission} className="text-sm">
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Expires At (Optional)</label>
              <Input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePermission} disabled={loading}>
              Create Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Permission Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Permission</DialogTitle>
            <DialogDescription>
              Update permissions for {selectedPermission?.user_name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Resource</label>
              <p className="text-sm text-muted-foreground">{selectedPermission?.resource}</p>
            </div>

            <div>
              <label className="text-sm font-medium">Permissions</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {AVAILABLE_PERMISSIONS.map(permission => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${permission}`}
                      checked={selectedPermissions.includes(permission)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPermissions([...selectedPermissions, permission]);
                        } else {
                          setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
                        }
                      }}
                    />
                    <label htmlFor={`edit-${permission}`} className="text-sm">
                      {permission}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Expires At</label>
              <Input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePermission} disabled={loading}>
              Update Permission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}