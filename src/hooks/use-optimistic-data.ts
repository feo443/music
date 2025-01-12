'use client';

import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useErrorHandler } from './use-error-handler';

interface OptimisticOptions<T> {
  queryKey: string[];
  mutationFn: (data: T) => Promise<T>;
  onSuccess?: (data: T) => void;
  invalidateQueries?: string[][];
}

export function useOptimisticData<T>({
  queryKey,
  mutationFn,
  onSuccess,
  invalidateQueries = [],
}: OptimisticOptions<T>) {
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const mutation = useMutation({
    mutationFn,
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, newData);

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (err, newData, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(queryKey, context?.previousData);
      handleError(err);
    },
    onSuccess: async (data) => {
      // Invalidate and refetch related queries
      for (const queryKey of invalidateQueries) {
        await queryClient.invalidateQueries({ queryKey });
      }
      onSuccess?.(data);
    },
  });

  return mutation;
} 