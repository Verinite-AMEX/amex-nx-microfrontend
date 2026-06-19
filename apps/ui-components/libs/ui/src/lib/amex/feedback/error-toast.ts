import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexPortalStyle } from './success-toast';

@Component({
  selector: 'amex-error-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="visible">

      <!-- ONLS style: red text message inline above the form (matches portal screenshots) -->
      <div *ngIf="portalStyle === 'onls'" class="onls-error" role="alert">
        <span class="onls-error__icon">✕</span>
        <span class="onls-error__msg">{{ message }}</span>
        <button *ngIf="showRetry" class="onls-error__retry" (click)="retry.emit()">Try Again</button>
        <button *ngIf="dismissible" class="onls-error__close" (click)="dismiss()">×</button>
      </div>

      <!-- OMS/BCRB style: red text banner (matches BCRB "NO RESPONSE FROM BACKEND" red text) -->
      <div *ngIf="portalStyle === 'oms'" class="oms-error" role="alert">
        <span class="oms-error__icon">!</span>
        <span class="oms-error__msg">{{ message }}</span>
        <button *ngIf="showRetry" class="oms-error__retry" (click)="retry.emit()">Retry</button>
        <button *ngIf="dismissible" class="oms-error__close" (click)="dismiss()">×</button>
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
    .onls-error__retry {
      background: none; border: 1px solid #c0392b; border-radius: 2px;
      color: #c0392b; font-size: 12px; padding: 2px 8px; cursor: pointer;
      white-space: nowrap; font-family: Arial, sans-serif;
    }
    .onls-error__retry:hover { background: #c0392b; color: #fff; }
    .onls-error__close {
      background: none; border: none; font-size: 16px;
      color: #c0392b; cursor: pointer; padding: 0; opacity: 0.7; flex-shrink: 0;
    }
    .onls-error__close:hover { opacity: 1; }

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
    .oms-error__retry {
      background: #fff; border: none; border-radius: 2px;
      color: #c62828; font-size: 12px; padding: 3px 10px; cursor: pointer;
      font-family: Arial, sans-serif; white-space: nowrap;
    }
    .oms-error__retry:hover { background: #fce4e4; }
    .oms-error__close {
      background: none; border: none; font-size: 18px;
      color: #fff; cursor: pointer; padding: 0; opacity: 0.8;
    }
    .oms-error__close:hover { opacity: 1; }
  `],
})
export class AmexErrorToastComponent {
  @Input() message = 'An error occurred. Please try again.';
  @Input() portalStyle: AmexPortalStyle = 'onls';
  @Input() showRetry = false;
  @Input() dismissible = true;
  @Output() retry = new EventEmitter<void>();
  @Output() dismissed = new EventEmitter<void>();

  visible = true;
  dismiss() { this.visible = false; this.dismissed.emit(); }
}
