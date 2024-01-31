"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux';
import { store } from "@/services/store";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // staleTime:1000 *60,
       refetchOnWindowFocus: false, // default: true

    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        {children}
        </Provider>
              <ReactQueryDevtools initialIsOpen={false} />

        </QueryClientProvider>
    </ChakraProvider>
  );
}
