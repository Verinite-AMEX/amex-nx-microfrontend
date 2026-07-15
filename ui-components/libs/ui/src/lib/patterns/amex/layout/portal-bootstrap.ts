import { Provider, Type } from '@angular/core';
import {
  AMEX_PORTAL_AUTH_ADAPTER,
  AmexPortalAuthAdapter,
  AMEX_PORTAL_NAVIGATION_ADAPTER,
  AmexPortalNavigationAdapter,
  AMEX_PORTAL_THEME_ADAPTER,
  AmexPortalThemeAdapter,
  AMEX_PORTAL_ANALYTICS_ADAPTER,
  AmexPortalAnalyticsAdapter,
  AMEX_PORTAL_USER_CONTEXT_ADAPTER,
  AmexPortalUserContextAdapter,
  AMEX_PORTAL_FEATURE_FLAG_ADAPTER,
  AmexPortalFeatureFlagAdapter,
} from './adapters';
import { providePortalRuntimeConfig } from './runtime-config';

/* ============================================================================
   BOOTSTRAP OPTIONS
============================================================================ */
export interface PortalBootstrapOptions {
  /** Auth adapter — class or pre-built instance. */
  authAdapter?: Type<AmexPortalAuthAdapter> | AmexPortalAuthAdapter;
  /** Navigation adapter — class or pre-built instance. */
  navAdapter?: Type<AmexPortalNavigationAdapter> | AmexPortalNavigationAdapter;
  /** Theme adapter — class or pre-built instance. */
  themeAdapter?: Type<AmexPortalThemeAdapter> | AmexPortalThemeAdapter;
  /** Analytics adapter — class or pre-built instance. */
  analyticsAdapter?: Type<AmexPortalAnalyticsAdapter> | AmexPortalAnalyticsAdapter;
  /** User context adapter — class or pre-built instance. */
  userContextAdapter?: Type<AmexPortalUserContextAdapter> | AmexPortalUserContextAdapter;
  /** Feature flag adapter — class or pre-built instance. */
  featureFlagAdapter?: Type<AmexPortalFeatureFlagAdapter> | AmexPortalFeatureFlagAdapter;
  /**
   * URL for runtime JSON config.
   * Defaults to '/assets/config/portal-config.json'.
   * Pass false to disable runtime config loading entirely.
   */
  runtimeConfigUrl?: string | false;
}

/* ============================================================================
   HELPER
============================================================================ */
function isClass<T>(val: Type<T> | T): val is Type<T> {
  return typeof val === 'function';
}

function bind<T>(token: unknown, val: Type<T> | T): Provider {
  return isClass(val)
    ? { provide: token, useClass: val }
    : { provide: token, useValue: val };
}

/* ============================================================================
   bootstrapPortal()

   Single call that wires up ALL portal adapters + runtime config loading.

   ── NgModule usage ────────────────────────────────────────────────────────
   @NgModule({
     providers: [
       ...bootstrapPortal({
         authAdapter:      WearablesAuthAdapter,
         navAdapter:       WearablesNavAdapter,
         runtimeConfigUrl: '/assets/config/wearables.json',
       }),
     ],
   })
   export class AppModule {}

   ── Standalone usage ──────────────────────────────────────────────────────
   bootstrapApplication(AppComponent, {
     providers: bootstrapPortal({ authAdapter: WearablesAuthAdapter }),
   });
============================================================================ */
export function bootstrapPortal(options: PortalBootstrapOptions = {}): Provider[] {
  const providers: Provider[] = [];

  if (options.authAdapter)
    providers.push(bind(AMEX_PORTAL_AUTH_ADAPTER, options.authAdapter));

  if (options.navAdapter)
    providers.push(bind(AMEX_PORTAL_NAVIGATION_ADAPTER, options.navAdapter));

  if (options.themeAdapter)
    providers.push(bind(AMEX_PORTAL_THEME_ADAPTER, options.themeAdapter));

  if (options.analyticsAdapter)
    providers.push(bind(AMEX_PORTAL_ANALYTICS_ADAPTER, options.analyticsAdapter));

  if (options.userContextAdapter)
    providers.push(bind(AMEX_PORTAL_USER_CONTEXT_ADAPTER, options.userContextAdapter));

  if (options.featureFlagAdapter)
    providers.push(bind(AMEX_PORTAL_FEATURE_FLAG_ADAPTER, options.featureFlagAdapter));

  if (options.runtimeConfigUrl !== false)
    providers.push(
      providePortalRuntimeConfig(
        options.runtimeConfigUrl ?? '/assets/config/portal-config.json'
      )
    );

  return providers;
}