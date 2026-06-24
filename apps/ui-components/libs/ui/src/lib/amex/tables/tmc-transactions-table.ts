import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TMCTransactionRow {
  date: string;
  amount: string;
  merchant: string;
  reference: string;
}

/**
 * TMCTransactionsTable
 * BTA Travel Management Company transactions list.
 * Index dropdown as primary filter + Submit button.
 * Source: BTA (Travel Agent)
 * Style: BTA portal — light blue header panel, bordered table
 */
@Component({
  selector: 'amex-tmc-transactions-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tmc">
      <!-- Index dropdown filter -->
      <div class="tmc__filter-bar">
        <label class="tmc__filter-label">Index</label>
        <select class="tmc__select" [(ngModel)]="selectedIndex"
          (ngModelChange)="indexChange.emit(selectedIndex)">
          <option value="">-- Select --</option>
          <option *ngFor="let opt of indexOptions" [value]="opt.value">{{ opt.label }}</option>
        </select>
        <button class="tmc__submit-btn" (click)="submitClick.emit(selectedIndex)">Submit</button>
      </div>

      <table class="tmc__table">
        <thead>
          <tr class="tmc__head-row">
            <th class="tmc__th">Date</th>
            <th class="tmc__th tmc__th--num">Amount</th>
            <th class="tmc__th">Merchant</th>
            <th class="tmc__th">Reference</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="tmc__row">
            <td class="tmc__td">{{ row.date }}</td>
            <td class="tmc__td tmc__td--num">{{ row.amount }}</td>
            <td class="tmc__td">{{ row.merchant }}</td>
            <td class="tmc__td">{{ row.reference }}</td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="4" class="tmc__empty">No transactions found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .tmc__filter-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: #e8f4fb; border: 1px solid #b0cce0; margin-bottom: 8px; }
    .tmc__filter-label { font-size: 13px; color: #333; font-weight: bold; }
    .tmc__select { border: 1px solid #bbb; padding: 4px 8px; font-size: 13px; font-family: Arial, sans-serif; min-width: 160px; }
    .tmc__submit-btn { background: linear-gradient(to bottom, #5ba3e0, #006fcf); color: #fff; border: 1px solid #005fba; padding: 4px 18px; font-size: 13px; cursor: pointer; font-family: Arial, sans-serif; border-radius: 2px; }
    .tmc__submit-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .tmc__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .tmc__head-row { background: #d6eaf8; }
    .tmc__th { padding: 7px 10px; border: 1px solid #b8d4ea; font-size: 12px; font-weight: bold; color: #1a3a6b; text-align: left; }
    .tmc__th--num { text-align: right; }
    .tmc__row { border-bottom: 1px solid #eee; }
    .tmc__row:hover { background: #f5f9ff; }
    .tmc__td { padding: 8px 10px; border: 1px solid #e8eef4; font-size: 13px; color: #333; }
    .tmc__td--num { text-align: right; }
    .tmc__empty { text-align: center; padding: 24px; color: #888; font-size: 13px; }
  `],
})
export class AmexTMCTransactionsTableComponent {
  @Input() rows: TMCTransactionRow[] = [];
  @Input() indexOptions: { value: string; label: string }[] = [];
  selectedIndex = '';
  @Output() indexChange  = new EventEmitter<string>();
  @Output() submitClick  = new EventEmitter<string>();
}
