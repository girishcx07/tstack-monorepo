import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { getAuth } from '#/lib/auth';

/**
 * Session result with user and session data
 * Validates that session contains required fields
 */
export interface SessionResult {
  user: {
    id: string;
    email: string;
    name: string | null;
    emailVerified: boolean;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    ipAddress?: string;
    userAgent?: string;
  };
}

/**
 * Get the current session (nullable). Safe to call in any route's beforeLoad.
 * Returns null if the user is not authenticated.
 *
 * @throws Error if auth instance fails to validate session
 * @returns Session with user and session data, or null if not authenticated
 */
export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    try {
      const auth = getAuth();
      const headers = getRequestHeaders();

      console.log('[getSession] Fetching session...');
      console.log('[getSession] Cookie header:', headers.get('cookie')?.substring(0, 50));

      const result = await auth.api.getSession({ headers });

      if (!result) {
        console.log('[getSession] No session found (null result)');
        return null;
      }

      console.log('[getSession] Session found:', {
        userId: result.user?.id,
        email: result.user?.email,
        sessionId: result.session?.id,
      });

      // Validate session structure
      if (
        !result.user?.id ||
        !result.user?.email ||
        !result.session?.id ||
        !result.session?.userId
      ) {
        console.warn('[getSession] Invalid session structure:', {
          hasUser: !!result.user,
          hasSession: !!result.session,
          userFields: result.user
            ? { id: !!result.user.id, email: !!result.user.email }
            : null,
        });
        return null;
      }

      return result;
    } catch (error) {
      console.error('[getSession] Error fetching session:', error);
      // Return null on auth errors rather than throwing
      // This allows graceful handling of auth service failures
      return null;
    }
  },
);

/**
 * Require an authenticated session. Throws if user is not logged in.
 * Typically used in protected server functions and data loaders.
 *
 * @throws Error with message 'Unauthorized' if session is invalid or missing
 * @returns Valid session with user data
 */
export const ensureSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const auth = getAuth();
    const headers = getRequestHeaders();

    try {
      const session = await auth.api.getSession({ headers });

      if (!session) {
        const error = new Error('Unauthorized: No valid session found');
        (error as any).statusCode = 401;
        throw error;
      }

      // Validate required fields
      if (
        !session.user?.id ||
        !session.user?.email ||
        !session.session?.id ||
        !session.session?.userId
      ) {
        const error = new Error(
          'Unauthorized: Invalid session structure',
        );
        (error as any).statusCode = 401;
        throw error;
      }

      // Verify session hasn't expired
      if (
        session.session.expiresAt &&
        new Date(session.session.expiresAt) < new Date()
      ) {
        const error = new Error('Unauthorized: Session expired');
        (error as any).statusCode = 401;
        throw error;
      }

      return session;
    } catch (error) {
      if (error instanceof Error && (error as any).statusCode === 401) {
        throw error;
      }
      const authError = new Error('Unauthorized: Session validation failed');
      (authError as any).statusCode = 401;
      throw authError;
    }
  },
);

/**
 * Get the current user ID from session. Returns null if not authenticated.
 * Useful for data queries that need userId context.
 */
export const getUserId = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await getSession();
    return session?.user?.id ?? null;
  },
);

/**
 * Ensure user is authenticated and return their ID.
 * Throws if not authenticated.
 */
export const ensureUserId = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await ensureSession();
    return session.user.id;
  },
);
