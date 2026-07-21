import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, tap, catchError, throwError, of } from 'rxjs';

import { AmexPortalAuthUtil } from '@ui-components/ui';

import { API_BASE_URL } from '../config/api-base-url.token';
import { API_ENDPOINTS } from '../config/api-config';
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../models/auth.model';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends AmexPortalAuthUtil {

  private readonly http = inject(HttpClient);

  private readonly baseUrl = inject(API_BASE_URL);

  private readonly sessionService = inject(SessionService);

  /**
   * Authenticates user.
   * Backend sets the HTTP-only cookie.
   */
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<ApiResponse<AuthResponse>>(
        this.buildUrl(API_ENDPOINTS.auth.login),
        request,
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((response) => response.data),

        tap((user) => {

          this.sessionService.setCurrentUser({
            userId: user.userId,
            username: user.username,
            roles: user.roles,
          });

          super.onLoginSuccess({
            userId: user.userId,
            username: user.username,
            roles: user.roles,
          });

        }),

        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Registers a new user.
   * Backend logs the user in immediately and sets the HTTP-only cookie
   * (same response shape as login).
   */
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<ApiResponse<AuthResponse>>(
        this.buildUrl(API_ENDPOINTS.auth.register),
        request,
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((response) => response.data),

        tap((user) => {

          this.sessionService.setCurrentUser({
            userId: user.userId,
            username: user.username,
            roles: user.roles,
          });

          super.onLoginSuccess({
            userId: user.userId,
            username: user.username,
            roles: user.roles,
          });

        }),

        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Validates the current session using the HTTP-only cookie.
   * Call this once on app bootstrap (APP_INITIALIZER) so that
   * SessionService / AmexPortalAuthUtil are hydrated after a
   * cross-origin redirect back from Login-Logout-auth-app,
   * since localStorage does not carry over across origins.
   *
   * Returns true if a valid session was found, false otherwise.
   * Never throws — safe to call unconditionally on startup.
   */
  validateSession(): Observable<boolean> {
    return this.http
      .get<ApiResponse<AuthResponse>>(
        this.buildUrl(API_ENDPOINTS.auth.session),
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((response) => response.data),

        tap((user) => {

          this.sessionService.setCurrentUser({
            userId: user.userId,
            username: user.username,
            roles: user.roles,
          });

          super.onLoginSuccess({
            userId: user.userId,
            username: user.username,
            roles: user.roles,
          });

        }),

        map(() => true),

        catchError(() => {
          this.sessionService.clearSession();
          super.logout();

          return of(false);
        })
      );
  }

  /**
   * Forgot password.
   */
  forgotPassword(
    username: string,
    email: string
  ): Observable<string> {
    return this.http
      .post<ApiResponse<void>>(
        this.buildUrl(API_ENDPOINTS.auth.forgotPassword),
        {
          username,
          email,
        }
      )
      .pipe(
        map((response) => response.message)
      );
  }

  /**
   * Logout.
   */
  performLogout(): Observable<void> {
    return this.http
      .post<ApiResponse<void>>(
        this.buildUrl(API_ENDPOINTS.auth.logout),
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.sessionService.clearSession();
          super.logout();
        }),

        map(() => void 0),

        catchError((error) => {

          this.sessionService.clearSession();
          super.logout();

          return throwError(() => error);

        })
      );
  }

  /**
   * Returns authentication status.
   */
  isUserAuthenticated(): boolean {
    return super.isAuthenticated();
  }

  /**
   * Builds complete API URL.
   */
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

}