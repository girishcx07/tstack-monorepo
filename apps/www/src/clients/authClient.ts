import { createAuthClient as createBetterAuthClient } from 'better-auth/react';

/**
 * Client-side Better Auth client for the www app.
 * Points to this app's own auth endpoint (/api/auth/*).
 */
export const authClient = createBetterAuthClient({
  baseURL:
    typeof window !== 'undefined'
      ? `${window.location.origin}/api/auth`
      : process.env.BETTER_AUTH_URL,
});

export type AuthSession =
  | ReturnType<typeof createBetterAuthClient>['$Infer']['Session']
  | null;
