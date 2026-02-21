import { createFileRoute } from '@tanstack/react-router';
import '@tanstack/react-start/server';

import { auth } from '@repo/auth/cli-config';

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        return auth.handler(request);
      },
      POST: async ({ request }: { request: Request }) => {
        return auth.handler(request);
      },
    },
  },
});
