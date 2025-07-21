import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingOverlay } from '@/components/LoadingSpinner';
import { useSmartRouting } from '@/hooks/useSmartRouting';

interface SmartProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export function SmartProtectedRoute({ children, requiredRoles }: SmartProtectedRouteProps) {
  const { user, loading, isInitialized } = useAuth();
  const { isAuthorizedForRoute } = useSmartRouting();
  const location = useLocation();

  // Show loading while initializing
  if (!isInitialized || loading) {
    return (
      <LoadingOverlay isLoading={true} loadingText="Initializing...">
        <div className="min-h-screen bg-background" />
      </LoadingOverlay>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check route authorization
  if (!isAuthorizedForRoute(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}