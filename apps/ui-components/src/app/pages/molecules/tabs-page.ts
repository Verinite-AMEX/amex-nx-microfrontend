import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { TabsComponent } from '@vn-core-ui-components/ui';
import { CommonModule } from '@angular/common';

@Component({ selector: 'app-tabs-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, TabsComponent, CommonModule],
  template: `
    <app-showcase-page title="Tabs" description="Organise content into switchable panels.">
      <app-variant-section title="Default">
        <div style="width:500px">
          <ui-tabs [tabs]="tabs" [activeTab]="active" (tabChange)="active=$event">
            <div *ngIf="active==='overview'">Overview content — general information about the item.</div>
            <div *ngIf="active==='details'">Details content — technical specifications and attributes.</div>
            <div *ngIf="active==='reviews'">Reviews content — user ratings and feedback.</div>
          </ui-tabs>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class TabsPageComponent {
  active = 'overview';
  tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'disabled', label: 'Disabled', disabled: true },
  ];
}
