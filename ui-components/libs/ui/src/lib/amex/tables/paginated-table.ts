import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';
import { ButtonComponent } from '../../atoms/button';
import { PaginationComponent } from '../../atoms/pagination';

export interface AmexPaginatedColumn {
  key: string;
  label: string;
  isLink?: boolean;    /* render as blue link */
  isStatus?: boolean;  /* render as colored status text */
}

@Component({
  selector: 'amex-paginated-table',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    TableHeadComponent,
    TableHeaderCellComponent,
    TableBodyComponent,
    TableRowComponent,
    TableCellComponent,
    ButtonComponent,
    PaginationComponent,
  ],
  template: `
    <div class="pt">
      <ui-table class="pt__table" [bordered]="false" [compact]="false">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell *ngFor="let col of columns">{{ col.label }}</ui-table-header-cell>
            <ui-table-header-cell *ngIf="actions.length">Actions</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>

        <ui-table-body>
          <ui-table-row *ngFor="let row of pageRows; let i = index"
            [hoverable]="true" [class.pt__row--alt]="i % 2 === 1">
            <ui-table-cell *ngFor="let col of columns">
              <span *ngIf="col.isLink" class="pt__link" (click)="cellClick.emit({key:col.key,row})">
                {{ row[col.key] }}
              </span>
              <span *ngIf="col.isStatus" class="pt__status" [ngClass]="statusClass(row[col.key])">
                {{ row[col.key] }}
              </span>
              <span *ngIf="!col.isLink && !col.isStatus">{{ row[col.key] }}</span>
            </ui-table-cell>
            <ui-table-cell *ngIf="actions.length" class="pt__td--actions">
              <ui-button *ngFor="let act of actions"
                [label]="act.label"
                [size]="'sm'"
                [variant]="act.type === 'primary' ? 'primary' : act.type === 'danger' ? 'danger' : 'secondary'"
                (click)="actionClick.emit({action:act.id,row})">
              </ui-button>
            </ui-table-cell>
          </ui-table-row>

          <ui-table-row *ngIf="!pageRows.length" [hoverable]="false">
            <ui-table-cell [colspan]="columns.length + (actions.length ? 1 : 0)" [align]="'center'" class="pt__empty">
              No Data Found
            </ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>

      <ui-pagination
        class="pt__pager"
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
    .pt { background: #fff; }
    .pt__row--alt { background: #fafbfc; }
    .pt__td--actions { white-space: nowrap; }
    .pt__link { color: #1a3a6b; cursor: pointer; font-weight: normal; }
    .pt__link:hover { text-decoration: underline; }
    .pt__status--error     { color: #c62828; font-weight: bold; }
    .pt__status--pending   { color: #f57f17; }
    .pt__status--completed { color: #2e7d32; }
    .pt__status--processing{ color: #1565c0; }
    .pt__status--failed    { color: #c62828; font-weight: bold; }
    .pt__empty { font-size: 14px; font-weight: bold; color: #333; padding: 32px 0; }
    .pt__pager { display: flex; justify-content: flex-end; padding: 8px 14px; border-top: 1px solid #dde3ea; }
  `],
})
export class AmexPaginatedTableComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `paginated-table-${++AmexPaginatedTableComponent._idCounter}`;

  @Input() columns: AmexPaginatedColumn[] = [];
  @Input() rows: Record<string, any>[] = [];
  @Input() actions: { id: string; label: string; type: string }[] = [];
  @Input() initialPageSize = 5;
  @Input() pageSize = 5;
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();
  @Output() cellClick = new EventEmitter<{ key: string; row: any }>();

  page = 1;
  pageSizeOptions = [5, 10, 20, 50];

  get totalPages() { return Math.max(1, Math.ceil(this.rows.length / this.pageSize)); }
  get pageRows() {
    const start = (this.page - 1) * this.pageSize;
    return this.rows.slice(start, start + this.pageSize);
  }
  get rangeLabel() {
    if (!this.rows.length) return '0 of 0';
    const start = (this.page - 1) * this.pageSize + 1;
    const end = Math.min(this.page * this.pageSize, this.rows.length);
    return `${start} – ${end} of ${this.rows.length}`;
  }

  ngOnChanges() { this.pageSize = this.initialPageSize; this.page = 1; }

  goFirst() { this.page = 1; }
  goPrev()  { if (this.page > 1) this.page--; }
  goNext()  { if (this.page < this.totalPages) this.page++; }
  goLast()  { this.page = this.totalPages; }
  onPageNav(p: number) { this.page = p; }
  onPageSizeChange(size: number) { this.pageSize = size; this.page = 1; }

  statusClass(val: string) {
    const v = (val || '').toLowerCase();
    if (v.includes('error') || v.includes('no response') || v.includes('fail') || v.includes('contact admin')) return 'pt__status--error';
    if (v.includes('pending')) return 'pt__status--pending';
    if (v.includes('complet')) return 'pt__status--completed';
    if (v.includes('process')) return 'pt__status--processing';
    return '';
  }
}