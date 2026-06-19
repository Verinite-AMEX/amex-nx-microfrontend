import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexPointsDisplayComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-points-display-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexPointsDisplayComponent],
  template: `
    <app-showcase-page title="AMEX Points Display" description="Shows Membership Rewards points balance.">
      <app-variant-section title="Standard">
        <amex-points-display [points]="125000"></amex-points-display>
        <amex-points-display [points]="4500" label="Bonus Points Earned"></amex-points-display>
      </app-variant-section>
      <app-variant-section title="Compact">
        <amex-points-display [points]="125000" [compact]="true"></amex-points-display>
        <amex-points-display [points]="4500" label="Bonus Points" [compact]="true"></amex-points-display>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class PointsDisplayPageComponent {}