import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * ShellAuthAdapterService
 *
 * Thin wrapper around Aruna's AuthService so it satisfies the
 * AMEX_PORTAL_AUTH_ADAPTER contract expected by AmexPageComponent
 * (which needs getUsername(), isAuthenticated(), logout()).
 *
 * We DON'T modify AuthService itself — other parts of the shell
 * already depend on its exact current shape (getUser(), isLoggedIn()
 * as Observable, etc). This adapter just bridges the gap.
 */
@Injectable({ providedIn: 'root' })
export class ShellAuthAdapterService {

  private readonly auth = inject(AuthService);

  getUsername(): string {
    return this.auth.getUser()?.username ?? '';
  }

  isAuthenticated(): boolean {
    return this.auth.hasToken();
  }

  logout(): void {
    this.auth.logout();
  }

  onLoginSuccess(_token: string): void {
    // No-op here — shell's own login page (via AuthService.login())
    // already handles storing the session. This exists only so
    // AmexPageComponent's optional 'onLoginSuccess' check doesn't throw.
  }
}