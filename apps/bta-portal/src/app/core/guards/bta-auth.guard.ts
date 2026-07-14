import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BtaAuthService } from '../services/auth.service';

const AUTH_APP_URL = 'http://localhost:4216';

export const btaAuthGuard: CanActivateFn = (route) => {
  const auth   = inject(BtaAuthService);
  const router = inject(Router);


   const redirectToAuthApp = () => {
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `${AUTH_APP_URL}/login?returnUrl=${returnUrl}`;
  };

  if (!auth.isLoggedIn()) {
    // OLD: router.navigate(['/bta/login']);
    redirectToAuthApp();
    return false;
  }

  if (!auth.isBtaUser()) {
    // OLD: window.location.href = `${AUTH_APP_URL}/login`;
    auth.clearSession();
    redirectToAuthApp();
    return false;
  }

  const allowedRoles: string[] = route.data?.['roles'] ?? [];
  if (allowedRoles.length > 0 && !auth.hasRole(...allowedRoles)) {
    const fallback = getFallback(auth);
    router.navigate([`/bta/${fallback}`]);
    return false;
  }

  return true;
};

function getFallback(auth: BtaAuthService): string {
  if (auth.isCorpAdmin())  return 'user-management';
  if (auth.isCorpUser())   return 'memo-statement';
  if (auth.isTaAdmin())    return 'user-management';
  if (auth.isTaUser())     return 'case-management';
  if (auth.isAemeAdmin())  return 'user-management';
  // OLD: return 'login';
  return 'user-management';
}