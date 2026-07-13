import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'amex-change-password-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="amex-shell" [class.onls-style]="portalStyle === 'onls'" [class.oms-style]="portalStyle === 'oms'" role="main" aria-label="Change password form">

      <!-- ONLS top bar -->
      <div class="top-bar" *ngIf="portalStyle === 'onls'">
        <span class="global-sites">Global Sites</span>
        <span class="log-out">Log Out</span>
      </div>

      <!-- OMS top bar -->
      <div class="top-bar-oms" *ngIf="portalStyle === 'oms'">
        <button class="oms-logout-btn">LOG OUT</button>
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

            <div class="field-row">
              <label class="field-label-onls" id="current-password-label" for="current-password">Current Password <span class="req" aria-label="required">*</span></label>
              <input 
                type="password" 
                class="field-input-onls" 
                [(ngModel)]="data.currentPassword" 
                id="current-password"
                aria-labelledby="current-password-label"
                aria-required="true"
                aria-describedby="current-password-help"
                autocomplete="current-password"
                (keydown)="onKeydown($event)"
                #currentPasswordInput
              />
              <div id="current-password-help" class="sr-only">Enter your current password</div>
            </div>
            <div class="field-row">
              <label class="field-label-onls" id="new-password-label" for="new-password">New Password <span class="req" aria-label="required">*</span></label>
              <input 
                type="password" 
                class="field-input-onls" 
                [(ngModel)]="data.newPassword" 
                id="new-password"
                aria-labelledby="new-password-label"
                aria-required="true"
                aria-describedby="new-password-help"
                autocomplete="new-password"
                (keydown)="onKeydown($event)"
                #newPasswordInput
              />
              <div id="new-password-help" class="sr-only">Enter your new password</div>
            </div>
            <div class="field-row">
              <label class="field-label-onls" id="confirm-password-label" for="confirm-password">Re-enter New Password <span class="req" aria-label="required">*</span></label>
              <input 
                type="password" 
                class="field-input-onls" 
                [(ngModel)]="data.confirmPassword" 
                id="confirm-password"
                aria-labelledby="confirm-password-label"
                aria-required="true"
                aria-describedby="confirm-password-help"
                autocomplete="new-password"
                (keydown)="onKeydown($event)"
                #confirmPasswordInput
              />
              <div id="confirm-password-help" class="sr-only">Re-enter your new password to confirm</div>
            </div>

            <div class="btn-row-onls">
              <button 
                class="btn-change-onls" 
                (click)="onSubmit()" 
                (keydown.enter)="onSubmit()"
                (keydown.space)="onSubmit()"
                type="submit"
                aria-label="Change your password"
                #onlsSubmitBtn
              >Change Password</button>
            </div>

          </div>

          <!-- OMS Panel -->
          <div class="panel-oms" *ngIf="portalStyle === 'oms'">
            <div class="panel-title-oms">CHANGE YOUR PASSWORD</div>
            <div class="panel-accent"></div>

            <div class="success-banner" *ngIf="successMessage" role="status" aria-live="polite" aria-atomic="true">{{ successMessage }}</div>
            <div class="error-box-oms" *ngIf="errorMessage" role="alert" aria-live="assertive" aria-atomic="true">{{ errorMessage }}</div>

            <p class="required-note-oms" role="note" aria-label="All fields are required">* All fields are required</p>

            <div class="field-row">
              <label class="field-label-oms" id="current-password-label-oms" for="current-password-oms">Current Password <span class="req" aria-label="required">*</span></label>
              <input 
                type="password" 
                class="field-input-oms" 
                [(ngModel)]="data.currentPassword" 
                id="current-password-oms"
                aria-labelledby="current-password-label-oms"
                aria-required="true"
                aria-describedby="current-password-help-oms"
                autocomplete="current-password"
                (keydown)="onKeydown($event)"
                #currentPasswordInputOms
              />
              <div id="current-password-help-oms" class="sr-only">Enter your current password</div>
            </div>
            <div class="field-row">
              <label class="field-label-oms" id="new-password-label-oms" for="new-password-oms">New Password <span class="req" aria-label="required">*</span></label>
              <input 
                type="password" 
                class="field-input-oms" 
                [(ngModel)]="data.newPassword" 
                id="new-password-oms"
                aria-labelledby="new-password-label-oms"
                aria-required="true"
                aria-describedby="new-password-help-oms"
                autocomplete="new-password"
                (keydown)="onKeydown($event)"
                #newPasswordInputOms
              />
              <div id="new-password-help-oms" class="sr-only">Enter your new password</div>
            </div>
            <div class="field-row">
              <label class="field-label-oms" id="confirm-password-label-oms" for="confirm-password-oms">Confirm New Password <span class="req" aria-label="required">*</span></label>
              <input 
                type="password" 
                class="field-input-oms" 
                [(ngModel)]="data.confirmPassword" 
                id="confirm-password-oms"
                aria-labelledby="confirm-password-label-oms"
                aria-required="true"
                aria-describedby="confirm-password-help-oms"
                autocomplete="new-password"
                (keydown)="onKeydown($event)"
                #confirmPasswordInputOms
              />
              <div id="confirm-password-help-oms" class="sr-only">Re-enter your new password to confirm</div>
            </div>

            <div class="btn-row-oms">
              <button 
                class="btn-back-oms" 
                (click)="cancel.emit()" 
                (keydown.enter)="cancel.emit()"
                (keydown.space)="cancel.emit()"
                type="button"
                aria-label="Cancel password change"
                #omsCancelBtn
              >Cancel</button>
              <button 
                class="btn-submit-oms" 
                (click)="onSubmit()" 
                (keydown.enter)="onSubmit()"
                (keydown.space)="onSubmit()"
                type="submit"
                aria-label="Update your password"
                #omsSubmitBtn
              >Update Password</button>
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
    .oms-logout-btn { background: #1e3a5f; color: #fff; border: none; padding: 4px 14px; font-size: 11px; font-weight: bold; cursor: pointer; }

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
    .panel-onls { background: #fff; border: 1px solid #b0c8e8; max-width: 540px; }
    .panel-header-onls { background: #d4e8f8; color: #006fcf; font-weight: bold; font-size: 13px; padding: 8px 14px; border-bottom: 1px solid #b0c8e8; }

    .success-banner { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 8px 14px; margin: 10px 14px; }
    .error-inline { color: #cc0000; padding: 6px 14px; font-size: 12px; }
    .required-note-onls { font-size: 11px; color: #555; margin: 8px 14px 4px 14px; }
    .req { color: #cc0000; }

    .field-row { display: flex; align-items: center; margin: 8px 14px; }
    .field-label-onls { width: 180px; text-align: right; padding-right: 10px; color: #333; font-size: 12px; flex-shrink: 0; }
    .field-input-onls { width: 200px; height: 22px; border: 1px solid #999; padding: 2px 4px; font-size: 12px; }

    .btn-row-onls { display: flex; justify-content: flex-end; padding: 10px 14px 14px; }
    .btn-change-onls { background: linear-gradient(to bottom, #1a7fe8, #005baa); color: #fff; border: 1px solid #004a99; padding: 5px 18px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 3px; }

    /* OMS panel */
    .panel-oms { background: #fff; padding: 20px 24px; max-width: 480px; border-radius: 2px; }
    .panel-title-oms { font-size: 16px; font-weight: bold; color: #222; }
    .panel-accent { height: 3px; background: #7b1fa2; margin: 8px 0 16px 0; }
    .error-box-oms { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 12px; margin-bottom: 12px; }
    .required-note-oms { font-size: 11px; color: #555; margin: 0 0 10px 0; }
    .field-label-oms { width: 170px; text-align: right; padding-right: 12px; color: #333; font-size: 12px; flex-shrink: 0; }
    .field-input-oms { flex: 1; max-width: 220px; height: 28px; border: 1px solid #bbb; padding: 2px 6px; font-size: 12px; border-radius: 2px; }
    .btn-row-oms { display: flex; gap: 12px; margin-top: 16px; }
    .btn-back-oms { background: #1e3a5f; color: #fff; border: none; padding: 7px 20px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }
    .btn-submit-oms { background: #7b1fa2; color: #fff; border: none; padding: 7px 24px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }

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
    
    .field-input-onls:focus, .field-input-oms:focus, .btn-change-onls:focus, .btn-back-oms:focus, .btn-submit-oms:focus, .footer-link:focus {
      outline: 2px solid #006fcf;
      outline-offset: 2px;
    }
  `]
})
export class AmexChangePasswordFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `change-password-form-${++AmexChangePasswordFormComponent._idCounter}`;


  @Input() portalStyle: 'onls' | 'oms' = 'onls';
  @Input() portalTitle = '';
  @Input() errorMessage = '';
  @Input() successMessage = '';

  @Output() passwordSubmit = new EventEmitter<ChangePasswordData>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('currentPasswordInput') currentPasswordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('newPasswordInput') newPasswordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('onlsSubmitBtn') onlsSubmitBtn!: ElementRef<HTMLButtonElement>;
  
  @ViewChild('currentPasswordInputOms') currentPasswordInputOms!: ElementRef<HTMLInputElement>;
  @ViewChild('newPasswordInputOms') newPasswordInputOms!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmPasswordInputOms') confirmPasswordInputOms!: ElementRef<HTMLInputElement>;
  @ViewChild('omsCancelBtn') omsCancelBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('omsSubmitBtn') omsSubmitBtn!: ElementRef<HTMLButtonElement>;

  data: ChangePasswordData = { currentPassword: '', newPassword: '', confirmPassword: '' };

ngAfterViewInit() {
  const firstInput = this.portalStyle === 'onls' ? this.currentPasswordInput : this.currentPasswordInputOms;
  firstInput?.nativeElement.focus();
}

  onKeydown(event: KeyboardEvent): void {
    // Handle Enter key navigation between form fields
    if (event.key === 'Enter') {
      event.preventDefault();
      
      if (this.portalStyle === 'onls') {
        if (event.target === this.currentPasswordInput?.nativeElement) {
          this.newPasswordInput?.nativeElement.focus();
        } else if (event.target === this.newPasswordInput?.nativeElement) {
          this.confirmPasswordInput?.nativeElement.focus();
        } else if (event.target === this.confirmPasswordInput?.nativeElement) {
          this.onSubmit();
        }
      } else {
        if (event.target === this.currentPasswordInputOms?.nativeElement) {
          this.newPasswordInputOms?.nativeElement.focus();
        } else if (event.target === this.newPasswordInputOms?.nativeElement) {
          this.confirmPasswordInputOms?.nativeElement.focus();
        } else if (event.target === this.confirmPasswordInputOms?.nativeElement) {
          this.onSubmit();
        }
      }
    }
  }

  onSubmit(): void {
    // Validate form before submission
    if (!this.data.currentPassword || !this.data.newPassword || !this.data.confirmPassword) {
      return;
    }
    this.passwordSubmit.emit({ ...this.data });
  }

  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {
    // Handle Escape key to reset focus
    if (event.key === 'Escape') {
      const firstInput = this.portalStyle === 'onls' ? this.currentPasswordInput : this.currentPasswordInputOms;
      firstInput?.nativeElement.focus();
    }
  }
}
