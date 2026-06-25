// libs/ui/src/lib/amex/layout/page-component.ts
// RENAMED FROM: page-shell.ts
// SELECTOR RENAMED: amex-page-shell → amex-page-component

import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  inject,
  OnInit,
  OnChanges,
  OnDestroy,
  Type,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  computed,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of, timeout } from 'rxjs';
import { AmexTopNavBarComponent, AmexNavPortalStyle } from '../navigation/top-nav-bar';
import { AmexTabBarComponent, AmexTabItem } from '../navigation/tab-bar';
import { AmexSidebarMenuComponent, AmexSidebarMenuItem } from '../navigation/sidebar-menu';
import { AmexPageHeaderComponent } from '../navigation/page-header';
import { AmexDashboardMenuBarComponent, AmexMenuBarLink } from '../navigation/dashboard-menu-bar';
import { AmexLoginModalComponent } from './login-modal.component';

/* ============================================================================
   RE-EXPORT ADAPTERS + TOKENS
============================================================================ */
export type {
  AmexPortalAuthAdapter,
  AmexPortalNavigationAdapter,
  AmexPortalThemeAdapter,
  AmexPortalAnalyticsAdapter,
  AmexPortalUserContextAdapter,
  AmexPortalFeatureFlagAdapter,
} from './adapters';

export {
  AMEX_PORTAL_AUTH_ADAPTER,
  AMEX_PORTAL_NAVIGATION_ADAPTER,
  AMEX_PORTAL_THEME_ADAPTER,
  AMEX_PORTAL_ANALYTICS_ADAPTER,
  AMEX_PORTAL_USER_CONTEXT_ADAPTER,
  AMEX_PORTAL_FEATURE_FLAG_ADAPTER,
} from './adapters';

export { bootstrapPortal } from './portal-bootstrap';
export type { PortalBootstrapOptions } from './portal-bootstrap';
export { AmexPortalRuntimeConfigService, providePortalRuntimeConfig } from './runtime-config';

import {
  AMEX_PORTAL_AUTH_ADAPTER,
  AmexPortalAuthAdapter,
  AMEX_PORTAL_NAVIGATION_ADAPTER,
  AmexPortalNavigationAdapter,
  AMEX_PORTAL_THEME_ADAPTER,
  AmexPortalThemeAdapter,
  AMEX_PORTAL_ANALYTICS_ADAPTER,
  AmexPortalAnalyticsAdapter,
  AMEX_PORTAL_USER_CONTEXT_ADAPTER,
  AmexPortalUserContextAdapter,
  AMEX_PORTAL_FEATURE_FLAG_ADAPTER,
  AmexPortalFeatureFlagAdapter,
} from './adapters';

import { AmexPortalRuntimeConfigService } from './runtime-config';

/* ============================================================================
   HEALTH CHECK CONFIG
   Portals can override the health check URL via [healthCheckUrl] input.
   Default: hits the api-gateway actuator health at port 8080.
============================================================================ */
export interface AmexPortalHealthStatus {
  status: 'UP' | 'DOWN' | 'CHECKING' | 'SKIPPED';
  checkedAt?: Date;
  responseMs?: number;
}

/* ============================================================================
   AUTH GUARD CONFIG
   When [requireAuth]="true", the PageComponent renders a login modal
   instead of its content if the auth adapter reports !isAuthenticated().

   When [loginRedirectUrl] is ALSO set, the modal is skipped entirely and
   the browser is redirected to that URL (with ?returnUrl=...) instead.
   Use this when a portal wants ITS OWN custom login page instead of the
   built-in modal (e.g. wearables redirecting to shell's /login).
============================================================================ */
export interface AmexPortalBrandingConfig {
  theme?: AmexNavPortalStyle;
  portalTitle?: string;
  logoUrl?: string;
  faviconUrl?: string;
}

export interface AmexPortalHeaderConfig {
  visible?: boolean;
  customTemplate?: TemplateRef<unknown>;
  customComponent?: Type<unknown>;
}

export interface AmexPortalFooterConfig {
  visible?: boolean;
  text?: string;
  customTemplate?: TemplateRef<unknown>;
  customComponent?: Type<unknown>;
}

export interface AmexPortalPageHeaderConfig {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export interface AmexPortalSidebarConfig {
  visible?: boolean;
  items?: AmexSidebarMenuItem[];
  activeId?: string;
  customTemplate?: TemplateRef<unknown>;
  customComponent?: Type<unknown>;
}

export interface AmexPortalDashboardConfig {
  visible?: boolean;
  showBureauDropdown?: boolean;
  bureauLabel?: string;
  bureauOptions?: AmexMenuBarLink[];
  activeBureauId?: string;
  links?: AmexMenuBarLink[];
  activeLinkId?: string;
}

export interface AmexPortalTabsConfig {
  tabs?: AmexTabItem[];
  activeTabId?: string;
  subItems?: AmexTabItem[];
  activeSubId?: string;
}

export interface AmexPortalLayoutConfig {
  branding?: AmexPortalBrandingConfig;
  header?: AmexPortalHeaderConfig;
  footer?: AmexPortalFooterConfig;
  sidebar?: AmexPortalSidebarConfig;
  dashboard?: AmexPortalDashboardConfig;
  tabs?: AmexPortalTabsConfig;
  pageHeader?: AmexPortalPageHeaderConfig;
  features?: Record<string, boolean>;
}

/* ============================================================================
   COMPONENT
============================================================================ */
@Component({
  selector: 'amex-page-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexPageHeaderComponent,
    AmexDashboardMenuBarComponent,
    AmexLoginModalComponent,
  ],
  template: `
    <div class="shell" [attr.data-theme]="resolvedTheme">

      <!-- ══════════════════════════════════════════════════════════════
           AUTH GATE — MODAL VARIANT
           Shows the built-in login modal when requireAuth=true,
           user is not authenticated, AND no loginRedirectUrl is set.
      ══════════════════════════════════════════════════════════════ -->
      <ng-container *ngIf="requireAuth && !isAuthenticated() && !loginRedirectUrl">
          <amex-login-modal
            [portalTitle]="resolvedPortalTitle"
            [portalStyle]="resolvedTheme"
            [loginUrl]="loginUrl || ''"
            (loginSuccess)="onLoginSuccess($event)"
          ></amex-login-modal>
      </ng-container>

      <!-- ══════════════════════════════════════════════════════════════
           AUTH GATE — REDIRECT VARIANT
           When loginRedirectUrl IS set, skip the modal entirely and show
           a minimal "redirecting" state while the browser navigates away
           to the portal's own custom login page (see _redirectToCustomLoginIfConfigured).
      ══════════════════════════════════════════════════════════════ -->
      <ng-container *ngIf="requireAuth && !isAuthenticated() && loginRedirectUrl">
        <div class="shell__redirecting">
          <div class="shell__redirecting-spinner"></div>
          <span>Redirecting to login…</span>
        </div>
      </ng-container>

      <!-- ══════════════════════════════════════════════════════════════
           HEALTH BADGE (dev/staging only — hidden in production unless
           showHealthStatus=true is explicitly passed)
      ══════════════════════════════════════════════════════════════ -->
      <div
        class="shell__health-badge"
        *ngIf="showHealthStatus && healthStatus().status !== 'SKIPPED'"
        [class.shell__health-badge--up]="healthStatus().status === 'UP'"
        [class.shell__health-badge--down]="healthStatus().status === 'DOWN'"
        [class.shell__health-badge--checking]="healthStatus().status === 'CHECKING'"
        [title]="'Service health: ' + healthStatus().status + (healthStatus().responseMs ? ' (' + healthStatus().responseMs + 'ms)' : '')"
      >
        <span class="shell__health-dot"></span>
        <span class="shell__health-label">{{ healthStatus().status }}</span>
      </div>

      <!-- ══════════════════════════════════════════════════════════════
           MAIN SHELL — only rendered when authenticated (or auth not required)
      ══════════════════════════════════════════════════════════════ -->
      <ng-container *ngIf="!requireAuth || isAuthenticated()">

        <!-- HEADER -->
        <header class="shell__header" *ngIf="resolvedHeaderVisible">
          <ng-container *ngIf="headerTemplate" [ngTemplateOutlet]="headerTemplate"></ng-container>
          <ng-container *ngIf="!headerTemplate && resolvedHeaderComponent">
            <ng-container *ngComponentOutlet="resolvedHeaderComponent"></ng-container>
          </ng-container>
          <ng-container *ngIf="!headerTemplate && !resolvedHeaderComponent && showCustomHeader">
            <ng-content select="[header]"></ng-content>
          </ng-container>
          <ng-container *ngIf="!headerTemplate && !resolvedHeaderComponent && !showCustomHeader">
            <amex-top-nav-bar
              [portalStyle]="resolvedTheme"
              [portalTitle]="resolvedPortalTitle"
              [username]="resolvedUsername"
              [omsServiceName]="omsServiceName"
              (logout)="onLogout()"
              (menuToggle)="menuToggle.emit()">
            </amex-top-nav-bar>
          </ng-container>
        </header>

        <!-- TABS -->
        <div class="shell__tabs" *ngIf="resolvedTabs.length && resolvedTheme !== 'bcrb'">
          <amex-tab-bar
            [portalStyle]="resolvedTheme === 'oms' ? 'oms' : 'onls'"
            [tabs]="resolvedTabs"
            [activeTabId]="resolvedActiveTabId"
            [subItems]="resolvedSubItems"
            [activeSubId]="resolvedActiveSubId"
            (tabClick)="handleTabClick($event)"
            (subClick)="subClick.emit($event)">
          </amex-tab-bar>
        </div>

        <!-- DASHBOARD BAR -->
        <div class="shell__dashboard-bar" *ngIf="resolvedTheme === 'bcrb' && resolvedDashboardVisible">
          <amex-dashboard-menu-bar
            [showBureauDropdown]="resolvedShowBureauDropdown"
            [bureauLabel]="resolvedBureauLabel"
            [bureauOptions]="resolvedBureauOptions"
            [activeBureauId]="resolvedActiveBureauId"
            [links]="resolvedDashboardLinks"
            [activeLinkId]="resolvedActiveDashboardLinkId"
            (bureauChange)="bureauChange.emit($event)"
            (linkClick)="dashboardLinkClick.emit($event)">
          </amex-dashboard-menu-bar>
        </div>

        <!-- BODY -->
        <div class="shell__body">

          <!-- SIDEBAR -->
          <aside class="shell__sidebar" *ngIf="resolvedSidebarVisible">
            <ng-container *ngIf="sidebarTemplate" [ngTemplateOutlet]="sidebarTemplate"></ng-container>
            <ng-container *ngIf="!sidebarTemplate && resolvedSidebarComponent">
              <ng-container *ngComponentOutlet="resolvedSidebarComponent"></ng-container>
            </ng-container>
            <ng-container *ngIf="!sidebarTemplate && !resolvedSidebarComponent && showCustomSidebar">
              <ng-content select="[left-nav]"></ng-content>
            </ng-container>
            <ng-container *ngIf="!sidebarTemplate && !resolvedSidebarComponent && !showCustomSidebar">
              <amex-sidebar-menu
                [portalStyle]="resolvedTheme === 'bcrb' ? 'bcrb' : resolvedTheme === 'oms' ? 'oms' : 'onls'"
                [items]="resolvedSidebarItems"
                [activeId]="resolvedSidebarActiveId"
                (itemClick)="handleSidebarClick($event)">
              </amex-sidebar-menu>
            </ng-container>
          </aside>

          <!-- MAIN CONTENT -->
          <div class="shell__content">
            <div class="shell__page-header" *ngIf="resolvedPageTitle">
              <amex-page-header
                [portalStyle]="resolvedTheme === 'oms' ? 'oms' : 'onls'"
                [title]="resolvedPageTitle"
                [subtitle]="resolvedPageSubtitle"
                [ctaLabel]="resolvedPageCtaLabel"
                (ctaClick)="pageCtaClick.emit()">
              </amex-page-header>
            </div>
            <div class="shell__content-body">
              <ng-content></ng-content>
            </div>
          </div>

        </div>

        <!-- FOOTER -->
        <footer class="shell__footer" *ngIf="resolvedFooterVisible">
          <ng-container *ngIf="footerTemplate" [ngTemplateOutlet]="footerTemplate"></ng-container>
          <ng-container *ngIf="!footerTemplate && resolvedFooterComponent">
            <ng-container *ngComponentOutlet="resolvedFooterComponent"></ng-container>
          </ng-container>
          <ng-container *ngIf="!footerTemplate && !resolvedFooterComponent && showCustomFooter">
            <ng-content select="[footer]"></ng-content>
          </ng-container>
          <ng-container *ngIf="!footerTemplate && !resolvedFooterComponent && !showCustomFooter">
            <div class="shell__footer-default">
              <span class="shell__footer-text">{{ resolvedFooterText }}</span>
            </div>
          </ng-container>
        </footer>

      </ng-container>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .shell {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      background: #f4f4f4;
      position: relative;
    }

    .shell__header,
    .shell__tabs,
    .shell__dashboard-bar,
    .shell__footer,
    .shell__page-header { flex-shrink: 0; }

    .shell__body { display: flex; flex: 1; min-height: 0; }
    .shell__sidebar { flex-shrink: 0; }
    .shell__content {
      flex: 1; display: flex; flex-direction: column;
      min-width: 0; overflow: hidden;
    }
    .shell__page-header { flex-shrink: 0; }
    .shell__content-body { flex: 1; overflow-y: auto; padding: 16px; }

    .shell__footer-default {
      background: #fff; border-top: 1px solid #d8d8d8;
      padding: 8px 16px; text-align: center; font-size: 11px; color: #777;
    }

    .shell[data-theme="onls"] .shell__content-body { background: #ffffff; }
    .shell[data-theme="oms"]  .shell__content-body { background: #fafafa; }
    .shell[data-theme="bcrb"] .shell__content-body { background: #f6f6f6; }

    /* ── Health badge ── */
    .shell__health-badge {
      position: fixed; bottom: 12px; right: 12px; z-index: 9999;
      display: flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 12px;
      font-size: 11px; font-weight: bold; font-family: Arial, sans-serif;
      box-shadow: 0 1px 4px rgba(0,0,0,0.18);
      pointer-events: none;
    }
    .shell__health-badge--up      { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
    .shell__health-badge--down    { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }
    .shell__health-badge--checking{ background: #fff8e1; color: #f57f17; border: 1px solid #fff176; }
    .shell__health-dot {
      width: 7px; height: 7px; border-radius: 50%; background: currentColor;
    }
    .shell__health-badge--checking .shell__health-dot {
      animation: hb-pulse 1.2s ease-in-out infinite;
    }
    @keyframes hb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }

    /* ── Redirecting state (loginRedirectUrl mode) ── */
    .shell__redirecting {
      position: fixed; inset: 0; z-index: 9999;
      background: #f4f4f4;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 16px; font-family: Arial, sans-serif; color: #555; font-size: 14px;
    }
    .shell__redirecting-spinner {
      width: 32px; height: 32px;
      border: 3px solid #d8d8d8; border-top-color: #006fcf;
      border-radius: 50%;
      animation: shell-redirect-spin 0.8s linear infinite;
    }
    @keyframes shell-redirect-spin { to { transform: rotate(360deg); } }
  `],
})
export class AmexPageComponent implements OnInit, OnChanges, OnDestroy {

  /* ==========================================================================
     ── NEW PRODUCTION INPUTS ──────────────────────────────────────────────
  ========================================================================== */

  /**
   * When true, the component shows a login modal if the auth adapter
   * reports the user is not authenticated.
   * Usage: <amex-page-component [requireAuth]="true">
   */
  @Input() requireAuth = false;

  /**
   * URL for the health check microservice.
   * NO DEFAULT — caller (the real app/portal) must explicitly pass its own
   * api-gateway actuator health endpoint, e.g.:
   *   <amex-page-component healthCheckUrl="http://localhost:8080/actuator/health">
   * Left empty '' by default so the health check never fires unless a
   * portal opts in on purpose. This also guarantees Storybook/demo
   * environments can never accidentally hit a real backend.
   */
  @Input() healthCheckUrl = '';

  /**
   * Show the floating health status badge (useful for dev/staging).
   * Default: false (hidden in production builds).
   */
  @Input() showHealthStatus = false;

  /**
   * When set, AmexPageComponent will NOT show its own login modal.
   * Instead, on unauthenticated state it redirects the browser to this URL
   * (with the current path appended as ?returnUrl=... for post-login redirect).
   *
   * Use case: a portal that wants to redirect to ITS OWN custom login page
   * instead of using the built-in modal (e.g. wearables redirecting to
   * shell's /login page at http://localhost:4200/login).
   *
   * Leave unset (default) to keep the built-in login modal behavior.
   */
  @Input() loginRedirectUrl?: string;
  /**
   * Login endpoint URL passed to amex-login-modal.
   * e.g. 'http://localhost:8080/api/auth/login'
   * Portal provides this via environment config — no hardcode.
   */
  @Input() loginUrl = '';

  /**
   * SAFETY VALVE — when true, the component does NOT perform a real
   * `window.location.href` navigation for loginRedirectUrl. Instead it
   * emits the computed URL via (loginRedirect) and stays put.
   *
   * Use this in Storybook/demos/tests so a redirect demo can NEVER
   * actually navigate the browser tab away to a real running app on
   * the same machine (e.g. another portal on :4200).
   *
   * Real portals leave this `false` (default) so production redirect
   * behavior is completely unchanged.
   */
  @Input() simulateRedirect = false;

  /**
   * Fires whenever a redirect WOULD happen — always fires (both real
   * and simulated paths), so portals/tests can observe it regardless
   * of simulateRedirect.
   */
  @Output() loginRedirect = new EventEmitter<string>();

  /* ==========================================================================
     ROOT CONFIG INPUT
  ========================================================================== */

  @Input() config?: AmexPortalLayoutConfig;

  /* ==========================================================================
     CONVENIENCE INPUTS
  ========================================================================== */

  @Input() showHeader?: boolean;
  @Input() showFooter?: boolean;

  /* ==========================================================================
     LEGACY INPUTS (backward compat)
  ========================================================================== */

  @Input() portalStyle: AmexNavPortalStyle = 'onls';
  @Input() portalTitle?: string;
  @Input() username = '';
  @Input() omsServiceName = 'Merchant Services';
  @Input() footerText?: string;

  @Input() showCustomHeader  = false;
  @Input() showCustomFooter  = false;
  @Input() showCustomSidebar = false;

  @Input() headerTemplate?:  TemplateRef<unknown>;
  @Input() footerTemplate?:  TemplateRef<unknown>;
  @Input() sidebarTemplate?: TemplateRef<unknown>;

  @Input() tabs:        AmexTabItem[] = [];
  @Input() activeTabId  = '';
  @Input() subItems:    AmexTabItem[] = [];
  @Input() activeSubId  = '';

  @Input() showSidebar     = true;
  @Input() sidebarItems:   AmexSidebarMenuItem[] = [];
  @Input() activeSidebarId = '';

  @Input() pageTitle    = '';
  @Input() pageSubtitle = '';
  @Input() pageCtaLabel = '';

  @Input() showDashboardBar      = true;
  @Input() showBureauDropdown    = true;
  @Input() bureauLabel           = 'Bureau';
  @Input() bureauOptions:        AmexMenuBarLink[] = [];
  @Input() activeBureauId        = '';
  @Input() dashboardLinks:       AmexMenuBarLink[] = [];
  @Input() activeDashboardLinkId = '';

  /* ==========================================================================
     EVENTS
  ========================================================================== */

  @Output() logout             = new EventEmitter<void>();
  @Output() menuToggle         = new EventEmitter<void>();
  @Output() tabClick           = new EventEmitter<string>();
  @Output() subClick           = new EventEmitter<string>();
  @Output() sidebarItemClick   = new EventEmitter<string>();
  @Output() pageCtaClick       = new EventEmitter<void>();
  @Output() bureauChange       = new EventEmitter<string>();
  @Output() dashboardLinkClick = new EventEmitter<string>();
  /** Fires when health check completes. Portals can react (e.g. show banner). */
  @Output() healthCheck        = new EventEmitter<AmexPortalHealthStatus>();

  /* ==========================================================================
     ADAPTERS
  ========================================================================== */

  private readonly authAdapter = inject(AMEX_PORTAL_AUTH_ADAPTER, { optional: true }) as (AmexPortalAuthAdapter & {
    isAuthenticated?(): boolean;
    listenToStorageEvents?(d: DestroyRef): void;
  }) | null;

  private readonly destroyRef = inject(DestroyRef);
  private readonly navAdapter = inject<AmexPortalNavigationAdapter | null>(
    AMEX_PORTAL_NAVIGATION_ADAPTER, { optional: true }
  );
  private readonly themeAdapter = inject<AmexPortalThemeAdapter | null>(
    AMEX_PORTAL_THEME_ADAPTER, { optional: true }
  );
  private readonly analyticsAdapter = inject<AmexPortalAnalyticsAdapter | null>(
    AMEX_PORTAL_ANALYTICS_ADAPTER, { optional: true }
  );
  private readonly userContextAdapter = inject<AmexPortalUserContextAdapter | null>(
    AMEX_PORTAL_USER_CONTEXT_ADAPTER, { optional: true }
  );
  private readonly featureFlagAdapter = inject<AmexPortalFeatureFlagAdapter | null>(
    AMEX_PORTAL_FEATURE_FLAG_ADAPTER, { optional: true }
  );

  private readonly runtimeConfig    = inject(AmexPortalRuntimeConfigService, { optional: true });
  private readonly cdr              = inject(ChangeDetectorRef);
  private readonly http             = inject(HttpClient);

  /* ==========================================================================
     STATE — signals
  ========================================================================== */

  /** Reactive auth state — updated by the auth adapter or login success. */
  readonly isAuthenticated = signal<boolean>(false);

  /** Health status of the microservice reported via health check. */
  readonly healthStatus = signal<AmexPortalHealthStatus>({ status: 'CHECKING' });

  /* ==========================================================================
     MEMOIZED CONFIG
  ========================================================================== */

  private _mergedConfig?: AmexPortalLayoutConfig;

  private get mergedConfig(): AmexPortalLayoutConfig {
    if (!this._mergedConfig) {
      const runtime = (this.runtimeConfig?.getAll() ?? {}) as AmexPortalLayoutConfig;
      this._mergedConfig = { ...runtime, ...this.config };
    }
    return this._mergedConfig;
  }

  private themeUnsubscribe?: () => void;

  /* ==========================================================================
     LIFECYCLE
  ========================================================================== */

  ngOnInit(): void {
    // 1. Sync auth — FAIL SAFE: if requireAuth=true and no adapter, default FALSE
    this._syncAuthState();

    // 2. Wire cross-tab storage listener (shell logout → signal updates instantly)
    if (this.authAdapter && 'listenToStorageEvents' in this.authAdapter) {
      this.authAdapter.listenToStorageEvents!(this.destroyRef);
    }

    // 3. Health check
    this._runHealthCheck();

    // 4. Theme
    if (this.themeAdapter) {
      this.themeAdapter.applyTheme(this.resolvedTheme);
      const unsub = this.themeAdapter.onThemeChange?.((theme: string) => {
        this.themeAdapter!.applyTheme(theme);
        this.cdr.markForCheck();
      });
      if (typeof unsub === 'function') this.themeUnsubscribe = unsub;
    }

    // 5. Analytics
    this.analyticsAdapter?.trackPageView(
      this.resolvedPageTitle || this.resolvedPortalTitle,
      { portal: this.resolvedPortalTitle, theme: this.resolvedTheme }
    );
  }

  ngOnChanges(): void {
    this._mergedConfig = undefined;
    this._syncAuthState();
  }

  ngOnDestroy(): void {
    this.themeUnsubscribe?.();
  }

  /* ==========================================================================
     PRIVATE: HEALTH CHECK
     Fires once on init. Calls healthCheckUrl if non-empty.
     Result emitted via (healthCheck) output and stored in healthStatus signal.
  ========================================================================== */

  private _runHealthCheck(): void {
    if (!this.healthCheckUrl) {
      const status: AmexPortalHealthStatus = { status: 'SKIPPED' };
      this.healthStatus.set(status);
      this.healthCheck.emit(status);
      return;
    }

    const start = Date.now();
    this.healthStatus.set({ status: 'CHECKING' });

    this.http
      .get<{ status: string }>(this.healthCheckUrl)
      .pipe(
        timeout(5000),
        catchError(() => of({ status: 'DOWN' }))
      )
      .subscribe(res => {
        const responseMs = Date.now() - start;
        const up = res?.status === 'UP';
        const status: AmexPortalHealthStatus = {
          status: up ? 'UP' : 'DOWN',
          checkedAt: new Date(),
          responseMs,
        };
        this.healthStatus.set(status);
        this.healthCheck.emit(status);
        this.cdr.markForCheck();

        if (!up) {
          console.warn(
            `[AmexPageComponent] Health check FAILED for ${this.healthCheckUrl}`,
            `(${responseMs}ms)`
          );
        }
      });
  }

  /* ==========================================================================
     PRIVATE: SYNC AUTH STATE
  ========================================================================== */

  private _syncAuthState(): void {
    if (!this.requireAuth) {
      // Auth not required → always render content
      this.isAuthenticated.set(true);
      return;
    }

    if (!this.authAdapter) {
      // requireAuth=true but no adapter provided → BLOCK content
      console.warn('[AmexPageComponent] requireAuth=true but no AMEX_PORTAL_AUTH_ADAPTER provided.');
      this.isAuthenticated.set(false);
      this._redirectToCustomLoginIfConfigured();
      return;
    }

    const authed = typeof (this.authAdapter as any).isAuthenticated === 'function'
      ? (this.authAdapter as any).isAuthenticated()
      : !!this.authAdapter.getUsername();

    this.isAuthenticated.set(authed);

    if (!authed) {
      this._redirectToCustomLoginIfConfigured();
    }
  }

  /**
   * If loginRedirectUrl is configured, navigate the browser there
   * (with returnUrl) instead of showing the built-in login modal.
   * No-op if loginRedirectUrl is not set — modal handles it instead.
   */
  private _redirectToCustomLoginIfConfigured(): void {
    if (!this.loginRedirectUrl) return;

    // Build the full target URL.
    // If loginRedirectUrl is a relative path (starts with '/'),
    // prepend window.location.origin automatically.
    // e.g. '/login' → 'http://localhost:4200/login'
    // e.g. 'http://localhost:4200/login' → used as-is
    const fullLoginUrl = this.loginRedirectUrl.startsWith('/')
      ? `${window.location.origin}${this.loginRedirectUrl}`
      : this.loginRedirectUrl;

    // Avoid redirect loop — check both relative and absolute
    const currentHref = window.location.href;
    if (
      currentHref.startsWith(fullLoginUrl) ||
      currentHref.includes(this.loginRedirectUrl)
    ) return;

    const returnUrl  = encodeURIComponent(window.location.pathname + window.location.search);
    const separator  = fullLoginUrl.includes('?') ? '&' : '?';
    const target     = `${fullLoginUrl}${separator}returnUrl=${returnUrl}`;

    this.loginRedirect.emit(target);

    if (this.simulateRedirect) {
      console.log('[AmexPageComponent] simulateRedirect=true — would redirect to:', target);
      return;
    }

    window.location.href = target;
  }

  /* ==========================================================================
     ACTIONS
  ========================================================================== */

  onLoginSuccess(token: string): void {
    // Store token via auth adapter if it supports it, else fallback to localStorage
    if (this.authAdapter && 'onLoginSuccess' in this.authAdapter) {
      (this.authAdapter as any).onLoginSuccess(token);
    } else {
      localStorage.setItem('mfe_access_token', token);
    }
    this.isAuthenticated.set(true);
    this.cdr.markForCheck();
    this.analyticsAdapter?.trackEvent('portal_login_success', { portal: this.resolvedPortalTitle });
  }

  onLogout(): void {
    this.analyticsAdapter?.trackEvent('portal_logout', { portal: this.resolvedPortalTitle });
    this.authAdapter?.logout();
    if (this.requireAuth) {
      this.isAuthenticated.set(false);
      this.cdr.markForCheck();
    }
    this.logout.emit();
  }

  handleTabClick(id: string): void {
    this.navAdapter?.onTabClick?.(id);
    this.analyticsAdapter?.trackEvent('tab_click', { tabId: id });
    this.tabClick.emit(id);
  }

  handleSidebarClick(id: string): void {
    this.navAdapter?.onSidebarClick?.(id);
    this.analyticsAdapter?.trackEvent('sidebar_click', { itemId: id });
    this.sidebarItemClick.emit(id);
  }

  /* ==========================================================================
     FEATURE FLAGS
  ========================================================================== */

  hasFeature(flag: string): boolean {
    if (this.featureFlagAdapter) return this.featureFlagAdapter.isEnabled(flag);
    const configFlags = this.mergedConfig.features ?? {};
    if (flag in configFlags) return configFlags[flag];
    return this.runtimeConfig?.get<Record<string, boolean>>('features')?.[flag] ?? false;
  }

  hasRole(role: string): boolean {
    return this.userContextAdapter?.hasRole(role) ?? false;
  }

  getUserLocale(): string {
    return this.userContextAdapter?.getLocale() ?? 'en-US';
  }

  /* ==========================================================================
     RESOLVED GETTERS
  ========================================================================== */

  get resolvedTheme(): AmexNavPortalStyle {
    return (
      this.themeAdapter?.getTheme() as AmexNavPortalStyle | undefined ??
      this.mergedConfig.branding?.theme ??
      this.portalStyle ??
      'onls'
    );
  }

  get resolvedPortalTitle(): string {
    return this.mergedConfig.branding?.portalTitle ?? this.portalTitle ?? 'American Express';
  }

  get resolvedUsername(): string {
    return this.authAdapter?.getUsername() ?? this.username;
  }

  get resolvedHeaderVisible(): boolean {
    if (this.mergedConfig.header?.visible !== undefined) return this.mergedConfig.header.visible;
    return this.showHeader ?? true;
  }

  get resolvedHeaderComponent(): Type<unknown> | null {
    return this.mergedConfig.header?.customComponent ?? null;
  }

  get resolvedFooterVisible(): boolean {
    if (this.mergedConfig.footer?.visible !== undefined) return this.mergedConfig.footer.visible;
    return this.showFooter ?? true;
  }

  get resolvedFooterText(): string {
    return this.mergedConfig.footer?.text ?? this.footerText ?? '© American Express. All rights reserved.';
  }

  get resolvedFooterComponent(): Type<unknown> | null {
    return this.mergedConfig.footer?.customComponent ?? null;
  }

  get resolvedSidebarVisible(): boolean {
    return this.mergedConfig.sidebar?.visible ?? this.showSidebar;
  }

  get resolvedSidebarItems(): AmexSidebarMenuItem[] {
    return this.mergedConfig.sidebar?.items ?? this.navAdapter?.getSidebarItems?.() ?? this.sidebarItems;
  }

  get resolvedSidebarActiveId(): string {
    return this.mergedConfig.sidebar?.activeId ?? this.activeSidebarId;
  }

  get resolvedSidebarComponent(): Type<unknown> | null {
    return this.mergedConfig.sidebar?.customComponent ?? null;
  }

  get resolvedTabs(): AmexTabItem[] {
    return this.mergedConfig.tabs?.tabs ?? this.navAdapter?.getTabs?.() ?? this.tabs;
  }

  get resolvedActiveTabId(): string {
    return this.mergedConfig.tabs?.activeTabId ?? this.activeTabId;
  }

  get resolvedSubItems(): AmexTabItem[] {
    return this.mergedConfig.tabs?.subItems ?? this.subItems;
  }

  get resolvedActiveSubId(): string {
    return this.mergedConfig.tabs?.activeSubId ?? this.activeSubId;
  }

  get resolvedPageTitle(): string {
    return this.mergedConfig.pageHeader?.title ?? this.pageTitle;
  }

  get resolvedPageSubtitle(): string {
    return this.mergedConfig.pageHeader?.subtitle ?? this.pageSubtitle;
  }

  get resolvedPageCtaLabel(): string {
    return this.mergedConfig.pageHeader?.ctaLabel ?? this.pageCtaLabel;
  }

  get resolvedDashboardVisible(): boolean {
    return this.mergedConfig.dashboard?.visible ?? this.showDashboardBar;
  }

  get resolvedShowBureauDropdown(): boolean {
    return this.mergedConfig.dashboard?.showBureauDropdown ?? this.showBureauDropdown;
  }

  get resolvedBureauLabel(): string {
    return this.mergedConfig.dashboard?.bureauLabel ?? this.bureauLabel;
  }

  get resolvedBureauOptions(): AmexMenuBarLink[] {
    return this.mergedConfig.dashboard?.bureauOptions ?? this.bureauOptions;
  }

  get resolvedActiveBureauId(): string {
    return this.mergedConfig.dashboard?.activeBureauId ?? this.activeBureauId;
  }

  get resolvedDashboardLinks(): AmexMenuBarLink[] {
    return this.mergedConfig.dashboard?.links ?? this.dashboardLinks;
  }

  get resolvedActiveDashboardLinkId(): string {
    return this.mergedConfig.dashboard?.activeLinkId ?? this.activeDashboardLinkId;
  }
}

/* ============================================================================
   BACKWARD COMPAT ALIAS
   Portals importing AmexPageShellComponent still work without refactor.
============================================================================ */
export { AmexPageComponent as AmexPageShellComponent };