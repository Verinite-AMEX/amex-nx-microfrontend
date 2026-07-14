import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-table-body',
  standalone: true,
  template: `<tbody [id]="id"><ng-content></ng-content></tbody>`,
  styles: [``],
})
export class TableBodyComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-table-body-${++TableBodyComponent._idCounter}`;
}