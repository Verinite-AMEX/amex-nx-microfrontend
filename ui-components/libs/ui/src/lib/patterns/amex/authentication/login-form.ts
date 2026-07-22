import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { AccentCardComponent } from '../../../composite/amex/accent-card';
import { LabelComponent } from '../../../primitives/label';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';


export interface LoginCredentials {
  username: string;
  password: string;
}

@Component({
  selector: 'amex-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, AccentCardComponent, LabelComponent, InputComponent, ButtonComponent],
  template: `
    <div
      class="amex-shell"
      [class.onls-style]="portalStyle === 'onls'"
      [class.oms-style]="portalStyle === 'oms'"
    >

      <!-- ============ ONLS (existing, untouched) ============ -->
      <ng-container *ngIf="portalStyle === 'onls'">

        <!-- Top bar -->
        <div class="top-bar">
          <span class="global-sites">Global Sites</span>
        </div>

        <!-- Header -->
        <div class="header">
          <div class="amex-logo">
            <div class="logo-box">
              <span class="logo-text">AMERICAN<br>EXPRESS</span>
            </div>
          </div>
          <div class="portal-title" *ngIf="portalTitle">
            <span class="portal-name">{{ portalTitle }}</span>
          </div>
        </div>

        <!-- Nav placeholder -->
        <div class="nav-bar">
          <span class="nav-item active">{{ portalTitle || 'Hub Login' }}</span>
        </div>

        <!-- Content -->
        <div class="content-wrapper">
          <div class="hatched-sidebar"></div>
          <div class="main-content">
            <div class="login-panel">

              <!-- Error message -->
              <div class="error-box" *ngIf="errorMessage" role="alert" aria-live="polite" aria-atomic="true">
                {{ errorMessage }}
              </div>

              <!-- Success message -->
              <div class="success-box" *ngIf="successMessage" role="status" aria-live="polite" aria-atomic="true">
                {{ successMessage }}
              </div>

              <ui-form-field class="field-row" layout="horizontal" labelWidth="130px" label="User Name" [required]="true" [forId]="id + '-username'">
                <ui-input
                  #usernameInput
                  class="field-input"
                  [id]="id + '-username'"
                  type="text"
                  [(ngModel)]="credentials.username"
                  [required]="true"
                  ariaLabel="User Name"
                  [ariaDescribedBy]="id + '-username-help'"
                  (keydown.enter)="onEnterUsername($event)">
                </ui-input>
                <div [id]="id + '-username-help'" class="sr-only">Enter your user name for login</div>
              </ui-form-field>

              <ui-form-field class="field-row" layout="horizontal" labelWidth="130px" label="Password" [required]="true" [forId]="id + '-password'">
                <ui-input
                  #passwordInput
                  class="field-input"
                  [id]="id + '-password'"
                  type="password"
                  [(ngModel)]="credentials.password"
                  [required]="true"
                  ariaLabel="Password"
                  [ariaDescribedBy]="id + '-password-help'"
                  (keydown.enter)="onEnterSubmit($event)">
                </ui-input>
                <div [id]="id + '-password-help'" class="sr-only">Enter your password for login</div>
              </ui-form-field>

              <div class="form-links">
                <a class="form-link"
                   (click)="forgotPassword.emit()"
                   (keydown.enter)="forgotPassword.emit()"
                   (keydown.space)="forgotPassword.emit()"
                   role="button"
                   tabindex="0"
                   aria-label="Forgot Password">Forgot Password?</a>
              </div>

              <div class="btn-row">
                <ui-button
                  class="btn-submit"
                  variant="primary"
                  type="submit"
                  label="Login"
                  ariaLabel="Login to your account"
                  (click)="onSubmit()">
                </ui-button>
              </div>

              <div class="register-row" *ngIf="showRegister">
                <span>New user? </span>
                <a class="form-link"
                   (click)="registerClick.emit()"
                   (keydown.enter)="registerClick.emit()"
                   (keydown.space)="registerClick.emit()"
                   role="button"
                   tabindex="0"
                   aria-label="Sign up for a new account">Sign Up</a>
              </div>

            </div>
          </div>
        </div>

        <!-- Footer (ONLS-only) -->
        <div class="footer-links" role="contentinfo" aria-label="Footer links">
          <a class="footer-link" href="#" aria-label="American Express Web Site Rules and Regulations">American Express Web Site Rules and Regulations</a> |
          <a class="footer-link" href="#" aria-label="News Centre">News Centre</a> |
          <a class="footer-link" href="#" aria-label="Fraud Protection Centre">Fraud Protection Centre</a> |
          <a class="footer-link" href="#" aria-label="Trademarks">Trademarks</a> |
          <a class="footer-link" href="#" aria-label="Privacy Statement">Privacy Statement</a>
          <span class="footer-copy">Copyright &copy; 2009 American Express Company</span>
        </div>

      </ng-container>

      <!-- ============ OMS (login card + optional register card below) ============ -->
      <ng-container *ngIf="portalStyle === 'oms'">
        <div class="oms-wrapper">

          <ui-accent-card
            #omsCardRef
            class="oms-card"
            [accentColor]="cardAccentColor"
            [maxWidth]="cardMaxWidth"
            padding="24px 20px">

            <div class="error-box" *ngIf="errorMessage" role="alert" aria-live="polite" aria-atomic="true">
              {{ errorMessage }}
            </div>
            <div class="success-box" *ngIf="successMessage" role="status" aria-live="polite" aria-atomic="true">
              {{ successMessage }}
            </div>

            <ui-label [forId]="id + '-username-oms'" class="sr-only">User ID</ui-label>
            <ui-input
              #usernameInputOms
              class="field-oms"
              [id]="id + '-username-oms'"
              type="text"
              placeholder="User ID"
              [(ngModel)]="credentials.username"
              [required]="true"
              ariaLabel="User ID"
              (keydown.enter)="onEnterUsernameOms($event)">
            </ui-input>

            <ui-label [forId]="id + '-password-oms'" class="sr-only">Password</ui-label>
            <ui-input
              #passwordInputOms
              class="field-oms"
              [id]="id + '-password-oms'"
              type="password"
              placeholder="Password"
              [(ngModel)]="credentials.password"
              [required]="true"
              ariaLabel="Password"
              (keydown.enter)="onEnterSubmitOms($event)">
            </ui-input>

            <ui-button
              class="btn-login-oms"
              variant="primary"
              type="submit"
              label="Log In"
              ariaLabel="Login to your account"
              (click)="onSubmit()">
            </ui-button>

            <div class="links-oms">
              <a class="form-link"
                 (click)="forgotUserId.emit()"
                 (keydown.enter)="forgotUserId.emit()"
                 role="button" tabindex="0">Forgot User ID</a>
              <a class="form-link"
                 (click)="forgotPassword.emit()"
                 (keydown.enter)="forgotPassword.emit()"
                 role="button" tabindex="0">Forgot Password</a>
            </div>

          </ui-accent-card>

          <!-- Separate card below the login card — no accent bar, matches reference screenshot -->
          <div class="oms-register-card" *ngIf="showRegister" [style.width.px]="registerCardWidth">
            <span class="register-label">Not registered yet?</span>
            <ui-button
              class="btn-register-oms"
              variant="primary"
              label="REGISTER NOW"
              ariaLabel="Register for a new account"
              (click)="registerClick.emit()">
            </ui-button>
          </div>

        </div>
      </ng-container>

    </div>
  `,
  styles: [`
    .amex-shell { font-family: Arial, sans-serif; font-size: 12px; min-height: 500px; display: flex; flex-direction: column; }
    .onls-style { background: #f0f0f0; border: 1px solid #ccc; }
    .oms-style { background: #fff; }

    /* Top bar (onls) */
    .top-bar { background: #1a3a6b; color: #fff; text-align: right; padding: 2px 10px; font-size: 11px; display: flex; justify-content: flex-end; gap: 12px; }
    .global-sites { color: #aac8f0; cursor: pointer; }
    .global-sites:hover { text-decoration: underline; }

    /* Header (onls) */
    .header { background: #fff; padding: 6px 10px; display: flex; align-items: center; border-bottom: 1px solid #ddd; }
    .logo-box { background: #016fd0; padding: 4px 8px; display: flex; align-items: center; justify-content: center; width: 60px; height: 36px; }
    .logo-text { color: #fff; font-size: 8px; font-weight: bold; line-height: 1.2; text-align: center; }
    .portal-title { margin-left: 16px; }
    .portal-name { font-size: 13px; color: #333; font-weight: bold; }

    /* Nav (onls) */
    .nav-bar { background: #fff; padding: 0 10px; border-bottom: 2px solid #ddd; display: flex; gap: 0; }
    .nav-item { display: inline-block; padding: 6px 14px; font-size: 12px; font-weight: bold; color: #333; cursor: pointer; border-bottom: 3px solid transparent; }
    .nav-item.active { color: #006fcf; border-bottom-color: #006fcf; }

    /* Content (onls) */
    .content-wrapper { display: flex; flex: 1; }
    .hatched-sidebar { width: 130px; min-height: 300px; background: repeating-linear-gradient(135deg, #c8c8c8 0px, #c8c8c8 1px, #e8e8e8 1px, #e8e8e8 8px); flex-shrink: 0; }
    .main-content { flex: 1; padding: 20px 30px; }

    /* Login panel (onls) */
    .login-panel {
      background: #fff; border: 1px solid #ccc; padding: 20px 24px; max-width: 480px;
      --input-border: 1px solid #999;
      --input-padding: 2px 4px;
      --input-radius: 0px;
      --input-focus-border-color: #006fcf;
      --input-focus-shadow: none;
    }

    /* Fields (onls) */
    .field-row { margin-bottom: 16px; }
    .field-input { width: 200px; height: 22px; font-size: 12px; }

    /* Links (onls) */
    .form-links { display: flex; gap: 20px; margin: 8px 0 8px 140px; }
    .form-link { color: #006fcf; cursor: pointer; font-size: 11px; text-decoration: underline; }
    .form-link:hover { color: #003087; }

    /* Button row (onls) */
    .btn-row { margin-top: 14px; display: flex; justify-content: flex-end; padding-right: 4px; }
    .btn-submit {
      --btn-bg: linear-gradient(to bottom, #1a7fe8, #005baa); --btn-color: #fff;
      --btn-border: 1px solid #004a99; --btn-padding: 5px 18px; --btn-font-size: 12px; --btn-radius: 3px;
    }

    /* Register row (onls) */
    .register-row { margin-top: 10px; text-align: center; font-size: 11px; color: #555; }

    /* Footer (onls-only) */
    .footer-links { background: #f5f5f5; border-top: 1px solid #ddd; padding: 5px 10px; font-size: 10px; color: #666; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
    .footer-link { color: #006fcf; cursor: pointer; }
    .footer-link:hover, .footer-link:focus { color: #003087; text-decoration: underline; }
    .footer-copy { margin-left: auto; }

    /* ===================== OMS ===================== */
    .oms-wrapper { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; padding: 24px; }
    .oms-card {
      --input-border: 1px solid #ccc;
      --input-padding: 10px 12px;
      --input-radius: 2px;
      --input-focus-border-color: #016fd0;
      --input-focus-shadow: none;
    }

    .field-oms { display: block; width: 100%; height: 40px; font-size: 13px; margin-bottom: 16px; }

    .btn-login-oms {
      --btn-bg: #1b2f5e; --btn-color: #fff; --btn-radius: 4px; --btn-padding: 11px 0;
      --btn-justify-content: center; --btn-width: 100%; --btn-font-size: 14px; --btn-font-weight: 600;
      display: block; margin-top: 6px;
    }

    .links-oms { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; font-size: 13px; }

    /* Separate register card — no accent bar, light-blue background, matches reference screenshot */
.oms-register-card {
  box-sizing: border-box;
  background: linear-gradient(to bottom, #eaf4fb 0%, #eaf4fb 35%, #ffffff 35%, #ffffff 100%);
  border: 1px solid #d6e4f2;
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
    .register-label { font-size: 13px; color: #444; }
    .btn-register-oms {
      --btn-bg: #2f9bd6; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 10px 0;
      --btn-justify-content: center; --btn-width: 100%; --btn-font-size: 13px; --btn-font-weight: 700;
      display: block;
    }

    /* Error / success (shared visual language) */
    .error-box { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 12px; margin-bottom: 14px; font-size: 12px; border-radius: 2px; }
    .success-box { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 8px 12px; margin-bottom: 14px; font-size: 12px; border-radius: 2px; }

    /* Accessibility */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .form-link:focus, .footer-link:focus {
      outline: 2px solid #006fcf;
      outline-offset: 2px;
    }
  `]
})
export class AmexLoginFormComponent implements AfterViewInit, AfterViewChecked {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `login-form-${++AmexLoginFormComponent._idCounter}`;

  @Input() portalTitle = '';
  @Input() errorMessage = '';
  @Input() successMessage = '';
  /** Shows the register row (ONLS: inline "Sign Up" link) or register card (OMS: separate box below the login card). */
  @Input() showRegister = false;

  /** Which shell to render. Defaults to 'onls' so existing consumers are unaffected. */
  @Input() portalStyle: 'onls' | 'oms' = 'onls';

  /** OMS-only: top accent bar color on the login card. Consumer-configurable. */
  @Input() cardAccentColor = '#7b1f4b';
  /** OMS-only: max width of the login card (and the register card below it, so their edges align). Consumer-configurable. */
  @Input() cardMaxWidth = '300px';

  @Output() loginSubmit = new EventEmitter<LoginCredentials>();
  @Output() forgotPassword = new EventEmitter<void>();
  /** Fires on "Sign Up" (ONLS) or "REGISTER NOW" (OMS). */
  @Output() registerClick = new EventEmitter<void>();
  /** OMS-only. */
  @Output() forgotUserId = new EventEmitter<void>();

  @ViewChild('usernameInput') usernameInput!: InputComponent;
  @ViewChild('passwordInput') passwordInput!: InputComponent;

  @ViewChild('usernameInputOms') usernameInputOms?: InputComponent;
  @ViewChild('passwordInputOms') passwordInputOms?: InputComponent;

  // add to existing ViewChild declarations
@ViewChild('omsCardRef', { read: ElementRef }) omsCardRef?: ElementRef<HTMLElement>;

// add this new property
registerCardWidth: number | null = null;

  credentials: LoginCredentials = { username: '', password: '' };

  private autofocusedOms = false;

  ngAfterViewInit(): void {
    if (this.portalStyle === 'onls') {
      this.usernameInput.focus();
    }
  }

// update ngAfterViewChecked to measure the login card width once it's available
ngAfterViewChecked(): void {
  if (this.portalStyle === 'oms' && !this.autofocusedOms && this.usernameInputOms) {
    this.usernameInputOms.focus();
    this.autofocusedOms = true;
  }

  if (this.portalStyle === 'oms' && this.omsCardRef && this.registerCardWidth === null) {
    const measuredWidth = this.omsCardRef.nativeElement.offsetWidth;
    if (measuredWidth > 0) {
      this.registerCardWidth = measuredWidth;
    }
  }
}

  onEnterUsername(event: Event) {
    event.preventDefault();
    this.passwordInput.focus();
  }

  onEnterUsernameOms(event: Event) {
    event.preventDefault();
    this.passwordInputOms?.focus();
  }

  onEnterSubmit(event: Event) {
    event.preventDefault();
    this.onSubmit();
  }

  onEnterSubmitOms(event: Event) {
    event.preventDefault();
    this.onSubmit();
  }

  onSubmit() {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'User Name and Password are required.';
      return;
    }
    this.errorMessage = '';
    this.loginSubmit.emit({ ...this.credentials });
  }

  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (this.portalStyle === 'oms') {
        this.usernameInputOms?.focus();
      } else {
        this.usernameInput.focus();
      }
    }
  }
}