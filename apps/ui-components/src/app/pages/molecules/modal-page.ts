import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../showcase-page';
import { VariantSectionComponent } from '../variant-section';
import { ModalComponent, ButtonComponent } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-modal-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, ModalComponent, ButtonComponent],
  template: `
    <app-showcase-page title="Modal" description="Overlay dialog for focused interactions.">
      <app-variant-section title="Trigger">
        <ui-button label="Open Modal" variant="primary" (click)="open=true"></ui-button>
        <ui-button label="Open Large" variant="secondary" (click)="openLg=true"></ui-button>
      </app-variant-section>
      <ui-modal [open]="open" title="Confirm Delete" size="sm" [hasFooter]="true" (closed)="open=false">
        Are you sure you want to delete this item? This cannot be undone.
        <div slot="footer">
          <ui-button label="Cancel" variant="secondary" size="sm" (click)="open=false"></ui-button>
          <ui-button label="Delete" variant="primary" size="sm" (click)="open=false"></ui-button>
        </div>
      </ui-modal>
      <ui-modal [open]="openLg" title="Terms of Service" size="lg" (closed)="openLg=false">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </ui-modal>
    </app-showcase-page>
  `,
})
export class ModalPageComponent {
  open = false;
  openLg = false;
}
