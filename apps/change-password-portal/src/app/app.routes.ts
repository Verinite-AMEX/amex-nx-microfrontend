import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/change-password/change-password.component')
        .then(m => m.ChangePasswordComponent),
  },
];