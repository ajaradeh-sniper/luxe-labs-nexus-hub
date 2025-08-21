import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useAuditLog() {
  return useQuery({
    queryKey: ['audit-log'],
    queryFn: () => api('/api/audit'),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // 30 seconds
  });
}