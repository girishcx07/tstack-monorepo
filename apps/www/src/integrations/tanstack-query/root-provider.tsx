import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface RootContext {
  session: null;
  queryClient: QueryClient;
}

let context: RootContext | undefined;

export function getContext() {
  if (context) {
    return context;
  }

  const queryClient = new QueryClient();

  context = {
    session: null,
    queryClient,
  };

  return context;
}

export default function TanStackQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { queryClient } = getContext();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
