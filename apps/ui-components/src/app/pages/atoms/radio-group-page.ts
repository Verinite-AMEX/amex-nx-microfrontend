import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { RadioGroupComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-radio-group-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, RadioGroupComponent],
  template: `
    <app-showcase-page title="Radio Group" description="Single-selection from a list of options.">
      <app-variant-section title="Vertical">
        <ui-radio-group [options]="options" name="v" orientation="vertical"></ui-radio-group>
      </app-variant-section>
      <app-variant-section title="Horizontal">
        <ui-radio-group [options]="options" name="h" orientation="horizontal"></ui-radio-group>
      </app-variant-section>
      <app-variant-section title="Disabled">
        <ui-radio-group [options]="options" name="d" [disabled]="true"></ui-radio-group>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class RadioGroupPageComponent {
  options = [{ label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }];
}
