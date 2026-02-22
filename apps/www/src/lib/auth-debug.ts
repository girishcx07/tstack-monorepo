/**
 * Auth Debugging Utilities
 * 
 * Use these functions to diagnose cookie and session issues
 */

import { authClient } from '#/clients/authClient';
import { getSession } from '#/lib/session';

/**
 * Check if cookies are being set in the browser
 */
export function debugCookies() {
  if (typeof document === 'undefined') {
    console.log('[debugCookies] Running on server');
    return;
  }

  console.log('=== Cookie Debug Info ===');
  console.log('Cookies:', document.cookie);
  console.log('Location Origin:', window.location.origin);
  console.log('Location Protocol:', window.location.protocol);
  console.log('');

  // Parse cookies
  const cookies = document.cookie.split(';').map((c) => c.trim());
  console.log('Parsed Cookies:');
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    console.log(`  ${name}: ${value?.substring(0, 20)}...`);
  });
  console.log('========================');
}

/**
 * Check client-side auth state
 */
export async function debugAuthClient() {
  console.log('[debugAuthClient] Checking client-side auth state...');

  try {
    const session = await authClient.getSession();
    console.log('[debugAuthClient] Client session:', session);
    return session;
  } catch (error) {
    console.error('[debugAuthClient] Error:', error);
    return null;
  }
}

/**
 * Check server-side session state
 */
export async function debugServerSession() {
  console.log('[debugServerSession] Checking server-side session...');

  try {
    const session = await getSession();
    console.log('[debugServerSession] Server session:', session);
    return session;
  } catch (error) {
    console.error('[debugServerSession] Error:', error);
    return null;
  }
}

/**
 * Full auth state diagnosis
 */
export async function debugAuthState() {
  console.log('=== FULL AUTH STATE DIAGNOSIS ===');
  console.log('');

  // Browser cookies
  debugCookies();
  console.log('');

  // Client-side state
  const clientSession = await debugAuthClient();
  console.log('');

  // Server-side state
  const serverSession = await debugServerSession();
  console.log('');

  // Summary
  console.log('=== SUMMARY ===');
  console.log('Client authenticated:', !!clientSession?.data);
  console.log('Server authenticated:', !!serverSession?.user);
  if (clientSession?.data && serverSession?.session) {
    console.log(
      'Sessions match:',
      clientSession.data.session?.id === serverSession.session?.id,
    );
  }
  console.log('=======================');

  return { clientSession, serverSession };
}

/**
 * Test login flow and diagnose issues
 */
export async function testLoginFlow(email: string, password: string) {
  console.log(`[testLoginFlow] Testing login with ${email}`);

  try {
    console.log('[testLoginFlow] 1. Before login:');
    await debugAuthState();

    console.log('[testLoginFlow] 2. Attempting sign in...');
    const result = await authClient.signIn.email({ email, password });

    if (result.error) {
      console.error('[testLoginFlow] Login error:', result.error);
      return { success: false, error: result.error };
    }

    console.log('[testLoginFlow] Login successful');
    console.log('[testLoginFlow] 3. After login:');
    await debugAuthState();

    return { success: true };
  } catch (error) {
    console.error('[testLoginFlow] Unexpected error:', error);
    return { success: false, error };
  }
}

/**
 * Test API call and diagnose session errors
 */
export async function testApiCall() {
  console.log('[testApiCall] Testing API call...');

  try {
    const response = await fetch(
      `${window.location.origin}/api/posts`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('[testApiCall] Response status:', response.status);
    console.log('[testApiCall] Response headers:');
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    const data = await response.json();
    console.log('[testApiCall] Response data:', data);

    return { success: response.ok, status: response.status, data };
  } catch (error) {
    console.error('[testApiCall] Error:', error);
    return { success: false, error };
  }
}

/**
 * Log auth events
 * Call this to monitor auth state changes
 */
export function monitorAuthChanges() {
  console.log('[monitorAuthChanges] Monitoring auth state changes...');

  // Check session status every 5 seconds
  const interval = setInterval(async () => {
    const serverSession = await getSession();
    if (serverSession) {
      console.log('[monitorAuthChanges] ✓ Session active:', serverSession.user.email);
    } else {
      console.log('[monitorAuthChanges] ✗ No session');
    }
  }, 5000);

  // Return function to stop monitoring
  return () => {
    clearInterval(interval);
    console.log('[monitorAuthChanges] Stopped monitoring');
  };
}

/**
 * Export all debug functions for use in console
 * Usage in browser console:
 * 
 * import { debugAuthState, testLoginFlow } from '#/lib/auth-debug';
 * 
 * await debugAuthState();
 * await testLoginFlow('test@example.com', 'password');
 */
export const authDebug = {
  debugCookies,
  debugAuthClient,
  debugServerSession,
  debugAuthState,
  testLoginFlow,
  testApiCall,
  monitorAuthChanges,
};
