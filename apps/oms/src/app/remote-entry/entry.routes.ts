import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { omsAuthGuard } from '../guards/oms-auth.guard';

const ALL_MERCHANTS        = ['ROLE_MERCHANT_USER', 'ROLE_CORP_MASTER_ADMIN'];

export const remoteRoutes: Route[] = [

  {
    path: '',
    canActivate: [omsAuthGuard],
    data: { roles: ALL_MERCHANTS },
    component: RemoteEntry,
    children: [
      {
        path: '',
        redirectTo: 'settlement',
        pathMatch: 'full'
      },

      {
        path: 'settlement',
        canActivate: [omsAuthGuard],
        data: { roles: ALL_MERCHANTS },
        loadComponent: () =>
          import('../pages/settlement-submissions-table/oms-settlement-submissions-table.component')
            .then(m => m.OmsSettlementSubmissionsTableComponent)
      },

      {
        path: 'merchantaccount',
        canActivate: [omsAuthGuard],
        loadComponent: () =>
          import('../pages/merchant-data-form/oms-merchant-data-form.component')
            .then(m => m.OmsMerchantDataFormComponent)
      },

      {
        path: 'omsusers',
        canActivate: [omsAuthGuard],
        loadComponent: () =>
          import('../pages/user-management-table/oms-user-management-table.component')
            .then(m => m.OmsUserManagementTableComponent)
      },

      {
        path: 'mrmusers',
        canActivate: [omsAuthGuard],
        loadComponent: () =>
          import('../pages/user-management-table/oms-user-management-table.component')
            .then(m => m.OmsUserManagementTableComponent)
      },

      {
        path: 'subuseradministration',
        canActivate: [omsAuthGuard],
        loadComponent: () =>
          import('../pages/sub-user-admin-table/oms-sub-user-admin-table.component')
            .then(m => m.OmsSubUserAdminTableComponent)
      },

      {
        path: 'password',
        canActivate: [omsAuthGuard],
        loadComponent: () =>
          import('../pages/change-password/oms-change-password.component')
            .then(m => m.OmsChangePasswordComponent)
      },

      {
        path: 'termsandconditions',
        canActivate: [omsAuthGuard],
        loadComponent: () =>
          import('../pages/terms-and-conditions/oms-terms-and-conditions.component')
            .then(m => m.OmsTermsAndConditionsComponent)
      },

      {
        path: 'customizedreports',
        canActivate: [omsAuthGuard],
        loadComponent: () =>
          import('../pages/customized-reports-form/oms-customized-reports-form.component')
            .then(m => m.OmsCustomizedReportsFormComponent)
      },

      {
        path: 'addnewoutlet',
        canActivate: [omsAuthGuard],
        loadComponent: () =>
          import('../pages/new-outlet-application-form/oms-new-outlet-application-form.component')
            .then(m => m.OmsNewOutletApplicationFormComponent)
      }
    ]
  }
];