import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexWearableTileComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-wearable-tile-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexWearableTileComponent, CommonModule],
  template: `
    <app-showcase-page title="AMEX Wearable Tile" description="Device tile for NFC-enabled wearables linked to AMEX cards.">
      <app-variant-section title="Without Actions">
        <amex-wearable-tile *ngFor="let w of wearables" [wearable]="w" style="width:420px;display:block"></amex-wearable-tile>
      </app-variant-section>
      <app-variant-section title="With Actions">
        <amex-wearable-tile [wearable]="wearables[0]" [showActions]="true" style="width:420px;display:block"></amex-wearable-tile>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class WearableTilePageComponent {
  wearables = [
    { id: 'W1', type: 'ring' as const, deviceName: 'McLEAR Ring', linkedCardLast4: '1009', status: 'active' as const, issuedDate: '10 Jan 2024', nfcEnabled: true },
    { id: 'W2', type: 'watch' as const, deviceName: 'Apple Watch SE', linkedCardLast4: '4111', status: 'inactive' as const, issuedDate: '05 Feb 2024', nfcEnabled: true },
    { id: 'W3', type: 'bracelet' as const, deviceName: 'Garmin Band', linkedCardLast4: '3005', status: 'pending' as const, nfcEnabled: false },
  ];
}