import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, Permission, ROLE_PERMISSIONS } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (resource: string, permission: Permission) => boolean;
  switchRole: (role: UserRole) => void; // For demo purposes
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mock user for demo - in real app this would come from Supabase
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'admin@luxurylabs.com',
    name: 'System Administrator',
    role: 'administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const login = async (email: string, password: string) => {
    // Mock login - implement Supabase auth here
    console.log('Login:', email, password);
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (resource: string, permission: Permission): boolean => {
    if (!user) return false;
    
    const rolePermissions = ROLE_PERMISSIONS[user.role];
    
    // Administrator has access to everything
    if (user.role === 'administrator') return true;
    
    // Check specific resource permissions
    const resourcePermissions = rolePermissions[resource];
    if (!resourcePermissions) return false;
    
    return resourcePermissions.includes(permission);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}