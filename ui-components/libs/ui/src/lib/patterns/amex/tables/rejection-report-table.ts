import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

export interface RejectionReportRow {
  seNo: string;
  rejectionReason: string;
  date: string;
  amount: string;
}

/**
 * RejectionReportTable
 * Lists rejected SOC/ROC items. Export to Excel and Print buttons.
 * Source: SOC/ROC — ONLS portal style, "No Data Found" empty state
 */
@Component({
  selector: 'amex-rejection-report-table',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="rrt">
      <!-- Export / Print links above table — matches SOC/ROC screenshot -->
      <div class="rrt__top-bar">
        <ui-button class="rrt__link-btn" label="Export" variant="ghost" [size]="'sm'" (click)="exportClick.emit()"></ui-button>
        <ui-button class="rrt__link-btn" label="🖨 Print" variant="ghost" [size]="'sm'" (click)="printClick.emit()"></ui-button>
      </div>

      <ui-table class="rrt__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>SE No.</ui-table-header-cell>
            <ui-table-header-cell>Rejection Reason</ui-table-header-cell>
            <ui-table-header-cell>Date</ui-table-header-cell>
            <ui-table-header-cell [align]="'right'">Amount</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell>{{ row.seNo }}</ui-table-cell>
            <ui-table-cell>{{ row.rejectionReason }}</ui-table-cell>
            <ui-table-cell>{{ row.date }}</ui-table-cell>
            <ui-table-cell [align]="'right'">{{ row.amount }}</ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="4" [align]="'center'" class="rrt__empty">No Data Found</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .rrt__top-bar {
      display: flex; gap: 16px; padding: 6px 0 8px;
      border-bottom: 1px dotted #ccc; margin-bottom: 4px;
    }
    .rrt__link-btn { --btn-bg: transparent; --btn-color: #006fcf; --btn-font-weight: normal; --btn-border: none; padding: 0; }
    .rrt__link-btn:hover { text-decoration: underline; }
    .rrt__empty { font-weight: bold; font-size: 14px; color: #333; padding: 32px 0; }
  `],
})
export class AmexRejectionReportTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `rejection-report-table-${++AmexRejectionReportTableComponent._idCounter}`;

  @Input() rows: RejectionReportRow[] = [];
  @Output() exportClick = new EventEmitter<void>();
  @Output() printClick  = new EventEmitter<void>();
}