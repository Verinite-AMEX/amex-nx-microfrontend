import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

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
  imports: [
    CommonModule, ButtonComponent, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="tra">

      <!-- Section title if provided -->
      <div class="tra__title" *ngIf="sectionTitle">{{ sectionTitle }}</div>

      <!-- Export/Print top bar (ONLS portal style - PDF icon | Print | Export | Back) -->
      <div class="tra__top-bar" *ngIf="showTopBar">
        <ui-button class="tra__top-link tra__pdf-icon" *ngIf="showPdf" label="&#9113;" variant="ghost" [size]="'sm'" (click)="topAction.emit('pdf')"></ui-button>
        <span class="tra__sep" *ngIf="showPdf && showPrint"> | </span>
        <ui-button class="tra__top-link" *ngIf="showPrint" label="&#128438;" variant="ghost" [size]="'sm'" (click)="topAction.emit('print')"></ui-button>
        <span class="tra__sep" *ngIf="showExport"> | </span>
        <ui-button class="tra__top-link" *ngIf="showExport" label="Export" variant="ghost" [size]="'sm'" (click)="topAction.emit('export')"></ui-button>
        <span class="tra__sep" *ngIf="showBack"> | </span>
        <ui-button class="tra__top-link" *ngIf="showBack" label="Back" variant="ghost" [size]="'sm'" (click)="topAction.emit('back')"></ui-button>
      </div>

      <!-- Table -->
      <div class="tra__scroll">
        <ui-table class="tra__table" [bordered]="true">
          <ui-table-head>
            <ui-table-row [header]="true" [hoverable]="false">
              <ui-table-header-cell *ngFor="let col of columns" [style.width]="col.width || 'auto'">
                {{ col.label }}
              </ui-table-header-cell>
              <ui-table-header-cell class="tra__th--actions" *ngIf="actions.length > 0">Actions</ui-table-header-cell>
            </ui-table-row>
          </ui-table-head>
          <ui-table-body>
            <!-- Data rows -->
            <ui-table-row *ngFor="let row of rows; let i = index"
                [hoverable]="true"
                [class.tra__row--alt]="i % 2 === 1"
                [class.tra__row--selected]="selectedIndex === i"
                (click)="onRowClick(row, i)">

              <ui-table-cell *ngFor="let col of columns" [class.tra__td--link]="col.isLink">
                <span *ngIf="col.isLink" class="tra__link" (click)="$event.stopPropagation(); cellClick.emit({col: col.key, row: row})">
                  {{ row[col.key] }}
                </span>
                <span *ngIf="!col.isLink">{{ row[col.key] }}</span>
              </ui-table-cell>

              <!-- Action buttons column -->
              <ui-table-cell class="tra__td--actions" *ngIf="actions.length > 0">
                <div class="tra__action-group">
                  <ui-button
                    *ngFor="let act of actions"
                    class="tra__btn"
                    [class.tra__btn--primary]="act.variant === 'primary'"
                    [class.tra__btn--danger]="act.variant === 'danger'"
                    [class.tra__btn--default]="!act.variant || act.variant === 'default'"
                    [label]="act.label"
                    [variant]="act.variant === 'danger' ? 'danger' : 'primary'"
                    [size]="'sm'"
                    (click)="$event.stopPropagation(); onAction(act.action, row, i)">
                  </ui-button>
                </div>
              </ui-table-cell>
            </ui-table-row>

            <!-- Empty state -->
            <ui-table-row *ngIf="rows.length === 0" [hoverable]="false">
              <ui-table-cell [colspan]="columns.length + (actions.length > 0 ? 1 : 0)" [align]="'center'" class="tra__empty">
                <strong>No Data Found</strong>
              </ui-table-cell>
            </ui-table-row>
          </ui-table-body>
        </ui-table>
      </div>

      <!-- Pagination (ONLS style: |&lt; &lt; &gt; &gt;|) -->
      <div class="tra__pagination" *ngIf="showPagination && totalPages > 1">
        <ui-button class="tra__page-btn" label="|&lt;" variant="secondary" [size]="'sm'" [disabled]="currentPage === 1" (click)="goFirst()"></ui-button>
        <ui-button class="tra__page-btn" label="&lt;" variant="secondary" [size]="'sm'" [disabled]="currentPage === 1" (click)="goPrev()"></ui-button>
        <span class="tra__page-info">Page {{ currentPage }} of {{ totalPages }}</span>
        <ui-button class="tra__page-btn" label="&gt;" variant="secondary" [size]="'sm'" [disabled]="currentPage === totalPages" (click)="goNext()"></ui-button>
        <ui-button class="tra__page-btn" label="&gt;|" variant="secondary" [size]="'sm'" [disabled]="currentPage === totalPages" (click)="goLast()"></ui-button>
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
    .tra__top-link { --btn-bg: transparent; --btn-color: #006fcf; --btn-font-weight: normal; padding: 0; }
    .tra__top-link:hover { text-decoration: underline; }
    .tra__pdf-icon { --btn-color: #cc0000; --btn-font-weight: bold; }
    .tra__sep { color: #666; padding: 0 4px; }

    /* Table scroll wrapper */
    .tra__scroll { overflow-x: auto; }

    .tra__th--actions { text-align: center; min-width: 160px; }

    /* Body rows */
    .tra__row--alt { background: #f9f9f9; }
    .tra__row--selected { background: #d6eaf8 !important; }

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
    .tra__btn { --btn-radius: 3px; --btn-border: 1px solid #005aa5; }
    .tra__btn--default, .tra__btn--primary {
      --btn-bg: linear-gradient(to bottom, #4d9de0, #006fcf);
      --btn-color: #fff;
      --btn-border-color: #005aa5;
    }
    .tra__btn--default:hover, .tra__btn--primary:hover {
      --btn-bg: linear-gradient(to bottom, #3a8fce, #005bb5);
    }
    .tra__btn--danger {
      --btn-bg: linear-gradient(to bottom, #e05555, #c00);
      --btn-color: #fff;
      --btn-border-color: #990000;
    }
    .tra__btn--danger:hover {
      --btn-bg: linear-gradient(to bottom, #cc3333, #a00);
    }

    /* Empty state */
    .tra__empty {
      color: #555; font-size: 13px;
      padding: 24px 0;
    }

    /* Pagination */
    .tra__pagination {
      display: flex; align-items: center; gap: 4px;
      padding: 8px 0; font-size: 12px;
    }
    .tra__page-btn { --btn-bg: #f5f5f5; --btn-color: #333; --btn-border: 1px solid #999; --btn-radius: 2px; }
    .tra__page-btn:hover { --btn-bg: #e0e0e0; }
    .tra__page-info { padding: 0 8px; color: #555; }
  `]
})
export class AmexTableWithRowActionsComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `table-with-row-actions-${++AmexTableWithRowActionsComponent._idCounter}`;

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