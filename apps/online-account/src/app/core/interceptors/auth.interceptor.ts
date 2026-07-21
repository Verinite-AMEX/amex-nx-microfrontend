//     import { HttpInterceptorFn } from '@angular/common/http';

// /**
//  * AuthInterceptor
//  * Cookie-based auth: the HTTP-only "access_token" cookie is sent
//  * automatically by the browser. This interceptor just ensures
//  * withCredentials: true so the cookie is sent on cross-port gateway calls
//  * (this app runs inside the shell's origin once loaded via Module
//  * Federation, so its own API calls still need this set explicitly).
//  */
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req.clone({ withCredentials: true }));
// };