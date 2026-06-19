import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexCardTileComponent, AmexCardInfo } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-card-tile-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexCardTileComponent],
  template: `
    <app-showcase-page title="AMEX Card Tile" description="Visual card showing type, number, cardholder and status.">
      <app-variant-section title="Masked (default)">
        <amex-card-tile [card]="platCard"></amex-card-tile>
        <amex-card-tile [card]="goldCard"></amex-card-tile>
      </app-variant-section>
      <app-variant-section title="Full Number">
        <amex-card-tile [card]="centurionCard" [masked]="false"></amex-card-tile>
      </app-variant-section>
      <app-variant-section title="Selectable">
        <amex-card-tile [card]="corporateCard" [selectable]="true" (selected)="selected=$event"></amex-card-tile>
        <amex-card-tile [card]="greenCard" [selectable]="true" (selected)="selected=$event"></amex-card-tile>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class CardTilePageComponent {
  selected: any = null;
  platCard: AmexCardInfo = { cardNumber: '374251018391009', cardholderName: 'JOHN A SMITH', cardType: 'platinum', expiryDate: '09/26', status: 'active' };
  goldCard: AmexCardInfo = { cardNumber: '4111111111111111', cardholderName: 'JANE DOE', cardType: 'gold', expiryDate: '12/25', status: 'active' };
  centurionCard: AmexCardInfo = { cardNumber: '374251018391009', cardholderName: 'RICHARD BLACK', cardType: 'centurion', expiryDate: '11/27', status: 'active' };
  corporateCard: AmexCardInfo = { cardNumber: '374600000000009', cardholderName: 'ACME CORP', cardType: 'corporate', expiryDate: '06/26', status: 'active' };
  greenCard: AmexCardInfo = { cardNumber: '378282246310005', cardholderName: 'EMILY CLARK', cardType: 'green', expiryDate: '03/26', status: 'inactive' };
}