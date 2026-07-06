import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
//import { mockSubmitSecurityAnswers } from '../../pages/mocks/auth.service.mock';

export interface BtaUser {
  userId: string;
  username: string;
  email: string;
  fullName: string;
  avatarInitials: string;
  // accessToken: string;
  // refreshToken: string;
  // tokenType: string;
  // expiresIn: number;
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
export class BtaAuthService {
  // static readonly TOKEN_KEY   = 'mfe_token';
  // static readonly USER_KEY    = 'mfe_user';
  // static readonly REFRESH_KEY = 'mfe_refresh';

  // ─── NEW — shared keys written by Login-Logout-auth-app ──────────────────
  static readonly TOKEN_KEY   = 'mfe_access_token';
  static readonly USER_KEY    = 'mfe_user';
  static readonly REFRESH_KEY = 'mfe_refresh_token';

  private readonly API = 'http://localhost:8080/api/auth';
  private readonly AUTH_APP_URL = 'http://localhost:4216'; // move to environment.ts for UAT/Prod

  constructor(private http: HttpClient) {}

  // ─── API Calls ────────────────────────────────────────────────────────────

  // login(request: LoginRequest): Observable<any> {
  //   return this.http.post<any>(`${this.API}/login`, request).pipe(
  //     tap(res => {
  //       const user: BtaUser = res.data;
  //       this.saveSession(user);
  //     })
  //   );
  // }

  // logout(): Observable<any> {
  //   const token = this.getToken();
  //   return this.http.post<any>(
  //     `${this.API}/logout`, {},
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   ).pipe(
  //     tap(() => this.clearSession())
  //   );
  // }

  // forgotPassword(request: ForgotPasswordRequest): Observable<any> {
  //   return this.http.post<any>(`${this.API}/forgot-password`, request);
  // }

  // ─── MOCKED: backend /api/auth/reset-password not ready yet ──────────────
  // TODO: Replace with real call when backend is ready:
  // return this.http.post<any>(`${this.API}/reset-password`, request);
  // submitSecurityAnswers(request: SecurityAnswersRequest): Observable<any> {
  //   return mockSubmitSecurityAnswers(request);
  // }

  // // ─── Change expired password ──────────────────────────────────────────────
  // changeExpiredPassword(request: ChangeExpiredPasswordRequest): Observable<any> {
  //   return this.http.post<any>(`${this.API}/change-expired-password`, request);
  // }

  // refreshToken(): Observable<any> {
  //   const refresh = this.getRefreshToken();
  //   return this.http.post<any>(`${this.API}/refresh`, { refreshToken: refresh }).pipe(
  //     tap(res => {
  //       const user: BtaUser = res.data;
  //       this.saveSession(user);
  //     })
  //   );
  // }

  // // ─── Session Helpers ─────────────────────────────────────────────────────

  // private saveSession(user: BtaUser): void {
  //   localStorage.setItem(BtaAuthService.TOKEN_KEY,   user.accessToken);
  //   localStorage.setItem(BtaAuthService.REFRESH_KEY, user.refreshToken);
  //   localStorage.setItem(BtaAuthService.USER_KEY,    JSON.stringify(user));
  // }

  // ─── NEW LOGOUT — delegates to Login-Logout-auth-app ──────────────────────
  logout(): void {
    this.clearSession();
   const returnUrl = encodeURIComponent(window.location.origin + '/');
  window.location.href = `${this.AUTH_APP_URL}/login?returnUrl=${returnUrl}`;
  }

  clearSession(): void {
    localStorage.removeItem(BtaAuthService.TOKEN_KEY);
    localStorage.removeItem(BtaAuthService.REFRESH_KEY);
    localStorage.removeItem(BtaAuthService.USER_KEY);
  }

  // ─── Getters ─────────────────────────────────────────────────────────────

  getToken(): string | null {
    return localStorage.getItem(BtaAuthService.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(BtaAuthService.REFRESH_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): BtaUser | null {
    const raw = localStorage.getItem(BtaAuthService.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  getRoles(): string[] {
    return this.getUser()?.roles ?? [];
  }

  hasRole(...roles: string[]): boolean {
    const userRoles = this.getRoles();
    return roles.some(r => userRoles.includes(r));
  }

  // ─── BTA Role Checks ─────────────────────────────────────────────────────

  isCorpAdmin(): boolean {
    return this.hasRole('ROLE_CORP_MASTER_ADMIN', 'ROLE_CORP_SUB_ADMIN');
  }

  isCorpUser(): boolean {
    return this.hasRole('ROLE_CORP_USER');
  }

  isTaAdmin(): boolean {
    return this.hasRole('ROLE_TA_MASTER_ADMIN', 'ROLE_TA_SUB_ADMIN');
  }

  isTaUser(): boolean {
    return this.hasRole('ROLE_TA_USER');
  }

  isAemeAdmin(): boolean {
    return this.hasRole('ROLE_AEME_INTERNAL_ADMIN');
  }

  isBtaUser(): boolean {
    return this.hasRole(
      'ROLE_CORP_MASTER_ADMIN', 'ROLE_CORP_SUB_ADMIN', 'ROLE_CORP_USER',
      'ROLE_TA_MASTER_ADMIN',   'ROLE_TA_SUB_ADMIN',   'ROLE_TA_USER',
      'ROLE_AEME_INTERNAL_ADMIN'
    );
  }
}