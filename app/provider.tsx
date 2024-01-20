"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 1000,
       refetchOnWindowFocus: false, // default: true

    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {children}
              <ReactQueryDevtools initialIsOpen={false} />

        </QueryClientProvider>
    </ChakraProvider>
  );
}
