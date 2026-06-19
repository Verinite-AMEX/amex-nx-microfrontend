import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexStatusBadgeComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-status-badge-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexStatusBadgeComponent],
  template: `
    <app-showcase-page title="AMEX Status Badge" description="Pill-shaped status indicator with colour-coded dot.">
      <app-variant-section title="All Statuses">
        <amex-status-badge status="approved"></amex-status-badge>
        <amex-status-badge status="rejected"></amex-status-badge>
        <amex-status-badge status="pending"></amex-status-badge>
        <amex-status-badge status="processing"></amex-status-badge>
        <amex-status-badge status="completed"></amex-status-badge>
        <amex-status-badge status="draft"></amex-status-badge>
        <amex-status-badge status="active"></amex-status-badge>
        <amex-status-badge status="inactive"></amex-status-badge>
        <amex-status-badge status="expired"></amex-status-badge>
        <amex-status-badge status="locked"></amex-status-badge>
      </app-variant-section>
      <app-variant-section title="Custom Label">
        <amex-status-badge status="approved" label="Verified"></amex-status-badge>
        <amex-status-badge status="pending" label="Awaiting Review"></amex-status-badge>
        <amex-status-badge status="rejected" label="Declined"></amex-status-badge>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class StatusBadgePageComponent {}