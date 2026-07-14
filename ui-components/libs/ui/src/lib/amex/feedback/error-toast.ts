import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button';
import { IconButtonComponent } from '../../atoms/icon-button';
import { AmexPortalStyle } from './success-toast';

@Component({
  selector: 'amex-error-toast',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconButtonComponent],
  template: `
    <ng-container *ngIf="visible">

      <!-- ONLS style: red text message inline above the form (matches portal screenshots) -->
      <div *ngIf="portalStyle === 'onls'" class="onls-error" role="alert">
        <span class="onls-error__icon">✕</span>
        <span class="onls-error__msg">{{ message }}</span>
        <ui-button *ngIf="showRetry" class="onls-error__retry-wrap"
          label="Try Again" size="sm" variant="ghost"
          (click)="retry.emit()">
        </ui-button>
        <ui-icon-button *ngIf="dismissible" class="onls-error__close-wrap"
          icon="✕" size="sm" variant="ghost" ariaLabel="Dismiss"
          (clicked)="dismiss()">
        </ui-icon-button>
      </div>

      <!-- OMS/BCRB style: red text banner (matches BCRB "NO RESPONSE FROM BACKEND" red text) -->
      <div *ngIf="portalStyle === 'oms'" class="oms-error" role="alert">
        <span class="oms-error__icon">!</span>
        <span class="oms-error__msg">{{ message }}</span>
        <ui-button *ngIf="showRetry" class="oms-error__retry-wrap"
          label="Retry" size="sm" variant="ghost"
          (click)="retry.emit()">
        </ui-button>
        <ui-icon-button *ngIf="dismissible" class="oms-error__close-wrap"
          icon="✕" size="sm" variant="ghost" ariaLabel="Dismiss"
          (clicked)="dismiss()">
        </ui-icon-button>
      </div>

    </ng-container>
  `,
  styles: [`
    /* ONLS: red text + light red background, exactly as seen in portal error states */
    .onls-error {
      background: #fde8e8;
      border: 1px solid #f5c6c6;
      padding: 10px 14px;
      font-family: Arial, sans-serif;
      font-size: 13px;
      color: #c0392b;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .onls-error__icon {
      font-size: 11px;
      width: 16px; height: 16px;
      border-radius: 50%;
      background: #c0392b;
      color: #fff;
      display: inline-flex; align-items: center; justify-content: center;
      font-weight: bold; flex-shrink: 0;
    }
    .onls-error__msg { flex: 1; }
    /* Themed via ui-button's exposed CSS custom properties — no ::ng-deep. */
    .onls-error__retry-wrap {
      --btn-color: #c0392b; --btn-border: 1px solid #c0392b; --btn-bg: transparent;
      --btn-radius: 2px; --btn-padding: 2px 8px; --btn-font-size: 12px;
    }
    .onls-error__retry-wrap:hover { --btn-bg: #c0392b; --btn-color: #fff; }
    /* Themed via ui-icon-button's exposed CSS custom properties — no ::ng-deep. */
    .onls-error__close-wrap {
      --icon-btn-color: #c0392b; --icon-btn-bg: transparent; --icon-btn-size: 20px;
    }

    /* OMS/BCRB: solid red banner matching BCRB "NO RESPONSE FROM BACKEND" status */
    .oms-error {
      background: #c62828;
      color: #fff;
      padding: 10px 16px;
      font-family: Arial, sans-serif;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 2px;
    }
    .oms-error__icon {
      width: 18px; height: 18px; border-radius: 50%;
      background: #fff; color: #c62828;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: bold; flex-shrink: 0;
    }
    .oms-error__msg { flex: 1; }
    /* Themed via ui-button's exposed CSS custom properties — no ::ng-deep. */
    .oms-error__retry-wrap {
      --btn-bg: #fff; --btn-color: #c62828; --btn-border: none;
      --btn-radius: 2px; --btn-padding: 3px 10px; --btn-font-size: 12px;
    }
    .oms-error__retry-wrap:hover { --btn-bg: #fce4e4; }
    /* Themed via ui-icon-button's exposed CSS custom properties — no ::ng-deep. */
    .oms-error__close-wrap {
      --icon-btn-color: #fff; --icon-btn-bg: transparent; --icon-btn-size: 20px;
    }
  `],
})
export class AmexErrorToastComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `error-toast-${++AmexErrorToastComponent._idCounter}`;

  @Input() message = 'An error occurred. Please try again.';
  @Input() portalStyle: AmexPortalStyle = 'onls';
  @Input() showRetry = false;
  @Input() dismissible = true;
  @Output() retry = new EventEmitter<void>();
  @Output() dismissed = new EventEmitter<void>();

  visible = true;
  dismiss() { this.visible = false; this.dismissed.emit(); }
}