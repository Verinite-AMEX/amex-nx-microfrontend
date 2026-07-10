import {
  Component,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexSettlementSubmissionsTableComponent
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector:'oms-settlement-submissions-table',

  standalone: true,

  imports: [
    CommonModule,
    AmexSettlementSubmissionsTableComponent
  ],

  templateUrl:
    './oms-settlement-submissions-table.component.html',

  styles: [`

    :host {

      width: 100%;
    }

    .loading {

      padding: 24px;

      text-align: center;

      font-size: 18px;

      color: #6a1b9a;
    }

  `]
})
export class OmsSettlementSubmissionsTableComponent {

  @Input()
  rows: any[] = [];

  @Input()
  loading = false;
}