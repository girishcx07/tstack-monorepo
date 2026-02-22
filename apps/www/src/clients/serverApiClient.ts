import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { env } from '#/env';

/**
 * Server-side function to fetch posts with session cookies.
 *
 * On the server, we need to manually forward cookies to the backend API because:
 * 1. There's no browser context to automatically include cookies
 * 2. The request headers contain the session cookies
 * 3. These headers must be forwarded to the backend API
 *
 * Usage in loaders:
 * ```tsx
 * export const Route = createFileRoute('/_protected/posts/')({
 *   loader: () => getServerPosts(),
 * })
 * ```
 */
export const getServerPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders();

    console.log('[getServerPosts] Fetching posts from backend');
    console.log(
      '[getServerPosts] Cookie header:',
      headers.get('cookie')?.substring(0, 80),
    );

    try {
      // Fetch posts directly from the backend API with forwarded cookies
      const postUrl = new URL(
        env.PUBLIC_SERVER_API_PATH,
        env.PUBLIC_SERVER_URL,
      );
      postUrl.pathname += '/posts/all';

      console.log('[getServerPosts] Fetching from:', postUrl.toString());

      const response = await globalThis.fetch(postUrl.toString(), {
        credentials: 'include' as const,
        headers: {
          cookie: headers.get('cookie') || '',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          '[getServerPosts] Response error:',
          response.status,
          errorText,
        );
        throw new Error(
          `API error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log('[getServerPosts] Posts fetched successfully:', data?.length);
      return data;
    } catch (error) {
      console.error('[getServerPosts] Error fetching posts:', error);
      throw error;
    }
  },
);
