import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Building2,
  TrendingUp,
  DollarSign,
  Calendar,
  Award,
  Star,
  Trophy,
  Target,
  Eye,
  Download,
  MessageSquare,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  MapPin,
  Users,
  BarChart3,
  Zap,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Investment {
  id: string;
  project_name: string;
  commitment: number;
  ownership_pct: number;
  status: string;
  property_address: string;
  property_type: string;
  current_stage: string;
  progress_percentage: number;
  estimated_completion: string;
  actual_value: number;
  roi_percentage: number;
  monthly_returns: number;
  next_payout_date: string;
  next_payout_amount: number;
  project_updates_count: number;
  last_update: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress: number;
  color: string;
}

export default function InvestorProperties() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [stats, setStats] = useState({
    totalInvested: 0,
    currentValue: 0,
    totalROI: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalReturns: 0,
    investorLevel: 'Bronze',
    experiencePoints: 0
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (user) {
      loadInvestorData();
    }
  }, [user]);

  const loadInvestorData = async () => {
    try {
      setLoading(true);

      // Fetch investor's projects using untyped query
      const { data: projectInvestments, error } = await (supabase as any)
        .from('project_investors')
        .select(`
          *,
          projects:project_id (
            id,
            name,
            description,
            status,
            start_date,
            planned_end_date,
            actual_end_date,
            percent_complete,
            total_budget,
            actual_cost,
            ll_properties:property_id (
              address,
              area,
              property_type
            )
          )
        `)
        .eq('investor_id', user?.id);

      if (error) throw error;

      // Transform data
      const investmentsData: Investment[] = (projectInvestments || []).map((inv: any) => {
        const project = inv.projects;
        const property = project?.ll_properties;
        const roi = project?.total_budget > 0 
          ? ((project.actual_cost - project.total_budget) / project.total_budget * 100) 
          : 0;

        return {
          id: inv.id,
          project_name: project?.name || 'Unknown Project',
          commitment: inv.commitment || 0,
          ownership_pct: inv.ownership_pct || 0,
          status: inv.status || 'active',
          property_address: property?.address || 'Not specified',
          property_type: property?.property_type || 'Unknown',
          current_stage: project?.status || 'planning',
          progress_percentage: project?.percent_complete || 0,
          estimated_completion: project?.planned_end_date || '',
          actual_value: inv.commitment * (1 + roi / 100),
          roi_percentage: roi,
          monthly_returns: (inv.commitment * roi / 100) / 12,
          next_payout_date: project?.planned_end_date || '',
          next_payout_amount: inv.commitment * 0.05,
          project_updates_count: 0,
          last_update: project?.updated_at || ''
        };
      });

      setInvestments(investmentsData);

      // Calculate stats
      const totalInvested = investmentsData.reduce((sum, inv) => sum + inv.commitment, 0);
      const currentValue = investmentsData.reduce((sum, inv) => sum + inv.actual_value, 0);
      const totalROI = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested * 100) : 0;
      const activeProjects = investmentsData.filter(inv => ['active', 'reserved'].includes(inv.status)).length;
      const completedProjects = investmentsData.filter(inv => inv.status === 'completed').length;

      // Calculate investor level based on total invested
      let level = 'Bronze';
      let xp = totalInvested / 10000; // 10K per XP point
      if (totalInvested >= 5000000) level = 'Platinum';
      else if (totalInvested >= 2000000) level = 'Gold';
      else if (totalInvested >= 1000000) level = 'Silver';

      setStats({
        totalInvested,
        currentValue,
        totalROI,
        activeProjects,
        completedProjects,
        totalReturns: currentValue - totalInvested,
        investorLevel: level,
        experiencePoints: Math.floor(xp)
      });

      // Generate achievements
      generateAchievements(investmentsData, totalInvested, activeProjects);

    } catch (error) {
      console.error('Error loading investor data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load investment data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAchievements = (investments: Investment[], totalInvested: number, activeProjects: number) => {
    const achievementsList: Achievement[] = [
      {
        id: '1',
        title: 'First Investment',
        description: 'Make your first property investment',
        icon: Star,
        unlocked: investments.length > 0,
        progress: investments.length > 0 ? 100 : 0,
        color: 'text-yellow-500'
      },
      {
        id: '2',
        title: 'Portfolio Builder',
        description: 'Invest in 3 different projects',
        icon: Building2,
        unlocked: investments.length >= 3,
        progress: Math.min((investments.length / 3) * 100, 100),
        color: 'text-blue-500'
      },
      {
        id: '3',
        title: 'Million Dollar Investor',
        description: 'Invest over AED 1,000,000',
        icon: Trophy,
        unlocked: totalInvested >= 1000000,
        progress: Math.min((totalInvested / 1000000) * 100, 100),
        color: 'text-purple-500'
      },
      {
        id: '4',
        title: 'Active Investor',
        description: 'Have 4 active investments simultaneously',
        icon: Zap,
        unlocked: activeProjects >= 4,
        progress: Math.min((activeProjects / 4) * 100, 100),
        color: 'text-orange-500'
      },
      {
        id: '5',
        title: 'ROI Master',
        description: 'Achieve 20% ROI on any investment',
        icon: TrendingUp,
        unlocked: investments.some(inv => inv.roi_percentage >= 20),
        progress: Math.max(...investments.map(inv => Math.min((inv.roi_percentage / 20) * 100, 100)), 0),
        color: 'text-green-500'
      }
    ];

    setAchievements(achievementsList);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'reserved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'planning':
        return 'bg-purple-500/10 text-purple-500';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-500';
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Platinum':
        return 'bg-gradient-to-r from-gray-400 to-gray-200 text-white';
      case 'Gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-200 text-gray-900';
      case 'Silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-100 text-gray-900';
      default:
        return 'bg-gradient-to-r from-orange-400 to-orange-200 text-gray-900';
    }
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
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header with Gamification */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              Property Portfolio
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your investments and watch your portfolio grow
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${getLevelBadgeColor(stats.investorLevel)} px-4 py-2 text-sm font-bold`}>
              <Trophy className="h-4 w-4 mr-2" />
              {stats.investorLevel} Investor
            </Badge>
            <Button onClick={() => navigate('/opportunities')} className="gap-2">
              <Target className="h-4 w-4" />
              New Opportunities
            </Button>
          </div>
        </div>

        {/* Experience Bar */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Investor Experience</span>
              <span className="text-sm font-bold">{stats.experiencePoints} XP</span>
            </div>
            <Progress value={(stats.experiencePoints % 100)} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {100 - (stats.experiencePoints % 100)} XP to next level
            </p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Invested
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalInvested)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {stats.activeProjects + stats.completedProjects} properties
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Current Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.currentValue)}</div>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +{stats.totalROI.toFixed(1)}% ROI
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Total Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalReturns)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Realized & unrealized gains
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProjects}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.completedProjects} completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked
                      ? 'border-primary bg-primary/5 hover-scale'
                      : 'border-muted bg-muted/30 opacity-60'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-3 rounded-full ${achievement.unlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                      <achievement.icon className={`h-6 w-6 ${achievement.unlocked ? achievement.color : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Progress value={achievement.progress} className="h-1 w-full" />
                    <span className="text-xs font-medium">{Math.floor(achievement.progress)}%</span>
                  </div>
                  {achievement.unlocked && (
                    <div className="absolute -top-2 -right-2">
                      <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-500/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Investment Cards */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Properties ({investments.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({stats.activeProjects})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({stats.completedProjects})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {investments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Investments Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your property portfolio today
                  </p>
                  <Button onClick={() => navigate('/opportunities')}>
                    <Target className="h-4 w-4 mr-2" />
                    Browse Opportunities
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {investments.map((investment) => (
                  <Card key={investment.id} className="overflow-hidden hover-scale">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            {investment.project_name}
                            {investment.roi_percentage > 20 && (
                              <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                                <Star className="h-3 w-3 mr-1 fill-green-500" />
                                High ROI
                              </Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {investment.property_address}
                          </div>
                        </div>
                        <Badge className={getStatusColor(investment.status)}>
                          {investment.status}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Investment Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Your Investment</p>
                          <p className="text-lg font-bold">{formatCurrency(investment.commitment)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Current Value</p>
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(investment.actual_value)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">ROI</p>
                          <p className={`text-lg font-bold ${investment.roi_percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {investment.roi_percentage > 0 ? '+' : ''}{investment.roi_percentage.toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Ownership</p>
                          <p className="text-lg font-bold">{investment.ownership_pct?.toFixed(1)}%</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Project Progress</span>
                          <Badge className={getStageColor(investment.current_stage)}>
                            {investment.current_stage}
                          </Badge>
                        </div>
                        <Progress value={investment.progress_percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {investment.progress_percentage}% Complete
                        </p>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Est. Completion</span>
                        </div>
                        <span className="font-medium">
                          {investment.estimated_completion 
                            ? new Date(investment.estimated_completion).toLocaleDateString()
                            : 'TBD'
                          }
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => navigate(`/projects/${investment.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Reports
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {investments
                .filter((inv) => ['active', 'reserved'].includes(inv.status))
                .map((investment) => (
                  <Card key={investment.id} className="overflow-hidden hover-scale">
                    {/* Same card content as above */}
                    <CardContent className="py-6 text-center">
                      <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground">{investment.project_name}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {investments
                .filter((inv) => inv.status === 'completed')
                .map((investment) => (
                  <Card key={investment.id} className="overflow-hidden hover-scale">
                    {/* Same card content as above */}
                    <CardContent className="py-6 text-center">
                      <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <p className="text-sm text-muted-foreground">{investment.project_name}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
