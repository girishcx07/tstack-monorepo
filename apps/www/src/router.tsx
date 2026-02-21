import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import type { AuthSession } from './lib/auth-client';

export interface RouterContext {
  session: AuthSession;
}

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {
      session: null,
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
