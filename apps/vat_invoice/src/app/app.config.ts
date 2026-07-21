// apps/vat_invoice/src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor, LOGIN_APP_URL } from '@amex/shared-services';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    { provide: LOGIN_APP_URL, useValue: 'http://localhost:4200/login' },
  ],
};