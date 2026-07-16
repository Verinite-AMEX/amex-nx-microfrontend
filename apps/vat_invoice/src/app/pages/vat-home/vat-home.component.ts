import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexTabBarComponent, AmexTabItem } from '@ui-components/ui';

import { VatCustHomeComponent } from '../vat-cust-home-folder/vat-cust-home-component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'vat-home',
  standalone: true,
  imports: [CommonModule, AmexTabBarComponent, VatCustHomeComponent],
  templateUrl: './vat-home.component.html',
})
export class VatHomeComponent {
  @Output() tabChanged = new EventEmitter<string>();
  tabs: AmexTabItem[] = [
    { id: 'misc', label: 'MISC' },
    { id: 'oas', label: 'ONLINE ACCOUNT SERVICES' },
    { id: 'stmt', label: 'STATEMENTS' },
    { id: 'pb', label: 'POINT BOOSTER' },
    { id: 'cp', label: 'CHANGE PASSWORD' },
    { id: 'bureau', label: 'BUREAU' },
    { id: 'centurion', label: 'CENTURION' },
    { id: 'vat', label: 'VAT INVOICE' },
  ];

  activeTabId = 'misc';

  onTabClick(tabId: string) {
    this.activeTabId = tabId;

    console.log('Clicked Tab:', tabId);

    this.tabChanged.emit(tabId);
  }
}
