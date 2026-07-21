import { Injectable, inject } from '@angular/core';
import { SessionService, AuthApiService } from '@amex/shared-services';

/**
 * ShellAuthAdapterService
 *
 * Bridges the AMEX_PORTAL_AUTH_ADAPTER contract expected by
 * AmexPageComponent (getUsername(), logout()) to the shared
 * SessionService / AuthApiService — same source of truth as
 * BTA/SOC-ROC/OMS now use.
 */
@Injectable({ providedIn: 'root' })
export class ShellAuthAdapterService {

  private readonly sessionService = inject(SessionService);

  private readonly authApi = inject(AuthApiService);

  getUsername(): string {
    return this.sessionService.getCurrentUser()?.username ?? '';
  }

  isAuthenticated(): boolean {
    return this.sessionService.isLoggedIn() || this.authApi.isUserAuthenticated();
  }

  logout(): void {
    this.authApi.performLogout().subscribe();
  }

  onLoginSuccess(_token: string): void {
    // No-op here — AuthApiService.login()/register() already populates
    // SessionService / AmexPortalAuthUtil on success. This exists only so
    // AmexPageComponent's optional 'onLoginSuccess' check doesn't throw.
  }
}