import { InjectionToken } from '@angular/core';

/**
 * LOGIN_APP_URL
 *
 * Where authGuard / roleGuard / EnvironmentService.getLoginAppUrl()
 * redirect an unauthenticated user.
 *
 * DEFAULT = standalone Login-Logout-auth-app (localhost:4216) — this
 * is what standalone portals like bta-portal, oms, soc-roc get
 * automatically, with zero changes needed on their side.
 *
 * OVERRIDE this in app.config.ts / app.module.ts for any app that is
 * conceptually "inside" the shell — shell itself, and the 12
 * shell-sub-portals (bcrb, cen-lcy-exc, centurion-portal,
 * change-password-portal, lounge, offers-portal, online-account,
 * pay-with-points-portal, statement, supplementary-portal, vat_invoice,
 * wearables-portal) — so that both a shell-mounted route AND a direct
 * standalone hit on that portal's own port send the user to shell's
 * own /login instead:
 *
 *   { provide: LOGIN_APP_URL, useValue: 'http://localhost:4200/login' }
 */
export const LOGIN_APP_URL = new InjectionToken<string>('LOGIN_APP_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:4216/login',
});