import { Injectable } from '@angular/core';

export interface SocRocUser {
  username: string;
  roles?: string[];
}

@Injectable({ providedIn: 'root' })
export class SocRocAuthService {
  // Shared keys written by Login-Logout-auth-app
  static readonly TOKEN_KEY = 'mfe_access_token';
  static readonly USER_KEY = 'mfe_user';
  static readonly REFRESH_KEY = 'mfe_refresh_token';

  private readonly AUTH_APP_URL = 'http://localhost:4216'; // move to environment.ts for UAT/Prod

  getToken(): string | null {
    return localStorage.getItem(SocRocAuthService.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): SocRocUser | null {
    const raw = localStorage.getItem(SocRocAuthService.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  getUsername(): string {
    return this.getUser()?.username ?? '';
  }

  clearSession(): void {
    localStorage.removeItem(SocRocAuthService.TOKEN_KEY);
    localStorage.removeItem(SocRocAuthService.REFRESH_KEY);
    localStorage.removeItem(SocRocAuthService.USER_KEY);
  }

  logout(): void {
    this.clearSession();
    const returnUrl = encodeURIComponent(window.location.origin + '/');
    window.location.href = `${this.AUTH_APP_URL}/login?returnUrl=${returnUrl}`;
  }
}