import {
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

import { inject } from '@angular/core';

import { finalize } from 'rxjs';

import { LoaderService } from '../loader/loader.service';

/**
 * Loading Interceptor
 *
 * Responsibilities:
 *  - Shows global loader before every HTTP request.
 *  - Hides loader after success or failure.
 *
 * Works together with LoaderService's
 * request reference counting.
 */
export const loadingInterceptor: HttpInterceptorFn = (
  request,
  next
) => {

  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(request).pipe(

    finalize(() => {

      loaderService.hide();

    })

  );

};