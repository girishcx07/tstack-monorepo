import { createFileRoute } from '@tanstack/react-router';
import { auth } from '#/lib/auth';

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.log('API AUTH GET:', request.url);
        return auth.handler(request);
      },
      POST: async ({ request }) => {
        console.log('API AUTH POST:', request.url);
        return auth.handler(request);
      },
    },
  },
});
