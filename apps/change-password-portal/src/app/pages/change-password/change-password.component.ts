import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

/**
 * ChangePasswordComponent — standalone Change Password page.
 *
 * This is a STANDALONE component — it can be rendered:
 *   1. Directly at http://localhost:4212/change-password (standalone mode)
 *   2. Inside the shell at http://localhost:4200/change-password (MFE mode)
 *
 * It does NOT import Router or navigate programmatically — preventing
 * re-render conflicts with the shell router.
 */
@Component({
  selector:   'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <!-- Form section -->
    <div class="cp-form-section">

      <p class="cp-required-note"><span class="cp-req-star">*</span> All fields are required</p>

      <!-- Current Password -->
      <div class="cp-field-row">
        <label class="cp-label">Current Password <span class="cp-req">*</span></label>
        <div class="cp-input-wrap">
          <input
            class="cp-input"
            [class.is-error]="errors['current']"
            [type]="showCurrent ? 'text' : 'password'"
            [(ngModel)]="currentPassword"
            (ngModelChange)="clearError('current')"
           placeholder="Current password"
            autocomplete="off"
            (paste)="$event.preventDefault()"
            (copy)="$event.preventDefault()"
            (cut)="$event.preventDefault()"/>
          <button class="cp-eye-btn" type="button" (click)="showCurrent = !showCurrent" tabindex="-1"
            [attr.aria-label]="showCurrent ? 'Hide password' : 'Show password'">
            <svg *ngIf="!showCurrent" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <svg *ngIf="showCurrent" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"/>
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
              <path d="m14.12 14.12a3 3 0 1 1-4.24-4.24"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="cp-field-error" *ngIf="errors['current']">{{ errors['current'] }}</div>

      <hr class="cp-divider"/>

      <!-- New Password -->
      <div class="cp-field-row">
        <label class="cp-label">New Password <span class="cp-req">*</span></label>
        <div class="cp-input-wrap">
          <input
            class="cp-input"
            [class.is-error]="errors['new']"
            [type]="showNew ? 'text' : 'password'"
            [(ngModel)]="newPassword"
            (ngModelChange)="onNewPasswordChange($event)"
            placeholder="New password"
            autocomplete="off"
            (paste)="$event.preventDefault()"
            (copy)="$event.preventDefault()"
            (cut)="$event.preventDefault()"/>
          <button class="cp-eye-btn" type="button" (click)="showNew = !showNew" tabindex="-1"
            [attr.aria-label]="showNew ? 'Hide password' : 'Show password'">
            <svg *ngIf="!showNew" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <svg *ngIf="showNew" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"/>
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
              <path d="m14.12 14.12a3 3 0 1 1-4.24-4.24"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="cp-field-error" *ngIf="errors['new']">{{ errors['new'] }}</div>

      <!-- Strength meter -->
      <div class="cp-strength" *ngIf="newPassword">
        <div class="cp-strength-bars">
          <div class="cp-strength-bar" [style.background]="strengthScore >= 1 ? strengthColor : '#ddd'"></div>
          <div class="cp-strength-bar" [style.background]="strengthScore >= 2 ? strengthColor : '#ddd'"></div>
          <div class="cp-strength-bar" [style.background]="strengthScore >= 3 ? strengthColor : '#ddd'"></div>
          <div class="cp-strength-bar" [style.background]="strengthScore >= 4 ? strengthColor : '#ddd'"></div>
        </div>
        <div class="cp-strength-label" [style.color]="strengthColor">{{ strengthLabel }}</div>
      </div>

      <!-- Password rules -->
      <div class="cp-rules" *ngIf="newPassword">
        <div class="cp-rule" [class.met]="rules.len">
          <span class="cp-rule-icon">{{ rules.len ? '✓' : '○' }}</span> Min 8 characters
        </div>
        <div class="cp-rule" [class.met]="rules.upper">
          <span class="cp-rule-icon">{{ rules.upper ? '✓' : '○' }}</span> Uppercase letter (A–Z)
        </div>
        <div class="cp-rule" [class.met]="rules.lower">
          <span class="cp-rule-icon">{{ rules.lower ? '✓' : '○' }}</span> Lowercase letter (a–z)
        </div>
        <div class="cp-rule" [class.met]="rules.num">
          <span class="cp-rule-icon">{{ rules.num ? '✓' : '○' }}</span> Number (0–9)
        </div>
        <div class="cp-rule" [class.met]="rules.special">
          <span class="cp-rule-icon">{{ rules.special ? '✓' : '○' }}</span> Special character
        </div>
        <div class="cp-rule" [class.met]="rules.diff">
          <span class="cp-rule-icon">{{ rules.diff ? '✓' : '○' }}</span> Different from current
        </div>
      </div>

      <!-- Re-enter New Password -->
      <div class="cp-field-row">
        <label class="cp-label">Re-enter New Password <span class="cp-req">*</span></label>
        <div class="cp-input-wrap">
          <input
            class="cp-input"
            [class.is-error]="errors['confirm'] || (confirmPassword && newPassword !== confirmPassword)"
            [class.is-valid]="confirmPassword && newPassword === confirmPassword"
            [type]="showConfirm ? 'text' : 'password'"
            [(ngModel)]="confirmPassword"
            (ngModelChange)="onConfirmChange()"
            placeholder="Re-enter new password"
            autocomplete="off"
            (paste)="$event.preventDefault()"
            (copy)="$event.preventDefault()"
            (cut)="$event.preventDefault()"/>
          <button class="cp-eye-btn" type="button" (click)="showConfirm = !showConfirm" tabindex="-1"
            [attr.aria-label]="showConfirm ? 'Hide password' : 'Show password'">
            <svg *ngIf="!showConfirm" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <svg *ngIf="showConfirm" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"/>
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
              <path d="m14.12 14.12a3 3 0 1 1-4.24-4.24"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="cp-field-error" *ngIf="errors['confirm']">{{ errors['confirm'] }}</div>
      <div class="cp-match-hint" *ngIf="confirmPassword && !errors['confirm']">
        <span *ngIf="newPassword === confirmPassword" class="match-ok">✓ Passwords match</span>
        <span *ngIf="newPassword !== confirmPassword" class="match-fail">✗ Passwords do not match</span>
      </div>

      <!-- Submit button -->
      <div class="cp-btn-row">
        <button class="cp-submit-btn" [disabled]="loading" (click)="handleSubmit()">
          <span *ngIf="loading" class="cp-spinner"></span>
          {{ loading ? 'Processing...' : 'CHANGE PASSWORD' }}
        </button>
      </div>

      <!-- Result message -->
      <div class="cp-result-msg success" *ngIf="successMsg">✓ {{ successMsg }}</div>
      <div class="cp-result-msg error"   *ngIf="errorMsg">✗ {{ errorMsg }}</div>

    </div>

  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; background: #fff; min-height: 100%; }


    /* Form section */
    .cp-form-section { padding: 20px 16px; max-width: 500px; }

    .cp-required-note { font-size: 11px; color: #555; margin-bottom: 14px; }
    .cp-req-star { color: red; }

    /* Field row — label left, input right */
    .cp-field-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
      flex-wrap: wrap;
    }
    .cp-label {
      font-size: 12px; color: #333;
      width: 190px; text-align: right;
      flex-shrink: 0; white-space: nowrap;
    }
    .cp-req { color: red; margin-left: 1px; }

    /* Input wrapper */
    .cp-input-wrap { position: relative; display: inline-flex; align-items: center; }
    .cp-input {
      border: 1px solid #aaa;
      padding: 3px 28px 3px 6px;
      font-size: 12px;
      width: 220px;
      color: #333;
      background: #fff;
      outline: none;
      height: 24px;
    }
    .cp-input:focus  { border-color: #006fcf; }
    .cp-input.is-error { border-color: red; background: #fff8f8; }
    .cp-input.is-valid { border-color: #00875a; }

    /* Eye toggle */
    .cp-eye-btn {
      position: absolute; right: 4px;
      background: none; border: none; cursor: pointer;
      color: #888; padding: 0;
      display: flex; align-items: center; height: 100%;
    }
    .cp-eye-btn:hover { color: #006fcf; }

    /* Inline field error */
    .cp-field-error {
      font-size: 11px; color: red;
      margin-left: 198px; margin-bottom: 6px;
    }

    /* Divider between current and new */
    .cp-divider {
      border: none; border-top: 1px solid #ddd;
      margin: 6px 0 12px 198px; width: 220px;
    }

    /* Strength meter */
    .cp-strength {
      margin-left: 198px; margin-bottom: 8px;
    }
    .cp-strength-bars { display: flex; gap: 3px; margin-bottom: 3px; }
    .cp-strength-bar {
      width: 42px; height: 4px;
      background: #ddd; border-radius: 1px;
      transition: background 0.25s;
    }
    .cp-strength-label { font-size: 10px; font-weight: bold; }

    /* Password rules checklist */
    .cp-rules {
      margin-left: 198px; margin-bottom: 10px;
      background: #f5f8ff; border: 1px solid #d0dff5;
      padding: 8px 10px; width: 220px;
    }
    .cp-rule {
      font-size: 11px; color: #888;
      margin-bottom: 3px;
      display: flex; align-items: center; gap: 4px;
    }
    .cp-rule.met { color: #00875a; }
    .cp-rule-icon { font-size: 10px; }

    /* Match hint */
    .cp-match-hint {
      margin-left: 198px; font-size: 11px; margin-bottom: 8px; min-height: 16px;
    }
    .match-ok   { color: #00875a; }
    .match-fail { color: red; }

    /* Submit row */
    .cp-btn-row { margin-left: 198px; margin-top: 4px; }
    .cp-submit-btn {
      background: #1c3f72; color: #fff; border: none;
      padding: 4px 20px; font-size: 12px; font-weight: bold;
      cursor: pointer; height: 26px;
    }
    .cp-submit-btn:hover:not(:disabled) { background: #003087; }
    .cp-submit-btn:disabled { background: #aaa; cursor: not-allowed; }

    /* Spinner */
    .cp-spinner {
      display: inline-block;
      width: 10px; height: 10px;
      border: 2px solid rgba(255,255,255,0.4);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.65s linear infinite;
      vertical-align: middle;
      margin-right: 4px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Result messages */
    .cp-result-msg {
      margin-left: 198px; margin-top: 10px;
      font-size: 12px; padding: 6px 10px;
      border-radius: 2px; width: 220px;
    }
    .cp-result-msg.success { color: #00875a; background: #f0fff6; border: 1px solid #b2f0d4; }
    .cp-result-msg.error   { color: red;     background: #fff0f0; border: 1px solid #ffb3b3; }
  `],
})
export class ChangePasswordComponent {
constructor(private http: HttpClient) {}

  // ── Form state ──
  currentPassword = '';
  newPassword     = '';
  confirmPassword = '';

  // ── Visibility toggles ──
  showCurrent = false;
  showNew     = false;
  showConfirm = false;

  // ── UI state ──
  loading    = false;
  successMsg = '';
  errorMsg   = '';
  errors: Record<string, string> = {};

  // ── Strength ──
  strengthScore = 0;
  strengthLabel = '';
  strengthColor = '#ddd';

  // ── Rules ──
  rules = {
    len:     false,
    upper:   false,
    lower:   false,
    num:     false,
    special: false,
    diff:    false,
  };

  private readonly strengthColors = ['#ddd', '#D0021B', '#F5A623', '#0ea5e9', '#00875A'];
  private readonly strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  // ── Handlers ──
  onNewPasswordChange(val: string): void {
    this.clearError('new');
    this.evaluateStrength(val);
    this.onConfirmChange();
  }

  onConfirmChange(): void {
    this.clearError('confirm');
  }

  clearError(field: string): void {
    delete this.errors[field];
    this.successMsg = '';
    this.errorMsg   = '';
  }

  private evaluateStrength(val: string): void {
    this.rules = {
      len:     val.length >= 8,
      upper:   /[A-Z]/.test(val),
      lower:   /[a-z]/.test(val),
      num:     /[0-9]/.test(val),
      special: /[^A-Za-z0-9]/.test(val),
      diff:    val.length > 0 && val !== this.currentPassword,
    };

    const score = [this.rules.len, this.rules.upper, this.rules.lower, this.rules.num, this.rules.special]
      .filter(Boolean).length;

    this.strengthScore = score;
    this.strengthLabel = this.strengthLabels[score] || '';
    this.strengthColor = this.strengthColors[score] || '#ddd';
  }

  async handleSubmit():Promise<void> {
    this.errors     = {};
    this.successMsg = '';
    this.errorMsg   = '';

    let valid = true;

    if (!this.currentPassword.trim()) {
      this.errors['current'] = 'Please enter your current password.';
      valid = false;
    }
    if (!this.newPassword) {
      this.errors['new'] = 'Please enter a new password.';
      valid = false;
    } else if (this.newPassword.length < 8) {
      this.errors['new'] = 'Password must be at least 8 characters.';
      valid = false;
    } else if (
      this.currentPassword.trim() &&
      this.newPassword === this.currentPassword
    ) {
      this.errors['current'] = 'Current password and new password must not be the same.';
      this.errors['new']     = 'New password must be different from current password.';
      valid = false;
    }
    if (!this.confirmPassword) {
      this.errors['confirm'] = 'Please re-enter your new password.';
      valid = false;
    } else if (this.newPassword !== this.confirmPassword) {
      this.errors['confirm'] = 'Passwords do not match.';
      valid = false;
    }

    if (!valid) return;

    // Get JWT token
    const token = localStorage.getItem('jwtToken')
                || localStorage.getItem('authToken')
                || localStorage.getItem('token')
                || sessionStorage.getItem('jwtToken')
                || sessionStorage.getItem('authToken')
                || sessionStorage.getItem('token')
                || '';

    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
    });

    this.loading = true;

    this.http.post<any>(
      'http://localhost:8080/api/auth/change-password',
      { currentPassword: this.currentPassword, newPassword: this.newPassword },
      { headers }
    ).subscribe({
      next: (res) => {
        this.loading    = false;
        this.successMsg = res?.message || 'Password changed successfully.';
        this.currentPassword = '';
        this.newPassword     = '';
        this.confirmPassword = '';
        this.showCurrent     = false;
        this.showNew         = false;
        this.showConfirm     = false;
        this.strengthScore   = 0;
        this.rules = { len: false, upper: false, lower: false, num: false, special: false, diff: false };
      },
      error: (err) => {
        this.loading  = false;
        this.errorMsg = err?.error?.message || 'Failed to change password. Please try again.';
      },
    });
  }
}
