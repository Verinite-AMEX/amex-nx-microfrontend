import { Component } from '@angular/core';
import { AmexCurrencyMasterFormComponent, CurrencyMasterData } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-currency-master',
  standalone: true,
  imports: [AmexCurrencyMasterFormComponent],
  template: `
    <amex-currency-master-form
      [currencyOptions]="currencyOptions"
      (saveClick)="onSave($event)"
      (cancelClick)="onCancel()">
    </amex-currency-master-form>
  `
})
export class CurrencyMaster {
  currencyOptions: { name: string; code: string; shortName: string; decimals: string }[] = [
    { name: 'Algerian Dinar',  code: 'DZD', shortName: 'DZD', decimals: '2' },
    { name: 'Bahraini Dinar',  code: 'BHD', shortName: 'BHD', decimals: '3' },
    { name: 'Euro',            code: 'EUR', shortName: 'EUR', decimals: '2' },
    { name: 'Kuwaiti Dinar',   code: 'KWD', shortName: 'KWD', decimals: '3' },
    { name: 'Omani Rial',      code: 'OMR', shortName: 'OMR', decimals: '3' },
    { name: 'Pound Sterling',  code: 'GBP', shortName: 'GBP', decimals: '2' },
    { name: 'Qatari Riyal',    code: 'QAR', shortName: 'QAR', decimals: '2' },
    { name: 'Saudi Riyal',     code: 'SAR', shortName: 'SAR', decimals: '2' },
    { name: 'UAE Dirham',      code: 'AED', shortName: 'AED', decimals: '2' },
    { name: 'US Dollar',       code: 'USD', shortName: 'USD', decimals: '2' },
  ];

  onSave(data: CurrencyMasterData): void {
    // data.action, data.currencyCode, data.currencyName, data.shortName, data.noOfDecimals
    // TODO: Replace with MasterService API call
    console.log('Currency save:', data);
  }

  onCancel(): void {}
}