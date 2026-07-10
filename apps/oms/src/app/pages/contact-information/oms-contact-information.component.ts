import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexContactInformationFormComponent
} from '@ui-components/ui';

import {
  OmsContactInformationService
} from '../../services/oms-contact-information.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-contact-information',

  standalone: true,

  imports: [
    CommonModule,
    AmexContactInformationFormComponent
  ],

  templateUrl:
    './oms-contact-information.component.html',
})
export class OmsContactInformationComponent
  implements OnInit {

  @Input()
  sectionTitle =
    'CONTACT INFORMATION';

  backLabel =
    'Back';

  saveLabel =
    'Save';

  contacts: any[] = [];

  countryCodes = [

    {
      value: '+971',
      label: 'UAE (+971)'
    },

    {
      value: '+91',
      label: 'India (+91)'
    },

    {
      value: '+1',
      label: 'USA (+1)'
    },

    {
      value: '+44',
      label: 'UK (+44)'
    }
  ];

  isSubmitting = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private contactService:
      OmsContactInformationService
  ) {}

  // INIT
  ngOnInit() {

    this.loadContacts();
  }

  // LOAD SECTION DATA
  loadContacts() {

  const existingContacts =
    this.contactService
      .getBySection(
        this.sectionTitle
      );

  // IF DATA EXISTS
  if (
    existingContacts.length > 0
  ) {

    this.contacts =
      existingContacts;

  } else {

    // DEFAULT EMPTY ROW
    this.contacts = [

      {
        name: '',

        email: '',

        phone: '',

        countryCode: '+971',

        designation: ''
      }
    ];
  }

  console.log(
    'Loaded Contacts:',
    this.contacts
  );
}

  // SAVE
  onSubmit(
    event: any
  ) {

    console.log(
      'Save Clicked:',
      event
    );

    // VALIDATION
    for (const contact of event) {

      // NAME
      if (
        !contact.name?.trim()
      ) {

        alert(
          'Name is required'
        );

        return;
      }

      // EMAIL
      if (
        !contact.email?.trim()
      ) {

        alert(
          'Email is required'
        );

        return;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          contact.email
        )
      ) {

        alert(
          'Please enter a valid email address'
        );

        return;
      }

      // PHONE / MOBILE VALIDATION

      const contactNumber =

        contact.mobile ||

        contact.landline ||

        contact.phone ||

        '';

      if (
        !String(contactNumber).trim()
      ) {

        alert(
          'Mobile number is required'
        );

        return;
      }

      if (
        !/^\d{7,15}$/.test(
          String(contactNumber)
        )
      ) {

        alert(
          'Mobile number must contain 7 to 15 digits only'
        );

        return;
      }

      // COUNTRY CODE
      if (
        !contact.countryCode
      ) {

        alert(
          'Country code is required'
        );

        return;
      }

      // DESIGNATION
      const designation =

        contact.jobTitle ||

        contact.designation ||

        '';

      if (
        !designation.trim()
      ) {

        alert(
          'Designation is required'
        );

        return;
      }
    }

    this.isSubmitting = true;

    // MOCK API DELAY
    setTimeout(() => {

      this.contactService
        .saveSectionData(

          this.sectionTitle,

          event
        );

      this.isSubmitting = false;

      alert(
        `${this.sectionTitle} Saved Successfully`
      );

      this.loadContacts();

    }, 1500);
  }

  // BACK
  onBack() {

    console.log(
      'Back Clicked'
    );
  }
}