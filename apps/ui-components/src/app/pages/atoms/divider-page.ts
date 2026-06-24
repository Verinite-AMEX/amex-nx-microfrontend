import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { DividerComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-divider-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, DividerComponent],
  template: `
    <app-showcase-page title="Divider" description="Visual separator between content sections.">
      <app-variant-section title="Horizontal">
        <div style="width:400px">
          <p style="margin:0 0 12px;font-size:14px">Section above</p>
          <ui-divider></ui-divider>
          <p style="margin:12px 0 0;font-size:14px">Section below</p>
        </div>
      </app-variant-section>
      <app-variant-section title="With Label">
        <div style="width:400px">
          <ui-divider label="OR"></ui-divider>
        </div>
      </app-variant-section>
      <app-variant-section title="Vertical">
        <div style="display:flex;height:40px;align-items:center;gap:12px;font-size:14px">
          <span>Left</span>
          <ui-divider orientation="vertical"></ui-divider>
          <span>Right</span>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class DividerPageComponent {}
