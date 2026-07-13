import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { omsAuthGuard } from '../guards/oms-auth.guard';

// ---------------------------------------------------------
// ROLE GROUPS
// ---------------------------------------------------------

const ALL_USERS = [
  'ROLE_MERCHANT_USER',
  'ROLE_OMS_ADMIN',
  'ROLE_MRM_USER',
  'ROLE_OMS_SUB_USER',
  'ROLE_OMS_VAT_USER'
];

const ADMIN_AND_MRM = [
  'ROLE_OMS_ADMIN',
  'ROLE_MRM_USER'
];

const MERCHANT_AND_ADMIN = [
  'ROLE_MERCHANT_USER',
  'ROLE_OMS_ADMIN'
];

// ---------------------------------------------------------
// ROUTES
// ---------------------------------------------------------

export const remoteRoutes: Route[] = [

  {
    path: '',

    canActivate: [omsAuthGuard],

    component: RemoteEntry,

    children: [

      {
        path: '',
        redirectTo: 'settlement',
        pathMatch: 'full'
      },

      // -------------------------------------------------
      // Settlement
      // -------------------------------------------------

      {
        path: 'settlement',

        canActivate: [omsAuthGuard],

        data: {
          roles: ALL_USERS
        },

        loadComponent: () =>
          import('../pages/settlement-submissions-table/oms-settlement-submissions-table.component')
            .then(m => m.OmsSettlementSubmissionsTableComponent)
      },

      // -------------------------------------------------
      // Merchant Account
      // -------------------------------------------------

      {
        path: 'merchantaccount',

        canActivate: [omsAuthGuard],

        data: {
          roles: ALL_USERS
        },

        loadComponent: () =>
          import('../pages/merchant-data-form/oms-merchant-data-form.component')
            .then(m => m.OmsMerchantDataFormComponent)
      },

      // -------------------------------------------------
      // OMS Users
      // OMS Admin + MRM User
      // -------------------------------------------------

      {
        path: 'omsusers',

        canActivate: [omsAuthGuard],

        data: {
          roles: ADMIN_AND_MRM
        },

        loadComponent: () =>
          import('../pages/user-management-table/oms-user-management-table.component')
            .then(m => m.OmsUserManagementTableComponent)
      },

      // -------------------------------------------------
      // MRM Users
      // OMS Admin + MRM User
      // -------------------------------------------------

      {
        path: 'mrmusers',

        canActivate: [omsAuthGuard],

        data: {
          roles: ADMIN_AND_MRM
        },

        loadComponent: () =>
          import('../pages/user-management-table/oms-user-management-table.component')
            .then(m => m.OmsUserManagementTableComponent)
      },

      // -------------------------------------------------
      // Sub User Administration
      // Merchant + OMS Admin
      // -------------------------------------------------

      {
        path: 'subuseradministration',

        canActivate: [omsAuthGuard],

        data: {
          roles: MERCHANT_AND_ADMIN
        },

        loadComponent: () =>
          import('../pages/sub-user-admin-table/oms-sub-user-admin-table.component')
            .then(m => m.OmsSubUserAdminTableComponent)
      },

      // -------------------------------------------------
      // Change Password
      // -------------------------------------------------

      {
        path: 'password',

        canActivate: [omsAuthGuard],

        data: {
          roles: ALL_USERS
        },

        loadComponent: () =>
          import('../pages/change-password/oms-change-password.component')
            .then(m => m.OmsChangePasswordComponent)
      },

      // -------------------------------------------------
      // Terms & Conditions
      // -------------------------------------------------

      {
        path: 'termsandconditions',

        canActivate: [omsAuthGuard],

        data: {
          roles: [
            'ROLE_MERCHANT_USER',
            'ROLE_OMS_ADMIN',
            'ROLE_OMS_SUB_USER',
            'ROLE_OMS_VAT_USER'
          ]
        },

        loadComponent: () =>
          import('../pages/terms-and-conditions/oms-terms-and-conditions.component')
            .then(m => m.OmsTermsAndConditionsComponent)
      },

      // -------------------------------------------------
      // Customized Reports
      // Merchant + OMS Admin
      // -------------------------------------------------

      {
        path: 'customizedreports',

        canActivate: [omsAuthGuard],

        data: {
          roles: MERCHANT_AND_ADMIN
        },

        loadComponent: () =>
          import('../pages/customized-reports-form/oms-customized-reports-form.component')
            .then(m => m.OmsCustomizedReportsFormComponent)
      },

      // -------------------------------------------------
      // Add New Outlet
      // -------------------------------------------------

      {
        path: 'addnewoutlet',

        canActivate: [omsAuthGuard],

        data: {
          roles: [
            'ROLE_MERCHANT_USER',
            'ROLE_OMS_ADMIN',
            'ROLE_OMS_SUB_USER',
            'ROLE_OMS_VAT_USER'
          ]
        },

        loadComponent: () =>
          import('../pages/new-outlet-application-form/oms-new-outlet-application-form.component')
            .then(m => m.OmsNewOutletApplicationFormComponent)
      }

    ]
  }
];
