import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { FormFieldComponent, InputComponent, SelectComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-form-field-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, FormFieldComponent, InputComponent, SelectComponent],
  template: `
    <app-showcase-page title="Form Field" description="Label + control + hint/error wrapper.">
      <app-variant-section title="With Input">
        <div style="width:300px">
          <ui-form-field label="Email" hint="We'll never share your email" [required]="true">
            <ui-input type="email" placeholder="you@example.com"></ui-input>
          </ui-form-field>
        </div>
      </app-variant-section>
      <app-variant-section title="With Error">
        <div style="width:300px">
          <ui-form-field label="Username" error="Username is taken" [required]="true">
            <ui-input type="text" placeholder="Choose a username" error="Username is taken"></ui-input>
          </ui-form-field>
        </div>
      </app-variant-section>
      <app-variant-section title="With Select">
        <div style="width:300px">
          <ui-form-field label="Country">
            <ui-select [options]="countries" placeholder="Select country"></ui-select>
          </ui-form-field>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class FormFieldPageComponent {
  countries = [{ label: 'USA', value: 'us' }, { label: 'UK', value: 'uk' }, { label: 'Canada', value: 'ca' }];
}
