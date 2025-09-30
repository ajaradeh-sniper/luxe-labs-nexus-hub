import { Users, Briefcase, UserPlus, DollarSign } from 'lucide-react';
import { AdminCard } from './AdminCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminStats } from '@/hooks/useAdminData';

export function QuickStats() {
  const { data: stats, isLoading } = useAdminStats();

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Projects',
      value: stats?.activeProjects || 0,
      icon: Briefcase,
      color: 'text-green-600'
    },
    {
      title: 'Open Leads',
      value: stats?.openLeads || 0,
      icon: UserPlus,
      color: 'text-yellow-600'
    },
    {
      title: 'Pipeline Value',
      value: `AED ${((stats?.pipelineValue || 0) / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <AdminCard key={i} title="">
            <Skeleton className="h-20" />
          </AdminCard>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <AdminCard key={stat.title} title="">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </AdminCard>
        );
      })}
    </div>
  );
}