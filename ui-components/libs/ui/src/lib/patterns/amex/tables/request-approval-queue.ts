import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';
import { BadgeComponent } from '../../../primitives/badge';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

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
  imports: [
    CommonModule, ButtonComponent, BadgeComponent, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="raq">
      <div class="raq__header">{{ title }}</div>
      <ui-table class="raq__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Request ID</ui-table-header-cell>
            <ui-table-header-cell>Reference No.</ui-table-header-cell>
            <ui-table-header-cell>Customer Name</ui-table-header-cell>
            <ui-table-header-cell>Emirates ID</ui-table-header-cell>
            <ui-table-header-cell>Status</ui-table-header-cell>
            <ui-table-header-cell class="raq__th--actions">Actions</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell class="raq__td--id">{{ row.requestId }}</ui-table-cell>
            <ui-table-cell>{{ row.referenceNo }}</ui-table-cell>
            <ui-table-cell>{{ row.customerName }}</ui-table-cell>
            <ui-table-cell>{{ row.emiratesId }}</ui-table-cell>
            <ui-table-cell>
              <ui-badge [label]="row.status" [variant]="statusVariant(row.status)" [size]="'sm'"></ui-badge>
            </ui-table-cell>
            <ui-table-cell class="raq__td--actions">
              <ui-button class="raq__btn raq__btn--accept" label="Accept" [size]="'sm'"
                (click)="actionClick.emit({action:'accept',row})"></ui-button>
              <ui-button class="raq__btn raq__btn--reject" label="Reject" [size]="'sm'"
                (click)="actionClick.emit({action:'reject',row})"></ui-button>
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="6" [align]="'center'" class="raq__empty">No pending requests.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .raq__header { background: #1a3a6b; color: #fff; padding: 10px 16px; font-size: 14px; font-weight: bold; }
    .raq__th--actions { text-align: center; }
    .raq__td--id { font-weight: bold; color: #1a3a6b; }
    .raq__td--actions { text-align: center; white-space: nowrap; }
    .raq__btn { --btn-radius: 3px; margin: 2px; }
    .raq__btn--accept { --btn-bg: #2e7d32; --btn-color: #fff; }
    .raq__btn--accept:hover { --btn-bg: #1b5e20; }
    .raq__btn--reject { --btn-bg: #c62828; --btn-color: #fff; }
    .raq__btn--reject:hover { --btn-bg: #b71c1c; }
    .raq__empty { color: #888; font-size: 13px; padding: 24px 0; }
  `],
})
export class AmexRequestApprovalQueueComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `request-approval-queue-${++AmexRequestApprovalQueueComponent._idCounter}`;

  @Input() rows: ApprovalRequestRow[] = [];
  @Input() title = 'Approval Queue';
  @Output() actionClick = new EventEmitter<{ action: string; row: ApprovalRequestRow }>();

  statusVariant(status: string): 'success' | 'error' | 'warning' | 'primary' | 'neutral' {
    const s = (status || '').toLowerCase();
    if (s === 'pending') return 'warning';
    if (s === 'approved') return 'success';
    if (s === 'rejected') return 'error';
    return 'neutral';
  }
}