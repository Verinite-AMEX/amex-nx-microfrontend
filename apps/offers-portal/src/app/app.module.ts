// apps/offers-portal/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor, LOGIN_APP_URL } from '@amex/shared-services';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    RouterModule.forRoot([
      { path: '',               redirectTo: 'offers', pathMatch: 'full' },
      { path: 'offers',         loadChildren: () => import('./remote-entry/entry.module').then(m => m.OffersRemoteEntryModule) },
      { path: '**',             redirectTo: 'offers' },
    ]),
  ],
  providers: [
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    { provide: LOGIN_APP_URL, useValue: 'http://localhost:4200/login' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}