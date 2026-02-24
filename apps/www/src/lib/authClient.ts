import { env } from '#/env';
import { createAuthClient } from '@repo/auth/client';

export const authClient = createAuthClient({
  apiBaseUrl: env.PUBLIC_SERVER_URL,
  apiBasePath: env.PUBLIC_SERVER_API_PATH,
});

export type AuthSession =
  | ReturnType<typeof createAuthClient>['$Infer']['Session']
  | null;
