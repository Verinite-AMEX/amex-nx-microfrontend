import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ApprovalRequestRow {
  requestId: string;
  referenceNo: string;
  customerName: string;
  emiratesId: string;
  status: string;
}

/**
 * RequestApprovalQueue
 * UAEFTS checker queue of pending requests.
 * Accept and Reject action buttons per row.
 * Source: UAEFTS Statements — modern blue header style
 */
@Component({
  selector: 'amex-request-approval-queue',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="raq">
      <div class="raq__header">{{ title }}</div>
      <table class="raq__table">
        <thead>
          <tr class="raq__head-row">
            <th class="raq__th">Request ID</th>
            <th class="raq__th">Reference No.</th>
            <th class="raq__th">Customer Name</th>
            <th class="raq__th">Emirates ID</th>
            <th class="raq__th">Status</th>
            <th class="raq__th raq__th--actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="raq__row">
            <td class="raq__td raq__td--id">{{ row.requestId }}</td>
            <td class="raq__td">{{ row.referenceNo }}</td>
            <td class="raq__td">{{ row.customerName }}</td>
            <td class="raq__td">{{ row.emiratesId }}</td>
            <td class="raq__td">
              <span class="raq__status raq__status--{{ row.status.toLowerCase() }}">
                {{ row.status }}
              </span>
            </td>
            <td class="raq__td raq__td--actions">
              <button class="raq__btn raq__btn--accept" (click)="actionClick.emit({action:'accept',row})">Accept</button>
              <button class="raq__btn raq__btn--reject" (click)="actionClick.emit({action:'reject',row})">Reject</button>
            </td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="6" class="raq__empty">No pending requests.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .raq__header { background: #1a3a6b; color: #fff; padding: 10px 16px; font-size: 14px; font-weight: bold; }
    .raq__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .raq__head-row { background: #d6eaf8; }
    .raq__th { padding: 8px 12px; border: 1px solid #b8d4ea; font-size: 12px; font-weight: bold; color: #1a3a6b; text-align: left; }
    .raq__th--actions { text-align: center; }
    .raq__row { border-bottom: 1px solid #eee; }
    .raq__row:hover { background: #f5f9ff; }
    .raq__td { padding: 9px 12px; border: 1px solid #e8eef4; font-size: 13px; color: #333; }
    .raq__td--id { font-weight: bold; color: #1a3a6b; }
    .raq__td--actions { text-align: center; white-space: nowrap; }
    .raq__status { font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 10px; }
    .raq__status--pending  { background: #fff8e1; color: #f57f17; }
    .raq__status--approved { background: #e8f5e9; color: #2e7d32; }
    .raq__status--rejected { background: #ffebee; color: #c62828; }
    .raq__btn { border: none; padding: 5px 14px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 3px; margin: 2px; font-family: Arial, sans-serif; }
    .raq__btn--accept { background: #2e7d32; color: #fff; }
    .raq__btn--accept:hover { background: #1b5e20; }
    .raq__btn--reject { background: #c62828; color: #fff; }
    .raq__btn--reject:hover { background: #b71c1c; }
    .raq__empty { text-align: center; padding: 24px; color: #888; font-size: 13px; }
  `],
})
export class AmexRequestApprovalQueueComponent {
  @Input() rows: ApprovalRequestRow[] = [];
  @Input() title = 'Approval Queue';
  @Output() actionClick = new EventEmitter<{ action: string; row: ApprovalRequestRow }>();
}
