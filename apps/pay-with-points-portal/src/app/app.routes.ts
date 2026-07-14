import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pay-with-points',
    pathMatch: 'full',
  },
  {
    path: 'pay-with-points',
    loadChildren: () =>
      import('./pages/pay-with-points/pay-with-points.module')
        .then(m => m.PayWithPointsModule),
  },
  {
    path: 'digital-wallet',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'wearables',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'pin-unblock',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'sms-status',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'priority-pass',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'valueback',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'pccm-ftp',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  { path: '**', redirectTo: 'pay-with-points' },
];
