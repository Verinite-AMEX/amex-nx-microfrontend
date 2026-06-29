import { Component } from '@angular/core';
import { AmexMerchantDataFormComponent } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-merchant-data',
  standalone: true,
  imports: [AmexMerchantDataFormComponent],
  template: `
    <amex-merchant-data-form
      title="MERCHANT DETAILS"
      [countryOptions]="countryOptions"
      [cityOptions]="cityOptions"
      [legalOptions]="legalOptions"
      (submitClick)="onSubmit($event)"
      (backClick)="onBack()">
    </amex-merchant-data-form>
  `
})
export class MerchantDataComponent {
  countryOptions: string[] = ['Algeria', 'Bahrain', 'Kuwait', 'Oman', 'Qatar', 'Saudi Arabia', 'UAE'];
  cityOptions: string[] = ['Algiers', 'Manama', 'Kuwait City', 'Muscat', 'Doha', 'Riyadh', 'Dubai', 'Abu Dhabi'];
  legalOptions: string[] = [
    'Limited Liability Company',
    'Joint Stock Company',
    'Sole Proprietorship',
    'Partnership',
    'Branch of Foreign Company'
  ];

  onSubmit(data: any): void {
    // TODO: Replace with MerchantDataService API call
    console.log('Merchant submit:', data);
  }

  onBack(): void {
    // TODO: navigate back
  }
}