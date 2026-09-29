// table-head.ts
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-table-head',
  standalone: true,
  template: `<thead [id]="id"><ng-content></ng-content></thead>`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class TableHeadComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-table-head-${++TableHeadComponent._idCounter}`;
}