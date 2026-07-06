import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexNewOutletApplicationFormComponent
} from '@vn-core-ui-components/ui';

import {
  OmsNewOutletService
} from '../../services/oms-new-outlet.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector:
    'oms-new-outlet-application-form',

  standalone: true,

  imports: [
    CommonModule,
    AmexNewOutletApplicationFormComponent
  ],

  templateUrl:
    './oms-new-outlet-application-form.component.html',

  styles: [`

    :host {

      width: 100%;

      display: block;
    }

  `]
})
export class OmsNewOutletApplicationFormComponent {

  // BUSINESS TYPES
  businessTypes = [

    'Retail',

    'Restaurant',

    'Supermarket',

    'Electronics',

    'Healthcare',

    'Travel',

    'Fashion'
  ];

  isSubmitting = false;

  @Output()
  backClicked = new EventEmitter<void>();

  constructor(

    // eslint-disable-next-line @angular-eslint/prefer-inject
    private outletService:
      OmsNewOutletService

  ) {}

  // SUBMIT
  onSubmit(
    event: any
  ) {

    console.log(
      'NEW OUTLET FORM:',
      event
    );

    // OUTLET NAME
    if (
      !event.outletName?.trim()
    ) {

      alert(
        'Outlet Name is required'
      );

      return;
    }

    // BUSINESS TYPE
    if (
      !event.businessType?.trim()
    ) {

      alert(
        'Business Type is required'
      );

      return;
    }

    // LOCATION
    if (
      !event.location?.trim()
    ) {

      alert(
        'Location is required'
      );

      return;
    }

    // CONTACT NAME
    if (
      !event.contactName?.trim()
    ) {

      alert(
        'Contact Name is required'
      );

      return;
    }

    if (
      !/^[a-zA-Z\s]+$/.test(
        event.contactName
      )
    ) {

      alert(
        'Contact Name should contain only letters'
      );

      return;
    }

    // EMAIL
    if (
      !event.contactEmail?.trim()
    ) {

      alert(
        'Contact Email is required'
      );

      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        event.contactEmail
      )
    ) {

      alert(
        'Please enter a valid email address'
      );

      return;
    }

    // PHONE
    if (
      !event.contactPhone?.trim()
    ) {

      alert(
        'Contact Phone is required'
      );

      return;
    }

    if (
      !/^\d{7,15}$/.test(
        event.contactPhone
      )
    ) {

      alert(
        'Contact Phone must contain 7 to 15 digits only'
      );

      return;
    }

    this.isSubmitting =
      true;

    setTimeout(() => {

      const newApplication = {

        id:
          Date.now(),

        ...event,

        status:
          'Submitted',

        createdDate:
          new Date()
            .toLocaleDateString()
      };

      console.log(
        'FINAL APPLICATION:',
        newApplication
      );

      this.outletService
        .addApplication(
          newApplication
        );

      this.isSubmitting =
        false;

      alert(
        'New Outlet Application Submitted Successfully'
      );

    }, 1500);
  }

  // BACK
  onBack() {

  console.log(
    'Back Clicked'
  );

  this.backClicked.emit();
}
}