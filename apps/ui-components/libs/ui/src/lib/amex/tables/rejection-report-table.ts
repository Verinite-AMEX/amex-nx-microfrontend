import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="rrt">
      <!-- Export / Print links above table — matches SOC/ROC screenshot -->
      <div class="rrt__top-bar">
        <span class="rrt__link" (click)="exportClick.emit()">Export</span>
        <span class="rrt__link" (click)="printClick.emit()">&#128438; Print</span>
      </div>

      <table class="rrt__table">
        <thead>
          <tr class="rrt__head-row">
            <th class="rrt__th">SE No.</th>
            <th class="rrt__th">Rejection Reason</th>
            <th class="rrt__th">Date</th>
            <th class="rrt__th rrt__th--num">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="rrt__row">
            <td class="rrt__td">{{ row.seNo }}</td>
            <td class="rrt__td">{{ row.rejectionReason }}</td>
            <td class="rrt__td">{{ row.date }}</td>
            <td class="rrt__td rrt__td--num">{{ row.amount }}</td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="4" class="rrt__empty">No Data Found</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .rrt__top-bar {
      display: flex; gap: 16px; padding: 6px 0 8px;
      border-bottom: 1px dotted #ccc; margin-bottom: 4px;
    }
    .rrt__link { color: #006fcf; font-size: 13px; cursor: pointer; }
    .rrt__link:hover { text-decoration: underline; }
    .rrt__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .rrt__head-row { background: #f0f0f0; }
    .rrt__th { padding: 6px 10px; border: 1px solid #ccc; font-size: 12px; font-weight: bold; color: #333; text-align: left; }
    .rrt__th--num { text-align: right; }
    .rrt__row { background: #fff; }
    .rrt__row:hover { background: #eef6ff; }
    .rrt__td { padding: 6px 10px; border: 1px solid #ddd; font-size: 13px; color: #333; }
    .rrt__td--num { text-align: right; }
    .rrt__empty { text-align: center; padding: 32px; font-weight: bold; font-size: 14px; color: #333; border: 1px solid #ddd; }
  `],
})
export class AmexRejectionReportTableComponent {
  @Input() rows: RejectionReportRow[] = [];
  @Output() exportClick = new EventEmitter<void>();
  @Output() printClick  = new EventEmitter<void>();
}
