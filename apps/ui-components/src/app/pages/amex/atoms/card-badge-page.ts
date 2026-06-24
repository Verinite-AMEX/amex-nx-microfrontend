import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexCardBadgeComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-card-badge-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexCardBadgeComponent],
  template: `
    <app-showcase-page title="AMEX Card Badge" description="Displays card tier/type for American Express cards.">
      <app-variant-section title="All Card Types">
        <amex-card-badge type="centurion"></amex-card-badge>
        <amex-card-badge type="platinum"></amex-card-badge>
        <amex-card-badge type="gold"></amex-card-badge>
        <amex-card-badge type="green"></amex-card-badge>
        <amex-card-badge type="corporate"></amex-card-badge>
        <amex-card-badge type="bta"></amex-card-badge>
        <amex-card-badge type="supplementary"></amex-card-badge>
      </app-variant-section>
      <app-variant-section title="Custom Label">
        <amex-card-badge type="platinum" label="PLAT BUSINESS"></amex-card-badge>
        <amex-card-badge type="gold" label="GOLD REWARDS"></amex-card-badge>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class CardBadgePageComponent {}