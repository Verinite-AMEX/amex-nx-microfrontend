import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { SelectComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-select-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, SelectComponent],
  template: `
    <app-showcase-page title="Select" description="Dropdown selector with custom styling.">
      <app-variant-section title="Default">
        <ui-select [options]="options" placeholder="Select a country" style="width:220px"></ui-select>
      </app-variant-section>
      <app-variant-section title="States">
        <ui-select [options]="options" placeholder="With error" error="Required" style="width:220px"></ui-select>
        <ui-select [options]="options" placeholder="Disabled" [disabled]="true" style="width:220px"></ui-select>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class SelectPageComponent {
  options = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
  ];
}
