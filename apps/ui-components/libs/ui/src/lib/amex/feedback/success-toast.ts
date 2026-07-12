import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AmexPortalStyle = 'onls' | 'oms';

@Component({
  selector: 'amex-success-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="visible">

      <!-- ONLS Style: light green inline box (matches image7 - forgot password success screen) -->
      <div *ngIf="portalStyle === 'onls'" class="onls-success" role="status">
        {{ message }}
        <button *ngIf="dismissible" class="onls-success__close" (click)="dismiss()">×</button>
      </div>

      <!-- OMS/BCRB Style: solid blue-green banner with tick icon -->
      <div *ngIf="portalStyle === 'oms'" class="oms-success" role="status">
        <span class="oms-success__tick">✓</span>
        <span class="oms-success__msg">{{ message }}</span>
        <button *ngIf="dismissible" class="oms-success__close" (click)="dismiss()">×</button>
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
    .onls-success__close {
      background: none; border: none; font-size: 16px;
      color: #306030; cursor: pointer; padding: 0; opacity: 0.7; flex-shrink: 0;
    }
    .onls-success__close:hover { opacity: 1; }

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
    .oms-success__close {
      background: none; border: none; font-size: 18px;
      color: #fff; cursor: pointer; opacity: 0.8; padding: 0;
    }
    .oms-success__close:hover { opacity: 1; }
  `],
})
export class AmexSuccessToastComponent implements OnInit, OnDestroy {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `success-toast-${++AmexSuccessToastComponent._idCounter}`;


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
