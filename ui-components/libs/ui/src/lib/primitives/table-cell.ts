import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-table-cell',
  standalone: true,
  template: `
    <td
      [id]="id"
      [attr.colspan]="colspan || null"
      [attr.rowspan]="rowspan || null"
      [style.textAlign]="align"
      [style.width]="width || null"
      [style.verticalAlign]="verticalAlign"
      class="ui-td"
      [class.ui-td--truncate]="truncate"
    >
      <ng-content></ng-content>
    </td>
  `,
  styles: [`
       .ui-td {
        padding: var(--table-cell-padding, 8px 12px);
        font-weight: var(--table-cell-font-weight, normal);
        color: var(--table-cell-color, inherit);
        background: var(--table-cell-bg, transparent);
        border: var(--table-cell-border, none);
      }
    .ui-td--truncate { max-width: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  `],
})
export class TableCellComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-table-cell-${++TableCellComponent._idCounter}`;
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() verticalAlign: 'top' | 'middle' | 'bottom' | 'baseline' = 'middle';
  @Input() colspan?: number;
  @Input() rowspan?: number;
  @Input() truncate = false;
  /** Fixed cell width, e.g. '150px'. Structural, so it's a direct @Input, not a CSS var. */
  @Input() width = '';
}