'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface ErrorState {
  message: string;
  code?: string;
  details?: unknown;
}

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = useCallback((error: unknown) => {
    let errorState: ErrorState;

    if (error instanceof Error) {
      errorState = {
        message: error.message,
        details: error.stack
      };
    } else if (typeof error === 'string') {
      errorState = { message: error };
    } else {
      errorState = {
        message: 'An unexpected error occurred',
        details: error
      };
    }

    setError(errorState);
    toast.error(errorState.message);
    console.error('[Error Handler]:', errorState);

    return errorState;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
}; 