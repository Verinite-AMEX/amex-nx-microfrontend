// apps/centurion-portal/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor, LOGIN_APP_URL } from '@amex/shared-services';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '',          redirectTo: 'centurion', pathMatch: 'full' },
      { path: 'centurion', loadChildren: () => import('./remote-entry/entry.module').then(m => m.CenturionRemoteEntryModule) },
      { path: '**',        redirectTo: 'centurion' },
    ]),
  ],
  providers: [
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    { provide: LOGIN_APP_URL, useValue: 'http://localhost:4200/login' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}