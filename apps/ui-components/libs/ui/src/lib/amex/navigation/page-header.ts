import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PageHeader
 * ──────────────────────────────────────────────────────────────────
 * ONLS style  — "PRIORITY PASS™ ENROLLMENT", "SELECT & PAY WITH POINTS"
 *               Solid medium-dark blue banner (#1c4f8c), white ALL-CAPS
 *               bold text 16px, full width.
 *               Source: lounge/image4, lounge/image9, pay_points/image5
 *
 * OMS style   — "EDIT YOUR PROFILE", "MRM USER ADMINISTRATION"
 *               Uppercase dark-navy (#1e3a5f) title + 3px purple (#7b1fa2) rule.
 *               Source: oms/image55
 *
 * Both styles support subtitle and optional right-aligned CTA button.
 */
@Component({
  selector: 'amex-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ── ONLS: solid blue banner ─────────────────────────────── -->
    <div *ngIf="portalStyle === 'onls'" class="onls-header">
      <div class="onls-header__left">
        <span class="onls-header__title">{{ title }}</span>
        <span *ngIf="subtitle" class="onls-header__subtitle">{{ subtitle }}</span>
      </div>
      <button *ngIf="ctaLabel" class="onls-header__cta" (click)="ctaClick.emit()">
        {{ ctaLabel }}
      </button>
    </div>

    <!-- ── OMS: title + purple rule ────────────────────────────── -->
    <div *ngIf="portalStyle === 'oms'" class="oms-header">
      <div class="oms-header__row">
        <div class="oms-header__left">
          <div class="oms-header__title">{{ title }}</div>
          <div *ngIf="subtitle" class="oms-header__subtitle">{{ subtitle }}</div>
        </div>
        <button *ngIf="ctaLabel" class="oms-header__cta" (click)="ctaClick.emit()">
          {{ ctaLabel }}
        </button>
      </div>
      <div class="oms-header__rule"></div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* ── ONLS ──────────────────────────────────────────────────
       FIXED: was #1e3a6e (too dark navy) — screenshots show a
       medium steel blue #1c4f8c (lounge/image4, lounge/image9,
       pay_points/image5, supp/image4, online_helper/image4).
       FIXED: font-size was 15px — screenshots show 16px.
       ADDED: subtitle + CTA button support.
    ─────────────────────────────────────────────────────────── */
    .onls-header {
      background: #1c4f8c;
      color: #fff;
      padding: 11px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .onls-header__left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .onls-header__title {
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      line-height: 1.25;
    }
    .onls-header__subtitle {
      font-size: 12px;
      font-weight: normal;
      color: rgba(255,255,255,0.80);
      text-transform: none;
    }
    .onls-header__cta {
      flex-shrink: 0;
      background: #fff;
      color: #1c4f8c;
      border: none;
      padding: 5px 14px;
      font-size: 13px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      border-radius: 2px;
      cursor: pointer;
      white-space: nowrap;
    }
    .onls-header__cta:hover { background: #e8f0fb; }

    /* ── OMS ───────────────────────────────────────────────────
       Unchanged from screenshots — dark navy title, 3px purple rule.
       ADDED: subtitle + CTA button (e.g. "Request New Report +").
    ─────────────────────────────────────────────────────────── */
    .oms-header {}
    .oms-header__row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 6px;
    }
    .oms-header__left {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .oms-header__title {
      font-size: 15px;
      font-weight: bold;
      color: #1e3a5f;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .oms-header__subtitle {
      font-size: 12px;
      color: #555;
    }
    .oms-header__rule {
      height: 3px;
      background: #7b1fa2;
      width: 100%;
    }
    .oms-header__cta {
      flex-shrink: 0;
      background: transparent;
      color: #006fcf;
      border: 1px solid #006fcf;
      padding: 4px 12px;
      font-size: 13px;
      font-family: Arial, sans-serif;
      border-radius: 3px;
      cursor: pointer;
      white-space: nowrap;
      margin-top: 2px;
    }
    .oms-header__cta:hover { background: #e3f0ff; }
  `],
})
export class AmexPageHeaderComponent {
  @Input() portalStyle: 'onls' | 'oms' = 'onls';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() ctaLabel = '';
  @Output() ctaClick = new EventEmitter<void>();
}
