// apps/wearables-portal/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { authTokenInterceptor, authGuard, LOGIN_APP_URL } from '@amex/shared-services';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          canActivate: [authGuard],
          loadComponent: () =>
            import('./wearables/wearables-shell-wrapper/wearables-shell-wrapper.component')
              .then(m => m.WearablesShellWrapperComponent),
        },
        {
          path: '**',
          redirectTo: '',
        },
      ],
      {
        bindToComponentInputs: true,
      }
    ),

    AppComponent
  ],
  providers: [
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    { provide: LOGIN_APP_URL, useValue: 'http://localhost:4200/login' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}