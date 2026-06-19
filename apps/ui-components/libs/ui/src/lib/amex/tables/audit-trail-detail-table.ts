import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AuditTrailRow {
  date: string;
  time: string;
  user: string;
  action: string;
  entity: string;
  oldValue: string;
  newValue: string;
}

/**
 * AuditTrailDetailTable
 * Full detailed audit log per user/month. Exportable PDF/Excel/CSV/RTF.
 * Source: BTA Portal (image20) — light blue panel, Detailed/Summary tabs,
 *         View Report dropdown, date pickers, Load Audit Trail button, Download format
 */
@Component({
  selector: 'amex-audit-trail-detail-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="adt">
      <!-- Blue panel header -->
      <div class="adt__panel-header">Audit Trail</div>

      <!-- Detailed / Summary tabs -->
      <div class="adt__tabs">
        <button class="adt__tab" [class.adt__tab--active]="activeTab==='detailed'"
          (click)="activeTab='detailed'">Detailed Report</button>
        <button class="adt__tab" [class.adt__tab--active]="activeTab==='summary'"
          (click)="activeTab='summary'">Summary Report</button>
      </div>

      <!-- Filter row -->
      <div class="adt__filters">
        <div class="adt__filter-row">
          <label class="adt__filter-label">Date From</label>
          <input class="adt__date-input" type="text" [(ngModel)]="dateFrom" placeholder="dd/mm/yyyy" />
          <label class="adt__filter-label">Date To</label>
          <input class="adt__date-input" type="text" [(ngModel)]="dateTo" placeholder="dd/mm/yyyy" />
        </div>
        <button class="adt__load-btn" (click)="loadClick.emit({dateFrom, dateTo})">Load Audit Trail</button>
      </div>

      <!-- No records message -->
      <div *ngIf="rows.length === 0 && loaded" class="adt__no-records">
        No Audit Records were found for this Search Criteria
      </div>

      <!-- Data table -->
      <table *ngIf="rows.length" class="adt__table">
        <thead>
          <tr class="adt__head-row">
            <th class="adt__th">Date</th>
            <th class="adt__th">Time</th>
            <th class="adt__th">User</th>
            <th class="adt__th">Action</th>
            <th class="adt__th">Entity</th>
            <th class="adt__th">Old Value</th>
            <th class="adt__th">New Value</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="adt__row">
            <td class="adt__td">{{ row.date }}</td>
            <td class="adt__td">{{ row.time }}</td>
            <td class="adt__td">{{ row.user }}</td>
            <td class="adt__td">{{ row.action }}</td>
            <td class="adt__td">{{ row.entity }}</td>
            <td class="adt__td">{{ row.oldValue }}</td>
            <td class="adt__td">{{ row.newValue }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Download format row — matches BTA screenshot -->
      <div class="adt__download-row">
        <select class="adt__format-select" [(ngModel)]="downloadFormat">
          <option value="PDF">PDF</option>
          <option value="Excel">Excel</option>
          <option value="CSV">CSV</option>
          <option value="RTF">RTF</option>
        </select>
        <button class="adt__download-btn"
          (click)="downloadClick.emit(downloadFormat)">Download Report</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .adt { border: 1px solid #b0cce0; background: #fff; }

    /* Blue panel header — matches BTA screenshot */
    .adt__panel-header {
      background: #b8d8f0; padding: 8px 14px;
      font-size: 13px; font-weight: bold; color: #1a3a6b;
      border-bottom: 1px solid #a0c0d8;
    }

    /* Tabs — Detailed (white bg) | Summary (blue active) */
    .adt__tabs { display: flex; border-bottom: 1px solid #ddd; background: #f5f5f5; }
    .adt__tab {
      padding: 7px 18px; font-size: 13px; cursor: pointer;
      border: 1px solid #ccc; border-bottom: none; background: #f0f0f0;
      color: #333; margin: 4px 2px 0; font-family: Arial, sans-serif;
    }
    .adt__tab--active { background: #1a7abf; color: #fff; border-color: #1a7abf; }

    /* Filter row */
    .adt__filters { padding: 12px 14px; border-bottom: 1px solid #e8e8e8; }
    .adt__filter-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
    .adt__filter-label { font-size: 12px; color: #333; white-space: nowrap; }
    .adt__date-input {
      border: 1px solid #aaa; padding: 3px 8px; font-size: 12px;
      font-family: Arial, sans-serif; width: 110px;
    }
    .adt__load-btn {
      background: linear-gradient(to bottom, #f0f0f0, #d8d8d8);
      border: 1px solid #aaa; padding: 4px 16px; font-size: 12px;
      cursor: pointer; font-family: Arial, sans-serif; border-radius: 2px;
    }
    .adt__load-btn:hover { background: linear-gradient(to bottom, #e0e0e0, #c8c8c8); }

    .adt__no-records { padding: 10px 14px; font-size: 13px; color: #333; }

    /* Table */
    .adt__table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .adt__head-row { background: #d6eaf8; }
    .adt__th {
      padding: 6px 10px; text-align: left; font-size: 12px;
      font-weight: bold; color: #1a3a6b; border: 1px solid #b8d4ea;
    }
    .adt__row { border-bottom: 1px solid #eee; }
    .adt__row:hover { background: #f5f9ff; }
    .adt__td { padding: 6px 10px; border: 1px solid #e8eef4; font-size: 12px; color: #333; }

    /* Download row */
    .adt__download-row {
      display: flex; align-items: center; gap: 8px; padding: 10px 14px;
      border-top: 1px solid #e8e8e8;
    }
    .adt__format-select {
      border: 1px solid #bbb; padding: 3px 8px; font-size: 12px;
      font-family: Arial, sans-serif;
    }
    .adt__download-btn {
      background: linear-gradient(to bottom, #f0f0f0, #d8d8d8);
      border: 1px solid #aaa; padding: 4px 14px; font-size: 12px;
      cursor: pointer; font-family: Arial, sans-serif;
    }
    .adt__download-btn:hover { background: linear-gradient(to bottom, #e0e0e0, #c8c8c8); }
  `],
})
export class AmexAuditTrailDetailTableComponent {
  @Input() rows: AuditTrailRow[] = [];
  @Input() loaded = false;
  activeTab: 'detailed' | 'summary' = 'detailed';
  dateFrom = '';
  dateTo = '';
  downloadFormat = 'PDF';
  @Output() loadClick     = new EventEmitter<{ dateFrom: string; dateTo: string }>();
  @Output() downloadClick = new EventEmitter<string>();
}
