import { AdminCard } from './AdminCard';
import { Activity } from 'lucide-react';
import { useRecentActivity } from '@/hooks/useAdminData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

function humanizeAction(entry: any): string {
  const actor = entry.actor_name || 'Someone';
  const action = entry.action.toLowerCase();
  const entity = entry.entity || 'item';
  
  if (action === 'create') return `${actor} created ${entity}`;
  if (action === 'update') return `${actor} updated ${entity}`;
  if (action === 'delete') return `${actor} deleted ${entity}`;
  if (action === 'export') return `${actor} exported ${entity}`;
  if (action === 'login') return `${actor} logged in`;
  if (action === 'role_change') return `${actor} changed a user role`;
  
  return `${actor} performed ${action} on ${entity}`;
}

export function ActivityFeed() {
  const { data: activities, isLoading } = useRecentActivity();

  if (isLoading) {
    return (
      <AdminCard title="Recent Activity" icon={Activity}>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-start space-x-3">
              <Skeleton className="h-2 w-2 rounded-full mt-2" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <AdminCard title="Recent Activity" icon={Activity}>
        <p className="text-sm text-muted-foreground py-8 text-center">
          No recent activity
        </p>
      </AdminCard>
    );
  }

  return (
    <AdminCard title="Recent Activity" icon={Activity}>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {activities.map((entry) => (
            <div key={entry.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {humanizeAction(entry)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </AdminCard>
  );
}