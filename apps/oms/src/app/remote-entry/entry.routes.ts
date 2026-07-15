import { Route } from '@angular/router';
import { authGuard } from '@amex/shared-services';
import { RemoteEntry } from './entry';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },

      {
        path: 'settlement',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/settlement-submissions-table/oms-settlement-submissions-table.component')
            .then(m => m.OmsSettlementSubmissionsTableComponent)
      },

      {
        path: 'merchantaccount',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/merchant-data-form/oms-merchant-data-form.component')
            .then(m => m.OmsMerchantDataFormComponent)
      },

      {
        path: 'omsusers',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/user-management-table/oms-user-management-table.component')
            .then(m => m.OmsUserManagementTableComponent)
      },

      {
        path: 'mrmusers',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/user-management-table/oms-user-management-table.component')
            .then(m => m.OmsUserManagementTableComponent)
      },

      {
        path: 'subuseradministration',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/sub-user-admin-table/oms-sub-user-admin-table.component')
            .then(m => m.OmsSubUserAdminTableComponent)
      },

      {
        path: 'password',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/change-password/oms-change-password.component')
            .then(m => m.OmsChangePasswordComponent)
      },

      {
        path: 'termsandconditions',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/terms-and-conditions/oms-terms-and-conditions.component')
            .then(m => m.OmsTermsAndConditionsComponent)
      },

      {
        path: 'customizedreports',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/customized-reports-form/oms-customized-reports-form.component')
            .then(m => m.OmsCustomizedReportsFormComponent)
      },

      {
        path: 'addnewoutlet',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/new-outlet-application-form/oms-new-outlet-application-form.component')
            .then(m => m.OmsNewOutletApplicationFormComponent)
      }
    ]
  }
];