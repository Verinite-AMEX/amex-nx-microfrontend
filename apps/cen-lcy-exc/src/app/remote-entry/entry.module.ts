import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';
import { SHELL_HOSTED } from '../core/tokens/shell.token';

@Component({
  selector: 'cen-lcy-exc-entry',
  standalone: false,
  template: `<router-outlet></router-outlet>`,
})
export class CenLcyExcEntryComponent {}

const routes: Routes = [
  {
    path: '',
    component: CenLcyExcEntryComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../pages/currency-exchange/cen-lcy-exc-shell-wrapper.component')
            .then(m => m.CenLcyExcShellWrapperComponent),
        providers: [
          { provide: SHELL_HOSTED, useValue: true },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [CenLcyExcEntryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CenLcyExcRemoteEntryModule {}