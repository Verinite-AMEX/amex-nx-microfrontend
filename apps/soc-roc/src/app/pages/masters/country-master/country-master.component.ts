import { Component } from '@angular/core';
import { AmexCountryMasterFormComponent, CountryMasterData } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-country-master',
  standalone: true,
  imports: [AmexCountryMasterFormComponent],
  template: `
    <amex-country-master-form
      [countryOptions]="countryOptions"
      (saveClick)="onSave($event)"
      (cancelClick)="onCancel()">
    </amex-country-master-form>
  `
})
export class CountryMaster {
  countryOptions: { name: string; code: string }[] = [
    { name: 'Algeria',      code: 'DZ' },
    { name: 'Bahrain',      code: 'BH' },
    { name: 'Kuwait',       code: 'KW' },
    { name: 'Oman',         code: 'OM' },
    { name: 'Qatar',        code: 'QA' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'UAE',          code: 'AE' },
  ];

  onSave(data: CountryMasterData): void {
    // data.action, data.countryCode, data.countryName
    // TODO: Replace with MasterService API call
    console.log('Country save:', data);
  }

  onCancel(): void {}
}