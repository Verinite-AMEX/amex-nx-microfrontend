import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexOfferCardComponent, AmexOffer,
  AmexSuccessToastComponent,
  AmexConfirmationModalComponent,
} from '@ui-components/ui';

@Component({
  selector: 'app-offers-catalogue',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    AmexOfferCardComponent,
    AmexSuccessToastComponent,
    AmexConfirmationModalComponent,
  ],
  template: `
    <div class="offers-page">

      <!-- ════ OFFER DETAIL VIEW (image3 / image4 / image5) ════ -->
      <div *ngIf="selectedOffer" class="detail-view">

        <!-- Overlay + success modal (image5) -->
        <div *ngIf="enrolledSuccess" class="success-overlay">
          <div class="success-modal">
            <p class="success-msg">Enrolled successfully</p>
            <button class="enroll-btn" (click)="enrolledSuccess=false">Close</button>
          </div>
        </div>

        <!-- Prev / Next arrows -->
        <button class="nav-arrow nav-arrow-left"  (click)="prevOffer()">&#8249;</button>
        <button class="nav-arrow nav-arrow-right" (click)="nextOffer()">&#8250;</button>

        <!-- Close X -->
        <button class="detail-close" (click)="selectedOffer=null">&#10005;</button>

        <!-- Large offer image -->
        <div class="detail-img-wrap">
          <div class="detail-img" [style.background]="selectedOffer.imageUrl ? '' : selectedOffer['bg']">
            <span *ngIf="!selectedOffer.imageUrl" class="detail-img-label">AMERICAN EXPRESS</span>
          </div>
        </div>

        <!-- Offer info row (image3/image4) -->
        <div class="detail-info">
          <div class="detail-left">
            <div class="detail-title">{{ selectedOffer.title }}</div>
            <div class="detail-status"
              [class.enrolled]="selectedOffer.enrolled"
              [class.not-enrolled]="!selectedOffer.enrolled">
              {{ selectedOffer.enrolled ? 'Enrolled' : 'Not Enrolled' }}
            </div>
            <div class="detail-desc-row">
              <span class="detail-label">Description:</span>
              <span class="detail-desc">{{ selectedOffer.description }}</span>
            </div>
          </div>
          <div class="detail-right">
            <button *ngIf="!selectedOffer.enrolled"
              class="enroll-btn" (click)="enrollOffer(selectedOffer)">Enroll</button>
            <div class="detail-tc" *ngIf="selectedOffer['terms']">
              <span class="detail-label">Terms &amp; Conditions</span>
              <span class="tc-text">{{ selectedOffer['terms'] }}</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="detail-footer">Copyright &copy; 2009 American Express Company</div>
      </div>

      <!-- ════ CATALOGUE VIEW (image6) ════ -->
      <div *ngIf="!selectedOffer">

        <!-- Browse by Category — icon buttons matching document exactly -->
        <div class="browse-section">
          <div class="browse-title">Browse by Category</div>
          <div class="category-icons">
            <div *ngFor="let cat of categories"
              class="cat-icon-btn"
              [class.active]="activeCategory === cat.id"
              (click)="activeCategory = cat.id">
              <div class="cat-icon">{{ cat.icon }}</div>
              <div class="cat-label">{{ cat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Search bar with filter icon (document image6) -->
        <div class="search-bar-row">
          <div class="search-wrap">
            <span class="search-icon">&#128269;</span>
            <input class="search-input" [(ngModel)]="searchTerm" placeholder="Search Offers"/>
            <button *ngIf="searchTerm" class="search-clear" (click)="searchTerm=''">&#10005;</button>
          </div>
          <span class="filter-icon" title="Filter">&#9874;</span>
          <span class="location-icon" title="Near me">&#128205;</span>
        </div>

        <!-- Success toast -->
        <amex-success-toast *ngIf="successMsg" [message]="successMsg"
          portalStyle="onls" [autoDismiss]="true" [duration]="4000"
          (dismissed)="successMsg=''">
        </amex-success-toast>

        <!-- Offers grid — cards with image, title, merchant, expiry, heart icon -->
        <div class="offers-grid" *ngIf="filteredOffers.length">
          <div *ngFor="let o of filteredOffers" class="offer-card" (click)="openDetail(o)">
            <!-- Card image area -->
            <div class="offer-img" [style.background]="o['bg'] || '#006fcf'">
              <span class="offer-img-label">{{ o.merchant || 'AMERICAN EXPRESS' }}</span>
              <span *ngIf="o.enrolled" class="offer-enrolled-badge">Enrolled</span>
            </div>
            <!-- Card body -->
            <div class="offer-body">
              <div class="offer-title">{{ o.title }}</div>
              <div class="offer-merchant" *ngIf="o.merchant">{{ o.merchant }}</div>
              <div class="offer-desc">{{ o.description }}</div>
            </div>
            <!-- Card footer -->
            <div class="offer-footer">
              <span class="offer-expiry" *ngIf="o.validUntil">Expiring: {{ o.validUntil }}</span>
              <span class="offer-heart">&#9825;</span>
            </div>
          </div>
        </div>

        <div *ngIf="!filteredOffers.length" class="no-offers">
          No offers available in this category.
        </div>
      </div>

    </div>

    <!-- Confirmation modal -->
    <amex-confirmation-modal
      [visible]="showModal" portalStyle="onls"
      [message]="modalMsg" confirmLabel="OK" cancelLabel="Cancel"
      (confirm)="confirmEnroll()" (cancel)="showModal=false">
    </amex-confirmation-modal>
  `,
  styles: [`
    .offers-page  { font-family:Arial,sans-serif; background:#fff; min-height:100%; position:relative; }

    /* ── CATALOGUE VIEW ── */
    .browse-section { padding:20px 20px 0; }
    .browse-title   { font-size:14px; color:#333; margin-bottom:14px; font-weight:normal; }
    .category-icons { display:flex; gap:0; flex-wrap:wrap; margin-bottom:16px; }
    .cat-icon-btn   {
      display:flex; flex-direction:column; align-items:center;
      padding:8px 14px; cursor:pointer; border-radius:4px; min-width:70px;
    }
    .cat-icon-btn:hover { background:#f0f6ff; }
    .cat-icon-btn.active .cat-icon { background:#006fcf; color:#fff; }
    .cat-icon {
      width:44px; height:44px; border-radius:50%; background:#e8f0fe;
      display:flex; align-items:center; justify-content:center;
      font-size:20px; margin-bottom:6px; transition:background .15s;
    }
    .cat-label { font-size:11px; color:#555; text-align:center; white-space:nowrap; }

    /* Search bar — document image6 */
    .search-bar-row { display:flex; align-items:center; gap:10px; padding:0 20px 16px; }
    .search-wrap    {
      flex:1; display:flex; align-items:center; gap:8px;
      border:1px solid #ccc; border-radius:4px; padding:6px 12px; background:#fff;
    }
    .search-icon    { color:#999; font-size:14px; }
    .search-input   { flex:1; border:none; outline:none; font-size:13px; font-family:Arial,sans-serif; }
    .search-clear   { background:none; border:none; cursor:pointer; color:#999; font-size:14px; padding:0; }
    .filter-icon, .location-icon { font-size:18px; color:#555; cursor:pointer; }
    .filter-icon:hover, .location-icon:hover { color:#006fcf; }

    /* Offers grid */
    .offers-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; padding:0 20px 24px; }
    .offer-card  {
      border:1px solid #e8e8e8; border-radius:8px; overflow:hidden;
      cursor:pointer; transition:box-shadow .15s; background:#fff;
    }
    .offer-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.1); }
    .offer-img   {
      height:160px; display:flex; align-items:center; justify-content:center;
      position:relative; background:#006fcf;
    }
    .offer-img-label  { color:rgba(255,255,255,.7); font-size:12px; font-weight:bold; letter-spacing:.05em; }
    .offer-enrolled-badge {
      position:absolute; top:8px; right:8px;
      background:#006fcf; color:#fff; font-size:11px; padding:2px 8px; border-radius:10px;
    }
    .offer-body  { padding:12px 14px 8px; }
    .offer-title { font-size:13px; font-weight:bold; color:#006fcf; text-transform:uppercase; margin-bottom:4px; text-align:center; }
    .offer-merchant { font-size:11px; color:#888; text-align:center; margin-bottom:4px; }
    .offer-desc  { font-size:12px; color:#555; text-align:center; line-height:1.4; }
    .offer-footer { display:flex; justify-content:space-between; align-items:center; padding:8px 14px 12px; }
    .offer-expiry { font-size:11px; color:#888; }
    .offer-heart  { font-size:16px; color:#cc0000; cursor:pointer; }
    .no-offers    { padding:40px; text-align:center; color:#888; font-size:13px; }

    /* ── DETAIL VIEW (image3/image4) ── */
    .detail-view   { position:relative; background:#fff; }
    .detail-close  {
      position:absolute; top:10px; right:10px; z-index:10;
      background:rgba(0,0,0,.4); color:#fff; border:none; border-radius:50%;
      width:26px; height:26px; font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center;
    }
    .nav-arrow {
      position:absolute; top:50%; transform:translateY(-50%); z-index:10;
      background:#f0f0f0; border:1px solid #ddd; border-radius:4px;
      width:32px; height:48px; font-size:24px; cursor:pointer; color:#555;
      display:flex; align-items:center; justify-content:center;
    }
    .nav-arrow:hover { background:#e0e0e0; }
    .nav-arrow-left  { left:4px; }
    .nav-arrow-right { right:4px; }
    .detail-img-wrap { width:100%; }
    .detail-img      {
      height:300px; background:#bbb; display:flex;
      align-items:center; justify-content:center;
    }
    .detail-img-label { color:rgba(255,255,255,.6); font-size:14px; font-weight:bold; letter-spacing:.1em; }
    .detail-info     { display:flex; gap:24px; padding:20px 48px; border-bottom:1px solid #f0f0f0; }
    .detail-left     { flex:1; }
    .detail-right    { width:260px; flex-shrink:0; }
    .detail-title    { font-size:16px; color:#006fcf; font-weight:bold; margin-bottom:6px; }
    .detail-status   { font-size:13px; font-weight:bold; margin-bottom:14px; }
    .detail-status.enrolled     { color:#2e7d32; }
    .detail-status.not-enrolled { color:#cc0000; }
    .detail-desc-row { display:flex; gap:12px; font-size:13px; }
    .detail-label    { font-weight:bold; color:#006fcf; white-space:nowrap; }
    .detail-desc     { color:#333; line-height:1.5; }
    .detail-tc       { display:flex; flex-direction:column; gap:4px; margin-top:12px; font-size:12px; }
    .tc-text         { color:#555; }
    .enroll-btn {
      display:block; width:160px; padding:10px 0;
      background:#006fcf; color:#fff; border:none; border-radius:4px;
      font-size:14px; font-family:Arial,sans-serif; cursor:pointer; text-align:center;
    }
    .enroll-btn:hover { background:#0057a8; }
    .detail-footer { padding:12px 20px; text-align:right; font-size:11px; color:#888; border-top:1px solid #f0f0f0; }

    /* Success overlay (image5) */
    .success-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,.3);
      display:flex; align-items:center; justify-content:center; z-index:100;
    }
    .success-modal {
      background:#fff; border-radius:4px; padding:28px 40px;
      text-align:center; box-shadow:0 4px 24px rgba(0,0,0,.2); min-width:260px;
    }
    .success-msg { font-size:16px; color:#333; margin-bottom:20px; }
  `],
})
export class OffersCatalogueComponent {
  successMsg = '';
  showModal = false;
  modalMsg = '';
  searchTerm = '';
  activeCategory = 'all';
  selectedOffer: any = null;
  enrolledSuccess = false;
  pendingEnroll: any = null;

  // Exact categories from document image6
  categories = [
    { id:'all',     label:'All',                   icon:'🌐' },
    { id:'fav',     label:'Favorites',             icon:'❤️' },
    { id:'travel',  label:'Travel',                icon:'✈️' },
    { id:'shop',    label:'Shopping',              icon:'🛍️' },
    { id:'ent',     label:'Entertainment',         icon:'🎵' },
    { id:'spa',     label:'Spa',                   icon:'🍶' },
    { id:'clinic',  label:'Clinic',                icon:'➕' },
    { id:'promo',   label:'Promotional Campaigns', icon:'🎁' },
  ];

  // Offers matching document image6 style — cards with image placeholder + title + expiry
  offers: any[] = [
    {
      id:'O01', title:'DINING CASHBACK', merchant:'Dining Cashback',
      description:'Discover new culinary horizons and savor exclusive dining delights with our 10% cashback offer. As a premium member, indulge in unforgettable culinary experiences at your favorite restaurants, knowing you\'ll earn cashback on every bite, capped at AED 50 per month',
      category:'all', validUntil:'31 Dec, 2025',
      terms:'American Express reserves the right to modify / cancel this anytime.',
      bg:'linear-gradient(135deg,#2c5282,#4299e1)', enrolled:false,
    },
    {
      id:'O02', title:'GENERAL OFFER ⚡', merchant:'Bowling Maniac 1',
      description:'Enjoy exclusive offers at bowling alleys and entertainment venues.',
      category:'ent', validUntil:'31 Dec, 2024',
      terms:'American Express reserves the right to modify / cancel this anytime.',
      bg:'linear-gradient(135deg,#553c9a,#805ad5)', enrolled:false,
    },
    {
      id:'O03', title:'TRAVEL REWARDS', merchant:'Emirates Airlines',
      description:'Earn 5× Membership Rewards® points on all Emirates flights booked directly.',
      category:'travel', validUntil:'08 Oct, 2047',
      terms:'American Express reserves the right to modify / cancel this anytime.',
      bg:'linear-gradient(135deg,#2d3748,#4a5568)', enrolled:true,
    },
    {
      id:'O04', title:'SPA & WELLNESS', merchant:'Talise Spa',
      description:'Enjoy 20% off on all spa treatments at Jumeirah properties.',
      category:'spa', validUntil:'25 Dec, 2025',
      terms:'American Express reserves the right to modify / cancel this anytime.',
      bg:'linear-gradient(135deg,#276749,#48bb78)', enrolled:false,
    },
    {
      id:'O05', title:'SHOPPING CASHBACK', merchant:'Mall of Emirates',
      description:'Get 10% cashback on shopping at Mall of Emirates, up to AED 200/month.',
      category:'shop', validUntil:'31 Mar, 2025',
      terms:'American Express reserves the right to modify / cancel this anytime.',
      bg:'linear-gradient(135deg,#c05621,#f6ad55)', enrolled:false,
    },
    {
      id:'O06', title:'CLINIC BENEFIT', merchant:'Aster Clinic',
      description:'30% discount on consultation fees at all Aster Clinics across UAE.',
      category:'clinic', validUntil:'30 Jun, 2025',
      terms:'American Express reserves the right to modify / cancel this anytime.',
      bg:'linear-gradient(135deg,#cc0000,#e53e3e)', enrolled:false,
    },
    {
      id:'O07', title:'SAVE TO CARD OFFER ⚡', merchant:'American Express',
      description:'Exclusive promotional campaign offer — save directly to your card.',
      category:'promo', validUntil:'25 Dec, 2027',
      terms:'American Express reserves the right to modify / cancel this anytime.',
      bg:'linear-gradient(135deg,#006fcf,#4299e1)', enrolled:false,
    },
    {
      id:'O08', title:'LOUNGE ACCESS', merchant:'Centurion Lounge',
      description:'Unlimited access to all Centurion Lounges and 1,400+ partner lounges worldwide.',
      category:'travel', validUntil:'Ongoing',
      terms:'American Express reserves the right to modify / cancel this anytime.',
      bg:'linear-gradient(135deg,#1a1a1a,#4a4a4a)', enrolled:true,
    },
  ];

  get filteredOffers() {
    return this.offers.filter(o => {
      const catMatch = this.activeCategory === 'all' || o.category === this.activeCategory;
      const searchMatch = !this.searchTerm
        || o.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        || (o.merchant||'').toLowerCase().includes(this.searchTerm.toLowerCase())
        || o.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return catMatch && searchMatch;
    });
  }

  openDetail(offer: any) { this.selectedOffer = offer; this.enrolledSuccess = false; }

  enrollOffer(offer: any) {
    this.pendingEnroll = offer;
    this.modalMsg = `Enroll in "${offer.merchant || offer.title}"?`;
    this.showModal = true;
  }

  confirmEnroll() {
    if (this.pendingEnroll) {
      this.pendingEnroll.enrolled = true;
      this.enrolledSuccess = true;       // Show "Enrolled successfully" modal (image5)
      this.pendingEnroll = null;
    }
    this.showModal = false;
  }

  prevOffer() {
    const idx = this.offers.indexOf(this.selectedOffer);
    this.selectedOffer = this.offers[(idx - 1 + this.offers.length) % this.offers.length];
    this.enrolledSuccess = false;
  }

  nextOffer() {
    const idx = this.offers.indexOf(this.selectedOffer);
    this.selectedOffer = this.offers[(idx + 1) % this.offers.length];
    this.enrolledSuccess = false;
  }
}
