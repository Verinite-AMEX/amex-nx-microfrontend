import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * PointsBalanceSummaryCard
 * "SELECT & PAY WITH POINTS" panel.
 * - Dark navy header bar, two sub-tabs: Eligible Transactions | History
 * - "Select a Card" dropdown
 * - Points balance summary card once a card is selected
 * - Error state if card not eligible
 * Source: Pay with Points
 * Style: ONLS Helper — dark navy #1c3f72 header, teal tab strip, white content.
 */
@Component({
  selector: 'amex-points-balance-summary-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pbsc">

      <!-- Section header -->
      <div class="pbsc__header">SELECT &amp; PAY WITH POINTS</div>

      <!-- Sub-tabs -->
      <div class="pbsc__tabs">
        <button class="pbsc__tab"
                [class.pbsc__tab--active]="activeTab === 'eligible'"
                (click)="activeTab = 'eligible'">
          Eligible Transactions
        </button>
        <button class="pbsc__tab pbsc__tab--grey"
                [class.pbsc__tab--active]="activeTab === 'history'"
                (click)="activeTab = 'history'">
          History
        </button>
      </div>

      <!-- Card selector -->
      <div class="pbsc__selector-row">
        <label class="pbsc__selector-label" [for]="id + '-select-a-card'">Select a Card</label>
        <select [id]="id + '-select-a-card'" class="pbsc__card-select" [(ngModel)]="selectedCardNumber"
                (change)="cardSelected.emit(selectedCardNumber)">
          <option value="">-- Select --</option>
          <option *ngFor="let c of cards" [value]="c.cardNumber">
            {{ c.cardNumber }}
          </option>
        </select>
        <img *ngIf="selectedCardNumber" class="pbsc__card-img"
             src="https://via.placeholder.com/60x40/006fcf/ffffff?text=AMEX"
             alt="Card" />
      </div>

      <!-- Error -->
      <div *ngIf="errorMessage" class="pbsc__error">
        <span class="pbsc__error-icon">&#9888;</span>
        <span><strong>ERROR:</strong> {{ errorMessage }}</span>
      </div>

      <!-- Points balance summary (visible when card selected and eligible) -->
      <div *ngIf="selectedCardNumber && !errorMessage && balance !== null" class="pbsc__balance">
        <div class="pbsc__balance-panel">
          <div class="pbsc__balance-header">Points Balance</div>
          <div class="pbsc__balance-body">
            <div class="pbsc__balance-row">
              <span class="pbsc__balance-label">Card Number</span>
              <span class="pbsc__balance-value">{{ selectedCardNumber }}</span>
            </div>
            <div class="pbsc__balance-row">
              <span class="pbsc__balance-label">Available Points</span>
              <span class="pbsc__balance-value pbsc__balance-value--pts">
                {{ balance | number }}
              </span>
            </div>
            <div class="pbsc__balance-row">
              <span class="pbsc__balance-label">AED Equivalent</span>
              <span class="pbsc__balance-value">
                AED {{ aedEquivalent | number:'1.2-2' }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }
    .pbsc { border: 1px solid #ccc; }

    .pbsc__header {
      background: #1c3f72; color: #fff;
      font-size: 13px; font-weight: bold;
      padding: 10px 16px;
    }

    .pbsc__tabs {
      display: flex; background: #e0e0e0;
    }
    .pbsc__tab {
      flex: 1; padding: 8px 0;
      font-size: 13px; font-weight: bold;
      color: #fff; background: #2a7fa8;
      border: none; cursor: pointer;
      font-family: Arial, sans-serif;
      border-right: 1px solid #1c6a8a;
    }
    .pbsc__tab--grey { background: #888; border-right: none; }
    .pbsc__tab--active { background: #1c5f84; }
    .pbsc__tab:hover { opacity: 0.9; }

    .pbsc__selector-row {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    .pbsc__selector-label {
      font-size: 13px; font-weight: bold; color: #1c3f72;
      white-space: nowrap;
    }
    .pbsc__card-select {
      border: 1px solid #aaa; border-bottom: 2px solid #1c3f72;
      padding: 4px 8px; font-size: 12px;
      font-family: Arial, sans-serif; background: #fff;
      min-width: 220px;
    }
    .pbsc__card-img {
      width: 60px; height: 40px; object-fit: contain; border: 1px solid #ddd;
    }

    .pbsc__error {
      display: flex; align-items: center; gap: 8px;
      background: #fff0f0; border: 1px solid #f5c6cb;
      margin: 12px 16px; padding: 8px 12px;
      font-size: 12px; color: #721c24;
      border-radius: 2px;
    }
    .pbsc__error-icon { color: #c00; font-size: 14px; }

    .pbsc__balance { padding: 16px; }
    .pbsc__balance-panel {
      border: 1px solid #b0cce0; background: #f0f8ff;
      display: inline-block; min-width: 320px;
    }
    .pbsc__balance-header {
      background: #b8d4ef; color: #1a3c5e;
      font-weight: bold; font-size: 12px;
      padding: 6px 12px; border-bottom: 1px solid #a0bcd8;
    }
    .pbsc__balance-body { padding: 10px 12px; }
    .pbsc__balance-row {
      display: flex; gap: 16px; margin-bottom: 6px;
      font-size: 12px;
    }
    .pbsc__balance-label {
      color: #555; font-weight: bold; min-width: 130px;
    }
    .pbsc__balance-value { color: #1a1a1a; }
    .pbsc__balance-value--pts {
      color: #006fcf; font-weight: bold; font-size: 14px;
    }
  `],
})
export class AmexPointsBalanceSummaryCardComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `points-balance-summary-card-${++AmexPointsBalanceSummaryCardComponent._idCounter}`;


  @Input() cards: { cardNumber: string }[] = [];
  @Input() selectedCardNumber = '';
  @Input() balance: number | null = null;
  @Input() aedEquivalent = 0;
  @Input() errorMessage   = '';
  @Input() activeTab: 'eligible' | 'history' = 'eligible';

  @Output() cardSelected = new EventEmitter<string>();
}
