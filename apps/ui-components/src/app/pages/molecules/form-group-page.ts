import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { FormGroupComponent, FormFieldComponent, InputComponent, TextareaComponent, CheckboxComponent, RadioGroupComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-form-group-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, FormGroupComponent, FormFieldComponent, InputComponent, TextareaComponent, CheckboxComponent, RadioGroupComponent],
  template: `
    <app-showcase-page title="Form Group" description="Groups related form fields with optional legend.">
      <app-variant-section title="Contact Form">
        <div style="width:500px">
          <ui-form-group legend="Contact Us">
            <ui-form-field label="Name" [required]="true"><ui-input type="text" placeholder="Your name"></ui-input></ui-form-field>
            <ui-form-field label="Email" [required]="true"><ui-input type="email" placeholder="your@email.com"></ui-input></ui-form-field>
            <ui-form-field label="Priority">
              <ui-radio-group [options]="priorities" name="priority" orientation="horizontal"></ui-radio-group>
            </ui-form-field>
            <ui-form-field label="Message"><ui-textarea placeholder="Your message..." [rows]="4"></ui-textarea></ui-form-field>
            <ui-form-field><ui-checkbox label="I agree to the terms"></ui-checkbox></ui-form-field>
          </ui-form-group>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class FormGroupPageComponent {
  priorities = [{ label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' }, { label: 'High', value: 'high' }];
}
