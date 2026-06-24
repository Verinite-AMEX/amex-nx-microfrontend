import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexAmountComponent } from '../atoms/amount';
import { AmexStatusBadgeComponent, AmexStatus } from '../atoms/status-badge';

export interface AmexTransaction {
  date: string;
  description: string;
  referenceNumber?: string;
  amount: number;
  currency?: string;
  type: 'debit' | 'credit';
  status?: AmexStatus;
  category?: string;
}

@Component({
  selector: 'amex-statement-row',
  standalone: true,
  imports: [CommonModule, AmexAmountComponent, AmexStatusBadgeComponent],
  template: `
    <div class="amex-stmt-row" [class.amex-stmt-row--credit]="transaction.type === 'credit'">
      <div class="amex-stmt-row__date">{{ transaction.date }}</div>
      <div class="amex-stmt-row__main">
        <div class="amex-stmt-row__desc">{{ transaction.description }}</div>
        <div *ngIf="transaction.referenceNumber" class="amex-stmt-row__ref">
          Ref: {{ transaction.referenceNumber }}
        </div>
      </div>
      <div *ngIf="transaction.category" class="amex-stmt-row__cat">
        {{ transaction.category }}
      </div>
      <div *ngIf="transaction.status" class="amex-stmt-row__status">
        <amex-status-badge [status]="transaction.status"></amex-status-badge>
      </div>
      <div class="amex-stmt-row__amount">
        <amex-amount
          [amount]="transaction.amount"
          [currency]="transaction.currency || 'AED'"
          [type]="transaction.type">
        </amex-amount>
      </div>
    </div>
  `,
  styles: [`
    .amex-stmt-row {
      display: grid;
      grid-template-columns: 90px 1fr auto auto auto;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid #f0f0f0;
      background: #fff;
      transition: background 0.1s;
    }
    .amex-stmt-row:hover { background: #fafbff; }
    .amex-stmt-row--credit { border-left: 3px solid #2e7d32; }

    .amex-stmt-row__date {
      font-size: 12px;
      color: #888;
      white-space: nowrap;
    }
    .amex-stmt-row__desc {
      font-size: 14px;
      color: #111;
      font-weight: 500;
    }
    .amex-stmt-row__ref {
      font-size: 11px;
      color: #aaa;
      margin-top: 2px;
    }
    .amex-stmt-row__cat {
      font-size: 11px;
      color: #888;
      background: #f5f5f5;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .amex-stmt-row__amount { text-align: right; white-space: nowrap; }
  `],
})
export class AmexStatementRowComponent {
  @Input() transaction!: AmexTransaction;
}
