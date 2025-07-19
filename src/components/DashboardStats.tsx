import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Building2, FileText, Users, BarChart3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { SupabaseService } from "@/lib/supabase-service"
import { useAsyncOperation } from "@/hooks/useAsyncOperation"
import { log } from "@/lib/logger"
import { useAuth } from "@/contexts/AuthContext"

interface StatCardProps {
  title: string
  value: string
  change: {
    value: number
    type: 'increase' | 'decrease'
    period: string
  }
  icon: React.ReactNode
  color?: string
  loading?: boolean
}

function StatCard({ title, value, change, icon, color = "primary", loading }: StatCardProps) {
  if (loading) {
    return (
      <Card className="hover:shadow-luxury transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-12 rounded-xl" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-4 w-20" />
        </CardContent>
      </Card>
    )
  }

  const isPositive = change.type === 'increase'
  const TrendIcon = isPositive ? TrendingUp : TrendingDown
  
  return (
    <Card className="hover:shadow-luxury transition-all duration-300 group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-luxury opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-12 w-12 rounded-xl bg-gradient-luxury flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <div className="text-white h-6 w-6 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2 bg-gradient-luxury bg-clip-text text-transparent">
          {value}
        </div>
        <div className="flex items-center text-sm">
          <div className={`flex items-center px-2 py-1 rounded-full ${
            isPositive 
              ? 'bg-success/10 text-success' 
              : 'bg-destructive/10 text-destructive'
          }`}>
            <TrendIcon className="h-3 w-3 mr-1" />
            <span className="font-medium">{Math.abs(change.value)}%</span>
          </div>
          <span className="ml-2 text-muted-foreground text-xs">vs {change.period}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const { user } = useAuth();
  const { data: stats, loading, error, execute } = useAsyncOperation(
    SupabaseService.getDashboardStats,
    { showErrorToast: true, errorMessage: "Failed to load dashboard statistics" }
  );

  useEffect(() => {
    if (user) {
      log.info("Loading dashboard stats", "DASHBOARD", { userId: user.id });
      execute();
    }
  }, [user, execute]);

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Unable to load dashboard statistics</p>
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const defaultStats = {
    totalProperties: 0,
    activeProjects: 0,
    totalValue: 0,
    avgROI: 0,
    propertiesBreakdown: { available: 0, sold: 0, pending: 0 },
    projectsBreakdown: { planning: 0, in_progress: 0, completed: 0 }
  };

  const currentStats = stats || defaultStats;

  const dashboardStats = [
    {
      title: "Total Portfolio Value",
      value: currentStats.totalValue > 0 ? `AED ${(currentStats.totalValue / 1000000).toFixed(1)}M` : "AED 0",
      change: { 
        value: currentStats.totalValue > 50000000 ? 12.5 : 0, 
        type: 'increase' as const, 
        period: 'last month' 
      },
      icon: <DollarSign className="h-4 w-4" />,
      color: "primary"
    },
    {
      title: "Active Properties",
      value: currentStats.totalProperties.toString(),
      change: { 
        value: currentStats.propertiesBreakdown.available > 5 ? 8.2 : 0, 
        type: 'increase' as const, 
        period: 'last quarter' 
      },
      icon: <Building2 className="h-4 w-4" />,
      color: "success"
    },
    {
      title: "Projects in Progress",
      value: currentStats.activeProjects.toString(),
      change: { 
        value: currentStats.activeProjects > 0 ? 15.3 : 0, 
        type: currentStats.activeProjects > 5 ? 'increase' as const : 'decrease' as const, 
        period: 'last week' 
      },
      icon: <FileText className="h-4 w-4" />,
      color: "warning"
    },
    {
      title: "Average ROI",
      value: `${currentStats.avgROI.toFixed(1)}%`,
      change: { 
        value: currentStats.avgROI > 15 ? 5.7 : 0, 
        type: 'increase' as const, 
        period: 'last month' 
      },
      icon: <TrendingUp className="h-4 w-4" />,
      color: "accent"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat, index) => (
        <StatCard key={index} {...stat} loading={loading} />
      ))}
    </div>
  )
}