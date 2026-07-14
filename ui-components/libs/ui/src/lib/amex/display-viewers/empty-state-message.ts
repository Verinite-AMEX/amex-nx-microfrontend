import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button';

/**
 * EmptyStateMessage
 * Shown when no results found or no eligible items exist.
 * Supports both portal styles:
 * - default: bold centered text + optional icon + optional CTA (BCRB/ONLS/SOC/ROC style)
 * - oms:     light green info box (OMS portal style)
 * - error:   red text inline (Priority Pass "No eligible cards" style)
 * Source: Lounge Rationalization, SOC/ROC, all portals
 */
@Component({
  selector: 'amex-empty-state-message',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <!-- BCRB/ONLS/SOC default: bold centred -->
    <div *ngIf="variant === 'default'" class="esm-default">
      <div class="esm-default__icon" *ngIf="icon">{{ icon }}</div>
      <div class="esm-default__text">{{ message }}</div>
      <ui-button *ngIf="ctaLabel" class="esm-default__btn" variant="secondary" [label]="ctaLabel" (click)="ctaClick.emit()"></ui-button>
    </div>

    <!-- OMS: light green info box -->
    <div *ngIf="variant === 'oms'" class="esm-oms">
      <span class="esm-oms__text">{{ message }}</span>
    </div>

    <!-- Priority Pass / ONLS inline red error text -->
    <div *ngIf="variant === 'error'" class="esm-error">
      {{ message }}
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* Default: bold centred */
    .esm-default {
      text-align: center; padding: 40px 24px;
      display: flex; flex-direction: column; align-items: center; gap: 10px;
    }
    .esm-default__icon { font-size: 36px; opacity: 0.5; }
    .esm-default__text { font-weight: bold; font-size: 14px; color: #333; }
    .esm-default__btn {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-bg-hover: linear-gradient(to bottom, #4a92cf, #0058a6);
      --btn-color: #fff;
      --btn-border: 1px solid #005fba;
      --btn-padding: 5px 18px;
      --btn-font-size: 13px;
      --btn-radius: 2px;
      margin-top: 6px;
    }

    /* OMS: light green info box */
    .esm-oms {
      background: #dff0d8; border: 1px solid #c3e6cb;
      padding: 10px 16px; font-size: 13px; color: #306030;
    }

    /* Priority Pass / ONLS inline red text */
    .esm-error {
      font-size: 13px; color: #c00;
      padding: 8px 0;
    }
  `],
})
export class AmexEmptyStateMessageComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `empty-state-message-${++AmexEmptyStateMessageComponent._idCounter}`;

  @Input() message  = 'No Data Found';
  @Input() icon     = '';
  @Input() ctaLabel = '';
  @Input() variant: 'default' | 'oms' | 'error' = 'default';
  @Output() ctaClick = new EventEmitter<void>();
}