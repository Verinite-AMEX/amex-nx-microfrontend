import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { ToggleComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-toggle-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, ToggleComponent],
  template: `
    <app-showcase-page title="Toggle" description="On/off switch control.">
      <app-variant-section title="States">
        <ui-toggle label="Notifications"></ui-toggle>
        <ui-toggle label="Dark mode"></ui-toggle>
        <ui-toggle label="Disabled" [disabled]="true"></ui-toggle>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class TogglePageComponent {}
