import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';

/**
 * LogoutConfirmation
 * Matches the browser-native style dialog seen in ONLS portal screenshots.
 * Gray titlebar "stg-websrv01 says" + message + OK / Cancel buttons.
 */
@Component({
  selector: 'amex-logout-confirmation',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div *ngIf="visible" class="overlay" (click)="onOverlay($event)">
      <div class="dialog" role="dialog" aria-modal="true">
        <div class="dialog__titlebar">{{ serverLabel }}</div>
        <div class="dialog__body">
          <p class="dialog__msg">{{ message }}</p>
        </div>
        <div class="dialog__actions">
          <ui-button [id]="id + '-ok'" class="dialog__btn-wrap dialog__btn-wrap--ok"
            label="OK" size="sm" (click)="confirm.emit()">
          </ui-button>
          <ui-button [id]="id + '-cancel'" class="dialog__btn-wrap dialog__btn-wrap--cancel"
            label="Cancel" size="sm" (click)="cancel.emit()">
          </ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { font-family: Arial, sans-serif; }
    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.3);
      display: flex; align-items: flex-start; justify-content: flex-end;
      padding: 56px 16px 0 0; z-index: 9999;
    }
    .dialog {
      background: #fff; border: 1px solid #bbb;
      box-shadow: 3px 3px 10px rgba(0,0,0,0.25);
      width: 360px; font-size: 13px;
    }
    .dialog__titlebar {
      background: #ebebeb; border-bottom: 1px solid #ccc;
      padding: 7px 12px; font-weight: bold; font-size: 12px; color: #333;
    }
    .dialog__body { padding: 14px 14px 10px; color: #333; line-height: 1.5; }
    .dialog__msg { margin: 0; }
    .dialog__actions {
      padding: 8px 14px 12px; display: flex;
      justify-content: flex-end; gap: 8px;
    }
    /* ui-button is styled via its exposed CSS custom properties, not ::ng-deep,
       since custom properties inherit across component boundaries regardless
       of view encapsulation. */
    .dialog__btn-wrap--ok {
      --btn-bg: #006fcf; --btn-color: #fff; --btn-radius: 2px;
      --btn-padding: 4px 20px; --btn-font-size: 12px;
    }
    .dialog__btn-wrap--ok:hover { --btn-bg: #005ba3; }
    .dialog__btn-wrap--cancel {
      --btn-bg: #f5f5f5; --btn-color: #333; --btn-radius: 2px;
      --btn-padding: 4px 20px; --btn-font-size: 12px;
    }
    .dialog__btn-wrap--cancel:hover { --btn-bg: #e8e8e8; }
  `],
})
export class AmexLogoutConfirmationComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `logout-confirmation-${++AmexLogoutConfirmationComponent._idCounter}`;

  @Input() visible = false;
  @Input() serverLabel = 'tst-websrv01 says';
  @Input() message = 'Are you sure you want to log out?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onOverlay(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('overlay')) {
      this.cancel.emit();
    }
  }
}