import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';
import { AmexPortalStyle } from './success-toast';

@Component({
  selector: 'amex-confirmation-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="amex-modal-overlay" *ngIf="visible" (click)="onOverlay($event)">

      <!-- ONLS style: mimics browser native alert dialog (image7 shows browser dialog) -->
      <div *ngIf="portalStyle === 'onls'" class="onls-dialog" role="dialog" aria-modal="true">
        <div class="onls-dialog__titlebar">
          <span class="onls-dialog__site">{{ siteLabel }}</span>
        </div>
        <div class="onls-dialog__body">
          <div class="onls-dialog__icon-row">
            <span class="onls-dialog__warn-icon">⚠</span>
            <p class="onls-dialog__message">{{ message }}</p>
          </div>
          <div class="onls-dialog__actions">
            <ui-button class="onls-btn-wrap onls-btn-wrap--secondary"
              [label]="cancelLabel" size="sm" variant="ghost"
              (click)="cancel.emit(); visible=false">
            </ui-button>
            <ui-button class="onls-btn-wrap onls-btn-wrap--primary"
              [label]="confirmLabel" size="sm" variant="primary"
              (click)="confirm.emit(); visible=false">
            </ui-button>
          </div>
        </div>
      </div>

      <!-- OMS style: white card dialog with purple accent (matches OMS portal design) -->
      <div *ngIf="portalStyle === 'oms'" class="oms-dialog" role="dialog" aria-modal="true">
        <div class="oms-dialog__header">{{ title }}</div>
        <div class="oms-dialog__body">
          <p class="oms-dialog__message">{{ message }}</p>
        </div>
        <div class="oms-dialog__actions">
          <ui-button class="oms-btn-wrap oms-btn-wrap--back"
            [label]="cancelLabel" size="md" variant="ghost"
            (click)="cancel.emit(); visible=false">
          </ui-button>
          <ui-button class="oms-btn-wrap oms-btn-wrap--primary"
            [label]="confirmLabel" size="md" variant="primary"
            (click)="confirm.emit(); visible=false">
          </ui-button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .amex-modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 9999;
    }

    /* ONLS: mimics the browser native dialog seen in portal image7 */
    .onls-dialog {
      background: #fff;
      border: 1px solid #aaa;
      border-radius: 8px;
      width: 380px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      font-family: Arial, sans-serif;
      overflow: hidden;
    }
    .onls-dialog__titlebar {
      background: #e8f0fe;
      border-bottom: 1px solid #ccc;
      padding: 8px 14px;
      font-size: 12px;
      color: #333;
      font-weight: bold;
    }
    .onls-dialog__site { color: #555; }
    .onls-dialog__body { padding: 18px 20px 16px; }
    .onls-dialog__icon-row {
      display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px;
    }
    .onls-dialog__warn-icon { font-size: 28px; color: #f5a623; flex-shrink: 0; line-height: 1; }
    .onls-dialog__message { font-size: 13px; color: #222; margin: 0; line-height: 1.5; }
    .onls-dialog__actions { display: flex; justify-content: flex-end; gap: 8px; }
    /* Themed via ui-button's exposed CSS custom properties — no ::ng-deep. */
    .onls-btn-wrap {
      --btn-radius: 3px; --btn-padding: 5px 18px; --btn-font-size: 13px;
    }
    .onls-btn-wrap--primary {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-color: #fff; --btn-border: 1px solid #005fba;
    }
    .onls-btn-wrap--primary:hover { --btn-bg: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .onls-btn-wrap--secondary {
      --btn-bg: linear-gradient(to bottom, #f5f5f5, #ddd);
      --btn-color: #333; --btn-border: 1px solid #bbb;
    }
    .onls-btn-wrap--secondary:hover { --btn-bg: linear-gradient(to bottom, #eee, #ccc); }

    /* OMS: white card with purple top accent, navy + purple buttons */
    .oms-dialog {
      background: #fff;
      border-radius: 4px;
      width: 420px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.2);
      font-family: Arial, sans-serif;
      overflow: hidden;
      border-top: 4px solid #7b1fa2;
    }
    .oms-dialog__header {
      padding: 16px 20px 12px;
      font-size: 16px;
      font-weight: bold;
      color: #1a1a1a;
      border-bottom: 1px solid #e0e0e0;
    }
    .oms-dialog__body { padding: 18px 20px; }
    .oms-dialog__message { font-size: 14px; color: #444; margin: 0; line-height: 1.6; }
    .oms-dialog__actions {
      padding: 12px 20px 16px;
      display: flex; justify-content: flex-end; gap: 10px;
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
export class AmexConfirmationModalComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `confirmation-modal-${++AmexConfirmationModalComponent._idCounter}`;

  @Input() visible = false;
  @Input() portalStyle: AmexPortalStyle = 'onls';
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() confirmLabel = 'OK';
  @Input() cancelLabel = 'Cancel';
  @Input() siteLabel = 'tst-websrv01 says';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onOverlay(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('amex-modal-overlay')) {
      this.visible = false;
      this.cancel.emit();
    }
  }
}