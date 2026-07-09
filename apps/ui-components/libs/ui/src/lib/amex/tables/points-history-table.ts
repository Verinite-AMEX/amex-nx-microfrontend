import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
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

      <table class="pht__table">
        <thead>
          <tr class="pht__head-row">
            <th class="pht__th" scope="col">Transaction Date</th>
            <th class="pht__th" scope="col">Description</th>
            <th class="pht__th pht__th--num" scope="col">Transaction Amount</th>
            <th class="pht__th" scope="col">Redemption Date</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="pht__row">
            <td class="pht__td">{{ row.transactionDate }}</td>
            <td class="pht__td">{{ row.description }}</td>
            <td class="pht__td pht__td--num">{{ row.amountOffset }}</td>
            <td class="pht__td">{{ row.redemptionDate }}</td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="4" class="pht__empty">
              It appears that you have not placed any redemption order(s) on this Card.
              Please click on the 'Eligible Transactions' tab on the top left and place your first redemption.
            </td>
          </tr>
        </tbody>
      </table>

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
    .pht__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .pht__head-row { border-bottom: 1px solid #1a3a6b; }
    .pht__th { padding: 8px 12px; text-align: left; font-weight: bold; font-size: 13px; color: #1a3a6b; border-bottom: 1px solid #1a3a6b; }
    .pht__th--num { text-align: right; }
    .pht__row { border-bottom: 1px solid #e8eef4; }
    .pht__row:hover { background: #f5f9ff; }
    .pht__td { padding: 8px 12px; border-bottom: 1px solid #e8eef4; font-size: 13px; color: #333; }
    .pht__td--num { text-align: right; }
    .pht__empty { text-align: center; padding: 20px; color: #1a3a6b; font-size: 13px; border-bottom: 1px solid #eee; }
    .pht__showing { font-size: 12px; color: #888; padding: 8px 0; }
  `],
})
export class AmexPointsHistoryTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `points-history-table-${++AmexPointsHistoryTableComponent._idCounter}`;


  @Input() rows: PointsHistoryRowModel[] = [];
  @Input() totalCredit = '';
  @Input() totalPointsRedeemed = '';
}
