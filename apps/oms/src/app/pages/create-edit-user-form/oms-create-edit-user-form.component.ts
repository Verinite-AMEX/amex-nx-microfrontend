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
  AmexMRMCreateEditUserFormComponent
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-create-edit-user-form',

  standalone: true,

  imports: [
    CommonModule,
    AmexMRMCreateEditUserFormComponent
  ],

  templateUrl:
    './oms-create-edit-user-form.component.html',

  styles: [`

    :host {

      width: 100%;
    }

  `]
})
export class OmsCreateEditUserFormComponent {

  @Input()
  title =
    'CREATE USER';

  @Input()
  showMerchantAccess = true;

  @Output()
  saveClicked =
    new EventEmitter<any>();

  onSave(
    event: any
  ) {

    console.log(
      'FULL FORM EVENT:',
      JSON.stringify(
        event,
        null,
        2
      )
    );

    // NAME
    if (
      !event.name?.trim()
    ) {

      alert(
        'Name is required'
      );

      return;
    }

    if (
      !/^[a-zA-Z\s]+$/.test(
        event.name
      )
    ) {

      alert(
        'Name should contain only letters'
      );

      return;
    }

    // EMAIL
    if (
      !event.email?.trim()
    ) {

      alert(
        'Email is required'
      );

      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        event.email
      )
    ) {

      alert(
        'Please enter a valid email address'
      );

      return;
    }

    // USERNAME
    if (
      !event.username?.trim()
    ) {

      alert(
        'Username is required'
      );

      return;
    }

    if (
      event.username.length < 3
    ) {

      alert(
        'Username must be at least 3 characters'
      );

      return;
    }

    // ROLE
    if (
      !event.role?.trim()
    ) {

      alert(
        'Role is required'
      );

      return;
    }

    // MERCHANT ACCESS
    if (
      this.showMerchantAccess &&
      (
        !event.merchantAccess ||
        event.merchantAccess.length === 0
      )
    ) {

      alert(
        'Please select at least one merchant access'
      );

      return;
    }

    console.log(
      'Validation Passed'
    );

    this.saveClicked.emit(
      event
    );
  }
}