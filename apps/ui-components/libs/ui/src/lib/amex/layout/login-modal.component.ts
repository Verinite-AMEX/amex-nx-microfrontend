// libs/ui/src/lib/amex/layout/login-modal.component.ts

import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, of, finalize } from 'rxjs';
import { AmexNavPortalStyle } from '../navigation/top-nav-bar';

interface LoginPayload {
  username: string;
  password: string;
}

interface AuthApiResponse {
  success: boolean;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken?: string;
    username?: string;
    role?: string;
  };
}

@Component({
  selector: 'amex-login-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="lm-overlay">
      <div class="lm-card" [attr.data-style]="portalStyle">

        <!-- Logo / Branding -->
        <div class="lm-header">
          <div class="lm-logo">
            <span class="lm-logo__am">AMERICAN</span>
            <span class="lm-logo__ex">EXPRESS</span>
          </div>
          <div class="lm-title">{{ portalTitle }}</div>
          <div class="lm-subtitle">Please sign in to continue</div>
        </div>

        <!-- Form -->
        <div class="lm-body">

          <!-- Demo mode hint -->
          <div class="lm-demo-hint" *ngIf="demoMode">
            🔑 Demo mode — sign in with
            <strong>{{ demoCredentials.username }}</strong> /
            <strong>{{ demoCredentials.password }}</strong>
            (no backend call is made)
          </div>

          <!-- Error banner -->
          <div class="lm-error" *ngIf="errorMsg()">
            <span class="lm-error__icon">⚠</span>
            {{ errorMsg() }}
          </div>

          <!-- Username -->
          <div class="lm-field">
            <label class="lm-label" for="lm-username">Username</label>
            <input
              id="lm-username"
              class="lm-input"
              type="text"
              [(ngModel)]="username"
              placeholder="Enter your username"
              [disabled]="loading()"
              (keyup.enter)="onSubmit()"
              autocomplete="username"
            />
          </div>

          <!-- Password -->
          <div class="lm-field">
            <label class="lm-label" for="lm-password">Password</label>
            <div class="lm-input-wrap">
              <input
                id="lm-password"
                class="lm-input"
                [type]="showPassword() ? 'text' : 'password'"
                [(ngModel)]="password"
                placeholder="Enter your password"
                [disabled]="loading()"
                (keyup.enter)="onSubmit()"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="lm-eye-btn"
                (click)="showPassword.set(!showPassword())"
                [title]="showPassword() ? 'Hide password' : 'Show password'"
              >
                {{ showPassword() ? '🙈' : '👁' }}
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button
            class="lm-submit"
            (click)="onSubmit()"
            [disabled]="loading() || !username.trim() || !password.trim()"
          >
            <span *ngIf="!loading()">Sign In</span>
            <span *ngIf="loading()" class="lm-spinner"></span>
          </button>

          <!-- Forgot password -->
          <div class="lm-forgot">
            <button
              type="button"
              class="lm-link-btn"
              (click)="onForgotPassword()"
              [disabled]="loading()"
            >
              Forgot password?
            </button>
          </div>

        </div>

        <!-- Footer -->
        <div class="lm-footer">
          <span>© American Express. All rights reserved.</span>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .lm-overlay {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0, 0, 0, 0.6);
      display: flex; align-items: center; justify-content: center;
      font-family: Arial, sans-serif;
      animation: lm-fade-in 0.2s ease;
    }
    @keyframes lm-fade-in { from { opacity: 0; } to { opacity: 1; } }

    .lm-card {
      background: #fff; border-radius: 4px;
      width: 100%; max-width: 400px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.22);
      overflow: hidden;
      animation: lm-slide-up 0.22s ease;
    }
    @keyframes lm-slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    /* HEADER */
    .lm-header {
      background: #006fcf; padding: 28px 28px 20px;
      display: flex; flex-direction: column; align-items: center; gap: 8px;
    }
    .lm-logo {
      background: #fff; border-radius: 3px;
      padding: 6px 10px; display: flex; flex-direction: column;
      align-items: center; line-height: 1.15;
    }
    .lm-logo__am { color: #006fcf; font-size: 8px; font-weight: 900; letter-spacing: 1px; }
    .lm-logo__ex { color: #006fcf; font-size: 14px; font-weight: 900; letter-spacing: 1.5px; }
    .lm-title    { color: #fff; font-size: 17px; font-weight: bold; text-align: center; }
    .lm-subtitle { color: rgba(255,255,255,0.8); font-size: 13px; }

    /* BCRB / OMS variant header */
    .lm-card[data-style="bcrb"] .lm-header { background: #3d4dac; }
    .lm-card[data-style="oms"]  .lm-header { background: #1a3a6b; }

    /* BODY */
    .lm-body { padding: 24px 28px 16px; display: flex; flex-direction: column; gap: 14px; }

    /* Demo hint */
    .lm-demo-hint {
      background: #fff8e1; border: 1px solid #ffe082;
      padding: 10px 12px; border-radius: 3px;
      font-size: 12.5px; color: #5d4037; line-height: 1.5;
    }

    /* Error */
    .lm-error {
      display: flex; align-items: center; gap: 8px;
      background: #fff3f3; border: 1px solid #f5c6c6;
      padding: 10px 12px; border-radius: 3px;
      font-size: 13px; color: #c62828;
    }
    .lm-error__icon { font-size: 15px; flex-shrink: 0; }

    /* Field */
    .lm-field { display: flex; flex-direction: column; gap: 5px; }
    .lm-label  { font-size: 13px; color: #333; font-weight: bold; }
    .lm-input-wrap { position: relative; display: flex; }
    .lm-input {
      border: 1px solid #ccc; padding: 9px 12px; font-size: 14px;
      font-family: Arial, sans-serif; outline: none;
      width: 100%; box-sizing: border-box; border-radius: 2px;
    }
    .lm-input:focus { border-color: #006fcf; }
    .lm-input:disabled { background: #f5f5f5; color: #999; }
    .lm-input-wrap .lm-input { padding-right: 40px; }

    .lm-eye-btn {
      position: absolute; right: 0; top: 0; bottom: 0;
      width: 38px; background: none; border: none;
      cursor: pointer; font-size: 16px; display: flex;
      align-items: center; justify-content: center;
      color: #666;
    }
    .lm-eye-btn:hover { color: #006fcf; }

    /* Submit */
    .lm-submit {
      background: #006fcf; color: #fff; border: none;
      padding: 12px; font-size: 15px; font-weight: bold;
      font-family: Arial, sans-serif; cursor: pointer;
      border-radius: 2px; width: 100%;
      display: flex; align-items: center; justify-content: center;
      min-height: 44px; margin-top: 4px;
    }
    .lm-submit:hover:not(:disabled) { background: #005bb5; }
    .lm-submit:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Spinner */
    .lm-spinner {
      width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.4);
      border-top-color: #fff; border-radius: 50%;
      animation: lm-spin 0.7s linear infinite;
    }
    @keyframes lm-spin { to { transform: rotate(360deg); } }

    /* Forgot */
    .lm-forgot { text-align: center; }
    .lm-link-btn {
      background: none; border: none; color: #006fcf;
      font-size: 13px; cursor: pointer; text-decoration: underline;
      font-family: Arial, sans-serif; padding: 0;
    }
    .lm-link-btn:hover { color: #005bb5; }
    .lm-link-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* FOOTER */
    .lm-footer {
      padding: 12px 28px; background: #f5f5f5;
      border-top: 1px solid #e0e0e0;
      font-size: 11px; color: #888; text-align: center;
    }
  `],
})
export class AmexLoginModalComponent {

  @Input() portalTitle = 'American Express Portal';
  @Input() portalStyle: AmexNavPortalStyle = 'onls';

  /**
   * Auth service login URL. NO DEFAULT — the real app/portal must pass
   * its own auth-service endpoint explicitly, e.g.:
   *   <amex-login-modal loginUrl="http://localhost:8080/api/auth/login">
   * Left empty by default so this component can never accidentally
   * fire a real network call (e.g. inside Storybook/demos).
   */
  @Input() loginUrl = '';

  /**
   * DEMO MODE — when true, onSubmit() never touches HttpClient at all.
   * It checks the typed username/password against `demoCredentials`
   * locally and emits a fake token on match. Use this for Storybook,
   * QA sandboxes, or any environment with no real auth backend.
   */
  @Input() demoMode = false;

  /** Credentials accepted when demoMode is true. */
  @Input() demoCredentials: { username: string; password: string } = {
    username: 'demo',
    password: 'demo',
  };

  @Output() loginSuccess = new EventEmitter<string>();

  private readonly http = inject(HttpClient);

  username = '';
  password = '';

  readonly loading      = signal(false);
  readonly errorMsg     = signal('');
  readonly showPassword = signal(false);

  onSubmit(): void {
    if (this.loading() || !this.username.trim() || !this.password.trim()) return;
    this.errorMsg.set('');

    // ── DEMO MODE — zero network calls, ever. ──────────────────────────────
    if (this.demoMode || !this.loginUrl) {
      this.loading.set(true);
      const u = this.username.trim();
      const p = this.password.trim();

      // Tiny artificial delay so the spinner is visible, same UX as real login.
      setTimeout(() => {
        this.loading.set(false);
        if (u === this.demoCredentials.username && p === this.demoCredentials.password) {
          this.loginSuccess.emit('demo-token-' + Date.now());
        } else {
          this.errorMsg.set(
            this.demoMode
              ? `Invalid demo credentials. Try "${this.demoCredentials.username}" / "${this.demoCredentials.password}".`
              : 'No loginUrl configured and demoMode is off — nothing to authenticate against.'
          );
        }
      }, 300);
      return;
    }

    // ── REAL MODE — actual backend call (production portals only). ────────
    this.loading.set(true);

    this.http
      .post<{
        success: boolean;
        message?: string;
        data?: {
          accessToken:  string;
          refreshToken?: string;
          userId?:      string;
          username?:    string;
          roles?:       string[];
        };
      }>(this.loginUrl, {
        username: this.username.trim(),
        password: this.password.trim(),
      })
      .pipe(
        catchError(err => {
          const msg =
            err?.error?.message ||
            (err?.status === 401 ? 'Invalid username or password.'        :
             err?.status === 0   ? 'Cannot reach auth service. Check your network.' :
                                   'Login failed. Please try again.');
          return of({ success: false, message: msg, data: undefined });
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe(res => {
        if (res?.success && res?.data?.accessToken) {
          const { accessToken, refreshToken, username, userId, roles } = res.data;

          localStorage.setItem('mfe_access_token', accessToken);
          if (refreshToken) localStorage.setItem('mfe_refresh_token', refreshToken);
          localStorage.setItem('mfe_user', JSON.stringify({
            userId:   userId   ?? '',
            username: username ?? this.username.trim(),
            roles:    roles    ?? [],
          }));

          this.loginSuccess.emit(accessToken);
        } else {
          this.errorMsg.set(res?.message ?? 'Login failed. Please try again.');
        }
      });
  }

  onForgotPassword(): void {
    alert('Please contact your system administrator to reset your password.');
  }
}