import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { AmexPortalAuthUtil } from '@ui-components/ui';

import { LoggerService } from '../logging/logger.service';
import { SessionService } from '../session/session.service';
import { EnvironmentService } from '../config/environment.service';

export const errorInterceptor: HttpInterceptorFn = (
  request,
  next
) => {

  const router = inject(Router);

  const logger = inject(LoggerService);

  const authUtil = inject(AmexPortalAuthUtil);

  const sessionService = inject(SessionService);

  const environmentService = inject(EnvironmentService);

  return next(request).pipe(

    catchError((error: HttpErrorResponse) => {

      logger.logError(
        `HTTP ${error.status}`,
        error
      );

      switch (error.status) {

        case 401: {

          sessionService.clearSession();

          authUtil.logout();

          const returnUrl = encodeURIComponent(window.location.href);

          window.location.assign(
            `${environmentService.getLoginAppUrl()}?returnUrl=${returnUrl}`
          );

          break;
        }

        case 403: {

          router.navigate(['/access-denied']);

          break;
        }

        default:
          break;

      }

      return throwError(() => error);

    })

  );

};