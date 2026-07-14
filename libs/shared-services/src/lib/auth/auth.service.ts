import { Injectable, computed, signal, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthApiService } from './auth-api.service';
import {
  AuthResponse,
  LoginRequest,
} from '../models/auth.model';

/**
 * AuthService
 *
 * Business layer for authentication.
 *
 * Responsibilities:
 *  - Coordinates authentication workflow.
 *  - Maintains current authenticated user state.
 *  - Delegates backend communication to AuthApiService.
 *
 * NOTE:
 * Authentication status is maintained by AmexPortalAuthUtil.
 * Current authenticated user is maintained locally using Angular Signals.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /**
   * Holds the current authenticated user.
   */
  private readonly currentUser = signal<AuthResponse | null>(null);

  /**
   * Read-only signal exposed to the application.
   */
  readonly user = this.currentUser.asReadonly();

  /**
   * Computed authentication state.
   */
  readonly authenticated = computed(() =>
    this.authApiService.isAuthenticated()
  );

  private readonly authApiService = inject(AuthApiService);

  /**
   * Authenticates the user.
   */
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.authApiService.login(request).pipe(
      tap((user) => {
        this.currentUser.set(user);
      })
    );
  }

  /**
   * Sends forgot password request.
   */
  forgotPassword(
    username: string,
    email: string
  ): Observable<string> {
    return this.authApiService.forgotPassword(username, email);
  }

  /**
   * Performs logout.
   */
  performLogout(): void {
    this.authApiService.performLogout();
    this.currentUser.set(null);
  }

  /**
   * Returns current authenticated user.
   */
  getCurrentUser(): AuthResponse | null {
    return this.currentUser();
  }

  /**
   * Returns whether the user is authenticated.
   */
  isAuthenticated(): boolean {
    return this.authApiService.isAuthenticated();
  }

  /**
   * Clears locally cached user information.
   * Useful when session expires.
   */
  clearCurrentUser(): void {
    this.currentUser.set(null);
  }
}