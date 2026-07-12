import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, AfterViewInit, HostBinding } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'amex-forgot-password-form',
  standalone: true,
  imports: [CommonModule, FormsModule],

  template: `
    <div
      class="amex-shell"
      [class.onls-style]="portalStyle === 'onls'"
      [class.oms-style]="portalStyle === 'oms'"
      role="main"
      aria-label="Forgot password form"
    >

      <!-- ONLS TOP BAR -->
      <div class="top-bar" *ngIf="portalStyle === 'onls'">
        <span class="global-sites">Global Sites</span>
        <span class="log-out">Log Out</span>
      </div>

      <!-- OMS TOP BAR -->
      <div class="top-bar-oms" *ngIf="portalStyle === 'oms'">
        <button class="oms-logout-btn">LOG OUT</button>
      </div>

      <!-- ONLS HEADER -->
      <div class="header-onls" *ngIf="portalStyle === 'onls'">
        <div class="logo-box">
          <span class="logo-text">
            AMERICAN<br />
            EXPRESS
          </span>
        </div>
      </div>

      <!-- OMS HEADER -->
      <div class="header-oms" *ngIf="portalStyle === 'oms'">
        <div class="logo-box">
          <span class="logo-text">
            AMERICAN<br />
            EXPRESS
          </span>
        </div>

        <div class="oms-title-wrap">
          <span class="oms-title">
            {{ portalTitle || 'Online Merchant Services' }}
          </span>

          <span class="oms-sub">
            MANAGE YOUR ACCOUNT ONLINE
          </span>
        </div>
      </div>

      <!-- NAV -->
      <div class="nav-onls" *ngIf="portalStyle === 'onls'">
        <span class="nav-item-onls active">
          Forgot Password
        </span>
      </div>

      <div class="nav-oms" *ngIf="portalStyle === 'oms'">
        <span class="nav-item-oms active">
          Forgot Password
        </span>
      </div>

      <!-- CONTENT -->
      <div class="content-wrapper">

        <div
          class="hatched-sidebar"
          *ngIf="portalStyle === 'onls'"
        ></div>

        <div class="main-content">

          <!-- ONLS PANEL -->
          <div
            class="panel-onls"
            *ngIf="portalStyle === 'onls'"
          >

            <div
              class="success-box"
              *ngIf="success && !errorMessage"
            >
              Your temporary password has been sent to your registered email address.
            </div>

            <div
              class="error-box"
              *ngIf="errorMessage"
            >
              {{ errorMessage }}
            </div>

            <ng-container *ngIf="!success || errorMessage">

              <p class="help-text">
                Please enter your User ID and registered Email Address.
              </p>

              <!-- USER ID -->
              <div class="field-row">
                <label class="field-label" [for]="id + '-user-id'">
                  User ID
                  <span class="req">*</span>
                </label>

                <input [id]="id + '-user-id'"
                  type="text"
                  class="field-input"
                  [(ngModel)]="userId"
                  (keydown)="onKeydown($event)"
                  #identifierInput
                />
              </div>

              <!-- EMAIL -->
              <div class="field-row">
                <label class="field-label" [for]="id + '-email-id'">
                  Email ID
                  <span class="req">*</span>
                </label>

                <input [id]="id + '-email-id'"
                  type="email"
                  class="field-input"
                  [(ngModel)]="emailId"
                  (keydown)="onKeydown($event)"
                />
              </div>

              <div class="btn-row-onls">
                <button
                  class="btn-submit-onls"
                  (click)="onSubmit()"
                  #onlsSubmitBtn
                >
                  Submit
                </button>
              </div>

            </ng-container>

            <div
              class="back-link"
              *ngIf="success && !errorMessage"
            >
              <a
                class="form-link"
                (click)="backToLogin.emit()"
                tabindex="0"
                #onlsBackLink
              >
                Back to Login
              </a>
            </div>

          </div>

          <!-- OMS PANEL -->
          <div
            class="panel-oms"
            *ngIf="portalStyle === 'oms'"
          >

            <div class="panel-title">
              FORGOT PASSWORD
            </div>

            <div class="panel-accent"></div>

            <div
              class="success-box"
              *ngIf="success && !errorMessage"
            >
              Your temporary password has been sent to your registered email address.
            </div>

            <div
              class="error-box"
              *ngIf="errorMessage"
            >
              {{ errorMessage }}
            </div>

            <ng-container *ngIf="!success || errorMessage">

              <p class="help-text">
                Please enter your User ID and registered Email Address.
              </p>

              <!-- USER ID -->
              <div class="field-row">
                <label class="field-label" [for]="id + '-user-id-2'">
                  User ID
                  <span class="req">*</span>
                </label>

                <input [id]="id + '-user-id-2'"
                  type="text"
                  class="field-input-oms"
                  [(ngModel)]="userId"
                  (keydown)="onKeydown($event)"
                  #identifierInputOms
                />
              </div>

              <!-- EMAIL -->
              <div class="field-row">
                <label class="field-label" [for]="id + '-email-id-2'">
                  Email ID
                  <span class="req">*</span>
                </label>

                <input [id]="id + '-email-id-2'"
                  type="email"
                  class="field-input-oms"
                  [(ngModel)]="emailId"
                  (keydown)="onKeydown($event)"
                />
              </div>

              <div class="btn-row-oms">

                <button
                  class="btn-back-oms"
                  (click)="backToLogin.emit()"
                  #omsBackBtn
                >
                  Back to Login
                </button>

                <button
                  class="btn-submit-oms"
                  (click)="onSubmit()"
                  #omsSubmitBtn
                >
                  Submit
                </button>

              </div>

            </ng-container>

            <div
              class="back-link"
              *ngIf="success && !errorMessage"
            >
              <a
                class="form-link"
                (click)="backToLogin.emit()"
                tabindex="0"
                #omsBackLink
              >
                ← Back to Login
              </a>
            </div>

          </div>

        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer-links">

        <a class="footer-link" href="#">
          American Express Web Site Rules and Regulations
        </a>

        |

        <a class="footer-link" href="#">
          News Centre
        </a>

        |

        <a class="footer-link" href="#">
          Fraud Protection Centre
        </a>

        |

        <a class="footer-link" href="#">
          Trademarks
        </a>

        |

        <a class="footer-link" href="#">
          Privacy Statement
        </a>

        <span class="footer-copy">
          Copyright © 2009 American Express Company
        </span>

      </div>

    </div>
  `,

  styles: [`
    .amex-shell {
      font-family: Arial, sans-serif;
      font-size: 12px;
      min-height: 380px;
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
    }

    .onls-style {
      background: #f0f0f0;
    }

    .oms-style {
      background: #e8e8e8;
    }

    .top-bar {
      background: #1a3a6b;
      color: #aac8f0;
      padding: 2px 10px;
      font-size: 11px;
      display: flex;
      justify-content: flex-end;
      gap: 14px;
    }

    .top-bar-oms {
      background: #fff;
      display: flex;
      justify-content: flex-end;
      padding: 4px 10px;
      border-bottom: 1px solid #eee;
    }

    .oms-logout-btn {
      background: #1e3a5f;
      color: #fff;
      border: none;
      padding: 4px 14px;
      font-size: 11px;
      font-weight: bold;
      cursor: pointer;
    }

    .header-onls,
    .header-oms {
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
    }

    .logo-text {
      color: #fff;
      font-size: 8px;
      font-weight: bold;
      line-height: 1.2;
      text-align: center;
    }

    .oms-title-wrap {
      margin-left: 14px;
    }

    .oms-title {
      display: block;
      font-size: 20px;
      font-weight: bold;
      color: #006fcf;
    }

    .oms-sub {
      display: block;
      font-size: 10px;
      color: #666;
    }

    .nav-onls,
    .nav-oms {
      padding: 0 10px;
      display: flex;
    }

    .nav-onls {
      background: #fff;
      border-bottom: 2px solid #ddd;
    }

    .nav-oms {
      background: #5a6a7a;
    }

    .nav-item-onls,
    .nav-item-oms {
      padding: 7px 16px;
      font-size: 12px;
      font-weight: bold;
    }

    .nav-item-onls {
      color: #006fcf;
      border-bottom: 3px solid #006fcf;
    }

    .nav-item-oms {
      color: #fff;
      background: #3a4a5a;
    }

    .content-wrapper {
      display: flex;
      flex: 1;
    }

    .hatched-sidebar {
      width: 130px;
      background: repeating-linear-gradient(
        135deg,
        #c8c8c8 0px,
        #c8c8c8 1px,
        #e8e8e8 1px,
        #e8e8e8 8px
      );
    }

    .main-content {
      flex: 1;
      padding: 20px 30px;
    }

    .panel-onls,
    .panel-oms {
      background: #fff;
      padding: 20px;
      max-width: 480px;
    }

    .panel-onls {
      border: 1px solid #ccc;
    }

    .panel-title {
      font-size: 16px;
      font-weight: bold;
    }

    .panel-accent {
      height: 3px;
      background: #7b1fa2;
      margin: 8px 0 16px;
    }

    .help-text {
      margin-bottom: 14px;
      line-height: 1.5;
    }

    .error-box {
      background: #f2dede;
      border: 1px solid #ebccd1;
      color: #a94442;
      padding: 8px 12px;
      margin-bottom: 12px;
    }

    .success-box {
      background: #dff0d8;
      border: 1px solid #c3e6cb;
      color: #3c763d;
      padding: 10px 14px;
      margin-bottom: 14px;
    }

    .field-row {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    .field-label {
      width: 160px;
      text-align: right;
      padding-right: 10px;
    }

    .req {
      color: red;
    }

    .field-input {
      width: 220px;
      height: 24px;
      border: 1px solid #999;
      padding: 2px 6px;
    }

    .field-input-oms {
      flex: 1;
      max-width: 240px;
      height: 28px;
      border: 1px solid #bbb;
      padding: 2px 6px;
    }

    .btn-row-onls {
      margin-top: 14px;
      display: flex;
      justify-content: flex-end;
    }

    .btn-submit-onls {
      background: linear-gradient(to bottom, #1a7fe8, #005baa);
      color: #fff;
      border: 1px solid #004a99;
      padding: 5px 18px;
      font-weight: bold;
      cursor: pointer;
    }

    .btn-row-oms {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }

    .btn-back-oms,
    .btn-submit-oms {
      color: #fff;
      border: none;
      padding: 7px 20px;
      font-weight: bold;
      cursor: pointer;
    }

    .btn-back-oms {
      background: #1e3a5f;
    }

    .btn-submit-oms {
      background: #7b1fa2;
    }

    .form-link {
      color: #006fcf;
      text-decoration: underline;
      cursor: pointer;
    }

    .footer-links {
      background: #f5f5f5;
      border-top: 1px solid #ddd;
      padding: 5px 10px;
      font-size: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .footer-copy {
      margin-left: auto;
    }
  `]
})

export class AmexForgotPasswordFormComponent implements AfterViewInit {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `forgot-password-form-${++AmexForgotPasswordFormComponent._idCounter}`;



  @Input() portalStyle: 'onls' | 'oms' = 'onls';
  @Input() portalTitle = '';
  @Input() errorMessage = '';
  @Input() success = false;

  @Output() submitIdentifier = new EventEmitter<{
    userId: string;
    emailId: string;
  }>();

  @Output() backToLogin = new EventEmitter<void>();

  @ViewChild('identifierInput')
  identifierInput!: ElementRef<HTMLInputElement>;

  @ViewChild('identifierInputOms')
  identifierInputOms!: ElementRef<HTMLInputElement>;

  userId = '';
  emailId = '';


  ngAfterViewInit(): void {
    const firstInput =
      this.portalStyle === 'onls'
        ? this.identifierInput
        : this.identifierInputOms;

    firstInput?.nativeElement.focus();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit();
    }
  }

  onSubmit(): void {
  if (!this.userId.trim() || !this.emailId.trim()) {
    this.errorMessage = 'User ID and Email ID are required';
    return;
  }
  this.errorMessage = '';
  this.submitIdentifier.emit({
    userId: this.userId,
    emailId: this.emailId
  });
}

  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {

    if (event.key === 'Escape') {

      const firstInput =
        this.portalStyle === 'onls'
          ? this.identifierInput
          : this.identifierInputOms;

      firstInput?.nativeElement.focus();
    }
  }
}