// libs/ui/src/lib/amex/layout/login-modal.component.ts

import { Component, Input, Output, EventEmitter, signal, ChangeDetectionStrategy, inject, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, of, finalize } from 'rxjs';
import { AmexNavPortalStyle } from '../navigation/top-nav-bar';
import { LabelComponent } from '../../atoms/label';
import { InputComponent } from '../../atoms/input';
import { IconButtonComponent } from '../../atoms/icon-button';
import { ButtonComponent } from '../../atoms/button';
import { AlertComponent } from '../../atoms/alert';
import { SpinnerComponent } from '../../atoms/spinner';

export type AmexLoginModalButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

@Component({
  selector: 'amex-login-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    LabelComponent,
    InputComponent,
    IconButtonComponent,
    ButtonComponent,
    AlertComponent,
    SpinnerComponent,
  ],
  template: `
    <div class="lm-overlay">
      <div [id]="id + '-card'" class="lm-card" [attr.data-style]="portalStyle">

        <!-- Logo / Branding -->
        <div class="lm-header">
          <div class="lm-logo">
            <span class="lm-logo__am">{{ brandNameLine1 }}</span>
            <span class="lm-logo__ex">{{ brandNameLine2 }}</span>
          </div>
          <div class="lm-title">{{ portalTitle }}</div>
          <div class="lm-subtitle">{{ subtitle }}</div>
        </div>

        <!-- Form -->
        <div class="lm-body">

          <!-- Demo mode hint -->
          <ui-alert
            *ngIf="demoMode"
            variant="warning"
            [message]="demoHintPrefix + demoCredentials.username + ' / ' + demoCredentials.password + demoHintSuffix">
          </ui-alert>

          <!-- Error banner -->
          <ui-alert
            *ngIf="errorMsg()"
            variant="error"
            [message]="errorMsg()">
          </ui-alert>

          <!-- Username -->
          <div class="lm-field">
            <ui-label [forId]="id + '-username'" [required]="true">{{ usernameLabel }}</ui-label>
            <ui-input
              [id]="id + '-username'"
              type="text"
              [placeholder]="usernamePlaceholder"
              [(ngModel)]="username"
              [disabled]="loading()"
              [ariaLabel]="usernameLabel"
              (keyup.enter)="onSubmit()">
            </ui-input>
          </div>

          <!-- Password -->
          <div class="lm-field">
            <ui-label [forId]="id + '-password'" [required]="true">{{ passwordLabel }}</ui-label>
            <div class="lm-input-wrap">
              <ui-input
                [id]="id + '-password'"
                [type]="showPassword() ? 'text' : 'password'"
                [placeholder]="passwordPlaceholder"
                [(ngModel)]="password"
                [disabled]="loading()"
                [ariaLabel]="passwordLabel"
                [style.--input-padding]="'9px 40px 9px 12px'"
                (keyup.enter)="onSubmit()">
              </ui-input>
              <ui-icon-button
                [id]="id + '-toggle-password'"
                class="lm-eye-btn"
                [icon]="showPassword() ? hidePasswordIcon : showPasswordIcon"
                variant="ghost"
                size="sm"
                [ariaLabel]="showPassword() ? hidePasswordAriaLabel : showPasswordAriaLabel"
                (clicked)="showPassword.set(!showPassword())">
              </ui-icon-button>
            </div>
          </div>

          <!-- Submit -->
          <ui-button
            [id]="id + '-submit'"
            class="lm-submit"
            [label]="loading() ? '' : submitLabel"
            [variant]="submitVariant"
            size="lg"
            [fullWidth]="true"
            [ariaLabel]="submitLabel"
            [disabled]="loading() || !username.trim() || !password.trim()"
            (click)="onSubmit()">
            <ui-spinner *ngIf="loading()" slot="icon-start" size="sm" color="#fff"></ui-spinner>
          </ui-button>

          <!-- Forgot password -->
          <div class="lm-forgot">
            <ui-button
              [id]="id + '-forgot'"
              [label]="forgotPasswordLabel"
              variant="ghost"
              size="sm"
              [ariaLabel]="forgotPasswordLabel"
              [disabled]="loading()"
              [style.--btn-border]="'none'"
              [style.--btn-bg]="'transparent'"
              [style.--btn-color]="'#006fcf'"
              (click)="onForgotPassword()">
            </ui-button>
          </div>

        </div>

        <!-- Footer -->
        <div class="lm-footer">
          <span>{{ footerText }}</span>
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

    .lm-card[data-style="bcrb"] .lm-header { background: #3d4dac; }
    .lm-card[data-style="oms"]  .lm-header { background: #1a3a6b; }

    .lm-body { padding: 24px 28px 16px; display: flex; flex-direction: column; gap: 14px; }

    .lm-field { display: flex; flex-direction: column; gap: 5px; }
    .lm-input-wrap { position: relative; display: flex; }
    .lm-eye-btn { position: absolute; right: 2px; top: 2px; }

    .lm-forgot { text-align: center; }

    .lm-footer {
      padding: 12px 28px; background: #f5f5f5;
      border-top: 1px solid #e0e0e0;
      font-size: 11px; color: #888; text-align: center;
    }
  `],
})
export class AmexLoginModalComponent {
  private static _idCounter = 0;

  /** Overridable so parent screens can supply a stable id for aria-* wiring; falls back to an auto-generated one. */
  @HostBinding('attr.id') @Input() id = `amex-login-modal-${++AmexLoginModalComponent._idCounter}`;

  @Input() portalTitle = 'American Express Portal';
  @Input() portalStyle: AmexNavPortalStyle = 'onls';

  /** Fully configurable copy — nothing hardcoded. */
  @Input() brandNameLine1 = 'AMERICAN';
  @Input() brandNameLine2 = 'EXPRESS';
  @Input() subtitle = 'Please sign in to continue';
  @Input() usernameLabel = 'Username';
  @Input() usernamePlaceholder = 'Enter your username';
  @Input() passwordLabel = 'Password';
  @Input() passwordPlaceholder = 'Enter your password';
  @Input() submitLabel = 'Sign In';
  @Input() submitVariant: AmexLoginModalButtonVariant = 'primary';
  @Input() forgotPasswordLabel = 'Forgot password?';
  @Input() footerText = '© American Express. All rights reserved.';
  @Input() demoHintPrefix = '🔑 Demo mode — sign in with ';
  @Input() demoHintSuffix = ' (no backend call is made)';

  @Input() showPasswordIcon = '👁';
  @Input() hidePasswordIcon = '🙈';
  @Input() showPasswordAriaLabel = 'Show password';
  @Input() hidePasswordAriaLabel = 'Hide password';

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

    if (this.demoMode || !this.loginUrl) {
      this.loading.set(true);
      const u = this.username.trim();
      const p = this.password.trim();

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