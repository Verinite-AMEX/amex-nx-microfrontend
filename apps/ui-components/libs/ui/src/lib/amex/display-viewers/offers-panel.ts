import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface OfferItem {
  id: string;
  title: string;
  description: string;
  category: string;
  expiryDate?: string;
  imageUrl?: string;
  enrolled?: boolean;
  isFavorite?: boolean;
  hasFlash?: boolean;
  termsAndConditions?: string;
}

/**
 * OffersPanel
 * Full offers browsing panel — category icon bar + search + 3-column card grid.
 * Each card: hero image, blue ALL-CAPS title + ⚡, description, expiry + heart.
 * Clicking a card opens detail view inline: hero, title, Not Enrolled/Enrolled, Enroll button, T&C.
 * Source: Offers & Benefits Helper, Supplementary Access
 * Style: ONLS portal — white background, blue #006FCF accents, offer grid cards.
 */
@Component({
  selector: 'amex-offers-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="op">

      <!-- Category filter bar -->
      <div class="op__cat-bar">
        <div class="op__cat-label">Browse by Category</div>
        <div class="op__cats">
          <button *ngFor="let cat of categories"
                  class="op__cat-btn"
                  [class.op__cat-btn--active]="selectedCategory === cat.key"
                  (click)="selectedCategory = cat.key; filterOffers()">
            <span class="op__cat-icon">{{ cat.icon }}</span>
            <span class="op__cat-name">{{ cat.label }}</span>
          </button>
        </div>
      </div>

      <!-- Search bar -->
      <div class="op__search-row">
        <span class="op__search-icon">&#128269;</span>
        <input class="op__search-input"
               placeholder="Search Offers"
               [(ngModel)]="searchQuery"
               (input)="filterOffers()" />
      </div>

      <!-- Offer grid -->
      <div *ngIf="!selectedOffer" class="op__grid">
        <div *ngFor="let offer of filteredOffers"
             class="op__card"
             [class.op__card--enrolled]="offer.enrolled"
             (click)="openDetail(offer)">

          <!-- Hero image -->
          <div class="op__card-img-wrap">
            <img *ngIf="offer.imageUrl" [src]="offer.imageUrl" [alt]="offer.title" class="op__card-img" />
            <div *ngIf="!offer.imageUrl" class="op__card-img-placeholder">
              <span>AMERICAN EXPRESS</span>
            </div>
            <span *ngIf="offer.enrolled" class="op__enrolled-badge">Enrolled</span>
          </div>

          <!-- Card body -->
          <div class="op__card-body">
            <h4 class="op__card-title">
              {{ offer.title | uppercase }}
              <span *ngIf="offer.hasFlash" aria-hidden="true">⚡</span>
            </h4>
            <p class="op__card-desc">{{ offer.description }}</p>
          </div>

          <!-- Card footer -->
          <div class="op__card-footer">
            <span *ngIf="offer.expiryDate" class="op__expiry">Expiring: {{ offer.expiryDate }}</span>
            <span *ngIf="!offer.expiryDate"></span>
            <button class="op__fav-btn"
                    [class.op__fav-btn--on]="offer.isFavorite"
                    (click)="$event.stopPropagation(); toggleFav(offer)">
              <svg width="16" height="16" viewBox="0 0 24 24">
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

        <div *ngIf="filteredOffers.length === 0" class="op__empty">
          No offers found.
        </div>
      </div>

      <!-- Detail view -->
      <div *ngIf="selectedOffer" class="op__detail">
        <!-- Hero -->
        <div class="op__detail-img-wrap">
          <img *ngIf="selectedOffer.imageUrl" [src]="selectedOffer.imageUrl" [alt]="selectedOffer.title" class="op__detail-img" />
          <div *ngIf="!selectedOffer.imageUrl" class="op__detail-img-fallback">
            <span>AMERICAN EXPRESS</span>
          </div>
          <button class="op__detail-close" (click)="closeDetail()" aria-label="Close">&#x2715;</button>
        </div>

        <!-- Nav arrows -->
        <button class="op__detail-nav op__detail-nav--left" (click)="prevOffer()" aria-label="Previous">&#8249;</button>
        <button class="op__detail-nav op__detail-nav--right" (click)="nextOffer()" aria-label="Next">&#8250;</button>

        <!-- Info -->
        <div class="op__detail-info">
          <div class="op__detail-left">
            <p class="op__detail-name">{{ selectedOffer.title }}</p>
            <p class="op__detail-status"
               [class.op__detail-status--enrolled]="selectedOffer.enrolled"
               [class.op__detail-status--not]="!selectedOffer.enrolled">
              {{ selectedOffer.enrolled ? 'Enrolled' : 'Not Enrolled' }}
            </p>
            <div class="op__detail-desc-row">
              <span class="op__detail-lbl">Description:</span>
              <p class="op__detail-desc-text">{{ selectedOffer.description }}</p>
            </div>
          </div>

          <div class="op__detail-right">
            <button *ngIf="!selectedOffer.enrolled"
                    class="op__detail-enroll-btn"
                    (click)="enroll.emit(selectedOffer)">Enroll</button>
            <button *ngIf="selectedOffer.enrolled"
                    class="op__detail-unenroll-btn"
                    (click)="unenroll.emit(selectedOffer)">Unenroll</button>

            <div *ngIf="selectedOffer.termsAndConditions" class="op__detail-tnc">
              <span class="op__detail-lbl">Terms &amp; Conditions</span>
              <p class="op__detail-tnc-text">{{ selectedOffer.termsAndConditions }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .op { background: #fff; padding: 16px; }

    /* Category bar */
    .op__cat-bar { margin-bottom: 12px; }
    .op__cat-label { font-size: 14px; font-weight: bold; color: #1a1a1a; margin-bottom: 10px; }
    .op__cats { display: flex; gap: 12px; flex-wrap: wrap; }
    .op__cat-btn {
      display: flex; flex-direction: column; align-items: center;
      background: none; border: none; cursor: pointer;
      padding: 6px 8px; gap: 4px;
    }
    .op__cat-icon {
      width: 36px; height: 36px;
      border: 2px solid #ccc; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; background: #f5f5f5;
    }
    .op__cat-btn--active .op__cat-icon {
      border-color: #006fcf; background: #006fcf; color: #fff;
    }
    .op__cat-name { font-size: 11px; color: #555; }
    .op__cat-btn--active .op__cat-name { color: #006fcf; font-weight: bold; }

    /* Search */
    .op__search-row {
      display: flex; align-items: center; gap: 8px;
      border: 1px solid #ccc; padding: 6px 12px;
      background: #fafafa; margin-bottom: 14px;
    }
    .op__search-icon { font-size: 14px; color: #888; }
    .op__search-input {
      border: none; background: none; font-size: 13px;
      width: 100%; outline: none; font-family: Arial, sans-serif;
    }

    /* Grid */
    .op__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    /* Card */
    .op__card {
      border: 1px solid #ddd; border-radius: 4px;
      overflow: hidden; cursor: pointer;
      display: flex; flex-direction: column;
      transition: box-shadow 0.15s;
    }
    .op__card:hover { box-shadow: 0 4px 16px rgba(0,111,207,0.15); }
    .op__card--enrolled { border-color: #006fcf; }

    .op__card-img-wrap {
      position: relative; width: 100%; height: 158px;
      background: #b8d4ef; overflow: hidden; flex-shrink: 0;
    }
    .op__card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .op__card-img-placeholder {
      width: 100%; height: 100%; background: #006fcf;
      display: flex; align-items: center; justify-content: center;
    }
    .op__card-img-placeholder span {
      color: rgba(255,255,255,0.75); font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
    }
    .op__enrolled-badge {
      position: absolute; top: 10px; right: 0;
      background: #006fcf; color: #fff;
      font-size: 10px; font-weight: 700; padding: 3px 10px 3px 8px;
    }

    .op__card-body { flex: 1; padding: 12px 14px 6px; }
    .op__card-title {
      font-size: 12.5px; font-weight: 700; color: #006fcf;
      margin: 0 0 7px; line-height: 1.4; text-align: center;
    }
    .op__card-desc { font-size: 12px; color: #555; margin: 0; line-height: 1.5; text-align: center; }

    .op__card-footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 14px; border-top: 1px solid #f0f0f0; margin-top: 6px;
    }
    .op__expiry { font-size: 11px; color: #888; }
    .op__fav-btn { background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; }

    .op__empty { grid-column: 1/-1; text-align: center; padding: 40px; color: #888; font-size: 13px; }

    /* Detail view */
    .op__detail {
      position: relative; background: #fff;
      border: 1px solid #ddd; border-radius: 4px; overflow: hidden;
    }

    .op__detail-img-wrap {
      position: relative; width: 100%; height: 280px; background: #b8d4ef; overflow: hidden;
    }
    .op__detail-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .op__detail-img-fallback {
      width: 100%; height: 100%; background: #006fcf;
      display: flex; align-items: center; justify-content: center;
    }
    .op__detail-img-fallback span {
      color: rgba(255,255,255,0.75); font-size: 15px; font-weight: 700; letter-spacing: 0.1em;
    }
    .op__detail-close {
      position: absolute; top: 10px; right: 10px;
      width: 28px; height: 28px; border-radius: 50%;
      background: rgba(255,255,255,0.92); border: 1px solid #ccc;
      font-size: 12px; cursor: pointer; color: #333;
      display: flex; align-items: center; justify-content: center;
    }

    .op__detail-nav {
      position: absolute; top: calc(140px - 18px);
      background: rgba(255,255,255,0.9);
      border: 1px solid #ddd; border-radius: 50%;
      width: 36px; height: 36px; font-size: 22px;
      cursor: pointer; color: #555;
      display: flex; align-items: center; justify-content: center;
    }
    .op__detail-nav--left  { left: 10px; }
    .op__detail-nav--right { right: 10px; }

    .op__detail-info {
      display: flex; gap: 24px; padding: 20px 48px 20px 24px;
    }
    .op__detail-left  { flex: 1; }
    .op__detail-right { display: flex; flex-direction: column; gap: 14px; min-width: 150px; }

    .op__detail-name {
      font-size: 15px; font-weight: 600; color: #006fcf; margin: 0 0 4px;
    }
    .op__detail-status { font-size: 13px; font-weight: 600; margin: 0 0 14px; }
    .op__detail-status--enrolled { color: #2e7d32; }
    .op__detail-status--not      { color: #333; }

    .op__detail-desc-row { display: flex; gap: 8px; align-items: flex-start; }
    .op__detail-lbl {
      font-size: 12px; font-weight: 700; color: #006fcf; white-space: nowrap; flex-shrink: 0;
    }
    .op__detail-desc-text {
      font-size: 12px; color: #444; margin: 0; line-height: 1.6;
    }

    .op__detail-enroll-btn {
      padding: 8px 28px; background: #006fcf; color: #fff;
      border: none; border-radius: 4px; font-size: 14px; font-weight: 700;
      cursor: pointer; align-self: flex-start;
    }
    .op__detail-enroll-btn:hover { background: #005baa; }

    .op__detail-unenroll-btn {
      padding: 7px 20px; background: #fff; color: #555;
      border: 1px solid #ccc; border-radius: 4px;
      font-size: 13px; font-weight: 600; cursor: pointer; align-self: flex-start;
    }
    .op__detail-tnc { display: flex; flex-direction: column; gap: 4px; }
    .op__detail-tnc-text { font-size: 12px; color: #444; margin: 0; line-height: 1.5; }
  `],
})
export class AmexOffersPanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `offers-panel-${++AmexOffersPanelComponent._idCounter}`;


  @Input() offers: OfferItem[] = [];
  @Input() categories = [
    { key: 'all',           icon: '🌐', label: 'All' },
    { key: 'favorites',     icon: '❤️',  label: 'Favorites' },
    { key: 'travel',        icon: '✈️',  label: 'Travel' },
    { key: 'shopping',      icon: '🛍️', label: 'Shopping' },
    { key: 'entertainment', icon: '🎭', label: 'Entertainment' },
    { key: 'spa',           icon: '🥤', label: 'Spa' },
    { key: 'clinic',        icon: '➕', label: 'Clinic' },
    { key: 'promo',         icon: '🎁', label: 'Promotional Campaigns' },
  ];

  selectedCategory = 'all';
  searchQuery      = '';
  filteredOffers: OfferItem[] = [];
  selectedOffer: OfferItem | null = null;
  private _detailIndex = 0;

  @Output() enroll         = new EventEmitter<OfferItem>();
  @Output() unenroll       = new EventEmitter<OfferItem>();
  @Output() toggleFavorite = new EventEmitter<OfferItem>();

  ngOnChanges() { this.filterOffers(); }
  ngOnInit()    { this.filterOffers(); }

  filterOffers() {
    let list = this.offers;
    if (this.selectedCategory !== 'all') {
      list = list.filter(o => o.category?.toLowerCase() === this.selectedCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(o => o.title?.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q));
    }
    this.filteredOffers = list;
  }

  toggleFav(offer: OfferItem) {
    offer.isFavorite = !offer.isFavorite;
    this.toggleFavorite.emit(offer);
  }

  openDetail(offer: OfferItem) {
    this._detailIndex = this.filteredOffers.indexOf(offer);
    this.selectedOffer = offer;
  }

  closeDetail() { this.selectedOffer = null; }

  prevOffer() {
    if (this._detailIndex > 0) {
      this._detailIndex--;
      this.selectedOffer = this.filteredOffers[this._detailIndex];
    }
  }

  nextOffer() {
    if (this._detailIndex < this.filteredOffers.length - 1) {
      this._detailIndex++;
      this.selectedOffer = this.filteredOffers[this._detailIndex];
    }
  }
}
