import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';

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
    <div class="amex-shell" [class.onls-style]="portalStyle === 'onls'" [class.oms-style]="portalStyle === 'oms'" role="main" [attr.aria-label]="formTitle">

      <!-- ONLS panel -->
      <div class="panel-onls" *ngIf="portalStyle === 'onls'">

        <div class="panel-header-onls">{{ formTitle }}</div>

        <div class="panel-body-onls">

          <div class="success-banner" *ngIf="successMessage" role="status" aria-live="polite" aria-atomic="true">
            {{ successMessage }}
          </div>
          <div class="error-inline" *ngIf="errorMessage" role="alert" aria-live="assertive" aria-atomic="true">{{ errorMessage }}</div>

          <p class="required-note-onls" role="note" aria-label="All fields are required">*All fields are required</p>

          <ui-form-field class="field-row" layout="horizontal" labelWidth="180px" [label]="currentPasswordLabel" [required]="true" [forId]="id + '-current-password'">
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
          <ui-form-field class="field-row" layout="horizontal" labelWidth="180px" [label]="newPasswordLabel" [required]="true" [forId]="id + '-new-password'">
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
          <ui-form-field class="field-row" layout="horizontal" labelWidth="180px" [label]="confirmPasswordLabel" [required]="true" [forId]="id + '-confirm-password'">
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
              type="button"
              [label]="resolvedSubmitLabel"
              [ariaLabel]="resolvedSubmitLabel"
              (click)="onSubmit()">
            </ui-button>
          </div>

        </div>

      </div>

      <!-- OMS panel -->
      <div class="panel-oms" *ngIf="portalStyle === 'oms'">
        <div class="panel-title-oms">{{ formTitle }}</div>
        <div class="panel-accent"></div>

        <div class="success-banner" *ngIf="successMessage" role="status" aria-live="polite" aria-atomic="true">{{ successMessage }}</div>
        <div class="error-box-oms" *ngIf="errorMessage" role="alert" aria-live="assertive" aria-atomic="true">{{ errorMessage }}</div>

        <p class="required-note-oms" role="note" aria-label="All fields are required">* All fields are required</p>

        <ui-form-field class="field-row" layout="horizontal" labelWidth="170px" [label]="currentPasswordLabel" [required]="true" [forId]="id + '-current-password-oms'">
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
        <ui-form-field class="field-row" layout="horizontal" labelWidth="170px" [label]="newPasswordLabel" [required]="true" [forId]="id + '-new-password-oms'">
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
        <ui-form-field class="field-row" layout="horizontal" labelWidth="170px" [label]="confirmPasswordLabel" [required]="true" [forId]="id + '-confirm-password-oms'">
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
            type="button"
            [label]="resolvedSubmitLabel"
            [ariaLabel]="resolvedSubmitLabel"
            (click)="onSubmit()">
          </ui-button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .amex-shell { font-family: Arial, sans-serif; font-size: 12px; display: inline-block; }
    .onls-style { background: transparent; }
    .oms-style { background: transparent; }

    /* ONLS panel - exact match from screenshot */
    .panel-onls {
      background: #fff; border: 1px solid #b0c8e8; width: 460px; box-sizing: border-box;
    }
    .panel-header-onls { background: #d4e8f8; color: #006fcf; font-weight: bold; font-size: 14px; padding: 10px 16px; border-bottom: 1px solid #b0c8e8; box-sizing: border-box; }

    .panel-body-onls {
      padding: 14px 16px 16px;
      box-sizing: border-box;
      --input-border: 1px solid #999;
      --input-padding: 6px 8px;
      --input-radius: 2px;
      --input-focus-border-color: #006fcf;
      --input-focus-shadow: none;
    }

    .success-banner { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 8px 14px; margin-bottom: 12px; }
    .error-inline { color: #cc0000; padding: 6px 0; font-size: 12px; }
    .required-note-onls { font-size: 12px; color: #555; margin: 0 0 14px 0; }

    .field-row { display: block; margin-bottom: 14px; }

    /* ui-form-field's own flex-based horizontal layout grows the content
       column to fill the row, which fights any width set on the input
       inside it — that's what was causing the input to hug the panel's
       right edge. Overriding to a fixed-column CSS Grid here removes
       that ambiguity: label and input widths are deterministic, not
       computed via flex-grow/stretch, so they can't drift. */
    .field-row ::ng-deep .form-field.form-field--horizontal {
      display: grid;
      grid-template-columns: 180px 220px;
      align-items: center;
      column-gap: 12px;
    }
    .field-row ::ng-deep .form-field-label {
      width: auto !important;
    }
    .field-row ::ng-deep .form-field-content {
      flex: none;
      min-width: 0;
    }

    .field-input-onls {
      display: block;
      width: 100%;
      box-sizing: border-box;
      height: 30px;
      font-size: 13px;
    }

    .btn-row-onls { display: flex; justify-content: flex-end; margin-top: 6px; }
    .btn-change-onls {
      --btn-bg: linear-gradient(to bottom, #1a7fe8, #005baa); --btn-color: #fff;
      --btn-border: 1px solid #004a99; --btn-padding: 5px 18px; --btn-font-size: 12px; --btn-radius: 3px;
    }

    /* OMS panel */
    .panel-oms {
      background: #fff; padding: 20px 24px; width: 440px; box-sizing: border-box; border-radius: 2px;
      --input-border: 1px solid #bbb;
      --input-padding: 2px 6px;
      --input-radius: 2px;
      --input-focus-border-color: #006fcf;
      --input-focus-shadow: none;
    }
    .panel-title-oms { font-size: 16px; font-weight: bold; color: #222; text-transform: uppercase; }
    .panel-accent { height: 3px; background: #7b1fa2; margin: 8px 0 16px 0; }
    .error-box-oms { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 12px; margin-bottom: 12px; }
    .required-note-oms { font-size: 11px; color: #555; margin: 0 0 10px 0; }

    .panel-oms .field-row ::ng-deep .form-field.form-field--horizontal {
      display: grid;
      grid-template-columns: 170px 220px;
      align-items: center;
      column-gap: 12px;
    }

    .field-input-oms {
      display: block;
      width: 100%;
      box-sizing: border-box;
      height: 28px;
      font-size: 12px;
    }
    .btn-row-oms { display: flex; gap: 12px; margin-top: 16px; }
    .btn-back-oms { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 2px; --btn-padding: 7px 20px; --btn-font-size: 12px; }
    .btn-submit-oms { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 2px; --btn-padding: 7px 24px; --btn-font-size: 12px; }

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
  `]
})
export class AmexChangePasswordFormComponent implements AfterViewChecked {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `change-password-form-${++AmexChangePasswordFormComponent._idCounter}`;

  @Input() portalStyle: 'onls' | 'oms' = 'onls';

  /** Shown as the panel heading. Defaults to "Change Password"; pass e.g.
   * "Reset Password" to relabel the whole form for that flow. */
  @Input() formTitle = 'Change Password';

  @Input() currentPasswordLabel = 'Current Password';
  @Input() newPasswordLabel = 'New Password';
  @Input() confirmPasswordLabel = 'Re-enter New Password';

  /** Text on the submit button. Leave unset to mirror formTitle
   * automatically; set explicitly to diverge from it. */
  @Input() submitButtonLabel = '';

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

  get resolvedSubmitLabel(): string {
    return this.submitButtonLabel || this.formTitle;
  }

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