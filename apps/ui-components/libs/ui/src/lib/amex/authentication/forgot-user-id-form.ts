import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'amex-forgot-user-id-form',
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
        <span class="nav-item active">Forgot User ID</span>
      </div>

      <div class="content-wrapper">
        <div class="hatched-sidebar"></div>
        <div class="main-content">

          <div class="panel">
            <div class="panel-title">FORGOT USER ID</div>
            <div class="panel-accent"></div>

            <div class="success-box" *ngIf="submitted && !errorMessage">
              Your User ID has been sent to your registered email address.
            </div>

            <div class="error-box" *ngIf="errorMessage">{{ errorMessage }}</div>

            <ng-container *ngIf="!submitted || errorMessage">
              <p class="help-text">
                Please enter your registered email address. Your User ID will be sent to that address.
              </p>

              <div class="field-row">
                <label class="field-label">Email Address <span class="req">*</span></label>
                <input type="email" class="field-input" [(ngModel)]="email" placeholder="Enter registered email" />
              </div>

              <div class="btn-row">
                <button class="btn-back" (click)="backToLogin.emit()">Back to Login</button>
                <button class="btn-submit" (click)="onSubmit()">Submit</button>
              </div>
            </ng-container>

            <div class="back-link" *ngIf="submitted && !errorMessage">
              <a class="form-link" (click)="backToLogin.emit()">Back to Login</a>
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
    .amex-shell { font-family: Arial, sans-serif; font-size: 12px; background: #f0f0f0; min-height: 400px; display: flex; flex-direction: column; border: 1px solid #ccc; }
    .top-bar { background: #1a3a6b; color: #aac8f0; text-align: right; padding: 2px 10px; font-size: 11px; }
    .header { background: #fff; padding: 8px 12px; display: flex; align-items: center; border-bottom: 1px solid #ddd; }
    .logo-box { background: #016fd0; padding: 4px 8px; width: 60px; height: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .logo-text { color: #fff; font-size: 8px; font-weight: bold; line-height: 1.2; text-align: center; }
    .portal-title-wrap { margin-left: 14px; }
    .portal-name { display: block; font-size: 20px; font-weight: bold; color: #006fcf; letter-spacing: 1px; }
    .portal-sub { display: block; font-size: 10px; color: #666; letter-spacing: 1px; }
    .nav-bar { background: #5a6a7a; padding: 0 10px; display: flex; }
    .nav-item { display: inline-block; padding: 7px 16px; font-size: 12px; color: #fff; cursor: pointer; font-weight: bold; background: #3a4a5a; }
    .content-wrapper { display: flex; flex: 1; }
    .hatched-sidebar { width: 0; }
    .main-content { flex: 1; padding: 20px 30px; background: #e8e8e8; }

    .panel { background: #fff; padding: 20px 24px; max-width: 480px; }
    .panel-title { font-size: 16px; font-weight: bold; color: #222; }
    .panel-accent { height: 3px; background: #7b1fa2; margin: 8px 0 16px 0; }

    .help-text { color: #444; font-size: 12px; margin: 0 0 16px 0; line-height: 1.5; }

    .error-box { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 12px; margin-bottom: 14px; }
    .success-box { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 10px 14px; margin-bottom: 14px; font-size: 12px; }

    .field-row { display: flex; align-items: center; margin-bottom: 12px; }
    .field-label { width: 140px; text-align: right; padding-right: 12px; color: #333; font-size: 12px; flex-shrink: 0; }
    .req { color: #cc0000; }
    .field-input { flex: 1; max-width: 240px; height: 28px; border: 1px solid #bbb; padding: 2px 6px; font-size: 12px; border-radius: 2px; }
    .field-input:focus { outline: none; border-color: #006fcf; }

    .btn-row { display: flex; gap: 12px; margin-top: 16px; }
    .btn-back { background: #1e3a5f; color: #fff; border: none; padding: 7px 20px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }
    .btn-submit { background: #7b1fa2; color: #fff; border: none; padding: 7px 24px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }

    .back-link { margin-top: 12px; }
    .form-link { color: #006fcf; cursor: pointer; font-size: 12px; text-decoration: underline; }

    .footer-links { background: #f5f5f5; border-top: 1px solid #ddd; padding: 5px 10px; font-size: 10px; color: #666; display: flex; flex-wrap: wrap; gap: 4px; }
    .footer-link { color: #006fcf; cursor: pointer; }
    .footer-copy { margin-left: auto; }
  `]
})
export class AmexForgotUserIdFormComponent {
  @Input() portalTitle = '';
  @Input() errorMessage = '';

  @Output() submitEmail = new EventEmitter<string>();
  @Output() backToLogin = new EventEmitter<void>();

  email = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.submitEmail.emit(this.email);
  }
}
