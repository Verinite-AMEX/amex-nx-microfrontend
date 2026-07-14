import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-table-foot',
  standalone: true,
  template: `<tfoot [id]="id"><ng-content></ng-content></tfoot>`,
  styles: [``],
})
export class TableFootComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-table-foot-${++TableFootComponent._idCounter}`;
}