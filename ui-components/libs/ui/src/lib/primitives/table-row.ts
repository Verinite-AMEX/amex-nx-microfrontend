import { Component, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'ui-table-row',
  standalone: true,
  template: `
    <tr
      [id]="id"
      class="ui-table-row"
      [class.ui-table-row--header]="header"
      [class.ui-table-row--selected]="!header && selected"
      [class.ui-table-row--hoverable]="!header && hoverable"
      [class.ui-table-row--clickable]="!header && clickable"
      [attr.aria-selected]="!header && selected ? 'true' : null"
      [attr.tabindex]="!header && clickable ? 0 : null"
      (click)="!header && clickable && rowClick.emit()"
      (keydown.enter)="!header && clickable && rowClick.emit()"
    >
      <ng-content></ng-content>
    </tr>
  `,
  styles: [`
    .ui-table-row {
      border-bottom: var(--table-row-border-bottom, none);
    }
    .ui-table-row--hoverable:hover { background: var(--table-row-hover-bg, #f5f9ff); }
    .ui-table-row--selected { background: var(--table-row-selected-bg, #e3f2fd); }
    .ui-table-row--clickable { cursor: pointer; }
    :host { display: contents; }
  `],
})
export class TableRowComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-table-row-${++TableRowComponent._idCounter}`;
  @Input() header = false;
  @Input() selected = false;
  @Input() hoverable = true;
  @Input() clickable = false;
  @Output() rowClick = new EventEmitter<void>();
}