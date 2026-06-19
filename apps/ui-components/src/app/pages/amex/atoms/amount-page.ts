import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexAmountComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-amount-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexAmountComponent],
  template: `
    <app-showcase-page title="AMEX Amount" description="Currency amount display with debit/credit colour coding.">
      <app-variant-section title="Debit">
        <amex-amount [amount]="1250.75" currency="AED" type="debit"></amex-amount>
        <amex-amount [amount]="89.00" currency="USD" type="debit"></amex-amount>
      </app-variant-section>
      <app-variant-section title="Credit">
        <amex-amount [amount]="500.00" currency="AED" type="credit"></amex-amount>
        <amex-amount [amount]="1200.50" currency="USD" type="credit"></amex-amount>
      </app-variant-section>
      <app-variant-section title="Neutral">
        <amex-amount [amount]="3400.00" currency="AED" type="neutral"></amex-amount>
      </app-variant-section>
      <app-variant-section title="Other Currencies">
        <amex-amount [amount]="1000" currency="GBP" type="debit"></amex-amount>
        <amex-amount [amount]="550.99" currency="EUR" type="credit"></amex-amount>
        <amex-amount [amount]="7800" currency="INR" type="debit"></amex-amount>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class AmountPageComponent {}