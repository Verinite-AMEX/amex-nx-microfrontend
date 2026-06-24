import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { BreadcrumbComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-breadcrumb-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, BreadcrumbComponent],
  template: `
    <app-showcase-page title="Breadcrumb" description="Navigation trail showing current location.">
      <app-variant-section title="Default">
        <ui-breadcrumb [items]="items"></ui-breadcrumb>
      </app-variant-section>
      <app-variant-section title="Chevron Separator">
        <ui-breadcrumb [items]="items" separator=">"></ui-breadcrumb>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class BreadcrumbPageComponent {
  items = [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Shoes' }];
}
