import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexPageHeaderComponent, AmexBreadcrumbTrailComponent,
  AmexStatusBadgeComponent, AmexStatus,
  AmexCardBadgeComponent, AmexCardType,
  AmexPointsDisplayComponent,
  AmexSuccessToastComponent,
  AmexConfirmationModalComponent,
} from '@ui-components/ui';

interface Promotion {
  id:string; title:string; description:string; category:string;
  pointsMultiplier?:number; cashbackPercent?:number;
  startDate:string; endDate:string;
  eligibleCards:AmexCardType[]; status:AmexStatus;
  enrolled:boolean; merchant?:string;
}

@Component({
  selector: 'app-offers-promotions',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    AmexPageHeaderComponent, AmexBreadcrumbTrailComponent,
    AmexStatusBadgeComponent, AmexCardBadgeComponent,
    AmexPointsDisplayComponent,
    AmexSuccessToastComponent, AmexConfirmationModalComponent,
  ],
  template: `
    <amex-page-header portalStyle="onls" title="PROMOTIONS"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'offers',label:'Offers & Benefits'},{id:'promos',label:'Promotions'}]"
      [showBack]="true" (backClick)="router.navigate(['/offers'])" (itemClick)="onBreadcrumb($event)">
    </amex-breadcrumb-trail>

    <div class="page-body">
      <amex-success-toast *ngIf="successMsg" [message]="successMsg" portalStyle="onls"
        [autoDismiss]="true" [duration]="4000" (dismissed)="successMsg=''">
      </amex-success-toast>

      <div class="kpi-row">
        <div class="kpi-card"><amex-points-display [points]="activeCount"   label="Active"    [compact]="true"></amex-points-display></div>
        <div class="kpi-card"><amex-points-display [points]="enrolledCount" label="Enrolled"  [compact]="true"></amex-points-display></div>
        <div class="kpi-card"><amex-points-display [points]="upcomingCount" label="Upcoming"  [compact]="true"></amex-points-display></div>
        <div class="kpi-card"><amex-points-display [points]="expiredCount"  label="Expired"   [compact]="true"></amex-points-display></div>
      </div>

      <div class="filter-bar">
        <span class="filter-label">Status:</span>
        <button *ngFor="let f of statusFilters" class="filter-chip"
          [class.active]="activeFilter===f" (click)="activeFilter=f">{{ f }}</button>
        <input class="search-input" [(ngModel)]="searchTerm" placeholder="Search promotions..."/>
      </div>

      <div class="panel">
        <div class="panel-hd">
          Promotional Campaigns
          <span class="count">{{ filteredPromotions.length }} results</span>
        </div>
        <table class="tbl">
          <thead><tr><th>Promotion</th><th>Reward</th><th>Eligible Cards</th><th>Period</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr *ngFor="let p of filteredPromotions">
              <td>
                <div class="p-title">{{ p.title }}</div>
                <div class="p-desc">{{ p.description }}</div>
                <div *ngIf="p.merchant" class="p-merchant">{{ p.merchant }}</div>
              </td>
              <td>
                <span *ngIf="p.pointsMultiplier" class="pill pts">{{ p.pointsMultiplier }}× Points</span>
                <span *ngIf="p.cashbackPercent"  class="pill cb">{{ p.cashbackPercent }}% Back</span>
              </td>
              <td>
                <div class="badge-row">
                  <amex-card-badge *ngFor="let c of p.eligibleCards" [type]="c"></amex-card-badge>
                </div>
              </td>
              <td>
                <div class="pd-from">{{ p.startDate }}</div>
                <div class="pd-to">to {{ p.endDate }}</div>
              </td>
              <td><amex-status-badge [status]="p.status"></amex-status-badge></td>
              <td>
                <button *ngIf="!p.enrolled && p.status==='active'" class="act-btn enroll"   (click)="onEnroll(p)">Enroll</button>
                <button *ngIf="p.enrolled  && p.status==='active'" class="act-btn unenroll" (click)="onUnenroll(p)">Unenroll</button>
                <span   *ngIf="p.status!=='active'" class="na">—</span>
              </td>
            </tr>
            <tr *ngIf="!filteredPromotions.length"><td colspan="6" class="empty">No promotions match your filter.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <amex-confirmation-modal [visible]="showModal" portalStyle="onls"
      [message]="modalMsg" confirmLabel="OK" cancelLabel="Cancel"
      (confirm)="confirmAction()" (cancel)="showModal=false">
    </amex-confirmation-modal>
  `,
  styles: [`
    .page-body { padding:16px 0; }
    .kpi-row  { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:14px; }
    .kpi-card { background:#fff; border:1px solid #dde4ed; border-top:3px solid #1e3a6e; padding:12px 18px; border-radius:2px; }
    .filter-bar { background:#fff; border:1px solid #dde4ed; padding:10px 14px; margin-bottom:14px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
    .filter-label{ font-size:12px; font-weight:bold; color:#555; }
    .filter-chip { padding:3px 12px; font-size:12px; border:1px solid #c8d8e8; border-radius:2px; cursor:pointer; background:#fff; color:#1e3a6e; font-family:Arial,sans-serif; }
    .filter-chip:hover,.filter-chip.active { background:#1e3a6e; color:#fff; border-color:#1e3a6e; }
    .search-input{ margin-left:auto; padding:4px 10px; border:1px solid #c8d8e8; border-radius:2px; font-size:12px; width:180px; font-family:Arial,sans-serif; outline:none; }
    .panel   { background:#fff; border:1px solid #dde4ed; border-radius:2px; overflow:hidden; }
    .panel-hd{ background:#e8f0f8; border-bottom:1px solid #c8d8e8; padding:8px 14px; font-size:13px; font-weight:bold; color:#1e3a6e; display:flex; justify-content:space-between; align-items:center; }
    .count   { font-size:11px; color:#888; font-weight:normal; }
    .tbl     { width:100%; border-collapse:collapse; font-size:12px; font-family:Arial,sans-serif; }
    .tbl th  { background:#f5f8fc; padding:8px 12px; text-align:left; font-size:11px; font-weight:bold; color:#555; border-bottom:1px solid #dde4ed; text-transform:uppercase; }
    .tbl td  { padding:10px 12px; border-bottom:1px solid #f0f0f0; vertical-align:middle; }
    .tbl tr:hover td { background:#fafcff; }
    .p-title  { font-weight:bold; color:#1e3a6e; margin-bottom:2px; }
    .p-desc   { font-size:11px; color:#777; }
    .p-merchant{ font-size:11px; color:#006fcf; font-weight:bold; margin-top:2px; }
    .badge-row { display:flex; gap:4px; flex-wrap:wrap; }
    .pill     { display:inline-block; padding:3px 10px; border-radius:10px; font-size:11px; font-weight:bold; }
    .pill.pts { background:#e3f0ff; color:#006fcf; }
    .pill.cb  { background:#e6f9f0; color:#1a7a4a; }
    .pd-from  { font-size:12px; color:#444; }
    .pd-to    { font-size:11px; color:#aaa; }
    .na    { color:#bbb; font-size:12px; }
    .empty { text-align:center; padding:32px; color:#aaa; }
    .act-btn  { padding:4px 12px; font-size:11px; font-family:Arial,sans-serif; border:none; border-radius:2px; cursor:pointer; font-weight:bold; }
    .act-btn.enroll   { background:#006fcf; color:#fff; }
    .act-btn.unenroll { background:#f0f0f0; color:#555; border:1px solid #ccc; }
  `]
})
export class OffersPromotionsComponent {
  successMsg=''; showModal=false; modalMsg='';
  pendingAction: (() => void) | null = null;
  activeFilter='All'; searchTerm='';
  statusFilters=['All','Active','Upcoming','Expired'];

  promotions: Promotion[] = [
    { id:'P01', title:'Summer Dining Bonus',        description:'Earn 5× points at all restaurants this summer',         category:'Dining',    pointsMultiplier:5,  startDate:'Jun 1, 2025',  endDate:'Aug 31, 2025', eligibleCards:['gold','platinum','centurion'], status:'active',  enrolled:true  },
    { id:'P02', title:'Travel More Rewards',         description:'3× points on all travel bookings via Amex Travel',      category:'Travel',    pointsMultiplier:3,  startDate:'Jun 1, 2025',  endDate:'Jul 31, 2025', eligibleCards:['platinum','centurion'],        status:'active',  enrolled:false, merchant:'Amex Travel' },
    { id:'P03', title:'Uber Eats Cashback',          description:'20% cashback on Uber Eats orders above $30',           category:'Dining',    cashbackPercent:20,  startDate:'Jun 10, 2025', endDate:'Jun 25, 2025', eligibleCards:['green','gold'],                status:'active',  enrolled:true,  merchant:'Uber Eats' },
    { id:'P04', title:'Amazon Prime Day Special',    description:'10% cashback on all Amazon purchases during Prime Day', category:'Shopping',  cashbackPercent:10,  startDate:'Jul 8, 2025',  endDate:'Jul 9, 2025',  eligibleCards:['green','gold','platinum'],      status:'pending', enrolled:false, merchant:'Amazon' },
    { id:'P05', title:'Holiday Shopping Boost',      description:'4× points at US retail stores this holiday season',    category:'Shopping',  pointsMultiplier:4,  startDate:'Nov 1, 2025',  endDate:'Dec 31, 2025', eligibleCards:['gold','platinum','centurion'],  status:'pending', enrolled:false },
    { id:'P06', title:'Spring Travel Special',       description:'Double miles on international flights booked in April', category:'Travel',    pointsMultiplier:2,  startDate:'Apr 1, 2025',  endDate:'Apr 30, 2025', eligibleCards:['platinum','centurion'],         status:'expired', enrolled:false },
    { id:'P07', title:'Gas Station Rewards',         description:'Triple points at all US gas stations through July',    category:'Auto',      pointsMultiplier:3,  startDate:'Jun 1, 2025',  endDate:'Jul 31, 2025', eligibleCards:['green','gold','platinum'],       status:'active',  enrolled:false },
    { id:'P08', title:'Centurion Dining Exclusive',  description:'10× points at Michelin-starred restaurants worldwide', category:'Dining',    pointsMultiplier:10, startDate:'Jun 1, 2025',  endDate:'Dec 31, 2025', eligibleCards:['centurion'],                    status:'active',  enrolled:true  },
  ];

  get filteredPromotions() {
    const map:Record<string,string>={Active:'active',Upcoming:'pending',Expired:'expired'};
    return this.promotions.filter(p=>{
      const s = this.activeFilter==='All' || p.status===map[this.activeFilter];
      const q = !this.searchTerm || p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || (p.merchant||'').toLowerCase().includes(this.searchTerm.toLowerCase());
      return s && q;
    });
  }
  get activeCount()   { return this.promotions.filter(p=>p.status==='active').length; }
  get enrolledCount() { return this.promotions.filter(p=>p.enrolled).length; }
  get upcomingCount() { return this.promotions.filter(p=>p.status==='pending').length; }
  get expiredCount()  { return this.promotions.filter(p=>p.status==='expired').length; }

  onEnroll(p:Promotion)   { this.pendingAction=()=>{p.enrolled=true;  this.successMsg=`Enrolled in "${p.title}".`; };     this.modalMsg=`Enroll in "${p.title}"?`;    this.showModal=true; }
  onUnenroll(p:Promotion) { this.pendingAction=()=>{p.enrolled=false; this.successMsg=`Unenrolled from "${p.title}".`;};  this.modalMsg=`Unenroll from "${p.title}"?`; this.showModal=true; }
  confirmAction() { if(this.pendingAction){this.pendingAction();this.pendingAction=null;} this.showModal=false; }
  onBreadcrumb(id:string) { if(id==='home') this.router.navigate(['/']); if(id==='offers') this.router.navigate(['/offers']); }
  constructor(public router:Router) {}
}
