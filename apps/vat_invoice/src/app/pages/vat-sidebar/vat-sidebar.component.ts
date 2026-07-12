import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexSidebarMenuComponent } from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'vat-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    AmexSidebarMenuComponent
  ],
  templateUrl: './vat-sidebar.component.html',
  styles: [`
    :host {
      display: block;
      width: 220px;
    }
  `]
})
export class VatSidebarComponent {}