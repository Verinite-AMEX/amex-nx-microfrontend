import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BtaAuthService } from '../../core/services/auth.service';
import { AmexTabItem } from '@ui-components/ui';

type LoginView = 'login' | 'forgot-step1' | 'forgot-step2' | 'password-expired';

@Component({
  selector: 'app-bta-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  template: `
    <div *ngIf="view === 'login'" class="form-card">
      <div class="form-card-hd">Log In</div>
      <div class="form-card-bd">

        <div class="welcome-text">
          Welcome to American Express® Business Travel Account
        </div>

        <div *ngIf="errorMsg" class="error-box">{{ errorMsg }}</div>

        <div class="field-row">
          <label class="field-label">User ID</label>
          <input class="field-input" type="text"
            [(ngModel)]="username" [disabled]="loading"
            (keyup.enter)="onLogin()" />
        </div>

        <div class="field-row">
          <label class="field-label">Password</label>
          <input class="field-input" type="password"
            [(ngModel)]="password" [disabled]="loading"
            (keyup.enter)="onLogin()" />
        </div>

        <div class="forgot-row">
          <a class="forgot-link" (click)="goToForgotStep1()">Forgot your password?</a>
        </div>

        <div class="btn-row">
          <button class="btn-submit" (click)="onLogin()" [disabled]="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </div>

        <div class="help-text">
          For assistance, please contact our BTA services team.<br>
          For security purposes, always remember to close your browser when you have finished accessing your BTA.
        </div>

      </div>
    </div>

    <div *ngIf="view === 'forgot-step1'" class="form-card">
      <div class="form-card-hd">Reset Your Password</div>
      <div class="form-card-bd">

        <div class="info-text">
          To reset your password, please enter your User ID and email address
        </div>

        <div *ngIf="errorMsg" class="error-box">{{ errorMsg }}</div>

        <div class="field-row">
          <label class="field-label">User ID <span class="req">*</span></label>
          <input class="field-input" type="text"
            [(ngModel)]="forgotUsername" [disabled]="loading" />
        </div>

        <div class="field-row">
          <label class="field-label">Email Address <span class="req">*</span></label>
          <input class="field-input" type="email"
            [(ngModel)]="forgotEmail" [disabled]="loading" />
        </div>

        <div class="btn-row-spaced">
          <button class="btn-cancel" (click)="goToLogin()" [disabled]="loading">Cancel</button>
          <button class="btn-submit" (click)="onForgotStep1Submit()" [disabled]="loading">
            {{ loading ? 'Checking...' : 'Submit' }}
          </button>
        </div>

      </div>
    </div>

    <div *ngIf="view === 'forgot-step2'" class="form-card">
      <div class="form-card-hd">Reset Your Password</div>
      <div class="form-card-bd">

        <div class="info-text">
          Please answer the security questions and your new password will be emailed to you
        </div>

        <div *ngIf="errorMsg" class="error-box">{{ errorMsg }}</div>

        <!-- Success state: notification + Back button only -->
        <ng-container *ngIf="successMsg">
          <div class="success-box">{{ successMsg }}</div>
          <div class="btn-row-spaced">
            <button class="btn-cancel" (click)="goToLogin()">← Back to Login</button>
          </div>
        </ng-container>

        <ng-container *ngIf="!successMsg">
          <div class="question-row">
            <span class="question-label">Secret Question 1</span>
            <span class="question-text">{{ securityQuestions[0] }}</span>
          </div>
          <div class="field-row">
            <label class="field-label">Secret Answer 1 <span class="req">*</span></label>
            <input class="field-input" type="text"
              [(ngModel)]="answers[0]" [disabled]="loading" />
          </div>

          <div class="question-row">
            <span class="question-label">Secret Question 2</span>
            <span class="question-text">{{ securityQuestions[1] }}</span>
          </div>
          <div class="field-row">
            <label class="field-label">Secret Answer 2 <span class="req">*</span></label>
            <input class="field-input" type="text"
              [(ngModel)]="answers[1]" [disabled]="loading" />
          </div>

          <div class="question-row">
            <span class="question-label">Secret Question 3</span>
            <span class="question-text">{{ securityQuestions[2] }}</span>
          </div>
          <div class="field-row">
            <label class="field-label">Secret Answer 3 <span class="req">*</span></label>
            <input class="field-input" type="text"
              [(ngModel)]="answers[2]" [disabled]="loading" />
          </div>

          <div class="btn-row-spaced">
            <button class="btn-cancel" (click)="goToLogin()" [disabled]="loading">Cancel</button>
            <button class="btn-submit" (click)="onForgotStep2Submit()" [disabled]="loading">
              {{ loading ? 'Submitting...' : 'Submit' }}
            </button>
          </div>
        </ng-container>

      </div>
    </div>

    <div *ngIf="view === 'password-expired'" class="form-card">
      <div class="form-card-hd">Password Expired</div>
      <div class="form-card-bd">

        <div class="info-text">
          Your password has expired. Please enter your current password and choose a new password to continue.
        </div>

        <div *ngIf="errorMsg"   class="error-box">{{ errorMsg }}</div>
        <div *ngIf="successMsg" class="success-box">{{ successMsg }}</div>

        <div class="field-row">
          <label class="field-label">Current Password <span class="req">*</span></label>
          <input class="field-input" type="password"
            [(ngModel)]="expiredOldPassword" [disabled]="loading" />
        </div>

        <div class="field-row">
          <label class="field-label">New Password <span class="req">*</span></label>
          <input class="field-input" type="password"
            [(ngModel)]="expiredNewPassword" [disabled]="loading" />
        </div>

        <div class="field-row">
          <label class="field-label">Confirm Password <span class="req">*</span></label>
          <input class="field-input" type="password"
            [(ngModel)]="expiredConfirmPassword" [disabled]="loading" />
        </div>

        <div class="btn-row-spaced">
          <button class="btn-cancel" (click)="goToLogin()" [disabled]="loading">Cancel</button>
          <button class="btn-submit" (click)="onChangeExpiredPassword()" [disabled]="loading">
            {{ loading ? 'Updating...' : 'Submit' }}
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    /* Form card */
    .form-card    { border:1px solid #b8cfe0; max-width:700px; }
    .form-card-hd { background:#d6eaf8; border-bottom:1px solid #b8cfe0; padding:6px 12px; font-size:13px; font-weight:bold; color:#1a4a80; }
    .form-card-bd { padding:18px 20px; }

    .welcome-text { color:#1a4a80; font-size:13px; font-weight:bold; margin-bottom:20px; }
    .info-text    { color:#333; font-size:12px; margin-bottom:18px; }

    .field-row       { display:flex; align-items:center; margin-bottom:12px; }
    .field-label     { width:130px; font-size:12px; color:#333; flex-shrink:0; }
    .field-input     { width:160px; border:1px solid #999; padding:3px 6px; font-size:12px; font-family:Arial,sans-serif; }
    .field-input:focus    { outline:none; border-color:#006fcf; }
    .field-input:disabled { background:#f0f0f0; }
    .req { color:#cc0000; }

    .question-row  { display:flex; align-items:baseline; gap:12px; margin-bottom:4px; margin-top:6px; }
    .question-label{ width:130px; font-size:12px; color:#333; flex-shrink:0; }
    .question-text { font-size:12px; color:#333; }

    .forgot-row  { margin-bottom:10px; }
    .forgot-link { color:#006fcf; cursor:pointer; font-size:12px; }
    .forgot-link:hover { text-decoration:underline; }

    .btn-row        { margin-bottom:16px; }
    .btn-row-spaced { display:flex; gap:8px; margin-top:16px; }
    .btn-submit  { background:#1e5fa8; color:#fff; border:1px solid #0d3d7a; padding:3px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; }
    .btn-submit:hover:not(:disabled) { background:#2471c8; }
    .btn-submit:disabled { opacity:.6; cursor:not-allowed; }
    .btn-cancel  { background:#efefef; color:#333; border:1px solid #aaa; padding:3px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; }
    .btn-cancel:hover:not(:disabled) { background:#e0e0e0; }
    .btn-cancel:disabled { opacity:.6; cursor:not-allowed; }

    .help-text { font-size:11px; color:#555; line-height:1.6; border-top:1px dotted #ccc; padding-top:12px; margin-top:8px; }

    .error-box   { background:#fff0f0; border:1px solid #f5c6c6; color:#cc0000; padding:6px 10px; margin-bottom:14px; font-size:12px; }
    .success-box { background:#f0fff4; border:1px solid #b2dfb2; color:#1a6e1a; padding:6px 10px; margin-bottom:14px; font-size:12px; }
  `],
})
export class BtaLoginComponent {
  view: LoginView = 'login';
  tabs: AmexTabItem[] = [
    { id: 'login', label: 'Login' },
  ];

  username = '';
  password = '';
  forgotUsername = '';
  forgotEmail    = '';
  securityQuestions: string[] = [
    'What is your mother maiden name?',
    'In what city were you born?',
    'What is the name of the college you went to?',
  ];
  answers: string[] = ['chennai', 'mary', 'anna university'];
  expiredOldPassword     = '';
  expiredNewPassword     = '';
  expiredConfirmPassword = '';

  loading    = false;
  errorMsg   = '';
  successMsg = '';

  constructor(
    private auth: BtaAuthService,
    private router: Router,
  ) {}

  goToLogin(): void {
    this.view = 'login';
    this.clearMessages();
  }

  goToForgotStep1(): void {
    this.view = 'forgot-step1';
    this.clearMessages();
    this.forgotUsername = '';
    this.forgotEmail    = '';
  }

  onLogin(): void {
    this.clearMessages();
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMsg = 'Please enter your User ID and Password.';
      return;
    }
    this.loading = true;
    this.auth.login({ username: this.username.trim(), password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate([`/bta/${this.getFirstAllowedRoute()}`]);
      },
      error: (err) => {
        this.loading = false;
        if (err?.error?.passwordExpired === true) {
          this.view = 'password-expired';
          this.expiredOldPassword     = '';
          this.expiredNewPassword     = '';
          this.expiredConfirmPassword = '';
          this.clearMessages();
        } else {
          this.errorMsg = err?.error?.message ?? 'Invalid User ID or Password.';
        }
      },
    });
  }

  onForgotStep1Submit(): void {
    this.clearMessages();
    if (!this.forgotUsername.trim() || !this.forgotEmail.trim()) {
      this.errorMsg = 'Please enter your User ID and Email Address.';
      return;
    }
    this.loading = true;
    this.auth.forgotPassword({
      username: this.forgotUsername.trim(),
      email:    this.forgotEmail.trim(),
    }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res?.data?.securityQuestions?.length) {
          this.securityQuestions = res.data.securityQuestions;
        }
        this.view = 'forgot-step2';
      },
      error: (err) => {
        this.loading  = false;
        this.errorMsg = err?.error?.message ?? 'No account found with that User ID and email.';
      },
    });
  }

  onForgotStep2Submit(): void {
    this.errorMsg = '';
    if (this.answers.some(a => !a.trim())) {
      this.errorMsg = 'Please answer all security questions.';
      return;
    }
    this.loading = true;
    this.auth.submitSecurityAnswers({
      username: this.forgotUsername.trim(),
      email:    this.forgotEmail.trim(),
      answers:  this.answers.map(a => a.trim()),
    }).subscribe({
      next: () => {
        this.loading    = false;
        this.successMsg = 'Your new password has been emailed to you. Please check your inbox.';
      },
      error: (err) => {
        this.loading  = false;
        this.errorMsg = err?.error?.message ?? 'Incorrect answers. Please try again.';
      },
    });
  }

  onChangeExpiredPassword(): void {
    this.clearMessages();
    if (!this.expiredOldPassword.trim()) {
      this.errorMsg = 'Please enter your current password.';
      return;
    }
    if (!this.expiredNewPassword.trim()) {
      this.errorMsg = 'Please enter a new password.';
      return;
    }
    if (this.expiredNewPassword !== this.expiredConfirmPassword) {
      this.errorMsg = 'New password and Confirm password do not match.';
      return;
    }
    this.loading = true;
    this.auth.changeExpiredPassword({
      username:    this.username.trim(),
      oldPassword: this.expiredOldPassword,
      newPassword: this.expiredNewPassword,
    }).subscribe({
      next: () => {
        this.loading    = false;
        this.successMsg = 'Password changed successfully. Please log in with your new password.';
        setTimeout(() => this.goToLogin(), 2000);
      },
      error: (err) => {
        this.loading  = false;
        this.errorMsg = err?.error?.message ?? 'Failed to change password. Please try again.';
      },
    });
  }

  private getFirstAllowedRoute(): string {
    if (this.auth.isCorpAdmin())  return 'user-management';
    if (this.auth.isCorpUser())   return 'memo-statement';
    if (this.auth.isTaAdmin())    return 'user-management';
    if (this.auth.isTaUser())     return 'case-management';
    if (this.auth.isAemeAdmin())  return 'user-management';
    return 'user-management';
  }

  clearMessages(): void {
    this.errorMsg   = '';
    this.successMsg = '';
  }
}