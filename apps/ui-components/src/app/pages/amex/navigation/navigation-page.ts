import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexTopNavBarComponent } from '@vn-core-ui-components/ui';
import { AmexTabBarComponent } from '@vn-core-ui-components/ui';
import { AmexSidebarMenuComponent } from '@vn-core-ui-components/ui';
import { AmexPortalHomeTilesComponent } from '@vn-core-ui-components/ui';
import { AmexDashboardMenuBarComponent } from '@vn-core-ui-components/ui';
import { AmexPageHeaderComponent } from '@vn-core-ui-components/ui';
import { AmexBreadcrumbTrailComponent } from '@vn-core-ui-components/ui';
import { AmexLogoutConfirmationComponent } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-amex-navigation-page',
  standalone: true,
  imports: [
    CommonModule,
    ShowcasePageComponent,
    VariantSectionComponent,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexPortalHomeTilesComponent,
    AmexDashboardMenuBarComponent,
    AmexPageHeaderComponent,
    AmexBreadcrumbTrailComponent,
    AmexLogoutConfirmationComponent,
  ],
  template: `
    <app-showcase-page
      title="AMEX Navigation"
      description="8 navigation components matching exact AEME portal screenshots. Includes the missing PortalHomeTiles and DashboardMenuBar."
    >

      <!-- ── 1. TopNavBar ── -->
      <app-variant-section title="1 · TopNavBar">
        <div class="stack">
          <div class="vlabel">ONLS — Hub Login (Global Sites / Log Out strip)</div>
          <amex-top-nav-bar portalStyle="onls" portalTitle="THE HUB LOGIN"></amex-top-nav-bar>

          <div class="vlabel" style="margin-top:16px">ONLS — ONLS Helper Tool (after login)</div>
          <amex-top-nav-bar portalStyle="onls" portalTitle="ONLS Helper Tool"></amex-top-nav-bar>

          <div class="vlabel" style="margin-top:16px">OMS — Online Merchant Services</div>
          <amex-top-nav-bar portalStyle="oms"></amex-top-nav-bar>

          <div class="vlabel" style="margin-top:16px">BCRB — Indigo bar with hamburger + username</div>
          <amex-top-nav-bar portalStyle="bcrb" portalTitle="BCRB Reports" username="ssharaf_onlshelper"></amex-top-nav-bar>
        </div>
      </app-variant-section>

      <!-- ── 2. TabBar ── -->
      <app-variant-section title="2 · TabBar">
        <div class="stack">
          <div class="vlabel">ONLS — Main tabs (MISC active)</div>
          <amex-tab-bar portalStyle="onls" [tabs]="onlsTabs" activeTabId="misc"></amex-tab-bar>

          <div class="vlabel" style="margin-top:12px">ONLS — Main tabs + Sub-row (Priority Pass + Supp Access + Digital Wallet + Wearables)</div>
          <amex-tab-bar portalStyle="onls" [tabs]="onlsTabs" activeTabId="misc"
            [subItems]="prioritySubNav" activeSubId="priority"></amex-tab-bar>

          <div class="vlabel" style="margin-top:12px">ONLS — Wearables sub active</div>
          <amex-tab-bar portalStyle="onls" [tabs]="onlsTabs" activeTabId="misc"
            [subItems]="prioritySubNav" activeSubId="wearables"></amex-tab-bar>

          <div class="vlabel" style="margin-top:12px">ONLS — SOC/ROC portal (SOC'S & ROC'S active)</div>
          <amex-tab-bar portalStyle="onls" [tabs]="socTabs" activeTabId="socroc"></amex-tab-bar>

          <div class="vlabel" style="margin-top:12px">OMS — Gray bar (Edit Your Profile active)</div>
          <amex-tab-bar portalStyle="oms" [tabs]="omsTabs" activeTabId="profile"></amex-tab-bar>

          <div class="vlabel" style="margin-top:12px">OMS — MRM tabs (MRM Users active)</div>
          <amex-tab-bar portalStyle="oms" [tabs]="omsMrmTabs" activeTabId="mrmusers"></amex-tab-bar>
        </div>
      </app-variant-section>

      <!-- ── 3. SidebarMenu ── -->
      <app-variant-section title="3 · SidebarMenu">
        <div class="stack">
          <div class="vlabel">ONLS — Decorative gray hatched panel (all ONLS portal pages)</div>
          <div class="sidebar-demo">
            <amex-sidebar-menu portalStyle="onls"></amex-sidebar-menu>
            <div class="sidebar-demo__content">Page content area goes here</div>
          </div>

          <div class="vlabel" style="margin-top:16px">BCRB — Report list sidebar (Corporate Monthly active)</div>
          <div class="sidebar-demo">
            <amex-sidebar-menu portalStyle="bcrb" [items]="bcrbItems" activeId="corp-monthly"></amex-sidebar-menu>
            <div class="sidebar-demo__content">
              <strong style="font-size:14px;">Corporate Monthly Audit Report ( REP-010 )</strong>
            </div>
          </div>
        </div>
      </app-variant-section>

      <!-- ── 4. PortalHomeTiles ── -->
      <app-variant-section title="4 · PortalHomeTiles (NEW — was missing)">
        <div class="vlabel">All 9 sub-portal tiles shown after Hub Login</div>
        <amex-portal-home-tiles portalTitle="ONLS Helper Tool"></amex-portal-home-tiles>
      </app-variant-section>

      <!-- ── 5. DashboardMenuBar ── -->
      <app-variant-section title="5 · DashboardMenuBar (NEW — was missing)">
        <div class="stack">
          <div class="vlabel">BCRB — Bureau dropdown selector</div>
          <amex-dashboard-menu-bar
            [bureauOptions]="bureauOptions"
            activeBureauId="aecb"
            [links]="[]">
          </amex-dashboard-menu-bar>

          <div class="vlabel" style="margin-top:12px">BCRB — Bureau dropdown + sub-nav links</div>
          <amex-dashboard-menu-bar
            [bureauOptions]="bureauOptions"
            activeBureauId="aecb"
            [links]="bcrbNavLinks"
            activeLinkId="bcrb">
          </amex-dashboard-menu-bar>
        </div>
      </app-variant-section>

      <!-- ── 6. PageHeader ── -->
      <app-variant-section title="6 · PageHeader">
        <div class="stack">
          <div class="vlabel">ONLS — PRIORITY PASS™ ENROLLMENT (dark navy banner)</div>
          <amex-page-header portalStyle="onls" title="PRIORITY PASS™ ENROLLMENT"></amex-page-header>

          <div class="vlabel" style="margin-top:12px">ONLS — Change Password</div>
          <amex-page-header portalStyle="onls" title="Change Password"></amex-page-header>

          <div class="vlabel" style="margin-top:12px">OMS — EDIT YOUR PROFILE (purple rule)</div>
          <amex-page-header portalStyle="oms" title="EDIT YOUR PROFILE"></amex-page-header>

          <div class="vlabel" style="margin-top:12px">OMS — MRM USER ADMINISTRATION</div>
          <amex-page-header portalStyle="oms" title="MRM USER ADMINISTRATION"></amex-page-header>
        </div>
      </app-variant-section>

      <!-- ── 7. BreadcrumbTrail ── -->
      <app-variant-section title="7 · BreadcrumbTrail">
        <div class="stack">
          <div class="vlabel">BCRB — BUREAU > BCRB REPORT > AECB UPLOAD</div>
          <amex-breadcrumb-trail
            [items]="[{id:'bureau',label:'BUREAU'},{id:'bcrb',label:'BCRB REPORT'},{id:'aecb',label:'AECB UPLOAD'}]">
          </amex-breadcrumb-trail>

          <div class="vlabel" style="margin-top:8px">OMS — with Back button</div>
          <amex-breadcrumb-trail
            [items]="[{id:'home',label:'Home'},{id:'profile',label:'Edit Your Profile'},{id:'merchant',label:'Update Merchant Details'}]"
            [showBack]="true">
          </amex-breadcrumb-trail>
        </div>
      </app-variant-section>

      <!-- ── 8. LogoutConfirmation ── -->
      <app-variant-section title="8 · LogoutConfirmation">
        <div class="vlabel">Browser-style dialog (matches ONLS portal screenshot exactly)</div>
        <button class="demo-btn" (click)="showLogout.set(true)">Open Logout Dialog</button>
        <amex-logout-confirmation
          [visible]="showLogout()"
          serverLabel="stg-websrv01 says"
          message="Are you sure you want to log out?"
          (confirm)="showLogout.set(false)"
          (cancel)="showLogout.set(false)">
        </amex-logout-confirmation>
      </app-variant-section>

      <!-- ── Full ONLS Portal Composition ── -->
      <app-variant-section title="Full Portal Composition — ONLS (Priority Pass Enrollment)">
        <div class="portal-preview">
          <amex-top-nav-bar portalStyle="onls" portalTitle="ONLS Helper Tool"></amex-top-nav-bar>
          <amex-tab-bar portalStyle="onls" [tabs]="onlsTabs" activeTabId="misc"
            [subItems]="prioritySubNav" activeSubId="priority"></amex-tab-bar>
          <div class="portal-preview__body">
            <amex-sidebar-menu portalStyle="onls"></amex-sidebar-menu>
            <div class="portal-preview__content">
              <amex-page-header portalStyle="onls" title="PRIORITY PASS™ ENROLLMENT"></amex-page-header>
              <div class="portal-preview__inner">
                <p style="font-size:13px;font-family:Arial,sans-serif;color:#333;margin:0 0 10px">
                  Enter Client Code
                </p>
                <button class="onls-submit-btn">SUBMIT</button>
              </div>
            </div>
          </div>
          <div class="portal-preview__footer">
            <span>American Express Web Site Rules and Regulations | News Centre | Fraud Protection Centre | Trademarks | Privacy Statement</span>
            <span>Copyright &copy; 2009 American Express Company</span>
          </div>
        </div>
      </app-variant-section>

      <!-- ── Full BCRB Portal Composition ── -->
      <app-variant-section title="Full Portal Composition — BCRB Reports">
        <div class="portal-preview">
          <amex-top-nav-bar portalStyle="bcrb" portalTitle="BCRB Reports" username="ssharaf_onlshelper"></amex-top-nav-bar>
          <amex-dashboard-menu-bar [bureauOptions]="bureauOptions" activeBureauId="aecb" [links]="bcrbNavLinks" activeLinkId="bcrb"></amex-dashboard-menu-bar>
          <div class="portal-preview__body">
            <amex-sidebar-menu portalStyle="bcrb" [items]="bcrbItems" activeId="corp-monthly"></amex-sidebar-menu>
            <div class="portal-preview__content">
              <div style="padding:20px;font-family:Arial,sans-serif;">
                <strong>Corporate Monthly Audit Report ( REP-010 )</strong>
                <hr style="border:none;border-top:1px solid #eee;margin:12px 0">
                <p style="font-size:13px;color:#555;">Export to Excel *</p>
              </div>
            </div>
          </div>
        </div>
      </app-variant-section>

    </app-showcase-page>
  `,
  styles: [`
    .stack { display: flex; flex-direction: column; width: 100%; }
    .vlabel { font-size: 11px; color: #888; font-style: italic; margin-bottom: 4px; margin-top: 2px; }

    .sidebar-demo { display: flex; border: 1px solid #ddd; height: 160px; overflow: hidden; }
    .sidebar-demo__content {
      flex: 1; padding: 16px; font-size: 13px;
      font-family: Arial, sans-serif; color: #555;
    }

    .demo-btn {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 5px 18px; font-size: 13px; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 2px;
    }
    .demo-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }

    .portal-preview { border: 1px solid #ccc; overflow: hidden; }
    .portal-preview__body { display: flex; }
    .portal-preview__content { flex: 1; }
    .portal-preview__inner { padding: 16px; }
    .portal-preview__footer {
      background: #fff; border-top: 1px solid #ddd;
      padding: 5px 10px; display: flex;
      justify-content: space-between; font-size: 11px;
      color: #666; font-family: Arial, sans-serif;
    }

    .onls-submit-btn {
      background: linear-gradient(to bottom, #2a84e0, #1462b8);
      color: #fff; border: none; padding: 5px 18px;
      font-family: Arial, sans-serif; font-size: 13px;
      cursor: pointer; border-radius: 2px;
    }
  `],
})
export class AmexNavigationPageComponent {
  showLogout = signal(false);

  onlsTabs = [
    { id:'misc', label:'MISC' }, { id:'oas', label:'ONLINE ACCOUNT SERVICES' },
    { id:'stmt', label:'STATEMENTS' }, { id:'pb', label:'POINT BOOSTER' },
    { id:'cp', label:'CHANGE PASSWORD' }, { id:'bureau', label:'BUREAU' },
    { id:'centurion', label:'CENTURION' }, { id:'vat', label:'VAT INVOICE' },
  ];
  socTabs = [
    { id:'masters', label:'MASTERS' }, { id:'merchant', label:'MERCHANT DATA' },
    { id:'socroc', label:"SOC'S & ROC'S" }, { id:'util', label:'UTILITIES' },
    { id:'reports', label:'REPORTS' }, { id:'retrieval', label:'RETRIEVAL' },
    { id:'algeria', label:'ALGERIA PAYMENT' }, { id:'payreg', label:'PAYMENT REGISTER' },
  ];
  omsTabs = [
    { id:'settlement', label:'Settlement and Submissions' },
    { id:'profile', label:'Edit Your Profile' },
    { id:'subuser', label:'Sub User Administration' },
    { id:'password', label:'Change Your Password' },
    { id:'terms', label:'Terms & Conditions' },
    { id:'daterange', label:'Date Range' },
    { id:'search', label:'Search Reports' },
    { id:'custom', label:'Customized Reports' },
  ];
  omsMrmTabs = [
    { id:'settlement', label:'Settlement and Submissions' },
    { id:'omsusers', label:'OMS Users' },
    { id:'mrmusers', label:'MRM Users' },
    { id:'password', label:'Change Your Password' },
    { id:'migration', label:'Old Users Migration' },
    { id:'vat', label:'VAT Invoice' },
  ];
  prioritySubNav = [
    { id:'priority', label:'ENROLL FOR PRIORITY PASS™' },
    { id:'supp',     label:'Supplementary Access' },
    { id:'wallet',   label:'Digital Wallet' },
    { id:'wearables',label:'AMEX Wearables' },
  ];
  bcrbItems = [
    { id:'cons-monthly', label:'Consumer Monthly Audit Report' },
    { id:'corp-monthly', label:'Corporate Monthly Audit Report' },
    { id:'cons-data',    label:'Consumer Data Audit Report' },
    { id:'corp-data',    label:'Corporate Data Audit Report' },
    { id:'cons-full',    label:'Consumer Full Report' },
    { id:'corp-full',    label:'Corporate Full Report' },
    { id:'cons-history', label:'Consumer History Report' },
    { id:'corp-history', label:'Corporate History Report' },
  ];
  bureauOptions = [
    { id:'aecb', label:'AECB' },
    { id:'simah', label:'SIMAH' },
    { id:'bni', label:'BNI' },
  ];
  bcrbNavLinks = [
    { id:'bcrb', label:'BCRB REPORT' },
    { id:'aecb-upload', label:'AECB UPLOAD' },
  ];
}
