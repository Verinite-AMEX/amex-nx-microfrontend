import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { TagComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-tag-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, TagComponent],
  template: `
    <app-showcase-page title="Tag" description="Label for categorization, optionally removable.">
      <app-variant-section title="Variants">
        <ui-tag label="Angular" variant="primary"></ui-tag>
        <ui-tag label="TypeScript" variant="secondary"></ui-tag>
        <ui-tag label="Active" variant="success"></ui-tag>
        <ui-tag label="Pending" variant="warning"></ui-tag>
        <ui-tag label="Error" variant="error"></ui-tag>
        <ui-tag label="Draft" variant="neutral"></ui-tag>
      </app-variant-section>
      <app-variant-section title="Removable">
        <ui-tag label="Removable" variant="primary" [removable]="true"></ui-tag>
        <ui-tag label="Click ✕" variant="success" [removable]="true"></ui-tag>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class TagPageComponent {}
