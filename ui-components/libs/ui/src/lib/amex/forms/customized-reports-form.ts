import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CustomizedReportData {
  reportType: string;
  dateFrom: string;
  dateTo: string;
  emailSubscription: boolean;
}

/**
 * CustomizedReportsForm
 * OMS: Report type tabs + date range + email subscription toggle.
 * Source: OMS — OMS style, tab switcher, navy/purple buttons
 */
@Component({
  selector: 'amex-customized-reports-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="crf">
      <div class="crf__title">Customized Reports</div>
      <div class="crf__accent"></div>
      <div class="crf__panel">
        <!-- Report type tabs -->
        <div class="crf__tabs">
          <button *ngFor="let t of reportTypes"
            class="crf__tab"
            [class.crf__tab--active]="form.reportType === t.value"
            (click)="form.reportType = t.value">
            {{ t.label }}
          </button>
        </div>

        <!-- Date range -->
        <div class="crf__fields">
          <div class="crf__field">
            <label class="crf__label" [for]="id + '-date-from'">Date From</label>
            <input [id]="id + '-date-from'" class="crf__input" type="text" [(ngModel)]="form.dateFrom" placeholder="dd/mm/yyyy" />
          </div>
          <div class="crf__field">
            <label class="crf__label" [for]="id + '-date-to'">Date To</label>
            <input [id]="id + '-date-to'" class="crf__input" type="text" [(ngModel)]="form.dateTo" placeholder="dd/mm/yyyy" />
          </div>
        </div>

        <!-- Email subscription toggle -->
        <div class="crf__sub-row">
          <label class="crf__sub-label">
            <input type="checkbox" [(ngModel)]="form.emailSubscription" />
            <span>Subscribe to email notifications for this report</span>
          </label>
        </div>

        <div class="crf__actions">
          <button class="crf__btn crf__btn--back" (click)="backClick.emit()">Back</button>
          <button class="crf__btn crf__btn--submit" (click)="submitClick.emit(form)">Submit</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .crf__title { font-size: 15px; font-weight: bold; color: #1a3a6b; padding: 0 0 6px; }
    .crf__accent { height: 3px; background: #7b1fa2; margin-bottom: 14px; }
    .crf__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 18px 22px; }
    .crf__tabs { display: flex; gap: 2px; margin-bottom: 18px; flex-wrap: wrap; }
    .crf__tab {
      padding: 8px 16px; font-size: 13px; border: 1px solid #ccc;
      background: #f5f5f5; color: #555; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 3px 3px 0 0;
    }
    .crf__tab--active { background: #1e3a5f; color: #fff; border-color: #1e3a5f; }
    .crf__fields { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 14px; }
    .crf__field { display: flex; flex-direction: column; gap: 5px; }
    .crf__label { font-size: 13px; color: #1a3a6b; }
    .crf__input {
      border: 1px solid #ccc; border-radius: 3px; padding: 7px 10px;
      font-size: 13px; font-family: Arial, sans-serif; width: 150px; outline: none;
    }
    .crf__input:focus { border-color: #7b1fa2; }
    .crf__sub-row { margin-bottom: 16px; }
    .crf__sub-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #333; cursor: pointer; }
    .crf__actions { display: flex; gap: 10px; }
    .crf__btn { padding: 8px 24px; font-size: 13px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .crf__btn--back   { background: #1e3a5f; color: #fff; }
    .crf__btn--back:hover { background: #16304f; }
    .crf__btn--submit { background: #7b1fa2; color: #fff; }
    .crf__btn--submit:hover { background: #6a1b9a; }
  `],
})
export class AmexCustomizedReportsFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `customized-reports-form-${++AmexCustomizedReportsFormComponent._idCounter}`;


  @Input() reportTypes = [
    { value: 'settlement_detail', label: 'Settlement Detail' },
    { value: 'submission_detail', label: 'Submission Detail' },
    { value: 'settlement_advice', label: 'Settlement Advice' },
    { value: 'adjustment_detail', label: 'Adjustment Detail' },
  ];

  form: CustomizedReportData = {
    reportType: 'settlement_detail', dateFrom: '', dateTo: '', emailSubscription: false,
  };

  @Output() submitClick = new EventEmitter<CustomizedReportData>();
  @Output() backClick   = new EventEmitter<void>();
}
