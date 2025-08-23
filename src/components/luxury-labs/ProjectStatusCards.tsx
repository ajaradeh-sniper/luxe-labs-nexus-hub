import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Calendar
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  code: string;
  name: string;
  status: string;
  tier: string;
  total_budget: number;
  progress?: number;
  cpi?: number;
  schedule_variance?: number;
  risk_level?: 'low' | 'medium' | 'high';
}

export function ProjectStatusCards() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('ll_projects')
        .select('*')
        .in('status', ['planning', 'design', 'procurement', 'execution', 'furnishing', 'listing'])
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      // Mock additional data that would come from calculations
      const enrichedProjects = data?.map(project => ({
        ...project,
        progress: Math.floor(Math.random() * 100),
        cpi: 0.85 + Math.random() * 0.3, // Random CPI between 0.85-1.15
        schedule_variance: (Math.random() - 0.5) * 30, // Random variance ±15%
        risk_level: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
      })) || [];

      setProjects(enrichedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planning: 'bg-blue-100 text-blue-800',
      design: 'bg-purple-100 text-purple-800',
      procurement: 'bg-yellow-100 text-yellow-800',
      execution: 'bg-orange-100 text-orange-800',
      furnishing: 'bg-green-100 text-green-800',
      listing: 'bg-emerald-100 text-emerald-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTierColor = (tier: string) => {
    const colors = {
      lite: 'bg-gray-100 text-gray-800',
      standard: 'bg-blue-100 text-blue-800',
      premium: 'bg-purple-100 text-purple-800',
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRiskIcon = (riskLevel: string, cpi: number, scheduleVariance: number) => {
    const isCPIRisk = cpi < 0.9;
    const isScheduleRisk = Math.abs(scheduleVariance) > 15;
    
    if (isCPIRisk || isScheduleRisk || riskLevel === 'high') {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    if (riskLevel === 'medium') {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    }
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse border rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building2 className="mr-2 h-5 w-5" />
          Project Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm mb-1">{project.name}</h3>
                  <p className="text-xs text-muted-foreground">{project.code}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {getRiskIcon(project.risk_level || 'low', project.cpi || 1, project.schedule_variance || 0)}
                </div>
              </div>

              {/* Status and Tier Badges */}
              <div className="flex items-center space-x-2 mb-3">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <Badge variant="outline" className={getTierColor(project.tier)}>
                  {project.tier}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-medium">CPI</div>
                  <div className={`${project.cpi && project.cpi < 0.9 ? 'text-red-600' : 'text-green-600'}`}>
                    {project.cpi?.toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">SV%</div>
                  <div className={`${Math.abs(project.schedule_variance || 0) > 15 ? 'text-red-600' : 'text-green-600'}`}>
                    {project.schedule_variance && project.schedule_variance > 0 ? '+' : ''}{project.schedule_variance?.toFixed(1)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Budget</div>
                  <div className="text-muted-foreground">
                    {formatCurrency(project.total_budget)}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-3 pt-3 border-t">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No active projects found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}