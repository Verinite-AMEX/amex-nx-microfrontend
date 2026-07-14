import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SessionService, AuthApiService, EnvironmentService } from '@amex/shared-services';
import {
  AmexPageComponent,
  AmexTopNavBarComponent,
  AmexTabBarComponent,
  AmexTabItem
} from '@ui-components/ui';
import { SecureFormService } from './core/services/secure-form.service'; 

interface MenuItem {
  id: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-soc-roc-portal-entry',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AmexPageComponent,
    AmexTopNavBarComponent,
    AmexTabBarComponent
  ],
  template: `

    @if (isPublicPage) {
      <router-outlet></router-outlet>
    }

    @if (!isPublicPage && isDashboardPage) {
      <amex-page-component
        portalStyle="onls"
        [showCustomHeader]="true"
        [showSidebar]="true">

        <div header>
          <amex-top-nav-bar
            portalStyle="onls"
            portalTitle=""
            [username]="loggedInUser"
            (logout)="onLogout()">
          </amex-top-nav-bar>

          <amex-tab-bar
            portalStyle="onls"
            [tabs]="dashboardTabs"
            [activeTabId]="activeDashboardTabId"
            (tabClick)="onDashboardTabClick($event)">
          </amex-tab-bar>
        </div>

        <router-outlet></router-outlet>

      </amex-page-component>
    }

    @if (!isPublicPage && !isDashboardPage) {
      <amex-page-component
        portalStyle="onls"
        [showCustomHeader]="true"
        [showSidebar]="true">

        <div header>
          <amex-top-nav-bar
            portalStyle="onls"
            portalTitle=""
            [username]="loggedInUser"
            (logout)="onLogout()">
          </amex-top-nav-bar>

          <amex-tab-bar
            portalStyle="onls"
            [tabs]="tabs"
            [activeTabId]="activeTabId"
            (tabClick)="onTabClick($event)">
          </amex-tab-bar>

          @if (activeTabId === 'masters' && showSubMenu) {
            <div class="soc-submenu">
              @for (sub of mastersSubItems; track sub.id) {
                <span class="soc-submenu-item" (click)="navigate(sub.route)">{{ sub.label }}</span>
              }
            </div>
          }
          
          
          @if (activeTabId === 'utilities' && showSubMenu) {
            <div class="soc-submenu">
              @for (sub of utilitiesSubItems; track sub.id) {
                <span class="soc-submenu-item" (click)="navigate(sub.route)">{{ sub.label }}</span>
              }
            </div>
          }
          @if (activeTabId === 'reports' && showSubMenu) {
            <div class="soc-submenu">
              @for (sub of reportsSubItems; track sub.id) {
                <span class="soc-submenu-item" (click)="navigate(sub.route)">{{ sub.label }}</span>
              }
            </div>
          }
        </div>

        <router-outlet></router-outlet>

      </amex-page-component>
    }
  `,
  styles: [`
    .soc-submenu {
      background: #eef3f7;
      border-bottom: 1px solid #d9d9d9;
      padding: 12px 24px;
    }
    .soc-submenu-item {
      display: inline-block;
      margin-right: 32px;
      cursor: pointer;
      color: #006fcf;
      font-size: 13px;
    }
    .soc-submenu-item:hover { text-decoration: underline; }
  `]
})
export class AppComponent implements OnInit {

  isPublicPage: boolean = true;
  isDashboardPage: boolean = false;
  loggedInUser: string = '';

  activeTabId = 'masters';
  showSubMenu = false;

  dashboardTabs: AmexTabItem[] = [
    { id: 'valueback', label: 'VALUEBACK' },
    { id: 'soc-roc', label: 'SOC & ROC' }
  ];
  activeDashboardTabId = 'valueback';

  tabs: AmexTabItem[] = [
    { id: 'masters', label: 'MASTERS' },
    { id: 'merchant-data', label: 'MERCHANT DATA' },
    { id: 'socs-rocs', label: "SOC'S & ROC'S" },
    { id: 'utilities', label: 'UTILITIES' },
    { id: 'reports', label: 'REPORTS' },
    { id: 'retrieval', label: 'RETRIEVAL' },
    { id: 'algeria-payment', label: 'ALGERIA PAYMENT' },
    { id: 'payment-register', label: 'PAYMENT REGISTER' }
  ];

  mastersSubItems: MenuItem[] = [
    { id: 'country-master', label: 'Country Master', route: '/masters/country-master' },
    { id: 'currency-master', label: 'Currency Master', route: '/masters/currency-master' }
  ];
 
  utilitiesSubItems: MenuItem[] = [
    { id: 'file-upload', label: 'File Formation and Upload the Data', route: '/utilities/file-formation-upload' },
    { id: 'extract-rejected', label: 'Extract Rejected Items', route: '/utilities/extract-rejected-items' },
    { id: 'retrieval-old', label: 'Retrieval of Old Records and Reports', route: '/utilities/retrieval-old-records' },
    { id: 'download-soc-roc-excel', label: 'Download SOC and ROC Details from Excel', route: '/utilities/download-soc-roc-excel' },
    { id: 'download-multiple-se', label: "Download Multiple SE's", route: '/utilities/download-multiple-se' },
    { id: 'capture-multiple-se', label: "Capture Multiple SE's", route: '/utilities/capture-multiple-se' }
  ];
  reportsSubItems: MenuItem[] = [
    { id: 'currency-report', label: 'Details by Currency', route: '/reports/details-by-currency' },
    { id: 'soc-control', label: 'SOC/Control Report', route: '/reports/soc-control-report' },
    { id: 'rejection-letter', label: 'Rejection Letter', route: '/reports/rejection-letter' },
    { id: 'rejection-details', label: 'Rejection Letter Details', route: '/reports/rejection-letter-details' },
    { id: 'consolidated', label: 'Consolidated Rejection Report', route: '/reports/consolidated-rejection-report' }
  ];

  constructor(
    private router: Router,
    private secureForm: SecureFormService,
    private sessionService: SessionService,
    private authApi: AuthApiService,
    private environmentService: EnvironmentService,
  ) {}

  ngOnInit(): void {
    this.secureForm.enable();
    this.checkRoute(this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkRoute(event.urlAfterRedirects);
      });
  }

  private checkRoute(url: string): void {
    // OLD:
  // this.isPublicPage = url === '/login' || url === '/' || url === '/signup';
  // NEW — '/login' no longer exists in this app
  this.isPublicPage = url === '/signup';
    this.isDashboardPage = url === '/dashboard';
    if (!this.isPublicPage) {
      // OLD:
    // this.loggedInUser = localStorage.getItem('soc_roc_user') || 'User';
    // NEW — read from shared SessionService instead
    this.loggedInUser = this.sessionService.getCurrentUser()?.username || 'User';
    }
  }

  onDashboardTabClick(tabId: string): void {
    this.activeDashboardTabId = tabId;
    if (tabId === 'soc-roc') {
      this.activeTabId = 'masters';
      this.showSubMenu = false;
      this.router.navigateByUrl('/masters/country-master');
    }
  }

  navigate(route: string): void {
    this.router.navigateByUrl(route);
  }

  onTabClick(tabId: string): void {
    if (['masters', 'utilities', 'reports'].includes(tabId)) {
      if (this.activeTabId === tabId) {
        this.showSubMenu = !this.showSubMenu;
      } else {
        this.activeTabId = tabId;
        this.showSubMenu = true;
      }
      return;
    }
    this.showSubMenu = false;
    this.activeTabId = tabId;
    const routeMap: Record<string, string> = {
      'merchant-data': '/merchant-data',      
      'socs-rocs': '/soc-roc-transactions', 
      'retrieval': '/retrieval',
      'algeria-payment': '/algeria-payment',
      'payment-register': '/payment-register'
    };
    if (routeMap[tabId]) this.router.navigateByUrl(routeMap[tabId]);
  }

  onLogout(): void {
    // OLD:
  // localStorage.removeItem('soc_roc_token');
  // localStorage.removeItem('soc_roc_user');
  // this.router.navigateByUrl('/login');

  // NEW — cookie-based logout via AuthApiService
  this.authApi.performLogout().subscribe({
    next: () => this.redirectToLogin(),
    error: () => this.redirectToLogin(),
  });
  }

  private redirectToLogin(): void {
    const returnUrl = encodeURIComponent(window.location.origin + '/');
    window.location.href = `${this.environmentService.getLoginAppUrl()}?returnUrl=${returnUrl}`;
  }
}