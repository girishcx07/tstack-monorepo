import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { getAuth } from '#/lib/auth';

/**
 * Get the current session (nullable). Safe to call in any route's beforeLoad.
 * Returns null if the user is not authenticated.
 */
export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const auth = getAuth();
    const headers = getRequestHeaders();
    return await auth.api.getSession({ headers });
  },
);

/**
 * Require an authenticated session. Throws if user is not logged in.
 * Typically used in protected server functions.
 */
export const ensureSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const auth = getAuth();
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });
    if (!session) {
      throw new Error('Unauthorized');
    }
    return session;
  },
);
