import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
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

import { appRoutes } from './app.routes';
import { environment } from '../environments/environment';

function initializeAuth(authApi: AuthApiService) {
  return () => firstValueFrom(authApi.validateSession());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),

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

    { provide: AmexPortalAuthUtil, useClass: AmexPortalAuthUtil },
  ],
};