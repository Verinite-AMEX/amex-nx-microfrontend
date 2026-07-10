import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface OmsUser {
  userId: string;
  username: string;
  email: string;
  fullName: string;
  avatarInitials: string;
  roles: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ForgotPasswordRequest {
  username: string;
  email: string;
}

export interface SecurityAnswersRequest {
  username: string;
  email: string;
  answers: string[];
}

export interface ChangeExpiredPasswordRequest {
  username: string;
  oldPassword: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class OmsAuthService {

  // ─── NEW — shared keys written by Login-Logout-auth-app ──────────────────
  static readonly TOKEN_KEY   = 'mfe_access_token';
  static readonly USER_KEY    = 'mfe_user';
  static readonly REFRESH_KEY = 'mfe_refresh_token';

  private readonly API = 'http://localhost:8080/api/auth';
  private readonly AUTH_APP_URL = 'http://localhost:4216'; // move to environment.ts for UAT/Prod

  constructor(private http: HttpClient) {}

  // ─── API Calls ────────────────────────────────────────────────────────────

  // ─── NEW LOGOUT — delegates to Login-Logout-auth-app ──────────────────────
  logout(): void {
    this.clearSession();
   const returnUrl = encodeURIComponent(window.location.origin + '/');
  window.location.href = `${this.AUTH_APP_URL}/login?returnUrl=${returnUrl}`;
  }

  clearSession(): void {
    localStorage.removeItem(OmsAuthService.TOKEN_KEY);
    localStorage.removeItem(OmsAuthService.REFRESH_KEY);
    localStorage.removeItem(OmsAuthService.USER_KEY);
  }

  // ─── Getters ─────────────────────────────────────────────────────────────

  getToken(): string | null {
    return localStorage.getItem(OmsAuthService.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(OmsAuthService.REFRESH_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): OmsUser | null {
    const raw = localStorage.getItem(OmsAuthService.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  getRoles(): string[] {
    return this.getUser()?.roles ?? [];
  }

  hasRole(...roles: string[]): boolean {
    const userRoles = this.getRoles();
    return roles.some(r => userRoles.includes(r));
  }

  // ─── OMS Role Checks ─────────────────────────────────────────────────────

  isMerchant(): boolean {
    return this.hasRole('ROLE_MERCHANT_USER', 'ROLE_CORP_MASTER_ADMIN');
  }

  isMrmUser(): boolean {
    return this.hasRole('ROLE_MRM_USER');
  }

  isOmsAdmin(): boolean {
    return this.hasRole('ROLE_OMS_ADMIN');
  }

  isOmsSubUser(): boolean {
    return this.hasRole('ROLE_OMS_SUB_USER');
  }

  isOmsVatUser(): boolean {
    return this.hasRole('ROLE_OMS_VAT_USER');
  }

}