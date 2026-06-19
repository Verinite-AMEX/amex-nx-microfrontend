import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { InputComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-input-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, InputComponent],
  template: `
    <app-showcase-page title="Input" description="Text input supporting multiple types, error and disabled states.">
      <app-variant-section title="Types">
        <ui-input type="text" placeholder="Text input" style="width:200px"></ui-input>
        <ui-input type="email" placeholder="Email input" style="width:200px"></ui-input>
        <ui-input type="password" placeholder="Password" style="width:200px"></ui-input>
        <ui-input type="number" placeholder="Number" style="width:200px"></ui-input>
      </app-variant-section>
      <app-variant-section title="States">
        <ui-input type="text" placeholder="With error" error="This field is required" style="width:200px"></ui-input>
        <ui-input type="text" placeholder="Disabled" [disabled]="true" style="width:200px"></ui-input>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class InputPageComponent {}
