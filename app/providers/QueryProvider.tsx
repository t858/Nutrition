"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * QueryProvider component
 *
 * Wraps the application with TanStack Query's QueryClientProvider.
 * Provides React Query functionality throughout the app.
 *
 * Includes React Query Devtools in development mode for debugging.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance for each app instance
  // This ensures we don't share state between different users/sessions
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: how long data is considered fresh
            staleTime: 60 * 1000, // 1 minute
            // Cache time: how long unused data stays in cache
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            // Retry failed requests
            retry: 1,
            // Refetch on window focus
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
