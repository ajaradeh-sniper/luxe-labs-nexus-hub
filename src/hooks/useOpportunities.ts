import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useOpportunities() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const list = useQuery({
    queryKey: ['opportunities'],
    queryFn: () => api('/api/opportunities'),
    staleTime: 5 * 60 * 1000,
  });

  const promote = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => 
      api(`/api/opportunities/${id}/promote`, {
        method: 'POST',
        body: JSON.stringify(payload)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Opportunity promoted to project successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to promote opportunity',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return { list, promote };
}