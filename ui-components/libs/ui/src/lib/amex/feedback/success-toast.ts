import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../atoms/icon-button';

export type AmexPortalStyle = 'onls' | 'oms';

@Component({
  selector: 'amex-success-toast',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  template: `
    <ng-container *ngIf="visible">

      <!-- ONLS Style: light green inline box (matches image7 - forgot password success screen) -->
      <div *ngIf="portalStyle === 'onls'" class="onls-success" role="status">
        {{ message }}
        <ui-icon-button *ngIf="dismissible" class="onls-success__close-wrap"
          icon="✕" size="sm" variant="ghost" ariaLabel="Close"
          (clicked)="dismiss()">
        </ui-icon-button>
      </div>

      <!-- OMS/BCRB Style: solid blue-green banner with tick icon -->
      <div *ngIf="portalStyle === 'oms'" class="oms-success" role="status">
        <span class="oms-success__tick">✓</span>
        <span class="oms-success__msg">{{ message }}</span>
        <ui-icon-button *ngIf="dismissible" class="oms-success__close-wrap"
          icon="✕" size="sm" variant="ghost" ariaLabel="Close"
          (clicked)="dismiss()">
        </ui-icon-button>
      </div>

    </ng-container>
  `,
  styles: [`
    /* ONLS: green box exactly as in portal screenshot */
    .onls-success {
      background: #dff0d8;
      border: 1px solid #b2dba1;
      padding: 10px 14px;
      font-family: Arial, sans-serif;
      font-size: 13px;
      color: #306030;
      line-height: 1.5;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    /* Themed via ui-icon-button's exposed CSS custom properties — no ::ng-deep. */
    .onls-success__close-wrap {
      --icon-btn-color: #306030;
      --icon-btn-bg: transparent;
      --icon-btn-hover-bg: rgba(48,96,48,0.1);
      --icon-btn-size: 20px;
    }

    /* OMS/BCRB: teal-green solid banner */
    .oms-success {
      background: #2e7d32;
      color: #fff;
      padding: 10px 16px;
      font-family: Arial, sans-serif;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 2px;
    }
    .oms-success__tick {
      width: 18px; height: 18px; border-radius: 50%;
      background: #fff; color: #2e7d32;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: bold; flex-shrink: 0;
    }
    .oms-success__msg { flex: 1; }
    /* Themed via ui-icon-button's exposed CSS custom properties — no ::ng-deep. */
    .oms-success__close-wrap {
      --icon-btn-color: #fff;
      --icon-btn-bg: transparent;
      --icon-btn-hover-bg: rgba(255,255,255,0.2);
      --icon-btn-size: 20px;
    }
  `],
})
export class AmexSuccessToastComponent implements OnInit, OnDestroy {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `success-toast-${++AmexSuccessToastComponent._idCounter}`;

  @Input() message = 'Operation completed successfully.';
  @Input() portalStyle: AmexPortalStyle = 'onls';
  @Input() dismissible = true;
  @Input() autoDismiss = false;
  @Input() duration = 4000;
  @Output() dismissed = new EventEmitter<void>();

  visible = true;
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit() {
    if (this.autoDismiss) {
      this.timer = setTimeout(() => this.dismiss(), this.duration);
    }
  }
  ngOnDestroy() { if (this.timer) clearTimeout(this.timer); }
  dismiss() { this.visible = false; this.dismissed.emit(); }
}