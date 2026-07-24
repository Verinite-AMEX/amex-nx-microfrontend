// apps/wearables-portal/src/app/remote-entry/entry.module.ts
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';
import { SHELL_HOSTED } from '../core/tokens/shell.token';

@Component({
  selector: 'wearables-entry',
  standalone: false,
  template: `<router-outlet></router-outlet>`,
})
export class WearablesEntryComponent {}
const routes: Routes = [
  {
    path: '',
    component: WearablesEntryComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../wearables/wearables-shell-wrapper/wearables-shell-wrapper.component').then(
            m => m.WearablesShellWrapperComponent
          ),
        providers: [{ provide: SHELL_HOSTED, useValue: true }],
      },
    ],
  },
];
@NgModule({
  declarations: [WearablesEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class WearablesRemoteEntryModule {}