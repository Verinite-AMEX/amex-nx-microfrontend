import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { AccordionComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-accordion-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AccordionComponent],
  template: `
    <app-showcase-page title="Accordion" description="Collapsible content sections.">
      <app-variant-section title="Single Open">
        <div style="width:500px"><ui-accordion [items]="items"></ui-accordion></div>
      </app-variant-section>
      <app-variant-section title="Multiple Open">
        <div style="width:500px"><ui-accordion [items]="items" [multiple]="true"></ui-accordion></div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class AccordionPageComponent {
  items = [
    { id: '1', title: 'What is Angular?', content: 'Angular is a platform for building single-page client applications using HTML and TypeScript.' },
    { id: '2', title: 'What is Storybook?', content: 'Storybook is an open source tool for building UI components in isolation.' },
    { id: '3', title: 'What is Nx?', content: 'Nx is a smart, fast and extensible build system with first class monorepo support.' },
  ];
}
