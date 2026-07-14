import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

import { AmexPortalAuthUtil } from '@ui-components/ui';

import { SessionService } from '../session/session.service';
import { EnvironmentService } from '../config/environment.service';

export function roleGuard(
  allowedRoles: readonly string[]
): CanActivateFn {

  return (_, state) => {

    const router = inject(Router);

    const sessionService = inject(SessionService);

    const authUtil = inject(AmexPortalAuthUtil);

    const environmentService = inject(EnvironmentService);

    /**
     * Authentication
     */
    if (
      !sessionService.isLoggedIn() &&
      !authUtil.isAuthenticated()
    ) {

      const returnUrl = encodeURIComponent(window.location.href);

      window.location.assign(
        `${environmentService.getLoginAppUrl()}?returnUrl=${returnUrl}`
      );

      return false;
    }

    /**
     * Authorization
     */
    if (
      sessionService.hasAnyRole([...allowedRoles])
    ) {
      return true;
    }

    /**
     * Access denied
     */
    return router.createUrlTree([
      '/access-denied',
    ]);

  };

}