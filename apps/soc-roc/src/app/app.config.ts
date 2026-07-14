import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { AmexPortalAuthUtil } from '@ui-components/ui';
import {
  authTokenInterceptor,
  errorInterceptor,
  loadingInterceptor,
  retryInterceptor,
  API_BASE_URL,
  AuthApiService,
} from '@amex/shared-services';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

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
    // @Injectable decorator in the published package. authGuard/roleGuard
    // inject it directly, so provide it explicitly here until the
    // ui-components package is rebuilt/republished with the decorator added.
    { provide: AmexPortalAuthUtil, useClass: AmexPortalAuthUtil },
  ],
};