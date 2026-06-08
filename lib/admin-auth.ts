/**
 * Admin session utility — simple client-side auth.
 * Uses sessionStorage so the session expires when the tab closes.
 * Replace with proper auth (NextAuth, Clerk, etc.) when ready for production.
 */

const ADMIN_SESSION_KEY = 'bs_admin_session';
// Simple credential check — replace with env vars or proper auth
const ADMIN_PASSWORD = 'BinaryScouts2025!';

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    }
    return true;
  }
  return false;
}

export function adminLogout(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
}
