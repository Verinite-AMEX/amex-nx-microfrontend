import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { SearchBarComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-search-bar-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, SearchBarComponent],
  template: `
    <app-showcase-page title="Search Bar" description="Pill-shaped search input with clear button.">
      <app-variant-section title="Default">
        <div style="width:320px"><ui-search-bar placeholder="Search products..."></ui-search-bar></div>
      </app-variant-section>
      <app-variant-section title="Disabled">
        <div style="width:320px"><ui-search-bar placeholder="Search..." [disabled]="true"></ui-search-bar></div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class SearchBarPageComponent {}
