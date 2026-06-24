// import { Component, Optional, Inject, OnInit, effect, Injector } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   AmexPageComponent,
//   AmexPortalLayoutConfig,
//   AmexTabItem,
//   AmexPortalHealthStatus,
//   AMEX_PORTAL_AUTH_ADAPTER,
// } from '@vn-core-ui-components/ui';
// import { WearablesComponent } from './wearables.component';
// import { WearablesAuthService } from '../core/services/auth.service';
// import { SHELL_HOSTED } from '../core/tokens/shell.token';

// @Component({
//   selector: 'app-wearables-shell-wrapper',
//   standalone: true,
//   imports: [CommonModule, AmexPageComponent, WearablesComponent],
//   providers: [
//     { provide: AMEX_PORTAL_AUTH_ADAPTER, useExisting: WearablesAuthService },
//   ],
//   template: `
//     <amex-page-component
//       portalStyle="onls"
//       portalTitle="ONLS Helper Tool"
//       [config]="shellConfig"
//       [requireAuth]="!isShellHosted"
//       loginRedirectUrl="http://localhost:4200/login"
//       [healthCheckUrl]="healthCheckUrl"
//       [showHealthStatus]="!isShellHosted"
//       (tabClick)="onTabClick($event)"
//       (subClick)="onSubClick($event)"
//       (logout)="onLogout()"
//       (healthCheck)="onHealthCheck($event)"
//     >
//       <app-wearables></app-wearables>
//     </amex-page-component>
//   `,
// })
// export class WearablesShellWrapperComponent implements OnInit {

//   isShellHosted: boolean;

//   constructor(
//     @Optional() @Inject(SHELL_HOSTED) shellHosted: boolean,
//     private readonly authService: WearablesAuthService,
//     private readonly injector: Injector,
//   ) {
//     this.isShellHosted = !!shellHosted;
//   }

//   ngOnInit(): void {
//     /**
//      * SAFETY NET — runs in BOTH shell-hosted and standalone modes.
//      *
//      * AmexPageComponent's loginRedirectUrl gate only re-evaluates inside
//      * ngOnInit/ngOnChanges. If the JWT expires mid-session (user stays on
//      * this page, no new navigation, no @Input changes), that check never
//      * re-fires on its own. This effect watches the auth signal continuously
//      * and redirects the moment it goes false — closing that gap in both
//      * modes, not just shell-hosted.
//      */
//     effect(() => {
//       const authed = this.authService.authenticated();
//       if (!authed) {
//         const loginUrl = this.isShellHosted
//           ? '/login'                            // shell owns login when hosted
//           : 'http://localhost:4200/login';       // standalone — redirect to shell's login page
//         window.location.href = `${loginUrl}?returnUrl=${encodeURIComponent(window.location.pathname)}`;
//       }
//     }, { injector: this.injector });
//   }

//   get healthCheckUrl(): string {
//     return this.isShellHosted ? '' : 'http://localhost:8080/actuator/health';
//   }

//   get shellConfig(): AmexPortalLayoutConfig {
//     if (this.isShellHosted) {
//       return {
//         header:  { visible: false },
//         footer:  { visible: false },
//         sidebar: { visible: false }, // ✅ correct — shell has its own sidebar
//       };
//     }
//     return {
//       header:  { visible: true },
//       footer:  { visible: true, text: '© American Express. All rights reserved.' },
//       sidebar: { visible: true },   // ✅ standalone needs its own sidebar
//     };
//   }

//   tabs: AmexTabItem[] = [
//     { id: 'bta',      label: 'BTA'                        },
//     { id: 'account',  label: 'Online Account Services'     },
//     { id: 'supp',     label: 'Supplementary Access Helper' },
//     { id: 'offers',   label: 'Offers'                      },
//     { id: 'benefits', label: 'Benefits'                    },
//     { id: 'misc',     label: 'Misc'                        },
//   ];

//   miscSubItems: AmexTabItem[] = [
//     { id: 'pay-with-points', label: 'Select & Pay With Points'  },
//     { id: 'digital-wallet',  label: 'Digital Wallet'            },
//     { id: 'wearables',       label: 'AMEX Wearables'            },
//     { id: 'pin-unblock',     label: 'PIN Unblock'               },
//     { id: 'sms-status',      label: 'SMS Status'                },
//     { id: 'priority-pass',   label: 'ENROLL FOR PRIORITY PASS™' },
//     { id: 'valueback',       label: 'ValueBack'                 },
//     { id: 'pccm-ftp',        label: 'Pccm Ftp Sequence Number'  },
//   ];

//   onTabClick(_id: string): void {}
//   onSubClick(_id: string): void {}

//   onLogout(): void {
//     // AmexPageComponent already calls authAdapter.logout() internally
//     // (AMEX_PORTAL_AUTH_ADAPTER -> useExisting: WearablesAuthService)
//     // before emitting this (logout) event — don't call authService.logout()
//     // again here, and don't manually redirect either. The effect() in
//     // ngOnInit watches the auth signal and handles the redirect for both
//     // shell-hosted (-> shell login) and standalone (-> shell login at 4200)
//     // the moment authenticated() flips to false.
//   }

//   onHealthCheck(status: AmexPortalHealthStatus): void {
//     if (status.status === 'DOWN') {
//       console.warn('[WearablesPortal] Backend health check FAILED:', status);
//     }
//   }
// }

import { Component, Optional, Inject, OnInit, effect, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexPageComponent,
  AmexPortalLayoutConfig,
  AmexTabItem,
  AmexPortalHealthStatus,
  AMEX_PORTAL_AUTH_ADAPTER,
} from '@vn-core-ui-components/ui';
import { WearablesComponent } from './wearables.component';
import { WearablesAuthService } from '../core/services/auth.service';
import { SHELL_HOSTED } from '../core/tokens/shell.token';

@Component({
  selector: 'app-wearables-shell-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageComponent, WearablesComponent],
  providers: [
    { provide: AMEX_PORTAL_AUTH_ADAPTER, useExisting: WearablesAuthService },
  ],
  template: `
    <amex-page-component
      portalStyle="onls"
      portalTitle="ONLS Helper Tool"
      [config]="shellConfig"
      [requireAuth]="true"
      loginRedirectUrl=""
      [healthCheckUrl]="healthCheckUrl"
      [showHealthStatus]="!isShellHosted"
      (tabClick)="onTabClick($event)"
      (subClick)="onSubClick($event)"
      (logout)="onLogout()"
      (healthCheck)="onHealthCheck($event)"
    >
      <app-wearables></app-wearables>
    </amex-page-component>
  `,
})
export class WearablesShellWrapperComponent implements OnInit {

  isShellHosted: boolean;

  constructor(
    @Optional() @Inject(SHELL_HOSTED) shellHosted: boolean,
    private readonly authService: WearablesAuthService,
    private readonly injector: Injector,
  ) {
    this.isShellHosted = !!shellHosted;
  }

  ngOnInit(): void {
    /**
     * SAFETY NET — popup mode, mid-session expiry only.
     *
     * effect() always fires once immediately on creation just to capture
     * the CURRENT signal value — that includes the normal "not logged in
     * yet" state on first page load, which is NOT an expiry event and must
     * not trigger a reload (that was causing an infinite reload loop).
     *
     * We skip that first snapshot and only act on a real TRANSITION to
     * unauthenticated afterward (token expiring while the user sits on
     * the page, or an explicit logout) — that's when a reload is actually
     * needed to re-trigger AmexPageComponent's auth check and bring the
     * popup back.
     */
    let firstRun = true;
    effect(() => {
      const authed = this.authService.authenticated();
      if (firstRun) {
        firstRun = false;
        return;
      }
      if (!authed) {
        window.location.reload();
      }
    }, { injector: this.injector });
  }

  get healthCheckUrl(): string {
    return this.isShellHosted ? '' : 'http://localhost:8080/actuator/health';
  }

  get shellConfig(): AmexPortalLayoutConfig {
    if (this.isShellHosted) {
      return {
        header:  { visible: false },
        footer:  { visible: false },
        sidebar: { visible: false }, // ✅ correct — shell has its own sidebar
      };
    }
    return {
      header:  { visible: true },
      footer:  { visible: true, text: '© American Express. All rights reserved.' },
      sidebar: { visible: true },   // ✅ standalone needs its own sidebar
    };
  }

  tabs: AmexTabItem[] = [
    { id: 'bta',      label: 'BTA'                        },
    { id: 'account',  label: 'Online Account Services'     },
    { id: 'supp',     label: 'Supplementary Access Helper' },
    { id: 'offers',   label: 'Offers'                      },
    { id: 'benefits', label: 'Benefits'                    },
    { id: 'misc',     label: 'Misc'                        },
  ];

  miscSubItems: AmexTabItem[] = [
    { id: 'pay-with-points', label: 'Select & Pay With Points'  },
    { id: 'digital-wallet',  label: 'Digital Wallet'            },
    { id: 'wearables',       label: 'AMEX Wearables'            },
    { id: 'pin-unblock',     label: 'PIN Unblock'               },
    { id: 'sms-status',      label: 'SMS Status'                },
    { id: 'priority-pass',   label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'valueback',       label: 'ValueBack'                 },
    { id: 'pccm-ftp',        label: 'Pccm Ftp Sequence Number'  },
  ];

  onTabClick(_id: string): void {}
  onSubClick(_id: string): void {}

  onLogout(): void {
    // AmexPageComponent already calls authAdapter.logout() AND flips its own
    // isAuthenticated signal to false (since requireAuth=true) before
    // emitting this event — the popup reappears on its own. The effect()
    // above will also see this transition and do one reload, which is fine
    // (single reload, not a loop, since firstRun only guards the initial
    // snapshot).
  }

  onHealthCheck(status: AmexPortalHealthStatus): void {
    if (status.status === 'DOWN') {
      console.warn('[WearablesPortal] Backend health check FAILED:', status);
    }
  }
}