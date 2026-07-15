import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexStatusBadgeComponent, AmexStatus } from './currency-logic/status-badge';
import { ButtonComponent } from '../../primitives/button';

export type AmexWearableType = 'ring' | 'bracelet' | 'band' | 'watch' | 'other';
export type AmexWearableButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type AmexWearableButtonSize = 'sm' | 'md' | 'lg';

export interface AmexWearable {
  id: string;
  type: AmexWearableType;
  deviceName: string;
  linkedCardLast4: string;
  status: AmexStatus;
  issuedDate?: string;
  nfcEnabled: boolean;
}

const DEFAULT_TYPE_ICONS: Record<AmexWearableType, string> = {
  ring: '💍',
  bracelet: '⌚',
  band: '🔗',
  watch: '⌚',
  other: '📟',
};

@Component({
  selector: 'amex-wearable-tile',
  standalone: true,
  imports: [CommonModule, AmexStatusBadgeComponent, ButtonComponent],
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
          <ui-button
            [id]="id + '-activate'"
            [label]="activateLabel"
            [variant]="activateVariant"
            [size]="buttonSize"
            [disabled]="disabled || wearable.status === activatedStatus"
            [ariaLabel]="activateAriaLabel || (activateLabel + ' ' + wearable.deviceName)"
            (click)="activate.emit(wearable)">
          </ui-button>
          <ui-button
            [id]="id + '-suspend'"
            [label]="suspendLabel"
            [variant]="suspendVariant"
            [size]="buttonSize"
            [disabled]="disabled || wearable.status === suspendedStatus"
            [ariaLabel]="suspendAriaLabel || (suspendLabel + ' ' + wearable.deviceName)"
            (click)="suspend.emit(wearable)">
          </ui-button>
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
  `],
})
export class AmexWearableTileComponent {
  private static _idCounter = 0;

  @HostBinding('attr.id') @Input() id = `amex-wearable-tile-${++AmexWearableTileComponent._idCounter}`;

  @Input() wearable!: AmexWearable;
  @Input() showActions = false;
  @Input() disabled = false;

  /**
   * Optional status value(s) that should disable the corresponding action (e.g. don't show
   * "Activate" as clickable if already active). Left undefined by default — this component
   * doesn't assume a specific status lifecycle; callers opt in with real AmexStatus values.
   */
  @Input() activatedStatus?: AmexStatus;
  @Input() suspendedStatus?: AmexStatus;

  /** Fully configurable action button copy, styling and a11y — nothing hardcoded. */
  @Input() activateLabel = 'Activate';
  @Input() suspendLabel = 'Suspend';
  @Input() activateVariant: AmexWearableButtonVariant = 'ghost';
  @Input() suspendVariant: AmexWearableButtonVariant = 'danger';
  @Input() buttonSize: AmexWearableButtonSize = 'sm';
  @Input() activateAriaLabel = '';
  @Input() suspendAriaLabel = '';

  /** Optional override/extension of the built-in type→icon glyph map, merged over the defaults. */
  @Input() typeIcons: Partial<Record<AmexWearableType, string>> = {};

  @Output() activate = new EventEmitter<AmexWearable>();
  @Output() suspend = new EventEmitter<AmexWearable>();

  get typeIcon(): string {
    const type = this.wearable?.type ?? 'other';
    return this.typeIcons[type] ?? DEFAULT_TYPE_ICONS[type];
  }
}