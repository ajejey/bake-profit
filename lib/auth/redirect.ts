/**
 * Utility functions for handling redirects in auth flows
 */

/**
 * Generate a login URL with redirect parameter
 * @param redirectTo - The URL to redirect to after login
 * @returns Login URL with redirect parameter
 */
export function getLoginUrlWithRedirect(redirectTo: string): string {
  if (!redirectTo.startsWith('/')) {
    return '/login';
  }
  const params = new URLSearchParams({ redirect: redirectTo });
  return `/login?${params.toString()}`;
}

/**
 * Generate a signup URL with redirect parameter
 * @param redirectTo - The URL to redirect to after signup
 * @returns Signup URL with redirect parameter
 */
export function getSignupUrlWithRedirect(redirectTo: string): string {
  if (!redirectTo.startsWith('/')) {
    return '/signup';
  }
  const params = new URLSearchParams({ redirect: redirectTo });
  return `/signup?${params.toString()}`;
}

/**
 * Validate if a redirect URL is safe
 * @param url - The URL to validate
 * @returns True if the URL is safe to redirect to
 */
export function isValidRedirectUrl(url: string): boolean {
  // Only allow relative URLs starting with /
  return typeof url === 'string' && url.startsWith('/') && !url.includes('//');
}
