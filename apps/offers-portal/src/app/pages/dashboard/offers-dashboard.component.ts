import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// ✅ All components imported from installed @vn-core-ui-components/ui package
import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
  AmexPointsDisplayComponent,
  AmexStatusBadgeComponent, AmexStatus,
  AmexOfferCardComponent, AmexOffer,
  AmexSuccessToastComponent,
  AmexConfirmationModalComponent,
} from '@ui-components/ui';

@Component({
  selector: 'app-offers-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AmexPageHeaderComponent,
    AmexBreadcrumbTrailComponent,
    AmexPointsDisplayComponent,
    AmexStatusBadgeComponent,
    AmexOfferCardComponent,
    AmexSuccessToastComponent,
    AmexConfirmationModalComponent,
  ],
  template: `
    <!-- ✅ AmexPageHeaderComponent — ONLS dark navy banner -->
    <amex-page-header portalStyle="onls" title="AEME OFFERS & BENEFITS — DASHBOARD"></amex-page-header>

    <!-- ✅ AmexBreadcrumbTrailComponent -->
    <amex-breadcrumb-trail
      [items]="breadcrumbs"
      (itemClick)="onBreadcrumb($event)">
    </amex-breadcrumb-trail>

    <div class="page-body">
      <!-- ✅ AmexSuccessToastComponent — ONLS green inline notification -->
      <amex-success-toast *ngIf="toastMsg" [message]="toastMsg"
        portalStyle="onls" [autoDismiss]="true" [duration]="4000"
        (dismissed)="toastMsg=''">
      </amex-success-toast>

      <!-- ✅ AmexPointsDisplayComponent — KPI counters -->
      <div class="kpi-row">
        <div class="kpi-card">
          <amex-points-display [points]="48" label="Active Offers"></amex-points-display>
          <div class="kpi-sub">Across 6 categories</div>
        </div>
        <div class="kpi-card">
          <amex-points-display [points]="142000" label="Points Earned MTD"></amex-points-display>
          <div class="kpi-sub">Membership Rewards®</div>
        </div>
        <div class="kpi-card">
          <amex-points-display [points]="2841" label="Offers Redeemed"></amex-points-display>
          <div class="kpi-sub">↑ 18% vs last month</div>
        </div>
        <div class="kpi-card">
          <amex-points-display [points]="6" label="Expiring This Week"></amex-points-display>
          <div class="kpi-sub">Action required</div>
        </div>
      </div>

      <div class="two-col">
        <!-- ✅ AmexOfferCardComponent — Featured offers -->
        <div class="panel">
          <div class="panel-hd">
            Featured Offers
            <button class="link-btn" (click)="router.navigate(['/offers/offers'])">View All →</button>
          </div>
          <div class="panel-bd offer-list">
            <amex-offer-card *ngFor="let o of featuredOffers" [offer]="o"
              (enroll)="onEnroll($event)" (unenroll)="onUnenroll($event)">
            </amex-offer-card>
          </div>
        </div>

        <!-- ✅ AmexStatusBadgeComponent — Benefits with status -->
        <div class="panel">
          <div class="panel-hd">
            Card Benefits Spotlight
            <button class="link-btn" (click)="router.navigate(['/offers/benefits'])">All Benefits →</button>
          </div>
          <div class="panel-bd">
            <div class="benefit-row" *ngFor="let b of spotlightBenefits">
              <div class="benefit-icon" [style.background]="b.bg">{{ b.icon }}</div>
              <div class="benefit-info">
                <div class="benefit-name">{{ b.title }}</div>
                <div class="benefit-desc">{{ b.desc }}</div>
              </div>
              <amex-status-badge [status]="b.status" [label]="b.statusLabel"></amex-status-badge>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ AmexConfirmationModalComponent — ONLS native-style confirm dialog -->
    <amex-confirmation-modal [visible]="showModal" portalStyle="onls"
      [message]="modalMsg" confirmLabel="OK" cancelLabel="Cancel"
      (confirm)="confirmEnroll()" (cancel)="showModal=false">
    </amex-confirmation-modal>
  `,
  styles: [`
    .page-body { padding:16px 0; }
    .kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }
    .kpi-card { background:#fff; border:1px solid #dde4ed; border-top:3px solid #1e3a6e; padding:16px 20px; border-radius:2px; }
    .kpi-sub  { font-size:11px; color:#888; margin-top:8px; }
    .two-col  { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .panel    { background:#fff; border:1px solid #dde4ed; border-radius:2px; overflow:hidden; }
    .panel-hd { background:#e8f0f8; border-bottom:1px solid #c8d8e8; padding:8px 14px; font-size:13px; font-weight:bold; color:#1e3a6e; display:flex; justify-content:space-between; align-items:center; }
    .panel-bd { padding:14px; }
    .offer-list { display:flex; flex-direction:column; gap:10px; }
    .link-btn   { background:none; border:none; color:#006fcf; font-size:12px; cursor:pointer; font-family:Arial,sans-serif; }
    .link-btn:hover { text-decoration:underline; }
    .benefit-row  { display:flex; gap:10px; align-items:center; padding:8px 0; border-bottom:1px solid #f0f0f0; }
    .benefit-row:last-child { border-bottom:none; }
    .benefit-icon { width:36px; height:36px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
    .benefit-info { flex:1; }
    .benefit-name { font-size:13px; font-weight:bold; color:#1e3a6e; }
    .benefit-desc { font-size:11px; color:#777; }
  `]
})
export class OffersDashboardComponent implements OnInit {
  toastMsg   = '';
  showModal  = false;
  modalMsg   = '';
  pendingOffer: AmexOffer | null = null;

  breadcrumbs = [
    { id:'home', label:'Home' },
    { id:'offers', label:'Offers & Benefits' },
    { id:'dashboard', label:'Dashboard' },
  ];

  featuredOffers: AmexOffer[] = [
    { id:'O01', title:'5× Points on Dining', description:'Earn 5× Membership Rewards pts at restaurants worldwide through Jun 30.', category:'Dining', validUntil:'Jun 30', merchant:'All Restaurants', eligibleCards:['gold','platinum','centurion'], enrolled:true },
    { id:'O03', title:'$200 Hotel Credit', description:'Annual $200 credit on prepaid hotels booked via Amex Travel.', category:'Travel', validUntil:'Jul 15', merchant:'Amex Travel', eligibleCards:['platinum','centurion'], enrolled:false },
    { id:'O04', title:'Centurion Lounge Access', description:'Unlimited access to all Centurion Lounges & 1,400+ partner lounges.', category:'Travel', validUntil:'Ongoing', eligibleCards:['centurion','platinum'], enrolled:true },
  ];

  spotlightBenefits = [
    { icon:'✈️', bg:'#e8f0fe', title:'Global Lounge Collection', desc:'Access 1,400+ airport lounges worldwide.', status:'active' as AmexStatus, statusLabel:'Active' },
    { icon:'🏨', bg:'#e6f9f0', title:'Hotel & Resort Credit',    desc:'Up to $200 credit on eligible hotels.',   status:'active' as AmexStatus, statusLabel:'Active' },
    { icon:'💳', bg:'#fff8e1', title:'Purchase Protection',       desc:'90-day protection on eligible purchases.', status:'active' as AmexStatus, statusLabel:'Active' },
    { icon:'⭐', bg:'#fce4ec', title:'Hilton Honors Gold',        desc:'Automatic Gold — upgrade & bonus points.', status:'pending' as AmexStatus, statusLabel:'Pending' },
  ];

  constructor(public router: Router) {}
  ngOnInit() {}

  onBreadcrumb(id: string) {
    if (id === 'home')   this.router.navigate(['/']);
    if (id === 'offers') this.router.navigate(['/offers']);
  }
  onEnroll(offer: AmexOffer) {
    this.pendingOffer = offer;
    this.modalMsg = `Enroll card member in "${offer.title}"?`;
    this.showModal = true;
  }
  confirmEnroll() {
    if (this.pendingOffer) { this.pendingOffer.enrolled = true; this.toastMsg = `Enrolled in "${this.pendingOffer.title}".`; this.pendingOffer = null; }
    this.showModal = false;
  }
  onUnenroll(offer: AmexOffer) { offer.enrolled = false; this.toastMsg = `Unenrolled from "${offer.title}".`; }
}
