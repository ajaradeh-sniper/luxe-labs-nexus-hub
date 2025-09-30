import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AdminStats {
  totalUsers: number;
  activeProjects: number;
  openLeads: number;
  pipelineValue: number;
}

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async (): Promise<AdminStats> => {
      const [users, projects, leads, opportunities] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }).in('status', ['planning', 'in_progress', 'on_hold']),
        supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        (supabase as any).from('opportunities').select('investment_required').eq('status', 'evaluation')
      ]);

      const pipelineValue = opportunities.data?.reduce((sum, opp) => sum + (Number(opp.investment_required) || 0), 0) || 0;

      return {
        totalUsers: users.count || 0,
        activeProjects: projects.count || 0,
        openLeads: leads.count || 0,
        pipelineValue
      };
    },
    refetchInterval: 30000, // 30s
    staleTime: 15000
  });
}

export interface AuditLogEntry {
  id: number;
  actor: string;
  action: string;
  entity: string;
  entity_id: string;
  diff: any;
  created_at: string;
  actor_name?: string;
}

export function useRecentActivity(limit = 25) {
  return useQuery({
    queryKey: ['recent-activity', limit],
    queryFn: async (): Promise<AuditLogEntry[]> => {
      const { data, error } = await supabase
        .from('audit_log')
        .select(`
          id,
          actor,
          action,
          entity,
          entity_id,
          diff,
          created_at
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Fetch actor names
      const actorIds = [...new Set(data.map(d => d.actor).filter(Boolean))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, full_name, name')
        .in('user_id', actorIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p.full_name || p.name]) || []);

      return data.map(entry => ({
        ...entry,
        actor_name: entry.actor ? profileMap.get(entry.actor) : 'System'
      }));
    },
    refetchInterval: 10000, // 10s
    staleTime: 5000
  });
}

export function useNotifications(unreadOnly = false) {
  return useQuery({
    queryKey: ['notifications', unreadOnly],
    queryFn: async () => {
      let query = supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (unreadOnly) {
        query = query.is('read_at', null);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    refetchInterval: 15000, // 15s
    staleTime: 5000
  });
}