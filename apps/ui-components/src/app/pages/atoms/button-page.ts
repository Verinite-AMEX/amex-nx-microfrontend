import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { ButtonComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-button-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, ButtonComponent],
  template: `
    <app-showcase-page title="Button" description="Triggers actions. Supports variants, sizes and disabled state.">
      <app-variant-section title="Variants">
        <ui-button label="Primary" variant="primary"></ui-button>
        <ui-button label="Secondary" variant="secondary"></ui-button>
      </app-variant-section>
      <app-variant-section title="Sizes">
        <ui-button label="Small" size="sm"></ui-button>
        <ui-button label="Medium" size="md"></ui-button>
        <ui-button label="Large" size="lg"></ui-button>
      </app-variant-section>
      <app-variant-section title="States">
        <ui-button label="Disabled" [disabled]="true"></ui-button>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class ButtonPageComponent {}
