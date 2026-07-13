import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AmexDateRange { from: string; to: string; }

/**
 * AmexDateRangePickerComponent
 * From / To date pair used for filtering reports and statements.
 * Sources: BCRB, BTA Audit Trail, SOC/ROC, OMS Customized Reports.
 */
@Component({
  selector: 'amex-date-range-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="drp-wrap">
      <div class="drp-row">
        <div class="drp-field">
          <label class="drp-label" [for]="id + '-field'">{{ fromLabel }}</label>
          <input [id]="id + '-field'" class="drp-input" type="date" [(ngModel)]="fromDate" (change)="onChange()" />
        </div>
        <div class="drp-field">
          <label class="drp-label" [for]="id + '-field-2'">{{ toLabel }}</label>
          <input [id]="id + '-field-2'" class="drp-input" type="date" [(ngModel)]="toDate" (change)="onChange()" />
        </div>
        <button class="drp-btn" (click)="onApply()" [disabled]="!fromDate || !toDate">
          {{ buttonLabel }}
        </button>
      </div>
      <div *ngIf="errorMessage" class="drp-error">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .drp-wrap { padding: 8px 0; }

    .drp-row {
      display: flex;
      align-items: flex-end;
      gap: 12px;
      flex-wrap: wrap;
    }

    .drp-field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .drp-label {
      font-size: 12px;
      color: #555;
      font-family: Arial, sans-serif;
    }

    .drp-input {
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 7px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #333;
      background: #fff;
    }
    .drp-input:focus {
      outline: none;
      border-color: #006fcf;
      box-shadow: 0 0 0 2px rgba(0,111,207,0.12);
    }

    .drp-btn {
      background: linear-gradient(to bottom, #2a84e0, #1462b8);
      color: #fff;
      border: 1px solid #1050a0;
      border-radius: 2px;
      padding: 5px 14px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      cursor: pointer;
      white-space: nowrap;
      align-self: flex-end;
    }
    .drp-btn:hover:not(:disabled) { background: linear-gradient(to bottom, #1e78d0, #0e50a0); }
    .drp-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .drp-error {
      margin-top: 4px;
      font-size: 12px;
      color: #c00;
    }
  `],
})
export class AmexDateRangePickerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `date-range-picker-${++AmexDateRangePickerComponent._idCounter}`;


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
