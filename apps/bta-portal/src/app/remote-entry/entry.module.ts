import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//import { BtaLoginComponent } from '../pages/login/bta-login.component';
import { btaAuthGuard } from '../core/guards/bta-auth.guard';

const CORP_ADMIN_ROLES  = ['ROLE_CORP_MASTER_ADMIN', 'ROLE_CORP_SUB_ADMIN'];
const CORP_ROLES        = [...CORP_ADMIN_ROLES, 'ROLE_CORP_USER'];
const TA_ADMIN_ROLES    = ['ROLE_TA_MASTER_ADMIN', 'ROLE_TA_SUB_ADMIN'];
const TA_ROLES          = [...TA_ADMIN_ROLES, 'ROLE_TA_USER'];
const AEME_ADMIN_ROLES  = ['ROLE_AEME_INTERNAL_ADMIN'];
const ALL_ADMINS        = [...CORP_ADMIN_ROLES, ...TA_ADMIN_ROLES, ...AEME_ADMIN_ROLES];

const routes: Routes = [
  // Public — no guard
  // {
  //   path: 'login',
  //   component: BtaLoginComponent,
  // },

  // Protected routes — direct children, no wrapper shell component
  {
    path: 'user-management',
    canActivate: [btaAuthGuard],
    data: { roles: ALL_ADMINS },
    loadChildren: () => import('../pages/user-management/bta-user-management.module').then(m => m.BtaUserManagementModule),
  },
  {
    path: 'memo-statement',
    canActivate: [btaAuthGuard],
    data: { roles: [...CORP_ROLES, ...AEME_ADMIN_ROLES] },
    loadChildren: () => import('../pages/memo-statement/bta-memo-statement.module').then(m => m.BtaMemoStatementModule),
  },
  {
    path: 'large-reports',
    canActivate: [btaAuthGuard],
    data: { roles: CORP_ROLES },
    loadChildren: () => import('../pages/large-reports/bta-large-reports.module').then(m => m.BtaLargeReportsModule),
  },
  {
    path: 'monthly-statement',
    canActivate: [btaAuthGuard],
    data: { roles: [...CORP_ROLES, ...AEME_ADMIN_ROLES] },
    loadChildren: () => import('../pages/monthly-statement/bta-monthly-statement.module').then(m => m.BtaMonthlyStatementModule),
  },
  {
    path: 'payment-allocation',
    canActivate: [btaAuthGuard],
    data: { roles: CORP_ROLES },
    loadChildren: () => import('../pages/payment-allocation/bta-payment-allocation.module').then(m => m.BtaPaymentAllocationModule),
  },
  {
    path: 'audit-trail',
    canActivate: [btaAuthGuard],
    data: { roles: [...CORP_ROLES, ...TA_ADMIN_ROLES, ...AEME_ADMIN_ROLES] },
    loadChildren: () => import('../pages/audit-trail/bta-audit-trail.module').then(m => m.BtaAuditTrailModule),
  },
  {
    path: 'case-management',
    canActivate: [btaAuthGuard],
    data: { roles: TA_ROLES },
    loadChildren: () => import('../pages/case-management/bta-case-management.module').then(m => m.BtaCaseManagementModule),
  },
  {
    path: 'tmc-transactions',
    canActivate: [btaAuthGuard],
    data: { roles: TA_ROLES },
    loadChildren: () => import('../pages/tmc-transactions/bta-tmc-transactions.module').then(m => m.BtaTmcTransactionsModule),
  },

  // // Default redirect
  // { path: '', redirectTo: 'login', pathMatch: 'full' },

  // OLD default: redirectTo: 'login'
  { path: '', redirectTo: 'user-management', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   // BtaLoginComponent,
  ],
})
export class BtaRemoteEntryModule {}