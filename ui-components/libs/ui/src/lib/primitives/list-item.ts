// atoms/list-item.ts
import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-list-item',
  standalone: true,
  template: `
    <li
      [id]="id"
      class="ui-list-item"
      [class.ui-list-item--clickable]="clickable"
      [attr.tabindex]="clickable ? 0 : null"
      (click)="clickable && itemClick.emit()"
      (keydown.enter)="clickable && itemClick.emit()"
    >
      <ng-content></ng-content>
    </li>
  `,
  styles: [`
    .ui-list-item {
      margin-bottom: var(--list-item-gap, 8px);
      line-height: var(--list-item-line-height, 1.6);
    }
    .ui-list-item:last-child { margin-bottom: 0; }
    .ui-list-item--clickable { cursor: pointer; }
    .ui-list-item--clickable:hover { background: var(--list-item-hover-bg, transparent); }
  `],
})
export class ListItemComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-list-item-${++ListItemComponent._idCounter}`;
  @Input() clickable = false;
  @Output() itemClick = new EventEmitter<void>();
}