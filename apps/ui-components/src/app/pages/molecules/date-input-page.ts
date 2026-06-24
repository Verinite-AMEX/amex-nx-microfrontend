import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { DateInputComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-date-input-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, DateInputComponent],
  template: `
    <app-showcase-page title="Date Input" description="Native date picker with custom styling.">
      <app-variant-section title="Default">
        <div style="width:220px"><ui-date-input></ui-date-input></div>
      </app-variant-section>
      <app-variant-section title="With Range">
        <div style="width:220px"><ui-date-input min="2024-01-01" max="2024-12-31"></ui-date-input></div>
      </app-variant-section>
      <app-variant-section title="States">
        <div style="width:220px"><ui-date-input error="Please select a date"></ui-date-input></div>
        <div style="width:220px"><ui-date-input [disabled]="true"></ui-date-input></div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class DateInputPageComponent {}
