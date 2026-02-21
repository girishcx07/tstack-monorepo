import { createAuth } from '@repo/auth/server';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
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
  trustedOrigins: [new URL(env.BETTER_AUTH_URL).origin],
  serverUrl: env.BETTER_AUTH_URL,
  apiPath: '/api/auth',
  authSecret: env.BETTER_AUTH_SECRET,
  db,
  plugins: [tanstackStartCookies()],
});
