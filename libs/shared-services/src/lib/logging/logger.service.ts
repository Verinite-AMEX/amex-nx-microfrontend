import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, EMPTY } from 'rxjs';

import { API_BASE_URL } from '../config/api-base-url.token';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl = inject(API_BASE_URL);

  /**
   * Logs information.
   */
  logInfo(context: string, message: string): void {
    console.info(`[${context}]`, message);
  }

  /**
   * Logs warning.
   */
  logWarn(context: string, message: string): void {
    console.warn(`[${context}]`, message);
  }

  /**
   * Logs debug information.
   */
  logDebug(context: string, data?: unknown): void {
    console.debug(`[${context}]`, data);
  }

  /**
   * Logs error locally and sends it to backend.
   */
  logError(context: string, error: unknown): void {

    console.error(`[${context}]`, error);

    this.http
      .post(
        `${this.baseUrl}/api/logs/error`,
        {
          context,
          message: this.serialize(error),
          timestamp: new Date().toISOString(),
          url: window.location.href,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(
        catchError(() => EMPTY)
      )
      .subscribe();

  }

  /**
   * Converts unknown error into a readable string.
   */
  private serialize(error: unknown): string {

    if (error instanceof Error) {
      return error.message;
    }

    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }

  }

}