import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Activity, 
  Database, 
  Shield, 
  Users,
  Server,
  Wifi,
  RefreshCw,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { systemDebugger } from '@/lib/systemDebugger';
import { supabase } from '@/integrations/supabase/client';

interface HealthMetric {
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'checking';
  value?: string;
  lastChecked: Date;
  details?: string;
  icon: any;
}

export function SystemHealthMonitor() {
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
  const [lastFullCheck, setLastFullCheck] = useState<Date | null>(null);
  const { toast } = useToast();

  const initializeMetrics = (): HealthMetric[] => [
    {
      name: 'Authentication Service',
      status: 'checking',
      icon: Shield,
      lastChecked: new Date()
    },
    {
      name: 'Database Connection',
      status: 'checking',
      icon: Database,
      lastChecked: new Date()
    },
    {
      name: 'User Sessions',
      status: 'checking',
      icon: Users,
      lastChecked: new Date()
    },
    {
      name: 'Real-time Features',
      status: 'checking',
      icon: Wifi,
      lastChecked: new Date()
    },
    {
      name: 'System Performance',
      status: 'checking',
      icon: Activity,
      lastChecked: new Date()
    },
    {
      name: 'API Response Time',
      status: 'checking',
      icon: Server,
      lastChecked: new Date()
    }
  ];

  const checkAuthHealth = async (): Promise<Partial<HealthMetric>> => {
    try {
      const start = Date.now();
      const { data: session, error } = await supabase.auth.getSession();
      const responseTime = Date.now() - start;
      
      if (error) {
        return {
          status: 'error',
          details: `Auth error: ${error.message}`,
          value: `Error (${responseTime}ms)`
        };
      }
      
      return {
        status: 'healthy',
        details: session ? 'User authenticated' : 'No active session',
        value: `${responseTime}ms response`
      };
    } catch (error) {
      return {
        status: 'error',
        details: `Auth check failed: ${error}`,
        value: 'Failed'
      };
    }
  };

  const checkDatabaseHealth = async (): Promise<Partial<HealthMetric>> => {
    try {
      const start = Date.now();
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
      const responseTime = Date.now() - start;
      
      if (error) {
        return {
          status: 'error',
          details: `DB error: ${error.message}`,
          value: `Error (${responseTime}ms)`
        };
      }
      
      return {
        status: 'healthy',
        details: 'Database responsive',
        value: `${responseTime}ms response`
      };
    } catch (error) {
      return {
        status: 'error',
        details: `DB connection failed: ${error}`,
        value: 'Failed'
      };
    }
  };

  const checkUserSessions = async (): Promise<Partial<HealthMetric>> => {
    try {
      const start = Date.now();
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      const responseTime = Date.now() - start;
      
      if (error) {
        return {
          status: 'warning',
          details: `Cannot count users: ${error.message}`,
          value: 'Unknown'
        };
      }
      
      return {
        status: 'healthy',
        details: `${count || 0} registered users`,
        value: `${count || 0} users (${responseTime}ms)`
      };
    } catch (error) {
      return {
        status: 'error',
        details: `User check failed: ${error}`,
        value: 'Failed'
      };
    }
  };

  const checkRealtimeHealth = async (): Promise<Partial<HealthMetric>> => {
    try {
      const start = Date.now();
      
      // Test realtime connection
      const channel = supabase.channel('health_check');
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Realtime timeout')), 5000);
        
        channel.subscribe((status) => {
          clearTimeout(timeout);
          if (status === 'SUBSCRIBED') {
            resolve(status);
          } else {
            reject(new Error(`Realtime status: ${status}`));
          }
        });
      });
      
      await supabase.removeChannel(channel);
      const responseTime = Date.now() - start;
      
      return {
        status: 'healthy',
        details: 'Realtime connection active',
        value: `Connected (${responseTime}ms)`
      };
    } catch (error) {
      return {
        status: 'warning',
        details: `Realtime check failed: ${error}`,
        value: 'Unavailable'
      };
    }
  };

  const checkSystemPerformance = async (): Promise<Partial<HealthMetric>> => {
    try {
      const start = Date.now();
      
      // Check memory usage (if available)
      const memoryInfo = (performance as any).memory;
      const loadTime = Date.now() - start;
      
      if (memoryInfo) {
        const usedMB = Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024);
        const totalMB = Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024);
        const usage = (usedMB / totalMB) * 100;
        
        return {
          status: usage > 80 ? 'warning' : 'healthy',
          details: `Memory: ${usedMB}MB / ${totalMB}MB`,
          value: `${usage.toFixed(1)}% memory usage`
        };
      }
      
      return {
        status: 'healthy',
        details: 'Performance monitoring active',
        value: `${loadTime}ms check time`
      };
    } catch (error) {
      return {
        status: 'warning',
        details: `Performance check failed: ${error}`,
        value: 'Unknown'
      };
    }
  };

  const checkApiResponseTime = async (): Promise<Partial<HealthMetric>> => {
    try {
      const start = Date.now();
      
      // Test multiple endpoints
      const tests = await Promise.allSettled([
        supabase.from('profiles').select('count').limit(1),
        supabase.auth.getSession(),
      ]);
      
      const responseTime = Date.now() - start;
      const failedTests = tests.filter(t => t.status === 'rejected').length;
      
      if (failedTests > 0) {
        return {
          status: 'warning',
          details: `${failedTests} API test(s) failed`,
          value: `${responseTime}ms (${failedTests} failures)`
        };
      }
      
      const status = responseTime > 2000 ? 'warning' : 'healthy';
      
      return {
        status,
        details: 'All API endpoints responsive',
        value: `${responseTime}ms average`
      };
    } catch (error) {
      return {
        status: 'error',
        details: `API test failed: ${error}`,
        value: 'Failed'
      };
    }
  };

  const runHealthChecks = async () => {
    setIsRunningDiagnostic(true);
    
    const checks = [
      checkAuthHealth,
      checkDatabaseHealth,
      checkUserSessions,
      checkRealtimeHealth,
      checkSystemPerformance,
      checkApiResponseTime
    ];

    const newMetrics = [...initializeMetrics()];

    for (let i = 0; i < checks.length; i++) {
      try {
        const result = await checks[i]();
        newMetrics[i] = {
          ...newMetrics[i],
          ...result,
          lastChecked: new Date()
        };
      } catch (error) {
        newMetrics[i] = {
          ...newMetrics[i],
          status: 'error',
          details: `Check failed: ${error}`,
          lastChecked: new Date()
        };
      }
      
      // Update metrics progressively
      setMetrics([...newMetrics]);
    }

    setLastFullCheck(new Date());
    setIsRunningDiagnostic(false);
    
    toast({
      title: "Health Check Complete",
      description: "System diagnostics have been updated.",
    });
  };

  const runFullDiagnostic = async () => {
    setIsRunningDiagnostic(true);
    
    try {
      await systemDebugger.runFullDiagnostic();
      await runHealthChecks();
      
      toast({
        title: "Full Diagnostic Complete",
        description: "Comprehensive system analysis completed. Check console for detailed logs.",
      });
    } catch (error) {
      toast({
        title: "Diagnostic Failed",
        description: `Error running diagnostic: ${error}`,
        variant: "destructive"
      });
    } finally {
      setIsRunningDiagnostic(false);
    }
  };

  useEffect(() => {
    setMetrics(initializeMetrics());
    runHealthChecks();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(runHealthChecks, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-600';
      case 'warning': return 'text-amber-600';
      case 'error': return 'text-red-600';
      case 'checking': return 'text-blue-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      case 'checking': return RefreshCw;
      default: return Activity;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return <Badge variant="default" className="bg-emerald-100 text-emerald-800">Healthy</Badge>;
      case 'warning': return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Warning</Badge>;
      case 'error': return <Badge variant="destructive">Error</Badge>;
      case 'checking': return <Badge variant="outline">Checking...</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const healthyCount = metrics.filter(m => m.status === 'healthy').length;
  const totalCount = metrics.length;
  const overallHealth = totalCount > 0 ? (healthyCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={runHealthChecks} disabled={isRunningDiagnostic}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRunningDiagnostic ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={runFullDiagnostic} disabled={isRunningDiagnostic}>
            <Activity className="h-4 w-4 mr-2" />
            Full Diagnostic
          </Button>
        </div>
      </div>

      {/* Overall Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Overview
          </CardTitle>
          <CardDescription>
            Overall system health: {healthyCount}/{totalCount} components healthy
            {lastFullCheck && (
              <span className="flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" />
                Last checked: {lastFullCheck.toLocaleTimeString()}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Health Score</span>
              <span>{overallHealth.toFixed(1)}%</span>
            </div>
            <Progress value={overallHealth} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const StatusIcon = getStatusIcon(metric.status);
          const MetricIcon = metric.icon;
          
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <MetricIcon className="h-4 w-4" />
                    {metric.name}
                  </div>
                  {getStatusBadge(metric.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`h-4 w-4 ${getStatusColor(metric.status)} ${metric.status === 'checking' ? 'animate-spin' : ''}`} />
                    <span className="text-sm font-medium">{metric.value || 'Checking...'}</span>
                  </div>
                  
                  {metric.details && (
                    <p className="text-xs text-muted-foreground">{metric.details}</p>
                  )}
                  
                  <p className="text-xs text-muted-foreground">
                    Last checked: {metric.lastChecked.toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}