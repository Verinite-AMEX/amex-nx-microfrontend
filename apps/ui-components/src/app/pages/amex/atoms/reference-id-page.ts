import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexReferenceIdComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-reference-id-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexReferenceIdComponent],
  template: `
    <app-showcase-page title="AMEX Reference ID" description="Monospace pill for reference, SOC, ROC or request IDs.">
      <app-variant-section title="With Prefix">
        <amex-reference-id id="REQ-20240312-00192" prefix="REQ"></amex-reference-id>
        <amex-reference-id id="SOC-00458721" prefix="SOC"></amex-reference-id>
        <amex-reference-id id="ROC-00123456" prefix="ROC"></amex-reference-id>
        <amex-reference-id id="TXN-98765432" prefix="TXN"></amex-reference-id>
      </app-variant-section>
      <app-variant-section title="Without Prefix">
        <amex-reference-id id="20240312-00192"></amex-reference-id>
        <amex-reference-id id="A7B3C9D2E1F0"></amex-reference-id>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class ReferenceIdPageComponent {}