import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexAccountNumberComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-account-number-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexAccountNumberComponent],
  template: `
    <app-showcase-page title="AMEX Account Number" description="Card/account number display with masking and AMEX 4-6-5 format.">
      <app-variant-section title="Masked (default)">
        <amex-account-number number="374251018391009" [masked]="true"></amex-account-number>
        <amex-account-number number="4111111111111111" [masked]="true"></amex-account-number>
      </app-variant-section>
      <app-variant-section title="Full — AMEX 15-digit">
        <amex-account-number number="374251018391009" [masked]="false"></amex-account-number>
      </app-variant-section>
      <app-variant-section title="Full — 16-digit">
        <amex-account-number number="4111111111111111" [masked]="false"></amex-account-number>
      </app-variant-section>
      <app-variant-section title="Without Monospace">
        <amex-account-number number="374251018391009" [masked]="false" [mono]="false"></amex-account-number>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class AccountNumberPageComponent {}