import { InjectionToken } from '@angular/core';

/**
 * API_BASE_URL
 * Each app provides its own value in app.config.ts:
 *   { provide: API_BASE_URL, useValue: environment.apiBaseUrl }
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');