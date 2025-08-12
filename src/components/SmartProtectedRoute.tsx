
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingOverlay } from '@/components/LoadingSpinner';
import { useSmartRouting } from '@/hooks/useSmartRouting';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';

interface SmartProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export function SmartProtectedRoute({ children, requiredRoles }: SmartProtectedRouteProps) {
  const { user, loading, isInitialized } = useAuth();
  const { isAuthorizedForRoute } = useSmartRouting();
  const location = useLocation();

  console.log('SmartProtectedRoute: State check', {
    isInitialized,
    loading,
    hasUser: !!user,
    userRole: user?.role,
    requiredRoles,
    pathname: location.pathname
  });

  // Show loading while initializing or loading
  if (!isInitialized || loading) {
    return (
      <LoadingOverlay isLoading={true} loadingText="Loading...">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-luxury rounded-2xl flex items-center justify-center mx-auto animate-pulse">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Initializing...</h3>
              <p className="text-muted-foreground">Please wait while we load your dashboard</p>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    console.log('SmartProtectedRoute: No user, redirecting to auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    console.log('SmartProtectedRoute: Role not authorized', { userRole: user.role, requiredRoles });
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Access Restricted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You don't have permission to access this page.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Required roles:</strong> {requiredRoles.join(', ')}
                </p>
                <p className="text-sm">
                  <strong>Your role:</strong> {user.role}
                </p>
              </div>
              <button 
                onClick={() => window.history.back()}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Go Back
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check route authorization
  if (!isAuthorizedForRoute(location.pathname)) {
    console.log('SmartProtectedRoute: Route not authorized for user role');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('SmartProtectedRoute: Access granted, rendering children');
  return <>{children}</>;
}
