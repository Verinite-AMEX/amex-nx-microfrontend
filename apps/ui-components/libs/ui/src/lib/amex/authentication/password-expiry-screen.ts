import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface NewPasswordData {
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'amex-password-expiry-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="amex-shell">

      <div class="header">
        <div class="logo-box"><span class="logo-text">AMERICAN<br>EXPRESS</span></div>
        <div class="portal-title-wrap">
          <span class="portal-name">{{ portalTitle || 'Business Travel Accounts' }}</span>
        </div>
      </div>

      <div class="nav-bar">
        <span class="nav-item active">Change Password</span>
      </div>

      <div class="content-wrapper">
        <div class="sidebar">
          <div class="sidebar-nav">
            <div class="sidebar-title">NAVIGATION</div>
            <div class="sidebar-item">User Management</div>
            <div class="sidebar-item">Case Management</div>
            <div class="sidebar-item">Audit Trail</div>
            <div class="sidebar-item">TMC Transactions</div>
          </div>
        </div>

        <div class="main-content">
          <div class="panel">
            <div class="panel-header">Change Password</div>

            <div class="expiry-notice">
              <strong>Your password has expired.</strong> Please set a new password to continue.
            </div>

            <div class="error-box" *ngIf="errorMessage">{{ errorMessage }}</div>
            <div class="success-box" *ngIf="successMessage">{{ successMessage }}</div>

            <p class="required-note">All fields marked <span class="req">*</span> are mandatory</p>

            <div class="field-row">
              <label class="field-label" [for]="id + '-new-password'">New Password <span class="req">*</span></label>
              <input [id]="id + '-new-password'" type="password" class="field-input" [(ngModel)]="data.newPassword" />
            </div>
            <div class="field-row">
              <label class="field-label" [for]="id + '-confirm-new-password'">Confirm New Password <span class="req">*</span></label>
              <input [id]="id + '-confirm-new-password'" type="password" class="field-input" [(ngModel)]="data.confirmPassword" />
            </div>

            <div class="btn-row">
              <button class="btn-submit" (click)="onSubmit()">Submit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .amex-shell { font-family: Arial, sans-serif; font-size: 12px; background: #fff; min-height: 440px; display: flex; flex-direction: column; border: 1px solid #ccc; }

    /* Header */
    .header { background: #fff; padding: 8px 12px; display: flex; align-items: center; border-bottom: 2px solid #006fcf; }
    .logo-box { background: #016fd0; padding: 4px 8px; width: 60px; height: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .logo-text { color: #fff; font-size: 8px; font-weight: bold; line-height: 1.2; text-align: center; }
    .portal-title-wrap { margin-left: 14px; }
    .portal-name { font-size: 16px; font-weight: bold; color: #333; }

    /* Nav */
    .nav-bar { background: #e8f0f8; border-bottom: 1px solid #c0d0e0; padding: 0 10px; display: flex; }
    .nav-item { display: inline-block; padding: 6px 14px; font-size: 12px; font-weight: bold; color: #006fcf; border-bottom: 3px solid #006fcf; cursor: pointer; }

    /* Layout */
    .content-wrapper { display: flex; flex: 1; }

    /* Sidebar */
    .sidebar { width: 160px; background: #fff; border-right: 1px solid #c0d8f0; flex-shrink: 0; padding: 0; }
    .sidebar-nav { padding: 8px 0; }
    .sidebar-title { background: #006fcf; color: #fff; font-weight: bold; font-size: 12px; padding: 7px 12px; text-align: center; }
    .sidebar-item { padding: 7px 14px; font-size: 12px; color: #006fcf; cursor: pointer; border-bottom: 1px solid #e0eaf4; }
    .sidebar-item:hover { background: #e8f0f8; }

    /* Main */
    .main-content { flex: 1; padding: 16px 20px; background: #fff; }

    /* Panel */
    .panel { border: 1px solid #b0c8e8; max-width: 520px; }
    .panel-header { background: #d4e8f8; color: #006fcf; font-weight: bold; font-size: 13px; padding: 8px 14px; border-bottom: 1px solid #b0c8e8; }

    /* Expiry notice */
    .expiry-notice { background: #fff8e1; border: 1px solid #ffe082; color: #7a5c00; padding: 8px 14px; margin: 12px 14px 4px 14px; font-size: 12px; border-radius: 2px; }

    /* Messages */
    .error-box { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 14px; margin: 8px 14px; }
    .success-box { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 8px 14px; margin: 8px 14px; }

    .required-note { font-size: 11px; color: #555; margin: 10px 14px 4px 14px; }
    .req { color: #cc0000; }

    /* Fields */
    .field-row { display: flex; align-items: center; margin: 8px 14px; }
    .field-label { width: 170px; text-align: right; padding-right: 10px; color: #333; font-size: 12px; flex-shrink: 0; }
    .field-input { flex: 1; max-width: 220px; height: 24px; border: 1px solid #999; padding: 2px 6px; font-size: 12px; }
    .field-input:focus { outline: none; border-color: #006fcf; }

    /* Buttons */
    .btn-row { margin: 14px 14px 14px auto; display: flex; justify-content: flex-start; padding: 0 14px 10px; gap: 10px; }
    .btn-submit { background: linear-gradient(to bottom, #1a7fe8, #005baa); color: #fff; border: 1px solid #004a99; padding: 5px 20px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 3px; }
    .btn-submit:hover { background: linear-gradient(to bottom, #2a8ff8, #0065ba); }
  `]
})
export class AmexPasswordExpiryScreenComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `password-expiry-screen-${++AmexPasswordExpiryScreenComponent._idCounter}`;


  @Input() portalTitle = '';
  @Input() errorMessage = '';
  @Input() successMessage = '';

  @Output() passwordSubmit = new EventEmitter<NewPasswordData>();

  data: NewPasswordData = { newPassword: '', confirmPassword: '' };

  onSubmit() {
    this.passwordSubmit.emit({ ...this.data });
  }
}
