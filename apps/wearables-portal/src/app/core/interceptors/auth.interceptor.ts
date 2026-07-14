import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * AuthInterceptor
 * Cookie-based auth: the HTTP-only "access_token" cookie is sent
 * automatically by the browser. WearablesAuthService.getToken() no longer
 * exists (AmexPortalAuthUtil doesn't expose the token to JS anymore), so
 * this interceptor no longer depends on it — it just ensures
 * withCredentials: true so the cookie is sent on cross-port gateway calls.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({ withCredentials: true }));
  }
}