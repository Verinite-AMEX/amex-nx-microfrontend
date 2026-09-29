// table-header-cell.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { NgIf } from '@angular/common';

export type SortDirection = 'ascending' | 'descending' | null;

@Component({
  selector: 'ui-table-header-cell',
  standalone: true,
  imports: [NgIf],
  template: `
    <th
      *ngIf="!expandColumn"
      [id]="id"
      [attr.scope]="scope"
      [attr.colspan]="colspan || null"
      [attr.rowspan]="rowspan || null"
      [class.text-align-right]="align === 'right'"
      [class.text-align-center]="align === 'center'"
      [class.th-sort]="sortable"
      [class.active]="sortable && sortDirection !== null"
      [attr.aria-sort]="sortable ? sortDirection || 'none' : null"
      [attr.data-custom-sort]="customSortKey || null"
    >
      <button
        *ngIf="sortable"
        type="button"
        class="th-sort-button"
        [class.active]="sortDirection !== null"
        [class.text-align-right]="align === 'right'"
        (click)="sortClick.emit()"
      >
        <ng-content></ng-content>
        <span class="glyph glyph-sm th-sort-icon" aria-label="sort">
          <i data-dls-glyph="sort-down" title="Sort icon"></i>
        </span>
      </button>
      <ng-content *ngIf="!sortable"></ng-content>
    </th>
    <th *ngIf="expandColumn" class="expand" [id]="id"></th>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class TableHeaderCellComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-table-header-cell-${++TableHeaderCellComponent._idCounter}`;
  @Input() scope: 'col' | 'row' = 'col';
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() colspan?: number;
  @Input() rowspan?: number;
  @Input() sortable = false;
  @Input() sortDirection: SortDirection = null;
  /** Key the consumer's custom-sort config would look up — kept for markup parity with DLS's `data-custom-sort`. */
  @Input() customSortKey = '';
  /** Renders DLS's empty `<th class="expand">` spacer above the expand-toggle column. */
  @Input() expandColumn = false;
  @Output() sortClick = new EventEmitter<void>();
}