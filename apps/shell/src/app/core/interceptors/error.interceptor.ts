import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { AmexPortalAuthUtil } from '@ui-components/ui';
import { LoggerService, SessionService } from '@amex/shared-services';

import { EventBusService } from '../services/event-bus.service';

/**
 * Global Error Interceptor (from doc section 3C: Core Services)
 *
 * NEW — session is cleared via the shared SessionService / AmexPortalAuthUtil
 * (same source of truth as BTA/SOC-ROC/OMS) and errors are logged via the
 * shared LoggerService (auto-posts to /api/logs/error). On 401 the user is
 * sent to shell's own LOCAL /login page — NOT the cross-origin
 * Login-Logout-auth-app — since shell keeps its own login/register flow.
 * 403 / 5xx still emit the local EventBus NOTIFICATION, same as before.
 */
export const errorInterceptor: HttpInterceptorFn = (request, next) => {

  const router = inject(Router);

  const logger = inject(LoggerService);

  const authUtil = inject(AmexPortalAuthUtil);

  const sessionService = inject(SessionService);

  const bus = inject(EventBusService);

  return next(request).pipe(

    catchError((error: HttpErrorResponse) => {

      // Guard against infinite recursion: LoggerService.logError() itself
      // POSTs to /api/logs/error through this same HttpClient. If that
      // request also fails (e.g. no session cookie yet, 401), logging it
      // here would trigger another logError() call, which fires another
      // request, forever. Skip logging/redirect handling for this
      // endpoint entirely — LoggerService already no-ops its own failures.
      if (request.url.includes('/api/logs/error')) {
        return throwError(() => error);
      }

      logger.logError(`HTTP ${error.status}`, error);

      if (error.status === 401) {
        // Token expired or invalid — clear shared session, go to local login
        sessionService.clearSession();
        authUtil.logout();
        router.navigate(['/login']);
      } else if (error.status === 403) {
        bus.emit({
          type: 'NOTIFICATION',
          payload: { type: 'error', message: 'You do not have permission to do this.' }
        });
      } else if (error.status >= 500) {
        bus.emit({
          type: 'NOTIFICATION',
          payload: { type: 'error', message: 'A server error occurred. Please try again.' }
        });
      }

      return throwError(() => error);
    })

  );

};