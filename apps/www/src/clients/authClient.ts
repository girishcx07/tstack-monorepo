import { createAuthClient as createRepoAuthClient } from '@repo/auth/client';

/**
 * Client-side Better Auth client for the www app.
 * Points to this app's own auth endpoint (/api/auth/*).
 */
export const authClient = createRepoAuthClient({
  apiBaseUrl:
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.VITE_PUBLIC_WEB_URL || 'http://localhost:3002',
  apiBasePath: '/api',
});

export type AuthSession = typeof authClient.$Infer.Session | null;
