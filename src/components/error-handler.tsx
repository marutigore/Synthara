'use client';

import { useEffect } from 'react';

export function ErrorHandler() {
  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const errorName = reason?.name || '';
      const errorMessage = reason?.message || String(reason || '');

      // Suppress standard offline / unauthenticated state notifications in dev mode
      if (
        errorName === 'AuthSessionMissingError' ||
        errorName === 'AuthRetryableFetchError' ||
        errorName === 'AuthApiError' ||
        errorMessage.includes('Auth session missing') ||
        errorMessage.includes('Failed to fetch')
      ) {
        event.preventDefault();
        return;
      }

      // Prevent the default browser crash
      event.preventDefault();

      // Log other error details for debugging
      if (reason instanceof Error) {
        console.warn('Unhandled promise rejection:', {
          message: reason.message,
          name: reason.name,
        });
      }
    };

    // Handle uncaught errors
    const handleError = (event: ErrorEvent) => {
      const error = event.error;
      const errorName = error?.name || '';
      const errorMessage = error?.message || event.message || '';

      if (
        errorName === 'AuthSessionMissingError' ||
        errorName === 'AuthRetryableFetchError' ||
        errorName === 'AuthApiError' ||
        errorMessage.includes('Auth session missing') ||
        errorMessage.includes('Failed to fetch')
      ) {
        event.preventDefault();
        return;
      }

      if (error instanceof Error) {
        console.warn('Handled uncaught error:', error.message);
      }
    };

    // Add event listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    // Cleanup
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return null;
}
