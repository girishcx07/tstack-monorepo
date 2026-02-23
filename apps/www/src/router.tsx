import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import {
  getContext,
  RootContext,
} from './integrations/tanstack-query/root-provider';

export type RouterContext = RootContext;

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: getContext() satisfies RouterContext,
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
