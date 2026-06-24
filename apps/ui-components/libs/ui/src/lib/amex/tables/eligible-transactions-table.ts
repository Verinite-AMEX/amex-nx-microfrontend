import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface EligibleTransaction {
  id: string;
  transactionDate: string;
  description: string;
  amount: string;
  pointsValue: string;
  selected?: boolean;
}

export interface PointsHistoryRow {
  transactionDate: string;
  description: string;
  pointsRedeemed: string;
  amountOffset: string;
  redemptionDate: string;
}

@Component({
  selector: 'amex-eligible-transactions-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ett">
      <!-- Navy page header — "SELECT & PAY WITH POINTS" matches screenshot image5 -->
      <div class="ett__page-header">{{ pageTitle }}</div>

      <!-- Teal/gray tab switcher — matches screenshot exactly -->
      <div class="ett__tabs">
        <button class="ett__tab"
          [class.ett__tab--active]="activeTab === 'eligible'"
          (click)="activeTab='eligible'">
          Eligible Transactions
        </button>
        <button class="ett__tab"
          [class.ett__tab--inactive]="activeTab === 'eligible'"
          [class.ett__tab--active]="activeTab === 'history'"
          (click)="activeTab='history'">
          History
        </button>
      </div>

      <!-- Eligible Transactions tab -->
      <div *ngIf="activeTab === 'eligible'" class="ett__content">
        <!-- Card selector dropdown -->
        <div class="ett__card-selector">
          <label class="ett__card-label">Select a Card</label>
          <select class="ett__card-select" [(ngModel)]="selectedCard"
            (ngModelChange)="cardChange.emit(selectedCard)">
            <option value="">-- Select --</option>
            <option *ngFor="let c of cards" [value]="c.value">{{ c.label }}</option>
          </select>
        </div>

        <!-- Error state — matches screenshot red error box -->
        <div *ngIf="errorMessage" class="ett__error">
          <span class="ett__error-icon">&#10060;</span>
          {{ errorMessage }}
        </div>

        <!-- Points balance summary -->
        <div *ngIf="pointsBalance && !errorMessage" class="ett__points-bar">
          <span class="ett__points-label">Available Points:</span>
          <span class="ett__points-value">{{ pointsBalance }}</span>
          <span class="ett__points-aed" *ngIf="aedValue">≈ AED {{ aedValue }}</span>
        </div>

        <!-- Transactions table -->
        <table *ngIf="eligibleRows.length" class="ett__table">
          <thead>
            <tr class="ett__head-row">
              <th class="ett__th ett__th--check"></th>
              <th class="ett__th">Transaction Date</th>
              <th class="ett__th">Description</th>
              <th class="ett__th ett__th--num">Amount</th>
              <th class="ett__th ett__th--num">Points Value</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of eligibleRows" class="ett__row"
              [class.ett__row--selected]="row.selected">
              <td class="ett__td ett__td--check">
                <input type="checkbox" [(ngModel)]="row.selected"
                  (ngModelChange)="onSelectionChange()" />
              </td>
              <td class="ett__td">{{ row.transactionDate }}</td>
              <td class="ett__td">{{ row.description }}</td>
              <td class="ett__td ett__td--num">{{ row.amount }}</td>
              <td class="ett__td ett__td--num">{{ row.pointsValue }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Redeem button -->
        <div *ngIf="eligibleRows.length" class="ett__redeem-bar">
          <span class="ett__selected-info">{{ selectedCount }} transaction(s) selected</span>
          <button class="ett__redeem-btn" [disabled]="!selectedCount"
            (click)="redeemClick.emit(selectedRows)">
            Redeem Points
          </button>
        </div>
      </div>

      <!-- History tab -->
      <div *ngIf="activeTab === 'history'" class="ett__content">
        <div class="ett__history-summary">
          <div class="ett__history-title">History Summary</div>
          <div class="ett__history-stats">
            <div><strong>Total Statement Credit:</strong>
              <span [class.ett__null]="!totalCredit">{{ totalCredit || 'null' }}</span>
            </div>
            <div><strong>Total Points Redeemed:</strong>
              <span [class.ett__null]="!totalPointsRedeemed">{{ totalPointsRedeemed || 'null' }}</span>
            </div>
          </div>
        </div>

        <div class="ett__history-detail-title">History Details (Past 1 year)</div>

        <table class="ett__table ett__table--history">
          <thead>
            <tr class="ett__head-row">
              <th class="ett__th">Transaction Date</th>
              <th class="ett__th">Description</th>
              <th class="ett__th ett__th--num">Transaction Amount</th>
              <th class="ett__th">Redemption Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of historyRows" class="ett__row">
              <td class="ett__td">{{ row.transactionDate }}</td>
              <td class="ett__td">{{ row.description }}</td>
              <td class="ett__td ett__td--num">{{ row.amountOffset }}</td>
              <td class="ett__td">{{ row.redemptionDate }}</td>
            </tr>
            <tr *ngIf="!historyRows.length">
              <td colspan="4" class="ett__empty-history">
                It appears that you have not placed any redemption order(s) on this Card.
                Please click on the 'Eligible Transactions' tab on the top left and place your first redemption.
              </td>
            </tr>
          </tbody>
        </table>

        <div class="ett__showing" *ngIf="historyRows.length">
          Showing {{ historyRows.length }} to {{ historyRows.length }} of {{ historyRows.length }} entries
        </div>
        <div class="ett__showing" *ngIf="!historyRows.length">Showing 0 to 0 of 0 entries</div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* Navy page header — matches screenshot exactly */
    .ett__page-header {
      background: #1a3a6b; color: #fff;
      font-size: 15px; font-weight: bold;
      padding: 12px 16px; text-transform: uppercase; letter-spacing: 0.5px;
    }

    /* Teal/gray tab switcher — matches screenshot image5/image6 */
    .ett__tabs { display: flex; }
    .ett__tab {
      flex: 1; padding: 11px 0; text-align: center;
      font-size: 14px; font-weight: bold; color: #fff;
      border: none; cursor: pointer;
      font-family: Arial, sans-serif;
    }
    .ett__tab--active   { background: #1a7a9a; }   /* teal — active tab */
    .ett__tab--inactive { background: #888; }       /* gray — inactive tab */

    .ett__content { padding: 16px; background: #fff; }

    /* Card selector */
    .ett__card-selector { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .ett__card-label { font-size: 14px; font-weight: bold; color: #1a3a6b; }
    .ett__card-select {
      border: 1px solid #ccc; border-bottom: 2px solid #1a3a6b;
      padding: 5px 28px 5px 8px; font-size: 13px;
      font-family: Arial, sans-serif; min-width: 280px;
      background: #fff; cursor: pointer;
    }

    /* Error — matches screenshot pink/red error box */
    .ett__error {
      display: flex; align-items: center; gap: 8px;
      background: #fce4e4; border: 1px solid #f5c6c6;
      padding: 10px 14px; font-size: 13px; color: #c62828;
      border-radius: 3px; margin-bottom: 12px;
    }
    .ett__error-icon { font-size: 14px; }

    /* Points balance bar */
    .ett__points-bar {
      display: flex; align-items: center; gap: 12px;
      padding: 8px 12px; background: #f5f9ff;
      border: 1px solid #d0e4f7; margin-bottom: 12px;
      font-size: 13px;
    }
    .ett__points-label { color: #555; }
    .ett__points-value { font-size: 16px; font-weight: bold; color: #1a3a6b; }
    .ett__points-aed   { color: #888; }

    /* Table */
    .ett__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .ett__table--history { margin-top: 12px; }

    .ett__head-row { border-bottom: 2px solid #1a3a6b; }
    .ett__th {
      padding: 8px 12px; text-align: left; font-weight: bold;
      font-size: 13px; color: #1a3a6b; border-bottom: 2px solid #1a3a6b;
    }
    .ett__th--check { width: 30px; }
    .ett__th--num   { text-align: right; }

    .ett__row { border-bottom: 1px solid #e8eef4; }
    .ett__row:hover { background: #f5f9ff; }
    .ett__row--selected { background: #eaf4fb; }
    .ett__td {
      padding: 8px 12px; font-size: 13px; color: #333;
      border-bottom: 1px solid #e8eef4;
    }
    .ett__td--check { text-align: center; width: 30px; }
    .ett__td--num   { text-align: right; }

    /* Redeem bar */
    .ett__redeem-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 0 0; margin-top: 8px;
    }
    .ett__selected-info { font-size: 13px; color: #555; }
    .ett__redeem-btn {
      background: #1a3a6b; color: #fff; border: none;
      padding: 8px 22px; font-size: 13px; font-weight: bold;
      cursor: pointer; border-radius: 3px; font-family: Arial, sans-serif;
    }
    .ett__redeem-btn:disabled { opacity: 0.45; cursor: default; }
    .ett__redeem-btn:hover:not([disabled]) { background: #16304f; }

    /* History tab */
    .ett__history-summary {
      padding: 12px 0; border-bottom: 2px solid #1a3a6b; margin-bottom: 16px;
    }
    .ett__history-title { font-size: 14px; font-weight: bold; color: #333; margin-bottom: 10px; }
    .ett__history-stats { font-size: 14px; color: #333; line-height: 2; }
    .ett__null { color: #666; margin-left: 4px; }
    .ett__history-detail-title {
      font-size: 13px; font-weight: bold; color: #333;
      padding-bottom: 6px; border-bottom: 2px solid #1a3a6b; margin-bottom: 4px;
    }
    .ett__empty-history {
      text-align: center; padding: 20px; color: #1a3a6b;
      font-size: 13px; border-bottom: 1px solid #e8eef4;
    }
    .ett__showing { font-size: 12px; color: #888; padding: 8px 0; }
  `],
})
export class AmexEligibleTransactionsTableComponent {
  @Input() pageTitle = 'SELECT & PAY WITH POINTS';
  @Input() cards: { value: string; label: string }[] = [];
  @Input() eligibleRows: EligibleTransaction[] = [];
  @Input() historyRows: PointsHistoryRow[] = [];
  @Input() pointsBalance = '';
  @Input() aedValue = '';
  @Input() totalCredit = '';
  @Input() totalPointsRedeemed = '';
  @Input() errorMessage = '';

  activeTab: 'eligible' | 'history' = 'eligible';
  selectedCard = '';

  @Output() cardChange  = new EventEmitter<string>();
  @Output() redeemClick = new EventEmitter<EligibleTransaction[]>();

  get selectedRows()  { return this.eligibleRows.filter(r => r.selected); }
  get selectedCount() { return this.selectedRows.length; }

  onSelectionChange() { /* Angular handles ngModel binding */ }
}
