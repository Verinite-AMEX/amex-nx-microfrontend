import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../../composite/panel';
import { CheckboxComponent } from '../../../primitives/checkbox';
import { RadioGroupComponent } from '../../../primitives/radio-group';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';
import { LabelComponent } from '../../../primitives/label';

export interface ReportFormatData {
  receiveByEmail: boolean;
  settlementAdviceFormat: string;
  submissionDetailsFormat: string;
  emailAddresses: string[];
}

/**
 * ReportFormatForm
 * OMS: "Select your report formats" — email checkbox, Settlement Advice radio, Submission Details radio.
 * "Add Email Address" input with Add button. Navy Back + purple Submit.
 * Source: OMS (image22) — exact match
 */
@Component({
  selector: 'amex-report-format-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PanelComponent, CheckboxComponent, RadioGroupComponent, InputComponent, ButtonComponent, LabelComponent],
  template: `
    <ui-panel title="Select your report formats" variant="accent">
      <!-- Email checkbox -->
      <div class="rff__email-check">
        <ui-checkbox [id]="id + '-email'" [(ngModel)]="form.receiveByEmail"
          label="I would like to receive payment details by email."></ui-checkbox>
      </div>

      <!-- Settlement Advice radios -->
      <div class="rff__group">
        <ui-radio-group name="settle" legend="Settlement Advice:" [options]="settlementOptions" [(ngModel)]="form.settlementAdviceFormat"></ui-radio-group>
      </div>

      <!-- Submission Details radios -->
      <div class="rff__group">
        <ui-radio-group name="submit" legend="Submission Details:" [options]="submissionOptions" [(ngModel)]="form.submissionDetailsFormat"></ui-radio-group>
      </div>

      <!-- Submit button -->
      <div class="rff__submit-row">
        <ui-button class="rff__btn rff__btn--submit" variant="primary" label="Submit" (click)="submitClick.emit(form)"></ui-button>
      </div>

      <div class="rff__divider"></div>

      <!-- Add Email section -->
      <div class="rff__email-section">
        <ui-label class="rff__email-label" [forId]="id + '-new-email'">Add Email Address:</ui-label>
        <div class="rff__email-row">
          <ui-input [id]="id + '-new-email'" class="rff__email-input" [(ngModel)]="newEmail"></ui-input>
          <ui-button class="rff__btn rff__btn--add" variant="secondary" label="Add" (click)="addEmail()"></ui-button>
        </div>
        <div class="rff__email-note">
          Email address(es) registered for receiving payment details via email are
        </div>
        <div class="rff__email-list">
          <div *ngFor="let e of form.emailAddresses; let i = index" class="rff__email-item">
            <span>{{ e }}</span>
            <span class="rff__email-remove" (click)="removeEmail(i)">×</span>
          </div>
        </div>
      </div>

      <!-- Back button -->
      <div class="rff__back-row">
        <ui-button class="rff__btn rff__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --panel-title-size: 15px;
      --panel-padding: 18px 22px;
      --input-border: 1px solid #ccc;
      --input-padding: 6px 10px;
      --input-focus-border-color: #7b1fa2;
    }

    .rff__email-check { margin-bottom: 18px; }
    .rff__group { margin-bottom: 18px; }
    .rff__submit-row { display: flex; justify-content: flex-end; margin-bottom: 14px; }
    .rff__divider { height: 3px; background: #7b1fa2; margin-bottom: 14px; }

    .rff__email-section { border: 1px solid #e0e0e0; padding: 14px 16px; margin-bottom: 14px; }
    .rff__email-label { display: block; font-size: 12px; color: #555; margin-bottom: 8px; }
    .rff__email-row { display: flex; gap: 8px; margin-bottom: 8px; align-items: flex-start; }
    .rff__email-input { flex: 1; }
    .rff__email-note { font-size: 13px; color: #1a3a6b; margin-bottom: 8px; }
    .rff__email-list { display: flex; flex-direction: column; gap: 4px; }
    .rff__email-item { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #333; padding: 3px 0; }
    .rff__email-remove { color: #c62828; cursor: pointer; font-size: 16px; padding: 0 4px; }

    .rff__back-row { display: flex; justify-content: flex-end; }
    .rff__btn--submit { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 8px 28px; --btn-font-size: 13px; }
    .rff__btn--add { --btn-bg: #5a7abf; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 6px 16px; --btn-font-size: 13px; }
    .rff__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 8px 28px; --btn-font-size: 13px; }
  `],
})
export class AmexReportFormatFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `report-format-form-${++AmexReportFormatFormComponent._idCounter}`;

  @Input() settlementOptions = [
    { value: 'pdf', label: 'Adobe PDF' },
    { value: 'excel', label: 'Microsoft Excel' },
  ];
  @Input() submissionOptions = [
    { value: 'pdf', label: 'Adobe PDF' },
    { value: 'excel', label: 'Microsoft Excel' },
    { value: 'csv', label: 'Comma Separated Values (CSV)' },
    { value: 'extended_csv', label: 'Extended (CSV)' },
    { value: 'merchant_excel', label: 'Merchant Extended Excel' },
    { value: 'online_csv', label: 'Online Merchants (CSV)' },
  ];

  form: ReportFormatData = {
    receiveByEmail: false,
    settlementAdviceFormat: 'pdf',
    submissionDetailsFormat: 'pdf',
    emailAddresses: [],
  };
  newEmail = '';

  @Output() submitClick = new EventEmitter<ReportFormatData>();
  @Output() backClick   = new EventEmitter<void>();

  addEmail() {
    if (this.newEmail.trim()) {
      this.form.emailAddresses = [...this.form.emailAddresses, this.newEmail.trim()];
      this.newEmail = '';
    }
  }
  removeEmail(i: number) {
    this.form.emailAddresses = this.form.emailAddresses.filter((_, idx) => idx !== i);
  }
}