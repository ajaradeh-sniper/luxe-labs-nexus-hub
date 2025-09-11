
import { supabase } from '@/integrations/supabase/client';

export const systemDebugger = {
  async checkAuthStatus() {
    console.log('=== SYSTEM DEBUGGER: Auth Status Check ===');
    
    try {
      // Check current session
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      console.log('Session check:', { 
        hasSession: !!session.session, 
        error: sessionError,
        userId: session.session?.user?.id 
      });

      if (session.session?.user) {
        // Check profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.session.user.id)
          .single();

        console.log('Profile check:', { 
          hasProfile: !!profile, 
          error: profileError,
          profile: profile 
        });

        // Check RLS policies
        const { data: testQuery, error: rlsError } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.session.user.id)
          .limit(1);

        console.log('RLS test:', { 
          canAccessProfiles: !rlsError, 
          error: rlsError,
          result: testQuery 
        });
      }

      return {
        session: session.session,
        sessionError,
        hasAuth: !!session.session
      };
    } catch (error) {
      console.error('System debugger error:', error);
      return { error };
    }
  },

  async checkDatabaseConnection() {
    console.log('=== SYSTEM DEBUGGER: Database Connection Check ===');
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      console.log('Database connection:', { 
        connected: !error, 
        error: error?.message,
        canQuery: !!data 
      });

      return { connected: !error, error };
    } catch (error) {
      console.error('Database connection error:', error);
      return { connected: false, error };
    }
  },

  async runFullDiagnostic() {
    console.log('=== SYSTEM DEBUGGER: Full Diagnostic ===');
    
    const authStatus = await this.checkAuthStatus();
    const dbConnection = await this.checkDatabaseConnection();

    const diagnostic = {
      timestamp: new Date().toISOString(),
      authStatus,
      dbConnection,
      environment: {
        url: window.location.origin,
        userAgent: navigator.userAgent,
        localStorage: !!window.localStorage,
        supabaseUrl: 'https://vzrdmjbcbhhyutppuxcf.supabase.co'
      }
    };

    console.log('Full diagnostic results:', diagnostic);
    return diagnostic;
  }
};

// Auto-run diagnostic on import in development (opt-in)
if (import.meta.env.DEV) {
  try {
    const diagnosticsEnabled = localStorage.getItem('ll_enable_diagnostics') === '1';
    const offlineFlag = localStorage.getItem('ll_offline_admin') === '1';
    if (diagnosticsEnabled && !offlineFlag && navigator.onLine) {
      console.log('Development mode - running system diagnostic...');
      setTimeout(() => {
        systemDebugger.runFullDiagnostic();
      }, 2000);
    } else {
      console.log('System diagnostic skipped (offline or disabled).');
    }
  } catch (e) {
    console.warn('System diagnostic not run due to storage access error:', e);
  }
}
