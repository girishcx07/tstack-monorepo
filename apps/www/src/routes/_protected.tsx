import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { getSession } from '../lib/session';

/**
 * Protected route wrapper that enforces authentication.
 *
 * Any route under /_protected will require a valid session.
 * Unauthenticated users are redirected to /login with their original destination
 * saved so they can be redirected back after login.
 *
 * Best practices applied:
 * - Session validation happens server-side in beforeLoad
 * - Original location is preserved for post-login redirect
 * - No sensitive data is exposed to the client
 * - Session validation errors are handled gracefully
 */
export const Route = createFileRoute('/_protected')({
  beforeLoad: async ({ location }) => {
    try {
      const session = await getSession();

      if (!session) {
        // No session - redirect to login with return URL
        console.debug('[_protected] No session found, redirecting to login', {
          from: location.pathname,
        });
        throw redirect({
          to: '/login',
          search: {
            redirect: `${location.pathname}${location.searchStr}`,
            tab: 'signin',
          },
        });
      }

      // Session is valid - attach to context for child routes
      return { session };
    } catch (error) {
      // If it's already a redirect, let it through
      if (
        error instanceof Error &&
        error.message.includes('redirect')
      ) {
        throw error;
      }

      // Any other error during session validation
      console.error('[_protected] Session validation error:', error);
      throw redirect({
        to: '/login',
        search: {
          redirect: `${location.pathname}${location.searchStr}`,
          tab: 'signin',
        },
      });
    }
  },
  component: () => <Outlet />,
});
