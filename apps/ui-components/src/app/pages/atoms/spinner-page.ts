import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { SpinnerComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-spinner-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, SpinnerComponent],
  template: `
    <app-showcase-page title="Spinner" description="Animated loading indicator.">
      <app-variant-section title="Sizes">
        <ui-spinner size="sm"></ui-spinner>
        <ui-spinner size="md"></ui-spinner>
        <ui-spinner size="lg"></ui-spinner>
      </app-variant-section>
      <app-variant-section title="Colors">
        <ui-spinner size="md" color="#1976d2"></ui-spinner>
        <ui-spinner size="md" color="#4caf50"></ui-spinner>
        <ui-spinner size="md" color="#f44336"></ui-spinner>
        <ui-spinner size="md" color="#ff9800"></ui-spinner>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class SpinnerPageComponent {}
