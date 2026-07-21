import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./wearables/wearables-shell-wrapper/wearables-shell-wrapper.component')
        .then(m => m.WearablesShellWrapperComponent),
  },
  { path: '**', redirectTo: '' },
];