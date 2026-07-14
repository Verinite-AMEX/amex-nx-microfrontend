import { Injectable, inject } from '@angular/core';

import { LoggerService } from '../logging/logger.service';

export type NotificationType =
  | 'success'
  | 'info'
  | 'warning'
  | 'error';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private readonly logger = inject(LoggerService);

  /**
   * Success notification.
   */
  success(message: string, title?: string): void {
    this.notify('success', message, title);
  }

  /**
   * Information notification.
   */
  info(message: string, title?: string): void {
    this.notify('info', message, title);
  }

  /**
   * Warning notification.
   */
  warning(message: string, title?: string): void {
    this.notify('warning', message, title);
  }

  /**
   * Error notification.
   */
  error(message: string, title?: string): void {
    this.notify('error', message, title);
  }

  /**
   * Central notification handler.
   *
   * TODO:
   * Replace console output with VN Core UI Toast /
   * Angular Material Snackbar /
   * PrimeNG Toast when UI implementation is ready.
   */
  private notify(
    type: NotificationType,
    message: string,
    title?: string
  ): void {

    switch (type) {

      case 'success':
        this.logger.logInfo(
          'Notification',
          `${title ?? 'Success'} - ${message}`
        );
        console.log(`✅ ${title ?? 'Success'}: ${message}`);
        break;

      case 'info':
        this.logger.logInfo(
          'Notification',
          `${title ?? 'Info'} - ${message}`
        );
        console.info(`ℹ️ ${title ?? 'Info'}: ${message}`);
        break;

      case 'warning':
        this.logger.logWarn(
          'Notification',
          `${title ?? 'Warning'} - ${message}`
        );
        console.warn(`⚠️ ${title ?? 'Warning'}: ${message}`);
        break;

      case 'error':
        this.logger.logError(
          'Notification',
          message
        );
        console.error(`❌ ${title ?? 'Error'}: ${message}`);
        break;

    }

  }

}