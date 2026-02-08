import { createDb } from '@repo/db/client';
import { createAuth } from '@repo/auth/server';
import { env } from '@/env';

/**
 * Auth instance for direct TanStack Start integration.
 * Uses tanstackStartCookies plugin for automatic cookie handling.
 */
export const auth = createAuth({
  db: createDb(),
  serverUrl: env.PUBLIC_DOCS_URL,
  apiPath: '/api',
  authSecret: import.meta.env.BETTER_AUTH_SECRET,
  webUrls: [env.PUBLIC_DOCS_URL],
  tanstackStart: true,
});
