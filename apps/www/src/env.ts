import * as v from 'valibot';

export const envSchema = v.object({
  // Backend API server (Hono)
  VITE_PUBLIC_SERVER_URL: v.pipe(v.string(), v.url()),
  VITE_PUBLIC_SERVER_API_PATH: v.optional(
    v.custom<`/${string}`>(
      (input) => typeof input === 'string' && input.startsWith('/'),
      'API Path must start with "/" if provided.',
    ),
    '/api',
  ),

  // This app's public URL (safe on client)
  VITE_PUBLIC_WEB_URL: v.pipe(v.string(), v.url()),
});

export const env = v.parse(envSchema, import.meta.env);
