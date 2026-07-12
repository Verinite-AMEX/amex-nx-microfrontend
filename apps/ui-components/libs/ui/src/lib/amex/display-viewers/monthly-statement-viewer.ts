import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MonthlyStatementSummary {
  previousBalance: number;
  newRemittance:   number;
  newCredit:       number;
  newDebits:       number;
  disputes:        number;
  totalDueBalance: number;
  totalDueDate:    string;   // e.g. '25-03-2025'
}

export interface MonthlyTransaction {
  type:        string;
  date:        string;
  description: string;
  amount:      number;
}

/**
 * MonthlyStatementViewer
 * BTA Monthly Statement viewer: summary balance table + transaction rows.
 * Has a "View a Different Monthly Statement" dropdown + Show Statement button.
 * Source: BTA Portal (Corporate Admin, Corporate User, Amex Internal Admin)
 * Style: Blue bordered panel, bold header, grey-highlighted balance table.
 */
@Component({
  selector: 'amex-monthly-statement-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mstv">
      <div class="mstv__header">BTA Monthly Statement</div>

      <div class="mstv__body">
        <!-- Date -->
        <div class="mstv__date">{{ statementDate }}</div>

        <!-- Centered title -->
        <div class="mstv__center">
          <div class="mstv__title">BTA Monthly Statement</div>
          <div class="mstv__acct">{{ accountNumber }}</div>
          <div class="mstv__agent">Travel Agent: {{ travelAgent }} - Telephone: {{ telephone }}</div>
        </div>

        <!-- Balance summary table -->
        <div *ngIf="summary" class="mstv__summary-wrap">
          <table class="mstv__summary">
            <thead>
              <tr>
                <th scope="col">Previous Balance</th>
                <th scope="col">New Remittance</th>
                <th scope="col">New Credit</th>
                <th scope="col">New Debits</th>
                <th scope="col">Disputes*</th>
                <th scope="col">Total Due Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td [class.mstv__neg]="summary.previousBalance < 0">{{ summary.previousBalance | number:'1.3-3' }}</td>
                <td>{{ summary.newRemittance | number:'1.3-3' }}</td>
                <td>{{ summary.newCredit | number:'1.3-3' }}</td>
                <td>{{ summary.newDebits | number:'1.3-3' }}</td>
                <td [class.mstv__blue]="true">{{ summary.disputes | number:'1.3-3' }}</td>
                <td [class.mstv__neg]="summary.totalDueBalance < 0">{{ summary.totalDueBalance | number:'1.3-3' }}</td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td colspan="2" class="mstv__due-date">Total Balance Due by {{ summary.totalDueDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Transaction table or empty -->
        <div *ngIf="transactions && transactions.length > 0; else noTxn" class="mstv__table-wrap">
          <table class="mstv__txn-table">
            <thead>
              <tr>
                <th scope="col">Type</th><th scope="col">Date</th><th scope="col">Description</th>
                <th class="mstv__th-r" scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let tx of transactions; let i = index" [class.mstv__row-alt]="i % 2 === 1">
                <td>{{ tx.type }}</td>
                <td>{{ tx.date }}</td>
                <td>{{ tx.description }}</td>
                <td class="mstv__td-r">{{ tx.amount | number:'1.3-3' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ng-template #noTxn>
          <p class="mstv__no-txn">There are no transactions available.</p>
        </ng-template>

        <!-- Legend -->
        <div class="mstv__legend">
          1 Remittance - 2 Refund - 3 Dispute
        </div>
        <div class="mstv__note">
          *by the time of statement issuance no settlement was received
        </div>
      </div>

      <!-- Footer -->
      <div class="mstv__footer">
        <div class="mstv__footer-left">
          <label class="mstv__view-label" [for]="id + '-view-a-different-montly-statement'">View a Different Montly Statement:</label>
          <select [id]="id + '-view-a-different-montly-statement'" class="mstv__month-select" [(ngModel)]="selectedMonth">
            <option *ngFor="let m of availableMonths" [value]="m">{{ m }}</option>
          </select>
          <button class="mstv__show-btn" (click)="showStatement.emit(selectedMonth)">Show Statement</button>
        </div>
        <div class="mstv__footer-right">
          <select class="mstv__fmt-select" [(ngModel)]="selectedFormat">
            <option *ngFor="let f of formats" [value]="f">{{ f }}</option>
          </select>
          <button class="mstv__dl-btn" (click)="download.emit(selectedFormat)">Download Report</button>
        </div>
      </div>
      <div class="mstv__footer-back">
        <button class="mstv__back-btn" (click)="returnToSelection.emit()">Return to Account Selection</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }

    .mstv {
      border: 2px solid #7ab3d4;
      background: #fff;
      max-width: 900px;
    }

    .mstv__header {
      background: #b8d4ef;
      color: #1a3c5e;
      font-weight: bold;
      font-size: 13px;
      padding: 8px 12px;
      border-bottom: 1px solid #7ab3d4;
    }

    .mstv__body { padding: 14px 16px; }

    .mstv__date { text-align: right; font-size: 12px; color: #333; margin-bottom: 8px; }

    .mstv__center { text-align: center; margin-bottom: 14px; }
    .mstv__title  { font-size: 14px; font-weight: bold; color: #1a1a1a; margin-bottom: 4px; }
    .mstv__acct   { font-size: 12px; color: #1a1a1a; margin-bottom: 2px; }
    .mstv__agent  { font-size: 12px; color: #333; }

    /* Summary balance table */
    .mstv__summary-wrap { margin-bottom: 14px; }
    .mstv__summary {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .mstv__summary th {
      background: #d4e8f8;
      border: 1px solid #b0cce0;
      padding: 6px 8px;
      text-align: center;
      font-weight: bold;
      color: #1a1a1a;
    }
    .mstv__summary td {
      border: 1px solid #d0e4f0;
      padding: 5px 8px;
      text-align: center;
      color: #333;
    }
    .mstv__neg    { color: #c00; }
    .mstv__blue   { color: #006fcf; }
    .mstv__due-date {
      font-size: 11px; color: #333;
      border: 1px solid #d0e4f0;
    }

    /* Transaction table */
    .mstv__table-wrap { margin-bottom: 10px; }
    .mstv__txn-table {
      width: 100%; border-collapse: collapse; font-size: 12px;
    }
    .mstv__txn-table th {
      background: #d4e8f8; border: 1px solid #b0cce0;
      padding: 5px 8px; text-align: left; font-weight: bold;
    }
    .mstv__th-r  { text-align: right; }
    .mstv__txn-table td {
      border: 1px solid #d0e4f0; padding: 4px 8px; color: #333;
    }
    .mstv__td-r  { text-align: right; }
    .mstv__row-alt td { background: #f0f8ff; }

    .mstv__no-txn { font-size: 12px; color: #c00; margin: 10px 0; }

    .mstv__legend { font-size: 11px; color: #006fcf; margin-bottom: 2px; }
    .mstv__note   { font-size: 11px; color: #006fcf; }

    /* Footer */
    .mstv__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px 4px;
      gap: 8px;
      flex-wrap: wrap;
    }

    .mstv__footer-left {
      display: flex; align-items: center; gap: 6px;
    }

    .mstv__view-label { font-size: 11px; color: #333; }

    .mstv__month-select, .mstv__fmt-select {
      border: 1px solid #aaa;
      padding: 3px 4px;
      font-size: 11px;
      font-family: Arial, sans-serif;
    }

    .mstv__show-btn, .mstv__dl-btn {
      background: #e8e8e8;
      border: 1px solid #aaa;
      padding: 3px 10px;
      font-size: 11px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .mstv__show-btn:hover, .mstv__dl-btn:hover { background: #d8d8d8; }

    .mstv__footer-right {
      display: flex; align-items: center; gap: 6px;
    }

    .mstv__footer-back {
      padding: 0 12px 10px;
    }

    .mstv__back-btn {
      background: #e8e8e8;
      border: 1px solid #aaa;
      padding: 3px 10px;
      font-size: 11px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .mstv__back-btn:hover { background: #d8d8d8; }
  `],
})
export class AmexMonthlyStatementViewerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `monthly-statement-viewer-${++AmexMonthlyStatementViewerComponent._idCounter}`;


  @Input() statementDate   = '28 February 2025';
  @Input() accountNumber   = 'BTA 3744XXXXXXX5229 - BTACLIENTBAH001';
  @Input() travelAgent     = 'DNATA (BTA)';
  @Input() telephone       = '+97143166343';
  @Input() summary: MonthlyStatementSummary | null = null;
  @Input() transactions: MonthlyTransaction[] = [];
  @Input() availableMonths = ['February 2025', 'January 2025', 'December 2024', 'November 2024'];
  @Input() formats         = ['PDF', 'Excel', 'CSV', 'RTF'];
  selectedMonth            = 'February 2025';
  selectedFormat           = 'PDF';

  @Output() showStatement     = new EventEmitter<string>();
  @Output() download          = new EventEmitter<string>();
  @Output() returnToSelection = new EventEmitter<void>();
}
