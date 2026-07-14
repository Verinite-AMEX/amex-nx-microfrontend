import {
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

/**
 * Auth Token Interceptor
 *
 * Responsibilities:
 *  - Sends HTTP-only authentication cookie.
 *  - Ensures every authenticated request includes credentials.
 *
 * NOTE:
 * No Authorization header is added.
 * Authentication is handled completely by the backend
 * using HTTP-only cookies.
 */
export const authTokenInterceptor: HttpInterceptorFn = (
  request,
  next
) => {

  const authenticatedRequest = addCredentials(request);

  return next(authenticatedRequest);

};

/**
 * Adds credentials to outgoing request.
 */
function addCredentials(
  request: HttpRequest<unknown>
): HttpRequest<unknown> {

  return request.clone({
    withCredentials: true,
  });

}