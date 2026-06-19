import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';

import {
  AmexPageShellComponent,
  AmexPortalLayoutConfig,
  AMEX_PORTAL_AUTH_ADAPTER,
  AMEX_PORTAL_ANALYTICS_ADAPTER,
  AMEX_PORTAL_NAVIGATION_ADAPTER,
  AMEX_PORTAL_THEME_ADAPTER,
  AMEX_PORTAL_USER_CONTEXT_ADAPTER,
  AMEX_PORTAL_FEATURE_FLAG_ADAPTER,
  type AmexPortalAuthAdapter,
  type AmexPortalAnalyticsAdapter,
  type AmexPortalNavigationAdapter,
  type AmexPortalThemeAdapter,
  type AmexPortalUserContextAdapter,
  type AmexPortalFeatureFlagAdapter,
} from '@vn-core-ui-components/ui';

// ─────────────────────────────────────────────────────────────────────────────
// INNER WRAPPER — ADAPTER INJECTION DEMO
// Needs its own component so Angular DI providers scope correctly.
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-adapter-demo-shell',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent],
  providers: [
    {
      provide: AMEX_PORTAL_AUTH_ADAPTER,
      useValue: {
        getUsername: () => 'john.doe@amex.com',
        logout:      () => console.log('[AuthAdapter] logout'),
      } satisfies AmexPortalAuthAdapter,
    },
    {
      provide: AMEX_PORTAL_ANALYTICS_ADAPTER,
      useValue: {
        trackPageView: (p: string, m: Record<string, unknown>) =>
          console.log('[Analytics] pageView:', p, m),
        trackEvent: (e: string, m: Record<string, unknown>) =>
          console.log('[Analytics] event:', e, m),
      } satisfies AmexPortalAnalyticsAdapter,
    },
    {
      provide: AMEX_PORTAL_NAVIGATION_ADAPTER,
      useValue: {
        onTabClick:     (id: string) => console.log('[Nav] tab:', id),
        onSidebarClick: (id: string) => console.log('[Nav] sidebar:', id),
      } satisfies AmexPortalNavigationAdapter,
    },
    {
      provide: AMEX_PORTAL_THEME_ADAPTER,
      useValue: {
        getTheme:    ()           => 'onls',
        applyTheme:  (t: string)  => console.log('[Theme] applied:', t),
        // onThemeChange not needed here — AmexPageShellComponent handles cleanup internally
      } satisfies AmexPortalThemeAdapter,
    },
    {
      provide: AMEX_PORTAL_USER_CONTEXT_ADAPTER,
      useValue: {
        getUserId: ()          => 'USR-001',
        getRoles:  ()          => ['AGENT', 'VIEWER'],
        hasRole:   (r: string) => ['AGENT', 'VIEWER'].includes(r),
        getLocale: ()          => 'en-AE',
      } satisfies AmexPortalUserContextAdapter,
    },
    {
      provide: AMEX_PORTAL_FEATURE_FLAG_ADAPTER,
      useValue: {
        isEnabled: (f: string) =>
          ({ 'show-beta-reports': true, 'enable-wearables': true, 'new-dashboard-ui': false })[f] ?? false,
        getFlags: () => ({
          'show-beta-reports': true,
          'enable-wearables':  true,
          'new-dashboard-ui':  false,
        }),
      } satisfies AmexPortalFeatureFlagAdapter,
    },
  ],
  template: `
    <amex-page-shell
      portalStyle="onls"
      pageTitle="ADAPTER INJECTION DEMO"
      pageSubtitle="All 6 adapters provided — open console to see tracking"
      [showSidebar]="false"
      [showHeader]="true"
      [showFooter]="true"
      footerText="© American Express — Adapter Demo"
    >
      <div class="demo-content">

        <div class="demo-info-box">
          <strong>Adapter Injection Pattern ✓</strong>
          <br /><br />
          Username resolved from <code>AuthAdapter</code>:
          <strong>john.doe@amex.com</strong>
          <br />
          Analytics fires on load. Check browser console.
        </div>

        <div class="adapter-grid">

          <div class="adapter-row">
            <span class="adapter-token">AMEX_PORTAL_AUTH_ADAPTER</span>
            <span class="adapter-status adapter-status--active">✓ PROVIDED</span>
          </div>

          <div class="adapter-row">
            <span class="adapter-token">AMEX_PORTAL_NAVIGATION_ADAPTER</span>
            <span class="adapter-status adapter-status--active">✓ PROVIDED</span>
          </div>

          <div class="adapter-row">
            <span class="adapter-token">AMEX_PORTAL_THEME_ADAPTER</span>
            <span class="adapter-status adapter-status--active">✓ PROVIDED</span>
          </div>

          <div class="adapter-row">
            <span class="adapter-token">AMEX_PORTAL_ANALYTICS_ADAPTER</span>
            <span class="adapter-status adapter-status--active">✓ PROVIDED</span>
          </div>

          <div class="adapter-row">
            <span class="adapter-token">AMEX_PORTAL_USER_CONTEXT_ADAPTER</span>
            <span class="adapter-status adapter-status--active">✓ PROVIDED</span>
          </div>

          <div class="adapter-row">
            <span class="adapter-token">AMEX_PORTAL_FEATURE_FLAG_ADAPTER</span>
            <span class="adapter-status adapter-status--active">✓ PROVIDED</span>
          </div>

        </div>

        <div class="demo-info-box demo-info-box--blue" style="margin-top:12px">
          Each microfrontend portal provides its own adapter implementations.
          The shell owns <strong>none</strong> of this.
          Use <code>bootstrapPortal(&#123; authAdapter, navAdapter, ... &#125;)</code>
          in your portal's <code>AppModule</code> or <code>bootstrapApplication</code>.
        </div>

      </div>
    </amex-page-shell>
  `,
  styles: [`
    /* FIX 6: :host display + height added so flex parent
       (.shell-demo-wrap) can stretch this component correctly. */
    :host {
      display: block;
      height: 100%;
    }

    .demo-content {
      padding: 16px;
      font-family: Arial, sans-serif;
      font-size: 13px;
      color: #333;
    }

    .demo-info-box {
      background: #fff8e1;
      border: 1px solid #ffe082;
      border-radius: 4px;
      padding: 12px 16px;
      margin-bottom: 12px;
      font-size: 12px;
      color: #5d4037;
      line-height: 1.6;
    }

    .demo-info-box--blue {
      background: #e3f2fd;
      border-color: #90caf9;
      color: #1a237e;
    }

    .adapter-grid {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .adapter-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafafa;
      border: 1px solid #eee;
      border-radius: 3px;
      padding: 6px 10px;
    }

    .adapter-token {
      font-family: monospace;
      font-size: 11px;
      color: #333;
    }

    .adapter-status {
      font-size: 10px;
      font-weight: bold;
      padding: 2px 8px;
      border-radius: 999px;
    }

    .adapter-status--active {
      background: #e8f5e9;
      color: #2e7d32;
    }
  `],
})
class AdapterDemoShellComponent {}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SHOWCASE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-amex-layout-page',
  standalone: true,
  imports: [
    CommonModule,
    ShowcasePageComponent,
    VariantSectionComponent,
    AmexPageShellComponent,
    AdapterDemoShellComponent,
  ],
  template: `
    <app-showcase-page
      title="AMEX Layout · Page Shell"
      description="
        Enterprise-ready configurable page shell supporting:
        ONLS, OMS, and BCRB portals with:
        Input-based rendering,
        Config-driven layouts,
        Content projection,
        Template injection,
        Adapter injection,
        Feature flags,
        Embedded mode,
        and dashboard navigation.
      "
    >

      <!-- ========================================================= -->
      <!-- 1. ONLS — RECOMMENDED COMBINED APPROACH -->
      <!-- ========================================================= -->

      <app-variant-section
        title="1 · ONLS — Recommended Combined Approach"
      >

        <div class="shell-demo-wrap">

          <amex-page-shell
            portalStyle="onls"
            portalTitle="ONLS Helper Tool"
            [tabs]="onlsTabs"
            activeTabId="misc"
            [subItems]="prioritySubNav"
            activeSubId="priority"
            pageTitle="PRIORITY PASS™ ENROLLMENT"
            pageSubtitle="Manage Priority Pass benefit for cardmembers"
            pageCtaLabel="Enroll Now"
            footerText="© American Express. All rights reserved."
            (logout)="onLogout('ONLS')"
            (tabClick)="onTabClick($event)"
            (pageCtaClick)="onCtaClick()"
          >

            <div class="demo-content">

              <div class="demo-info-box">
                ✓ Recommended enterprise usage pattern.
                <br /><br />
                Combines:
                <code>tabs</code>,
                <code>pageTitle</code>,
                content projection,
                CTA actions,
                and automatic ONLS chrome rendering.
              </div>

              <table class="demo-table">
                <thead>
                  <tr>
                    <th>Card Number</th>
                    <th>Card Type</th>
                    <th>Priority Pass Status</th>
                    <th>Enrollment Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XXXX-XXXX-XXXX-1234</td>
                    <td>Gold</td>
                    <td><span class="badge badge--active">Active</span></td>
                    <td>15 Jan 2024</td>
                  </tr>
                  <tr>
                    <td>XXXX-XXXX-XXXX-5678</td>
                    <td>Platinum</td>
                    <td><span class="badge badge--pending">Pending</span></td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>

            </div>

          </amex-page-shell>

        </div>

      </app-variant-section>

      <!-- ========================================================= -->
      <!-- 2. OMS — CONFIG DRIVEN -->
      <!-- ========================================================= -->

      <app-variant-section
        title="2 · OMS — Config Driven Layout"
      >

        <div class="shell-demo-wrap">

          <amex-page-shell
            portalStyle="oms"
            portalTitle="Online Merchant Services"
            [tabs]="omsTabs"
            activeTabId="profile"
            [sidebarItems]="omsSidebar"
            activeSidebarId="profile"
            pageTitle="EDIT YOUR PROFILE"
            pageSubtitle="Update your merchant account details"
            [config]="omsConfig"
            (logout)="onLogout('OMS')"
            (tabClick)="onTabClick($event)"
            (sidebarItemClick)="onSidebarClick($event)"
          >

            <div class="demo-content">

              <div class="demo-info-box demo-info-box--blue">
                OMS portal using <strong>config-driven rendering</strong>.
                <br /><br />
                Footer visibility and text are controlled through <code>[config]</code>.
              </div>

              <div class="demo-form-row">
                <div class="demo-form-field">
                  <label>First Name</label>
                  <input type="text" value="John" readonly />
                </div>
                <div class="demo-form-field">
                  <label>Last Name</label>
                  <input type="text" value="Doe" readonly />
                </div>
              </div>

              <div class="demo-form-row">
                <div class="demo-form-field">
                  <label>Email</label>
                  <input type="text" value="john.doe@example.com" readonly />
                </div>
              </div>

            </div>

          </amex-page-shell>

        </div>

      </app-variant-section>

      <!-- ========================================================= -->
      <!-- 3. BCRB — DASHBOARD LAYOUT -->
      <!-- ========================================================= -->

      <app-variant-section
        title="3 · BCRB — Reports Dashboard"
      >

        <div class="shell-demo-wrap">

          <amex-page-shell
            portalStyle="bcrb"
            portalTitle="BCRB Reports"
            username="ssharaf_onlshelper"
            [showDashboardBar]="true"
            [bureauOptions]="bureauOptions"
            [dashboardLinks]="dashboardLinks"
            activeDashboardLinkId="bcrb"
            [sidebarItems]="bcrbSidebar"
            activeSidebarId="corp-monthly"
            footerText="© American Express — BCRB Reporting"
            (logout)="onLogout('BCRB')"
            (menuToggle)="onMenuToggle()"
            (bureauChange)="onBureauChange($event)"
            (sidebarItemClick)="onSidebarClick($event)"
          >

            <div class="demo-content">

              <strong class="demo-report-title">
                Corporate Monthly Audit Report ( REP-010 )
              </strong>

              <div class="demo-info-box">
                BCRB portal automatically renders:
                <ul>
                  <li>Dashboard menu bar</li>
                  <li>Bureau dropdown</li>
                  <li>Indigo header</li>
                  <li>White report sidebar</li>
                </ul>
              </div>

            </div>

          </amex-page-shell>

        </div>

      </app-variant-section>

      <!-- ========================================================= -->
      <!-- 4. FULL WIDTH / NO SIDEBAR -->
      <!-- ========================================================= -->

      <app-variant-section
        title="4 · No Sidebar — Full Width Content"
      >

        <div class="shell-demo-wrap">

          <amex-page-shell
            portalStyle="oms"
            [tabs]="omsTabs"
            activeTabId="reports"
            [showSidebar]="false"
            pageTitle="CUSTOMIZED REPORTS"
            pageCtaLabel="Request New Report +"
            footerText="© American Express"
          >

            <div class="demo-content">
              <div class="demo-info-box demo-info-box--blue">
                <code>[showSidebar]="false"</code>
                expands the content area to full width.
              </div>
            </div>

          </amex-page-shell>

        </div>

      </app-variant-section>

      <!-- ========================================================= -->
      <!-- 5. CONTENT PROJECTION -->
      <!-- ========================================================= -->

      <app-variant-section
        title="5 · Content Projection — Header/Footer Slots"
      >

        <div class="shell-demo-wrap">

          <amex-page-shell
            portalStyle="onls"
            [showSidebar]="false"
            [showCustomHeader]="true"
            [showCustomFooter]="true"
          >

            <div header class="custom-header-slot">
              <div class="custom-header-logo">AM<br />EX</div>
              <span class="custom-header-title">Custom Projected Header</span>
              <button class="custom-header-logout">Log Out</button>
            </div>

            <div class="demo-content">
              <div class="demo-info-box">
                <strong>Content Projection Example</strong>
                <br /><br />
                Consumer fully owns the header/footer layout using:
                <code>&lt;div header&gt;</code> and <code>&lt;div footer&gt;</code>
              </div>
            </div>

            <div footer class="custom-footer-slot">
              <a href="#">Privacy Policy</a>
              <span>|</span>
              <a href="#">Cookie Policy</a>
              <span>|</span>
              <a href="#">Terms of Service</a>
              <span>|</span>
              <span>© American Express</span>
            </div>

          </amex-page-shell>

        </div>

      </app-variant-section>

      <!-- ========================================================= -->
      <!-- 6. TEMPLATE INJECTION -->
      <!-- ========================================================= -->

      <app-variant-section
        title="6 · Template Injection — TemplateRef Overrides"
      >

        <div class="shell-demo-wrap">

          <amex-page-shell
            portalStyle="bcrb"
            username="ssharaf_onlshelper"
            [headerTemplate]="bcrbHeaderTemplate"
            [showDashboardBar]="true"
            [bureauOptions]="bureauOptions"
            [sidebarItems]="bcrbSidebar"
            activeSidebarId="corp-monthly"
          >

            <div class="demo-content">
              <div class="demo-info-box demo-info-box--blue">
                <strong>Template Injection Example</strong>
                <br /><br />
                Entire shell header replaced using: <code>[headerTemplate]</code>
              </div>
            </div>

          </amex-page-shell>

          <ng-template #bcrbHeaderTemplate>
            <div class="template-header">
              <div class="template-header-left">
                <span class="template-menu-icon">☰</span>
                <span class="template-header-title">BCRB Reports — TemplateRef Header</span>
              </div>
              <span class="template-header-user">User :- ssharaf_onlshelper</span>
            </div>
          </ng-template>

        </div>

      </app-variant-section>

      <!-- ========================================================= -->
      <!-- 7. EMBEDDED MODE -->
      <!-- ========================================================= -->

      <app-variant-section
        title="7 · Embedded Mode — No Header/Footer"
      >

        <div class="shell-demo-wrap shell-demo-wrap--small">

          <amex-page-shell
            portalStyle="onls"
            [showSidebar]="false"
            [config]="embeddedConfig"
            pageTitle="EMBEDDED CONTENT PANEL"
          >

            <div class="demo-content">
              <div class="demo-info-box">
                Embedded shell mode.
                <br /><br />
                Useful when parent applications already provide
                their own navigation chrome.
              </div>
            </div>

          </amex-page-shell>

        </div>

      </app-variant-section>

      <!-- ========================================================= -->
      <!-- 8. ADAPTER INJECTION -->
      <!-- ========================================================= -->

      <app-variant-section
        title="8 · Adapter Injection — All 6 Tokens"
      >

        <div class="shell-demo-wrap">
          <app-adapter-demo-shell></app-adapter-demo-shell>
        </div>

      </app-variant-section>

      <!-- ========================================================= -->
      <!-- 9. FEATURE FLAGS -->
      <!-- ========================================================= -->

      <app-variant-section
        title="9 · Feature Flags — Static Config + Adapter"
      >

        <div class="shell-demo-wrap">

          <amex-page-shell
            portalStyle="onls"
            pageTitle="FEATURE FLAGS"
            pageSubtitle="Flag resolution: Adapter → config.features → runtime JSON"
            [showSidebar]="false"
            [showHeader]="true"
            [showFooter]="true"
            [config]="featureFlagConfig"
          >

            <div class="demo-content">

              <div class="demo-info-box">
                <strong>Static config.features example ✓</strong>
                <br /><br />
                Flags are set in <code>[config].features</code>.
                When a <code>FeatureFlagAdapter</code> is provided via DI,
                it takes full priority over these static values.
              </div>

              <table class="demo-table">
                <thead>
                  <tr>
                    <th>Flag</th>
                    <th>Value in config.features</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let flag of featureFlags">
                    <td><code>{{ flag.key }}</code></td>
                    <td><code>{{ flag.value }}</code></td>
                    <td>
                      <span
                        class="badge"
                        [class.badge--active]="flag.value"
                        [class.badge--pending]="!flag.value"
                      >
                        {{ flag.value ? '✓ ENABLED' : '✗ DISABLED' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="demo-info-box demo-info-box--blue" style="margin-top:12px">
                <strong>Resolution priority:</strong><br />
                <code>FeatureFlagAdapter.isEnabled()</code>
                → <code>config.features[flag]</code>
                → <code>runtimeConfig.features[flag]</code>
                → <code>false</code>
              </div>

            </div>

          </amex-page-shell>

        </div>

      </app-variant-section>

    </app-showcase-page>
  `,

  styles: [`
    .shell-demo-wrap {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      height: 420px;
      display: flex;
      flex-direction: column;
      background: #fff;
    }

    .shell-demo-wrap--small {
      height: 220px;
    }

    .shell-demo-wrap amex-page-shell,
    .shell-demo-wrap app-adapter-demo-shell {
      flex: 1;
      min-height: 0;
      display: block;
    }

    /* =========================================================
       CONTENT
    ========================================================= */

    .demo-content {
      padding: 16px;
      font-family: Arial, sans-serif;
      font-size: 13px;
      color: #333;
    }

    .demo-info-box {
      background: #fff8e1;
      border: 1px solid #ffe082;
      border-radius: 4px;
      padding: 12px 16px;
      margin-bottom: 16px;
      font-size: 12px;
      color: #5d4037;
      line-height: 1.6;
    }

    .demo-info-box--blue {
      background: #e3f2fd;
      border-color: #90caf9;
      color: #1a237e;
    }

    .demo-report-title {
      display: block;
      margin-bottom: 10px;
      font-size: 14px;
    }

    /* =========================================================
       TABLE
    ========================================================= */

    .demo-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }

    .demo-table th {
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
      padding: 8px 10px;
      text-align: left;
      font-weight: bold;
      color: #333;
    }

    .demo-table td {
      border-bottom: 1px solid #eee;
      padding: 8px 10px;
      color: #555;
    }

    /* =========================================================
       BADGES
    ========================================================= */

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: bold;
    }

    .badge--active {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .badge--pending {
      background: #ffebee;
      color: #c62828;
    }

    /* =========================================================
       FORM
    ========================================================= */

    .demo-form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 12px;
    }

    .demo-form-field {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .demo-form-field label {
      font-size: 11px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .demo-form-field input {
      border: 1px solid #ccc;
      border-radius: 2px;
      padding: 6px 10px;
      background: #fafafa;
      font-size: 13px;
      font-family: Arial, sans-serif;
    }

    /* =========================================================
       CUSTOM PROJECTED HEADER
    ========================================================= */

    .custom-header-slot {
      background: #006fcf;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
    }

    .custom-header-logo {
      background: #fff;
      color: #006fcf;
      width: 36px;
      height: 36px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 900;
      line-height: 1.1;
      text-align: center;
    }

    .custom-header-title {
      color: #fff;
      font-size: 15px;
      font-weight: bold;
    }

    .custom-header-logout {
      margin-left: auto;
      border: none;
      background: #fff;
      color: #006fcf;
      padding: 4px 12px;
      font-size: 11px;
      cursor: pointer;
      border-radius: 2px;
    }

    /* =========================================================
       CUSTOM FOOTER
    ========================================================= */

    .custom-footer-slot {
      background: #fff;
      border-top: 1px solid #d8d8d8;
      padding: 8px 16px;
      display: flex;
      justify-content: center;
      gap: 10px;
      font-size: 11px;
      color: #888;
    }

    .custom-footer-slot a {
      color: #006fcf;
      text-decoration: none;
    }

    .custom-footer-slot a:hover {
      text-decoration: underline;
    }

    /* =========================================================
       TEMPLATE HEADER
    ========================================================= */

    .template-header {
      background: #3d4dac;
      height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .template-header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .template-menu-icon {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }

    .template-header-title {
      color: #fff;
      font-size: 15px;
      font-weight: bold;
    }

    .template-header-user {
      color: #fff;
      font-size: 13px;
    }
  `],
})
export class AmexLayoutPageComponent {

  /* =========================================================
     ONLS
  ========================================================= */

  readonly onlsTabs = [
    { id: 'statements',  label: 'Statements' },
    { id: 'misc',        label: 'MISC' },
    { id: 'centralstmt', label: 'Central Statements' },
  ];

  readonly prioritySubNav = [
    { id: 'priority',  label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'supp',      label: 'Supplementary Access' },
    { id: 'wallet',    label: 'Digital Wallet' },
    { id: 'wearables', label: 'Wearables' },
  ];

  /* =========================================================
     OMS
  ========================================================= */

  readonly omsTabs = [
    { id: 'profile',  label: 'EDIT YOUR PROFILE' },
    { id: 'merchant', label: 'MERCHANT ACCOUNTS' },
    { id: 'reports',  label: 'REPORTS' },
    { id: 'vat',      label: 'VAT INVOICE' },
    { id: 'admin',    label: 'MRM ADMIN' },
  ];

  readonly omsSidebar = [
    { id: 'settlement', label: 'Settlement & Submissions' },
    { id: 'profile',    label: 'Edit Profile' },
    { id: 'merchants',  label: 'Merchant Accounts' },
    { id: 'contact',    label: 'Contact Information' },
    { id: 'vat',        label: 'VAT Registration' },
  ];

  readonly omsConfig: AmexPortalLayoutConfig = {
    header: { visible: true },
    footer: { visible: true, text: '© American Express — Online Merchant Services Portal' },
  };

  /* =========================================================
     BCRB
  ========================================================= */

  readonly bcrbSidebar = [
    { id: 'consumer-monthly', label: 'Consumer Monthly Audit Report' },
    { id: 'corp-monthly',     label: 'Corporate Monthly Audit Report' },
    { id: 'consumer-data',    label: 'Consumer Data Audit Report' },
    { id: 'corp-data',        label: 'Corporate Data Audit Report' },
    { id: 'consumer-full',    label: 'Consumer Full Report' },
    { id: 'consumer-history', label: 'Consumer History Report' },
    { id: 'corp-history',     label: 'Corporate History Report' },
  ];

  readonly bureauOptions = [
    { id: 'aecb',  label: 'AECB' },
    { id: 'simah', label: 'SIMAH' },
  ];

  readonly dashboardLinks = [
    { id: 'bcrb',       label: 'BCRB Reports' },
    { id: 'aecb-alert', label: 'AECB Alert' },
    { id: 'aecb-scrub', label: 'AECB Scrub' },
  ];

  /* =========================================================
     EMBEDDED CONFIG
  ========================================================= */

  readonly embeddedConfig: AmexPortalLayoutConfig = {
    header: { visible: false },
    footer: { visible: false },
  };

  /* =========================================================
     FEATURE FLAGS CONFIG
  ========================================================= */

  readonly featureFlagConfig: AmexPortalLayoutConfig = {
    header: { visible: true },
    footer: { visible: true },
    features: {
      'show-beta-reports': true,
      'enable-wearables':  true,
      'new-dashboard-ui':  false,
      'legacy-mode':       false,
    },
  };

  readonly featureFlags = [
    { key: 'show-beta-reports', value: true  },
    { key: 'enable-wearables',  value: true  },
    { key: 'new-dashboard-ui',  value: false },
    { key: 'legacy-mode',       value: false },
  ];

  /* =========================================================
     EVENTS
  ========================================================= */

  onLogout(portal: string):   void { console.log('[PageShell] logout — portal:', portal); }
  onTabClick(tabId: string):  void { console.log('[PageShell] tab clicked:', tabId); }
  onSidebarClick(id: string): void { console.log('[PageShell] sidebar clicked:', id); }
  onCtaClick():               void { console.log('[PageShell] CTA clicked'); }
  onMenuToggle():             void { console.log('[PageShell] menu toggled'); }
  onBureauChange(id: string): void { console.log('[PageShell] bureau changed:', id); }
}