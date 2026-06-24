import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { CardComponent, BadgeComponent, ButtonComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-card-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <app-showcase-page title="Card" description="Content container with optional image, header and footer.">
      <app-variant-section title="Simple">
        <ui-card title="Card Title" subtitle="Subtitle" style="width:280px;display:block">
          Some card content goes here with a brief description.
        </ui-card>
      </app-variant-section>
      <app-variant-section title="Hoverable">
        <ui-card title="Hover Me" [hoverable]="true" style="width:280px;display:block">
          Hover to see the lift effect.
        </ui-card>
      </app-variant-section>
      <app-variant-section title="With Footer">
        <ui-card title="Product" subtitle="Electronics" [hasFooter]="true" style="width:280px;display:block">
          <ui-badge label="In Stock" variant="success"></ui-badge>
          <p style="margin-top:8px;font-size:14px;color:#555">Great product description.</p>
          <div slot="footer" style="display:flex;gap:8px">
            <ui-button label="Buy" variant="primary" size="sm"></ui-button>
            <ui-button label="Save" variant="secondary" size="sm"></ui-button>
          </div>
        </ui-card>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class CardPageComponent {}
