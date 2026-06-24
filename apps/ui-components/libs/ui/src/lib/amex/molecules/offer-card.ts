import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexCardBadgeComponent, AmexCardType } from '../atoms/card-badge';

export interface AmexOffer {
  id: string;
  title: string;
  description: string;
  category: string;
  termsAndConditions?: string;
  expiryDate?: string;      // e.g. '31 Dec, 2024'
  merchant?: string;
  eligibleCards?: AmexCardType[];
  enrolled?: boolean;
  isFavorite?: boolean;
  imageUrl?: string;
  hasFlash?: boolean;       // shows ⚡ icon on tile title
}

@Component({
  selector: 'amex-offer-card',
  standalone: true,
  imports: [CommonModule, AmexCardBadgeComponent],
  template: `
    <!-- ══ GRID TILE (list / browse view) ══════════════════════════ -->
    <div *ngIf="!detailMode"
         class="amex-tile"
         [class.amex-tile--enrolled]="offer.enrolled"
         (click)="cardClick.emit(offer)">

      <div class="amex-tile__img-wrap">
        <img *ngIf="offer.imageUrl" [src]="offer.imageUrl" [alt]="offer.title" class="amex-tile__img" />
        <div *ngIf="!offer.imageUrl" class="amex-tile__img-placeholder">
          <span>AMERICAN EXPRESS</span>
        </div>
        <span *ngIf="offer.enrolled" class="amex-tile__enrolled-badge">Enrolled</span>
      </div>

      <div class="amex-tile__body">
        <h4 class="amex-tile__title">
          {{ offer.title | uppercase }}
          <span *ngIf="offer.hasFlash" class="amex-tile__flash" aria-hidden="true">⚡</span>
        </h4>
        <p class="amex-tile__desc">{{ offer.description }}</p>
      </div>

      <div class="amex-tile__footer">
        <span *ngIf="offer.expiryDate" class="amex-tile__expiry">Expiring: {{ offer.expiryDate }}</span>
        <span *ngIf="!offer.expiryDate"></span>
        <button
          class="amex-tile__fav"
          [class.amex-tile__fav--on]="offer.isFavorite"
          (click)="$event.stopPropagation(); toggleFavorite.emit(offer)"
          [attr.aria-label]="offer.isFavorite ? 'Remove from favourites' : 'Add to favourites'">
          <svg width="17" height="17" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                     C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42
                     22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              [attr.fill]="offer.isFavorite ? '#d32f2f' : 'none'"
              [attr.stroke]="offer.isFavorite ? '#d32f2f' : '#bbb'"
              stroke-width="1.8"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- ══ DETAIL / EXPANDED VIEW ═══════════════════════════════════ -->
    <div *ngIf="detailMode" class="amex-detail">

      <!-- Hero image -->
      <div class="amex-detail__img-wrap">
        <img *ngIf="offer.imageUrl" [src]="offer.imageUrl" [alt]="offer.title" class="amex-detail__img" />
        <div *ngIf="!offer.imageUrl" class="amex-detail__img-fallback">
          <span>AMERICAN EXPRESS</span>
        </div>
        <button class="amex-detail__close" (click)="close.emit()" aria-label="Close">&#x2715;</button>
      </div>

      <!-- Prev / Next navigation -->
      <button class="amex-detail__nav amex-detail__nav--left"  (click)="prev.emit()" aria-label="Previous">&#8249;</button>
      <button class="amex-detail__nav amex-detail__nav--right" (click)="next.emit()" aria-label="Next">&#8250;</button>

      <!-- Info row -->
      <div class="amex-detail__info">

        <div class="amex-detail__left">
          <p class="amex-detail__offer-name">{{ offer.title }}</p>
          <p class="amex-detail__status"
             [class.amex-detail__status--enrolled]="offer.enrolled"
             [class.amex-detail__status--pending]="!offer.enrolled">
            {{ offer.enrolled ? 'Enrolled' : 'Not Enrolled' }}
          </p>

          <div class="amex-detail__row">
            <span class="amex-detail__label">Description:</span>
            <p class="amex-detail__body-text">{{ offer.description }}</p>
          </div>

          <div *ngIf="offer.eligibleCards?.length" class="amex-detail__cards">
            <amex-card-badge *ngFor="let c of offer.eligibleCards" [type]="c"></amex-card-badge>
          </div>
        </div>

        <div class="amex-detail__right">
          <button *ngIf="!offer.enrolled"
                  class="amex-detail__enroll-btn"
                  (click)="enroll.emit(offer)">
            Enroll
          </button>
          <button *ngIf="offer.enrolled"
                  class="amex-detail__unenroll-btn"
                  (click)="unenroll.emit(offer)">
            Unenroll
          </button>

          <div *ngIf="offer.termsAndConditions" class="amex-detail__tnc">
            <span class="amex-detail__label">Terms &amp; Conditions</span>
            <p class="amex-detail__body-text">{{ offer.termsAndConditions }}</p>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    /* ────────────────────────────────────────────────────────────────
       GRID TILE
    ──────────────────────────────────────────────────────────────── */
    .amex-tile {
      display: flex;
      flex-direction: column;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow 0.15s;
    }
    .amex-tile:hover { box-shadow: 0 4px 16px rgba(0,111,207,0.15); }
    .amex-tile--enrolled { border-color: #006FCF; }

    /* Hero image */
    .amex-tile__img-wrap {
      position: relative;
      width: 100%;
      height: 158px;
      background: #b8d4ef;
      overflow: hidden;
      flex-shrink: 0;
    }
    .amex-tile__img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .amex-tile__img-placeholder {
      width: 100%; height: 100%;
      background: #006FCF;
      display: flex; align-items: center; justify-content: center;
    }
    .amex-tile__img-placeholder span {
      color: rgba(255,255,255,0.75);
      font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
    }
    .amex-tile__enrolled-badge {
      position: absolute; top: 10px; right: 0;
      background: #006FCF; color: #fff;
      font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
      padding: 3px 10px 3px 8px;
    }

    /* Body */
    .amex-tile__body { flex: 1; padding: 12px 14px 6px; }
    .amex-tile__title {
      font-size: 12.5px; font-weight: 700; color: #006FCF;
      margin: 0 0 7px; line-height: 1.4; text-align: center;
    }
    .amex-tile__flash { font-size: 11px; }
    .amex-tile__desc {
      font-size: 12px; color: #555; margin: 0;
      line-height: 1.5; text-align: center;
    }

    /* Footer */
    .amex-tile__footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 14px; border-top: 1px solid #f0f0f0;
      margin-top: 6px;
    }
    .amex-tile__expiry { font-size: 11px; color: #888; }
    .amex-tile__fav {
      background: none; border: none; cursor: pointer;
      padding: 0; display: flex; align-items: center;
    }

    /* ────────────────────────────────────────────────────────────────
       DETAIL VIEW
    ──────────────────────────────────────────────────────────────── */
    .amex-detail {
      position: relative;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }

    /* Hero */
    .amex-detail__img-wrap {
      position: relative; width: 100%; height: 280px;
      background: #b8d4ef; overflow: hidden;
    }
    .amex-detail__img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .amex-detail__img-fallback {
      width: 100%; height: 100%;
      background: #006FCF;
      display: flex; align-items: center; justify-content: center;
    }
    .amex-detail__img-fallback span {
      color: rgba(255,255,255,0.75);
      font-size: 15px; font-weight: 700; letter-spacing: 0.1em;
    }
    .amex-detail__close {
      position: absolute; top: 10px; right: 10px;
      width: 28px; height: 28px; border-radius: 50%;
      background: rgba(255,255,255,0.92); border: 1px solid #ccc;
      font-size: 12px; cursor: pointer; color: #333;
      display: flex; align-items: center; justify-content: center;
    }

    /* Nav */
    .amex-detail__nav {
      position: absolute;
      top: calc(140px - 18px);   /* vertically centred on hero */
      background: rgba(255,255,255,0.9);
      border: 1px solid #ddd; border-radius: 50%;
      width: 36px; height: 36px;
      font-size: 22px; cursor: pointer; color: #555;
      display: flex; align-items: center; justify-content: center;
      line-height: 1;
    }
    .amex-detail__nav--left  { left: 10px; }
    .amex-detail__nav--right { right: 10px; }

    /* Info */
    .amex-detail__info {
      display: flex; gap: 24px;
      padding: 20px 48px 20px 24px;   /* extra right padding to clear nav arrow */
    }
    .amex-detail__left  { flex: 1; }
    .amex-detail__right { display: flex; flex-direction: column; gap: 14px; min-width: 150px; }

    .amex-detail__offer-name {
      font-size: 15px; font-weight: 600; color: #006FCF;
      margin: 0 0 4px;
    }
    .amex-detail__status {
      font-size: 13px; font-weight: 600; margin: 0 0 14px;
    }
    .amex-detail__status--enrolled    { color: #2e7d32; }
    .amex-detail__status--pending     { color: #333; }

    .amex-detail__row {
      display: flex; gap: 8px; align-items: flex-start;
    }
    .amex-detail__label {
      font-size: 12px; font-weight: 700; color: #006FCF;
      white-space: nowrap; flex-shrink: 0;
    }
    .amex-detail__body-text {
      font-size: 12px; color: #444; margin: 0; line-height: 1.6;
    }
    .amex-detail__cards {
      display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px;
    }

    .amex-detail__enroll-btn {
      padding: 8px 28px;
      background: #006FCF; color: #fff;
      border: none; border-radius: 4px;
      font-size: 14px; font-weight: 700;
      cursor: pointer; transition: background 0.12s;
      align-self: flex-start;
    }
    .amex-detail__enroll-btn:hover { background: #005baa; }

    .amex-detail__unenroll-btn {
      padding: 7px 20px;
      background: #fff; color: #555;
      border: 1px solid #ccc; border-radius: 4px;
      font-size: 13px; font-weight: 600; cursor: pointer;
      align-self: flex-start;
    }
    .amex-detail__unenroll-btn:hover { background: #f5f5f5; }

    .amex-detail__tnc { display: flex; flex-direction: column; gap: 4px; }
  `],
})
export class AmexOfferCardComponent {
  /** false = compact grid tile | true = full detail panel */
  @Input() detailMode = false;
  @Input() offer!: AmexOffer;

  @Output() enroll         = new EventEmitter<AmexOffer>();
  @Output() unenroll       = new EventEmitter<AmexOffer>();
  @Output() cardClick      = new EventEmitter<AmexOffer>();
  @Output() toggleFavorite = new EventEmitter<AmexOffer>();
  @Output() close          = new EventEmitter<void>();
  @Output() prev           = new EventEmitter<void>();
  @Output() next           = new EventEmitter<void>();
}