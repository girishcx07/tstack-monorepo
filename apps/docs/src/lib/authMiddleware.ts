import { redirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { auth } from '@/lib/auth';

/**
 * Middleware to protect routes requiring authentication.
 * Redirects to login page if user is not authenticated.
 *
 * Usage:
 * ```ts
 * export const Route = createFileRoute('/protected')({
 *   component: ProtectedComponent,
 *   server: {
 *     middleware: [authMiddleware],
 *   },
 * })
 * ```
 */
export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw redirect({ to: '/demo/better-auth' });
  }

  return await next({
    context: {
      session,
    },
  });
});

/**
 * Middleware to redirect authenticated users away from auth pages.
 * Useful for login/signup pages to redirect logged-in users.
 *
 * Usage:
 * ```ts
 * export const Route = createFileRoute('/login')({
 *   component: LoginComponent,
 *   server: {
 *     middleware: [guestMiddleware],
 *   },
 * })
 * ```
 */
export const guestMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });

  if (session) {
    throw redirect({ to: '/' });
  }

  return await next();
});
