import { createTanstackQueryAPIClient } from '@repo/api/client';
import { env } from '#/env';

export const apiClient = createTanstackQueryAPIClient({
  serverUrl: env.VITE_PUBLIC_SERVER_URL,
  apiPath: env.VITE_PUBLIC_SERVER_API_PATH,
});
