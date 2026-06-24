import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'atoms/button', pathMatch: 'full' },
  { path: 'atoms/button', loadComponent: () => import('./pages/atoms/button-page').then(m => m.ButtonPageComponent) },
  { path: 'atoms/input', loadComponent: () => import('./pages/atoms/input-page').then(m => m.InputPageComponent) },
  { path: 'atoms/textarea', loadComponent: () => import('./pages/atoms/textarea-page').then(m => m.TextareaPageComponent) },
  { path: 'atoms/select', loadComponent: () => import('./pages/atoms/select-page').then(m => m.SelectPageComponent) },
  { path: 'atoms/checkbox', loadComponent: () => import('./pages/atoms/checkbox-page').then(m => m.CheckboxPageComponent) },
  { path: 'atoms/radio-group', loadComponent: () => import('./pages/atoms/radio-group-page').then(m => m.RadioGroupPageComponent) },
  { path: 'atoms/badge', loadComponent: () => import('./pages/atoms/badge-page').then(m => m.BadgePageComponent) },
  { path: 'atoms/avatar', loadComponent: () => import('./pages/atoms/avatar-page').then(m => m.AvatarPageComponent) },
  { path: 'atoms/spinner', loadComponent: () => import('./pages/atoms/spinner-page').then(m => m.SpinnerPageComponent) },
  { path: 'atoms/toggle', loadComponent: () => import('./pages/atoms/toggle-page').then(m => m.TogglePageComponent) },
  { path: 'atoms/tag', loadComponent: () => import('./pages/atoms/tag-page').then(m => m.TagPageComponent) },
  { path: 'atoms/divider', loadComponent: () => import('./pages/atoms/divider-page').then(m => m.DividerPageComponent) },
  { path: 'atoms/progress-bar', loadComponent: () => import('./pages/atoms/progress-bar-page').then(m => m.ProgressBarPageComponent) },
  { path: 'atoms/alert', loadComponent: () => import('./pages/atoms/alert-page').then(m => m.AlertPageComponent) },
  { path: 'atoms/icon-button', loadComponent: () => import('./pages/atoms/icon-button-page').then(m => m.IconButtonPageComponent) },
  { path: 'atoms/breadcrumb', loadComponent: () => import('./pages/atoms/breadcrumb-page').then(m => m.BreadcrumbPageComponent) },
  { path: 'atoms/pagination', loadComponent: () => import('./pages/atoms/pagination-page').then(m => m.PaginationPageComponent) },
  { path: 'molecules/form-field', loadComponent: () => import('./pages/molecules/form-field-page').then(m => m.FormFieldPageComponent) },
  { path: 'molecules/form-group', loadComponent: () => import('./pages/molecules/form-group-page').then(m => m.FormGroupPageComponent) },
  { path: 'molecules/card', loadComponent: () => import('./pages/molecules/card-page').then(m => m.CardPageComponent) },
  { path: 'molecules/modal', loadComponent: () => import('./pages/molecules/modal-page').then(m => m.ModalPageComponent) },
  { path: 'molecules/tabs', loadComponent: () => import('./pages/molecules/tabs-page').then(m => m.TabsPageComponent) },
  { path: 'molecules/accordion', loadComponent: () => import('./pages/molecules/accordion-page').then(m => m.AccordionPageComponent) },
  { path: 'molecules/search-bar', loadComponent: () => import('./pages/molecules/search-bar-page').then(m => m.SearchBarPageComponent) },
  { path: 'molecules/date-input', loadComponent: () => import('./pages/molecules/date-input-page').then(m => m.DateInputPageComponent) },
  { path: 'molecules/file-upload', loadComponent: () => import('./pages/molecules/file-upload-page').then(m => m.FileUploadPageComponent) },
  { path: 'molecules/notification-toast', loadComponent: () => import('./pages/molecules/notification-toast-page').then(m => m.NotificationToastPageComponent) },

  // ... existing routes ...

  // AMEX Atoms
  { path: 'amex/atoms/card-badge', loadComponent: () => import('./pages/amex/atoms/card-badge-page').then(m => m.CardBadgePageComponent) },
  { path: 'amex/atoms/status-badge', loadComponent: () => import('./pages/amex/atoms/status-badge-page').then(m => m.StatusBadgePageComponent) },
  { path: 'amex/atoms/account-number', loadComponent: () => import('./pages/amex/atoms/account-number-page').then(m => m.AccountNumberPageComponent) },
  { path: 'amex/atoms/points-display', loadComponent: () => import('./pages/amex/atoms/points-display-page').then(m => m.PointsDisplayPageComponent) },
  { path: 'amex/atoms/amount', loadComponent: () => import('./pages/amex/atoms/amount-page').then(m => m.AmountPageComponent) },
  { path: 'amex/atoms/reference-id', loadComponent: () => import('./pages/amex/atoms/reference-id-page').then(m => m.ReferenceIdPageComponent) },

  // AMEX Molecules
  { path: 'amex/molecules/statement-row', loadComponent: () => import('./pages/amex/molecules/statement-row-page').then(m => m.StatementRowPageComponent) },
  { path: 'amex/molecules/card-tile', loadComponent: () => import('./pages/amex/molecules/card-tile-page').then(m => m.CardTilePageComponent) },
  { path: 'amex/molecules/report-table', loadComponent: () => import('./pages/amex/molecules/report-table-page').then(m => m.ReportTablePageComponent) },
  { path: 'amex/molecules/audit-trail-row', loadComponent: () => import('./pages/amex/molecules/audit-trail-row-page').then(m => m.AuditTrailRowPageComponent) },
  { path: 'amex/molecules/offer-card', loadComponent: () => import('./pages/amex/molecules/offer-card-page').then(m => m.OfferCardPageComponent) },
  { path: 'amex/molecules/wearable-tile', loadComponent: () => import('./pages/amex/molecules/wearable-tile-page').then(m => m.WearableTilePageComponent) },
  { path: 'amex/molecules/user-row', loadComponent: () => import('./pages/amex/molecules/user-row-page').then(m => m.UserRowPageComponent) },

    // AMEX Feedback
  { path: 'amex/feedback', loadComponent: () => import('./pages/amex/feedback/feedback-page').then(m => m.AmexFeedbackPageComponent) },

    // AMEX Navigation
  { path: 'amex/navigation', loadComponent: () => import('./pages/amex/navigation/navigation-page').then(m => m.AmexNavigationPageComponent) },
    
  // AMEX Search-filters
  { path: 'amex/search-filters', loadComponent: () => import('./pages/amex/search-filters/search-filters-page').then(m => m.AmexSearchFiltersPageComponent) },
   
  // AMEX Tables
  { path: 'amex/tables', loadComponent: () => import('./pages/amex/tables/tables-page').then(m => m.AmexTablesPageComponent) },
    
  // AMEX Actions
  { path: 'amex/action', loadComponent: () => import('./pages/amex/action/actions-page').then(m => m.AmexActionsPageComponent) },
  
    // AMEX Form
  { path: 'amex/forms', loadComponent: () => import('./pages/amex/forms/forms-page').then(m => m.AmexFormsPageComponent) },
  
     // AMEX Display Viewers
  { path: 'amex/display-viewers', loadComponent: () => import('./pages/amex/display-viewers/display-viewers-page').then(m => m.AmexDisplayViewersPageComponent) },
  
  // AMEX Authentication
  { path: 'amex/authentication', loadComponent: () => import('./pages/amex/authentication/authentication-page').then(m => m.AmexAuthenticationPageComponent) },

  // AMEX Layout (Page Shell)
  { path: 'amex/layout', loadComponent: () => import('./pages/amex/layout/layout-page').then(m => m.AmexLayoutPageComponent) },

];
