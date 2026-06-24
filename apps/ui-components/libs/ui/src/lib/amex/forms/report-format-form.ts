import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="rff">
      <div class="rff__title">Select your report formats</div>
      <div class="rff__accent"></div>

      <div class="rff__panel">
        <!-- Email checkbox -->
        <div class="rff__email-check">
          <input type="checkbox" id="rff-email" [(ngModel)]="form.receiveByEmail" />
          <label for="rff-email" class="rff__check-label">
            I would like to receive payment details by email.
          </label>
        </div>

        <!-- Settlement Advice radios -->
        <div class="rff__group">
          <div class="rff__group-title">Settlement Advice:</div>
          <label *ngFor="let opt of settlementOptions" class="rff__radio-row">
            <input type="radio" [name]="'settle'" [value]="opt.value"
              [(ngModel)]="form.settlementAdviceFormat" />
            <span class="rff__radio-label">{{ opt.label }}</span>
          </label>
        </div>

        <!-- Submission Details radios -->
        <div class="rff__group">
          <div class="rff__group-title">Submission Details:</div>
          <label *ngFor="let opt of submissionOptions" class="rff__radio-row">
            <input type="radio" [name]="'submit'" [value]="opt.value"
              [(ngModel)]="form.submissionDetailsFormat" />
            <span class="rff__radio-label">{{ opt.label }}</span>
          </label>
        </div>

        <!-- Submit button -->
        <div class="rff__submit-row">
          <button class="rff__btn rff__btn--submit" (click)="submitClick.emit(form)">Submit</button>
        </div>

        <div class="rff__divider"></div>

        <!-- Add Email section -->
        <div class="rff__email-section">
          <div class="rff__email-label">Add Email Address:</div>
          <div class="rff__email-row">
            <input class="rff__email-input" [(ngModel)]="newEmail" placeholder="" />
            <button class="rff__btn rff__btn--add" (click)="addEmail()">Add</button>
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
          <button class="rff__btn rff__btn--back" (click)="backClick.emit()">Back</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .rff__title { font-size: 15px; font-weight: bold; color: #1a3a6b; padding: 0 0 6px; }
    .rff__accent { height: 3px; background: #7b1fa2; margin-bottom: 14px; }
    .rff__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 18px 22px; }

    .rff__email-check { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; }
    .rff__check-label { font-size: 13px; color: #333; cursor: pointer; }

    .rff__group { margin-bottom: 18px; }
    .rff__group-title { font-size: 14px; font-weight: bold; color: #1a3a6b; margin-bottom: 8px; }
    .rff__radio-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; cursor: pointer; }
    .rff__radio-label { font-size: 13px; color: #333; }

    .rff__submit-row { display: flex; justify-content: flex-end; margin-bottom: 14px; }
    .rff__divider { height: 3px; background: #7b1fa2; margin-bottom: 14px; }

    .rff__email-section { border: 1px solid #e0e0e0; padding: 14px 16px; margin-bottom: 14px; }
    .rff__email-label { font-size: 12px; color: #555; margin-bottom: 8px; }
    .rff__email-row { display: flex; gap: 8px; margin-bottom: 8px; }
    .rff__email-input {
      flex: 1; border: 1px solid #ccc; padding: 6px 10px;
      font-size: 13px; font-family: Arial, sans-serif; outline: none;
    }
    .rff__email-input:focus { border-color: #7b1fa2; }
    .rff__email-note { font-size: 13px; color: #1a3a6b; margin-bottom: 8px; }
    .rff__email-list { display: flex; flex-direction: column; gap: 4px; }
    .rff__email-item { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #333; padding: 3px 0; }
    .rff__email-remove { color: #c62828; cursor: pointer; font-size: 16px; padding: 0 4px; }

    .rff__back-row { display: flex; justify-content: flex-end; }
    .rff__btn { padding: 8px 28px; font-size: 13px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .rff__btn--submit { background: #7b1fa2; color: #fff; }
    .rff__btn--submit:hover { background: #6a1b9a; }
    .rff__btn--add { background: #5a7abf; color: #fff; padding: 6px 16px; }
    .rff__btn--add:hover { background: #4a6aaf; }
    .rff__btn--back { background: #1e3a5f; color: #fff; }
    .rff__btn--back:hover { background: #16304f; }
  `],
})
export class AmexReportFormatFormComponent {
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
