import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, Permission, ROLE_PERMISSIONS } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string, role?: UserRole) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  hasPermission: (resource: string, permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive"
        });
        return;
      }

      if (profile) {
        setUser({
          id: profile.user_id,
          email: supabaseUser.email || '',
          name: profile.name,
          role: profile.role as UserRole,
          avatar: profile.avatar_url
        });
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
        return { error: error.message };
      }

      toast({
        title: "Welcome back!",
        description: "Successfully logged in"
      });

      return {};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole = 'client'): Promise<{ error?: string }> => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name,
            role
          }
        }
      });

      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive"
        });
        return { error: error.message };
      }

      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account"
      });

      return {};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Error",
          description: "Failed to log out",
          variant: "destructive"
        });
        return;
      }

      setUser(null);
      setSession(null);
      toast({
        title: "Logged out",
        description: "Successfully logged out"
      });
      
      // Redirect to landing page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
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

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      login, 
      signUp, 
      logout, 
      hasPermission 
    }}>
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