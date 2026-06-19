import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { IconButtonComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-icon-button-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, IconButtonComponent],
  template: `
    <app-showcase-page title="Icon Button" description="Circular button for icon-only actions.">
      <app-variant-section title="Variants">
        <ui-icon-button icon="✏️" ariaLabel="Edit" variant="ghost"></ui-icon-button>
        <ui-icon-button icon="＋" ariaLabel="Add" variant="primary"></ui-icon-button>
        <ui-icon-button icon="🗑" ariaLabel="Delete" variant="danger"></ui-icon-button>
      </app-variant-section>
      <app-variant-section title="Sizes">
        <ui-icon-button icon="★" ariaLabel="Star" size="sm"></ui-icon-button>
        <ui-icon-button icon="★" ariaLabel="Star" size="md"></ui-icon-button>
        <ui-icon-button icon="★" ariaLabel="Star" size="lg"></ui-icon-button>
      </app-variant-section>
      <app-variant-section title="Disabled">
        <ui-icon-button icon="✏️" ariaLabel="Edit" [disabled]="true"></ui-icon-button>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class IconButtonPageComponent {}
