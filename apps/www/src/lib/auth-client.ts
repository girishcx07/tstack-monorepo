import { env } from '#/env';
import { createAuthClient } from '@repo/auth/client';

export const authClient = createAuthClient({
  apiBaseUrl: env.PUBLIC_WEB_URL,
  apiBasePath: '/api',
});
