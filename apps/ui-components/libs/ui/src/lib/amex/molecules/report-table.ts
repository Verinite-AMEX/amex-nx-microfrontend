import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexStatusBadgeComponent } from '../atoms/status-badge';

export interface Amex_Molecules_TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'status' | 'amount' | 'date' | 'badge';
  width?: string;
}

export interface AmexReportTableConfig {
  columns: Amex_Molecules_TableColumn[];
  pageSize?: number;
  searchable?: boolean;
  exportable?: boolean;
}

@Component({
  selector: 'amex-report-table',
  standalone: true,
  imports: [CommonModule, FormsModule, AmexStatusBadgeComponent],
  template: `
    <div class="amex-table-wrap">
      <!-- Toolbar -->
      <div class="amex-table-toolbar" *ngIf="config.searchable || config.exportable">
        <input
          *ngIf="config.searchable"
          class="amex-table-search"
          type="text"
          placeholder="Search..."
          [(ngModel)]="searchTerm"
          (ngModelChange)="applyFilter()"
        />
        <div class="amex-table-toolbar__actions">
          <button *ngIf="config.exportable" class="amex-table-btn" (click)="export.emit('pdf')">PDF</button>
          <button *ngIf="config.exportable" class="amex-table-btn" (click)="export.emit('excel')">Excel</button>
          <button *ngIf="config.exportable" class="amex-table-btn" (click)="export.emit('csv')">CSV</button>
        </div>
      </div>

      <!-- Table -->
      <div class="amex-table-scroll">
        <table class="amex-table">
          <thead>
            <tr>
              <th
                *ngFor="let col of config.columns"
                [style.width]="col.width || 'auto'"
                [class.amex-table__th--sortable]="col.sortable"
                (click)="col.sortable && sort(col.key)"
              >
                {{ col.label }}
                <span *ngIf="col.sortable" class="amex-table__sort-icon">
                  {{ sortKey === col.key ? (sortAsc ? '↑' : '↓') : '↕' }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of pagedRows; let i = index" class="amex-table__row">
              <td *ngFor="let col of config.columns">
                <amex-status-badge
                  *ngIf="col.type === 'status'"
                  [status]="$any(row[col.key])">
                </amex-status-badge>
                <span *ngIf="col.type !== 'status'">{{ row[col.key] }}</span>
              </td>
            </tr>
            <tr *ngIf="pagedRows.length === 0">
              <td [attr.colspan]="config.columns.length" class="amex-table__empty">
                No records found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="amex-table-pagination">
        <span class="amex-table-pagination__info">
          Showing {{ startIndex + 1 }}–{{ endIndex }} of {{ filteredRows.length }} records
        </span>
        <div class="amex-table-pagination__controls">
          <button class="amex-table-btn" [disabled]="currentPage === 1" (click)="goToPage(1)">«</button>
          <button class="amex-table-btn" [disabled]="currentPage === 1" (click)="goToPage(currentPage - 1)">‹</button>
          <span class="amex-table-pagination__page">{{ currentPage }} / {{ totalPages }}</span>
          <button class="amex-table-btn" [disabled]="currentPage === totalPages" (click)="goToPage(currentPage + 1)">›</button>
          <button class="amex-table-btn" [disabled]="currentPage === totalPages" (click)="goToPage(totalPages)">»</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .amex-table-wrap { border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background: #fff; }
    .amex-table-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      background: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
      gap: 12px;
    }
    .amex-table-search {
      flex: 1;
      max-width: 280px;
      padding: 6px 10px;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      font-size: 13px;
      outline: none;
    }
    .amex-table-search:focus { border-color: #016FD0; }
    .amex-table-toolbar__actions { display: flex; gap: 6px; }
    .amex-table-btn {
      padding: 5px 10px;
      font-size: 12px;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      background: #fff;
      cursor: pointer;
      color: #333;
      transition: background 0.1s;
    }
    .amex-table-btn:hover:not(:disabled) { background: #016FD0; color: #fff; border-color: #016FD0; }
    .amex-table-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .amex-table-scroll { overflow-x: auto; }
    .amex-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .amex-table thead tr { background: #f0f4ff; }
    .amex-table th {
      padding: 10px 14px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #d0d9f0;
      white-space: nowrap;
    }
    .amex-table__th--sortable { cursor: pointer; user-select: none; }
    .amex-table__th--sortable:hover { background: #e3eaff; }
    .amex-table__sort-icon { margin-left: 4px; color: #888; font-size: 11px; }
    .amex-table__row td {
      padding: 10px 14px;
      border-bottom: 1px solid #f0f0f0;
      color: #333;
    }
    .amex-table__row:hover td { background: #fafbff; }
    .amex-table__empty {
      padding: 24px;
      text-align: center;
      color: #aaa;
      font-style: italic;
    }
    .amex-table-pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      background: #f8f9fa;
      border-top: 1px solid #e0e0e0;
    }
    .amex-table-pagination__info { font-size: 12px; color: #777; }
    .amex-table-pagination__controls { display: flex; align-items: center; gap: 6px; }
    .amex-table-pagination__page { font-size: 13px; color: #333; padding: 0 6px; }
  `],
})
export class AmexReportTableComponent implements OnChanges {
  @Input() config: AmexReportTableConfig = { columns: [] };
  @Input() rows: Record<string, unknown>[] = [];
  @Output() export = new EventEmitter<'pdf' | 'excel' | 'csv'>();
  @Output() rowClick = new EventEmitter<Record<string, unknown>>();

  searchTerm = '';
  sortKey = '';
  sortAsc = true;
  currentPage = 1;
  filteredRows: Record<string, unknown>[] = [];

  ngOnChanges(): void {
    this.applyFilter();
  }

  get pageSize(): number {
    return this.config.pageSize || 10;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredRows.length / this.pageSize));
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredRows.length);
  }

  get pagedRows(): Record<string, unknown>[] {
    return this.filteredRows.slice(this.startIndex, this.endIndex);
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRows = term
      ? this.rows.filter(row =>
          Object.values(row).some(v => String(v).toLowerCase().includes(term))
        )
      : [...this.rows];

    if (this.sortKey) {
      this.filteredRows.sort((a, b) => {
        const av = String(a[this.sortKey] ?? '');
        const bv = String(b[this.sortKey] ?? '');
        return this.sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    this.currentPage = 1;
  }

  sort(key: string): void {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortKey = key;
      this.sortAsc = true;
    }
    this.applyFilter();
  }

  goToPage(page: number): void {
    this.currentPage = Math.max(1, Math.min(page, this.totalPages));
  }
}
