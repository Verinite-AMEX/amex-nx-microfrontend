import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  AmexAddDeleteMerchantPanelComponent
} from '@ui-components/ui';

import {
  Merchant
} from '../../models/merchant.model';

import {
  OmsMerchantService
} from '../../services/oms-merchant.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-merchant-panel',

  standalone: true,

  imports: [
    CommonModule,
    AmexAddDeleteMerchantPanelComponent
  ],

  templateUrl:
    './oms-merchant-panel.component.html',

  styleUrls: [
    './oms-merchant-panel.component.css'
  ]
})
export class OmsMerchantPanelComponent
  implements OnInit {

  @Output()
  startClicked =
    new EventEmitter<void>();

  merchantOptions: any[] = [];

  merchants: Merchant[] = [];

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private merchantService:
      OmsMerchantService
  ) {}

  isAddingMerchant = false;

  isDeletingMerchant = false;

  ngOnInit() {

    this.loadMerchants();
  }

  loadMerchants() {

    this.merchantService
      .getMerchants()
      .subscribe(merchants => {

        this.merchants =
          merchants;

        this.merchantOptions =
          merchants.map(
            merchant => ({

              merchantNo:
                merchant.merchantNo,

              ibanLast5Digits:
                merchant.ibanLast5Digits,

              label:
                merchant.merchantNo
            })
          );

        console.log(
          'Merchant List:',
          merchants
        );
      });
  }

  onAddMerchant(
  event: any
) {

  console.log(
    'NEW CODE EXECUTED'
  );

  console.log(
    'Add Merchant Event:',
    event
  );
  const merchantNo =
    event?.merchantNo;

  const ibanLast5Digits =
    event?.lastFiveIban;

    console.log(
  'IBAN:',
  ibanLast5Digits,
  typeof ibanLast5Digits
);

  if (
    !merchantNo ||
    ibanLast5Digits === null ||
    ibanLast5Digits === undefined
  ) {

    alert(
      'Please enter all fields'
    );

    return;
  }

  const ibanValue =
    String(
      ibanLast5Digits
    ).trim();

  if (
  ibanValue.length !== 5 ||
  !/^\d+$/.test(ibanValue)
) {

  console.log(
    'IBAN VALIDATION FAILED'
  );

  alert(
    'Please enter exactly 5 numeric digits from the IBAN.'
  );

  return;
}

  const isAdded =
    this.merchantService
      .addMerchant(
        merchantNo,
        ibanValue
      );

  if (isAdded) {

    alert(
      'Merchant Added Successfully'
    );

  } else {

    alert(
      'Merchant already exists'
    );
  }
}

  onDeleteMerchant(
  merchantNo: string
) {

  console.log(
    'Delete Merchant:',
    merchantNo
  );

  this.merchantService
    .deleteMerchant(
      merchantNo
    );

  alert(
    'Merchant Deleted'
  );
}

  onStart() {

    console.log(
      'Start Clicked'
    );

    this.startClicked.emit();
  }
}