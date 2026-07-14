// libs/ui/src/lib/amex/layout/auth.util.ts

import { inject, signal, Signal, DestroyRef } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

/**
 * AMEX_USER_KEY — localStorage.
 * Holds ONLY non-sensitive UI data (username, roles) for synchronous
 * client-side checks (hasRole(), menu show/hide, guards).
 *
 * The actual JWT access token is NEVER stored client-side anymore.
 * The backend sets it as an HTTP-only "access_token" cookie on
 * login/refresh (see AuthController) — JS cannot read it, and the
 * browser sends it automatically on every request. Real enforcement
 * happens server-side (auth-service + gateway JWT filters); the
 * isAuthenticated()/hasRole() checks below are a UI hint only — a
 * missing/expired cookie will surface as a 401 from the backend,
 * which is the actual source of truth.
 */
export const AMEX_USER_KEY = 'mfe_user';

export class AmexPortalAuthUtil {

  readonly authenticated = signal(this._checkAuth());

  getUser(): { userId?: string; username: string; roles: string[] } | null {
    const raw = localStorage.getItem(AMEX_USER_KEY);
    try { return raw ? JSON.parse(raw) : null; }
    catch { return null; }
  }

  getUsername(): string {
    return this.getUser()?.username ?? '';
  }

  /**
   * UI hint only — true if we have locally-cached user info from a prior
   * login. This does NOT re-verify the cookie is still valid; that check
   * happens server-side on the next API call (a 401 means "not actually
   * authenticated" even if this returns true, e.g. after cookie expiry).
   */
  isAuthenticated(): boolean {
    const result = this._checkAuth();
    this.authenticated.set(result);
    return result;
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    if (!user) return false;
    const normalised = role.startsWith('ROLE_') ? role : `ROLE_${role}`;
    return user.roles?.includes(normalised) || user.roles?.includes(role);
  }

  /**
   * Call this after a successful login/refresh API response.
   * The backend has ALREADY set the HTTP-only access_token cookie via
   * Set-Cookie on that same response — this method only caches
   * non-sensitive user info locally for synchronous UI checks.
   * It intentionally does not accept or store any token.
   */
  onLoginSuccess(userPayload: { userId?: string; username: string; roles: string[] }): void {
    localStorage.setItem(AMEX_USER_KEY, JSON.stringify(userPayload));
    this.authenticated.set(true);
  }

  /**
   * Clears local UI state (username/roles cache).
   * IMPORTANT: this does NOT clear the HTTP-only cookie — only the backend
   * can do that. Callers must first hit /api/auth/logout (which responds
   * with an expired Set-Cookie) and call this afterwards to clear the
   * local UI cache. Calling this alone leaves the cookie active.
   */
  logout(): void {
    localStorage.removeItem(AMEX_USER_KEY);
    this.authenticated.set(false);
  }

  /**
   * Call this in your component's ngOnInit to keep the signal
   * in sync when the shell logs out in another tab / the same session.
   */
  listenToStorageEvents(destroyRef?: DestroyRef): void {
    const handler = (e: StorageEvent) => {
      if (e.key === AMEX_USER_KEY) {
        this.authenticated.set(this._checkAuth());
      }
    };
    window.addEventListener('storage', handler);
    destroyRef?.onDestroy(() => window.removeEventListener('storage', handler));
  }

  private _checkAuth(): boolean {
    return !!this.getUser();
  }
}

export function isPortalAuthenticated(): Signal<boolean> {
  const util = new AmexPortalAuthUtil();
  return util.authenticated;
}

export const portalAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const util   = new AmexPortalAuthUtil();
  if (util.isAuthenticated()) return true;
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};

export const portalRoleGuard: CanActivateFn = (route, state) => {
  const router        = inject(Router);
  const util          = new AmexPortalAuthUtil();
  const requiredRoles = (route.data?.['roles'] ?? []) as string[];
  if (!util.isAuthenticated()) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
  if (!requiredRoles.length) return true;
  if (requiredRoles.some(r => util.hasRole(r))) return true;
  return router.createUrlTree(['/access-denied']);
};

export function checkServiceHealth(
  http: HttpClient,
  url: string
): Observable<{ status: 'UP' | 'DOWN'; responseMs: number }> {
  if (!url) {
    return of({ status: 'DOWN' as const, responseMs: 0 });
  }
  const start = Date.now();
  return http.get<{ status: string }>(url).pipe(
    map(res => ({ status: (res?.status === 'UP' ? 'UP' : 'DOWN') as 'UP' | 'DOWN', responseMs: Date.now() - start })),
    catchError(() => of({ status: 'DOWN' as const, responseMs: Date.now() - start }))
  );
}