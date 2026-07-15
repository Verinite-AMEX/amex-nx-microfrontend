import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../../composite/panel';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { CheckboxComponent } from '../../../primitives/checkbox';
import { ButtonComponent } from '../../../primitives/button';

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
  imports: [CommonModule, FormsModule, PanelComponent, FormFieldComponent, InputComponent, CheckboxComponent, ButtonComponent],
  template: `
    <ui-panel title="Customized Reports" variant="accent">
      <!-- Report type tabs -->
      <div class="crf__tabs">
        <ui-button *ngFor="let t of reportTypes" class="crf__tab"
          [class.crf__tab--active]="form.reportType === t.value"
          variant="secondary" [label]="t.label"
          (click)="form.reportType = t.value"></ui-button>
      </div>

      <!-- Date range -->
      <div class="crf__fields">
        <ui-form-field class="crf__field" label="Date From" [forId]="id + '-date-from'">
          <ui-input [id]="id + '-date-from'" [(ngModel)]="form.dateFrom" placeholder="dd/mm/yyyy"></ui-input>
        </ui-form-field>
        <ui-form-field class="crf__field" label="Date To" [forId]="id + '-date-to'">
          <ui-input [id]="id + '-date-to'" [(ngModel)]="form.dateTo" placeholder="dd/mm/yyyy"></ui-input>
        </ui-form-field>
      </div>

      <!-- Email subscription toggle -->
      <div class="crf__sub-row">
        <ui-checkbox [(ngModel)]="form.emailSubscription" label="Subscribe to email notifications for this report"></ui-checkbox>
      </div>

      <div class="crf__actions">
        <ui-button class="crf__btn crf__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
        <ui-button class="crf__btn crf__btn--submit" variant="primary" label="Submit" (click)="submitClick.emit(form)"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --panel-title-size: 15px;
      --panel-accent-color: #7b1fa2;
      --panel-padding: 18px 22px;
      --input-border: 1px solid #ccc;
      --input-radius: 3px;
      --input-padding: 7px 10px;
      --input-focus-border-color: #7b1fa2;
    }
    .crf__tabs { display: flex; gap: 2px; margin-bottom: 18px; flex-wrap: wrap; }
    .crf__tab { --btn-bg: #f5f5f5; --btn-color: #555; --btn-radius: 3px 3px 0 0; --btn-padding: 8px 16px; --btn-font-size: 13px; }
    .crf__tab--active { --btn-bg: #1e3a5f; --btn-color: #fff; }
    .crf__fields { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 14px; }
    .crf__field { width: 150px; }
    .crf__sub-row { margin-bottom: 16px; }
    .crf__actions { display: flex; gap: 10px; }
    .crf__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 8px 24px; --btn-font-size: 13px; }
    .crf__btn--submit { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 8px 24px; --btn-font-size: 13px; }
  `],
})
export class AmexCustomizedReportsFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `customized-reports-form-${++AmexCustomizedReportsFormComponent._idCounter}`;

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