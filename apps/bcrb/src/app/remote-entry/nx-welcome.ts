import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcrbHomeComponent } from '../pages/home/bcrb-home.component';
import { BcrbDashboardComponent } from '../pages/dashboard/bcrb-dashboard.component';
import { BcrbReportsComponent } from '../pages/report/bcrb-reports.component';
import { BcrbSidebarComponent } from '../pages/sidebar/bcrb-sidebar.component';
import { BcrbHeaderComponent } from '../pages/header/bcrb-header.component';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, 
            BcrbHomeComponent, 
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

  selectedTab = 'misc';
  showDashboard = false;
  showReports = false;

  onTabChanged(tabId: string) {
    if (tabId === 'bureau') {
      this.showDashboard = true;
    } else {
      this.showDashboard = false;
    }
  }

  onLinkChanged(linkId: string) {
    if (linkId === 'bcrb') {
      this.showReports = true;
    } else {
      this.showReports = false;
    }
  }
}
