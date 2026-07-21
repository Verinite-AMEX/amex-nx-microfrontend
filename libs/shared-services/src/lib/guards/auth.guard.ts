import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AmexPortalAuthUtil } from '@ui-components/ui';

import { SessionService } from '../session/session.service';
import { EnvironmentService } from '../config/environment.service';

export const authGuard: CanActivateFn = (_, state) => {

  const sessionService = inject(SessionService);

  const authUtil = inject(AmexPortalAuthUtil);

  const environmentService = inject(EnvironmentService);
    // Already authenticated
  if (sessionService.isLoggedIn()) {
    return true;
  }

  // Fallback
  if (authUtil.isAuthenticated()) {
    return true;
  }

  // Redirect to Login App
  const returnUrl = encodeURIComponent(window.location.href);

  window.location.assign(
    `${environmentService.getLoginAppUrl()}?returnUrl=${returnUrl}`
  );

  return false;
};