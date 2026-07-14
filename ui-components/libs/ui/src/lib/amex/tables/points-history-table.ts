import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';

export interface PointsHistoryRowModel{
  transactionDate: string;
  description: string;
  pointsRedeemed: string;
  amountOffset: string;
  redemptionDate: string;
}

/**
 * PointsHistoryTable
 * Historical records of completed Pay-with-Points redemptions.
 * Source: Pay with Points (image6) — modern blue header style
 */
@Component({
  selector: 'amex-points-history-table',
  standalone: true,
  imports: [
    CommonModule, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="pht">
      <!-- Summary bar -->
      <div class="pht__summary">
        <div class="pht__summary-row">
          <span class="pht__summary-label">Total Statement Credit:</span>
          <span class="pht__summary-value" [class.pht__null]="!totalCredit">{{ totalCredit || 'null' }}</span>
        </div>
        <div class="pht__summary-row">
          <span class="pht__summary-label">Total Points Redeemed:</span>
          <span class="pht__summary-value" [class.pht__null]="!totalPointsRedeemed">{{ totalPointsRedeemed || 'null' }}</span>
        </div>
      </div>

      <div class="pht__detail-title">History Details (Past 1 year)</div>

      <ui-table class="pht__table" [bordered]="false">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Transaction Date</ui-table-header-cell>
            <ui-table-header-cell>Description</ui-table-header-cell>
            <ui-table-header-cell [align]="'right'">Transaction Amount</ui-table-header-cell>
            <ui-table-header-cell>Redemption Date</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell>{{ row.transactionDate }}</ui-table-cell>
            <ui-table-cell>{{ row.description }}</ui-table-cell>
            <ui-table-cell [align]="'right'">{{ row.amountOffset }}</ui-table-cell>
            <ui-table-cell>{{ row.redemptionDate }}</ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="4" [align]="'center'" class="pht__empty">
              It appears that you have not placed any redemption order(s) on this Card.
              Please click on the 'Eligible Transactions' tab on the top left and place your first redemption.
            </ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>

      <div class="pht__showing">
        Showing {{ rows.length ? '1' : '0' }} to {{ rows.length }} of {{ rows.length }} entries
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .pht__summary { padding: 12px 0 8px; border-bottom: 2px solid #1a3a6b; margin-bottom: 12px; }
    .pht__summary-row { font-size: 14px; color: #333; line-height: 2; }
    .pht__summary-label { font-weight: bold; }
    .pht__summary-value { margin-left: 8px; }
    .pht__null { color: #888; }
    .pht__detail-title { font-size: 13px; font-weight: bold; color: #333; padding-bottom: 6px; border-bottom: 2px solid #1a3a6b; margin-bottom: 4px; }
    .pht__empty { color: #1a3a6b; font-size: 13px; padding: 20px 0; }
    .pht__showing { font-size: 12px; color: #888; padding: 8px 0; }
  `],
})
export class AmexPointsHistoryTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `points-history-table-${++AmexPointsHistoryTableComponent._idCounter}`;

  @Input() rows: PointsHistoryRowModel[] = [];
  @Input() totalCredit = '';
  @Input() totalPointsRedeemed = '';
}