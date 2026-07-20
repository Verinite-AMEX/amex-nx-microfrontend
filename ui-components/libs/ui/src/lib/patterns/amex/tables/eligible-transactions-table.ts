import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../../primitives/label';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import { CheckboxComponent } from '../../../primitives/checkbox';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

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
  imports: [
    CommonModule, FormsModule, LabelComponent, SelectComponent, CheckboxComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent, TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="ett">
      <!-- Navy page header — "SELECT & PAY WITH POINTS" matches screenshot image5 -->
      <div class="ett__page-header">{{ pageTitle }}</div>

      <!-- Teal/gray tab switcher — matches screenshot exactly -->
      <div class="ett__tabs">
      <ui-button class="ett__tab"
         [class.ett__tab--active]="activeTab === 'eligible'"
         [class.ett__tab--inactive]="activeTab === 'history'"
         label="Eligible Transactions"
        (click)="activeTab='eligible'">
      </ui-button>
      <ui-button class="ett__tab"
         [class.ett__tab--active]="activeTab === 'history'"
        [class.ett__tab--inactive]="activeTab === 'eligible'"
        label="History"
        (click)="activeTab='history'">
      </ui-button>
      </div>

      <!-- Eligible Transactions tab -->
      <div *ngIf="activeTab === 'eligible'" class="ett__content">
        <!-- Card selector dropdown -->
        <div class="ett__card-selector">
          <ui-label class="ett__card-label" [forId]="id + '-select-a-card'">Select a Card</ui-label>
          <ui-select [id]="id + '-select-a-card'" class="ett__card-select"
            [options]="cards" [placeholder]="'-- Select --'" [(ngModel)]="selectedCard"
            (ngModelChange)="cardChange.emit(selectedCard)">
          </ui-select>
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
        <ui-table *ngIf="eligibleRows.length" class="ett__table" [bordered]="false">
          <ui-table-head>
            <ui-table-row [header]="true" [hoverable]="false">
              <ui-table-header-cell class="ett__th--check"></ui-table-header-cell>
              <ui-table-header-cell>Transaction Date</ui-table-header-cell>
              <ui-table-header-cell>Description</ui-table-header-cell>
              <ui-table-header-cell [align]="'right'">Amount</ui-table-header-cell>
              <ui-table-header-cell [align]="'right'">Points Value</ui-table-header-cell>
            </ui-table-row>
          </ui-table-head>
          <ui-table-body>
            <ui-table-row *ngFor="let row of eligibleRows" [hoverable]="true"
              [class.ett__row--selected]="row.selected">
              <ui-table-cell class="ett__td--check">
                <ui-checkbox [(ngModel)]="row.selected" (ngModelChange)="onSelectionChange()"></ui-checkbox>
              </ui-table-cell>
              <ui-table-cell>{{ row.transactionDate }}</ui-table-cell>
              <ui-table-cell>{{ row.description }}</ui-table-cell>
              <ui-table-cell [align]="'right'">{{ row.amount }}</ui-table-cell>
              <ui-table-cell [align]="'right'">{{ row.pointsValue }}</ui-table-cell>
            </ui-table-row>
          </ui-table-body>
        </ui-table>

        <!-- Redeem button -->
        <div *ngIf="eligibleRows.length" class="ett__redeem-bar">
          <span class="ett__selected-info">{{ selectedCount }} transaction(s) selected</span>
          <ui-button class="ett__redeem-btn" label="Redeem Points" [disabled]="!selectedCount"
            (click)="redeemClick.emit(selectedRows)">
          </ui-button>
        </div>
      </div>

      <!-- History tab -->
      <div *ngIf="activeTab === 'history'" class="ett__content">
        <div class="ett__history-title">History Summary</div>
        <div class="ett__history-summary">
          <div class="ett__history-stats">
           <div><strong>Total Statement Credit:</strong>&nbsp;<span [class.ett__null]="!totalCredit">{{ totalCredit || 'null' }}</span></div>
           <div><strong>Total Points Redeemed:</strong>&nbsp;<span [class.ett__null]="!totalPointsRedeemed">{{ totalPointsRedeemed || 'null' }}</span></div>
          </div>
        </div>

        <div class="ett__history-detail-title">History Details (Past 1 year)</div>
        
          <ui-table class="ett__table ett__table--history" [bordered]="false">
       <ui-table-head>
    <ui-table-row [header]="true" [hoverable]="false">
      <ui-table-header-cell style="width: 20%;" [align]="'center'">Transaction Date</ui-table-header-cell>
      <ui-table-header-cell style="width: 35%;" [align]="'center'">Description</ui-table-header-cell>
      <ui-table-header-cell style="width: 22%;" [align]="'center'">Transaction Amount</ui-table-header-cell>
      <ui-table-header-cell style="width: 23%;" [align]="'center'">Redemption Date</ui-table-header-cell>
    </ui-table-row>
   </ui-table-head>
   <ui-table-body>
    <ui-table-row *ngFor="let row of historyRows" [hoverable]="true">
      <ui-table-cell [align]="'center'">{{ row.transactionDate }}</ui-table-cell>
      <ui-table-cell [align]="'center'">{{ row.description }}</ui-table-cell>
      <ui-table-cell [align]="'center'">{{ row.amountOffset }}</ui-table-cell>
      <ui-table-cell [align]="'center'">{{ row.redemptionDate }}</ui-table-cell>
    </ui-table-row>
    <ui-table-row *ngIf="!historyRows.length" [hoverable]="false">
      <ui-table-cell [colspan]="4" [align]="'center'" class="ett__empty-history">
        It appears that you have not placed any redemption order(s) on this Card.
        Please click on the 'Eligible Transactions' tab on the top left and place your first redemption.
      </ui-table-cell>
    </ui-table-row>
   </ui-table-body>
        </ui-table>

        <div class="ett__showing" *ngIf="historyRows.length">
          Showing {{ historyRows.length }} to {{ historyRows.length }} of {{ historyRows.length }} entries
        </div>
        <div class="ett__showing" *ngIf="!historyRows.length">Showing 0 to 0 of 0 entries</div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .ett__page-header {
      background: #1a3a6b; color: #fff;
      font-size: 15px; font-weight: bold;
      padding: 12px 16px; text-transform: uppercase; letter-spacing: 0.5px;
    }

    .ett__tabs { display: flex; }
    .ett__tab {
      --btn-width: 100%; --btn-justify-content: center; --btn-radius: 0;
      --btn-color: #fff; --btn-padding: 11px 0; flex: 1;
    }
    .ett__tab--active   { --btn-bg: #1a7a9a; }
    .ett__tab--inactive { --btn-bg: #888; }

    .ett__content { padding: 16px; background: #fff; }

    .ett__card-selector { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .ett__card-label { font-size: 14px; font-weight: bold; color: #1a3a6b; }
    .ett__card-select { --input-border: 1px solid #ccc; min-width: 280px; }

    .ett__error {
      display: flex; align-items: center; gap: 8px;
      background: #fce4e4; border: 1px solid #f5c6c6;
      padding: 10px 14px; font-size: 13px; color: #c62828;
      border-radius: 3px; margin-bottom: 12px;
    }
    .ett__error-icon { font-size: 14px; }

    .ett__points-bar {
      display: flex; align-items: center; gap: 12px;
      padding: 8px 12px; background: #f5f9ff;
      border: 1px solid #d0e4f7; margin-bottom: 12px;
      font-size: 13px;
    }
    .ett__points-label { color: #555; }
    .ett__points-value { font-size: 16px; font-weight: bold; color: #1a3a6b; }
    .ett__points-aed   { color: #888; }

    .ett__table { table-layout: fixed; }
    .ett__table--history {
      margin-top: 12px;
      width: 100%;
      table-layout: fixed;
      --table-head-bg: transparent;
    }
  .ett__table--history ::ng-deep .ui-th {
       border-bottom: 1px solid #ccc;
    }
  .ett__table--history ::ng-deep .ui-td {
      border-bottom: 1px solid #ddd;
    }

    .ett__th--check { width: 30px; }
    .ett__row--selected { background: #eaf4fb; }
    .ett__td--check { text-align: center; width: 30px; }

    .ett__redeem-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 0 0; margin-top: 8px;
    }
    .ett__selected-info { font-size: 13px; color: #555; }
    .ett__redeem-btn { --btn-bg: #1a3a6b; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 8px 22px; }
    .ett__redeem-btn:hover { --btn-bg: #16304f; }

    .ett__history-title {
      font-size: 13px; font-weight: normal; color: #1a3a6b;
      padding-bottom: 6px; border-bottom: 2px solid #1a3a6b; margin-bottom: 10px;
    }
    .ett__history-summary { padding: 4px 0 14px; text-align: center; }
    .ett__history-stats { font-size: 13px; color: #333; display: inline-block; text-align: left; }
    .ett__history-stats div { margin-bottom: 4px; }
    .ett__null { color: #666; margin-left: 4px; }
    .ett__history-detail-title {
      font-size: 13px; font-weight: normal; color: #1a3a6b;
      padding-bottom: 6px; border-bottom: 2px solid #1a3a6b; margin-bottom: 4px;
    }
    .ett__empty-history {
      color: #1a3a6b; font-size: 13px; padding: 20px 0;
    }
    .ett__showing { font-size: 12px; color: #888; padding: 8px 0; }
  `],
})
export class AmexEligibleTransactionsTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `eligible-transactions-table-${++AmexEligibleTransactionsTableComponent._idCounter}`;

  @Input() pageTitle = 'SELECT & PAY WITH POINTS';
  @Input() cards: SelectOption[] = [];
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