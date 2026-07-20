import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-table-head',
  standalone: true,
  template: `<thead [id]="id" class="ui-table-head" [class.ui-table-head--sticky]="sticky"><ng-content></ng-content></thead>`,
  styles: [`
    .ui-table-head { background: var(--table-head-bg, #f5f5f5); }
    .ui-table-head--sticky { position: sticky; top: 0; z-index: 1; }
    :host { display: contents; }
  `],
})
export class TableHeadComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-table-head-${++TableHeadComponent._idCounter}`;
  @Input() sticky = false;
}