import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';
import { PaginationComponent } from '../../atoms/pagination';

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
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    TableComponent,
    TableHeadComponent,
    TableHeaderCellComponent,
    TableBodyComponent,
    TableRowComponent,
    TableCellComponent,
    PaginationComponent,
  ],
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
        <ui-input class="bcrb__filter-input" [(ngModel)]="filterText"
          (ngModelChange)="applyFilter()" ariaLabel="Filter reports"></ui-input>
      </div>

      <!-- Table -->
      <ui-table class="bcrb__table">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Serial No.</ui-table-header-cell>
            <ui-table-header-cell class="bcrb__th--link">Process ID</ui-table-header-cell>
            <ui-table-header-cell class="bcrb__th--link">File Name</ui-table-header-cell>
            <ui-table-header-cell>Report Creation Time</ui-table-header-cell>
            <ui-table-header-cell class="bcrb__th--status">Processing Status</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of pageRows" [hoverable]="true">
            <ui-table-cell>{{ row.serialNo }}</ui-table-cell>
            <ui-table-cell class="bcrb__td--link" (click)="rowClick.emit(row)">{{ row.processId }}</ui-table-cell>
            <ui-table-cell class="bcrb__td--link" (click)="rowClick.emit(row)">{{ row.fileName }}</ui-table-cell>
            <ui-table-cell>{{ row.reportCreationTime }}</ui-table-cell>
            <ui-table-cell [ngClass]="statusClass(row.processingStatus)">
              {{ row.processingStatus }}
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!pageRows.length" [hoverable]="false">
            <ui-table-cell [colspan]="5" [align]="'center'" class="bcrb__empty">No Data Found</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>

      <!-- Pagination — matches screenshot: Items per page: 5 ▼  0 of 0  |< < > >| -->
      <ui-pagination
        class="bcrb__pager"
        variant="compact"
        [currentPage]="page"
        [totalPages]="totalPages"
        [showFirstLast]="true"
        [showRangeLabel]="true"
        [rangeLabel]="rangeLabel"
        [showPageSizeSelector]="true"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageChange)="onPageNav($event)"
        (pageSizeChange)="onPageSizeChange($event)">
      </ui-pagination>
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
      --input-border: none; --input-radius: 0;
      border-bottom: 1px solid #aaa;
      width: 160px;
    }

    .bcrb__th--link  { color: #1a3a6b; }
    .bcrb__th--status { color: #1a3a6b; }

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
      font-weight: bold; font-size: 14px; color: #333; padding: 32px 0;
    }

    .bcrb__pager {
      display: flex; justify-content: flex-end;
      padding: 8px 16px; border-top: 1px solid #eee;
    }
  `],
})
export class AmexBCRBReportsTableComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-bcrb-reports-table-${++AmexBCRBReportsTableComponent._idCounter}`;

  @Input() rows: BCRBReportRow[] = [];
  @Input() username = '';
  @Output() rowClick  = new EventEmitter<BCRBReportRow>();
  @Output() newReport = new EventEmitter<void>();
  @Output() refresh   = new EventEmitter<void>();

  filterText = '';
  page = 1;
  pageSize = 5;
  filteredRows: BCRBReportRow[] = [];
  pageSizeOptions = [5, 10, 20];

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

  onPageNav(p: number) { this.page = p; }
  onPageSizeChange(size: number) { this.pageSize = size; this.page = 1; }

  statusClass(status: string) {
    const s = status.toLowerCase();
    if (s.includes('error') || s.includes('no response') || s.includes('fail') || s.includes('contact')) return 'bcrb__status--error';
    if (s.includes('complet') || s.includes('success')) return 'bcrb__status--ok';
    if (s.includes('pending')) return 'bcrb__status--pending';
    if (s.includes('process')) return 'bcrb__status--process';
    return '';
  }
}