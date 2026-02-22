import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import type { getSession } from './lib/session';
import type { QueryClient } from '@tanstack/react-query';
import { queryClient } from './clients/queryClient';
import { routeTree } from './routeTree.gen';
// import { getSession } from '#/lib/auth.server';

export interface RouterContext {
  session: Awaited<ReturnType<typeof getSession>>;
  queryClient: QueryClient;
}

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: {
      session: null,
      queryClient,
    } satisfies RouterContext,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
