import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError,
} from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { AuthService } from "./core/services/auth.service";
import { EventBusService } from "./core/services/event-bus.service";
import { SecureFormService } from "./core/services/secure-form.service";
import {
  AmexTabItem,
  AMEX_PORTAL_AUTH_ADAPTER,
} from "@vn-core-ui-components/ui";
import { ShellAuthAdapterService } from "./core/services/shell-auth-adapter.service";

@Component({
  selector: "app-root",
  providers: [
    { provide: AMEX_PORTAL_AUTH_ADAPTER, useExisting: ShellAuthAdapterService },
  ],
  template: `
    <!-- MFE loading indicator — fixed, above everything -->
    <div class="mfe-loading-bar" [class.visible]="mfeLoading"></div>

    <!-- Auth pages (login / forgot-password): no shell chrome -->
    @if (isAuthPage) {
      <router-outlet></router-outlet>
    } @else {
      <!-- ════════════════════════════════════════════════════════════
      SHELL LAYOUT — only rendered when the user is authenticated.
      amex-page-component owns header/sidebar/footer.

      requireAuth="false" here because shell's OWN isAuthPage @if/@else
      already gates this whole branch (user only reaches this branch
      when NOT on /login). Setting requireAuth=true here would show a
      duplicate login modal on top of shell's dedicated /login route.

      healthCheckUrl="" — shell doesn't need the floating health badge;
      that's more useful per-microfrontend (wearables, etc.) where it
      reflects that specific backend's status.
      ════════════════════════════════════════════════════════════ -->
      <amex-page-component
        portalStyle="onls"
        [showCustomHeader]="true"
        [showSidebar]="true"
        [requireAuth]="false"
        healthCheckUrl=""
        footerText="© American Express. All rights reserved."
      >
        <!-- ── Custom header slot ─────────────────────────────── -->
        <div header>
          <!-- Top nav bar: AMEX logo + portal title + logout -->
          <amex-top-nav-bar
            portalStyle="onls"
            portalTitle="ONLS Helper Tool"
            [username]="username"
            (logout)="onLogoutRequest()"
            (menuToggle)="onMenuToggle()"
          >
          </amex-top-nav-bar>

          <!-- Main tab bar -->
          <amex-tab-bar
            portalStyle="onls"
            [tabs]="tabs"
            [activeTabId]="activeTabId"
            [activeSubId]="activeSubId"
            (tabClick)="onTabClick($event)"
            (subClick)="onSubClick($event)"
          >
          </amex-tab-bar>

          <!-- Misc dropdown -->
          @if (activeTabId === "misc" && showSubMenu) {
            <div class="misc-submenu">
              <div class="misc-submenu__inner">
                @for (sub of miscSubItems; track sub) {
                  <span
                    class="misc-submenu__item"
                    [class.misc-submenu__item--active]="activeSubId === sub.id"
                    (click)="onSubClick(sub.id)"
                  >
                    {{ sub.label }}
                  </span>
                }
              </div>
            </div>
          }

          <!-- Breadcrumb — shown when a sub-item is selected and the dropdown is closed -->
          @if (activeTabId === "misc" && activeSubId && !showSubMenu) {
            <div class="misc-breadcrumb">
              <span>Misc</span>
              <span class="misc-breadcrumb__sep"> › </span>
              <span class="misc-breadcrumb__current">{{
                getActiveSubLabel()
              }}</span>
              <span
                class="misc-breadcrumb__change"
                (click)="showSubMenu = true"
              >
                (change)</span
              >
            </div>
          }

          <!-- Centurion dropdown -->
          @if (activeTabId === "centurion" && showSubMenu) {
            <div class="misc-submenu">
              <div class="misc-submenu__inner">
                @for (sub of centurionSubItems; track sub) {
                  <span
                    class="misc-submenu__item"
                    [class.misc-submenu__item--active]="activeSubId === sub.id"
                    (click)="onCenturionSubClick(sub.id)"
                  >
                    {{ sub.label }}
                  </span>
                }
              </div>
            </div>
          }

          <!-- Centurion breadcrumb -->
          @if (activeTabId === "centurion" && activeSubId && !showSubMenu) {
            <div class="misc-breadcrumb">
              <span>Centurion</span>
              <span class="misc-breadcrumb__sep"> › </span>
              <span class="misc-breadcrumb__current">
                {{ getActiveCenturionLabel() }}
              </span>
              <span
                class="misc-breadcrumb__change"
                (click)="showSubMenu = true"
              >
                (change)
              </span>
            </div>
          }
        </div>
        <!-- /header slot -->

        <!-- ── Page content ─────────────────────────────────── -->
        <router-outlet></router-outlet>
      </amex-page-component>
      <!-- /amex-page-component -->
    }

    <!-- Logout confirmation dialog -->
    <amex-logout-confirmation
      [visible]="showLogoutDialog"
      serverLabel="tst-websrv01 says"
      message="Are you sure you want to log out?"
      (confirm)="onLogoutConfirm()"
      (cancel)="showLogoutDialog = false"
    >
    </amex-logout-confirmation>
  `,
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthPage = false;
  mfeLoading = false;
  showLogoutDialog = false;
  showSubMenu = false;
  activeTabId = "bta";
  activeSubId = "";
  username = "";

  private subs = new Subscription();

  // ── Navigation data ───────────────────────────────────────────────

  readonly tabs: AmexTabItem[] = [
    { id: "bta", label: "BTA" },
    { id: "account", label: "Online Account Services" },
    { id: "supp", label: "Supplementary Access Helper" },
    { id: "offers", label: "Offers" },
    { id: "benefits", label: "Benefits" },
    { id: "misc", label: "Misc" },
    { id: "centurion", label: "Centurion" },
    { id: "change-password", label: "Change Password" },
    { id: "statement", label: "Statement" },
    { id: "bcrb", label: "BCRB" },
    { id: "vat-invoice", label: "VAT Invoice" },
  ];

  readonly centurionSubItems: AmexTabItem[] = [
    { id: "centurion-2.0", label: "Centurion 2.0" },
    { id: "Cen-LCY-EXC", label: "Cen LCY EXC" },
  ];

  readonly miscSubItems: AmexTabItem[] = [
    { id: "pay-with-points", label: "Select & Pay With Points" },
    { id: "digital-wallet", label: "Digital Wallet" },
    { id: "wearables", label: "AMEX Wearables" },
    { id: "pin-unblock", label: "PIN Unblock" },
    { id: "sms-status", label: "SMS Status" },
    { id: "priority-pass", label: "ENROLL FOR PRIORITY PASS™" },
    { id: "valueback", label: "ValueBack" },
    { id: "pccm-ftp", label: "Pccm Ftp Sequence Status" },
  ];

  private readonly subRouteMap: Record<string, string> = {
    "pay-with-points": "/pay-with-points",
    "digital-wallet": "/misc/digital-wallet",
    wearables: "/misc/wearables",
    "pin-unblock": "/misc/pin-unblock",
    "sms-status": "/misc/sms-status",
    "priority-pass": "/misc/priority-pass",
    valueback: "/misc/valueback",
    "pccm-ftp": "/misc/pccm-ftp",
  };

  private readonly centurionRouteMap: Record<string, string> = {
    "centurion-2.0": "/centurion/centurion-2.0",
    "Cen-LCY-EXC": "/centurion/cen-lcy-exc",
  };

  constructor(
    private router: Router,
    private auth: AuthService,
    private secureForm: SecureFormService,
    private bus: EventBusService,
  ) { }

  // ── Lifecycle ─────────────────────────────────────────────────────

  ngOnInit(): void {
    this.secureForm.enable();
    // Set immediately from current URL so shell doesn't flash on first paint
    this.isAuthPage = this.checkIsAuthRoute(this.router.url);

    this.username = this.auth.getUser()?.username ?? "";

    this.subs.add(
      this.router.events
        .pipe(
          filter(
            (e) =>
              e instanceof NavigationEnd ||
              e instanceof NavigationStart ||
              e instanceof NavigationCancel ||
              e instanceof NavigationError,
          ),
        )
        .subscribe((e: any) => {
          if (e instanceof NavigationStart) {
            this.mfeLoading = true;
          } else {
            this.mfeLoading = false;
            if (e instanceof NavigationEnd) {
              const url = e.urlAfterRedirects as string;
              this.isAuthPage = this.checkIsAuthRoute(url);
              if (!this.isAuthPage) {
                this.syncFromUrl(url);
              }
            }
          }
        }),
    );

    this.syncFromUrl(this.router.url);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Auth route detection ───────────────────────────────────────────

  /** Returns true for any route that should NOT show the page shell */
  private checkIsAuthRoute(url: string): boolean {
    return (
      url.startsWith("/login") ||
      url.startsWith("/forgot-password") ||
      url === "/" ||
      url === ""
    );
  }

  // ── URL → active tab/sub sync ─────────────────────────────────────

  private syncFromUrl(url: string): void {
    if (url.startsWith("/offers/benefits")) {
      this.activeTabId = "benefits";
      this.activeSubId = "";
      return;
    }
    if (url.startsWith("/offers")) {
      this.activeTabId = "offers";
      this.activeSubId = "";
      return;
    }
    if (url.startsWith("/supp")) {
      this.activeTabId = "supp";
      this.activeSubId = "";
      return;
    }
    if (url.startsWith("/account")) {
      this.activeTabId = "account";
      this.activeSubId = "";
      return;
    }
    if (url.startsWith("/bta")) {
      this.activeTabId = "bta";
      this.activeSubId = "";
      return;
    }
    if (url.startsWith("/bcrb")) {
      this.activeTabId = "bcrb";
      this.activeSubId = "";
      return;
    }
    if (url.startsWith("/change-password")) {
      this.activeTabId = "change-password";
      this.activeSubId = "";
      return;
    }

    if (url.startsWith("/statement")) {
      this.activeTabId = "statement";
      this.activeSubId = "";
      return;
    }

    if (url.startsWith("/vat-invoice")) {
      this.activeTabId = "vat-invoice";
      this.activeSubId = "";
      return;
    }

    // MISC
    for (const [subId, route] of Object.entries(this.subRouteMap)) {
      if (url.startsWith(route)) {
        this.activeTabId = "misc";
        this.activeSubId = subId;
        this.showSubMenu = false;
        return;
      }
    }

    // CENTURION
    for (const [subId, route] of Object.entries(this.centurionRouteMap)) {
      if (url.startsWith(route)) {
        this.activeTabId = "centurion";
        this.activeSubId = subId;
        this.showSubMenu = false;
        return;
      }
    }
  }

  // ── Tab & sub-menu handlers ───────────────────────────────────────

  onTabClick(tabId: string): void {
    if (tabId === "misc" || tabId === "centurion") {
      this.showSubMenu = !this.showSubMenu;
      this.activeTabId = tabId;
      return;
    }
    this.showSubMenu = false;
    this.activeTabId = tabId;
    this.activeSubId = "";

    const routeMap: Record<string, string> = {
      account: "/account",
      supp: "/supp",
      bta: "/bta",
      offers: "/offers",
      benefits: "/offers/benefits",
      "change-password": "/change-password",
      statement: "/statement",
      bcrb: "/bcrb",
      "vat-invoice": "/vat-invoice",
    };
    if (routeMap[tabId]) {
      this.router.navigate([routeMap[tabId]]);
    }
  }

  onSubClick(subId: string): void {
    this.activeSubId = subId;
    this.showSubMenu = false;
    const route = this.subRouteMap[subId];
    if (route) {
      this.router.navigate([route]);
    }
  }

  onCenturionSubClick(subId: string): void {
    this.activeSubId = subId;
    this.showSubMenu = false;

    const route = this.centurionRouteMap[subId];

    if (route) {
      this.router.navigate([route]);
    }
  }

  getActiveSubLabel(): string {
    return (
      this.miscSubItems.find((s) => s.id === this.activeSubId)?.label ?? ""
    );
  }

  getActiveCenturionLabel(): string {
    return (
      this.centurionSubItems.find((s) => s.id === this.activeSubId)?.label ?? ""
    );
  }

  onMenuToggle(): void { }

  // ── Logout ───────────────────────────────────────────────────────

  onLogoutRequest(): void {
    this.showLogoutDialog = true;
  }

  onLogoutConfirm(): void {
    this.showLogoutDialog = false;
    this.bus.emit({ type: "USER_LOGGED_OUT" });
    this.auth.logout();
  }
}
