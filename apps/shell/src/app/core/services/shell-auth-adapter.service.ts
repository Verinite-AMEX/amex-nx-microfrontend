import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

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
  }
}