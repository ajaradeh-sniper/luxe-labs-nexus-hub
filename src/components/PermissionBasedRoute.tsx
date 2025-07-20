import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';

interface PermissionBasedRouteProps {
  children: ReactNode;
  resource: string;
  permission?: 'view' | 'edit' | 'approve' | 'delete';
  fallbackUrl?: string;
}

export function PermissionBasedRoute({ 
  children, 
  resource, 
  permission = 'view',
  fallbackUrl = '/dashboard' 
}: PermissionBasedRouteProps) {
  const { user, loading } = useAuth();
  const { checkPermission } = usePermissions(resource);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] mx-auto" />
            <Skeleton className="h-4 w-[200px] mx-auto" />
          </div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!checkPermission(permission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Alert className="max-w-md">
          <ShieldX className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to access this resource. Contact your administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}