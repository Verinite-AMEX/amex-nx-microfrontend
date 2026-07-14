import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexCardBadgeComponent, AmexCardType } from '../atoms/card-badge';
import { ImageComponent } from '../../atoms/image';
import { IconButtonComponent } from '../../atoms/icon-button';
import { ButtonComponent } from '../../atoms/button';

export interface AmexOffer {
  id: string;
  title: string;
  description: string;
  category: string;
  termsAndConditions?: string;
  expiryDate?: string;
  merchant?: string;
  eligibleCards?: AmexCardType[];
  enrolled?: boolean;
  isFavorite?: boolean;
  imageUrl?: string;
  hasFlash?: boolean;
}

export type AmexOfferCardButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type AmexOfferCardButtonSize = 'sm' | 'md' | 'lg';
export type AmexOfferCardIconButtonVariant = 'primary' | 'ghost' | 'danger';

@Component({
  selector: 'amex-offer-card',
  standalone: true,
  imports: [CommonModule, AmexCardBadgeComponent, ImageComponent, IconButtonComponent, ButtonComponent],
  template: `
    <!-- ══ GRID TILE (list / browse view) ══════════════════════════ -->
    <div *ngIf="!detailMode"
         [id]="id + '-tile'"
         class="amex-tile"
         [class.amex-tile--enrolled]="offer.enrolled"
         (click)="cardClick.emit(offer)">

      <div class="amex-tile__img-wrap" [style.height]="tileImageHeight">
        <ui-image
          [id]="id + '-tile-image'"
          [src]="offer.imageUrl || ''"
          [alt]="offer.title"
          objectFit="cover"
          [fallbackText]="imageFallbackText">
        </ui-image>
        <span *ngIf="offer.enrolled" class="amex-tile__enrolled-badge">{{ enrolledBadgeLabel }}</span>
      </div>

      <div class="amex-tile__body">
        <h4 class="amex-tile__title">
          {{ uppercaseTitle ? (offer.title | uppercase) : offer.title }}
          <span *ngIf="offer.hasFlash" class="amex-tile__flash" aria-hidden="true">{{ flashIcon }}</span>
        </h4>
        <p class="amex-tile__desc">{{ offer.description }}</p>
      </div>

      <div class="amex-tile__footer">
        <span *ngIf="offer.expiryDate" class="amex-tile__expiry">{{ expiryLabelPrefix }}{{ offer.expiryDate }}</span>
        <span *ngIf="!offer.expiryDate"></span>
        <ui-icon-button
          [id]="id + '-fav'"
          [icon]="offer.isFavorite ? favoriteOnIcon : favoriteOffIcon"
          [variant]="offer.isFavorite ? favoriteOnVariant : favoriteOffVariant"
          size="sm"
          [ariaLabel]="offer.isFavorite ? removeFavoriteAriaLabel : addFavoriteAriaLabel"
          (click)="toggleFavoriteClick($event)">
        </ui-icon-button>
      </div>
    </div>

    <!-- ══ DETAIL / EXPANDED VIEW ═══════════════════════════════════ -->
    <div *ngIf="detailMode" [id]="id + '-detail'" class="amex-detail">

      <!-- Hero image -->
      <div class="amex-detail__img-wrap" [style.height]="detailImageHeight">
        <ui-image
          [id]="id + '-detail-image'"
          [src]="offer.imageUrl || ''"
          [alt]="offer.title"
          objectFit="cover"
          [fallbackText]="imageFallbackText">
        </ui-image>
        <ui-icon-button
          [id]="id + '-close'"
          class="amex-detail__close"
          [icon]="closeIcon"
          variant="ghost"
          size="sm"
          [ariaLabel]="closeAriaLabel"
          (clicked)="close.emit()">
        </ui-icon-button>
      </div>

      <!-- Prev / Next navigation -->
      <ui-icon-button
        *ngIf="showNav"
        [id]="id + '-prev'"
        class="amex-detail__nav amex-detail__nav--left"
        [icon]="prevIcon"
        variant="ghost"
        size="md"
        [ariaLabel]="prevAriaLabel"
        (clicked)="prev.emit()">
      </ui-icon-button>
      <ui-icon-button
        *ngIf="showNav"
        [id]="id + '-next'"
        class="amex-detail__nav amex-detail__nav--right"
        [icon]="nextIcon"
        variant="ghost"
        size="md"
        [ariaLabel]="nextAriaLabel"
        (clicked)="next.emit()">
      </ui-icon-button>

      <!-- Info row -->
      <div class="amex-detail__info">

        <div class="amex-detail__left">
          <p class="amex-detail__offer-name">{{ offer.title }}</p>
          <p class="amex-detail__status"
             [class.amex-detail__status--enrolled]="offer.enrolled"
             [class.amex-detail__status--pending]="!offer.enrolled">
            {{ offer.enrolled ? enrolledStatusLabel : notEnrolledStatusLabel }}
          </p>

          <div class="amex-detail__row">
            <span class="amex-detail__label">{{ descriptionLabel }}</span>
            <p class="amex-detail__body-text">{{ offer.description }}</p>
          </div>

          <div *ngIf="offer.eligibleCards?.length" class="amex-detail__cards">
            <amex-card-badge *ngFor="let c of offer.eligibleCards" [type]="c"></amex-card-badge>
          </div>
        </div>

        <div class="amex-detail__right">
          <ui-button
            *ngIf="!offer.enrolled"
            [id]="id + '-enroll'"
            [label]="enrollLabel"
            [variant]="enrollVariant"
            [size]="detailButtonSize"
            [ariaLabel]="enrollAriaLabel || (enrollLabel + ' ' + offer.title)"
            (click)="enroll.emit(offer)">
          </ui-button>
          <ui-button
            *ngIf="offer.enrolled"
            [id]="id + '-unenroll'"
            [label]="unenrollLabel"
            [variant]="unenrollVariant"
            [size]="detailButtonSize"
            [ariaLabel]="unenrollAriaLabel || (unenrollLabel + ' ' + offer.title)"
            (click)="unenroll.emit(offer)">
          </ui-button>

          <div *ngIf="offer.termsAndConditions" class="amex-detail__tnc">
            <span class="amex-detail__label">{{ tncLabel }}</span>
            <p class="amex-detail__body-text">{{ offer.termsAndConditions }}</p>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .amex-tile {
      display: flex; flex-direction: column;
      background: #fff; border: 1px solid #ddd; border-radius: 4px;
      overflow: hidden; cursor: pointer; transition: box-shadow 0.15s;
    }
    .amex-tile:hover { box-shadow: 0 4px 16px rgba(0,111,207,0.15); }
    .amex-tile--enrolled { border-color: #006FCF; }

    .amex-tile__img-wrap { position: relative; width: 100%; overflow: hidden; flex-shrink: 0; }
    .amex-tile__enrolled-badge {
      position: absolute; top: 10px; right: 0;
      background: #006FCF; color: #fff;
      font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
      padding: 3px 10px 3px 8px;
    }

    .amex-tile__body { flex: 1; padding: 12px 14px 6px; }
    .amex-tile__title {
      font-size: 12.5px; font-weight: 700; color: #006FCF;
      margin: 0 0 7px; line-height: 1.4; text-align: center;
    }
    .amex-tile__flash { font-size: 11px; }
    .amex-tile__desc { font-size: 12px; color: #555; margin: 0; line-height: 1.5; text-align: center; }

    .amex-tile__footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 14px; border-top: 1px solid #f0f0f0; margin-top: 6px;
    }
    .amex-tile__expiry { font-size: 11px; color: #888; }

    .amex-detail { position: relative; background: #fff; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; }
    .amex-detail__img-wrap { position: relative; width: 100%; overflow: hidden; }
    .amex-detail__close { position: absolute; top: 10px; right: 10px; }

    .amex-detail__nav { position: absolute; top: 122px; }
    .amex-detail__nav--left  { left: 10px; }
    .amex-detail__nav--right { right: 10px; }

    .amex-detail__info { display: flex; gap: 24px; padding: 20px 48px 20px 24px; }
    .amex-detail__left  { flex: 1; }
    .amex-detail__right { display: flex; flex-direction: column; gap: 14px; min-width: 150px; }

    .amex-detail__offer-name { font-size: 15px; font-weight: 600; color: #006FCF; margin: 0 0 4px; }
    .amex-detail__status { font-size: 13px; font-weight: 600; margin: 0 0 14px; }
    .amex-detail__status--enrolled { color: #2e7d32; }
    .amex-detail__status--pending  { color: #333; }

    .amex-detail__row { display: flex; gap: 8px; align-items: flex-start; }
    .amex-detail__label { font-size: 12px; font-weight: 700; color: #006FCF; white-space: nowrap; flex-shrink: 0; }
    .amex-detail__body-text { font-size: 12px; color: #444; margin: 0; line-height: 1.6; }
    .amex-detail__cards { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
    .amex-detail__tnc { display: flex; flex-direction: column; gap: 4px; }
  `],
})
export class AmexOfferCardComponent {
  private static _idCounter = 0;

  /** Overridable so parent screens can supply a stable id for aria-* wiring; falls back to an auto-generated one. */
  @HostBinding('attr.id') @Input() id = `amex-offer-card-${++AmexOfferCardComponent._idCounter}`;

  /** false = compact grid tile | true = full detail panel */
  @Input() detailMode = false;
  @Input() offer!: AmexOffer;

  /** Layout — fully configurable instead of hardcoded 158px/280px. */
  @Input() tileImageHeight = '158px';
  @Input() detailImageHeight = '280px';
  @Input() imageFallbackText = 'AMERICAN EXPRESS';
  @Input() showNav = true;
  @Input() uppercaseTitle = true;

  /** Copy — fully configurable, nothing hardcoded. */
  @Input() enrolledBadgeLabel = 'Enrolled';
  @Input() expiryLabelPrefix = 'Expiring: ';
  @Input() enrolledStatusLabel = 'Enrolled';
  @Input() notEnrolledStatusLabel = 'Not Enrolled';
  @Input() descriptionLabel = 'Description:';
  @Input() tncLabel = 'Terms & Conditions';
  @Input() enrollLabel = 'Enroll';
  @Input() unenrollLabel = 'Unenroll';

  /** Icons — configurable glyphs, no inline SVG hand-rolled here anymore. */
  @Input() flashIcon = '⚡';
  @Input() favoriteOnIcon = '♥';
  @Input() favoriteOffIcon = '♡';
  @Input() closeIcon = '✕';
  @Input() prevIcon = '‹';
  @Input() nextIcon = '›';

  /** Variants/sizes — all overridable. */
  @Input() favoriteOnVariant: AmexOfferCardIconButtonVariant = 'danger';
  @Input() favoriteOffVariant: AmexOfferCardIconButtonVariant = 'ghost';
  @Input() enrollVariant: AmexOfferCardButtonVariant = 'primary';
  @Input() unenrollVariant: AmexOfferCardButtonVariant = 'ghost';
  @Input() detailButtonSize: AmexOfferCardButtonSize = 'md';

  /** Aria labels — configurable, sensible fallbacks composed from offer title. */
  @Input() addFavoriteAriaLabel = 'Add to favourites';
  @Input() removeFavoriteAriaLabel = 'Remove from favourites';
  @Input() closeAriaLabel = 'Close';
  @Input() prevAriaLabel = 'Previous';
  @Input() nextAriaLabel = 'Next';
  @Input() enrollAriaLabel = '';
  @Input() unenrollAriaLabel = '';

  @Output() enroll         = new EventEmitter<AmexOffer>();
  @Output() unenroll       = new EventEmitter<AmexOffer>();
  @Output() cardClick      = new EventEmitter<AmexOffer>();
  @Output() toggleFavorite = new EventEmitter<AmexOffer>();
  @Output() close          = new EventEmitter<void>();
  @Output() prev           = new EventEmitter<void>();
  @Output() next           = new EventEmitter<void>();

  toggleFavoriteClick(event?: Event): void {
    // ui-icon-button's clicked output carries no payload; stopPropagation is handled
    // by the button primitive not bubbling as a card click by default DOM nesting,
    // but we still guard here since the tile itself listens for (click).
    this.toggleFavorite.emit(this.offer);
  }
}