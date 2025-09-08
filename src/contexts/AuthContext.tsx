import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, Permission, ROLE_PERMISSIONS } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { log } from '@/lib/logger';
import { systemDebugger } from '@/lib/systemDebugger';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string, role?: UserRole) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  hasPermission: (resource: string, permission: Permission) => boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log('AuthProvider: Initializing...');
    
    // Run system diagnostic in development
    if (import.meta.env.DEV) {
      systemDebugger.runFullDiagnostic();
    }
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth event:', event, 'Has session:', !!session);
        log.info(`Auth state changed: ${event}`, 'AUTH', { 
          hasSession: !!session, 
          userId: session?.user?.id 
        });
        
        setSession(session);
        
        if (session?.user) {
          console.log('AuthProvider: User found, fetching profile...');
          await fetchUserProfile(session.user);
        } else {
          console.log('AuthProvider: No session, clearing user');
          setUser(null);
        }
        
        setLoading(false);
        setIsInitialized(true);
      }
    );

    // Check for existing session immediately
    const initializeAuth = async () => {
      console.log('AuthProvider: Checking for existing session...');
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider: Error getting session:', error);
          setLoading(false);
          setIsInitialized(true);
          return;
        }

        console.log('AuthProvider: Existing session found:', !!session);
        setSession(session);
        
        if (session?.user) {
          console.log('AuthProvider: Existing session has user, fetching profile...');
          await fetchUserProfile(session.user);
        } else {
          setLoading(false);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('AuthProvider: Error during initialization:', error);
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('AuthProvider: Fetching profile for user:', supabaseUser.id);
      log.debug('Fetching user profile', 'AUTH', { userId: supabaseUser.id });
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Profile fetch timeout')), 8000);
      });

      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .maybeSingle(); // Use maybeSingle to handle no data gracefully

      const { data: profile, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

      if (error) {
        if (error.message === 'Profile fetch timeout') {
          console.error('AuthProvider: Profile fetch timed out');
          log.error('Profile fetch timeout', 'AUTH', { userId: supabaseUser.id });
          const userData = {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: supabaseUser.user_metadata?.name || supabaseUser.email || 'User',
            role: 'client' as UserRole,
            avatar: supabaseUser.user_metadata?.avatar_url
          };
          setUser(userData);
          return;
        }
        
        console.error('AuthProvider: Error fetching profile:', error);
        log.error('Error fetching profile', 'AUTH', { error: error.message, userId: supabaseUser.id });
        const userData = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.name || supabaseUser.email || 'User',
          role: 'client' as UserRole,
          avatar: supabaseUser.user_metadata?.avatar_url
        };
        setUser(userData);
        return;
      }

      if (!profile) {
        console.log('AuthProvider: Profile not found, creating default profile...');
        try {
          // Check if this is the first user
          const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });
          
          const isFirstUser = count === 0;
          const role = isFirstUser ? 'administrator' : 'client';
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              user_id: supabaseUser.id,
              name: supabaseUser.user_metadata?.name || supabaseUser.email || 'User',
              role: role
            })
            .select()
            .maybeSingle();

          if (createError) {
            console.error('AuthProvider: Error creating profile:', createError);
            toast({
              title: "Error",
              description: "Failed to create user profile",
              variant: "destructive"
            });
            setLoading(false);
            setIsInitialized(true);
            return;
          }

          if (newProfile) {
            const userData = {
              id: newProfile.user_id,
              email: supabaseUser.email || '',
              name: newProfile.name,
              role: newProfile.role as UserRole,
              avatar: newProfile.avatar_url
            };
            
            console.log('AuthProvider: Created and loaded new profile:', userData);
            setUser(userData);
            log.auth.success('Profile created and loaded', userData.id, { 
              role: userData.role, 
              name: userData.name 
            });
          }
        } catch (createError) {
          console.error('AuthProvider: Error in profile creation:', createError);
          toast({
            title: "Error",
            description: "Failed to create user profile",
            variant: "destructive"
          });
          const fallbackUserData = {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: supabaseUser.user_metadata?.name || supabaseUser.email || 'User',
            role: 'client' as UserRole,
            avatar: supabaseUser.user_metadata?.avatar_url
          };
          setUser(fallbackUserData);
        }
        setLoading(false);
        setIsInitialized(true);
        return;
      }

      if (profile) {
        const userData = {
          id: profile.user_id,
          email: supabaseUser.email || '',
          name: profile.name,
          role: profile.role as UserRole,
          avatar: profile.avatar_url
        };
        
        console.log('AuthProvider: Profile loaded successfully:', userData);
        setUser(userData);
        log.auth.success('Profile loaded successfully', userData.id, { 
          role: userData.role, 
          name: userData.name 
        });
      }
      
      setLoading(false);
      setIsInitialized(true);
    } catch (error) {
      console.error('AuthProvider: Profile fetch error:', error);
      log.error('Profile fetch error', 'AUTH', error);
      setLoading(false);
      setIsInitialized(true);
    }
  };

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      console.log('AuthProvider: Attempting login for:', email);
      log.api.request('/auth/signin', 'POST', { email }, undefined);
      setLoading(true);
      
      // Temporary fallback for connectivity issues - admin bypass
      if (email === 'alijaradeh@gmail.com' && password === 'admin123') {
        console.log('AuthProvider: Using fallback auth for admin');
        
        const mockUser: User = {
          id: 'admin-mock-id',
          email: 'alijaradeh@gmail.com',
          name: 'Admin User',
          role: 'administrator'
        };
        
        const mockSession = {
          user: { id: 'admin-mock-id', email: 'alijaradeh@gmail.com' }
        } as Session;
        
        setUser(mockUser);
        setSession(mockSession);
        setLoading(false);
        
        toast({
          title: "Welcome back!",
          description: "Logged in with temporary bypass (testing mode)"
        });
        
        return {};
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('AuthProvider: Login failed:', error);
        log.auth.error('Login failed', { error: error.message, email });
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
        setLoading(false);
        return { error: error.message };
      }

      console.log('AuthProvider: Login successful');
      log.auth.success('Login successful', email);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in"
      });

      return {};
    } catch (error) {
      console.error('AuthProvider: Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setLoading(false);
      return { error: errorMessage };
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole = 'client'): Promise<{ error?: string }> => {
    try {
      console.log('AuthProvider: Attempting signup for:', email);
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
        console.error('AuthProvider: Signup failed:', error);
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive"
        });
        setLoading(false);
        return { error: error.message };
      }

      console.log('AuthProvider: Signup successful');
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account"
      });

      setLoading(false);
      return {};
    } catch (error) {
      console.error('AuthProvider: Signup error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setLoading(false);
      return { error: errorMessage };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('AuthProvider: Logging out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthProvider: Logout error:', error);
        toast({
          title: "Error",
          description: "Failed to log out",
          variant: "destructive"
        });
        return;
      }

      setUser(null);
      setSession(null);
      console.log('AuthProvider: Logout successful');
      toast({
        title: "Logged out",
        description: "Successfully logged out"
      });
      
      // Redirect to landing page
      window.location.href = '/';
    } catch (error) {
      console.error('AuthProvider: Logout error:', error);
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

  console.log('AuthProvider: Rendering with state:', { 
    user: !!user, 
    loading, 
    isInitialized,
    userRole: user?.role 
  });

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      login, 
      signUp, 
      logout, 
      hasPermission,
      isInitialized
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error('useAuth called outside AuthProvider');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
