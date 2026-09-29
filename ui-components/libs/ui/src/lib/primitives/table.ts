// table.ts
import { Component, Input, HostBinding } from '@angular/core';
import { NgIf } from '@angular/common';

/** Mirrors DLS's own datatable.js defaultSort — numeric-aware, ascending/descending. */
export function dlsDefaultSort(
  a: string,
  b: string,
  order: 'ascending' | 'descending'
): number {
  const sortAfter = order === 'descending' ? -1 : 1;
  const sortBefore = order === 'descending' ? 1 : -1;
  const toNum = (n: string) => Number(n.replace(/(,)|^([^a-zA-Z0-9.])/g, ''));
  const itemA = !Number.isNaN(toNum(a)) ? toNum(a) : a;
  const itemB = !Number.isNaN(toNum(b)) ? toNum(b) : b;
  if (itemA > itemB) return sortAfter;
  if (itemA < itemB) return sortBefore;
  return 0;
}

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [NgIf],
  template: `
    <table
      [id]="id"
      class="table"
      [class.table-hover]="hoverable"
      [class.table-striped]="striped"
      [class.table-bordered]="bordered"
      [class.table-sm]="compact"
      [class.table-row-link]="hasClickableRows"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledBy || null"
      [attr.aria-describedby]="statusId"
    >
      <caption *ngIf="caption">{{ caption }}</caption>
      <ng-content></ng-content>
    </table>
    <div class="sr-only" [id]="statusId" role="status">{{ statusText }}</div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-table-${++TableComponent._idCounter}`;
  @Input() caption = '';
  @Input() bordered = false;
  @Input() striped = false;
  @Input() compact = false;
  /** Maps to DLS's `.table-hover` modifier. */
  @Input() hoverable = false;
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';

  readonly statusId = `${this.id}-status`;
  statusText = '';

  /** True once any ui-table-row registers as clickable — DLS applies `.table-row-link` at the <table> level, not per-row. */
  hasClickableRows = false;
  /** True once any ui-table-row registers as expandable — tells sibling rows to render the leading spacer cell so columns stay aligned. */
  hasExpandableRows = false;

  registerClickableRow(): void {
    this.hasClickableRows = true;
  }

  registerExpandableRow(): void {
    this.hasExpandableRows = true;
  }

  /** Mirrors the screen-reader announcement DLS's own datatable.js writes into its status region after a sort. Call this from the consumer after you sort your data. */
  announceSort(
    columnLabel: string,
    direction: 'ascending' | 'descending'
  ): void {
    this.statusText = `Sorted by ${columnLabel}: ${direction}`;
  }
}