import * as v from 'valibot';

const DEFAULT_WWW_PORT = 3001;

const createPortSchema = ({ defaultPort }: { defaultPort: number }) =>
  v.pipe(
    v.optional(v.string(), `${defaultPort}`),
    v.transform((s) => parseInt(s, 10)),
    v.integer(),
    v.minValue(0),
    v.maxValue(65535),
  );

export const envSchema = v.object({
  WWW_PORT: createPortSchema({ defaultPort: DEFAULT_WWW_PORT }),

  // Database — used for the www app's own Better Auth instance
  DB_POSTGRES_URL: v.pipe(v.string(), v.minLength(1)),

  // Better Auth
  SERVER_AUTH_SECRET: v.pipe(v.string(), v.minLength(32)),

  // Backend API server (Hono) — used for other API calls
  PUBLIC_SERVER_URL: v.pipe(v.string(), v.url()),
  PUBLIC_SERVER_API_PATH: v.optional(
    v.custom<`/${string}`>(
      (input) => typeof input === 'string' && input.startsWith('/'),
      'API Path must start with "/" if provided.',
    ),
    '/api',
  ),

  // This app's public URL
  PUBLIC_WEB_URL: v.pipe(v.string(), v.url()),
});

export const env = v.parse(envSchema, process.env);
