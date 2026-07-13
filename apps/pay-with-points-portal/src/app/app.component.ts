import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Router,
  NavigationEnd
} from '@angular/router';

import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],

  template: `
    <div class="pwp-standalone">

      <div class="top-bar">
        <span class="top-bar__country">(Change Country)</span>
        <button class="top-bar__logout" (click)="onLogout()">LOG OUT</button>
      </div>

      <div class="header">

        <div class="header__logo">
          <svg
            viewBox="0 0 60 40"
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="36">

            <rect width="60" height="40" fill="#006fcf" rx="2"/>

            <text
              x="50%"
              y="44%"
              dominant-baseline="middle"
              text-anchor="middle"
              fill="white"
              font-family="Arial"
              font-weight="900"
              font-size="10"
              letter-spacing="2">

              AM
            </text>

            <text
              x="50%"
              y="74%"
              dominant-baseline="middle"
              text-anchor="middle"
              fill="white"
              font-family="Arial"
              font-weight="900"
              font-size="10"
              letter-spacing="2">

              EX
            </text>

          </svg>
        </div>

        <nav class="nav">

          <span
            *ngFor="let tab of tabs"
            class="nav__tab"
            [class.nav__tab--active]="activeTab === tab.id"
            (mouseenter)="tab.dropdown ? openDropdown(tab.id) : null"
            (mouseleave)="tab.dropdown ? scheduleClose() : null"
            (click)="!tab.dropdown && onTabClick(tab.id)">

            {{ tab.label }}

            <div
              *ngIf="tab.dropdown && openTab === tab.id"
              class="dropdown"
              (mouseenter)="cancelClose()"
              (mouseleave)="scheduleClose()">

              <div
                *ngFor="let col of tab.dropdown"
                class="dropdown__col">

                <div
                  *ngFor="let item of col"
                  class="dropdown__item"
                  [class.dropdown__item--active]="activeRoute === item.id"
                  (click)="onMenuClick(item); $event.stopPropagation()">

                  {{ item.label }}

                </div>

              </div>

            </div>

          </span>

        </nav>

      </div>

      <div class="breadcrumb" *ngIf="breadcrumb">
        <span>Misc</span>
        <span class="breadcrumb__sep"> › </span>
        <span class="breadcrumb__current">{{ breadcrumb }}</span>
      </div>

      <div class="content">
        <router-outlet></router-outlet>
      </div>

    </div>
  `,

  styles: [`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .pwp-standalone {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      background: #fff;
    }

    .top-bar {
      background: #fff;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 4px 12px;
      border-bottom: 1px solid #ddd;
      gap: 8px;
    }

    .top-bar__country {
      font-size: 11px;
      color: #006fcf;
      cursor: pointer;
    }

    .top-bar__country:hover {
      text-decoration: underline;
    }

    .top-bar__logout {
      background: #1c3f72;
      color: #fff;
      border: none;
      padding: 3px 10px;
      font-size: 11px;
      font-weight: bold;
      cursor: pointer;
    }

    .top-bar__logout:hover {
      background: #003087;
    }

    .header {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      background: #fff;
      border-bottom: 1px solid #ddd;
      gap: 16px;
    }

    .nav {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .nav__tab {
      position: relative;
      color: #006fcf;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 12px;
      white-space: nowrap;
      border-bottom: 2px solid transparent;
      display: inline-block;
      user-select: none;
    }

    .nav__tab:hover {
      text-decoration: underline;
    }

    .nav__tab--active {
      font-weight: bold;
      color: #003087;
      border-bottom: 2px solid #006fcf;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      background: #fff;
      border: 1px solid #ccc;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      z-index: 999;
      min-width: 560px;
      padding: 12px 16px;
      gap: 24px;
    }

    .dropdown__col {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 160px;
    }

    .dropdown__item {
      color: #000;
      font-size: 13px;
      padding: 5px 8px;
      cursor: pointer;
      white-space: nowrap;
      border-radius: 2px;
    }

    .dropdown__item:hover {
      background: #f0f6ff;
      text-decoration: underline;
    }

    .dropdown__item--active {
      background: #e0eeff;
      font-weight: bold;
      color: #003087;
    }

    .breadcrumb {
      padding: 4px 12px;
      font-size: 11px;
      color: #666;
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }

    .breadcrumb__sep {
      color: #999;
    }

    .breadcrumb__current {
      color: #003087;
      font-weight: bold;
    }

    .content {
      flex: 1;
      background: #fff;
      overflow-y: auto;
    }
  `]
})

export class AppComponent implements OnInit, OnDestroy {

  activeTab = 'misc';
  activeRoute = 'pay-with-points';
  openTab = '';
  breadcrumb = 'Select & Pay With Points';

  private closeTimer: any;
  private sub = new Subscription();

  tabs: Array<{
    id: string;
    label: string;
    dropdown?: Array<Array<{ id: string; label: string }>>;
  }> = [
    { id: 'hub', label: 'THE HUB LOGIN' },
    { id: 'mobile', label: 'MOBILE ADM' },

    {
      id: 'misc',
      label: 'MISC',

      dropdown: [
        [
          { id: 'pay-with-points', label: 'Select & Pay With Points' },
          { id: 'digital-wallet', label: 'Digital Wallet' },
          { id: 'wearables', label: 'AMEX Wearables' }
        ],

        [
          { id: 'pin-unblock', label: 'PIN Unblock' },
          { id: 'sms-status', label: 'SMS Status' },
          { id: 'priority-pass', label: 'ENROLL FOR PRIORITY PASS™' }
        ],

        [
          { id: 'valueback', label: 'ValueBack' },
          { id: 'pccm-ftp', label: 'Pccm Ftp Sequence Status' }
        ]
      ]
    },

    { id: 'statements', label: 'STATEMENTS' },
    { id: 'online-account', label: 'ONLINE ACCOUNT SERVICES' },
    { id: 'credit-verifier', label: 'CREDIT VERIFIER' }
  ];

  private readonly routeMap: Record<
    string,
    { path: string; label: string }
  > = {

    'pay-with-points': {
      path: '/pay-with-points',
      label: 'Select & Pay With Points'
    },

    'digital-wallet': {
      path: '/digital-wallet',
      label: 'Digital Wallet'
    },

    'wearables': {
      path: '/wearables',
      label: 'AMEX Wearables'
    },

    'pin-unblock': {
      path: '/pin-unblock',
      label: 'PIN Unblock'
    },

    'sms-status': {
      path: '/sms-status',
      label: 'SMS Status'
    },

    'priority-pass': {
      path: '/priority-pass',
      label: 'Enroll for Priority Pass™'
    },

    'valueback': {
      path: '/valueback',
      label: 'ValueBack'
    },

    'pccm-ftp': {
      path: '/pccm-ftp',
      label: 'Pccm Ftp Sequence Status'
    }
  };

  constructor(private router: Router) {}

//   ngOnInit() {

//   // Runs EVERY time component initialises
//   // No condition check — always navigates
//   this.router.navigate(['/pay-with-points']);

//   // Listens to every navigation event
//   this.router.events
//     .pipe(filter(e => e instanceof NavigationEnd))
//     .subscribe(() => {

//       // Sets active tab
//       this.activeTab = 'misc';

//       // ← FATAL: navigates AGAIN inside the listener
//       this.router.navigate(['/pay-with-points']);
//     });
// }
  ngOnInit(): void {

    this.sub.add(
      this.router.events
        .pipe(
          filter(
            (e): e is NavigationEnd =>
              e instanceof NavigationEnd
          )
        )
        .subscribe((e) => {
          this.syncActiveStateFromUrl(
            e.urlAfterRedirects
          );
        })
    );

    const currentUrl = this.router.url;

    if (currentUrl === '/' || currentUrl === '') {
      this.router.navigate(['/pay-with-points']);
    } else {
      this.syncActiveStateFromUrl(currentUrl);
    }
  }

  private syncActiveStateFromUrl(url: string): void {

    for (const [id, info] of Object.entries(this.routeMap)) {

      if (url.startsWith(info.path)) {

        this.activeTab = 'misc';
        this.activeRoute = id;
        this.breadcrumb = info.label;

        return;
      }
    }

    if (url.startsWith('/hub')) {
      this.activeTab = 'hub';
      this.breadcrumb = '';
    }

    else if (url.startsWith('/mobile')) {
      this.activeTab = 'mobile';
      this.breadcrumb = '';
    }

    else if (url.startsWith('/statements')) {
      this.activeTab = 'statements';
      this.breadcrumb = '';
    }

    else if (url.startsWith('/online')) {
      this.activeTab = 'online-account';
      this.breadcrumb = '';
    }

    else if (url.startsWith('/credit')) {
      this.activeTab = 'credit-verifier';
      this.breadcrumb = '';
    }
  }

  openDropdown(tabId: string): void {
    this.cancelClose();
    this.openTab = tabId;
  }

  scheduleClose(): void {
    this.closeTimer = setTimeout(() => {
      this.openTab = '';
    }, 150);
  }

  cancelClose(): void {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
  }

  onTabClick(id: string): void {
    this.activeTab = id;
    this.openTab = '';
    this.breadcrumb = '';
    this.activeRoute = '';
  }

  onMenuClick(item: { id: string; label: string }): void {

    this.activeTab = 'misc';
    this.openTab = '';

    const mapping = this.routeMap[item.id];

    if (mapping) {

      this.activeRoute = item.id;
      this.breadcrumb = mapping.label;

      this.router.navigate([mapping.path]);
    }
  }

  onLogout(): void {
    localStorage.clear();
    window.location.href = '/';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}