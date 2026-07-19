import { Component,ViewEncapsulation } from '@angular/core';

import { CommonModule } from '@angular/common';

import { BcrbDashboardComponent } from '../pages/dashboard/bcrb-dashboard.component';

import { BcrbReportsComponent } from '../pages/report/bcrb-reports.component';

import { BcrbSidebarComponent } from '../pages/sidebar/bcrb-sidebar.component';

import { BcrbHeaderComponent } from '../pages/header/bcrb-header.component';

@Component({
  selector: 'app-nx-welcome',

  standalone: true,

  imports: [
    CommonModule,
    BcrbDashboardComponent,
    BcrbReportsComponent,
    BcrbSidebarComponent,
    BcrbHeaderComponent
  ],

  templateUrl: './remote-entry.html',

  styles: [],

  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {

  showReports = false;

  onLinkChanged(linkId: string): void {

    if (linkId === 'bcrb') {
      this.showReports = true;
    } else {
      this.showReports = false;
    }

  }
}