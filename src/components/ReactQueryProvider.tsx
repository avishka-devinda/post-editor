'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
// Initialze the client
const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
