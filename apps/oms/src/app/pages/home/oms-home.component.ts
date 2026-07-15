import {
  Component,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexTabBarComponent,
  AmexTabItem
} from '@ui-components/ui';

import {
  OmsAuthService
} from '../../services/auth.service';

@Component({
  selector: 'oms-home',

  standalone: true,

  imports: [
    CommonModule,
    AmexTabBarComponent
  ],

  templateUrl:
    './oms-home.component.html',

})
export class OmsHomeComponent
implements OnInit {

  @Output()
  tabChanged =
    new EventEmitter<string>();

  tabs: AmexTabItem[] = [];

  activeTabId = '';

  constructor(

    private auth:OmsAuthService

  ) {}

  ngOnInit(): void {

    // MERCHANT USER
    if (
      this.auth.isMerchant() || this.auth.isOmsAdmin()
    ) {

      this.tabs = [

        {
          id: 'settlement',
          label: 'Settlement and Submissions'
        },

        {
          id: 'merchantaccount',
          label: 'Merchant Account'
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

    }

    // OMS ADMIN
    // else if (
    //   this.auth.isOmsAdmin()
    // ) {

    //   this.tabs = [

    //     {
    //       id: 'settlement',
    //       label: 'Settlement and Submissions'
    //     },

    //     {
    //       id: 'merchantaccount',
    //       label: 'Merchant Account'
    //     },

    //     {
    //       id: 'subuseradministration',
    //       label: 'Sub User Administration'
    //     },

    //     {
    //       id: 'password',
    //       label: 'Change Your Password'
    //     },

    //     {
    //       id: 'termsandconditions',
    //       label: 'Terms & Conditions'
    //     },

    //     {
    //       id: 'customizedreports',
    //       label: 'Customized Reports'
    //     },

    //     {
    //       id: 'addnewoutlet',
    //       label: 'Add New Outlet'
    //     }

    //   ];

    // }

    // MRM USER
    else if (
      this.auth.isMrmUser()
    ) {

      this.tabs = [

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
          id: 'password',
          label: 'Change Your Password'
        }

      ];

    }

    // OMS SUB USER
    else if (
      this.auth.isOmsSubUser() || this.auth.isOmsVatUser()
    ) {

      this.tabs = [

        {
          id: 'settlement',
          label: 'Settlement and Submissions'
        },

        {
          id: 'merchantaccount',
          label: 'Merchant Account'
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
          id: 'addnewoutlet',
          label: 'Add New Outlet'
        }

      ];

    }

      // // VAT USER
      // else if (
      //   this.auth.isOmsVatUser()
      // ) {

      //   this.tabs = [

      //     {
      //       id: 'settlement',
      //       label: 'Settlement and Submissions'
      //     },

      //     {
      //       id: 'merchantaccount',
      //       label: 'Merchant Account'
      //     },

      //     {
      //       id: 'password',
      //       label: 'Change Your Password'
      //     },

      //     {
      //       id: 'termsandconditions',
      //       label: 'Terms & Conditions'
      //     },

      //     {
      //       id: 'addnewoutlet',
      //       label: 'Add New Outlet'
      //     }

      //   ];

      // }

    console.log(
      'User Tabs:',
      this.tabs
    );

    if (
      this.tabs.length > 0
    ) {

      this.activeTabId =
        this.tabs[0].id;

    }

  }

  onTabClick(
    tabId: string
  ) {

    this.activeTabId =
      tabId;

    console.log(
      'Selected Tab:',
      tabId
    );

    this.tabChanged.emit(
      tabId
    );

  }

}