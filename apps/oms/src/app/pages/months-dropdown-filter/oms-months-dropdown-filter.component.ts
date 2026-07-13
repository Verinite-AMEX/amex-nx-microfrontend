import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexMonthsDropdownFilterComponent
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector:'oms-months-dropdown-filter',

  standalone: true,

  imports: [
    CommonModule,
    AmexMonthsDropdownFilterComponent
  ],

  templateUrl:
    './oms-months-dropdown-filter.component.html',

  styles: [`

    :host {

      width: 100%;
    }

  `]
})
export class OmsMonthsDropdownFilterComponent {

  @Input()
  label =
    'Select number of months';

  @Input()
  buttonLabel =
    'Submit';

  @Input()
  hint =
    'Select the number of months for which transaction data should be displayed.';

  @Input()
  monthOptions = [
    1,
    2,
    3,
    6,
    12
  ];

  @Output()
  submitClicked =
    new EventEmitter<number>();

  selectedMonths = 1;

  onMonthsSelected(
    months: number
  ) {

    console.log(
      'Dropdown Changed:',
      months
    );

    this.selectedMonths =
      Number(months);

    this.submitClicked.emit(
      this.selectedMonths
    );
  }
}