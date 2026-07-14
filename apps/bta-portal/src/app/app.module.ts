import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {
  AmexTopNavBarComponent,
  AmexTabBarComponent,
  AmexSidebarMenuComponent,
  AmexLogoutConfirmationComponent,
  AmexPortalAuthUtil,
} from '@ui-components/ui';
import {
  authTokenInterceptor,
  errorInterceptor,
  loadingInterceptor,
  retryInterceptor,
  API_BASE_URL,
  AuthApiService,
} from '@amex/shared-services';

/**
 * Runs once, before the router does its first navigation.
 * Hydrates SessionService / AmexPortalAuthUtil from the HTTP-only
 * cookie (via /api/auth/session) so guards see the correct
 * logged-in state even after a cross-origin redirect back from
 * Login-Logout-auth-app.
 */
function initializeAuth(authApi: AuthApiService) {
  return () => firstValueFrom(authApi.validateSession());
}

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexLogoutConfirmationComponent,
    RouterModule.forRoot([
      { path: '',    redirectTo: 'bta', pathMatch: 'full' },
      { path: 'bta', loadChildren: () => import('./remote-entry/entry.module').then(m => m.BtaRemoteEntryModule) },
      { path: '**',  redirectTo: 'bta' },
    ]),
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
    provideHttpClient(
      withInterceptors([authTokenInterceptor, errorInterceptor, loadingInterceptor, retryInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthApiService],
      multi: true,
    },
    // Workaround: AmexPortalAuthUtil (in @ui-components/ui) lacks its own
    // @Injectable decorator in the published package. roleGuard injects it
    // directly, so provide it explicitly here until the ui-components
    // package is rebuilt/republished with the decorator added.
    { provide: AmexPortalAuthUtil, useClass: AmexPortalAuthUtil },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}