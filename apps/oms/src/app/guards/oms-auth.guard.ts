import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OmsAuthService } from '../services/auth.service';

const AUTH_APP_URL = 'http://localhost:4216'; // move to environment.ts for UAT/Prod

export const omsAuthGuard: CanActivateFn = (route) => {
  const auth   = inject(OmsAuthService);
  const router = inject(Router);


   const redirectToAuthApp = () => {
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `${AUTH_APP_URL}/login?returnUrl=${returnUrl}`;
  };


  if (!auth.isLoggedIn()) {
    redirectToAuthApp();
    return false;
  }

  if (
  !auth.isMerchant() &&
  !auth.isOmsAdmin() &&
  !auth.isMrmUser() &&
  !auth.isOmsSubUser() &&
  !auth.isOmsVatUser()
) {
    auth.clearSession();
    redirectToAuthApp();
    return false;
  }

  const allowedRoles: string[] = route.data?.['roles'] ?? [];
  if (allowedRoles.length > 0 && !auth.hasRole(...allowedRoles)) {
    const fallback = getFallback(auth);
    router.navigate([fallback]);
    return false;
  }

  return true;
};

function getFallback(auth: OmsAuthService): string {
  if (auth.isMerchant())  return 'settlement';
  if (auth.isOmsAdmin())   return 'settlement';
  if (auth.isOmsSubUser())    return 'settlement';
  if (auth.isMrmUser())     return 'settlement';
  if (auth.isOmsVatUser())  return 'settlement';
  return 'settlement';
}