import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  HostBinding,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';

export interface ForgotUserIdRequest {
  emailAddress: string;
  merchantNumber: string;
}

@Component({
  selector: 'amex-forgot-user-id-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormFieldComponent,
    InputComponent,
    ButtonComponent,
  ],

  template: `
    <div
      class="amex-shell"
      [class.onls-style]="portalStyle === 'onls'"
      [class.oms-style]="portalStyle === 'oms'"
    >

      <!-- ===================== ONLS ===================== -->

      <ng-container *ngIf="portalStyle === 'onls'">

        <div class="top-bar">
          <span class="global-sites">Global Sites</span>
        </div>

        <div class="header">
          <div class="logo-box">
            <span class="logo-text">
              AMERICAN<br />EXPRESS
            </span>
          </div>

          <div class="portal-title-wrap">
            <span class="portal-name">
              {{ portalTitle || 'Online Merchant Services' }}
            </span>

            <span class="portal-sub">
              MANAGE YOUR ACCOUNT ONLINE
            </span>
          </div>
        </div>

        <div class="nav-bar">
          <span class="nav-item active">
            Forgot User ID
          </span>
        </div>

        <div class="content-wrapper">
          <div class="hatched-sidebar"></div>

          <div class="main-content">

            <div class="panel">

              <div class="panel-title">
                FORGOT USER ID
              </div>

              <div class="panel-accent"></div>

              <div
                class="success-box"
                *ngIf="submitted && !errorMessage"
              >
                Your User ID has been sent to your registered email address.
              </div>

              <div
                class="error-box"
                *ngIf="errorMessage"
              >
                {{ errorMessage }}
              </div>

              <ng-container *ngIf="!submitted || errorMessage">

                <p class="help-text">
                  Please enter your registered email address.
                  Your User ID will be sent to that address.
                </p>

                <ui-form-field
                  class="field-row"
                  layout="horizontal"
                  labelWidth="140px"
                  label="Email Address"
                  [required]="true"
                  [forId]="id + '-email-address'"
                >
                  <ui-input
                    class="field-input"
                    [id]="id + '-email-address'"
                    type="email"
                    [required]="true"
                    [(ngModel)]="email"
                    placeholder="Enter registered email"
                  >
                  </ui-input>
                </ui-form-field>

                <div class="btn-row">

                  <ui-button
                    class="btn-back"
                    variant="primary"
                    label="Back to Login"
                    (click)="backToLogin.emit()"
                  >
                  </ui-button>

                  <ui-button
                    class="btn-submit"
                    variant="primary"
                    label="Submit"
                    (click)="onSubmitOnls()"
                  >
                  </ui-button>

                </div>

              </ng-container>

              <div
                class="back-link"
                *ngIf="submitted && !errorMessage"
              >
                <a
                  class="form-link"
                  (click)="backToLogin.emit()"
                >
                  Back to Login
                </a>
              </div>

            </div>

          </div>
        </div>

        <div class="footer-links">

          <a class="footer-link">
            American Express Web Site Rules and Regulations
          </a>

          |

          <a class="footer-link">
            News Centre
          </a>

          |

          <a class="footer-link">
            Fraud Protection Centre
          </a>

          |

          <a class="footer-link">
            Trademarks
          </a>

          |

          <a class="footer-link">
            Privacy Statement
          </a>

          <span class="footer-copy">
            Copyright &copy; 2009 American Express Company
          </span>

        </div>

      </ng-container>


      <!-- ===================== OMS ===================== -->

      <ng-container *ngIf="portalStyle === 'oms'">

        <div class="oms-wrapper">

          <div class="oms-card">

            <div
              class="error-box"
              *ngIf="errorMessage"
            >
              {{ errorMessage }}
            </div>

            <div
              class="success-box"
              *ngIf="submitted && !errorMessage"
            >
              Your User ID has been sent to your registered email address.
            </div>

            <ng-container *ngIf="!submitted || errorMessage">

              <ui-input
                #emailInputOms
                class="oms-input"
                [id]="id + '-oms-email'"
                type="email"
                placeholder="Email Address"
                [required]="true"
                [(ngModel)]="email"
                ariaLabel="Email Address"
                (keydown.enter)="onEnterSubmit($event)"
              >
              </ui-input>

              <ui-input
                class="oms-input"
                [id]="id + '-oms-merchant'"
                type="text"
                placeholder="Merchant Number"
                [required]="true"
                [(ngModel)]="merchantNumber"
                ariaLabel="Merchant Number"
                (keydown.enter)="onEnterSubmit($event)"
              >
              </ui-input>

              <div class="oms-btn-row">

                <ui-button
                  class="btn-back-oms"
                  variant="primary"
                  label="Back"
                  (click)="backToLogin.emit()"
                >
                </ui-button>

                <ui-button
                  class="btn-submit-oms"
                  variant="primary"
                  label="Submit"
                  (click)="onSubmitOms()"
                >
                </ui-button>

              </div>

            </ng-container>

            <div
              class="back-link"
              *ngIf="submitted && !errorMessage"
            >
              <a
                class="form-link"
                (click)="backToLogin.emit()"
              >
                Back to Login
              </a>
            </div>

          </div>

        </div>

      </ng-container>

    </div>
  `,

  styles: [`

    /* ===================== COMMON ===================== */

    .amex-shell {
      font-family: Arial, sans-serif;
      font-size: 12px;
      min-height: 400px;
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
    }

    .onls-style {
      background: #f0f0f0;
    }

    .oms-style {
      background: #fff;
    }


    /* ===================== ONLS ===================== */

    .top-bar {
      background: #1a3a6b;
      color: #aac8f0;
      text-align: right;
      padding: 2px 10px;
      font-size: 11px;
    }

    .header {
      background: #fff;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
    }

    .logo-box {
      background: #016fd0;
      padding: 4px 8px;
      width: 60px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .logo-text {
      color: #fff;
      font-size: 8px;
      font-weight: bold;
      line-height: 1.2;
      text-align: center;
    }

    .portal-title-wrap {
      margin-left: 14px;
    }

    .portal-name {
      display: block;
      font-size: 20px;
      font-weight: bold;
      color: #006fcf;
      letter-spacing: 1px;
    }

    .portal-sub {
      display: block;
      font-size: 10px;
      color: #666;
      letter-spacing: 1px;
    }

    .nav-bar {
      background: #5a6a7a;
      padding: 0 10px;
      display: flex;
    }

    .nav-item {
      display: inline-block;
      padding: 7px 16px;
      font-size: 12px;
      color: #fff;
      cursor: pointer;
      font-weight: bold;
      background: #3a4a5a;
    }

    .content-wrapper {
      display: flex;
      flex: 1;
    }

    .hatched-sidebar {
      width: 0;
    }

    .main-content {
      flex: 1;
      padding: 20px 30px;
      background: #e8e8e8;
    }

    .panel {
      background: #fff;
      padding: 20px 24px;
      max-width: 480px;

      --input-border: 1px solid #bbb;
      --input-padding: 2px 6px;
      --input-radius: 2px;
      --input-focus-border-color: #006fcf;
      --input-focus-shadow: none;
    }

    .panel-title {
      font-size: 16px;
      font-weight: bold;
      color: #222;
    }

    .panel-accent {
      height: 3px;
      background: #7b1fa2;
      margin: 8px 0 16px 0;
    }

    .help-text {
      color: #444;
      font-size: 12px;
      margin: 0 0 16px 0;
      line-height: 1.5;
    }

    .field-row {
      margin-bottom: 12px;
    }

    .field-input {
      width: 240px;
      height: 28px;
      font-size: 12px;
    }

    .btn-row {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }

    .btn-back {
      --btn-bg: #1e3a5f;
      --btn-color: #fff;
      --btn-radius: 2px;
      --btn-padding: 7px 20px;
      --btn-font-size: 12px;
    }

    .btn-submit {
      --btn-bg: #7b1fa2;
      --btn-color: #fff;
      --btn-radius: 2px;
      --btn-padding: 7px 24px;
      --btn-font-size: 12px;
    }


    /* ===================== OMS ===================== */

    .oms-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-start;
       padding: 20px 0 4px;
      box-sizing: border-box;
    }

  .oms-card {
  width: 370px;
  box-sizing: border-box;
 margin-left: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-top: 4px solid #7b1fa2;

  padding: 18px 12px 16px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

    .oms-input {
  display: block;
  width: 100%;
  height: 30px;
  font-size: 12px;

  --input-border: 1px solid #bbb;
  --input-padding: 6px 10px;
  --input-radius: 2px;
  --input-focus-border-color: #006fcf;
  --input-focus-shadow: none;
}

.oms-btn-row {
  display: flex;
  gap: 26px;
  margin-top: 18px;
  width: 100%;
}

.btn-back-oms,
.btn-submit-oms {
  flex: 1 1 0;
  min-width: 0;
  width: 100%;
  display: block;
  --btn-width: 100%;
   --btn-justify-content: center;
}

.btn-back-oms {
  --btn-bg: #252d83;
  --btn-color: #fff;
  --btn-radius: 3px;
  --btn-padding: 7px 0;
  --btn-font-size: 12px;
  --btn-font-weight: 600;
}

.btn-submit-oms {
  --btn-bg: #aa5aa5;
  --btn-color: #fff;
  --btn-radius: 3px;
  --btn-padding: 7px 0;
  --btn-font-size: 12px;
  --btn-font-weight: 600;
}

    /* ===================== SHARED ===================== */

    .error-box {
      background: #f2dede;
      border: 1px solid #ebccd1;
      color: #a94442;
      padding: 8px 12px;
      margin-bottom: 14px;
    }

    .success-box {
      background: #dff0d8;
      border: 1px solid #c3e6cb;
      color: #3c763d;
      padding: 10px 14px;
      margin-bottom: 14px;
      font-size: 12px;
    }

    .back-link {
      margin-top: 12px;
    }

    .form-link {
      color: #006fcf;
      cursor: pointer;
      font-size: 12px;
      text-decoration: underline;
    }

    .footer-links {
      background: #f5f5f5;
      border-top: 1px solid #ddd;
      padding: 5px 10px;
      font-size: 10px;
      color: #666;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .footer-link {
      color: #006fcf;
      cursor: pointer;
    }

    .footer-copy {
      margin-left: auto;
    }

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

  `],
})
export class AmexForgotUserIdFormComponent
  implements AfterViewChecked {

  private static _idCounter = 0;

  @HostBinding('attr.id')
  @Input()
  id = `forgot-user-id-form-${++AmexForgotUserIdFormComponent._idCounter}`;

  /** 'onls' (default, existing look) or 'oms' (Online Merchant Services look). */
  @Input()
  portalStyle: 'onls' | 'oms' = 'onls';

  @Input()
  portalTitle = '';

  @Input()
  errorMessage = '';

  /** OMS-only: top info strip. */
  @Input()
  bannerMessage = '';

  /** OMS-only: right-hand hero image. */
  @Input()
  sideImageUrl = '';

  /** Emitted for the ONLS flow (email only). */
  @Output()
  submitEmail = new EventEmitter<string>();

  /** Emitted for the OMS flow (email + merchant number). */
  @Output()
  submitRequest = new EventEmitter<ForgotUserIdRequest>();

  @Output()
  backToLogin = new EventEmitter<void>();

  @ViewChild('emailInputOms')
  private emailInputOms?: InputComponent;

  email = '';

  merchantNumber = '';

  submitted = false;

  private autofocusedStyle: 'onls' | 'oms' | null = null;

  ngAfterViewChecked(): void {
    if (
      this.portalStyle !== 'oms' ||
      this.autofocusedStyle === 'oms'
    ) {
      return;
    }

    if (this.emailInputOms) {
      this.emailInputOms.focus();
      this.autofocusedStyle = 'oms';
    }
  }

  onSubmitOnls(): void {
    this.submitted = true;
    this.submitEmail.emit(this.email);
  }

  onSubmitOms(): void {
    if (
      !this.email.trim() ||
      !this.merchantNumber.trim()
    ) {
      this.errorMessage =
        'Email Address and Merchant Number are required.';
      return;
    }

    this.errorMessage = '';

    this.submitted = true;

    this.submitRequest.emit({
      emailAddress: this.email,
      merchantNumber: this.merchantNumber,
    });
  }

  onEnterSubmit(event: Event): void {
    event.preventDefault();
    this.onSubmitOms();
  }

  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {
    if (
      event.key === 'Escape' &&
      this.portalStyle === 'oms'
    ) {
      this.emailInputOms?.focus();
    }
  }
}