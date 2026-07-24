import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexSettlementSubmissionsTableComponent
} from '@ui-components/ui';

import {
  OmsMerchantService
} from '../../services/oms-merchant.service';
import {
  AmexMerchantDetailsPanelComponent, MerchantAccountOption
} from './merchant-details-panel';
import {
  OmsSettlementSubmissionService
} from '../../services/oms-settlement-submission.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector:'oms-settlement-submissions-table',

  standalone: true,

  imports: [
    CommonModule,
    AmexSettlementSubmissionsTableComponent,
    AmexMerchantDetailsPanelComponent
  ],

  templateUrl:
    './oms-settlement-submissions-table.component.html',

  styles: [`

    :host {

      width: 100%;

      display: block;
    }

    .loading {

      padding: 24px;

      text-align: center;

      font-size: 18px;

      color: #6a1b9a;
    }

    .oms-settlement-page__title {

      margin: 0 0 16px 0;

      font-size: 16px;

      font-weight: 600;

      letter-spacing: 0.02em;

      color: #333;

      text-transform: uppercase;
    }

  `]
})
export class OmsSettlementSubmissionsTableComponent
  implements OnInit {

  @Input()
  rows: any[] = [];

  @Input()
  loading = false;

  merchantAccounts: MerchantAccountOption[] = [];

  selectedAccountId = '';

  hasSubmitted = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private merchantService:
      OmsMerchantService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private settlementService:
      OmsSettlementSubmissionService,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private cdr:
      ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.merchantService
      .getMerchants()
      .subscribe(merchants => {

        this.merchantAccounts =
          merchants.map(
            merchant => ({

              id:
                merchant.merchantNo,

              label:
                merchant.merchantNo
            })
          );

        if (
          this.merchantAccounts.length &&
          !this.selectedAccountId
        ) {

          this.selectedAccountId =
            this.merchantAccounts[0].id;
        }

        this.cdr.detectChanges();
      });
  }

  onAccountChange(
    accountId: string
  ) {

    this.selectedAccountId =
      accountId;
  }

  onMerchantDetailsSubmitted(
    event: { accountId: string; months: number }
  ) {

    console.log(
      'Merchant Details Submitted:',
      event
    );

    this.hasSubmitted = true;

    this.loading = true;

    this.cdr.detectChanges();

    this.settlementService
      .filterRows(
        event.months
      )
      .subscribe(filteredRows => {

        this.rows =
          filteredRows;

        this.loading = false;

        this.cdr.detectChanges();
      });
  }
}