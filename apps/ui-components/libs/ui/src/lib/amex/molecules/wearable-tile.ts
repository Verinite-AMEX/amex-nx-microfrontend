import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexStatusBadgeComponent, AmexStatus } from '../atoms/status-badge';

export type AmexWearableType = 'ring' | 'bracelet' | 'band' | 'watch' | 'other';

export interface AmexWearable {
  id: string;
  type: AmexWearableType;
  deviceName: string;
  linkedCardLast4: string;
  status: AmexStatus;
  issuedDate?: string;
  nfcEnabled: boolean;
}

@Component({
  selector: 'amex-wearable-tile',
  standalone: true,
  imports: [CommonModule, AmexStatusBadgeComponent],
  template: `
    <div class="amex-wearable">
      <div class="amex-wearable__icon">{{ typeIcon }}</div>
      <div class="amex-wearable__info">
        <div class="amex-wearable__name">{{ wearable.deviceName }}</div>
        <div class="amex-wearable__meta">
          <span class="amex-wearable__card">Linked: •••• {{ wearable.linkedCardLast4 }}</span>
          <span *ngIf="wearable.nfcEnabled" class="amex-wearable__nfc">NFC</span>
        </div>
        <div *ngIf="wearable.issuedDate" class="amex-wearable__date">Issued: {{ wearable.issuedDate }}</div>
      </div>
      <div class="amex-wearable__right">
        <amex-status-badge [status]="wearable.status"></amex-status-badge>
        <div class="amex-wearable__actions" *ngIf="showActions">
          <button class="amex-wearable__action-btn" (click)="activate.emit(wearable)">Activate</button>
          <button class="amex-wearable__action-btn amex-wearable__action-btn--danger" (click)="suspend.emit(wearable)">Suspend</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .amex-wearable {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      background: #fff;
    }
    .amex-wearable__icon {
      font-size: 28px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f0f4ff;
      border-radius: 10px;
      flex-shrink: 0;
    }
    .amex-wearable__info { flex: 1; }
    .amex-wearable__name { font-size: 14px; font-weight: 600; color: #111; margin-bottom: 4px; }
    .amex-wearable__meta { display: flex; gap: 8px; align-items: center; margin-bottom: 2px; }
    .amex-wearable__card { font-size: 12px; color: #666; font-family: 'Courier New', monospace; }
    .amex-wearable__nfc {
      font-size: 10px; font-weight: 700; color: #016FD0;
      background: #e3f0ff; padding: 1px 6px; border-radius: 6px; letter-spacing: 0.04em;
    }
    .amex-wearable__date { font-size: 11px; color: #aaa; }
    .amex-wearable__right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .amex-wearable__actions { display: flex; gap: 6px; }
    .amex-wearable__action-btn {
      padding: 4px 10px; border-radius: 4px; font-size: 12px;
      border: 1px solid #d0d0d0; background: #fff; cursor: pointer;
    }
    .amex-wearable__action-btn:hover { background: #f5f5f5; }
    .amex-wearable__action-btn--danger { color: #c62828; border-color: #f5c6c6; }
    .amex-wearable__action-btn--danger:hover { background: #ffebee; }
  `],
})
export class AmexWearableTileComponent {
  @Input() wearable!: AmexWearable;
  @Input() showActions = false;
  @Output() activate = new EventEmitter<AmexWearable>();
  @Output() suspend = new EventEmitter<AmexWearable>();

  get typeIcon(): string {
    const icons: Record<AmexWearableType, string> = {
      ring: '💍', bracelet: '⌚', band: '🔗', watch: '⌚', other: '📟',
    };
    return icons[this.wearable?.type ?? 'other'];
  }
}
