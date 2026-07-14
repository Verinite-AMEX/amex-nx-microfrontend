import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';

import {
  retry,
  timer,
} from 'rxjs';

/**
 * HTTP status codes that are safe to retry.
 */
const RETRYABLE_STATUS_CODES = [
  0,    // Network error
  408,  // Request Timeout
  429,  // Too Many Requests
  500,  // Internal Server Error
  502,  // Bad Gateway
  503,  // Service Unavailable
  504,  // Gateway Timeout
];

/**
 * Retry Interceptor
 *
 * Retries only safe GET requests when the failure
 * is considered temporary.
 */
export const retryInterceptor: HttpInterceptorFn = (
  request,
  next
) => {

  /**
   * Never retry non-idempotent requests.
   */
  if (request.method !== 'GET') {
    return next(request);
  }

  return next(request).pipe(

    retry({

      count: 2,

      delay: (error, retryCount) => {

        if (
          error instanceof HttpErrorResponse &&
          RETRYABLE_STATUS_CODES.includes(error.status)
        ) {

          return timer(retryCount * 500);

        }

        throw error;

      },

    })

  );

};