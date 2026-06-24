import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface BCRBReportRow {
  serialNo: number;
  processId: string;
  fileName: string;
  reportCreationTime: string;
  processingStatus: string;  /* e.g. "NO RESPONSE FROM BACKEND. CONTACT ADMIN" */
}

@Component({
  selector: 'amex-bcrb-reports-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bcrb">
      <!-- Indigo header bar — exact match to screenshot -->
      <div class="bcrb__header-bar">
        <span class="bcrb__header-title">BCRB Reports</span>
        <span class="bcrb__header-user" *ngIf="username">User :- {{ username }}</span>
      </div>

      <!-- Sub-header: title + links -->
      <div class="bcrb__sub-header">
        <div class="bcrb__sub-left">
          <span class="bcrb__main-title">BCRB REPORTS MAIN</span>
        </div>
        <span class="bcrb__refresh" (click)="refresh.emit()">Refresh Request</span>
      </div>

      <!-- Request New Report link -->
      <div class="bcrb__actions-row">
        <span class="bcrb__new-report" (click)="newReport.emit()">Request New Report +</span>
      </div>

      <!-- Filter input -->
      <div class="bcrb__filter-row">
        <span class="bcrb__filter-label">Filter:</span>
        <input class="bcrb__filter-input" [(ngModel)]="filterText"
          (ngModelChange)="applyFilter()" />
      </div>

      <!-- Table -->
      <table class="bcrb__table">
        <thead>
          <tr class="bcrb__head-row">
            <th class="bcrb__th">Serial No.</th>
            <th class="bcrb__th bcrb__th--link">Process ID</th>
            <th class="bcrb__th bcrb__th--link">File Name</th>
            <th class="bcrb__th">Report Creation Time</th>
            <th class="bcrb__th bcrb__th--status">Processing Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of pageRows" class="bcrb__row">
            <td class="bcrb__td">{{ row.serialNo }}</td>
            <td class="bcrb__td bcrb__td--link" (click)="rowClick.emit(row)">{{ row.processId }}</td>
            <td class="bcrb__td bcrb__td--link" (click)="rowClick.emit(row)">{{ row.fileName }}</td>
            <td class="bcrb__td">{{ row.reportCreationTime }}</td>
            <td class="bcrb__td" [ngClass]="statusClass(row.processingStatus)">
              {{ row.processingStatus }}
            </td>
          </tr>
          <tr *ngIf="!pageRows.length">
            <td colspan="5" class="bcrb__empty">No Data Found</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination — matches screenshot: Items per page: 5 ▼  0 of 0  |< < > >| -->
      <div class="bcrb__pager">
        <span class="bcrb__pager-label">Items per page:</span>
        <select class="bcrb__pager-select" [(ngModel)]="pageSize" (ngModelChange)="page=1">
          <option *ngFor="let s of [5,10,20]" [value]="s">{{ s }}</option>
        </select>
        <span class="bcrb__pager-range">{{ rangeLabel }}</span>
        <div class="bcrb__pager-btns">
          <button class="bcrb__pager-btn" (click)="page=1"         [disabled]="page===1">|&lt;</button>
          <button class="bcrb__pager-btn" (click)="page=page-1"    [disabled]="page===1">&lt;</button>
          <button class="bcrb__pager-btn" (click)="page=page+1"    [disabled]="page===totalPages">&gt;</button>
          <button class="bcrb__pager-btn" (click)="page=totalPages"[disabled]="page===totalPages">&gt;|</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* Indigo header bar — exact match to BCRB screenshot image5/image8 */
    .bcrb__header-bar {
      background: #3d4dac;
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 16px; color: #fff;
    }
    .bcrb__header-title { font-size: 16px; font-weight: bold; }
    .bcrb__header-user  { font-size: 13px; }

    /* Sub header */
    .bcrb__sub-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 16px 4px; border-bottom: 1px solid #e8e8e8;
    }
    .bcrb__main-title { font-size: 14px; font-weight: bold; color: #333; }
    .bcrb__refresh { font-size: 13px; color: #1a3a6b; cursor: pointer; }
    .bcrb__refresh:hover { text-decoration: underline; }

    .bcrb__actions-row { padding: 6px 16px 4px; }
    .bcrb__new-report {
      font-size: 13px; color: #1a3a6b; cursor: pointer;
    }
    .bcrb__new-report:hover { text-decoration: underline; }

    /* Filter row */
    .bcrb__filter-row {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 16px 8px; font-size: 13px; color: #555;
    }
    .bcrb__filter-label { white-space: nowrap; }
    .bcrb__filter-input {
      border: none; border-bottom: 1px solid #aaa; outline: none;
      font-size: 13px; width: 160px; padding: 2px 4px;
      font-family: Arial, sans-serif;
    }

    /* Table */
    .bcrb__table { width: 100%; border-collapse: collapse; font-size: 13px; }

    .bcrb__head-row { border-bottom: 1px solid #ddd; }
    .bcrb__th {
      padding: 8px 16px; text-align: left;
      color: #333; font-weight: normal; font-size: 13px;
      border-bottom: 1px solid #ddd;
    }
    .bcrb__th--link  { color: #1a3a6b; }
    .bcrb__th--status { color: #1a3a6b; }

    .bcrb__row { border-bottom: 1px solid #f0f0f0; }
    .bcrb__row:hover { background: #f5f7ff; }
    .bcrb__td {
      padding: 8px 16px; font-size: 13px; color: #333;
      border-bottom: 1px solid #f0f0f0;
    }
    .bcrb__td--link {
      color: #1a3a6b; cursor: pointer;
    }
    .bcrb__td--link:hover { text-decoration: underline; }

    /* Status colours — red for error (matches screenshot "NO RESPONSE FROM BACKEND") */
    .bcrb__status--error   { color: #c62828; font-weight: bold; }
    .bcrb__status--ok      { color: #2e7d32; }
    .bcrb__status--pending { color: #f57f17; }
    .bcrb__status--process { color: #1565c0; }

    .bcrb__empty {
      padding: 32px; text-align: center;
      font-weight: bold; font-size: 14px; color: #333;
    }

    /* Pagination — right-aligned, matches screenshot exactly */
    .bcrb__pager {
      display: flex; align-items: center; justify-content: flex-end;
      gap: 8px; padding: 8px 16px;
      border-top: 1px solid #eee; font-size: 13px; color: #555;
    }
    .bcrb__pager-label { white-space: nowrap; }
    .bcrb__pager-select {
      border: 1px solid #ccc; padding: 2px 6px;
      font-size: 12px; font-family: Arial, sans-serif; border-radius: 2px;
    }
    .bcrb__pager-range { min-width: 60px; text-align: right; }
    .bcrb__pager-btns { display: flex; gap: 1px; }
    .bcrb__pager-btn {
      background: none; border: 1px solid #ccc; color: #555;
      width: 26px; height: 26px; font-size: 12px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-family: Arial, sans-serif; padding: 0;
    }
    .bcrb__pager-btn:hover:not([disabled]) { background: #e8f0fe; border-color: #1a3a6b; }
    .bcrb__pager-btn[disabled] { opacity: 0.35; cursor: default; }
  `],
})
export class AmexBCRBReportsTableComponent implements OnChanges {
  @Input() rows: BCRBReportRow[] = [];
  @Input() username = '';
  @Output() rowClick  = new EventEmitter<BCRBReportRow>();
  @Output() newReport = new EventEmitter<void>();
  @Output() refresh   = new EventEmitter<void>();

  filterText = '';
  page = 1;
  pageSize = 5;
  filteredRows: BCRBReportRow[] = [];

  get totalPages() { return Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize)); }
  get pageRows() {
    const s = (this.page - 1) * this.pageSize;
    return this.filteredRows.slice(s, s + this.pageSize);
  }
  get rangeLabel() {
    if (!this.filteredRows.length) return '0 of 0';
    const s = (this.page - 1) * this.pageSize + 1;
    const e = Math.min(this.page * this.pageSize, this.filteredRows.length);
    return `${s} – ${e} of ${this.filteredRows.length}`;
  }

  ngOnChanges() { this.applyFilter(); }

  applyFilter() {
    const f = this.filterText.toLowerCase();
    this.filteredRows = f
      ? this.rows.filter(r =>
          r.fileName.toLowerCase().includes(f) ||
          r.processId.toLowerCase().includes(f) ||
          r.processingStatus.toLowerCase().includes(f))
      : [...this.rows];
    this.page = 1;
  }

  statusClass(status: string) {
    const s = status.toLowerCase();
    if (s.includes('error') || s.includes('no response') || s.includes('fail') || s.includes('contact')) return 'bcrb__status--error';
    if (s.includes('complet') || s.includes('success')) return 'bcrb__status--ok';
    if (s.includes('pending')) return 'bcrb__status--pending';
    if (s.includes('process')) return 'bcrb__status--process';
    return '';
  }
}
