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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexTopNavBarComponent, AmexNavPortalStyle } from '../navigation/top-nav-bar';
import { AmexTabBarComponent, AmexTabItem } from '../navigation/tab-bar';
import { AmexSidebarMenuComponent, AmexSidebarMenuItem } from '../navigation/sidebar-menu';
import { AmexPageHeaderComponent } from '../navigation/page-header';
import { AmexDashboardMenuBarComponent, AmexMenuBarLink } from '../navigation/dashboard-menu-bar';

/* ============================================================================
   RE-EXPORT ADAPTERS + TOKENS
   Consumers import everything from one place — no breaking change.
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
   BRANDING
============================================================================ */
export interface AmexPortalBrandingConfig {
  theme?: AmexNavPortalStyle;
  portalTitle?: string;
  logoUrl?: string;
  faviconUrl?: string;
}

/* ============================================================================
   HEADER
============================================================================ */
export interface AmexPortalHeaderConfig {
  visible?: boolean;
  /** Priority 1: TemplateRef via [headerTemplate] input. */
  customTemplate?: TemplateRef<unknown>;
  /** Priority 2: Dynamic component rendered via ngComponentOutlet. */
  customComponent?: Type<unknown>;
}

/* ============================================================================
   FOOTER
============================================================================ */
export interface AmexPortalFooterConfig {
  visible?: boolean;
  text?: string;
  customTemplate?: TemplateRef<unknown>;
  /** Priority 2: Dynamic component rendered via ngComponentOutlet. */
  customComponent?: Type<unknown>;
}

/* ============================================================================
   PAGE HEADER BANNER
============================================================================ */
export interface AmexPortalPageHeaderConfig {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

/* ============================================================================
   SIDEBAR
============================================================================ */
export interface AmexPortalSidebarConfig {
  visible?: boolean;
  items?: AmexSidebarMenuItem[];
  activeId?: string;
  customTemplate?: TemplateRef<unknown>;
  /** Priority 2: Dynamic component rendered via ngComponentOutlet. */
  customComponent?: Type<unknown>;
}

/* ============================================================================
   DASHBOARD BAR
============================================================================ */
export interface AmexPortalDashboardConfig {
  visible?: boolean;
  showBureauDropdown?: boolean;
  bureauLabel?: string;
  bureauOptions?: AmexMenuBarLink[];
  activeBureauId?: string;
  links?: AmexMenuBarLink[];
  activeLinkId?: string;
}

/* ============================================================================
   TABS
============================================================================ */
export interface AmexPortalTabsConfig {
  tabs?: AmexTabItem[];
  activeTabId?: string;
  subItems?: AmexTabItem[];
  activeSubId?: string;
}

/* ============================================================================
   ROOT LAYOUT CONFIG
============================================================================ */
export interface AmexPortalLayoutConfig {
  branding?: AmexPortalBrandingConfig;
  header?: AmexPortalHeaderConfig;
  footer?: AmexPortalFooterConfig;
  sidebar?: AmexPortalSidebarConfig;
  dashboard?: AmexPortalDashboardConfig;
  tabs?: AmexPortalTabsConfig;
  pageHeader?: AmexPortalPageHeaderConfig;
  /**
   * Static feature flags.
   * Used by hasFeature() when no FeatureFlagAdapter is provided.
   * Can also be loaded from runtime JSON config.
   */
  features?: Record<string, boolean>;
}

/* ============================================================================
   COMPONENT
============================================================================ */
@Component({
  selector: 'amex-page-shell',
  standalone: true,
  // FIX 1: OnPush — library components must use this.
  // Without it, every ancestor CD cycle re-renders this entire shell.
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexPageHeaderComponent,
    AmexDashboardMenuBarComponent,
  ],
  template: `
    <div class="shell" [attr.data-theme]="resolvedTheme">

      <!-- ══════════════════════════════════════════════════════════════
           APPROACH 4: Template injection for header
           Falls back to approach 2 (ng-content [header]) then
           approach 1/3 (AmexTopNavBar auto-rendered).
      ══════════════════════════════════════════════════════════════ -->
      <header class="shell__header" *ngIf="resolvedHeaderVisible">

        <!-- Priority 1: TemplateRef input -->
        <ng-container
          *ngIf="headerTemplate"
          [ngTemplateOutlet]="headerTemplate"
        >
        </ng-container>

        <!-- Priority 2: ngComponentOutlet (dynamic Type<unknown>) -->
        <ng-container
          *ngIf="!headerTemplate && resolvedHeaderComponent"
        >
          <ng-container
            *ngComponentOutlet="resolvedHeaderComponent"
          >
          </ng-container>
        </ng-container>

        <!-- Priority 3: Content projection slot -->
        <ng-container
          *ngIf="!headerTemplate && !resolvedHeaderComponent && showCustomHeader"
        >
          <ng-content select="[header]"></ng-content>
        </ng-container>

        <!-- Priority 4: Default AMEX nav bar -->
        <ng-container
          *ngIf="!headerTemplate && !resolvedHeaderComponent && !showCustomHeader"
        >
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

      <!-- ============================================================
           TABS
      ============================================================= -->

      <div
        class="shell__tabs"
        *ngIf="resolvedTabs.length && resolvedTheme !== 'bcrb'"
      >
        <amex-tab-bar
          [portalStyle]="resolvedTheme === 'oms' ? 'oms' : 'onls'"
          [tabs]="resolvedTabs"
          [activeTabId]="resolvedActiveTabId"
          [subItems]="resolvedSubItems"
          [activeSubId]="resolvedActiveSubId"
          (tabClick)="handleTabClick($event)"
          (subClick)="subClick.emit($event)"
        >
        </amex-tab-bar>
      </div>

      <!-- ============================================================
           DASHBOARD BAR
      ============================================================= -->

      <div
        class="shell__dashboard-bar"
        *ngIf="resolvedTheme === 'bcrb' && resolvedDashboardVisible"
      >
        <amex-dashboard-menu-bar
          [showBureauDropdown]="resolvedShowBureauDropdown"
          [bureauLabel]="resolvedBureauLabel"
          [bureauOptions]="resolvedBureauOptions"
          [activeBureauId]="resolvedActiveBureauId"
          [links]="resolvedDashboardLinks"
          [activeLinkId]="resolvedActiveDashboardLinkId"
          (bureauChange)="bureauChange.emit($event)"
          (linkClick)="dashboardLinkClick.emit($event)"
        >
        </amex-dashboard-menu-bar>
      </div>

      <!-- ══════════════════════════════════════════════════════════════
           BODY ROW: sidebar + main content
      ══════════════════════════════════════════════════════════════ -->
      <div class="shell__body">

        <!-- ========================================================
             SIDEBAR
        ========================================================= -->

        <aside
          class="shell__sidebar"
          *ngIf="resolvedSidebarVisible"
        >

          <!-- Priority 1: TemplateRef -->
          <ng-container
            *ngIf="sidebarTemplate"
            [ngTemplateOutlet]="sidebarTemplate"
          >
          </ng-container>

          <!-- Priority 2: ngComponentOutlet -->
          <ng-container
            *ngIf="!sidebarTemplate && resolvedSidebarComponent"
          >
            <ng-container
              *ngComponentOutlet="resolvedSidebarComponent"
            >
            </ng-container>
          </ng-container>

          <!-- Priority 3: Content projection slot -->
          <ng-container
            *ngIf="!sidebarTemplate && !resolvedSidebarComponent && showCustomSidebar"
          >
            <ng-content select="[left-nav]"></ng-content>
          </ng-container>

          <!-- Priority 4: Default sidebar menu -->
          <ng-container
            *ngIf="!sidebarTemplate && !resolvedSidebarComponent && !showCustomSidebar"
          >
            <amex-sidebar-menu
              [portalStyle]="
                resolvedTheme === 'bcrb'
                  ? 'bcrb'
                  : resolvedTheme === 'oms'
                    ? 'oms'
                    : 'onls'
              "
              [items]="resolvedSidebarItems"
              [activeId]="resolvedSidebarActiveId"
              (itemClick)="handleSidebarClick($event)"
            >
            </amex-sidebar-menu>
          </ng-container>

        </aside>

        <!-- ── Main content column ─────────────────────────────── -->
        <div class="shell__content">

          <!-- PAGE HEADER -->
          <div
            class="shell__page-header"
            *ngIf="resolvedPageTitle"
          >
            <amex-page-header
              [portalStyle]="resolvedTheme === 'oms' ? 'oms' : 'onls'"
              [title]="resolvedPageTitle"
              [subtitle]="resolvedPageSubtitle"
              [ctaLabel]="resolvedPageCtaLabel"
              (ctaClick)="pageCtaClick.emit()"
            >
            </amex-page-header>
          </div>

          <!-- MAIN CONTENT -->
          <div class="shell__content-body">
            <ng-content></ng-content>
          </div>

        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════════
           FOOTER
      ══════════════════════════════════════════════════════════════ -->
      <footer class="shell__footer" *ngIf="resolvedFooterVisible">

        <!-- Priority 1: TemplateRef -->
        <ng-container
          *ngIf="footerTemplate"
          [ngTemplateOutlet]="footerTemplate"
        >
        </ng-container>

        <!-- Priority 2: ngComponentOutlet -->
        <ng-container
          *ngIf="!footerTemplate && resolvedFooterComponent"
        >
          <ng-container
            *ngComponentOutlet="resolvedFooterComponent"
          >
          </ng-container>
        </ng-container>

        <!-- Priority 3: Content projection slot -->
        <ng-container
          *ngIf="!footerTemplate && !resolvedFooterComponent && showCustomFooter"
        >
          <ng-content select="[footer]"></ng-content>
        </ng-container>

        <!-- Priority 4: Default text footer -->
        <ng-container
          *ngIf="!footerTemplate && !resolvedFooterComponent && !showCustomFooter"
        >
          <div class="shell__footer-default">
            <span class="shell__footer-text">
              {{ resolvedFooterText }}
            </span>
          </div>
        </ng-container>

      </footer>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* ── Root shell container ───────────────────────────────── */
    .shell {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      background: #f4f4f4;
    }

    .shell__header,
    .shell__tabs,
    .shell__dashboard-bar,
    .shell__footer,
    .shell__page-header {
      flex-shrink: 0;
    }

    .shell__body {
      display: flex;
      flex: 1;
      min-height: 0;
    }

    /* ── Sidebar ────────────────────────────────────────────── */
    .shell__sidebar {
      flex-shrink: 0;
    }

    /* ── Main content column ────────────────────────────────── */
    .shell__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
    }

    .shell__page-header {
      flex-shrink: 0;
    }

    .shell__content-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .shell__footer-default {
      background: #fff;
      border-top: 1px solid #d8d8d8;
      padding: 8px 16px;
      text-align: center;
      font-size: 11px;
      color: #777;
    }

    .shell[data-theme="onls"] .shell__content-body { background: #ffffff; }
    .shell[data-theme="oms"]  .shell__content-body { background: #fafafa; }
    .shell[data-theme="bcrb"] .shell__content-body { background: #f6f6f6; }
  `],
})
// FIX 2: implements OnChanges + OnDestroy added for memoization + cleanup.
export class AmexPageShellComponent implements OnInit, OnChanges, OnDestroy {

  /* ==========================================================================
     ROOT CONFIG INPUT
  ========================================================================== */

  @Input() config?: AmexPortalLayoutConfig;

  /* ==========================================================================
     CONVENIENCE INPUTS — map to config internally
     These exist so template consumers don't need to wrap in config object
     for the most common toggles.
  ========================================================================== */

  /**
   * Convenience shortcut for config.header.visible.
   * Ignored when config.header.visible is explicitly set.
   */
  @Input() showHeader?: boolean;

  /**
   * Convenience shortcut for config.footer.visible.
   * Ignored when config.footer.visible is explicitly set.
   */
  @Input() showFooter?: boolean;

  /* ==========================================================================
     LEGACY INPUTS (backward compat)
  ========================================================================== */

  @Input() portalStyle: AmexNavPortalStyle = 'onls';
  @Input() portalTitle?: string;
  @Input() username = '';
  @Input() omsServiceName = 'Merchant Services';
  @Input() footerText?: string;

  /* ==========================================================================
     SLOT CONTROLS
  ========================================================================== */

  @Input() showCustomHeader  = false;
  @Input() showCustomFooter  = false;
  @Input() showCustomSidebar = false;

  /* ==========================================================================
     TEMPLATE REF OVERRIDES
  ========================================================================== */

  @Input() headerTemplate?:  TemplateRef<unknown>;
  @Input() footerTemplate?:  TemplateRef<unknown>;
  @Input() sidebarTemplate?: TemplateRef<unknown>;

  /* ==========================================================================
     LEGACY TAB INPUTS
  ========================================================================== */

  @Input() tabs:        AmexTabItem[] = [];
  @Input() activeTabId  = '';
  @Input() subItems:    AmexTabItem[] = [];
  @Input() activeSubId  = '';

  /* ==========================================================================
     LEGACY SIDEBAR INPUTS
  ========================================================================== */

  @Input() showSidebar     = true;
  @Input() sidebarItems:   AmexSidebarMenuItem[] = [];
  @Input() activeSidebarId = '';

  /* ==========================================================================
     LEGACY PAGE HEADER INPUTS
  ========================================================================== */

  @Input() pageTitle    = '';
  @Input() pageSubtitle = '';
  @Input() pageCtaLabel = '';

  /* ==========================================================================
     LEGACY DASHBOARD INPUTS
  ========================================================================== */

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

  /* ==========================================================================
     ADAPTERS — all optional, each portal provides via DI
  ========================================================================== */

  private readonly authAdapter = inject<AmexPortalAuthAdapter | null>(
    AMEX_PORTAL_AUTH_ADAPTER, { optional: true }
  );

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

  /* ==========================================================================
     RUNTIME CONFIG
     providedIn: 'root' so it's always available — optional: true kept only
     for strict DI safety in unusual test environments.
  ========================================================================== */

  private readonly runtimeConfig = inject(AmexPortalRuntimeConfigService, { optional: true });

  /* ==========================================================================
     CHANGE DETECTOR
     Required to manually mark dirty after async theme changes (OnPush).
  ========================================================================== */

  private readonly cdr = inject(ChangeDetectorRef);

  /* ==========================================================================
     MERGED CONFIG — MEMOIZED
     FIX 3: Previously a plain getter — created a new spread object on every
     change-detection cycle (called 10+ times per tick via resolved* getters).
     Now cached and invalidated only when [config] input actually changes.

     Priority: [config] input > runtime JSON config.
  ========================================================================== */

  private _mergedConfig?: AmexPortalLayoutConfig;

  private get mergedConfig(): AmexPortalLayoutConfig {
    if (!this._mergedConfig) {
      const runtime = (this.runtimeConfig?.getAll() ?? {}) as AmexPortalLayoutConfig;
      this._mergedConfig = { ...runtime, ...this.config };
    }
    return this._mergedConfig;
  }

  /* ==========================================================================
     THEME CLEANUP
     FIX 4: onThemeChange subscriptions must be cleaned up on destroy.
     Adapter returns an optional unsubscribe function.
  ========================================================================== */

  private themeUnsubscribe?: () => void;

  /* ==========================================================================
     LIFECYCLE
  ========================================================================== */

  ngOnInit(): void {

    // Sync username from auth adapter if not explicitly set
    if (this.authAdapter && !this.username) {
      this.username = this.authAdapter.getUsername();
    }

    // Apply theme via theme adapter and subscribe to reactive changes
    if (this.themeAdapter) {
      this.themeAdapter.applyTheme(this.resolvedTheme);

      // Store the cleanup fn returned by onThemeChange (if adapter supports it).
      // This prevents memory leaks when the component is destroyed.
      const unsub = this.themeAdapter.onThemeChange?.((theme: string) => {
        this.themeAdapter!.applyTheme(theme);
        // OnPush: manually mark dirty so the template re-evaluates resolvedTheme.
        this.cdr.markForCheck();
      });

      if (typeof unsub === 'function') {
        this.themeUnsubscribe = unsub;
      }
    }

    // Track initial page view
    this.analyticsAdapter?.trackPageView(
      this.resolvedPageTitle || this.resolvedPortalTitle,
      {
        portal: this.resolvedPortalTitle,
        theme:  this.resolvedTheme,
        user:   this.userContextAdapter?.getUserId() ?? this.resolvedUsername,
      }
    );
  }

  ngOnChanges(): void {
    // FIX 3 (cont): Invalidate the memoized mergedConfig whenever any
    // @Input changes. ngOnChanges fires before the template re-evaluates,
    // so resolved* getters will pick up the fresh merged object.
    this._mergedConfig = undefined;
  }

  ngOnDestroy(): void {
    // FIX 4 (cont): Clean up theme adapter subscription to prevent leaks.
    this.themeUnsubscribe?.();
  }

  /* ==========================================================================
     ACTIONS
  ========================================================================== */

  onLogout(): void {
    this.analyticsAdapter?.trackEvent('portal_logout', { portal: this.resolvedPortalTitle });
    this.authAdapter?.logout();
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
     Priority: FeatureFlagAdapter → config.features → runtime config features
  ========================================================================== */

  hasFeature(flag: string): boolean {
    if (this.featureFlagAdapter) {
      return this.featureFlagAdapter.isEnabled(flag);
    }
    const configFlags = this.mergedConfig.features ?? {};
    if (flag in configFlags) {
      return configFlags[flag];
    }
    const runtimeFlags =
      this.runtimeConfig?.get<Record<string, boolean>>('features') ?? {};
    return runtimeFlags[flag] ?? false;
  }

  /* ==========================================================================
     USER CONTEXT HELPERS
  ========================================================================== */

  hasRole(role: string): boolean {
    return this.userContextAdapter?.hasRole(role) ?? false;
  }

  getUserLocale(): string {
    return this.userContextAdapter?.getLocale() ?? 'en-US';
  }

  /* ==========================================================================
     RESOLVED: BRANDING
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
    return (
      this.mergedConfig.branding?.portalTitle ??
      this.portalTitle ??
      'American Express'
    );
  }

  get resolvedUsername(): string {
    return (
      this.authAdapter?.getUsername() ??
      this.username
    );
  }

  /* ==========================================================================
     RESOLVED: HEADER
     config.header.visible > showHeader convenience input > default true
  ========================================================================== */

  get resolvedHeaderVisible(): boolean {
    if (this.mergedConfig.header?.visible !== undefined) {
      return this.mergedConfig.header.visible;
    }
    return this.showHeader ?? true;
  }

  /** Type<unknown> for ngComponentOutlet. Null = don't use outlet. */
  get resolvedHeaderComponent(): Type<unknown> | null {
    return this.mergedConfig.header?.customComponent ?? null;
  }

  /* ==========================================================================
     RESOLVED: FOOTER
     config.footer.visible > showFooter convenience input > default true
  ========================================================================== */

  get resolvedFooterVisible(): boolean {
    if (this.mergedConfig.footer?.visible !== undefined) {
      return this.mergedConfig.footer.visible;
    }
    return this.showFooter ?? true;
  }

  /** Footer text resolved from config first, then @Input() footerText */
  get resolvedFooterText(): string {
    return (
      this.mergedConfig.footer?.text ??
      this.footerText ??
      '© American Express. All rights reserved.'
    );
  }

  get resolvedFooterComponent(): Type<unknown> | null {
    return this.mergedConfig.footer?.customComponent ?? null;
  }

  /* ==========================================================================
     RESOLVED: SIDEBAR
  ========================================================================== */

  get resolvedSidebarVisible(): boolean {
    return this.mergedConfig.sidebar?.visible ?? this.showSidebar;
  }

  get resolvedSidebarItems(): AmexSidebarMenuItem[] {
    return (
      this.mergedConfig.sidebar?.items ??
      this.navAdapter?.getSidebarItems?.() ??
      this.sidebarItems
    );
  }

  get resolvedSidebarActiveId(): string {
    return this.mergedConfig.sidebar?.activeId ?? this.activeSidebarId;
  }

  get resolvedSidebarComponent(): Type<unknown> | null {
    return this.mergedConfig.sidebar?.customComponent ?? null;
  }

  /* ==========================================================================
     RESOLVED: TABS
  ========================================================================== */

  get resolvedTabs(): AmexTabItem[] {
    return (
      this.mergedConfig.tabs?.tabs ??
      this.navAdapter?.getTabs?.() ??
      this.tabs
    );
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

  /* ==========================================================================
     RESOLVED: PAGE HEADER
  ========================================================================== */

  get resolvedPageTitle(): string {
    return this.mergedConfig.pageHeader?.title ?? this.pageTitle;
  }

  get resolvedPageSubtitle(): string {
    return this.mergedConfig.pageHeader?.subtitle ?? this.pageSubtitle;
  }

  get resolvedPageCtaLabel(): string {
    return this.mergedConfig.pageHeader?.ctaLabel ?? this.pageCtaLabel;
  }

  /* ==========================================================================
     RESOLVED: DASHBOARD
  ========================================================================== */

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
