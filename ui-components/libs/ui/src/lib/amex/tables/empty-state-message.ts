import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * EmptyStateMessage
 * Shown when no results found or no eligible items exist.
 * Supports both portal styles:
 * - bcrb: "No Data Found" bold centered (matches SOC/ROC image16, BCRB)
 * - oms: "No merchants are available." green info box (matches OMS image10)
 * Source: Lounge Rationalization, SOC/ROC, all portals
 */
@Component({
  selector: 'amex-empty-state-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- BCRB/ONLS style: bold centered "No Data Found" -->
    <div *ngIf="variant === 'default'" class="esm-default">
      <div class="esm-default__icon" *ngIf="icon">{{ icon }}</div>
      <div class="esm-default__text">{{ message }}</div>
      <button *ngIf="ctaLabel" class="esm-default__btn" (click)="ctaClick.emit()">
        {{ ctaLabel }}
      </button>
    </div>

    <!-- OMS style: light green info box -->
    <div *ngIf="variant === 'oms'" class="esm-oms">
      <span class="esm-oms__text">{{ message }}</span>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* BCRB/ONLS default: bold centered text */
    .esm-default {
      text-align: center; padding: 40px 24px;
      display: flex; flex-direction: column; align-items: center; gap: 10px;
    }
    .esm-default__icon { font-size: 36px; opacity: 0.5; }
    .esm-default__text { font-weight: bold; font-size: 14px; color: #333; }
    .esm-default__btn {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 5px 18px; font-size: 13px; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 2px; margin-top: 6px;
    }
    .esm-default__btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }

    /* OMS: light green info box */
    .esm-oms {
      background: #dff0d8; border: 1px solid #c3e6cb;
      padding: 10px 16px; font-size: 13px; color: #306030;
    }
  `],
})
export class AmexEmptyStateMessageComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `empty-state-message-${++AmexEmptyStateMessageComponent._idCounter}`;


  @Input() message = 'No Data Found';
  @Input() icon = '';
  @Input() ctaLabel = '';
  @Input() variant: 'default' | 'oms' = 'default';
  @Output() ctaClick = new EventEmitter<void>();
}
