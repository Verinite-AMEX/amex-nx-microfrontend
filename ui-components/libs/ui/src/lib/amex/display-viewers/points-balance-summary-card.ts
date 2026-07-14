import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button';
import { LabelComponent } from '../../atoms/label';
import { SelectComponent } from '../../atoms/select';
import { ImageComponent } from '../../atoms/image';

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
  imports: [CommonModule, FormsModule, ButtonComponent, LabelComponent, SelectComponent, ImageComponent],
  template: `
    <div class="pbsc">

      <!-- Section header -->
      <div class="pbsc__header">SELECT &amp; PAY WITH POINTS</div>

      <!-- Sub-tabs -->
      <div class="pbsc__tabs">
        <ui-button class="pbsc__tab"
                [class.pbsc__tab--active]="activeTab === 'eligible'"
                variant="secondary" label="Eligible Transactions" [fullWidth]="true"
                (click)="activeTab = 'eligible'"></ui-button>
        <ui-button class="pbsc__tab pbsc__tab--grey"
                [class.pbsc__tab--active]="activeTab === 'history'"
                variant="secondary" label="History" [fullWidth]="true"
                (click)="activeTab = 'history'"></ui-button>
      </div>

      <!-- Card selector -->
      <div class="pbsc__selector-row">
        <ui-label class="pbsc__selector-label" [forId]="id + '-select-a-card'">Select a Card</ui-label>
        <ui-select [id]="id + '-select-a-card'" class="pbsc__card-select" [options]="cardOptions"
                placeholder="-- Select --" [(ngModel)]="selectedCardNumber"
                (ngModelChange)="cardSelected.emit(selectedCardNumber)"></ui-select>
            <ui-image *ngIf="selectedCardNumber" class="pbsc__card-img"
            src="https://via.placeholder.com/60x40/006fcf/ffffff?text=AMEX"
            alt="Card" objectFit="contain"></ui-image>
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
      flex: 1;
      --btn-bg: #2a7fa8;
      --btn-color: #fff;
      --btn-radius: 0;
      --btn-padding: 8px 0;
      --btn-font-size: 13px;
      --btn-border: none;
      --btn-border-bottom-color: inherit;
      --btn-width: 100%;
      --btn-justify-content: center;
      border-right: 1px solid #1c6a8a;
    }
    .pbsc__tab--grey { --btn-bg: #888; border-right: none; }
    .pbsc__tab--active { --btn-bg: #1c5f84; }
    .pbsc__tab:hover { opacity: 0.9; }

    .pbsc__selector-row {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    .pbsc__selector-label {
      --label-font-size: 13px;
      --label-font-weight: bold;
      --label-color: #1c3f72;
      white-space: nowrap;
    }
    .pbsc__card-select {
      --select-border: 1px solid #aaa;
      --select-padding: 4px 24px 4px 8px;
      --select-font-size: 12px;
      border-bottom: 2px solid #1c3f72;
      min-width: 220px;
    }
    .pbsc__card-img {
      width: 60px; height: 40px; border: 1px solid #ddd; flex-shrink: 0;
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
  @HostBinding('attr.id') @Input() id = `points-balance-summary-card-${++AmexPointsBalanceSummaryCardComponent._idCounter}`;

  @Input() cards: { cardNumber: string }[] = [];
  @Input() selectedCardNumber = '';
  @Input() balance: number | null = null;
  @Input() aedEquivalent = 0;
  @Input() errorMessage   = '';
  @Input() activeTab: 'eligible' | 'history' = 'eligible';

  @Output() cardSelected = new EventEmitter<string>();

  get cardOptions() {
    return this.cards.map(c => ({ value: c.cardNumber, label: c.cardNumber }));
  }
}