// apps/pay-with-points-portal/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pay-with-points',
    pathMatch: 'full',
  },
  {
    path: 'pay-with-points',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/pay-with-points/pay-with-points.module')
        .then(m => m.PayWithPointsModule),
  },
  {
    path: 'digital-wallet',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'wearables',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'pin-unblock',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'sms-status',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'priority-pass',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'valueback',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'pccm-ftp',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  { path: '**', redirectTo: 'pay-with-points' },
];