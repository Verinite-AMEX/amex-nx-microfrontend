import { InjectionToken } from '@angular/core';
import { AmexTabItem } from '../navigation/tab-bar';
import { AmexSidebarMenuItem } from '../navigation/sidebar-menu';

/* ============================================================================
   AUTH ADAPTER
============================================================================ */
export interface AmexPortalAuthAdapter {
  getUsername(): string;
  logout(): void;
}
export const AMEX_PORTAL_AUTH_ADAPTER =
  new InjectionToken<AmexPortalAuthAdapter>('AMEX_PORTAL_AUTH_ADAPTER');

/* ============================================================================
   NAVIGATION ADAPTER
============================================================================ */
export interface AmexPortalNavigationAdapter {
  getTabs?(): AmexTabItem[];
  getSidebarItems?(): AmexSidebarMenuItem[];
  onTabClick?(id: string): void;
  onSidebarClick?(id: string): void;
}
export const AMEX_PORTAL_NAVIGATION_ADAPTER =
  new InjectionToken<AmexPortalNavigationAdapter>('AMEX_PORTAL_NAVIGATION_ADAPTER');

/* ============================================================================
   THEME ADAPTER
   Portal provides its own theme implementation.
   Usage: { provide: AMEX_PORTAL_THEME_ADAPTER, useClass: MyThemeAdapter }
============================================================================ */
export interface AmexPortalThemeAdapter {
  /** Returns active CSS theme name. */
  getTheme(): string;
  /** Applies theme at runtime (e.g. sets CSS vars on :root). */
  applyTheme(theme: string): void;
  /** Optional: subscribe to external theme changes. */
  onThemeChange?(callback: (theme: string) => void): void;
}
export const AMEX_PORTAL_THEME_ADAPTER =
  new InjectionToken<AmexPortalThemeAdapter>('AMEX_PORTAL_THEME_ADAPTER');

/* ============================================================================
   ANALYTICS ADAPTER
   Portal provides its own tracking implementation.
============================================================================ */
export interface AmexPortalAnalyticsAdapter {
  trackPageView(pageName: string, metadata?: Record<string, unknown>): void;
  trackEvent(event: string, metadata?: Record<string, unknown>): void;
}
export const AMEX_PORTAL_ANALYTICS_ADAPTER =
  new InjectionToken<AmexPortalAnalyticsAdapter>('AMEX_PORTAL_ANALYTICS_ADAPTER');

/* ============================================================================
   USER CONTEXT ADAPTER
   Portal provides user id, roles, locale.
============================================================================ */
export interface AmexPortalUserContextAdapter {
  getUserId(): string;
  getRoles(): string[];
  hasRole(role: string): boolean;
  getLocale(): string;
}
export const AMEX_PORTAL_USER_CONTEXT_ADAPTER =
  new InjectionToken<AmexPortalUserContextAdapter>('AMEX_PORTAL_USER_CONTEXT_ADAPTER');

/* ============================================================================
   FEATURE FLAG ADAPTER
   Falls back to config.features map if not provided.
============================================================================ */
export interface AmexPortalFeatureFlagAdapter {
  isEnabled(flag: string): boolean;
  getFlags(): Record<string, boolean>;
}
export const AMEX_PORTAL_FEATURE_FLAG_ADAPTER =
  new InjectionToken<AmexPortalFeatureFlagAdapter>('AMEX_PORTAL_FEATURE_FLAG_ADAPTER');