import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AmexTabBarComponent,
  AmexTabItem
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-home',
  standalone: true,
  imports: [
    CommonModule,
    AmexTabBarComponent
  ],
  templateUrl: './oms-home.component.html',
})
export class OmsHomeComponent {

  @Output() tabChanged = new EventEmitter<string>();

  tabs: AmexTabItem[] = [
    {
      id: 'settlement',
      label: 'Settlement and Submissions'
    },
    {
      id: 'merchantaccount',
      label: 'Merchant Account'
    },
    {
      id: 'omsusers',
      label: 'OMS Users'
    },
    {
      id: 'mrmusers',
      label: 'MRM Users'
    },
    {
      id: 'subuseradministration',
      label: 'Sub User Administration'
    },
    {
      id: 'password',
      label: 'Change Your Password'
    },
    {
      id: 'termsandconditions',
      label: 'Terms & Conditions'
    },
    {
      id: 'customizedreports',
      label: 'Customized Reports'
    },
    {
      id: 'addnewoutlet',
      label: 'Add New Outlet'
    }
  ];

  activeTabId = '';

  onTabClick(tabId: string) {

    this.activeTabId = tabId;

    console.log('Selected Tab:', tabId);

    this.tabChanged.emit(tabId);
  }
}
