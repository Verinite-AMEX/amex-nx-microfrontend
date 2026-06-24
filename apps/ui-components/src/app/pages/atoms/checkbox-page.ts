import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { CheckboxComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-checkbox-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, CheckboxComponent],
  template: `
    <app-showcase-page title="Checkbox" description="Binary selection control with custom styling.">
      <app-variant-section title="States">
        <ui-checkbox label="Unchecked"></ui-checkbox>
        <ui-checkbox label="Disabled" [disabled]="true"></ui-checkbox>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class CheckboxPageComponent {}
