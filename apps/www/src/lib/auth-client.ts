import { createAuthClient } from '@repo/auth/client';

export const authClient = createAuthClient({
  apiBaseUrl: import.meta.env.VITE_BETTER_AUTH_URL || 'http://localhost:3000',
  apiBasePath: '/api',
});

export type AuthSession =
  | ReturnType<typeof createAuthClient>['$Infer']['Session']
  | null;
