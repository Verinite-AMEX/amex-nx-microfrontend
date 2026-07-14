import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';
import { ButtonComponent } from '../../atoms/button';
import { InputComponent } from '../../atoms/input';
import { BadgeComponent } from '../../atoms/badge';

export interface AmexTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export type AmexSortDir = 'asc' | 'desc' | '';

@Component({
  selector: 'amex-sortable-filterable-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
    ButtonComponent, InputComponent, BadgeComponent,
  ],
  template: `
    <div class="sft">
      <div class="sft__toolbar" *ngIf="title || ctaLabel">
        <span class="sft__title" *ngIf="title">{{ title }}</span>
        <ui-button *ngIf="ctaLabel" class="sft__cta" [label]="ctaLabel" [size]="'sm'" (click)="ctaClick.emit()"></ui-button>
      </div>

      <ui-table class="sft__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell *ngFor="let col of columns"
              [style.width]="col.width || 'auto'"
              [sortable]="!!col.sortable"
              [sortDirection]="sortKey === col.key ? (sortDir || null) : null"
              (sortClick)="onSort(col.key)">
              {{ col.label }}
            </ui-table-header-cell>
            <ui-table-header-cell *ngIf="actions.length" class="sft__th--actions">Actions</ui-table-header-cell>
          </ui-table-row>

          <ui-table-row *ngIf="hasFilters" [header]="true" [hoverable]="false" class="sft__filter-row">
            <ui-table-cell *ngFor="let col of columns" class="sft__filter-cell">
              <ui-input *ngIf="col.filterable"
                class="sft__filter-input"
                [(ngModel)]="filters[col.key]"
                (ngModelChange)="applyFilters()"
                [ariaLabel]="'Filter ' + col.label">
              </ui-input>
            </ui-table-cell>
            <ui-table-cell *ngIf="actions.length" class="sft__filter-cell"></ui-table-cell>
          </ui-table-row>
        </ui-table-head>

        <ui-table-body>
          <ui-table-row *ngFor="let row of displayRows; let i = index"
            [hoverable]="true" [class.sft__row--alt]="i % 2 === 1">
            <ui-table-cell *ngFor="let col of columns">
              <ui-badge *ngIf="col.key === 'status' || col.key === 'Status'"
                [label]="row[col.key]" [variant]="statusVariant(row[col.key])" [size]="'sm'">
              </ui-badge>
              <ng-container *ngIf="col.key !== 'status' && col.key !== 'Status'">
                {{ row[col.key] }}
              </ng-container>
            </ui-table-cell>
            <ui-table-cell *ngIf="actions.length" class="sft__td--actions">
              <ui-button *ngFor="let act of actions"
                class="sft__action-btn"
                [ngClass]="'sft__action-btn--' + act.type"
                [label]="act.label"
                [size]="'sm'"
                [variant]="btnVariant(act.type)"
                (click)="actionClick.emit({ action: act.id, row: row })">
              </ui-button>
            </ui-table-cell>
          </ui-table-row>

          <ui-table-row *ngIf="!displayRows.length" [hoverable]="false">
            <ui-table-cell [colspan]="columns.length + (actions.length ? 1 : 0)" [align]="'center'" class="sft__empty">
              No Data Found
            </ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>

      <div class="sft__count" *ngIf="displayRows.length">
        Showing {{ displayRows.length }} of {{ rows.length }} entries
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .sft { background: #fff; border: 1px solid #dde3ea; }
    .sft__toolbar { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-bottom: 1px solid #e0e0e0; }
    .sft__title { font-size: 13px; font-weight: bold; color: #1e3a5f; }
    .sft__th--actions { text-align: center; }
    .sft__filter-row { background: #eaf4fb; }
    .sft__filter-cell { padding: 4px 8px; }
    .sft__filter-input { width: 100%; box-sizing: border-box; }
    .sft__row--alt { background: #f9fbfd; }
    .sft__td--actions { white-space: nowrap; text-align: center; }
    .sft__empty { font-size: 14px; font-weight: bold; color: #333; padding: 32px 0; }
    .sft__count { padding: 6px 12px; font-size: 12px; color: #888; border-top: 1px solid #e8eef4; text-align: right; }

    /* Distinct amber for warning/reset — was silently blue (same as primary) before */
    .sft__action-btn--warning ::ng-deep .btn,
    .sft__action-btn--reset ::ng-deep .btn {
      background: #f57f17 !important; border-color: #f57f17 !important; color: #fff !important;
    }
    .sft__action-btn--warning:hover ::ng-deep .btn,
    .sft__action-btn--reset:hover ::ng-deep .btn {
      background: #e17000 !important; border-color: #e17000 !important;
    }
  `],
})
export class AmexSortableFilterableTableComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `sortable-filterable-table-${++AmexSortableFilterableTableComponent._idCounter}`;

  @Input() title = '';
  @Input() ctaLabel = '';
  @Input() columns: AmexTableColumn[] = [];
  @Input() rows: Record<string, any>[] = [];
  @Input() actions: { id: string; label: string; type: string }[] = [];
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();
  @Output() ctaClick = new EventEmitter<void>();
  @Output() sortChange = new EventEmitter<{ key: string; dir: AmexSortDir }>();

  filters: Record<string, string> = {};
  sortKey = '';
  sortDir: AmexSortDir = '';
  displayRows: Record<string, any>[] = [];

  get hasFilters() { return this.columns.some(c => c.filterable); }

  ngOnChanges() { this.applyFilters(); }

  onSort(key: string) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : this.sortDir === 'desc' ? '' : 'asc';
    } else {
      this.sortKey = key; this.sortDir = 'asc';
    }
    this.sortChange.emit({ key: this.sortKey, dir: this.sortDir });
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.rows];
    for (const key of Object.keys(this.filters)) {
      const val = (this.filters[key] || '').toLowerCase();
      if (val) result = result.filter(r => String(r[key] ?? '').toLowerCase().includes(val));
    }
    if (this.sortKey && this.sortDir) {
      result.sort((a, b) => {
        const va = String(a[this.sortKey] ?? '');
        const vb = String(b[this.sortKey] ?? '');
        return this.sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }
    this.displayRows = result;
  }

  statusVariant(status: string): 'success' | 'error' | 'warning' | 'neutral' {
    const s = (status || '').toLowerCase();
    if (s === 'active') return 'success';
    if (s === 'inactive') return 'error';
    if (s === 'pending') return 'warning';
    return 'neutral';
  }

  btnVariant(type: string): 'primary' | 'secondary' | 'danger' {
    if (type === 'primary' || type === 'edit') return 'primary';
    if (type === 'danger' || type === 'delete') return 'danger';
    return 'secondary';
  }
}