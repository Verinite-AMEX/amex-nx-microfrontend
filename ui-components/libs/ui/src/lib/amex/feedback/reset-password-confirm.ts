import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button';
import { AmexPortalStyle } from './success-toast';

@Component({
  selector: 'amex-reset-password-confirm',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="amex-modal-overlay" *ngIf="visible">

      <!-- ONLS style: browser-style dialog -->
      <div *ngIf="portalStyle === 'onls'" class="onls-dialog" role="dialog">
        <div class="onls-dialog__titlebar">{{ siteLabel }}</div>
        <div class="onls-dialog__body">
          <div class="onls-dialog__icon-row">
            <span class="onls-icon">🔒</span>
            <div>
              <p class="onls-dialog__q">Reset password for <strong>{{ userName }}</strong>?</p>
              <p class="onls-dialog__sub" *ngIf="userEmail">A temporary password will be sent to {{ userEmail }}.</p>
            </div>
          </div>
          <div class="onls-dialog__actions">
            <ui-button class="onls-btn-wrap onls-btn-wrap--secondary"
              label="Cancel" size="sm" variant="ghost"
              (click)="cancel.emit(); visible=false">
            </ui-button>
            <ui-button class="onls-btn-wrap onls-btn-wrap--primary"
              label="Reset Password" size="sm" variant="primary"
              (click)="confirm.emit(); visible=false">
            </ui-button>
          </div>
        </div>
      </div>

      <!-- OMS style: white card with purple accent -->
      <div *ngIf="portalStyle === 'oms'" class="oms-dialog" role="dialog">
        <div class="oms-dialog__header">Reset Password</div>
        <div class="oms-dialog__body">
          <p class="oms-dialog__q">Are you sure you want to reset the password for:</p>
          <div class="oms-user-card">
            <div class="oms-user-card__name">{{ userName }}</div>
            <div class="oms-user-card__email" *ngIf="userEmail">{{ userEmail }}</div>
          </div>
          <p class="oms-dialog__sub">A temporary password will be sent to their registered email.</p>
        </div>
        <div class="oms-dialog__actions">
          <ui-button class="oms-btn-wrap oms-btn-wrap--back"
            label="Cancel" size="md" variant="ghost"
            (click)="cancel.emit(); visible=false">
          </ui-button>
          <ui-button class="oms-btn-wrap oms-btn-wrap--primary"
            label="Reset Password" size="md" variant="primary"
            (click)="confirm.emit(); visible=false">
          </ui-button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .amex-modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center; z-index: 9999;
    }
    /* ONLS */
    .onls-dialog {
      background: #fff; border: 1px solid #aaa; border-radius: 8px;
      width: 380px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      font-family: Arial, sans-serif; overflow: hidden;
    }
    .onls-dialog__titlebar {
      background: #e8f0fe; border-bottom: 1px solid #ccc;
      padding: 8px 14px; font-size: 12px; color: #333; font-weight: bold;
    }
    .onls-dialog__body { padding: 18px 20px 16px; }
    .onls-dialog__icon-row { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 16px; }
    .onls-icon { font-size: 26px; flex-shrink: 0; }
    .onls-dialog__q { font-size: 13px; color: #222; margin: 0 0 4px; font-weight: bold; }
    .onls-dialog__sub { font-size: 12px; color: #666; margin: 0; }
    .onls-dialog__actions { display: flex; justify-content: flex-end; gap: 8px; }
    /* Themed via ui-button's exposed CSS custom properties — no ::ng-deep. */
    .onls-btn-wrap {
      --btn-radius: 3px; --btn-padding: 5px 18px; --btn-font-size: 13px;
    }
    .onls-btn-wrap--primary {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf); --btn-color: #fff; --btn-border: 1px solid #005fba;
    }
    .onls-btn-wrap--primary:hover { --btn-bg: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .onls-btn-wrap--secondary {
      --btn-bg: linear-gradient(to bottom, #f5f5f5, #ddd); --btn-color: #333; --btn-border: 1px solid #bbb;
    }
    .onls-btn-wrap--secondary:hover { --btn-bg: linear-gradient(to bottom, #eee, #ccc); }
    /* OMS */
    .oms-dialog {
      background: #fff; border-radius: 4px; width: 400px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.2); font-family: Arial, sans-serif;
      overflow: hidden; border-top: 4px solid #7b1fa2;
    }
    .oms-dialog__header {
      padding: 14px 20px 10px; font-size: 16px; font-weight: bold;
      color: #1a1a1a; border-bottom: 1px solid #e0e0e0;
    }
    .oms-dialog__body { padding: 16px 20px; }
    .oms-dialog__q { font-size: 13px; color: #444; margin: 0 0 12px; }
    .oms-user-card {
      background: #f5f5f5; border-radius: 4px; padding: 10px 14px;
      margin-bottom: 10px; display: inline-block; min-width: 200px;
    }
    .oms-user-card__name { font-weight: bold; font-size: 14px; color: #1a1a1a; }
    .oms-user-card__email { font-size: 12px; color: #888; margin-top: 2px; }
    .oms-dialog__sub { font-size: 12px; color: #888; margin: 0; }
    .oms-dialog__actions {
      padding: 10px 20px 14px; display: flex; justify-content: flex-end; gap: 10px;
      border-top: 1px solid #f0f0f0;
    }
    /* Themed via ui-button's exposed CSS custom properties — no ::ng-deep. */
    .oms-btn-wrap {
      --btn-radius: 3px; --btn-padding: 8px 22px; --btn-font-size: 13px;
    }
    .oms-btn-wrap--primary { --btn-bg: #7b1fa2; --btn-color: #fff; }
    .oms-btn-wrap--primary:hover { --btn-bg: #6a1b9a; }
    .oms-btn-wrap--back { --btn-bg: #1e3a5f; --btn-color: #fff; }
    .oms-btn-wrap--back:hover { --btn-bg: #16304f; }
  `],
})
export class AmexResetPasswordConfirmComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `reset-password-confirm-${++AmexResetPasswordConfirmComponent._idCounter}`;

  @Input() visible = false;
  @Input() portalStyle: AmexPortalStyle = 'oms';
  @Input() userName = '';
  @Input() userEmail = '';
  @Input() siteLabel = 'tst-websrv01 says';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}