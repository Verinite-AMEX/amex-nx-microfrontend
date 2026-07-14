import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../atoms/label';
import { SelectComponent, SelectOption } from '../../atoms/select';
import { ButtonComponent } from '../../atoms/button';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableCellComponent } from '../../atoms/table-cell';

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
  imports: [
    NgIf, NgFor, DecimalPipe, FormsModule,
    LabelComponent, SelectComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableBodyComponent, TableRowComponent,
    TableHeaderCellComponent, TableCellComponent,
  ],
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
          <ui-table class="mstv__summary" [bordered]="true">
            <ui-table-head>
              <ui-table-row [header]="true">
                <ui-table-header-cell align="center">Previous Balance</ui-table-header-cell>
                <ui-table-header-cell align="center">New Remittance</ui-table-header-cell>
                <ui-table-header-cell align="center">New Credit</ui-table-header-cell>
                <ui-table-header-cell align="center">New Debits</ui-table-header-cell>
                <ui-table-header-cell align="center">Disputes*</ui-table-header-cell>
                <ui-table-header-cell align="center">Total Due Balance</ui-table-header-cell>
              </ui-table-row>
            </ui-table-head>
            <ui-table-body>
              <ui-table-row [hoverable]="false">
                <ui-table-cell align="center" [class.mstv__neg]="summary.previousBalance < 0">{{ summary.previousBalance | number:'1.3-3' }}</ui-table-cell>
                <ui-table-cell align="center">{{ summary.newRemittance | number:'1.3-3' }}</ui-table-cell>
                <ui-table-cell align="center">{{ summary.newCredit | number:'1.3-3' }}</ui-table-cell>
                <ui-table-cell align="center">{{ summary.newDebits | number:'1.3-3' }}</ui-table-cell>
                <ui-table-cell align="center" [class.mstv__blue]="true">{{ summary.disputes | number:'1.3-3' }}</ui-table-cell>
                <ui-table-cell align="center" [class.mstv__neg]="summary.totalDueBalance < 0">{{ summary.totalDueBalance | number:'1.3-3' }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row [hoverable]="false">
                <ui-table-cell [colspan]="4"></ui-table-cell>
                <ui-table-cell [colspan]="2" class="mstv__due-date">Total Balance Due by {{ summary.totalDueDate }}</ui-table-cell>
              </ui-table-row>
            </ui-table-body>
          </ui-table>
        </div>

        <!-- Transaction table or empty -->
        <div *ngIf="transactions && transactions.length > 0; else noTxn" class="mstv__table-wrap">
          <ui-table class="mstv__txn-table" [bordered]="true">
            <ui-table-head>
              <ui-table-row [header]="true">
                <ui-table-header-cell>Type</ui-table-header-cell>
                <ui-table-header-cell>Date</ui-table-header-cell>
                <ui-table-header-cell>Description</ui-table-header-cell>
                <ui-table-header-cell align="right">Amount</ui-table-header-cell>
              </ui-table-row>
            </ui-table-head>
            <ui-table-body>
              <ui-table-row *ngFor="let tx of transactions; let i = index" [class.mstv__row-alt]="i % 2 === 1" [hoverable]="false">
                <ui-table-cell>{{ tx.type }}</ui-table-cell>
                <ui-table-cell>{{ tx.date }}</ui-table-cell>
                <ui-table-cell>{{ tx.description }}</ui-table-cell>
                <ui-table-cell align="right">{{ tx.amount | number:'1.3-3' }}</ui-table-cell>
              </ui-table-row>
            </ui-table-body>
          </ui-table>
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
          <ui-label class="mstv__view-label" [forId]="id + '-view-a-different-montly-statement'">View a Different Montly Statement:</ui-label>
          <ui-select [id]="id + '-view-a-different-montly-statement'" class="mstv__month-select" [options]="availableMonthOptions" [(ngModel)]="selectedMonth"></ui-select>
          <ui-button class="mstv__show-btn" variant="secondary" label="Show Statement" (click)="showStatement.emit(selectedMonth)"></ui-button>
        </div>
        <div class="mstv__footer-right">
          <ui-select class="mstv__fmt-select" [options]="formatOptions" [(ngModel)]="selectedFormat"></ui-select>
          <ui-button class="mstv__dl-btn" variant="secondary" label="Download Report" (click)="download.emit(selectedFormat)"></ui-button>
        </div>
      </div>
      <div class="mstv__footer-back">
        <ui-button class="mstv__back-btn" variant="secondary" label="Return to Account Selection" (click)="returnToSelection.emit()"></ui-button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block; font-family: Arial, sans-serif; font-size: 12px;
      --label-font-size: 11px;
      --label-font-weight: normal;
      --label-color: #333;
      --select-padding: 3px 24px 3px 4px;
      --select-font-size: 11px;
      --select-border: 1px solid #aaa;
      --select-radius: 0px;
      --btn-bg: #e8e8e8;
      --btn-bg-hover: #d8d8d8;
      --btn-color: #333;
      --btn-border: 1px solid #aaa;
      --btn-radius: 0px;
      --btn-padding: 3px 10px;
      --btn-font-size: 11px;
    }

    .mstv { border: 2px solid #7ab3d4; background: #fff; max-width: 900px; }

    .mstv__header {
      background: #b8d4ef; color: #1a3c5e;
      font-weight: bold; font-size: 13px;
      padding: 8px 12px; border-bottom: 1px solid #7ab3d4;
    }

    .mstv__body { padding: 14px 16px; }

    .mstv__date { text-align: right; font-size: 12px; color: #333; margin-bottom: 8px; }

    .mstv__center { text-align: center; margin-bottom: 14px; }
    .mstv__title  { font-size: 14px; font-weight: bold; color: #1a1a1a; margin-bottom: 4px; }
    .mstv__acct   { font-size: 12px; color: #1a1a1a; margin-bottom: 2px; }
    .mstv__agent  { font-size: 12px; color: #333; }

    /* Summary balance table */
    .mstv__summary-wrap {
      margin-bottom: 14px;
      --table-header-bg: #d4e8f8;
      --table-header-border: 1px solid #b0cce0;
      --table-border-color: #d0e4f0;
      --table-cell-padding: 5px 8px;
      --table-cell-color: #333;
    }
    .mstv__summary ::ng-deep .ui-table { font-size: 12px; }
    .mstv__neg    { color: #c00; }
    .mstv__blue   { color: #006fcf; }
    .mstv__due-date ::ng-deep .ui-td { font-size: 11px; color: #333; border: 1px solid #d0e4f0; }

    /* Transaction table */
    .mstv__table-wrap {
      margin-bottom: 10px;
      --table-header-bg: #d4e8f8;
      --table-header-border: 1px solid #b0cce0;
      --table-border-color: #d0e4f0;
      --table-cell-padding: 4px 8px;
      --table-cell-color: #333;
    }
    .mstv__txn-table ::ng-deep .ui-table { font-size: 12px; }
    .mstv__row-alt ::ng-deep .ui-td { background: #f0f8ff; }

    .mstv__no-txn { font-size: 12px; color: #c00; margin: 10px 0; }

    .mstv__legend { font-size: 11px; color: #006fcf; margin-bottom: 2px; }
    .mstv__note   { font-size: 11px; color: #006fcf; }

    /* Footer */
    .mstv__footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px 4px; gap: 8px; flex-wrap: wrap;
    }
    .mstv__footer-left { display: flex; align-items: center; gap: 6px; }
    .mstv__footer-right { display: flex; align-items: center; gap: 6px; }
    .mstv__footer-back { padding: 0 12px 10px; }
  `],
})
export class AmexMonthlyStatementViewerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `monthly-statement-viewer-${++AmexMonthlyStatementViewerComponent._idCounter}`;

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

  get availableMonthOptions(): SelectOption[] { return this.availableMonths.map(m => ({ value: m, label: m })); }
  get formatOptions(): SelectOption[] { return this.formats.map(f => ({ value: f, label: f })); }
}