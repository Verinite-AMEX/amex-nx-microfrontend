import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexOfferCardComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-offer-card-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexOfferCardComponent, CommonModule],
  template: `
    <app-showcase-page title="AMEX Offer Card" description="Merchant offer/deal card with enroll/unenroll actions.">
      <app-variant-section title="Available Offers">
        <amex-offer-card *ngFor="let o of offers" [offer]="o" (enroll)="o.enrolled=true" (unenroll)="o.enrolled=false" style="width:300px;display:block"></amex-offer-card>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class OfferCardPageComponent {
  offers = [
    { id: '1', title: '20% cashback on dining', description: 'Earn 20% back at participating UAE restaurants.', category: 'Dining', merchant: 'Various Restaurants', validUntil: '30 Apr 2024', eligibleCards: ['gold' as const, 'platinum' as const], enrolled: false },
    { id: '2', title: '5x points on travel bookings', description: 'Earn 5x Membership Rewards on all airline and hotel bookings.', category: 'Travel', merchant: 'Emirates & Marriott', validUntil: '31 May 2024', eligibleCards: ['centurion' as const, 'platinum' as const], enrolled: true },
    { id: '3', title: 'AED 50 off at Noon', description: 'Get AED 50 off on purchases of AED 300 or more.', category: 'Shopping', merchant: 'Noon.com', validUntil: '15 Apr 2024', eligibleCards: ['green' as const, 'gold' as const, 'corporate' as const], enrolled: false },
  ];
}