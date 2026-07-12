# AmexPageShellComponent — Integration Guide

A reusable, configurable page layout shell for all AEME AMEX portals.  
Implements the hybrid strategy from the PDF spec: **Approaches 1–4 combined**.

---

## Selector

```html
<amex-page-shell>...</amex-page-shell>
```

---

## Portal Styles

| `portalStyle` | Portal |
|---|---|
| `onls` | ONLS Helper / Hub Login / Supp Access / Lounge / Pay-with-Points / Wearables |
| `oms` | Online Merchant Services |
| `bcrb` | BCRB Reports portal |

---

## Customization Approaches

### Approach 1 — Input-Based (quick)

```html
<amex-page-shell
  portalStyle="onls"
  portalTitle="ONLS Helper Tool"
  pageTitle="PRIORITY PASS™ ENROLLMENT"
  [tabs]="tabs"
  activeTabId="misc">
  Page content here
</amex-page-shell>
```

### Approach 2 — Content Projection (maximum flexibility)

```html
<amex-page-shell portalStyle="onls">
  <div header>
    <img src="custom-logo.png" />
    <h2>Custom Header</h2>
  </div>

  Page content here

  <div footer>
    Custom Footer
  </div>
</amex-page-shell>
```

### Approach 3 — Config-Driven (centralized control)

```typescript
pageConfig: AmexPageShellConfig = {
  header: { title: 'Dashboard', visible: true },
  footer: { visible: true, text: '© American Express' },
};
```

```html
<amex-page-shell [config]="pageConfig" portalStyle="oms">
  Page content here
</amex-page-shell>
```

### Approach 4 — Template Injection (advanced/dynamic)

```html
<amex-page-shell [headerTemplate]="myHdr" portalStyle="bcrb">
  Page content here
</amex-page-shell>

<ng-template #myHdr>
  <app-custom-header></app-custom-header>
</ng-template>
```

### Approach 5 — Combined (Recommended for production)

```html
<amex-page-shell
  [config]="config"
  portalStyle="onls"
  [tabs]="tabs"
  activeTabId="misc">

  <app-custom-header header></app-custom-header>
  <router-outlet></router-outlet>
  <app-custom-footer footer></app-custom-footer>

</amex-page-shell>
```

---

## All @Input() properties

### Core layout
| Input | Type | Default | Description |
|---|---|---|---|
| `portalStyle` | `'onls' \| 'oms' \| 'bcrb'` | `'onls'` | Portal visual style |
| `portalTitle` | `string` | `undefined` | Title in top nav bar |
| `username` | `string` | `''` | BCRB only — shown in indigo bar |
| `omsServiceName` | `string` | `'Merchant Services'` | OMS branding subtitle |
| `showHeader` | `boolean` | `true` | Show/hide header region |
| `showFooter` | `boolean` | `true` | Show/hide footer region |
| `footerText` | `string` | `undefined` | Default footer text |
| `showSidebar` | `boolean` | `true` | Show/hide sidebar |

### Tab Bar
| Input | Type | Default | Description |
|---|---|---|---|
| `tabs` | `AmexTabItem[]` | `[]` | Primary tabs |
| `activeTabId` | `string` | `''` | Active tab id |
| `subItems` | `AmexTabItem[]` | `[]` | ONLS sub-nav row |
| `activeSubId` | `string` | `''` | Active sub-nav id |

### Sidebar
| Input | Type | Default | Description |
|---|---|---|---|
| `sidebarItems` | `AmexSidebarMenuItem[]` | `[]` | Sidebar items (OMS/BCRB) |
| `activeSidebarId` | `string` | `''` | Active sidebar item id |

### Page Header
| Input | Type | Default | Description |
|---|---|---|---|
| `pageTitle` | `string` | `''` | Section banner title |
| `pageSubtitle` | `string` | `''` | Optional subtitle |
| `pageCtaLabel` | `string` | `''` | Optional CTA button label |

### BCRB Dashboard Bar
| Input | Type | Default | Description |
|---|---|---|---|
| `showDashboardBar` | `boolean` | `true` | Show BCRB bureau bar |
| `showBureauDropdown` | `boolean` | `true` | Show bureau selector |
| `bureauLabel` | `string` | `'Bureau'` | Label for bureau dropdown |
| `bureauOptions` | `AmexMenuBarLink[]` | `[AECB, SIMAH]` | Bureau options |
| `activeBureauId` | `string` | `'aecb'` | Active bureau id |
| `dashboardLinks` | `AmexMenuBarLink[]` | `[]` | Sub-nav links |
| `activeDashboardLinkId` | `string` | `''` | Active link id |

### Config & Templates (Approaches 3 & 4)
| Input | Type | Default | Description |
|---|---|---|---|
| `config` | `AmexPageShellConfig` | `undefined` | Centralized config object |
| `headerTemplate` | `TemplateRef<unknown>` | `undefined` | Custom header template |
| `footerTemplate` | `TemplateRef<unknown>` | `undefined` | Custom footer template |

---

## All @Output() events

| Output | Payload | Description |
|---|---|---|
| `logout` | `void` | Log Out button clicked |
| `menuToggle` | `void` | BCRB hamburger clicked |
| `tabClick` | `string` | Tab id |
| `subClick` | `string` | Sub-nav item id |
| `sidebarItemClick` | `string` | Sidebar item id |
| `pageCtaClick` | `void` | Page header CTA clicked |
| `bureauChange` | `string` | Bureau id |
| `dashboardLinkClick` | `string` | Dashboard link id |
