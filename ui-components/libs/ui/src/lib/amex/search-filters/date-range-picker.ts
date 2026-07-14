import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field';
import { DateInputComponent } from '../../atoms/date-input';
import { ButtonComponent } from '../../atoms/button';

export interface AmexDateRange { from: string; to: string; }

/**
 * AmexDateRangePickerComponent
 * From / To date pair used for filtering reports and statements.
 * Sources: BCRB, BTA Audit Trail, SOC/ROC, OMS Customized Reports.
 */
@Component({
  selector: 'amex-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, DateInputComponent, ButtonComponent],
  template: `
    <div class="drp-wrap">
      <div class="drp-row">
        <ui-form-field class="drp-field" [label]="fromLabel" [forId]="id + '-from'">
          <ui-date-input
            [id]="id + '-from'"
            [ariaLabel]="fromLabel"
            [(ngModel)]="fromDate"
            (ngModelChange)="onChange()">
          </ui-date-input>
        </ui-form-field>
        <ui-form-field class="drp-field" [label]="toLabel" [forId]="id + '-to'">
          <ui-date-input
            [id]="id + '-to'"
            [ariaLabel]="toLabel"
            [(ngModel)]="toDate"
            (ngModelChange)="onChange()">
          </ui-date-input>
        </ui-form-field>
        <ui-button
          class="drp-btn"
          variant="primary"
          size="sm"
          [label]="buttonLabel"
          [disabled]="!fromDate || !toDate"
          (click)="onApply()">
        </ui-button>
      </div>
      <div *ngIf="errorMessage" class="drp-error">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --input-border: 1px solid #bbb;
      --input-radius: 2px;
      --input-padding: 4px 7px;
      --btn-bg: linear-gradient(to bottom, #2a84e0, #1462b8);
      --btn-color: #fff;
      --btn-border: 1px solid #1050a0;
      --btn-radius: 2px;
      --btn-padding: 5px 14px;
      --btn-font-size: 12px;
    }

    .drp-wrap { padding: 8px 0; }

    .drp-row {
      display: flex;
      align-items: flex-end;
      gap: 12px;
      flex-wrap: wrap;
    }

    .drp-field { width: 160px; }

    .drp-error {
      margin-top: 4px;
      font-size: 12px;
      color: #c00;
    }
  `],
})
export class AmexDateRangePickerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `date-range-picker-${++AmexDateRangePickerComponent._idCounter}`;

  @Input() fromLabel = 'From';
  @Input() toLabel = 'To';
  @Input() buttonLabel = 'Apply';
  @Input() errorMessage = '';

  @Output() rangeSelected = new EventEmitter<AmexDateRange>();

  fromDate = '';
  toDate = '';

  onChange() {}

  onApply() {
    if (this.fromDate && this.toDate) {
      this.rangeSelected.emit({ from: this.fromDate, to: this.toDate });
    }
  }
}