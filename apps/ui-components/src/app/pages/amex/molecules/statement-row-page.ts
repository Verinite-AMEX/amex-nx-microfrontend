import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexStatementRowComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-statement-row-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexStatementRowComponent],
  template: `
    <app-showcase-page title="AMEX Statement Row" description="Single transaction row for statement views.">
      <app-variant-section title="Debit Transactions">
        <div style="width:100%;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden">
          <amex-statement-row [transaction]="debit1"></amex-statement-row>
          <amex-statement-row [transaction]="debit2"></amex-statement-row>
        </div>
      </app-variant-section>
      <app-variant-section title="Credit Transaction">
        <div style="width:100%;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden">
          <amex-statement-row [transaction]="credit1"></amex-statement-row>
        </div>
      </app-variant-section>
      <app-variant-section title="With Status">
        <div style="width:100%;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden">
          <amex-statement-row [transaction]="withStatus"></amex-statement-row>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class StatementRowPageComponent {
  debit1 = { date: '12 Mar 2024', description: 'Amazon AE', referenceNumber: 'REF-00192837', amount: 349.99, currency: 'AED', type: 'debit' as const, category: 'Shopping' };
  debit2 = { date: '10 Mar 2024', description: 'Carrefour MOE', referenceNumber: 'REF-00192200', amount: 215.50, currency: 'AED', type: 'debit' as const, category: 'Grocery' };
  credit1 = { date: '08 Mar 2024', description: 'Refund — Emirates Airlines', referenceNumber: 'REF-00190011', amount: 1200.00, currency: 'AED', type: 'credit' as const, category: 'Travel' };
  withStatus = { date: '05 Mar 2024', description: 'Hotel Atlantis — Dispute', referenceNumber: 'REF-00185544', amount: 5400.00, currency: 'AED', type: 'debit' as const, status: 'pending' as const, category: 'Travel' };
}