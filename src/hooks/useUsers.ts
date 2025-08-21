import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useUsers() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const list = useQuery({
    queryKey: ['users'],
    queryFn: () => api('/api/users'),
    staleTime: 5 * 60 * 1000,
  });

  const invite = useMutation({
    mutationFn: (payload: { email: string; role: string; name?: string }) => 
      api('/api/users/invite', {
        method: 'POST',
        body: JSON.stringify(payload)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({ title: 'Invitation sent successfully' });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to send invitation',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return { list, invite };
}