import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PaymentRegisterRow {
  date: string;
  location: string;
  currency: string;
  amount: string;
  reference: string;
}

/**
 * PaymentRegisterTable
 * SOC/ROC ledger-style payment entries with Print button.
 * Source: SOC/ROC (image40) — ONLS portal style
 */
@Component({
  selector: 'amex-payment-register-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prt">
      <div class="prt__top-bar">
        <span class="prt__title">{{ title }}</span>
        <button class="prt__print-btn" (click)="printClick.emit()">&#128438; Print</button>
      </div>
      <table class="prt__table">
        <thead>
          <tr class="prt__head-row">
            <th class="prt__th">Date</th>
            <th class="prt__th">Location</th>
            <th class="prt__th">Currency</th>
            <th class="prt__th prt__th--num">Amount</th>
            <th class="prt__th">Reference</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="prt__row">
            <td class="prt__td">{{ row.date }}</td>
            <td class="prt__td">{{ row.location }}</td>
            <td class="prt__td">{{ row.currency }}</td>
            <td class="prt__td prt__td--num">{{ row.amount }}</td>
            <td class="prt__td">{{ row.reference }}</td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="5" class="prt__empty">No Data Found</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .prt__top-bar { display: flex; justify-content: space-between; align-items: center; padding: 6px 0 8px; border-bottom: 1px solid #ddd; margin-bottom: 6px; }
    .prt__title { font-size: 13px; font-weight: bold; color: #333; }
    .prt__print-btn { background: none; border: 1px solid #006fcf; color: #006fcf; padding: 3px 12px; font-size: 12px; cursor: pointer; font-family: Arial, sans-serif; border-radius: 2px; }
    .prt__print-btn:hover { background: #e8f0ff; }
    .prt__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .prt__head-row { background: #f0f0f0; }
    .prt__th { padding: 6px 10px; border: 1px solid #ccc; font-size: 12px; font-weight: bold; color: #333; text-align: left; }
    .prt__th--num { text-align: right; }
    .prt__row { background: #fff; }
    .prt__row:hover { background: #eef6ff; }
    .prt__td { padding: 6px 10px; border: 1px solid #ddd; font-size: 13px; color: #333; }
    .prt__td--num { text-align: right; }
    .prt__empty { text-align: center; padding: 24px; font-weight: bold; font-size: 14px; color: #333; border: 1px solid #ddd; }
  `],
})
export class AmexPaymentRegisterTableComponent {
  @Input() rows: PaymentRegisterRow[] = [];
  @Input() title = 'Payment Register';
  @Output() printClick = new EventEmitter<void>();
}
