import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
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
        loadComponent: () =>
          import('../wearables/wearables-shell-wrapper.component').then(
            m => m.WearablesShellWrapperComponent
          ),
        /**
         * SHELL_HOSTED = true tells WearablesShellWrapperComponent:
         *  → use config that hides header/footer/sidebar (shell owns chrome)
         *  → skip requireAuth (shell's AuthGuard already blocked unauthenticated users)
         *  → skip health check (shell manages it)
         */
        providers: [{ provide: SHELL_HOSTED, useValue: true }],
      },
    ],
  },
];

@NgModule({
  declarations: [WearablesEntryComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:    true,
    },
  ],
})
export class WearablesRemoteEntryModule {}