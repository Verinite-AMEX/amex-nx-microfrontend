import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button';

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
  imports: [CommonModule, ButtonComponent],
  template: `
    <!-- ── ONLS: solid blue banner ─────────────────────────────── -->
    <div *ngIf="portalStyle === 'onls'" class="onls-header">
      <div class="onls-header__left">
        <span class="onls-header__title">{{ title }}</span>
        <span *ngIf="subtitle" class="onls-header__subtitle">{{ subtitle }}</span>
      </div>
      <ui-button *ngIf="ctaLabel" [id]="id + '-cta'" class="onls-header__cta-wrap"
        [label]="ctaLabel" size="sm" (click)="ctaClick.emit()">
      </ui-button>
    </div>

    <!-- ── OMS: title + purple rule ────────────────────────────── -->
    <div *ngIf="portalStyle === 'oms'" class="oms-header">
      <div class="oms-header__row">
        <div class="oms-header__left">
          <div class="oms-header__title">{{ title }}</div>
          <div *ngIf="subtitle" class="oms-header__subtitle">{{ subtitle }}</div>
        </div>
        <ui-button *ngIf="ctaLabel" [id]="id + '-cta'" class="oms-header__cta-wrap"
          [label]="ctaLabel" size="sm" variant="ghost" (click)="ctaClick.emit()">
        </ui-button>
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
    /* Themed via ui-button's exposed CSS custom properties — no ::ng-deep. */
    .onls-header__cta-wrap {
      flex-shrink: 0;
      --btn-bg: #fff; --btn-color: #1c4f8c; --btn-radius: 2px;
      --btn-padding: 5px 14px; --btn-font-size: 13px;
    }
    .onls-header__cta-wrap:hover { --btn-bg: #e8f0fb; }

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
    /* Themed via ui-button's exposed CSS custom properties — no ::ng-deep. */
    .oms-header__cta-wrap {
      flex-shrink: 0;
      margin-top: 2px;
      --btn-color: #006fcf; --btn-border: 1px solid #006fcf; --btn-radius: 3px;
      --btn-padding: 4px 12px; --btn-font-size: 13px;
    }
    .oms-header__cta-wrap:hover { --btn-bg: #e3f0ff; }
  `],
})
export class AmexPageHeaderComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `page-header-${++AmexPageHeaderComponent._idCounter}`;

  @Input() portalStyle: 'onls' | 'oms' = 'onls';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() ctaLabel = '';
  @Output() ctaClick = new EventEmitter<void>();
}