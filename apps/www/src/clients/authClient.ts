import { createAuthClient as createBetterAuthClient } from 'better-auth/react';
import { env } from '#/env';

/**
 * Client-side Better Auth client for the www app.
 * Points to this app's own auth endpoint (/api/auth/*).
 */
export const authClient = createBetterAuthClient({
  baseURL: env.BETTER_AUTH_URL,
});

export type AuthSession =
  | ReturnType<typeof createBetterAuthClient>['$Infer']['Session']
  | null;
