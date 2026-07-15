import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexStatusBadgeComponent } from './currency-logic/status-badge';
import { InputComponent } from '../../primitives/input';
import { ButtonComponent } from '../../primitives/button';
import { TableComponent } from '../../primitives/table';
import { TableHeadComponent } from '../../primitives/table-head';
import { TableBodyComponent } from '../../primitives/table-body';
import { TableRowComponent } from '../../primitives/table-row';
import { TableHeaderCellComponent, SortDirection } from '../../primitives/table-header-cell';
import { TableCellComponent } from '../../primitives/table-cell';

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

export type AmexReportTableButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type AmexReportTableButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'amex-report-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexStatusBadgeComponent,
    InputComponent,
    ButtonComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableRowComponent,
    TableHeaderCellComponent,
    TableCellComponent,
  ],
  template: `
    <div class="amex-table-wrap">
      <!-- Toolbar -->
      <div class="amex-table-toolbar" *ngIf="config.searchable || config.exportable">
        <ui-input
          *ngIf="config.searchable"
          class="amex-table-search"
          type="search"
          [id]="id + '-search'"
          [placeholder]="searchPlaceholder"
          [ariaLabel]="searchAriaLabel || searchPlaceholder"
          [style.--input-padding]="'6px 10px'"
          [(ngModel)]="searchTerm"
          (ngModelChange)="applyFilter()">
        </ui-input>
        <div class="amex-table-toolbar__actions" *ngIf="config.exportable">
          <ui-button
            *ngFor="let opt of exportFormats"
            [id]="id + '-export-' + opt.format"
            [label]="opt.label"
            [variant]="exportButtonVariant"
            [size]="exportButtonSize"
            [ariaLabel]="opt.ariaLabel || ('Export as ' + opt.label)"
            (click)="export.emit(opt.format)">
          </ui-button>
        </div>
      </div>

      <!-- Table -->
      <div class="amex-table-scroll">
        <ui-table [id]="id + '-table'" [bordered]="bordered" [striped]="striped" [compact]="compact" [ariaLabel]="tableAriaLabel">
          <ui-table-head>
            <ui-table-row [hoverable]="false">
              <ui-table-header-cell
                *ngFor="let col of config.columns"
                [width]="col.width || ''"
                [sortable]="!!col.sortable"
                [sortDirection]="sortKey === col.key ? (sortAsc ? 'asc' : 'desc') : null"
                (sortClick)="sort(col.key)">
                {{ col.label }}
              </ui-table-header-cell>
            </ui-table-row>
          </ui-table-head>
          <ui-table-body>
            <ui-table-row *ngFor="let row of pagedRows" [clickable]="rowClickable" (rowClick)="rowClick.emit(row)">
              <ui-table-cell *ngFor="let col of config.columns">
                <amex-status-badge
                  *ngIf="col.type === 'status'"
                  [status]="$any(row[col.key])">
                </amex-status-badge>
                <span *ngIf="col.type !== 'status'">{{ row[col.key] }}</span>
              </ui-table-cell>
            </ui-table-row>
            <ui-table-row *ngIf="pagedRows.length === 0" [hoverable]="false">
              <ui-table-cell [colspan]="config.columns.length" align="center">
                {{ emptyMessage }}
              </ui-table-cell>
            </ui-table-row>
          </ui-table-body>
        </ui-table>
      </div>

      <!-- Pagination -->
      <div class="amex-table-pagination" *ngIf="showPagination">
        <span class="amex-table-pagination__info">
          {{ paginationInfoText }}
        </span>
        <div class="amex-table-pagination__controls">
          <ui-button
            [id]="id + '-page-first'"
            [label]="firstPageLabel"
            [variant]="paginationButtonVariant"
            [size]="paginationButtonSize"
            ariaLabel="First page"
            [disabled]="currentPage === 1"
            (click)="goToPage(1)">
          </ui-button>
          <ui-button
            [id]="id + '-page-prev'"
            [label]="prevPageLabel"
            [variant]="paginationButtonVariant"
            [size]="paginationButtonSize"
            ariaLabel="Previous page"
            [disabled]="currentPage === 1"
            (click)="goToPage(currentPage - 1)">
          </ui-button>
          <span class="amex-table-pagination__page">{{ currentPage }} / {{ totalPages }}</span>
          <ui-button
            [id]="id + '-page-next'"
            [label]="nextPageLabel"
            [variant]="paginationButtonVariant"
            [size]="paginationButtonSize"
            ariaLabel="Next page"
            [disabled]="currentPage === totalPages"
            (click)="goToPage(currentPage + 1)">
          </ui-button>
          <ui-button
            [id]="id + '-page-last'"
            [label]="lastPageLabel"
            [variant]="paginationButtonVariant"
            [size]="paginationButtonSize"
            ariaLabel="Last page"
            [disabled]="currentPage === totalPages"
            (click)="goToPage(totalPages)">
          </ui-button>
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
    .amex-table-search { flex: 1; max-width: 280px; }
    .amex-table-toolbar__actions { display: flex; gap: 6px; }
    .amex-table-scroll { overflow-x: auto; }
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
  private static _idCounter = 0;

  /** Overridable so parent screens can supply a stable id for aria-* wiring; falls back to an auto-generated one. */
  @HostBinding('attr.id') @Input() id = `amex-report-table-${++AmexReportTableComponent._idCounter}`;

  @Input() config: AmexReportTableConfig = { columns: [] };
  @Input() rows: Record<string, unknown>[] = [];

  /** Fully configurable — nothing hardcoded. */
  @Input() searchPlaceholder = 'Search...';
  @Input() searchAriaLabel = '';
  @Input() emptyMessage = 'No records found';
  @Input() showPagination = true;
  @Input() rowClickable = false;
  @Input() tableAriaLabel = 'Report table';

  /** Passed straight through to ui-table — visual variants, not reinvented here. */
  @Input() bordered = false;
  @Input() striped = false;
  @Input() compact = false;

  @Input() exportFormats: Array<{ format: 'pdf' | 'excel' | 'csv'; label: string; ariaLabel?: string }> = [
    { format: 'pdf', label: 'PDF' },
    { format: 'excel', label: 'Excel' },
    { format: 'csv', label: 'CSV' },
  ];

  @Input() exportButtonVariant: AmexReportTableButtonVariant = 'ghost';
  @Input() exportButtonSize: AmexReportTableButtonSize = 'sm';
  @Input() paginationButtonVariant: AmexReportTableButtonVariant = 'ghost';
  @Input() paginationButtonSize: AmexReportTableButtonSize = 'sm';

  @Input() firstPageLabel = '«';
  @Input() prevPageLabel = '‹';
  @Input() nextPageLabel = '›';
  @Input() lastPageLabel = '»';

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

  get paginationInfoText(): string {
    return `Showing ${this.startIndex + 1}–${this.endIndex} of ${this.filteredRows.length} records`;
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