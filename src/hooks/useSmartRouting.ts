import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

// Role-based dashboard mapping - all users go to Featured Projects after sign in
const ROLE_DASHBOARDS: Partial<Record<UserRole, string>> = {
  administrator: '/projects',
  'real_estate_director': '/projects', 
  'project_manager': '/projects',
  'investor': '/projects',
  'client': '/projects'
};

// Default routes for each role
const ROLE_DEFAULT_ROUTES: Partial<Record<UserRole, string>> = {
  administrator: '/admin/system',
  'real_estate_director': '/properties',
  'project_manager': '/project-management', 
  'investor': '/fund-management',
  'client': '/fund-management'
};

export function useSmartRouting() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectToDashboard = () => {
    if (!user) return;
    
    const dashboard = ROLE_DASHBOARDS[user.role] || '/dashboard';
    navigate(dashboard, { replace: true });
  };

  const redirectToDefaultRoute = () => {
    if (!user) return;
    
    const defaultRoute = ROLE_DEFAULT_ROUTES[user.role] || '/dashboard';
    navigate(defaultRoute, { replace: true });
  };

  const isAuthorizedForRoute = (path: string): boolean => {
    if (!user) return false;

    // Admin routes
    if (path.startsWith('/admin')) {
      return user.role === 'administrator' || user.role === 'real_estate_director';
    }

    // Project management routes
    if (path.includes('project-management') || path.includes('pm-dashboard')) {
      return ['administrator', 'real_estate_director', 'project_manager'].includes(user.role);
    }

    // Investor routes
    if (path.includes('investor') || path.includes('portfolio')) {
      return ['administrator', 'real_estate_director', 'investor'].includes(user.role);
    }

    // Client routes
    if (path.includes('client-dashboard')) {
      return ['administrator', 'real_estate_director', 'client'].includes(user.role);
    }

    return true; // Default allow
  };

  // Auto-redirect on successful login (only from auth page)
  useEffect(() => {
    if (!loading && user && location.pathname === '/auth') {
      redirectToDashboard();
    }
  }, [user, loading, location.pathname]);

  // Check route authorization (skip for public routes)
  useEffect(() => {
    if (!loading && user && !isAuthorizedForRoute(location.pathname)) {
      // Don't redirect from public routes like home page
      const publicRoutes = ['/', '/about', '/services', '/projects', '/media', '/partners', '/investors', '/contact'];
      const isPublicRoute = publicRoutes.some(route => location.pathname === route || location.pathname.startsWith(route));
      
      if (!isPublicRoute) {
        redirectToDefaultRoute();
      }
    }
  }, [user, loading, location.pathname]);

  return {
    redirectToDashboard,
    redirectToDefaultRoute,
    isAuthorizedForRoute,
    currentDashboard: user ? (ROLE_DASHBOARDS[user.role] || '/dashboard') : null,
    defaultRoute: user ? (ROLE_DEFAULT_ROUTES[user.role] || '/dashboard') : null
  };
}