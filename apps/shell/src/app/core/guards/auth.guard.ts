// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
// import { SessionService } from '@amex/shared-services';
// import { AmexPortalAuthUtil } from '@ui-components/ui';

// /**
//  * Auth Guard (from doc section 4 + 5)
//  * Protects /account and /bcrb routes.
//  *
//  * NEW — session check now backed by the shared SessionService /
//  * AmexPortalAuthUtil (same source of truth as BTA/SOC-ROC/OMS), but
//  * the redirect target stays LOCAL: shell keeps its own /login page
//  * instead of bouncing to Login-Logout-auth-app.
//  */
// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private sessionService: SessionService,
//     private authUtil: AmexPortalAuthUtil,
//     private router: Router
//   ) {}

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     if (this.sessionService.isLoggedIn() || this.authUtil.isAuthenticated()) {
//       return true;
//     }
//     // Preserve intended destination so we can redirect after login
//     this.router.navigate(['/login'], {
//       queryParams: { returnUrl: route.url.join('/') }
//     });
//     return false;
//   }
// }