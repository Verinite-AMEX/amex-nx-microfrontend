// apps/change-password-portal/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/change-password/change-password.component')
        .then(m => m.ChangePasswordComponent),
  },
];