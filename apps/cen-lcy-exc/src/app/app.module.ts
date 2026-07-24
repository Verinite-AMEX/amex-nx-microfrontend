// apps/cen-lcy-exc/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor, authGuard, LOGIN_APP_URL } from '@amex/shared-services';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    RouterModule.forRoot([
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/currency-exchange/cen-lcy-exc-shell-wrapper.component')
            .then(m => m.CenLcyExcShellWrapperComponent),
      },
      { path: '**', redirectTo: '' },
    ]),
  ],
  providers: [
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    { provide: LOGIN_APP_URL, useValue: 'http://localhost:4200/login' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}