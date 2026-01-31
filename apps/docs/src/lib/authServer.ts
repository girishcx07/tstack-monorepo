import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { redirect } from '@tanstack/react-router';
import { env } from '@/env';

/**
 * Server-side auth functions for the docs app.
 * These use the main server's auth API to check sessions and handle redirects.
 */

/**
 * Get the current session from the main server by forwarding cookies.
 */
export const getServerSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest();
    const cookie = request?.headers.get('cookie') ?? '';

    const response = await fetch(
      `${env.PUBLIC_SERVER_URL}${env.PUBLIC_SERVER_API_PATH}/auth/get-session`,
      {
        method: 'GET',
        headers: {
          cookie,
        },
        credentials: 'include',
      },
    );

    if (!response.ok) {
      return null;
    }

    const session = await response.json();
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
