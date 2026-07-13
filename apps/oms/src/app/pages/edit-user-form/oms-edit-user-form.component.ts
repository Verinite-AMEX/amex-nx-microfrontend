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
  AmexEditUserFormComponent
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-edit-user-form',

  standalone: true,

  imports: [
    CommonModule,
    AmexEditUserFormComponent
  ],

  templateUrl:
    './oms-edit-user-form.component.html'
})
export class OmsEditUserFormComponent {

  @Input()
  title =
    'EDIT USER';

  @Input()
  showRole = false;

  @Input()
  data: any = {};

  @Output()
  updateUserClicked =
    new EventEmitter<any>();

  onUpdate(
    event: any
  ) {

    console.log(
      'UPDATE EVENT:',
      event
    );

    this.updateUserClicked.emit(
      event
    );
  }
}