import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type RowActionType = 'modify' | 'delete' | 'print' | 'view' | 'reset-password' | 'edit' | 'comment';

export interface TableRowAction {
  label: string;
  action: RowActionType | string;
  variant?: 'primary' | 'danger' | 'default';
}

export interface TableWithRowActionsColumn {
  key: string;
  label: string;
  isLink?: boolean;
  width?: string;
}

export interface TableRowActionEvent {
  action: string;
  row: Record<string, string>;
  index: number;
}

@Component({
  selector: 'amex-table-with-row-actions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tra">

      <!-- Section title if provided -->
      <div class="tra__title" *ngIf="sectionTitle">{{ sectionTitle }}</div>

      <!-- Export/Print top bar (ONLS portal style - PDF icon | Print | Export | Back) -->
      <div class="tra__top-bar" *ngIf="showTopBar">
        <span class="tra__top-link" *ngIf="showPdf" (click)="topAction.emit('pdf')">
          <span class="tra__pdf-icon">&#9113;</span>
        </span>
        <span class="tra__sep" *ngIf="showPdf && showPrint"> | </span>
        <span class="tra__top-link" *ngIf="showPrint" (click)="topAction.emit('print')">&#128438;</span>
        <span class="tra__sep" *ngIf="showExport"> | </span>
        <span class="tra__top-link" *ngIf="showExport" (click)="topAction.emit('export')">Export</span>
        <span class="tra__sep" *ngIf="showBack"> | </span>
        <span class="tra__top-link" *ngIf="showBack" (click)="topAction.emit('back')">Back</span>
      </div>

      <!-- Table -->
      <div class="tra__scroll">
        <table class="tra__table">
          <thead>
            <tr class="tra__head-row">
              <th *ngFor="let col of columns" class="tra__th" [style.width]="col.width || 'auto'">
                {{ col.label }}
              </th>
              <th class="tra__th tra__th--actions" *ngIf="actions.length > 0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Data rows -->
            <tr *ngFor="let row of rows; let i = index"
                class="tra__row"
                [class.tra__row--alt]="i % 2 === 1"
                [class.tra__row--selected]="selectedIndex === i"
                (click)="onRowClick(row, i)">

              <td *ngFor="let col of columns"
                  class="tra__td"
                  [class.tra__td--link]="col.isLink">
                <span *ngIf="col.isLink" class="tra__link" (click)="$event.stopPropagation(); cellClick.emit({col: col.key, row: row})">
                  {{ row[col.key] }}
                </span>
                <span *ngIf="!col.isLink">{{ row[col.key] }}</span>
              </td>

              <!-- Action buttons column -->
              <td class="tra__td tra__td--actions" *ngIf="actions.length > 0">
                <div class="tra__action-group">
                  <button
                    *ngFor="let act of actions"
                    class="tra__btn"
                    [class.tra__btn--primary]="act.variant === 'primary'"
                    [class.tra__btn--danger]="act.variant === 'danger'"
                    [class.tra__btn--default]="!act.variant || act.variant === 'default'"
                    (click)="$event.stopPropagation(); onAction(act.action, row, i)">
                    {{ act.label }}
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty state -->
            <tr *ngIf="rows.length === 0">
              <td [attr.colspan]="columns.length + (actions.length > 0 ? 1 : 0)" class="tra__empty">
                <strong>No Data Found</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination (ONLS style: |&lt; &lt; &gt; &gt;|) -->
      <div class="tra__pagination" *ngIf="showPagination && totalPages > 1">
        <button class="tra__page-btn" [disabled]="currentPage === 1" (click)="goFirst()">|&lt;</button>
        <button class="tra__page-btn" [disabled]="currentPage === 1" (click)="goPrev()">&lt;</button>
        <span class="tra__page-info">Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="tra__page-btn" [disabled]="currentPage === totalPages" (click)="goNext()">&gt;</button>
        <button class="tra__page-btn" [disabled]="currentPage === totalPages" (click)="goLast()">&gt;|</button>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }

    .tra__title {
      font-size: 13px; font-weight: bold; color: #333;
      border-bottom: 1px solid #ccc;
      padding-bottom: 6px; margin-bottom: 8px;
    }

    /* Top bar — PDF | Print | Export | Back links */
    .tra__top-bar {
      display: flex; align-items: center; gap: 2px;
      padding: 4px 0 10px; font-size: 12px;
    }
    .tra__top-link {
      color: #006fcf; cursor: pointer; font-size: 12px;
    }
    .tra__top-link:hover { text-decoration: underline; }
    .tra__pdf-icon { color: #cc0000; font-weight: bold; }
    .tra__sep { color: #666; padding: 0 4px; }

    /* Table scroll wrapper */
    .tra__scroll { overflow-x: auto; }

    /* Table */
    .tra__table {
      width: 100%; border-collapse: collapse;
      border: 1px solid #ccc;
      font-size: 12px;
    }

    /* Header row — ONLS style: white bg, bold, bordered */
    .tra__head-row { background: #fff; }
    .tra__th {
      border: 1px solid #aaa;
      padding: 5px 8px;
      text-align: left;
      font-weight: bold;
      color: #333;
      white-space: nowrap;
      background: #f0f0f0;
    }
    .tra__th--actions { text-align: center; min-width: 160px; }

    /* Body rows */
    .tra__row { cursor: default; }
    .tra__row--alt { background: #f9f9f9; }
    .tra__row--selected { background: #d6eaf8 !important; }
    .tra__row:hover { background: #eaf3fb; }

    .tra__td {
      border: 1px solid #ccc;
      padding: 4px 8px;
      vertical-align: middle;
      color: #333;
    }
    .tra__td--link .tra__link {
      color: #006fcf; cursor: pointer; text-decoration: none;
    }
    .tra__td--link .tra__link:hover { text-decoration: underline; }
    .tra__td--actions { text-align: center; white-space: nowrap; }

    /* Action buttons — gradient blue (ONLS style) */
    .tra__action-group {
      display: flex; flex-wrap: wrap; gap: 4px;
      justify-content: center;
    }
    .tra__btn {
      padding: 3px 10px;
      font-size: 11px;
      border-radius: 3px;
      cursor: pointer;
      border: 1px solid #005aa5;
      white-space: nowrap;
    }
    .tra__btn--default, .tra__btn--primary {
      background: linear-gradient(to bottom, #4d9de0, #006fcf);
      color: #fff;
      border-color: #005aa5;
    }
    .tra__btn--default:hover, .tra__btn--primary:hover {
      background: linear-gradient(to bottom, #3a8fce, #005bb5);
    }
    .tra__btn--danger {
      background: linear-gradient(to bottom, #e05555, #c00);
      color: #fff;
      border-color: #990000;
    }
    .tra__btn--danger:hover {
      background: linear-gradient(to bottom, #cc3333, #a00);
    }

    /* Empty state */
    .tra__empty {
      text-align: center; padding: 24px;
      color: #555; font-size: 13px;
      border: 1px solid #ccc;
    }

    /* Pagination */
    .tra__pagination {
      display: flex; align-items: center; gap: 4px;
      padding: 8px 0; font-size: 12px;
    }
    .tra__page-btn {
      padding: 2px 8px; font-size: 11px;
      border: 1px solid #999; background: #f5f5f5;
      cursor: pointer; border-radius: 2px;
    }
    .tra__page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .tra__page-btn:hover:not(:disabled) { background: #e0e0e0; }
    .tra__page-info { padding: 0 8px; color: #555; }
  `]
})
export class AmexTableWithRowActionsComponent {
  @Input() sectionTitle = '';
  @Input() columns: TableWithRowActionsColumn[] = [];
  @Input() rows: Record<string, string>[] = [];
  @Input() actions: TableRowAction[] = [];

  // Top bar toggles
  @Input() showTopBar = false;
  @Input() showPdf = false;
  @Input() showPrint = false;
  @Input() showExport = false;
  @Input() showBack = false;

  // Pagination
  @Input() showPagination = false;
  @Input() currentPage = 1;
  @Input() totalPages = 1;

  @Output() actionClick = new EventEmitter<TableRowActionEvent>();
  @Output() rowClick = new EventEmitter<{ row: Record<string, string>; index: number }>();
  @Output() cellClick = new EventEmitter<{ col: string; row: Record<string, string> }>();
  @Output() topAction = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();

  selectedIndex = -1;

  onRowClick(row: Record<string, string>, index: number) {
    this.selectedIndex = index;
    this.rowClick.emit({ row, index });
  }

  onAction(action: string, row: Record<string, string>, index: number) {
    this.actionClick.emit({ action, row, index });
  }

  goFirst() { this.pageChange.emit(1); }
  goPrev() { if (this.currentPage > 1) this.pageChange.emit(this.currentPage - 1); }
  goNext() { if (this.currentPage < this.totalPages) this.pageChange.emit(this.currentPage + 1); }
  goLast() { this.pageChange.emit(this.totalPages); }
}
