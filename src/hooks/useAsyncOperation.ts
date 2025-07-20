import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface AsyncOperationOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useAsyncOperation<T = any, Args extends any[] = any[]>(
  asyncFunction: (...args: Args) => Promise<{ data: T | null; error: string | null }>,
  options: AsyncOperationOptions = {}
) {
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const { toast } = useToast();

  const execute = useCallback(async (...args: Args) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await asyncFunction(...args);
      
      if (result.error) {
        setState({
          data: null,
          loading: false,
          error: result.error
        });

        if (options.showErrorToast !== false) {
          toast({
            title: 'Error',
            description: options.errorMessage || result.error,
            variant: 'destructive'
          });
        }

        // Call error callback if provided
        if (options.onError) {
          options.onError(result.error);
        }

        return { success: false, error: result.error, data: null };
      } else {
        setState({
          data: result.data,
          loading: false,
          error: null
        });

        if (options.showSuccessToast) {
          toast({
            title: 'Success',
            description: options.successMessage || 'Operation completed successfully'
          });
        }

        // Call success callback if provided
        if (options.onSuccess) {
          options.onSuccess();
        }

        return { success: true, error: null, data: result.data };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      setState({
        data: null,
        loading: false,
        error: errorMessage
      });

      if (options.showErrorToast !== false) {
        toast({
          title: 'Error',
          description: options.errorMessage || errorMessage,
          variant: 'destructive'
        });
      }

      return { success: false, error: errorMessage, data: null };
    }
  }, [asyncFunction, options, toast]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
}