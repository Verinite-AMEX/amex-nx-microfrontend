import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AmexPortalAuthUtil } from '@ui-components/ui';
import { API_BASE_URL, authTokenInterceptor } from '@amex/shared-services';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authTokenInterceptor])
    ),
    { provide: API_BASE_URL, useValue: 'http://localhost:8080' },
    {
      provide: AmexPortalAuthUtil,
      useFactory: () => new AmexPortalAuthUtil(),
    },
  ],
};