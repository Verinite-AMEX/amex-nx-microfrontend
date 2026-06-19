import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { TextareaComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-textarea-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, TextareaComponent],
  template: `
    <app-showcase-page title="Textarea" description="Multi-line text input with resize support.">
      <app-variant-section title="Default">
        <ui-textarea placeholder="Enter your message..." style="width:300px"></ui-textarea>
      </app-variant-section>
      <app-variant-section title="States">
        <ui-textarea placeholder="With error" error="Message is required" style="width:300px"></ui-textarea>
        <ui-textarea placeholder="Disabled" [disabled]="true" style="width:300px"></ui-textarea>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class TextareaPageComponent {}
