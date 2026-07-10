import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import { AmexTopNavBarComponent }           from '@ui-components/ui';
import { AmexTabBarComponent, AmexTabItem }  from '@ui-components/ui';
import { AmexSidebarMenuComponent }         from '@ui-components/ui';
import { AmexLogoutConfirmationComponent }  from '@ui-components/ui';

/**
 * Standalone mode only (port 4204).
 * Matches document image6/image3/image10 layout exactly:
 *   - amex-top-nav-bar: blue strip (Global Sites | Log Out) + AMEX logo + "ONLS Helper Tool"
 *   - amex-tab-bar: Online Account Services | Supplementary Access Helper | Offers | Benefits
 *   - amex-sidebar-menu: ONLS hatched decorative panel
 *   - router-outlet: page content
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexLogoutConfirmationComponent,
  ],
  template: `
    <div class="onls-shell">
      <amex-top-nav-bar
        portalStyle="onls"
        portalTitle="ONLS Helper Tool"
        (logout)="showLogout = true">
      </amex-top-nav-bar>

      <!-- Document tabs: Online Account Services | Supplementary Access Helper | Offers | Benefits -->
      <amex-tab-bar
        portalStyle="onls"
        [tabs]="tabs"
        [activeTabId]="activeTab"
        (tabClick)="onTabClick($event)">
      </amex-tab-bar>

      <div class="onls-body">
        <amex-sidebar-menu portalStyle="onls"></amex-sidebar-menu>
        <div class="onls-content">
          <router-outlet></router-outlet>
        </div>
      </div>

      <amex-logout-confirmation
        [visible]="showLogout"
        serverLabel="tst-websrv01 says"
        message="Are you sure you want to log out?"
        (confirm)="onLogout()"
        (cancel)="showLogout = false">
      </amex-logout-confirmation>
    </div>
  `,
  styles: [`
    .onls-shell  { display:flex; flex-direction:column; min-height:100vh; font-family:Arial,sans-serif; background:#fff; }
    .onls-body   { display:flex; flex:1; min-height:0; }
    .onls-content{ flex:1; overflow-y:auto; background:#fff; }
  `],
})
export class AppComponent implements OnInit {
  showLogout = false;
  activeTab = 'offers';

  // Exact 4 tabs from document image6
  tabs: AmexTabItem[] = [
    { id: 'account',  label: 'Online Account Services'    },
    { id: 'supp',     label: 'Supplementary Access Helper' },
    { id: 'offers',   label: 'Offers'                     },
    { id: 'benefits', label: 'Benefits'                   },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url: string = e.urlAfterRedirects;
        this.activeTab = url.includes('/benefits') ? 'benefits' : 'offers';
      });
  }

  onTabClick(id: string) {
    this.activeTab = id;
    if (id === 'offers')   this.router.navigate(['/offers']);
    if (id === 'benefits') this.router.navigate(['/offers/benefits']);
  }

  onLogout() {
    this.showLogout = false;
    localStorage.clear();
    window.location.reload();
  }
}
