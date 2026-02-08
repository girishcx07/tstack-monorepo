import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { redirect } from '@tanstack/react-router';
import { auth } from '@/lib/auth';
import { env } from '@/env';

/**
 * Server-side auth functions for the docs app.
 * Uses direct auth API for session management with proper cookie handling.
 */

/**
 * Get the current session using direct auth API.
 */
export const getServerSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest();
    const headers = request?.headers ?? new Headers();

    const session = await auth.api.getSession({ headers });
    return session ?? null;
  },
);

/**
 * Server function to require authentication.
 * Redirects to the login page if the user is not authenticated.
 */
export const requireAuth = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await getServerSession();

    if (!session?.user) {
      // Redirect to login with a return URL back to docs app
      const loginUrl = new URL('/demo/better-auth', env.PUBLIC_DOCS_URL);
      loginUrl.searchParams.set('redirect', env.PUBLIC_DOCS_URL);
      throw redirect({ href: loginUrl.toString() });
    }

    return session;
  },
);

/**
 * Server function to redirect authenticated users away from auth pages.
 * Useful for login/signup pages.
 * @param redirectTo - URL to redirect to if authenticated (defaults to docs URL)
 */
export const redirectIfAuthenticated = createServerFn({ method: 'GET' })
  .inputValidator((redirectTo: string) => redirectTo)
  .handler(async ({ data: redirectTo }) => {
    const session = await getServerSession();

    if (session?.user) {
      throw redirect({ href: redirectTo || env.PUBLIC_DOCS_URL });
    }

    return null;
  });

/**
 * Type export for session from server functions
 */
export type ServerSession = Awaited<ReturnType<typeof getServerSession>>;
