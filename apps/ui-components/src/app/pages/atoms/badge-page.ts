import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { BadgeComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-badge-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, BadgeComponent],
  template: `
    <app-showcase-page title="Badge" description="Small status indicator or label.">
      <app-variant-section title="Variants">
        <ui-badge label="Primary" variant="primary"></ui-badge>
        <ui-badge label="Secondary" variant="secondary"></ui-badge>
        <ui-badge label="Success" variant="success"></ui-badge>
        <ui-badge label="Warning" variant="warning"></ui-badge>
        <ui-badge label="Error" variant="error"></ui-badge>
        <ui-badge label="Neutral" variant="neutral"></ui-badge>
      </app-variant-section>
      <app-variant-section title="Sizes">
        <ui-badge label="Small" size="sm"></ui-badge>
        <ui-badge label="Medium" size="md"></ui-badge>
        <ui-badge label="Large" size="lg"></ui-badge>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class BadgePageComponent {}
