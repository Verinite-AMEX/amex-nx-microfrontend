import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { PaginationComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-pagination-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, PaginationComponent],
  template: `
    <app-showcase-page title="Pagination" description="Navigate through pages of content.">
      <app-variant-section title="Default">
        <ui-pagination [currentPage]="page" [totalPages]="10" (pageChange)="page=$event"></ui-pagination>
      </app-variant-section>
      <app-variant-section title="Few Pages">
        <ui-pagination [currentPage]="1" [totalPages]="4"></ui-pagination>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class PaginationPageComponent {
  page = 1;
}
