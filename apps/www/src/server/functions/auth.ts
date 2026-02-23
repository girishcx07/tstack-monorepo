import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

// We dynamically import `getAuth` inside the handler so that the Vite DEV server
// does not try to resolve `@repo/auth/server` and its node dependencies (like `pg` and `drizzle-orm`)
// when the client imports `getSession`. TanStack Start handles `createServerFn` but Vite's fast
// unbundled dev server can sometimes traverse top-level imports before the transform kicks in.
export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { getAuth } = await import('#/lib/auth');
    const headers = getRequestHeaders();
    const session = await getAuth().api.getSession({ headers });

    return session;
  },
);

export const ensureSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { getAuth } = await import('#/lib/auth');
    const headers = getRequestHeaders();
    const session = await getAuth().api.getSession({ headers });

    if (!session) {
      throw new Error('Unauthorized');
    }

    return session;
  },
);
