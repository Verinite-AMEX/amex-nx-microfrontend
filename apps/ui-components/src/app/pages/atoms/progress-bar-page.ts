import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { ProgressBarComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-progress-bar-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, ProgressBarComponent],
  template: `
    <app-showcase-page title="Progress Bar" description="Visual indicator of task completion.">
      <app-variant-section title="Variants">
        <div style="width:400px;display:flex;flex-direction:column;gap:12px">
          <ui-progress-bar [value]="70" label="Primary" [showValue]="true" variant="primary"></ui-progress-bar>
          <ui-progress-bar [value]="100" label="Success" [showValue]="true" variant="success"></ui-progress-bar>
          <ui-progress-bar [value]="45" label="Warning" [showValue]="true" variant="warning"></ui-progress-bar>
          <ui-progress-bar [value]="20" label="Error" [showValue]="true" variant="error"></ui-progress-bar>
        </div>
      </app-variant-section>
      <app-variant-section title="Indeterminate">
        <div style="width:400px">
          <ui-progress-bar [indeterminate]="true" label="Loading..."></ui-progress-bar>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class ProgressBarPageComponent {}
