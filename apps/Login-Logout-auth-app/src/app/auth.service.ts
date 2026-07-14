import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiService, AuthResponse } from '@amex/shared-services';

export type LoginResult = AuthResponse;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authApi: AuthApiService, private router: Router) {}

  login(username: string, password: string): Observable<LoginResult> {
    return this.authApi.login({ username, password });
  }

  forgotPassword(userId: string, emailId: string): Observable<string> {
    return this.authApi.forgotPassword(userId, emailId);
  }

  getUser() {
    return this.authApi.getUser();
  }

  getUsername(): string {
    return this.authApi.getUsername();
  }

  isAuthenticated(): boolean {
    return this.authApi.isAuthenticated();
  }

  logout(): void {
    this.authApi.performLogout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login']),
    });
  }
}