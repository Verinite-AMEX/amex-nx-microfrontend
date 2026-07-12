import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  businessName: string;
}

@Component({
  selector: 'amex-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="amex-shell">
      <div class="top-bar">
        <span class="global-sites">Global Sites</span>
      </div>
      <div class="header">
        <div class="logo-box"><span class="logo-text">AMERICAN<br>EXPRESS</span></div>
        <div class="portal-title-wrap">
          <span class="portal-name">{{ portalTitle || 'Online Merchant Services' }}</span>
          <span class="portal-sub">MANAGE YOUR ACCOUNT ONLINE</span>
        </div>
      </div>
      <div class="nav-bar">
        <span class="nav-item active">Register</span>
      </div>

      <div class="content-wrapper">
        <div class="hatched-sidebar"></div>
        <div class="main-content">

          <div class="error-box" *ngIf="errorMessage">{{ errorMessage }}</div>
          <div class="success-box" *ngIf="successMessage">{{ successMessage }}</div>

          <div class="panel">
            <div class="panel-title">NEW USER REGISTRATION</div>
            <div class="panel-accent"></div>

            <p class="required-note">* All fields are required</p>

            <div class="field-row">
              <label class="field-label" [for]="id + '-first-name'">First Name <span class="req">*</span></label>
              <input [id]="id + '-first-name'" type="text" class="field-input" [(ngModel)]="data.firstName" />
            </div>
            <div class="field-row">
              <label class="field-label" [for]="id + '-last-name'">Last Name <span class="req">*</span></label>
              <input [id]="id + '-last-name'" type="text" class="field-input" [(ngModel)]="data.lastName" />
            </div>
            <div class="field-row">
              <label class="field-label" [for]="id + '-email-address'">Email Address <span class="req">*</span></label>
              <input [id]="id + '-email-address'" type="email" class="field-input" [(ngModel)]="data.email" />
            </div>
            <div class="field-row">
              <label class="field-label" [for]="id + '-password'">Password <span class="req">*</span></label>
              <input [id]="id + '-password'" type="password" class="field-input" [(ngModel)]="data.password" />
            </div>
            <div class="field-row">
              <label class="field-label" [for]="id + '-confirm-password'">Confirm Password <span class="req">*</span></label>
              <input [id]="id + '-confirm-password'" type="password" class="field-input" [(ngModel)]="data.confirmPassword" />
            </div>
            <div class="field-row">
              <label class="field-label" [for]="id + '-business-name'">Business Name <span class="req">*</span></label>
              <input [id]="id + '-business-name'" type="text" class="field-input" [(ngModel)]="data.businessName" />
            </div>

            <div class="btn-row">
              <button class="btn-back" (click)="cancel.emit()">Back</button>
              <button class="btn-submit" (click)="onSubmit()">Submit</button>
            </div>
          </div>

        </div>
      </div>

      <div class="footer-links">
        <a class="footer-link">American Express Web Site Rules and Regulations</a> |
        <a class="footer-link">News Centre</a> |
        <a class="footer-link">Fraud Protection Centre</a> |
        <a class="footer-link">Trademarks</a> |
        <a class="footer-link">Privacy Statement</a>
        <span class="footer-copy">Copyright &copy; 2009 American Express Company</span>
      </div>
    </div>
  `,
  styles: [`
    .amex-shell { font-family: Arial, sans-serif; font-size: 12px; background: #f0f0f0; min-height: 500px; display: flex; flex-direction: column; border: 1px solid #ccc; }
    .top-bar { background: #1a3a6b; color: #aac8f0; text-align: right; padding: 2px 10px; font-size: 11px; cursor: pointer; }
    .header { background: #fff; padding: 8px 12px; display: flex; align-items: center; border-bottom: 1px solid #ddd; }
    .logo-box { background: #016fd0; padding: 4px 8px; width: 60px; height: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .logo-text { color: #fff; font-size: 8px; font-weight: bold; line-height: 1.2; text-align: center; }
    .portal-title-wrap { margin-left: 14px; }
    .portal-name { display: block; font-size: 20px; font-weight: bold; color: #006fcf; letter-spacing: 1px; }
    .portal-sub { display: block; font-size: 10px; color: #666; letter-spacing: 1px; }
    .nav-bar { background: #5a6a7a; padding: 0 10px; display: flex; }
    .nav-item { display: inline-block; padding: 7px 16px; font-size: 12px; color: #fff; cursor: pointer; font-weight: bold; background: #3a4a5a; }
    .content-wrapper { display: flex; flex: 1; }
    .hatched-sidebar { width: 0; flex-shrink: 0; }
    .main-content { flex: 1; padding: 20px 30px; background: #e8e8e8; }

    .error-box { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 12px; margin-bottom: 14px; font-size: 12px; }
    .success-box { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 8px 12px; margin-bottom: 14px; font-size: 12px; }

    .panel { background: #fff; padding: 20px 24px; border-radius: 2px; max-width: 520px; }
    .panel-title { font-size: 16px; font-weight: bold; color: #222; letter-spacing: 0.5px; }
    .panel-accent { height: 3px; background: #7b1fa2; margin: 8px 0 16px 0; }
    .required-note { font-size: 11px; color: #555; margin: 0 0 12px 0; }

    .field-row { display: flex; align-items: center; margin-bottom: 10px; }
    .field-label { width: 150px; text-align: right; padding-right: 12px; color: #333; font-size: 12px; flex-shrink: 0; }
    .req { color: #cc0000; }
    .field-input { flex: 1; max-width: 260px; height: 28px; border: 1px solid #bbb; padding: 2px 6px; font-size: 12px; border-radius: 2px; }
    .field-input:focus { outline: none; border-color: #006fcf; box-shadow: 0 0 0 1px #006fcf; }

    .btn-row { display: flex; gap: 12px; margin-top: 20px; }
    .btn-back { background: #1e3a5f; color: #fff; border: none; padding: 7px 24px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }
    .btn-back:hover { background: #0e2a4f; }
    .btn-submit { background: #7b1fa2; color: #fff; border: none; padding: 7px 24px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }
    .btn-submit:hover { background: #6a0f91; }

    .footer-links { background: #f5f5f5; border-top: 1px solid #ddd; padding: 5px 10px; font-size: 10px; color: #666; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
    .footer-link { color: #006fcf; cursor: pointer; }
    .footer-copy { margin-left: auto; }
  `]
})
export class AmexRegisterFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `register-form-${++AmexRegisterFormComponent._idCounter}`;


  @Input() portalTitle = '';
  @Input() errorMessage = '';
  @Input() successMessage = '';

  @Output() registerSubmit = new EventEmitter<RegisterData>();
  @Output() cancel = new EventEmitter<void>();

  data: RegisterData = {
    firstName: '', lastName: '', email: '',
    password: '', confirmPassword: '', businessName: ''
  };

  onSubmit() {
    this.registerSubmit.emit({ ...this.data });
  }
}
