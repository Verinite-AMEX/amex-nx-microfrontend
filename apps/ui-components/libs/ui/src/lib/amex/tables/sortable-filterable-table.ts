import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sft">
      <!-- row count + optional CTA above table -->
      <div class="sft__toolbar" *ngIf="title || ctaLabel">
        <span class="sft__title" *ngIf="title">{{ title }}</span>
        <button class="sft__cta" *ngIf="ctaLabel" (click)="ctaClick.emit()">{{ ctaLabel }}</button>
      </div>

      <table class="sft__table">
        <!-- header row with sort arrows -->
        <thead>
          <tr class="sft__head-row">
            <th *ngFor="let col of columns" class="sft__th"
              [style.width]="col.width || 'auto'"
              (click)="col.sortable && onSort(col.key)">
              <span class="sft__th-label">{{ col.label }}</span>
              <span *ngIf="col.sortable" class="sft__sort-icon">
                <span [class.sft__sort-icon--active]="sortKey===col.key && sortDir==='asc'">▲</span>
                <span [class.sft__sort-icon--active]="sortKey===col.key && sortDir==='desc'">▼</span>
              </span>
            </th>
            <th *ngIf="actions.length" class="sft__th sft__th--actions">Actions</th>
          </tr>
          <!-- per-column filter row -->
          <tr class="sft__filter-row" *ngIf="hasFilters">
            <td *ngFor="let col of columns" class="sft__filter-cell">
              <input *ngIf="col.filterable"
                class="sft__filter-input"
                [(ngModel)]="filters[col.key]"
                (ngModelChange)="applyFilters()"
                placeholder="" />
            </td>
            <td *ngIf="actions.length" class="sft__filter-cell"></td>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let row of displayRows; let i = index"
            class="sft__row"
            [class.sft__row--alt]="i % 2 === 1">
            <td *ngFor="let col of columns" class="sft__td">
              <!-- status badge -->
              <ng-container *ngIf="col.key === 'status' || col.key === 'Status'">
                <span class="sft__status"
                  [ngClass]="'sft__status--' + (row[col.key] || '').toLowerCase()">
                  {{ row[col.key] }}
                </span>
              </ng-container>
              <!-- normal cell -->
              <ng-container *ngIf="col.key !== 'status' && col.key !== 'Status'">
                {{ row[col.key] }}
              </ng-container>
            </td>
            <!-- action buttons -->
            <td *ngIf="actions.length" class="sft__td sft__td--actions">
              <button *ngFor="let act of actions"
                class="sft__action-btn"
                [ngClass]="'sft__action-btn--' + act.type"
                (click)="actionClick.emit({ action: act.id, row: row })">
                {{ act.label }}
              </button>
            </td>
          </tr>

          <!-- empty state -->
          <tr *ngIf="!displayRows.length">
            <td [colSpan]="columns.length + (actions.length ? 1 : 0)" class="sft__empty">
              No Data Found
            </td>
          </tr>
        </tbody>
      </table>

      <!-- row count label -->
      <div class="sft__count" *ngIf="displayRows.length">
        Showing {{ displayRows.length }} of {{ rows.length }} entries
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .sft { background: #fff; border: 1px solid #dde3ea; }

    .sft__toolbar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 14px; border-bottom: 1px solid #e0e0e0;
    }
    .sft__title { font-size: 13px; font-weight: bold; color: #1e3a5f; }
    .sft__cta {
      background: #1e3a5f; color: #fff; border: none;
      padding: 6px 16px; font-size: 13px; font-weight: bold;
      cursor: pointer; border-radius: 3px; font-family: Arial, sans-serif;
    }
    .sft__cta:hover { background: #16304f; }

    .sft__table { width: 100%; border-collapse: collapse; font-size: 13px; }

    /* Header — light blue background matching OMS MRM screenshot */
    .sft__head-row { background: #d6eaf8; }
    .sft__th {
      padding: 8px 12px; text-align: center; color: #1a3a6b;
      font-size: 12px; font-weight: bold;
      border: 1px solid #b8d4ea; cursor: default; white-space: nowrap;
    }
    .sft__th[style*='cursor']:hover { background: #c8dff3; }
    .sft__th--actions { text-align: center; }

    .sft__th-label { display: inline; }
    .sft__sort-icon {
      margin-left: 4px; font-size: 9px; color: #888;
      display: inline-flex; flex-direction: column;
      line-height: 1; vertical-align: middle; gap: 0;
    }
    .sft__sort-icon span { line-height: 1; }
    .sft__sort-icon--active { color: #1a3a6b !important; }

    /* Filter row — also light blue */
    .sft__filter-row { background: #eaf4fb; }
    .sft__filter-cell { padding: 4px 8px; border: 1px solid #b8d4ea; }
    .sft__filter-input {
      width: 100%; box-sizing: border-box;
      border: 1px solid #aac8e0; padding: 3px 6px; font-size: 12px;
      font-family: Arial, sans-serif; color: #333;
      outline: none;
    }
    .sft__filter-input:focus { border-color: #006fcf; }

    /* Data rows */
    .sft__row { background: #fff; }
    .sft__row--alt { background: #f9fbfd; }
    .sft__row:hover { background: #f0f7ff; }
    .sft__td {
      padding: 8px 12px; border: 1px solid #e8eef4;
      font-size: 13px; color: #333; text-align: center;
    }
    .sft__td--actions { white-space: nowrap; text-align: center; }

    /* Status badges */
    .sft__status {
      display: inline-block; padding: 2px 8px; border-radius: 10px;
      font-size: 11px; font-weight: bold;
    }
    .sft__status--active   { background: #e8f5e9; color: #2e7d32; }
    .sft__status--inactive { background: #fce4ec; color: #c62828; }
    .sft__status--pending  { background: #fff8e1; color: #f57f17; }
    .sft__status--inactive { color: #c62828; }

    /* Action buttons — matching OMS screenshot exactly */
    .sft__action-btn {
      border: none; padding: 4px 12px; font-size: 12px;
      cursor: pointer; border-radius: 3px; margin: 2px;
      font-family: Arial, sans-serif;
    }
    .sft__action-btn--primary,
    .sft__action-btn--edit    { background: #1976d2; color: #fff; }
    .sft__action-btn--edit:hover { background: #1565c0; }
    .sft__action-btn--danger,
    .sft__action-btn--delete  { background: #e53935; color: #fff; }
    .sft__action-btn--delete:hover { background: #c62828; }
    .sft__action-btn--warning,
    .sft__action-btn--reset   { background: #1976d2; color: #fff; }
    .sft__action-btn--reset:hover { background: #1565c0; }
    .sft__action-btn--default,
    .sft__action-btn--view    { background: #546e7a; color: #fff; }

    .sft__empty {
      text-align: center; padding: 32px; font-size: 14px;
      font-weight: bold; color: #333; border: 1px solid #e8eef4;
    }

    .sft__count {
      padding: 6px 12px; font-size: 12px; color: #888;
      border-top: 1px solid #e8eef4; text-align: right;
    }
  `],
})
export class AmexSortableFilterableTableComponent implements OnChanges {
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
}
