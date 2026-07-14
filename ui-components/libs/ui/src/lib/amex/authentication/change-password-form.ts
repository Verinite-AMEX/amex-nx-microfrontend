import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field';
import { InputComponent } from '../../atoms/input';
import { ButtonComponent } from '../../atoms/button';

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'amex-change-password-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, ButtonComponent],
  template: `
    <div class="amex-shell" [class.onls-style]="portalStyle === 'onls'" [class.oms-style]="portalStyle === 'oms'" role="main" aria-label="Change password form">

      <!-- ONLS top bar -->
      <div class="top-bar" *ngIf="portalStyle === 'onls'">
        <span class="global-sites">Global Sites</span>
        <span class="log-out">Log Out</span>
      </div>

      <!-- OMS top bar -->
      <div class="top-bar-oms" *ngIf="portalStyle === 'oms'">
        <ui-button class="oms-logout-btn" variant="primary" label="LOG OUT"></ui-button>
        <!-- FLAGGED (see task point 6 / migration notes): no click handler existed
             on the original native <button> either. Preserved as dead markup rather
             than guessing at intended logout logic. -->
      </div>

      <!-- ONLS Header -->
      <div class="header-onls" *ngIf="portalStyle === 'onls'">
        <div class="logo-box"><span class="logo-text">AMERICAN<br>EXPRESS</span></div>
      </div>

      <!-- OMS Header -->
      <div class="header-oms" *ngIf="portalStyle === 'oms'">
        <div class="logo-box"><span class="logo-text">AMERICAN<br>EXPRESS</span></div>
        <div class="oms-title-wrap">
          <span class="oms-title">{{ portalTitle || 'Online Merchant Services' }}</span>
          <span class="oms-sub">MANAGE YOUR ACCOUNT ONLINE</span>
        </div>
      </div>

      <!-- ONLS Nav -->
      <div class="nav-onls" *ngIf="portalStyle === 'onls'">
        <span class="nav-misc">MISC</span>
        <span class="nav-item">ONLINE ACCOUNT SERVICES</span>
        <span class="nav-item">STATEMENTS</span>
        <span class="nav-item">POINT BOOSTER</span>
        <span class="nav-item active">CHANGE PASSWORD</span>
        <span class="nav-item">BUREAU</span>
        <span class="nav-item">CENTURION</span>
        <span class="nav-item">VAT INVOICE</span>
      </div>

      <!-- OMS Nav -->
      <div class="nav-oms" *ngIf="portalStyle === 'oms'">
        <span class="nav-item-oms">Settlement and Submissions</span>
        <span class="nav-item-oms active">Change Your Password</span>
        <span class="nav-item-oms">Customized Reports</span>
      </div>

      <!-- Content -->
      <div class="content-wrapper">
        <div class="hatched-sidebar" *ngIf="portalStyle === 'onls'"></div>
        <div class="main-content">

          <!-- ONLS Panel - exact match from screenshot -->
          <div class="panel-onls" *ngIf="portalStyle === 'onls'">

            <div class="panel-header-onls">Change Password</div>

            <div class="success-banner" *ngIf="successMessage" role="status" aria-live="polite" aria-atomic="true">
              {{ successMessage }}
            </div>
            <div class="error-inline" *ngIf="errorMessage" role="alert" aria-live="assertive" aria-atomic="true">{{ errorMessage }}</div>

            <p class="required-note-onls" role="note" aria-label="All fields are required">*All fields are required</p>

            <ui-form-field class="field-row" layout="horizontal" labelWidth="180px" label="Current Password" [required]="true" [forId]="id + '-current-password'">
              <ui-input
                #currentPasswordInputOnls
                class="field-input-onls"
                [id]="id + '-current-password'"
                type="password"
                [required]="true"
                [(ngModel)]="data.currentPassword"
                [ariaDescribedBy]="id + '-current-password-help'"
                (keydown.enter)="onEnterField($event, 'current')">
              </ui-input>
              <div [id]="id + '-current-password-help'" class="sr-only">Enter your current password</div>
            </ui-form-field>
            <ui-form-field class="field-row" layout="horizontal" labelWidth="180px" label="New Password" [required]="true" [forId]="id + '-new-password'">
              <ui-input
                #newPasswordInputOnls
                class="field-input-onls"
                [id]="id + '-new-password'"
                type="password"
                [required]="true"
                [(ngModel)]="data.newPassword"
                [ariaDescribedBy]="id + '-new-password-help'"
                (keydown.enter)="onEnterField($event, 'new')">
              </ui-input>
              <div [id]="id + '-new-password-help'" class="sr-only">Enter your new password</div>
            </ui-form-field>
            <ui-form-field class="field-row" layout="horizontal" labelWidth="180px" label="Re-enter New Password" [required]="true" [forId]="id + '-confirm-password'">
              <ui-input
                #confirmPasswordInputOnls
                class="field-input-onls"
                [id]="id + '-confirm-password'"
                type="password"
                [required]="true"
                [(ngModel)]="data.confirmPassword"
                [ariaDescribedBy]="id + '-confirm-password-help'"
                (keydown.enter)="onEnterSubmit($event)">
              </ui-input>
              <div [id]="id + '-confirm-password-help'" class="sr-only">Re-enter your new password to confirm</div>
            </ui-form-field>

            <div class="btn-row-onls">
              <ui-button
                class="btn-change-onls"
                variant="primary"
                type="submit"
                label="Change Password"
                ariaLabel="Change your password"
                (click)="onSubmit()">
              </ui-button>
            </div>

          </div>

          <!-- OMS Panel -->
          <div class="panel-oms" *ngIf="portalStyle === 'oms'">
            <div class="panel-title-oms">CHANGE YOUR PASSWORD</div>
            <div class="panel-accent"></div>

            <div class="success-banner" *ngIf="successMessage" role="status" aria-live="polite" aria-atomic="true">{{ successMessage }}</div>
            <div class="error-box-oms" *ngIf="errorMessage" role="alert" aria-live="assertive" aria-atomic="true">{{ errorMessage }}</div>

            <p class="required-note-oms" role="note" aria-label="All fields are required">* All fields are required</p>

            <ui-form-field class="field-row" layout="horizontal" labelWidth="170px" label="Current Password" [required]="true" [forId]="id + '-current-password-oms'">
              <ui-input
                #currentPasswordInputOms
                class="field-input-oms"
                [id]="id + '-current-password-oms'"
                type="password"
                [required]="true"
                [(ngModel)]="data.currentPassword"
                [ariaDescribedBy]="id + '-current-password-help-oms'"
                (keydown.enter)="onEnterField($event, 'current')">
              </ui-input>
              <div [id]="id + '-current-password-help-oms'" class="sr-only">Enter your current password</div>
            </ui-form-field>
            <ui-form-field class="field-row" layout="horizontal" labelWidth="170px" label="New Password" [required]="true" [forId]="id + '-new-password-oms'">
              <ui-input
                #newPasswordInputOms
                class="field-input-oms"
                [id]="id + '-new-password-oms'"
                type="password"
                [required]="true"
                [(ngModel)]="data.newPassword"
                [ariaDescribedBy]="id + '-new-password-help-oms'"
                (keydown.enter)="onEnterField($event, 'new')">
              </ui-input>
              <div [id]="id + '-new-password-help-oms'" class="sr-only">Enter your new password</div>
            </ui-form-field>
            <ui-form-field class="field-row" layout="horizontal" labelWidth="170px" label="Confirm New Password" [required]="true" [forId]="id + '-confirm-password-oms'">
              <ui-input
                #confirmPasswordInputOms
                class="field-input-oms"
                [id]="id + '-confirm-password-oms'"
                type="password"
                [required]="true"
                [(ngModel)]="data.confirmPassword"
                [ariaDescribedBy]="id + '-confirm-password-help-oms'"
                (keydown.enter)="onEnterSubmit($event)">
              </ui-input>
              <div [id]="id + '-confirm-password-help-oms'" class="sr-only">Re-enter your new password to confirm</div>
            </ui-form-field>

            <div class="btn-row-oms">
              <ui-button
                class="btn-back-oms"
                variant="primary"
                type="button"
                label="Cancel"
                ariaLabel="Cancel password change"
                (click)="cancel.emit()">
              </ui-button>
              <ui-button
                class="btn-submit-oms"
                variant="primary"
                type="submit"
                label="Update Password"
                ariaLabel="Update your password"
                (click)="onSubmit()">
              </ui-button>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer -->
      <div class="footer-links" role="contentinfo" aria-label="Footer links">
        <a class="footer-link" href="#" aria-label="American Express Web Site Rules and Regulations">American Express Web Site Rules and Regulations</a> |
        <a class="footer-link" href="#" aria-label="News Centre">News Centre</a> |
        <a class="footer-link" href="#" aria-label="Fraud Protection Centre">Fraud Protection Centre</a> |
        <a class="footer-link" href="#" aria-label="Trademarks">Trademarks</a> |
        <a class="footer-link" href="#" aria-label="Privacy Statement">Privacy Statement</a>
        <span class="footer-copy">Copyright &copy; 2009 American Express Company</span>
      </div>
    </div>
  `,
  styles: [`
    .amex-shell { font-family: Arial, sans-serif; font-size: 12px; min-height: 440px; display: flex; flex-direction: column; border: 1px solid #ccc; }
    .onls-style { background: #f0f0f0; }
    .oms-style { background: #e8e8e8; }

    /* ONLS top bar */
    .top-bar { background: #1a3a6b; padding: 2px 10px; font-size: 11px; display: flex; justify-content: flex-end; gap: 14px; }
    .global-sites { color: #aac8f0; cursor: pointer; }
    .log-out { color: #fff; cursor: pointer; }

    /* OMS top bar */
    .top-bar-oms { background: #fff; display: flex; justify-content: flex-end; padding: 4px 10px; border-bottom: 1px solid #eee; }
    .oms-logout-btn { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 0px; --btn-padding: 4px 14px; --btn-font-size: 11px; }

    /* ONLS header */
    .header-onls { background: #fff; padding: 6px 10px; display: flex; align-items: center; border-bottom: 1px solid #ddd; }

    /* OMS header */
    .header-oms { background: #fff; padding: 8px 12px; display: flex; align-items: center; border-bottom: 1px solid #ddd; }
    .oms-title-wrap { margin-left: 14px; }
    .oms-title { display: block; font-size: 20px; font-weight: bold; color: #006fcf; letter-spacing: 1px; }
    .oms-sub { display: block; font-size: 10px; color: #666; letter-spacing: 1px; }

    .logo-box { background: #016fd0; padding: 4px 8px; width: 60px; height: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .logo-text { color: #fff; font-size: 8px; font-weight: bold; line-height: 1.2; text-align: center; }

    /* ONLS nav - exact match screenshot: horizontal tabs */
    .nav-onls { background: #fff; border-bottom: 2px solid #ddd; padding: 0 10px; display: flex; flex-wrap: wrap; gap: 0; }
    .nav-misc { display: inline-block; padding: 6px 10px; font-size: 11px; color: #333; font-weight: bold; cursor: pointer; }
    .nav-item { display: inline-block; padding: 6px 10px; font-size: 11px; color: #333; cursor: pointer; font-weight: bold; }
    .nav-item.active { color: #006fcf; border-bottom: 3px solid #006fcf; }

    /* OMS nav */
    .nav-oms { background: #5a6a7a; padding: 0 10px; display: flex; }
    .nav-item-oms { display: inline-block; padding: 7px 14px; font-size: 12px; color: #ccc; cursor: pointer; }
    .nav-item-oms.active { background: #3a4a5a; color: #fff; font-weight: bold; }

    .content-wrapper { display: flex; flex: 1; }
    .hatched-sidebar { width: 130px; background: repeating-linear-gradient(135deg, #c8c8c8 0px, #c8c8c8 1px, #e8e8e8 1px, #e8e8e8 8px); flex-shrink: 0; }
    .main-content { flex: 1; padding: 20px 30px; }

    /* ONLS panel - exact match from screenshot */
    .panel-onls {
      background: #fff; border: 1px solid #b0c8e8; max-width: 540px;
      --input-border: 1px solid #999;
      --input-padding: 2px 4px;
      --input-radius: 0px;
      --input-focus-border-color: #006fcf;
      --input-focus-shadow: none;
    }
    .panel-header-onls { background: #d4e8f8; color: #006fcf; font-weight: bold; font-size: 13px; padding: 8px 14px; border-bottom: 1px solid #b0c8e8; }

    .success-banner { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 8px 14px; margin: 10px 14px; }
    .error-inline { color: #cc0000; padding: 6px 14px; font-size: 12px; }
    .required-note-onls { font-size: 11px; color: #555; margin: 8px 14px 4px 14px; }

    .field-row { margin: 8px 14px; }
    .field-input-onls { width: 200px; height: 22px; font-size: 12px; }

    .btn-row-onls { display: flex; justify-content: flex-end; padding: 10px 14px 14px; }
    .btn-change-onls {
      --btn-bg: linear-gradient(to bottom, #1a7fe8, #005baa); --btn-color: #fff;
      --btn-border: 1px solid #004a99; --btn-padding: 5px 18px; --btn-font-size: 12px; --btn-radius: 3px;
    }

    /* OMS panel */
    .panel-oms {
      background: #fff; padding: 20px 24px; max-width: 480px; border-radius: 2px;
      --input-border: 1px solid #bbb;
      --input-padding: 2px 6px;
      --input-radius: 2px;
      --input-focus-border-color: #006fcf;
      --input-focus-shadow: none;
    }
    .panel-title-oms { font-size: 16px; font-weight: bold; color: #222; }
    .panel-accent { height: 3px; background: #7b1fa2; margin: 8px 0 16px 0; }
    .error-box-oms { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 12px; margin-bottom: 12px; }
    .required-note-oms { font-size: 11px; color: #555; margin: 0 0 10px 0; }
    .field-input-oms { width: 220px; height: 28px; font-size: 12px; }
    .btn-row-oms { display: flex; gap: 12px; margin-top: 16px; }
    .btn-back-oms { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 2px; --btn-padding: 7px 20px; --btn-font-size: 12px; }
    .btn-submit-oms { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 2px; --btn-padding: 7px 24px; --btn-font-size: 12px; }

    .footer-links { background: #f5f5f5; border-top: 1px solid #ddd; padding: 5px 10px; font-size: 10px; color: #666; display: flex; flex-wrap: wrap; gap: 4px; }
    .footer-link { color: #006fcf; cursor: pointer; }
    .footer-link:hover, .footer-link:focus { color: #003087; text-decoration: underline; }
    .footer-copy { margin-left: auto; }

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

    .footer-link:focus {
      outline: 2px solid #006fcf;
      outline-offset: 2px;
    }
  `]
})
export class AmexChangePasswordFormComponent implements AfterViewChecked {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `change-password-form-${++AmexChangePasswordFormComponent._idCounter}`;

  @Input() portalStyle: 'onls' | 'oms' = 'onls';
  @Input() portalTitle = '';
  @Input() errorMessage = '';
  @Input() successMessage = '';

  @Output() passwordSubmit = new EventEmitter<ChangePasswordData>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('currentPasswordInputOnls') private currentPasswordInputOnls?: InputComponent;
  @ViewChild('newPasswordInputOnls') private newPasswordInputOnls?: InputComponent;
  @ViewChild('confirmPasswordInputOnls') private confirmPasswordInputOnls?: InputComponent;
  @ViewChild('currentPasswordInputOms') private currentPasswordInputOms?: InputComponent;
  @ViewChild('newPasswordInputOms') private newPasswordInputOms?: InputComponent;
  @ViewChild('confirmPasswordInputOms') private confirmPasswordInputOms?: InputComponent;

  data: ChangePasswordData = { currentPassword: '', newPassword: '', confirmPassword: '' };

  // Tracks which portalStyle we've already autofocused, since only the active
  // panel's ui-inputs exist in the DOM (*ngIf) and they may not be present yet
  // on the very first ngAfterViewInit if portalStyle is set/changed later.
  // ngAfterViewChecked re-checks on every change detection pass, so guarding
  // on this flag prevents re-stealing focus on every subsequent check.
  private autofocusedStyle: 'onls' | 'oms' | null = null;

  ngAfterViewChecked(): void {
    if (this.autofocusedStyle === this.portalStyle) {
      return;
    }
    const currentPasswordInput = this.getCurrentPasswordInput();
    if (currentPasswordInput) {
      currentPasswordInput.focus();
      this.autofocusedStyle = this.portalStyle;
    }
  }

  private getCurrentPasswordInput(): InputComponent | undefined {
    return this.portalStyle === 'onls' ? this.currentPasswordInputOnls : this.currentPasswordInputOms;
  }

  private getNewPasswordInput(): InputComponent | undefined {
    return this.portalStyle === 'onls' ? this.newPasswordInputOnls : this.newPasswordInputOms;
  }

  private getConfirmPasswordInput(): InputComponent | undefined {
    return this.portalStyle === 'onls' ? this.confirmPasswordInputOnls : this.confirmPasswordInputOms;
  }

  onEnterField(event: Event, fromField: 'current' | 'new'): void {
    event.preventDefault();
    if (fromField === 'current') {
      this.getNewPasswordInput()?.focus();
    } else {
      this.getConfirmPasswordInput()?.focus();
    }
  }

  onEnterSubmit(event: Event): void {
    event.preventDefault();
    this.onSubmit();
  }

  onSubmit(): void {
    if (!this.data.currentPassword || !this.data.newPassword || !this.data.confirmPassword) {
      return;
    }
    this.passwordSubmit.emit({ ...this.data });
  }

  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.getCurrentPasswordInput()?.focus();
    }
  }
}