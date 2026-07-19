import { Route } from '@angular/router';

import {
  authGuard,
  roleGuard
} from '@amex/shared-services';

import { RemoteEntry } from './entry';

const ALL_USERS = [
  'ROLE_MERCHANT_USER',
  'ROLE_OMS_ADMIN',
  'ROLE_MRM_USER',
  'ROLE_OMS_SUB_USER',
  'ROLE_OMS_VAT_USER'
];

const MERCHANT_ACCOUNT_USERS = [
  'ROLE_MERCHANT_USER',
  'ROLE_OMS_ADMIN',
  'ROLE_OMS_SUB_USER',
  'ROLE_OMS_VAT_USER'
];

const MRM_ONLY = [
  'ROLE_MRM_USER'
];

const SUB_USER_ADMIN_USERS = [
  'ROLE_MERCHANT_USER',
  'ROLE_OMS_ADMIN',
  'ROLE_OMS_VAT_USER'
];

const TERMS_USERS = [
  'ROLE_MERCHANT_USER',
  'ROLE_OMS_ADMIN',
  'ROLE_OMS_SUB_USER',
  'ROLE_OMS_VAT_USER'
];

const CUSTOMIZED_REPORT_USERS = [
  'ROLE_MERCHANT_USER',
  'ROLE_OMS_ADMIN',
  'ROLE_OMS_SUB_USER',
  'ROLE_OMS_VAT_USER'
];

const ADD_NEW_OUTLET_USERS = [
  'ROLE_MERCHANT_USER',
  'ROLE_OMS_SUB_USER'
];

export const remoteRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    component: RemoteEntry,

    children: [
      {
        path: '',
        redirectTo: 'settlement',
        pathMatch: 'full'
      },

      {
        path: 'settlement',
        canActivate: [
          roleGuard(ALL_USERS)
        ],
        loadComponent: () =>
          import(
            '../pages/settlement-submissions-table/oms-settlement-submissions-table.component'
          ).then(
            m => m.OmsSettlementSubmissionsTableComponent
          )
      },

      {
        path: 'merchantaccount',
        canActivate: [
          roleGuard(MERCHANT_ACCOUNT_USERS)
        ],
        loadComponent: () =>
          import(
            '../pages/merchant-data-form/oms-merchant-data-form.component'
          ).then(
            m => m.OmsMerchantDataFormComponent
          )
      },

      {
        path: 'omsusers',
        canActivate: [
          roleGuard(MRM_ONLY)
        ],
        loadComponent: () =>
          import(
            '../pages/user-management-table/oms-user-management-table.component'
          ).then(
            m => m.OmsUserManagementTableComponent
          )
      },

      {
        path: 'mrmusers',
        canActivate: [
          roleGuard(MRM_ONLY)
        ],
        loadComponent: () =>
          import(
            '../pages/user-management-table/oms-user-management-table.component'
          ).then(
            m => m.OmsUserManagementTableComponent
          )
      },

      {
        path: 'subuseradministration',
        canActivate: [
          roleGuard(SUB_USER_ADMIN_USERS)
        ],
        loadComponent: () =>
          import(
            '../pages/sub-user-admin-table/oms-sub-user-admin-table.component'
          ).then(
            m => m.OmsSubUserAdminTableComponent
          )
      },

      {
        path: 'password',
        canActivate: [
          roleGuard(ALL_USERS)
        ],
        loadComponent: () =>
          import(
            '../pages/change-password/oms-change-password.component'
          ).then(
            m => m.OmsChangePasswordComponent
          )
      },

      {
        path: 'termsandconditions',
        canActivate: [
          roleGuard(TERMS_USERS)
        ],
        loadComponent: () =>
          import(
            '../pages/terms-and-conditions/oms-terms-and-conditions.component'
          ).then(
            m => m.OmsTermsAndConditionsComponent
          )
      },

      {
        path: 'customizedreports',
        canActivate: [
          roleGuard(CUSTOMIZED_REPORT_USERS)
        ],
        loadComponent: () =>
          import(
            '../pages/customized-reports-form/oms-customized-reports-form.component'
          ).then(
            m => m.OmsCustomizedReportsFormComponent
          )
      },

      {
        path: 'addnewoutlet',
        canActivate: [
          roleGuard(ADD_NEW_OUTLET_USERS)
        ],
        loadComponent: () =>
          import(
            '../pages/new-outlet-application-form/oms-new-outlet-application-form.component'
          ).then(
            m => m.OmsNewOutletApplicationFormComponent
          )
      }
    ]
  }
];