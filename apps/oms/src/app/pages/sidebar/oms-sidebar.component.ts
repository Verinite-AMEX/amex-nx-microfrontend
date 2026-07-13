import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AmexSidebarMenuComponent
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-sidebar',

  standalone: true,

  imports: [
    CommonModule,
    AmexSidebarMenuComponent
  ],

  templateUrl:
    './oms-sidebar.component.html',
})
export class OmsSidebarComponent {

  // ✅ DYNAMIC MENU ITEMS
  @Input()
  items: any[] = [

    {
      id: 'merchantaccount',
      label: 'Merchant Account'
    },

    {
      id: 'editprofile',
      label: 'Edit Profile'
    },

    {
      id: 'contactinformation',
      label: 'Contact Information'
    },

    {
      id: 'marketinginformation',
      label: 'Marketing Information'
    },

    {
      id: 'financeinformation',
      label: 'Finance Information'
    },

    {
      id: 'operations',
      label: 'Operations'
    },

    {
      id: 'reportformat',
      label: 'Report Format'
    },

    {
      id: 'vatregistration',
      label: 'VAT Registration'
    }
  ];

  @Output()
  menuChanged =
    new EventEmitter<string>();

  activeId = '';

  onMenuClick(menuId: string) {

    this.activeId = menuId;

    console.log(
      'Selected Menu:',
      menuId
    );

    this.menuChanged.emit(menuId);
  }
}