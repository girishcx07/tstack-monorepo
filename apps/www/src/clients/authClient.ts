import { createAuthClient as createRepoAuthClient } from '@repo/auth/client';

/**
 * Client-side Better Auth client for the www app.
 * Points to this app's own auth endpoint (/api/auth/*).
 *
 * Security & best practices:
 * - Uses 'include' credentials to send auth cookies with requests
 * - Automatically manages session cookies via the auth API
 * - Works seamlessly with server-side session validation
 * - Client can check authentication state without external calls
 *
 * Session data returned from server-side functions (getSession, ensureSession)
 * is considered the source of truth. Client-side auth checks are for UX only.
 */
export const authClient = createRepoAuthClient({
  apiBaseUrl:
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.VITE_PUBLIC_WEB_URL || 'http://localhost:3082',
  apiBasePath: '/api',
});

export type AuthSession = typeof authClient.$Infer.Session | null;

/**
 * Helper to check if a session exists (client-side check)
 * Note: This is optimistic - the server is the source of truth.
 * Use getSession() from lib/session.ts for server-side validation.
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const session = await authClient.getSession();
    return !!session;
  } catch {
    return false;
  }
}
