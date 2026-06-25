import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

type Step = 'search' | 'cards' | 'issue' | 'done';
type IssueView = 'select' | 'review' | 'success';

interface CardInfo { cardNumber: string; cardType: string; status: string; }
interface WearableColor { hex: string; label: string; }
interface WearableProduct {
  name: string;
  type: string;
  colors: WearableColor[];
  icon: string;
}

const API_BASE = `${environment.apiGatewayUrl}/api`;

// ── Mock data matching V2__seed_data.sql exactly ─────────────────────────────
const MOCK_MEMBERS: Record<string, { name: string; cards: CardInfo[] }> = {
  '12345': {
    name: 'John Doe',
    cards: [
      { cardNumber: '3744 XXXXXX 9008', cardType: 'Centurion', status: 'Active' },
      { cardNumber: '3782 XXXXXX 0005', cardType: 'Platinum',  status: 'Active' },
      { cardNumber: '3711 XXXXXX 1234', cardType: 'Gold',      status: 'Inactive' },
    ],
  },
  '67890': {
    name: 'Jane Smith',
    cards: [
      { cardNumber: '3701 XXXXXX 4321', cardType: 'Platinum', status: 'Active' },
    ],
  },
  '11111': {
    name: 'Robert Brown',
    cards: [
      { cardNumber: '3799 XXXXXX 8888', cardType: 'Gold', status: 'Active' },
    ],
  },
  '22222': {
    name: 'Emily Carter',
    cards: [
      { cardNumber: '3755 XXXXXX 2200', cardType: 'Centurion', status: 'Active' },
      { cardNumber: '3766 XXXXXX 3311', cardType: 'Platinum',  status: 'Active' },
    ],
  },
  '33333': {
    name: 'Michael Chen',
    cards: [
      { cardNumber: '3788 XXXXXX 5500', cardType: 'Gold', status: 'Active' },
    ],
  },
};

@Component({
  selector: 'app-wearables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="wp">

      <!-- ── Backend status banner ───────────────────────────────────────── -->
      <div class="wp__status-bar" *ngIf="backendStatus !== 'online'">
        <span class="wp__status-dot"
              [class.wp__status-dot--checking]="backendStatus === 'checking'"
              [class.wp__status-dot--offline]="backendStatus === 'offline'"></span>
        <span *ngIf="backendStatus === 'checking'" class="wp__status-msg wp__status-msg--checking">
          Connecting to backend…
        </span>
        <span *ngIf="backendStatus === 'offline'" class="wp__status-msg wp__status-msg--offline">
          Backend unavailable — showing demo data
        </span>
      </div>

      <!-- ═══ STEP 1 & 2: Enter Client Number + Card Selection ═══ -->
      <ng-container *ngIf="step === 'search' || step === 'cards'">

        <div class="wp__section">
          <div class="wp__title">Enter Client Number</div>
          <div class="wp__divider"></div>
          <div class="wp__input-row">
            <input class="wp__input" [(ngModel)]="clientCode"
                   placeholder="eg. 12345" (keyup.enter)="onEnterClient()" />
            <button class="wp__enter-btn"
                    [class.wp__enter-btn--filled]="clientCode.trim()"
                    (click)="onEnterClient()">Enter</button>
          </div>
        </div>

        <ng-container *ngIf="step === 'cards'">

          <!-- Member name row -->
          <div class="wp__member-row" *ngIf="memberName">
            <span class="wp__member-label">Member</span>
            <span class="wp__member-name">{{ memberName }}</span>
            <span class="wp__mock-badge" *ngIf="usingMockData">Demo</span>
          </div>

          <div class="wp__section">
            <div class="wp__title">Please Select Basic Card</div>
            <div class="wp__divider"></div>
            <select class="wp__select" [(ngModel)]="selectedCard">
              <option [ngValue]="null" disabled>-- Select a Card --</option>
              <option *ngFor="let c of cards" [ngValue]="c">
                {{ c.cardNumber }} - {{ c.cardType }}
              </option>
            </select>
          </div>

          <div class="wp__section" *ngIf="selectedCard">
            <div class="wp__title">Card Selection</div>
            <div class="wp__divider"></div>
            <div class="wp__card-art-row">
              <div class="wp__card-art">
                <div class="wp__card-logo-box">
                  <span class="wp__card-logo-am">AMERICAN</span>
                  <span class="wp__card-logo-ex">EXPRESS</span>
                </div>
                <div class="wp__card-art__number">{{ selectedCard.cardNumber }}</div>
                <div class="wp__card-art__type">{{ selectedCard.cardType }}</div>
              </div>
              <div class="wp__card-masked">{{ selectedCard.cardNumber }}</div>
            </div>
          </div>

          <div class="wp__apply-row">
            <span class="wp__apply-text">Want to apply for a new wearable?</span>
            <button class="wp__apply-btn" (click)="onApply()">Apply</button>
          </div>

        </ng-container>
      </ng-container>

      <!-- ═══ STEP 3: Select Amex Wearable ═══ -->
      <ng-container *ngIf="step === 'issue'">

        <div class="wp__section">
          <div class="wp__title">Select Amex Wearable</div>
          <div class="wp__divider"></div>
        </div>

        <!-- Type icon tabs -->
        <div class="wp__type-tabs">
          <div *ngFor="let t of wearableTypes"
               class="wp__type-tab"
               [class.wp__type-tab--active]="selectedWearableType === t.id"
               (click)="selectType(t.id)">
            <div class="wp__type-icon" [innerHTML]="t.svg"></div>
            <span class="wp__type-label">{{ t.label }}</span>
          </div>
        </div>

        <!-- Content area: single-col (select) or two-col (review/success) -->
        <div class="wp__issue-layout" [class.wp__issue-layout--split]="issueView !== 'select'">

          <!-- LEFT: Product card -->
          <div class="wp__product-card" *ngIf="currentProduct">

            <div class="wp__product-card__top">
              <span class="wp__product-link">
                The American Express {{ selectedCard?.cardType }} Credit Card
                &ndash; Card Ending {{ selectedCard?.cardNumber | slice:-4 }}
              </span>
              <button class="wp__faq-btn" title="FAQ">
                <span>?</span>
                <span class="wp__faq-label">FAQ</span>
              </button>
            </div>

            <div class="wp__product-name">{{ currentProduct.name }}</div>

            <!-- Carousel -->
            <div class="wp__carousel">
              <button class="wp__carousel-arrow"
                      (click)="prevProduct()"
                      [disabled]="selectedWearableIndex === 0">&#8592;</button>

              <div class="wp__product-img-area">
                <div class="wp__product-img-shell">
                  <img *ngIf="selectedWearableType === 'Watch'"
                      src="https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw46845574/images/Titan/Catalog/2649WL04_3.jpg?sw=600&sh=600"
                      alt="Amex Leather Watch" class="wp__product-img" />
                  <img *ngIf="selectedWearableType === 'band'"
                      src="https://i.dailymail.co.uk/i/pix/2014/09/16/1410878725038_wps_7_Black_jpg.jpg"
                      alt="Amex Sport Band" class="wp__product-img" />
                  <img *ngIf="selectedWearableType === 'ring'"
                      src="https://th.bing.com/th/id/OIP.0-DKtEkXttYBSqhPb0ParQHaHa?w=192&h=192&c=7&r=0&o=7&pid=1.7&rm=3"
                      alt="Amex Ring" class="wp__product-img" />
                </div>
              </div>

              <button class="wp__carousel-arrow"
                      (click)="nextProduct()"
                      [disabled]="selectedWearableIndex >= currentProducts.length - 1">&#8594;</button>
            </div>

            <!-- Pagination dots -->
            <div class="wp__dots">
              <span *ngFor="let p of currentProducts; let i = index"
                    class="wp__dot"
                    [class.wp__dot--active]="i === selectedWearableIndex"
                    (click)="selectedWearableIndex = i; selectedColorIndex = 0"></span>
            </div>

            <!-- Select Color -->
            <div class="wp__attr-row">
              <span class="wp__attr-label">Select Color</span>
              <div class="wp__color-swatches">
                <div *ngFor="let c of currentProduct.colors; let i = index"
                     class="wp__color-dot"
                     [class.wp__color-dot--active]="selectedColorIndex === i"
                     [style.background]="c.hex"
                     (click)="selectedColorIndex = i"
                     [title]="c.label"></div>
              </div>
            </div>

            <!-- Wearable Name -->
            <div class="wp__attr-row">
              <span class="wp__attr-label">Wearable Name</span>
              <input class="wp__name-input" [(ngModel)]="wearableName" maxlength="20" />
            </div>

            <!-- Action buttons -->
            <div class="wp__action-btns">
              <button class="wp__create-btn" (click)="onCreateWearable()">Create My Amex Wearable</button>
              <button class="wp__goback-btn" (click)="step = 'cards'">Go Back</button>
            </div>

          </div><!-- /wp__product-card -->

          <!-- RIGHT PANEL: shown when issueView is review or success -->
          <div class="wp__right-panel" *ngIf="issueView !== 'select'">

            <!-- Review -->
            <ng-container *ngIf="issueView === 'review'">
              <div class="wp__right-inner">
                <div class="wp__rp-title">My Amex Wearable</div>
                <div class="wp__rp-card-link">
                  The American Express {{ selectedCard?.cardType }} Credit Card
                  &ndash; Card Ending {{ selectedCard?.cardNumber | slice:-4 }}
                </div>

                <table class="wp__rp-table">
                  <tr>
                    <td class="wp__rp-label">Wearable Type</td>
                    <td class="wp__rp-value">{{ currentProduct?.type }}</td>
                  </tr>
                  <tr>
                    <td class="wp__rp-label">Color Selected</td>
                    <td class="wp__rp-value">
                      <div class="wp__rp-color-swatch" [style.background]="currentSelectedColor.hex"></div>
                    </td>
                  </tr>
                  <tr>
                    <td class="wp__rp-label">Wearable Name</td>
                    <td class="wp__rp-value wp__rp-value--blue">{{ wearableName }}</td>
                  </tr>
                </table>

                <!-- Thumbnail image -->
                <div class="wp__rp-thumb-row">
                  <div class="wp__rp-thumb">
                    <img *ngIf="selectedWearableType === 'Watch'"
                         src="https://images.unsplash.com/photo-1573408301185-9519f94977f1?auto=format&w=120&q=80"
                         alt="Watch thumbnail" class="wp__rp-thumb-img" />
                    <img *ngIf="selectedWearableType === 'band'"
                         src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&w=120&q=80"
                         alt="Band thumbnail" class="wp__rp-thumb-img" />
                    <ng-container *ngIf="selectedWearableType === 'ring'">
                      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="60" cy="50" rx="38" ry="38" [attr.fill]="currentSelectedColor.hex" stroke="#888" stroke-width="1"/>
                        <ellipse cx="60" cy="50" rx="22" ry="22" fill="#f5f5f5"/>
                      </svg>
                    </ng-container>
                  </div>
                </div>

                <p class="wp__rp-notice">
                  Please make sure you are happy with your selection before submitting.
                  Your Wearable selection cannot be edited after submission.
                </p>

                <div class="wp__rp-tc-row">
                  <input type="checkbox" id="rp-tc" [(ngModel)]="tcAccepted" />
                  <label for="rp-tc"><span class="wp__rp-tc-link">Terms &amp; Conditions apply</span></label>
                </div>

                <button class="wp__rp-submit-btn" [disabled]="!tcAccepted || submitting" (click)="onSubmit()">
                  {{ submitting ? 'Submitting...' : 'Submit' }}
                </button>
              </div>
            </ng-container>

            <!-- Success -->
            <ng-container *ngIf="issueView === 'success'">
              <div class="wp__right-inner wp__right-inner--success">
                <div class="wp__success-icon">
                  <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="36" cy="36" r="33" stroke="#4CAF50" stroke-width="3"/>
                    <path d="M21 36 L31 46 L51 26" stroke="#4CAF50" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="wp__success-text">Wearable requested successfully</div>
                <!-- FIX: step=done was unreachable before — this button connects it -->
                <button class="wp__view-summary-btn" (click)="step = 'done'">View Summary</button>
              </div>
            </ng-container>

          </div><!-- /wp__right-panel -->

        </div><!-- /wp__issue-layout -->

      </ng-container>

      <!-- ═══ STEP 4: YOUR AMEX WEARABLES (done) ═══ -->
      <ng-container *ngIf="step === 'done' && issuedDevice">

        <div class="wp__section">
          <div class="wp__title">Enter Client Number</div>
          <div class="wp__divider"></div>
          <div class="wp__input-row">
            <input class="wp__input" [(ngModel)]="clientCode" />
            <button class="wp__enter-btn wp__enter-btn--filled" (click)="onEnterClient()">Enter</button>
          </div>
        </div>

        <div class="wp__summary">
          <div class="wp__summary-title">YOUR AMEX WEARABLES</div>
          <table class="wp__summary-table">
            <tr>
              <td class="wp__sl">Selected Card UCI</td>
              <td class="wp__sv">{{ issuedDevice.selectedCardUci }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Wearable UCI</td>
              <td class="wp__sv">{{ issuedDevice.wearableUci }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Wearable Type</td>
              <td class="wp__sv">{{ issuedDevice.wearableType }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Color Selected</td>
              <td class="wp__sv">{{ issuedDevice.colorSelected }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Wearable Name</td>
              <td class="wp__sv">{{ issuedDevice.wearableName }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Order Date</td>
              <td class="wp__sv">{{ issuedDevice.orderDate }}</td>
            </tr>
          </table>
        </div>

        <div style="padding: 12px 0;">
          <button class="wp__back-link" (click)="reset()">Search Another Client</button>
        </div>

      </ng-container>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; background: #fff; }

    .wp { background: #fff; padding: 20px 24px; min-height: 400px; }

    /* ── Backend status banner ── */
    .wp__status-bar {
      display: flex; align-items: center; gap: 8px;
      padding: 7px 14px; margin-bottom: 14px; border-radius: 3px;
      font-size: 13px;
    }
    .wp__status-dot {
      width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    }
    .wp__status-dot--checking {
      background: #f0a500;
      animation: wp-pulse 1.2s ease-in-out infinite;
    }
    .wp__status-dot--offline { background: #d9534f; }
    @keyframes wp-pulse {
      0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
    }
    .wp__status-msg { font-size: 13px; }
    .wp__status-msg--checking { color: #856404; }
    .wp__status-bar:has(.wp__status-msg--checking) { background: #fff8e1; border: 1px solid #f0c040; }
    .wp__status-msg--offline { color: #721c24; }
    .wp__status-bar:has(.wp__status-msg--offline) { background: #fdf0f0; border: 1px solid #f5c6cb; }

    /* ── Member name row ── */
    .wp__member-row {
      display: flex; align-items: center; gap: 10px;
      padding: 6px 0 16px;
    }
    .wp__member-label { font-size: 13px; color: #666; }
    .wp__member-name { font-size: 15px; font-weight: bold; color: #1a1a1a; }
    .wp__mock-badge {
      font-size: 10px; background: #f0a500; color: #fff;
      padding: 2px 7px; border-radius: 10px; font-weight: bold;
      letter-spacing: 0.5px;
    }

    /* ── Section ── */
    .wp__section { margin-bottom: 24px; }
    .wp__title { font-size: 22px; font-weight: normal; color: #1a1a1a; margin-bottom: 8px; }
    .wp__divider { height: 2px; background: #1a6cb8; margin-bottom: 16px; }

    /* ── Input row ── */
    .wp__input-row { display: flex; align-items: stretch; }
    .wp__input {
      border: 1px solid #ccc; border-right: none;
      padding: 8px 12px; font-size: 14px; font-family: Arial, sans-serif;
      width: 340px; outline: none; box-sizing: border-box;
    }
    .wp__input:focus { border-color: #1a6cb8; }
    .wp__enter-btn {
      padding: 8px 24px; font-size: 14px; font-family: Arial, sans-serif;
      cursor: pointer; border: 1px solid #ccc; background: #f5f5f5; color: #777;
      white-space: nowrap;
    }
    .wp__enter-btn--filled { background: #1a6cb8; color: #fff; border-color: #1a6cb8; }
    .wp__enter-btn--filled:hover { background: #155a9e; }

    /* ── Card dropdown ── */
    .wp__select {
      border: 1px solid #ccc; padding: 7px 10px; font-size: 14px;
      font-family: Arial, sans-serif; width: 420px; outline: none;
      background: #fff; cursor: pointer;
    }

    /* ── Card art ── */
    .wp__card-art-row { display: flex; flex-direction: column; gap: 8px; }
    .wp__card-art {
      width: 210px; height: 130px;
      background: linear-gradient(135deg, #c8a030, #e8c840, #b08020);
      border-radius: 8px; padding: 14px; position: relative;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .wp__card-logo-box {
      background: #006fcf; width: 50px; height: 36px; border-radius: 4px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; padding: 2px;
    }
    .wp__card-logo-am { color: #fff; font-size: 5.5px; font-weight: 900; letter-spacing: 0.5px; }
    .wp__card-logo-ex { color: #fff; font-size: 9px; font-weight: 900; letter-spacing: 0.5px; }
    .wp__card-art__number { font-size: 11px; color: #fff; font-family: monospace; letter-spacing: 1px; }
    .wp__card-art__type { font-size: 10px; color: rgba(255,255,255,0.85); }
    .wp__card-masked { font-size: 14px; color: #333; font-family: monospace; letter-spacing: 1px; }

    /* ── Apply row ── */
    .wp__apply-row {
      display: flex; align-items: center; gap: 14px;
      margin-top: 4px; padding: 6px 0;
    }
    .wp__apply-text { font-size: 14px; color: #222; }
    .wp__apply-btn {
      background: #1a6cb8; color: #fff; border: none;
      padding: 7px 26px; font-size: 14px; font-family: Arial, sans-serif;
      cursor: pointer; border-radius: 2px;
    }
    .wp__apply-btn:hover { background: #155a9e; }

    /* ── Wearable type tabs ── */
    .wp__type-tabs {
      display: flex; gap: 40px; padding: 10px 0 0;
      border-bottom: 1px solid #e0e0e0; margin-bottom: 20px;
    }
    .wp__type-tab {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      cursor: pointer; padding-bottom: 12px;
      border-bottom: 3px solid transparent; color: #666;
      min-width: 64px; transition: color 0.15s, border-color 0.15s;
    }
    .wp__type-tab:hover { color: #1a6cb8; }
    .wp__type-tab--active { color: #1a6cb8; border-bottom-color: #1a6cb8; }
    .wp__type-icon {
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
    }
    .wp__type-label { font-size: 13px; font-weight: bold; }

    /* ── Issue layout (single vs split) ── */
    .wp__issue-layout { display: flex; gap: 0; align-items: flex-start; }
    .wp__issue-layout--split .wp__product-card { flex: 0 0 55%; max-width: 55%; }
    .wp__issue-layout--split .wp__right-panel {
      flex: 0 0 45%; max-width: 45%;
      border-left: 1px solid #e0e0e0; min-height: 480px;
    }

    /* ── Product card ── */
    .wp__product-card { border: 1px solid #ddd; flex: 1; }
    .wp__product-card__top {
      display: flex; justify-content: space-between; align-items: flex-start;
      padding: 14px 16px 0;
    }
    .wp__product-link { color: #006fcf; font-size: 13px; cursor: pointer; flex: 1; }
    .wp__faq-btn {
      background: none; border: 2px solid #006fcf; color: #006fcf;
      width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
      font-size: 13px; font-weight: bold;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 0; flex-shrink: 0; line-height: 1; gap: 1px;
    }
    .wp__faq-label { font-size: 8px; font-weight: normal; }
    .wp__product-name { font-size: 15px; font-weight: bold; color: #1a1a1a; padding: 10px 16px 6px; }

    /* ── Carousel ── */
    .wp__carousel {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 4px; min-height: 200px;
    }
    .wp__carousel-arrow {
      background: #555; border: none; color: #fff;
      width: 36px; height: 36px; cursor: pointer; font-size: 16px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 2px; flex-shrink: 0; font-family: Arial, sans-serif;
    }
    .wp__carousel-arrow:disabled { opacity: 0.25; cursor: not-allowed; }
    .wp__carousel-arrow:not(:disabled):hover { background: #333; }
    .wp__product-img-area {
      flex: 1; display: flex; align-items: center; justify-content: center;
      padding: 10px 8px;
    }
    .wp__product-img-shell {
      width: 100%; max-width: 300px;
      display: flex; align-items: center; justify-content: center;
    }
    /* FIX: was missing — images were rendering broken */
    .wp__product-img {
      width: 100%; max-width: 260px; height: 180px;
      object-fit: contain; display: block;
    }
    .wp__product-svg { width: 100%; height: auto; }

    /* ── Pagination dots ── */
    .wp__dots { display: flex; justify-content: center; gap: 8px; padding: 6px 0 14px; }
    .wp__dot {
      width: 9px; height: 9px; border-radius: 50%;
      background: #ccc; cursor: pointer; transition: background 0.15s;
    }
    .wp__dot--active { background: #555; }

    /* ── Attr rows ── */
    .wp__attr-row { display: flex; align-items: center; gap: 14px; padding: 8px 16px; }
    .wp__attr-label { font-size: 13px; color: #333; min-width: 110px; font-weight: normal; }
    .wp__color-swatches { display: flex; gap: 8px; align-items: center; }
    .wp__color-dot {
      width: 20px; height: 20px; border-radius: 50%; cursor: pointer;
      border: 2px solid transparent; transition: border-color 0.15s;
    }
    .wp__color-dot--active { border-color: #1a6cb8; }
    .wp__color-dot:not(.wp__color-dot--active):hover { border-color: #999; }
    .wp__name-input {
      border: none; border-bottom: 1px solid #ccc; outline: none;
      font-size: 13px; color: #006fcf; font-family: Arial, sans-serif;
      padding: 2px 4px; background: transparent; width: 120px;
    }
    .wp__name-input:focus { border-bottom-color: #1a6cb8; }

    /* ── Action buttons ── */
    .wp__action-btns { display: flex; gap: 10px; padding: 16px 16px 20px; align-items: center; }
    .wp__create-btn {
      background: #1a6cb8; color: #fff; border: none;
      padding: 10px 22px; font-size: 14px; font-family: Arial, sans-serif;
      cursor: pointer; font-weight: normal; border-radius: 2px; white-space: nowrap;
    }
    .wp__create-btn:hover { background: #155a9e; }
    .wp__goback-btn {
      background: #fff; color: #333; border: 1px solid #aaa;
      padding: 10px 28px; font-size: 14px; font-family: Arial, sans-serif;
      cursor: pointer; border-radius: 2px;
    }
    .wp__goback-btn:hover { background: #f5f5f5; }

    /* ── Right panel ── */
    .wp__right-panel { display: flex; flex-direction: column; }
    .wp__right-inner { padding: 20px 24px; display: flex; flex-direction: column; gap: 12px; }
    .wp__rp-title { font-size: 17px; font-weight: bold; color: #1a1a1a; margin-bottom: 2px; }
    .wp__rp-card-link { color: #006fcf; font-size: 13px; line-height: 1.4; }
    .wp__rp-table { border-collapse: collapse; width: 100%; margin: 4px 0; }
    .wp__rp-table tr td { padding: 8px 0; vertical-align: middle; }
    .wp__rp-label { font-size: 13px; color: #555; width: 130px; vertical-align: middle; }
    .wp__rp-value { font-size: 13px; color: #333; }
    .wp__rp-value--blue { color: #006fcf; }
    .wp__rp-color-swatch { width: 80px; height: 18px; border-radius: 2px; }
    .wp__rp-thumb-row { display: flex; justify-content: flex-start; padding: 4px 0; }
    .wp__rp-thumb { width: 80px; height: 60px; }
    .wp__rp-thumb svg { width: 100%; height: 100%; }
    .wp__rp-notice { font-size: 12px; color: #555; line-height: 1.6; margin: 0; }
    .wp__rp-tc-row { display: flex; align-items: center; gap: 8px; font-size: 13px; }
    .wp__rp-tc-row input[type=checkbox] { accent-color: #1a6cb8; }
    .wp__rp-tc-link { color: #006fcf; text-decoration: underline; cursor: pointer; }
    .wp__rp-submit-btn {
      display: block; width: 100%;
      background: #1a3a6b; color: #fff; border: none;
      padding: 13px 0; font-size: 15px; font-weight: bold;
      cursor: pointer; font-family: Arial, sans-serif; border-radius: 2px; margin-top: 4px;
    }
    .wp__rp-submit-btn:hover:not(:disabled) { background: #16304f; }
    .wp__rp-submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    /* ── Success ── */
    .wp__right-inner--success {
      align-items: center; justify-content: center;
      min-height: 300px; text-align: center;
    }
    .wp__success-icon { width: 72px; height: 72px; }
    .wp__success-icon svg { width: 100%; height: 100%; }
    .wp__success-text { font-size: 14px; color: #1a1a1a; margin-top: 12px; font-weight: normal; }
    /* FIX: added button to reach the summary/done step which was previously unreachable */
    .wp__view-summary-btn {
      margin-top: 16px; background: #1a6cb8; color: #fff; border: none;
      padding: 10px 28px; font-size: 14px; font-family: Arial, sans-serif;
      cursor: pointer; border-radius: 2px;
    }
    .wp__view-summary-btn:hover { background: #155a9e; }

    /* ── Back link ── */
    .wp__back-link {
      background: none; border: none; color: #006fcf;
      font-size: 13px; cursor: pointer; text-decoration: underline;
      font-family: Arial, sans-serif; padding: 0;
    }

    /* ── Summary (done step) ── */
    .wp__summary { padding: 8px 0 16px; }
    .wp__summary-title {
      font-size: 16px; font-weight: bold; color: #1a1a1a;
      text-align: center; margin-bottom: 18px;
    }
    .wp__summary-table { border-collapse: collapse; margin-bottom: 16px; }
    .wp__sl {
      padding: 8px 24px 8px 0; font-size: 13px;
      font-weight: bold; color: #333; white-space: nowrap; vertical-align: top;
    }
    .wp__sv { padding: 8px 0; font-size: 13px; color: #006fcf; }
  `],
})
export class WearablesComponent implements OnInit {

  @Input() showPageHeader = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.checkBackendHealth(); }

  step: Step = 'search';
  issueView: IssueView = 'select';
  // FIX: was boolean | null (unused) — now 3-state so banner actually works
  backendStatus: 'checking' | 'online' | 'offline' = 'checking';
  // FIX: new flag — shows Demo badge when falling back to mock data
  usingMockData = false;
  clientCode = '';
  memberName = '';
  cards: CardInfo[] = [];
  selectedCard: CardInfo | null = null;
  submitting = false;
  selectedWearableType = 'Watch';
  selectedWearableIndex = 0;
  selectedColorIndex = 0;
  wearableName = 'QARR';
  tcAccepted = false;
  issuedDevice: any = null;

  wearableTypes = [
    {
      id: 'Watch', label: 'Watch',
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 28C10.477 28 6 23.523 6 18V14C6 8.477 10.477 4 16 4C21.523 4 26 8.477 26 14V18C26 23.523 21.523 28 16 28Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M10 14C10 11.239 12.686 9 16 9C19.314 9 22 11.239 22 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M10 18C10 20.761 12.686 23 16 23C19.314 23 22 20.761 22 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
      </svg>`
    },
    {
      id: 'band', label: 'Band',
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="2" width="8" height="9" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="10" y="10" width="12" height="12" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="12" y="21" width="8" height="9" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="13.5" y1="14.5" x2="18.5" y2="14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="13.5" y1="17.5" x2="18.5" y2="17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'ring', label: 'Ring',
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 22V17C6 11.477 10.477 7 16 7C21.523 7 26 11.477 26 17V22" stroke="currentColor" stroke-width="2" fill="none"/>
        <ellipse cx="16" cy="22" rx="10" ry="4.5" stroke="currentColor" stroke-width="2" fill="none"/>
        <ellipse cx="16" cy="17" rx="4" ry="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
      </svg>`
    },
  ];

  wearableProducts: Record<string, WearableProduct[]> = {
    Watch: [
      {
        name: 'Amex Leather Watch', type: 'Leather Watch',
        colors: [{ hex: '#8B5E3C', label: 'Brown' }, { hex: '#1a1a1a', label: 'Black' }],
        icon: '⌚',
      },
      {
        name: 'Amex Sport Watch', type: 'Sport Watch',
        colors: [{ hex: '#1a1a1a', label: 'Black' }, { hex: '#e8e8e8', label: 'Silver' }],
        icon: '⌚',
      },
    ],
    band: [
      {
        name: 'Amex Sport Band', type: 'Sport Band',
        colors: [{ hex: '#1a1a1a', label: 'Black' }, { hex: '#00274c', label: 'Navy' }],
        icon: '⌚',
      },
      {
        name: 'Amex Silicone Band', type: 'Silicone Band',
        colors: [{ hex: '#003087', label: 'Navy Blue' }, { hex: '#8b0000', label: 'Red' }],
        icon: '⌚',
      },
    ],
    ring: [
      {
        name: 'Amex Ceramic Ring', type: 'Ceramic Ring',
        colors: [{ hex: '#e8e8e8', label: 'White' }, { hex: '#1a1a1a', label: 'Black' }],
        icon: '💍',
      },
      {
        name: 'Amex Titanium Ring', type: 'Titanium Ring',
        colors: [{ hex: '#aab0bb', label: 'Silver' }, { hex: '#4a3728', label: 'Bronze' }],
        icon: '💍',
      },
    ],
  };

  get currentProducts(): WearableProduct[] { return this.wearableProducts[this.selectedWearableType] ?? []; }
  get currentProduct(): WearableProduct | null { return this.currentProducts[this.selectedWearableIndex] ?? null; }

  get currentSelectedColor() {
    const p = this.currentProduct;
    if (!p) return { hex: '#888', label: '', highlight: '#aaa', shadow: '#555', inner: '#666' };
    const c = p.colors[this.selectedColorIndex] ?? p.colors[0];
    return { ...c, highlight: this.lighten(c.hex, 0.3), shadow: this.darken(c.hex, 0.35), inner: this.darken(c.hex, 0.15) };
  }

  private lighten(hex: string, amt: number): string { return this.adjustColor(hex, amt); }
  private darken(hex: string, amt: number): string { return this.adjustColor(hex, -amt); }
  private adjustColor(hex: string, amt: number): string {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, Math.round(((n >> 16) & 0xff) + 255 * amt)));
    const g = Math.min(255, Math.max(0, Math.round(((n >> 8) & 0xff) + 255 * amt)));
    const b = Math.min(255, Math.max(0, Math.round((n & 0xff) + 255 * amt)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private checkBackendHealth(): void {
    this.backendStatus = 'checking';
    this.http.get<any>(`http://localhost:8080/actuator/health`).subscribe({
      next: () => { this.backendStatus = 'online'; },
      error: () => { this.backendStatus = 'offline'; },
    });
  }

  onEnterClient(): void {
    if (!this.clientCode.trim()) return;
    this.http.get<any>(`${API_BASE}/wearables/client/${this.clientCode.trim()}`).subscribe({
      next: (res) => {
        this.usingMockData = false;
        this.memberName = res.data?.memberName ?? 'Unknown Member';
        this.cards = res.data?.cards ?? [];
        this.selectedCard = this.cards[0] ?? null;
        this.step = 'cards';
      },
      error: () => {
        // FIX: was only 3 hardcoded clients — now mirrors all 5 from V2__seed_data.sql
        this.usingMockData = true;
        const mock = MOCK_MEMBERS[this.clientCode.trim()];
        this.memberName = mock?.name ?? 'Unknown Member';
        this.cards = mock?.cards ?? [];
        this.selectedCard = this.cards[0] ?? null;
        this.step = 'cards';
      },
    });
  }

  onApply(): void {
    if (!this.selectedCard) return;
    this.selectedWearableType = 'Watch';
    this.selectedWearableIndex = 0;
    this.selectedColorIndex = 0;
    this.wearableName = 'QARR';
    this.tcAccepted = false;
    this.issueView = 'select';
    this.step = 'issue';
  }

  selectType(id: string): void {
    this.selectedWearableType = id;
    this.selectedWearableIndex = 0;
    this.selectedColorIndex = 0;
  }

  prevProduct(): void {
    if (this.selectedWearableIndex > 0) { this.selectedWearableIndex--; this.selectedColorIndex = 0; }
  }

  nextProduct(): void {
    if (this.selectedWearableIndex < this.currentProducts.length - 1) { this.selectedWearableIndex++; this.selectedColorIndex = 0; }
  }

  onCreateWearable(): void { this.tcAccepted = false; this.issueView = 'review'; }

  onSubmit(): void {
    if (!this.tcAccepted || !this.currentProduct || !this.selectedCard) return;
    this.submitting = true;

    const payload = {
      clientCode:    this.clientCode,
      selectedCard:  this.selectedCard.cardNumber,
      wearableType:  this.selectedWearableType,
      colorSelected: this.currentSelectedColor.label,
      wearableName:  this.wearableName,
      tcAccepted:    true,
    };

    this.http.post<any>(`${API_BASE}/wearables/issue`, payload).subscribe({
      next: (res) => {
        const d = res.data;
        this.issuedDevice = {
          selectedCardUci: this.selectedCard?.cardNumber ?? '',
          wearableUci:     d?.serialNo   ?? '',
          wearableType:    d?.deviceType ?? '',
          colorSelected:   this.currentSelectedColor.label,
          wearableName:    this.wearableName,
          orderDate:       d?.issueDate  ?? new Date().toLocaleDateString('en-GB'),
        };
        this.submitting = false;
        this.issueView = 'success';
      },
      error: () => {
        this.issuedDevice = {
          selectedCardUci: this.selectedCard?.cardNumber ?? '',
          wearableUci:     'SN-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          wearableType:    this.currentProduct?.type ?? '',
          colorSelected:   this.currentSelectedColor.label,
          wearableName:    this.wearableName,
          orderDate:       new Date().toLocaleDateString('en-GB'),
        };
        this.submitting = false;
        this.issueView = 'success';
      },
    });
  }

  reset(): void {
    this.step = 'search';
    this.issueView = 'select';
    this.clientCode = '';
    this.memberName = '';
    this.cards = [];
    this.selectedCard = null;
    this.issuedDevice = null;
    this.tcAccepted = false;
    this.submitting = false;
    this.usingMockData = false;
    this.selectedWearableType = 'Watch';
    this.selectedWearableIndex = 0;
    this.selectedColorIndex = 0;
    this.wearableName = 'QARR';
  }
}