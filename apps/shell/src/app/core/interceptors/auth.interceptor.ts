// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor, HttpRequest, HttpHandler,
//   HttpEvent, HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// /**
//  * AuthInterceptor
//  * Cookie-based auth: the HTTP-only "access_token" cookie is sent
//  * automatically by the browser — no manual Authorization header needed.
//  * NOTE: shell's own AuthService (../services/auth.service.ts) still stores
//  * its own copy of the token in localStorage independently of
//  * AmexPortalAuthUtil — that's a separate, larger fix (shell was never wired
//  * to the shared lib to begin with). This interceptor change is safe on its
//  * own either way, since withCredentials just adds the cookie alongside
//  * whatever header logic remains.
//  */
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return next.handle(req.clone({ withCredentials: true }));
//   }
// }