import { createAuth, tanstackStartCookies } from '@repo/auth/server';
import { createDb } from '@repo/db/client';

import { env } from '#/env';

const db = createDb({ databaseUrl: env.DB_POSTGRES_URL });

/**
 * Server-side Better Auth instance for the www TanStack Start app.
 *
 * Uses `createAuth` from `@repo/auth/server` — the shared factory that sets up
 * the Drizzle adapter, session cookie cache, and email/password auth.
 *
 * `tanstackStartCookies` is injected here (not in the shared package) because
 * it is a TanStack Start–specific plugin that belongs at the app layer.
 *
 * IMPORTANT: `tanstackStartCookies` must always be the LAST plugin in the array.
 */
export const auth = createAuth({
  trustedOrigins: [new URL(env.PUBLIC_WEB_URL).origin],
  serverUrl: env.PUBLIC_WEB_URL,
  apiPath: '/api',
  authSecret: env.SERVER_AUTH_SECRET,
  db,
  plugins: [tanstackStartCookies()],
});
