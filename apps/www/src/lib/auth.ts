import { createAuth, tanstackStartCookies } from '@repo/auth/server';
import { createDb } from '@repo/db/client';

import { getServerEnv } from '#/env.server';

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
type AuthInstance = ReturnType<typeof createAuth>;

let cachedAuth: AuthInstance | null = null;

export function getAuth(): AuthInstance {
  if (cachedAuth) {
    return cachedAuth;
  }

  const env = getServerEnv();
  console.log(
    '[getAuth] Creating auth instance with DB:',
    env.DB_POSTGRES_URL.split('@')[1],
  );
  const db = createDb({ databaseUrl: env.DB_POSTGRES_URL });

  cachedAuth = createAuth({
    trustedOrigins: [
      new URL(env.VITE_PUBLIC_WEB_URL).origin,
      new URL(env.VITE_PUBLIC_SERVER_URL).origin,
    ],
    serverUrl: env.VITE_PUBLIC_WEB_URL,
    apiPath: '/api',
    authSecret: env.SERVER_AUTH_SECRET,
    db,
    plugins: [tanstackStartCookies()],
  });

  return cachedAuth;
}
