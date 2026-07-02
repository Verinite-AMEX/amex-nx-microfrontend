import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AmexTermsAndConditionsViewerComponent
} from '@vn-core-ui-components/ui';

@Component({

  selector: 'oms-terms-and-conditions',

  standalone: true,

  imports: [
    CommonModule,
    AmexTermsAndConditionsViewerComponent
  ],

  templateUrl:
    './oms-terms-and-conditions.component.html',

  styles: [`

    :host {

      width: 100%;
    }

  `]
})
export class OmsTermsAndConditionsComponent {

  @Input()
  title = 'Terms and Conditions';

  @Input()
  maxHeight = '180px';

  @Input()
  accepted = false;

  @Input()
  agreeLabel = 'I Agree';

  @Input()
  cancelLabel = 'Cancel';

  @Input()
  showCancel = true;

  @Input()
  text = `
These Terms and Conditions govern your use of the American Express Online Merchant Services (OMS) Portal.

1. Account Responsibility
You are responsible for maintaining the confidentiality of your User ID and password.

2. Permitted Use
The portal may only be used for legitimate business purposes.

3. VAT Compliance
Merchants are solely responsible for VAT compliance.
`;

  @Output()
  agreeClicked =
    new EventEmitter<any>();

  @Output()
  cancelClicked =
    new EventEmitter<any>();

  agree(
  event: any
) {

  if (
    !this.accepted
  ) {

    alert(
      'Please accept the Terms & Conditions.'
    );

    return;

  }

  console.log(
    'Terms Accepted'
  );

  alert(
    'Terms & Conditions Accepted Successfully'
  );

  this.agreeClicked.emit(
    event
  );

}

  cancel(
  event: any
) {

  this.accepted = false;

  console.log(
    'Cancel Clicked'
  );

  this.cancelClicked.emit(
    event
  );

}

  onAcceptedChange(
  value: boolean
) {

  console.log(
    'Checkbox Changed:',
    value
  );

  this.accepted =
    value;

}
}