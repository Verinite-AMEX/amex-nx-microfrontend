import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexSuccessToastComponent } from '@ui-components/ui';

interface Benefit {
  id: string;
  title: string;
  description: string;
  bg: string;
  enrolled: boolean;
}

@Component({
  selector: 'app-offers-benefits',
  standalone: true,
  imports: [CommonModule, AmexSuccessToastComponent],
  template: `
    <div class="benefits-page">

      <!-- ════ BENEFITS TAB ACTIVE — image10 layout ════ -->

      <!-- AMEX card image at top (image10) -->
      <div class="card-hero">
        <div class="amex-card">
          <div class="card-top">
            <div class="card-logo">
              <div class="card-logo-sq">
                <span class="card-am">AMERICAN</span>
                <span class="card-ex">EXPRESS</span>
              </div>
            </div>
            <div class="card-nfc">&#9003;</div>
          </div>
          <div class="card-chip"></div>
          <div class="card-number">TESTAUTO &#9679;&#9679;&#9679;&#9679; 1100</div>
        </div>
      </div>

      <!-- Success toast -->
      <amex-success-toast *ngIf="successMsg" [message]="successMsg"
        portalStyle="onls" [autoDismiss]="true" [duration]="4000"
        (dismissed)="successMsg=''">
      </amex-success-toast>

      <!-- "Manage My Benefits" heading (image10) -->
      <div class="benefits-section">
        <h3 class="benefits-heading">Manage My Benefits</h3>

        <!-- Benefit tiles grid — each card has: image | title | description | Enrolled / Enroll button -->
        <div class="benefits-grid">
          <div *ngFor="let b of benefits" class="benefit-card">

            <!-- Benefit image area (image10 shows photo-style images) -->
            <div class="benefit-img" [style.background]="b.bg">
              <span class="benefit-img-lbl">AMERICAN EXPRESS</span>
            </div>

            <!-- Benefit info -->
            <div class="benefit-body">
              <div class="benefit-title">{{ b.title }}</div>
              <div class="benefit-desc">{{ b.description }}</div>

              <!-- Enrolled checkmark (image10 "✓ Enrolled") or Enroll button -->
              <div class="benefit-action">
                <span *ngIf="b.enrolled" class="enrolled-badge">
                  <span class="tick">&#10003;</span> Enrolled
                </span>
                <button *ngIf="!b.enrolled" class="enroll-btn" (click)="enroll(b)">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="page-footer">Copyright &copy; 2009 American Express Company</div>

    </div>
  `,
  styles: [`
    .benefits-page { font-family:Arial,sans-serif; background:#fff; min-height:100%; }

    /* AMEX card hero (image10 — centered platinum card) */
    .card-hero    { display:flex; justify-content:center; padding:28px 0 20px; }
    .amex-card    {
      width:240px; height:152px; border-radius:12px;
      background:linear-gradient(135deg,#9ca3af,#d1d5db,#9ca3af);
      padding:14px 18px; display:flex; flex-direction:column; justify-content:space-between;
      box-shadow:0 8px 24px rgba(0,0,0,.2); position:relative;
    }
    .card-top     { display:flex; justify-content:space-between; align-items:flex-start; }
    .card-logo-sq {
      background:#006fcf; border-radius:3px; padding:3px 6px;
      display:flex; flex-direction:column; align-items:center;
    }
    .card-am, .card-ex { color:#fff; font-size:6px; font-weight:900; letter-spacing:.5px; font-family:'Arial Black',sans-serif; line-height:1.3; }
    .card-nfc     { color:#555; font-size:18px; }
    .card-chip    {
      width:28px; height:20px; border-radius:3px;
      background:linear-gradient(135deg,#c8a951,#e8c96d,#c8a951);
      border:1px solid #b8992a;
    }
    .card-number  { font-size:11px; color:#333; font-family:monospace; letter-spacing:.5px; }

    /* Benefits section */
    .benefits-section { padding:0 20px 24px; }
    .benefits-heading {
      font-size:14px; color:#006fcf; font-weight:bold;
      margin-bottom:18px; border-bottom:1px solid #f0f0f0; padding-bottom:8px;
    }

    /* Benefit cards grid — matches image10 (3 columns) */
    .benefits-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:16px; }
    .benefit-card  {
      border:1px solid #e8e8e8; border-radius:8px; overflow:hidden;
      background:#fff; transition:box-shadow .15s;
    }
    .benefit-card:hover { box-shadow:0 4px 14px rgba(0,0,0,.08); }
    .benefit-img   {
      height:140px; background:#ccc; position:relative;
      display:flex; align-items:center; justify-content:center;
    }
    .benefit-img-lbl { color:rgba(255,255,255,.5); font-size:10px; font-weight:bold; letter-spacing:.08em; }
    .benefit-body  { padding:12px 14px 16px; }
    .benefit-title { font-size:13px; font-weight:bold; color:#006fcf; text-transform:uppercase; text-align:center; margin-bottom:6px; }
    .benefit-desc  { font-size:12px; color:#555; text-align:center; line-height:1.4; margin-bottom:12px; }
    .benefit-action { display:flex; justify-content:center; }

    /* Enrolled badge — image10 "✓ Enrolled" in green */
    .enrolled-badge {
      display:flex; align-items:center; gap:4px;
      font-size:13px; font-weight:bold; color:#2e7d32;
    }
    .tick { font-size:15px; color:#2e7d32; }

    /* Enroll button — image10 blue button */
    .enroll-btn {
      padding:7px 28px; background:#006fcf; color:#fff; border:none;
      border-radius:4px; font-size:13px; font-family:Arial,sans-serif; cursor:pointer;
    }
    .enroll-btn:hover { background:#0057a8; }

    .page-footer { text-align:right; padding:12px 20px; font-size:11px; color:#888; border-top:1px solid #f0f0f0; }
  `],
})
export class OffersBenefitsComponent {
  successMsg = '';

  // Benefits matching document image10 — DINING CASHBACK (Enrolled) + BENEFIT (Enroll button)
  benefits: Benefit[] = [
    {
      id:'B01', title:'DINING CASHBACK',
      description:'Get 10% cashback on dining, up to AED 50 monthly',
      bg:'linear-gradient(135deg,#2c5282,#4a90d9)',
      enrolled: true,
    },
    {
      id:'B02', title:'BENEFIT',
      description:'Enjoy benefit',
      bg:'linear-gradient(135deg,#4a5568,#718096)',
      enrolled: false,
    },
    {
      id:'B03', title:'LOUNGE ACCESS',
      description:'Unlimited access to Centurion Lounges worldwide',
      bg:'linear-gradient(135deg,#1a1a1a,#3a3a3a)',
      enrolled: true,
    },
    {
      id:'B04', title:'TRAVEL INSURANCE',
      description:'Comprehensive travel insurance coverage up to USD 500,000',
      bg:'linear-gradient(135deg,#276749,#48bb78)',
      enrolled: false,
    },
    {
      id:'B05', title:'PURCHASE PROTECTION',
      description:'90-day protection on eligible purchases against theft or damage',
      bg:'linear-gradient(135deg,#c05621,#f6ad55)',
      enrolled: true,
    },
    {
      id:'B06', title:'HOTEL CREDIT',
      description:'Annual USD 200 credit on prepaid hotels via Amex Travel',
      bg:'linear-gradient(135deg,#553c9a,#9f7aea)',
      enrolled: false,
    },
  ];

  enroll(b: Benefit) {
    b.enrolled = true;
    this.successMsg = `Enrolled in "${b.title}" successfully.`;
  }
}
