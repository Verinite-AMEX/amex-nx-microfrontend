import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EventBusService } from '../../core/services/event-bus.service';
import { LoginCredentials } from '@ui-components/ui';
import { RegisterData }     from '@ui-components/ui';

@Component({
    selector: 'app-login',
    template: `
    @if (mode === 'login') {
      <amex-login-form
        portalTitle="ONLS Helper Tool"
        [errorMessage]="error"
        [successMessage]="success"
        [showRegister]="true"
        (loginSubmit)="onLogin($event)"
        (forgotPassword)="goToForgotPassword()"
        (registerClick)="setMode('register')">
      </amex-login-form>
    }
    
    @if (mode === 'register') {
      <amex-register-form
        portalTitle="ONLS Helper Tool"
        [errorMessage]="error"
        [successMessage]="success"
        (registerSubmit)="onRegister($event)"
        (cancel)="setMode('login')">
      </amex-register-form>
    }
    `,
    standalone: false
})
export class LoginComponent implements OnInit {

  mode: 'login' | 'register' = 'login';
  error   = '';
  success = '';
  private returnUrl = '/misc/priority-pass';

  constructor(
    private auth:   AuthService,
    private bus:    EventBusService,
    private router: Router,
    private route:  ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.auth.hasToken()) {
      this.router.navigate([this.returnUrl]);
      return;
    }
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/misc/priority-pass';
  }

  setMode(m: 'login' | 'register'): void {
    this.mode    = m;
    this.error   = '';
    this.success = '';
  }

  onLogin(credentials: LoginCredentials): void {
    this.error   = '';
    this.success = '';

    this.auth.login({ username: credentials.username, password: credentials.password })
      .subscribe({
        next: (data) => {
          this.bus.emit({
            type: 'USER_LOGGED_IN',
            payload: { username: data.username, roles: data.roles, userId: data.userId },
          });
          this.router.navigate([this.returnUrl]);
        },
        error: (err) => {
          this.error = err.error?.message
            ?? err.error?.data?.message
            ?? 'Login failed. Please check your credentials and try again.';
        },
      });
  }

  onRegister(data: RegisterData): void {
    this.error   = '';
    this.success = '';

    if (data.password !== data.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const username = (data.firstName + data.lastName)
      .toLowerCase()
      .replace(/\s+/g, '');

    this.auth.register({ username, email: data.email, password: data.password, fullName })
      .subscribe({
        next: (res) => {
          this.bus.emit({
            type: 'USER_LOGGED_IN',
            payload: { username: res.username, roles: res.roles, userId: res.userId },
          });
          this.success = 'Account created! Redirecting…';
          setTimeout(() => this.router.navigate([this.returnUrl]), 1500);
        },
        error: (err) => {
          this.error = err.error?.message
            ?? err.error?.data?.message
            ?? 'Registration failed. Please try again.';
        },
      });
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}