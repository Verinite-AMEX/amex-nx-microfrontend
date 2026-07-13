import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SocRocAuthService } from '../services/auth.service';

const AUTH_APP_URL = 'http://localhost:4216'; // move to environment.ts for UAT/Prod

export const socRocAuthGuard: CanActivateFn = () => {
  const auth = inject(SocRocAuthService);

  if (auth.isLoggedIn()) {
    return true;
  }

  // OLD:
  // const router = inject(Router);
  // router.navigateByUrl('/login');
  // return false;

  // NEW — redirect to Login-Logout-auth-app with returnUrl
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `${AUTH_APP_URL}/login?returnUrl=${returnUrl}`;
  return false;
};