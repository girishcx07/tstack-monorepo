import { type BetterAuthOptions, betterAuth } from 'better-auth';

import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import urlJoin from 'url-join';
import type { DatabaseInstance } from '@repo/db/client';
export { tanstackStartCookies } from 'better-auth/tanstack-start';

export interface AuthOptions {
  /**
   * All trusted frontend origins. Pass origin strings (e.g. "http://localhost:3000").
   * Supports multiple apps sharing the same server (e.g. web SPA + www SSR).
   */
  trustedOrigins: string[];
  serverUrl: string;
  apiPath: `/${string}`;
  authSecret: string;
  db: DatabaseInstance;
  /**
   * Optional extra plugins appended after the base plugins.
   * Use this to inject framework-specific plugins (e.g. tanstackStartCookies)
   * without coupling this shared package to any one framework.
   */
  plugins?: BetterAuthOptions['plugins'];
}

export type AuthInstance = ReturnType<typeof createAuth>;

/**
 * This function is abstracted for schema generations in cli-config.ts
 */
export const getBaseOptions = (db: DatabaseInstance) =>
  ({
    database: drizzleAdapter(db, {
      provider: 'pg',
    }),

    /**
     * Only uncomment the line below if you are using plugins, so that
     * your types can be correctly inferred:
     */
    plugins: [openAPI()],
  }) satisfies BetterAuthOptions;

export const createAuth = ({
  trustedOrigins,
  serverUrl,
  apiPath,
  db,
  authSecret,
  plugins: extraPlugins,
}: AuthOptions) => {
  const base = getBaseOptions(db);
  return betterAuth({
    ...base,
    plugins: [...(base.plugins ?? []), ...(extraPlugins ?? [])],
    baseURL: urlJoin(serverUrl, apiPath, 'auth'),
    secret: authSecret,
    trustedOrigins,
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
    },
  });
};
