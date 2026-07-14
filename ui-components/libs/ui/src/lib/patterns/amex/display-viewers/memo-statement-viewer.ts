import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

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
  imports: [
    CommonModule, FormsModule, SelectComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent, TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
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
          <ui-table class="msv__table">
            <ui-table-head>
              <ui-table-row [header]="true" [hoverable]="false">
                <ui-table-header-cell class="msv__th">Type</ui-table-header-cell>
                <ui-table-header-cell class="msv__th">Date</ui-table-header-cell>
                <ui-table-header-cell class="msv__th">Description</ui-table-header-cell>
                <ui-table-header-cell class="msv__th msv__th-num" align="right">Amount</ui-table-header-cell>
              </ui-table-row>
            </ui-table-head>
            <ui-table-body>
              <ui-table-row *ngFor="let tx of transactions; let i = index" [hoverable]="false" [class.msv__row-alt]="i % 2 === 1">
                <ui-table-cell class="msv__td">{{ tx.type }}</ui-table-cell>
                <ui-table-cell class="msv__td">{{ tx.date }}</ui-table-cell>
                <ui-table-cell class="msv__td">{{ tx.description }}</ui-table-cell>
                <ui-table-cell class="msv__td msv__td-num" align="right">{{ tx.amount | number:'1.3-3' }}</ui-table-cell>
              </ui-table-row>
            </ui-table-body>
          </ui-table>
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
        <ui-button class="msv__back-btn" variant="secondary" label="Return to Account Selection" (click)="returnToSelection.emit()"></ui-button>
        <div class="msv__download-group">
          <ui-select class="msv__format-select" [options]="formatOptions" [(ngModel)]="selectedFormat"></ui-select>
          <ui-button class="msv__dl-btn" variant="secondary" label="Download Report" (click)="download.emit(selectedFormat)"></ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      font-size: 12px;
    }

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
    .msv__table { font-size: 12px; }
    .msv__th {
      --table-cell-padding: 6px 10px;
      --table-cell-color: #1a1a1a;
      --table-cell-font-weight: bold;
      background: #d0e8f8;
      border: 1px solid #b0cce0;
    }
    .msv__td {
      --table-cell-padding: 5px 10px;
      --table-cell-color: #333;
      border: 1px solid #d0e4f0;
    }
    .msv__row-alt { --table-row-hover-bg: transparent; background: #f0f8ff; }

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
      --btn-bg: #e8e8e8;
      --btn-color: #000;
      --btn-border: 1px solid #aaa;
      --btn-padding: 4px 12px;
      --btn-font-size: 11px;
      --btn-bg-hover: #d8d8d8;
    }

    .msv__download-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .msv__format-select {
      --select-border: 1px solid #aaa;
      --select-padding: 3px 20px 3px 4px;
      --select-font-size: 11px;
    }

    .msv__dl-btn {
      --btn-bg: #e8e8e8;
      --btn-color: #000;
      --btn-border: 1px solid #aaa;
      --btn-padding: 4px 12px;
      --btn-font-size: 11px;
      --btn-bg-hover: #d8d8d8;
    }
  `],
})
export class AmexMemoStatementViewerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `memo-statement-viewer-${++AmexMemoStatementViewerComponent._idCounter}`;

  @Input() statementDate  = '29 Jan 2025';
  @Input() accountNumber  = 'BTA 3744XXXXXXX5229 - BTACLIENTBAH001';
  @Input() travelAgent    = 'DNATA (BTA)';
  @Input() telephone      = '+97143166343';
  @Input() transactions: MemoTransaction[] = [];
  @Input() formats        = ['PDF', 'Excel', 'CSV', 'RTF'];
  selectedFormat          = 'PDF';

  @Output() returnToSelection = new EventEmitter<void>();
  @Output() download          = new EventEmitter<string>();

  get formatOptions() { return this.formats.map(f => ({ value: f, label: f })); }
}