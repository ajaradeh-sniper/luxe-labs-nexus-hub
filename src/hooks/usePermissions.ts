import { useAuth } from '@/contexts/AuthContext';
import { Permission } from '@/types/auth';

export function usePermissions(resource: string) {
  const { hasPermission } = useAuth();

  return {
    canView: hasPermission(resource, 'view'),
    canEdit: hasPermission(resource, 'edit'),
    canApprove: hasPermission(resource, 'approve'),
    canDelete: hasPermission(resource, 'delete'),
    checkPermission: (permission: Permission) => hasPermission(resource, permission)
  };
}