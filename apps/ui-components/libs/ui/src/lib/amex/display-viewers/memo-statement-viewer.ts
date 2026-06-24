import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MemoTransaction {
  type: string;        // '1 Remittance', '2 Refund', etc.
  date: string;
  description: string;
  amount: number;
  currency?: string;
}

/**
 * MemoStatementViewer
 * BTA Memo Statement panel: account header, transaction table, legend, download buttons.
 * Source: BTA Portal (Corporate Admin, Amex Internal Admin)
 * Style: Blue bordered panel header, centered content, PDF/format dropdown + Download Report button.
 */
@Component({
  selector: 'amex-memo-statement-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="msv">
      <!-- Blue border header -->
      <div class="msv__header">BTA Memo Statement</div>

      <div class="msv__body">
        <!-- Date top-right -->
        <div class="msv__date">{{ statementDate }}</div>

        <!-- Centered title + account -->
        <div class="msv__center">
          <div class="msv__title">BTA Memo Statement</div>
          <div class="msv__acct-num">{{ accountNumber }}</div>
          <div class="msv__agent">Travel Agent: {{ travelAgent }} - Telephone: {{ telephone }}</div>
        </div>

        <!-- Transaction table or empty -->
        <div *ngIf="transactions && transactions.length > 0; else noTxn" class="msv__table-wrap">
          <table class="msv__table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Description</th>
                <th class="msv__th-num">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let tx of transactions; let i = index" [class.msv__row-alt]="i % 2 === 1">
                <td>{{ tx.type }}</td>
                <td>{{ tx.date }}</td>
                <td>{{ tx.description }}</td>
                <td class="msv__td-num">{{ tx.amount | number:'1.3-3' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ng-template #noTxn>
          <p class="msv__no-txn">There are no transactions available.</p>
        </ng-template>

        <!-- Legend -->
        <div class="msv__legend">
          1 Remittance - 2 Refund - 3 Dispute - 5 Allocated - 6 Allocated &amp; Paid
        </div>
        <div class="msv__note">
          Should you have any enquiry regarding the transactions and information displayed, kindly
          contact your Travel Agent or AEME BTA Team on (+973) 17 557243.
        </div>
      </div>

      <!-- Footer actions -->
      <div class="msv__footer">
        <button class="msv__back-btn" (click)="returnToSelection.emit()">Return to Account Selection</button>
        <div class="msv__download-group">
          <select class="msv__format-select" [(ngModel)]="selectedFormat">
            <option *ngFor="let f of formats" [value]="f">{{ f }}</option>
          </select>
          <button class="msv__dl-btn" (click)="download.emit(selectedFormat)">Download Report</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }

    .msv {
      border: 2px solid #7ab3d4;
      background: #fff;
      max-width: 900px;
    }

    .msv__header {
      background: #b8d4ef;
      color: #1a3c5e;
      font-weight: bold;
      font-size: 13px;
      padding: 8px 12px;
      border-bottom: 1px solid #7ab3d4;
    }

    .msv__body { padding: 14px 16px; }

    .msv__date {
      text-align: right;
      font-size: 12px;
      color: #333;
      margin-bottom: 8px;
    }

    .msv__center {
      text-align: center;
      margin-bottom: 16px;
    }

    .msv__title {
      font-size: 14px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 4px;
    }

    .msv__acct-num {
      font-size: 12px;
      color: #006fcf;
      margin-bottom: 2px;
    }

    .msv__agent {
      font-size: 12px;
      color: #333;
    }

    /* Table */
    .msv__table-wrap { margin-bottom: 12px; }
    .msv__table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .msv__table th {
      background: #d0e8f8;
      border: 1px solid #b0cce0;
      padding: 6px 10px;
      text-align: left;
      font-weight: bold;
      color: #1a1a1a;
    }
    .msv__th-num { text-align: right; }
    .msv__table td {
      border: 1px solid #d0e4f0;
      padding: 5px 10px;
      color: #333;
    }
    .msv__td-num { text-align: right; }
    .msv__row-alt td { background: #f0f8ff; }

    .msv__no-txn {
      font-size: 12px;
      color: #c00;
      margin: 10px 0;
    }

    /* Legend */
    .msv__legend {
      font-size: 11px;
      color: #006fcf;
      margin-bottom: 4px;
    }

    .msv__note {
      font-size: 11px;
      color: #006fcf;
      line-height: 1.5;
    }

    /* Footer */
    .msv__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      border-top: 1px solid #b0cce0;
      background: #fafcff;
    }

    .msv__back-btn {
      background: #e8e8e8;
      border: 1px solid #aaa;
      padding: 4px 12px;
      font-size: 11px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .msv__back-btn:hover { background: #d8d8d8; }

    .msv__download-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .msv__format-select {
      border: 1px solid #aaa;
      padding: 3px 4px;
      font-size: 11px;
      font-family: Arial, sans-serif;
    }

    .msv__dl-btn {
      background: #e8e8e8;
      border: 1px solid #aaa;
      padding: 4px 12px;
      font-size: 11px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .msv__dl-btn:hover { background: #d8d8d8; }
  `],
})
export class AmexMemoStatementViewerComponent {
  @Input() statementDate  = '29 Jan 2025';
  @Input() accountNumber  = 'BTA 3744XXXXXXX5229 - BTACLIENTBAH001';
  @Input() travelAgent    = 'DNATA (BTA)';
  @Input() telephone      = '+97143166343';
  @Input() transactions: MemoTransaction[] = [];
  @Input() formats        = ['PDF', 'Excel', 'CSV', 'RTF'];
  selectedFormat          = 'PDF';

  @Output() returnToSelection = new EventEmitter<void>();
  @Output() download          = new EventEmitter<string>();
}
