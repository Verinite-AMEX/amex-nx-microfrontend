import { inject, Injectable } from '@angular/core';

import { API_BASE_URL } from './api-base-url.token';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {

  /**
   * Login-Logout application URL.
   *
   * TODO:
   * Move to environment.ts once every standalone
   * application has its own environment configuration.
   */
  private readonly loginAppUrl =
    'http://localhost:4216/login';

  private readonly apiBaseUrl = inject(API_BASE_URL);

  /**
   * Returns API Gateway base URL.
   */
  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }

  /**
   * Returns Login application URL.
   */
  getLoginAppUrl(): string {
    return this.loginAppUrl;
  }

}