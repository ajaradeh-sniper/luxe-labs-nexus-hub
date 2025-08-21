import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useProjects() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const list = useQuery({
    queryKey: ['projects'],
    queryFn: () => api('/api/projects'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const create = useMutation({
    mutationFn: (payload: any) => api('/api/projects', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project created successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create project',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const start = useMutation({
    mutationFn: (id: string) => api(`/api/projects/${id}/start`, {
      method: 'POST'
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Project started successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to start project',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return { list, create, start };
}