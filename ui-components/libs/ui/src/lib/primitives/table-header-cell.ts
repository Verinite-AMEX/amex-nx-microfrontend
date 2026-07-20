import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NgIf } from '@angular/common';

export type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'ui-table-header-cell',
  standalone: true,
  imports: [NgIf],
  template: `
    <th
      [id]="id"
      [attr.scope]="scope"
      [attr.colspan]="colspan || null"
      [attr.rowspan]="rowspan || null"
      [style.width]="width || null"
      [style.textAlign]="align"
      class="ui-th"
      [class.ui-th--sortable]="sortable"
      [attr.aria-sort]="sortable ? (sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none') : null"
      (click)="sortable && sortClick.emit()"
      (keydown.enter)="sortable && sortClick.emit()"
      [attr.tabindex]="sortable ? 0 : null"
    >
      <span class="ui-th__content">
        <ng-content></ng-content>
        <span *ngIf="sortable" class="ui-th__sort-icon" aria-hidden="true">
          {{ sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '⇅' }}
        </span>
      </span>
    </th>
  `,
  styles: [`
    .ui-th {
      padding: var(--table-header-padding, 8px 12px);
      font-weight: bold;
      text-align: left;
      background: var(--table-header-bg, transparent);
      border: var(--table-header-border, none);
    }
    .ui-th--sortable { cursor: pointer; user-select: none; }
    .ui-th__content { display: inline-flex; align-items: center; gap: 4px; }
    .ui-th__sort-icon { font-size: 10px; opacity: 0.6; }
    :host { display: contents; }
  `],
})
export class TableHeaderCellComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-table-header-cell-${++TableHeaderCellComponent._idCounter}`;
  @Input() scope: 'col' | 'row' = 'col';
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() colspan?: number;
  @Input() rowspan?: number;
  @Input() width = '';
  @Input() sortable = false;
  @Input() sortDirection: SortDirection = null;
  @Output() sortClick = new EventEmitter<void>();
}