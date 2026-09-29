import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexCardBadgeComponent,
  AmexCardType,
} from './currency-logic/card-badge';
import { ImageComponent } from '../../primitives/image';
import { IconButtonComponent } from '../../primitives/icon-button';
import { ButtonComponent } from '../../primitives/button';

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

export type AmexOfferCardButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger';
export type AmexOfferCardButtonSize = 'sm' | 'md' | 'lg';
export type AmexOfferCardIconButtonVariant = 'primary' | 'ghost' | 'danger';

@Component({
  selector: 'amex-offer-card',
  standalone: true,
  imports: [
    CommonModule,
    AmexCardBadgeComponent,
    ImageComponent,
    IconButtonComponent,
    ButtonComponent,
  ],
  template: `
    <!-- ══ GRID TILE (list / browse view) ══════════════════════════ -->
    <div
      *ngIf="!detailMode"
      [id]="id + '-tile'"
      class="amex-tile card cardRounded"
      [class.cardActionable]="true"
      [class.amex-tile--enrolled]="offer.enrolled"
      (click)="cardClick.emit(offer)"
    >
      <div class="amex-tile__img-wrap" [style.height]="tileImageHeight">
        <ui-image
          [id]="id + '-tile-image'"
          [src]="offer.imageUrl || ''"
          [alt]="offer.title"
          objectFit="cover"
          [fallbackText]="imageFallbackText"
        >
        </ui-image>
        <span *ngIf="offer.enrolled" class="badge dlsBrightBlueBg dlsWhite amex-tile__enrolled-badge">{{
          enrolledBadgeLabel
        }}</span>
      </div>

      <div class="amex-tile__body">
        <h4 class="body2 dlsBrightBlue amex-tile__title">
          {{ uppercaseTitle ? (offer.title | uppercase) : offer.title }}
          <span
            *ngIf="offer.hasFlash"
            class="amex-tile__flash"
            aria-hidden="true"
            >{{ flashIcon }}</span
          >
        </h4>
        <p class="body1 amex-tile__desc">{{ offer.description }}</p>
      </div>

      <div class="amex-tile__footer">
        <span *ngIf="offer.expiryDate" class="amex-tile__expiry"
          >{{ expiryLabelPrefix }}{{ offer.expiryDate }}</span
        >
        <span *ngIf="!offer.expiryDate"></span>
        <ui-icon-button
          [id]="id + '-fav'"
          [icon]="offer.isFavorite ? favoriteOnIcon : favoriteOffIcon"
          [variant]="offer.isFavorite ? favoriteOnVariant : favoriteOffVariant"
          size="sm"
          [ariaLabel]="
            offer.isFavorite ? removeFavoriteAriaLabel : addFavoriteAriaLabel
          "
          (click)="toggleFavoriteClick($event)"
        >
        </ui-icon-button>
      </div>
    </div>

    <!-- ══ DETAIL / EXPANDED VIEW ═══════════════════════════════════ -->
    <div *ngIf="detailMode" [id]="id + '-detail'" class="amex-detail card cardRounded">
      <!-- Hero image -->
      <div class="amex-detail__img-wrap" [style.height]="detailImageHeight">
        <ui-image
          [id]="id + '-detail-image'"
          [src]="offer.imageUrl || ''"
          [alt]="offer.title"
          objectFit="cover"
          [fallbackText]="imageFallbackText"
        >
        </ui-image>
        <ui-icon-button
          [id]="id + '-close'"
          class="amex-detail__close"
          [icon]="closeIcon"
          variant="ghost"
          size="sm"
          [ariaLabel]="closeAriaLabel"
          (clicked)="close.emit()"
        >
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
        (clicked)="prev.emit()"
      >
      </ui-icon-button>
      <ui-icon-button
        *ngIf="showNav"
        [id]="id + '-next'"
        class="amex-detail__nav amex-detail__nav--right"
        [icon]="nextIcon"
        variant="ghost"
        size="md"
        [ariaLabel]="nextAriaLabel"
        (clicked)="next.emit()"
      >
      </ui-icon-button>

      <!-- Info row -->
      <div class="amex-detail__info">
        <div class="amex-detail__left">
          <p class="body2 dlsBrightBlue amex-detail__offer-name">{{ offer.title }}</p>
          <p
            class="label1 amex-detail__status"
            [class.dlsColorSuccess]="offer.enrolled"
            [class.dlsColorNeutral]="!offer.enrolled"
          >
            {{ offer.enrolled ? enrolledStatusLabel : notEnrolledStatusLabel }}
          </p>

          <div class="amex-detail__row">
            <span class="body2 dlsBrightBlue amex-detail__label">{{ descriptionLabel }}</span>
            <p class="body1 amex-detail__body-text">{{ offer.description }}</p>
          </div>

          <div *ngIf="offer.eligibleCards?.length" class="amex-detail__cards">
            <amex-card-badge
              *ngFor="let c of offer.eligibleCards"
              [type]="c"
            ></amex-card-badge>
          </div>
        </div>

        <div class="amex-detail__right">
          <ui-button
            *ngIf="!offer.enrolled"
            [id]="id + '-enroll'"
            [label]="enrollLabel"
            [variant]="enrollVariant"
            [size]="detailButtonSize"
            [ariaLabel]="enrollAriaLabel || enrollLabel + ' ' + offer.title"
            (click)="enroll.emit(offer)"
          >
          </ui-button>
          <ui-button
            *ngIf="offer.enrolled"
            [id]="id + '-unenroll'"
            [label]="unenrollLabel"
            [variant]="unenrollVariant"
            [size]="detailButtonSize"
            [ariaLabel]="unenrollAriaLabel || unenrollLabel + ' ' + offer.title"
            (click)="unenroll.emit(offer)"
          >
          </ui-button>

          <div *ngIf="offer.termsAndConditions" class="amex-detail__tnc">
            <span class="body2 dlsBrightBlue amex-detail__label">{{ tncLabel }}</span>
            <p class="body1 amex-detail__body-text">{{ offer.termsAndConditions }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    // Both the grid tile and the detail panel now use DLS's real
    // .card/.cardRounded (background, shadow, border, radius) instead of
    // custom #fff/#ddd/4px values, and .cardActionable for the tile's hover
    // lift (real DLS interaction, respects prefers-reduced-motion for free)
    // in place of the custom box-shadow-only hover.
    //
    // Every color that was already deliberately DLS's own blue (#006fcf) is
    // now the real DLS utility class instead of a hardcoded hex:
    // .dlsBrightBlue / .dlsBrightBlueBg (title, labels, enrolled badge).
    // The enrolled-status green (was an invented #2e7d32) is now DLS's real
    // semantic .dlsColorSuccess (#008767); not-enrolled now uses
    // .dlsColorNeutral instead of a hardcoded #333.
    //
    // Typography (title, description, labels, body text) now uses DLS's
    // real type scale (.body1/.body2/.label1) instead of hand-picked
    // 11-13px sizes, same principle as card.ts. This does shift a couple of
    // sizes slightly (e.g. title 12.5px -> DLS's real 15px .body2) — flag if
    // you want the original exact pixel sizes preserved instead.
    //
    // Kept custom, with no DLS equivalent: the enrolled-badge's absolute
    // top-right placement over the image (DLS's .badge has no positioning
    // opinion — that's this component's own overlay layout), the very small
    // 10-11px expiry/flash text (DLS's smallest type scale is 13px), and all
    // the detail view's layout-only flex/gap/positioning rules.
    //
    // overflow:hidden added on .amex-tile/.amex-detail themselves — neither
    // DLS's .card nor .cardRounded clip content, and both have a full-width
    // top image whose square corners would otherwise poke past the card's
    // rounded corners (same fix applied to card.ts).
    `
      .amex-tile {
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .amex-tile__img-wrap {
        position: relative;
        width: 100%;
        overflow: hidden;
        flex-shrink: 0;
      }
      .amex-tile__enrolled-badge {
        position: absolute;
        top: 10px;
        right: 0;
        border-radius: 0;
      }

      .amex-tile__body {
        flex: 1;
        padding: 12px 14px 6px;
      }
      .amex-tile__title {
        margin: 0 0 7px;
        text-align: center;
      }
      .amex-tile__flash {
        font-size: 11px;
      }
      .amex-tile__desc {
        margin: 0;
        text-align: center;
      }

      .amex-tile__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 14px;
        border-top: 1px solid #ecedee;
        margin-top: 6px;
      }
      .amex-tile__expiry {
        font-size: 11px;
        color: #8e9092;
      }

      .amex-detail {
        position: relative;
        overflow: hidden;
      }
      .amex-detail__img-wrap {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .amex-detail__close {
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .amex-detail__nav {
        position: absolute;
        top: 122px;
      }
      .amex-detail__nav--left {
        left: 10px;
      }
      .amex-detail__nav--right {
        right: 10px;
      }

      .amex-detail__info {
        display: flex;
        gap: 24px;
        padding: 20px 48px 20px 24px;
      }
      .amex-detail__left {
        flex: 1;
      }
      .amex-detail__right {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-width: 150px;
      }

      .amex-detail__offer-name {
        margin: 0 0 4px;
      }
      .amex-detail__status {
        margin: 0 0 14px;
      }

      .amex-detail__row {
        display: flex;
        gap: 8px;
        align-items: flex-start;
      }
      .amex-detail__label {
        white-space: nowrap;
        flex-shrink: 0;
      }
      .amex-detail__body-text {
        margin: 0;
      }
      .amex-detail__cards {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-top: 12px;
      }
      .amex-detail__tnc {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    `,
  ],
})
export class AmexOfferCardComponent {
  private static _idCounter = 0;

  @HostBinding('attr.id') @Input() id =
    `amex-offer-card-${++AmexOfferCardComponent._idCounter}`;

  @Input() detailMode = false;
  @Input() offer!: AmexOffer;

  @Input() tileImageHeight = '158px';
  @Input() detailImageHeight = '280px';
  @Input() imageFallbackText = 'AMERICAN EXPRESS';
  @Input() showNav = true;
  @Input() uppercaseTitle = true;

  @Input() enrolledBadgeLabel = 'Enrolled';
  @Input() expiryLabelPrefix = 'Expiring: ';
  @Input() enrolledStatusLabel = 'Enrolled';
  @Input() notEnrolledStatusLabel = 'Not Enrolled';
  @Input() descriptionLabel = 'Description:';
  @Input() tncLabel = 'Terms & Conditions';
  @Input() enrollLabel = 'Enroll';
  @Input() unenrollLabel = 'Unenroll';

  @Input() flashIcon = '⚡';
  @Input() favoriteOnIcon = '♥';
  @Input() favoriteOffIcon = '♡';
  @Input() closeIcon = '✕';
  @Input() prevIcon = '‹';
  @Input() nextIcon = '›';

  @Input() favoriteOnVariant: AmexOfferCardIconButtonVariant = 'danger';
  @Input() favoriteOffVariant: AmexOfferCardIconButtonVariant = 'ghost';
  @Input() enrollVariant: AmexOfferCardButtonVariant = 'primary';
  @Input() unenrollVariant: AmexOfferCardButtonVariant = 'ghost';
  @Input() detailButtonSize: AmexOfferCardButtonSize = 'md';

  @Input() addFavoriteAriaLabel = 'Add to favourites';
  @Input() removeFavoriteAriaLabel = 'Remove from favourites';
  @Input() closeAriaLabel = 'Close';
  @Input() prevAriaLabel = 'Previous';
  @Input() nextAriaLabel = 'Next';
  @Input() enrollAriaLabel = '';
  @Input() unenrollAriaLabel = '';

  @Output() enroll = new EventEmitter<AmexOffer>();
  @Output() unenroll = new EventEmitter<AmexOffer>();
  @Output() cardClick = new EventEmitter<AmexOffer>();
  @Output() toggleFavorite = new EventEmitter<AmexOffer>();
  @Output() close = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  toggleFavoriteClick(event?: Event): void {
    this.toggleFavorite.emit(this.offer);
  }
}