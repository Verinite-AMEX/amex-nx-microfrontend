# @vn-core-ui-components/ui

> AEME AMEX UI Component Library — Angular standalone components matching all 17 AEME portal designs.

## Installation

```bash
npm install @vn-core-ui-components/ui
```

## Requirements

- Angular 17+ (standalone components)
- `@angular/forms` (for `ngModel` bindings inside components)

## Setup

In your `app.config.ts` or root module, make sure `FormsModule` is available if you use two-way binding features.

## Usage

Import any component directly — all components are standalone:

```typescript
import { AmexLoginFormComponent } from '@vn-core-ui-components/ui';

@Component({
  standalone: true,
  imports: [AmexLoginFormComponent],
  template: `<amex-login-form (login)="onLogin($event)"></amex-login-form>`
})
export class MyPageComponent {}
```

## Available Components

### Atoms
| Selector | Component |
|---|---|
| `amex-card-badge` | Card type badge (gold, platinum, centurion…) |
| `amex-status-badge` | Status pill (Active, Cancelled, Pending…) |
| `amex-account-number` | Masked account number display |
| `amex-points-display` | Points balance display |
| `amex-amount` | Currency amount with formatting |
| `amex-reference-id` | Reference ID display |

### Feedback
| Selector | Component |
|---|---|
| `amex-success-toast` | Success notification banner |
| `amex-error-toast` | Error notification banner |
| `amex-inline-validation-error` | Red field-level error text |
| `amex-confirmation-modal` | Confirm/Cancel dialog |
| `amex-duplicate-submission-warning` | Duplicate request warning |
| `amex-file-upload-progress` | Upload progress bar |
| `amex-reset-password-confirm` | Reset password confirmation alert |

### Navigation
| Selector | Component |
|---|---|
| `amex-top-nav-bar` | Portal top navigation bar |
| `amex-tab-bar` | Horizontal tab switcher |
| `amex-sidebar-menu` | Vertical collapsible sidebar |
| `amex-dashboard-menu-bar` | BCRB dashboard menu bar |
| `amex-breadcrumb-trail` | Breadcrumb navigation |
| `amex-page-header` | Page section header |
| `amex-portal-home-tiles` | Home screen portal tiles |
| `amex-logout-confirmation` | Logout confirmation modal |

### Search & Filters
| Selector | Component |
|---|---|
| `amex-search-bar` | Search input with submit |
| `amex-date-range-picker` | From/To date picker |
| `amex-month-year-selector` | Month + Year dropdowns |
| `amex-dropdown-filter` | Single/multi select filter |
| `amex-autocomplete-input` | Autocomplete with sibling auto-fill |
| `amex-report-type-selector` | Report type radio/dropdown |
| `amex-view-report-dropdown` | BTA audit 3-value dropdown |
| `amex-months-dropdown-filter` | Number of months dropdown |

### Tables
| Selector | Component |
|---|---|
| `amex-sortable-filterable-table` | Sortable + per-column filter table |
| `amex-paginated-table` | Table with pagination |
| `amex-table-with-row-actions` | Table with inline action buttons |
| `amex-bcrb-reports-table` | BCRB report listing table |
| `amex-card-list-selector` | Card rows with row-select |
| `amex-wearable-device-table` | Wearable devices table |
| `amex-user-management-table` | User list (admin/MRM) |
| `amex-eligible-transactions-table` | Pay-with-Points transactions |
| `amex-points-history-table` | Points redemption history |
| `amex-audit-trail-detail-table` | Full audit log table |
| `amex-socroc-records-table` | SOC/ROC transactions table |
| `amex-master-data-table` | Country/Currency master table |
| `amex-rejection-report-table` | Rejected items table |
| `amex-file-response-status-table` | AECB/UAEFTS file status table |
| `amex-settlement-submissions-table` | Settlement & Submissions table |
| `amex-sub-user-admin-table` | Sub-user management table |
| `amex-case-management-list` | BTA case management list |
| `amex-tmc-transactions-table` | TMC transactions table |
| `amex-payment-register-table` | Payment register table |
| `amex-request-approval-queue` | UAEFTS approval queue |
| `amex-card-member-details-view` | Card member read-only panel |
| `amex-empty-state-message` | No-data empty state |

### Display & Viewers
| Selector | Component |
|---|---|
| `amex-temp-password-email-preview` | Email preview with temp password |
| `amex-statement-viewer` | ONLS Statement viewer |
| `amex-memo-statement-viewer` | BTA Memo Statement |
| `amex-monthly-statement-viewer` | BTA Monthly Statement |
| `amex-large-report-download-panel` | BTA Large Reports panel |
| `amex-offers-panel` | Offers grid + detail view |
| `amex-benefits-panel` | Benefits cards panel |
| `amex-priority-pass-viewer` | Priority Pass™ enrollment |
| `amex-centurion-card-details-view` | Centurion LCY card details |
| `amex-wearable-details-view` | Wearable device details |
| `amex-report-submission-confirmation` | Report request confirmation |
| `amex-audit-trail-summary-view` | BTA Audit Trail summary |
| `amex-points-balance-summary-card` | Pay-with-Points balance card |
| `amex-vat-invoice-report-view` | Tax Invoice viewer |
| `amex-uaefts-status-view` | UAEFTS lifecycle status |
| `amex-download-user-guide-panel` | OMS User Guide download |
| `amex-terms-and-conditions-viewer` | Scrollable T&C with accept |

### Forms
| Selector | Component |
|---|---|
| `amex-add-user-form` | Add user form |
| `amex-edit-user-form` | Edit user form |
| `amex-edit-my-details-form` | Edit own profile form |
| `amex-merchant-data-form` | Merchant data entry form |
| `amex-add-delete-merchant-panel` | Add/Delete merchant panel |
| `amex-contact-information-form` | Contact info form |
| `amex-country-master-form` | Country master Add/Modify |
| `amex-currency-master-form` | Currency master Add/Modify |
| `amex-socroc-entry-form` | SOC/ROC entry form |

## Source & Storybook

The full Storybook with all component variants is available in the monorepo.

```bash
nx run ui:storybook
```
