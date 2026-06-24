import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { AlertComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-alert-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AlertComponent],
  template: `
    <app-showcase-page title="Alert" description="Contextual feedback messages.">
      <app-variant-section title="Variants">
        <div style="width:500px;display:flex;flex-direction:column;gap:10px">
          <ui-alert variant="info" title="Info" message="This is an informational message."></ui-alert>
          <ui-alert variant="success" title="Success" message="Your changes have been saved."></ui-alert>
          <ui-alert variant="warning" message="Your session will expire in 5 minutes."></ui-alert>
          <ui-alert variant="error" title="Error" message="Something went wrong." [dismissible]="true"></ui-alert>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class AlertPageComponent {}
