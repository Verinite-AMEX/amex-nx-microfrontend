import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AmexPortalAuthUtil } from '@vn-core-ui-components/ui';
import { Observable, map } from 'rxjs';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  userId?: string;
  username: string;
  roles: string[];
}

export interface LoginResult {
  accessToken: string;
  refreshToken?: string;
  userId?: string;
  username: string;
  roles: string[];
}

const API_BASE = 'http://localhost:8080/api/auth'; // update host/port to match your gateway

@Injectable({ providedIn: 'root' })
export class AuthService {
  private util = new AmexPortalAuthUtil();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResult> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${API_BASE}/login`, { username, password })
      .pipe(map((res) => res.data));
  }

  onLoginSuccess(result: LoginResult): void {
    this.util.onLoginSuccess(result.accessToken, result.refreshToken, {
      userId: result.userId,
      username: result.username,
      roles: result.roles,
    });
  }

  getUser() {
    return this.util.getUser();
  }

  getUsername(): string {
    return this.util.getUsername();
  }

  isAuthenticated(): boolean {
    return this.util.isAuthenticated();
  }

  logout(): void {
    const token = this.util.getToken();

    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      this.http.post(`${API_BASE}/logout`, {}, { headers }).subscribe({
        next: () => this.completeLogout(),
        error: () => this.completeLogout(), // clear local session even if server call fails
      });
    } else {
      this.completeLogout();
    }
  }

  private completeLogout(): void {
    this.util.logout();
    this.router.navigate(['/login']);
  }
}