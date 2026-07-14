import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexMerchantDataFormComponent
} from '@ui-components/ui';

import {
  OmsMerchantDataService
} from '../../services/oms-merchant-data.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-merchant-data-form',

  standalone: true,

  imports: [
    CommonModule,
    AmexMerchantDataFormComponent
  ],

  templateUrl:
    './oms-merchant-data-form.component.html',
})
export class OmsMerchantDataFormComponent {

  title =
    'MERCHANT DETAILS';

  backLabel =
    'Back';

  submitLabel =
    'Submit';

  countryOptions = [
    'UAE',
    'India',
    'USA',
    'UK'
  ];

  cityOptions = [
    'Dubai',
    'Abu Dhabi',
    'Mumbai',
    'London'
  ];

  legalOptions = [
    'LLC',
    'Corporation',
    'Partnership',
    'Sole Proprietorship'
  ];

  initialData = {};

  isSubmitting = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private merchantDataService:
      OmsMerchantDataService
  ) {}

  onSubmit(
    event: any
  ) {

    console.log(
      'Merchant Form Submitted:',
      event
    );

    if (
      !event.merchantName?.trim()
    ) {

      alert(
        'Merchant Name is required'
      );

      return;
    }

    if (
      !event.merchantNumber?.trim()
    ) {

      alert(
        'Merchant Number is required'
      );

      return;
    }

    if (
      !/^\d+$/.test(
        event.merchantNumber
      )
    ) {

      alert(
        'Merchant Number must contain only digits'
      );

      return;
    }

    if (
      !event.lastFiveIban?.trim()
    ) {

      alert(
        'Last 5 IBAN digits are required'
      );

      return;
    }

    if (
      !/^\d{5}$/.test(
        event.lastFiveIban
      )
    ) {

      alert(
        'Please enter exactly 5 numeric IBAN digits'
      );

      return;
    }

    if (
      !event.tradeLicense?.trim()
    ) {

      alert(
        'Trade License Number is required'
      );

      return;
    }

    if (
      !event.country
    ) {

      alert(
        'Country is required'
      );

      return;
    }

    if (
      !event.city
    ) {

      alert(
        'City is required'
      );

      return;
    }

    if (
      !event.legalStructure
    ) {

      alert(
        'Business Legal Structure is required'
      );

      return;
    }

    if (
      !event.repName?.trim()
    ) {

      alert(
        'Representative Name is required'
      );

      return;
    }

    if (
      !/^[a-zA-Z\s]+$/.test(
        event.repName
      )
    ) {

      alert(
        'Representative Name should contain only letters'
      );

      return;
    }

    if (
      !event.repEmail?.trim()
    ) {

      alert(
        'Email is required'
      );

      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        event.repEmail
      )
    ) {

      alert(
        'Please enter a valid email address'
      );

      return;
    }

    if (
      !event.repPhone?.trim()
    ) {

      alert(
        'Phone Number is required'
      );

      return;
    }

    if (
      !/^\d{7,15}$/.test(
        event.repPhone
      )
    ) {

      alert(
        'Phone Number must contain 7 to 15 digits only'
      );

      return;
    }

    if (
      !event.termsAccepted
    ) {

      alert(
        'Please accept Terms & Conditions'
      );

      return;
    }

    this.isSubmitting = true;

    setTimeout(() => {

      const isAdded =
        this.merchantDataService
          .addMerchantData(
            event
          );

      this.isSubmitting = false;

      if (isAdded) {

        alert(
          'Merchant Data Saved Successfully'
        );

      } else {

        alert(
          'Merchant already exists'
        );
      }

    }, 1500);
  }

  onBack() {

    console.log(
      'Back Clicked'
    );
  }
}