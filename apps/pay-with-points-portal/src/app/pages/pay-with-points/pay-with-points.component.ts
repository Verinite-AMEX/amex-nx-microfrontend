import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';

import {
  AmexEligibleTransactionsTableComponent,
  EligibleTransaction,
  PointsHistoryRow,
} from '@ui-components/ui';
import { AmexCardRow } from '@ui-components/ui';

@Component({
  selector:   'app-pay-with-points',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexEligibleTransactionsTableComponent,
  ],
  template: `
    <ng-container *ngIf="view === 'form'">
      <div class="pwp-page-header">Pay with Points - Agent Portal</div>
      <div class="pwp-form-section">
        <div class="pwp-form-row">
          <label class="pwp-label">
            Enter Client Code <span class="pwp-required">*</span>
          </label>
          <input
            class="pwp-input"
            type="text"
            [(ngModel)]="clientCode"
            placeholder="e.g. 20473521"
            (keyup.enter)="onSubmit()"/>
          <button class="pwp-submit-btn" (click)="onSubmit()">SUBMIT</button>
        </div>
        <div *ngIf="formError" class="pwp-form-error">{{ formError }}</div>
      </div>
      <div class="pwp-footer">Copyright &copy; 2009 American Express Company</div>
    </ng-container>

    <ng-container *ngIf="view === 'select'">
      <div class="pwp-body">
        <amex-eligible-transactions-table
          pageTitle="SELECT & PAY WITH POINTS"
          [cards]="cardOptions"
          [eligibleRows]="eligibleRows"
          [historyRows]="historyRows"
          [pointsBalance]="pointsBalance?.toLocaleString() ?? ''"
          [aedValue]="aedEquivalent.toFixed(2)"
          [totalCredit]="totalCredit"
          [totalPointsRedeemed]="totalPointsRedeemed"
          [errorMessage]="errorMessage"
          (cardChange)="onCardSelected($event)"
          (redeemClick)="onRedeemClick($event)">
        </amex-eligible-transactions-table>
      </div>
      <div class="pwp-footer">Copyright &copy; 2009 American Express Company</div>
    </ng-container>

  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; background: #fff; min-height: 100%; }

    .pwp-page-header {
      background: #2d5f9e; color: #fff;
      font-size: 13px; font-weight: bold; padding: 8px 12px;
    }

    .pwp-form-section  { padding: 16px 12px; }
    .pwp-form-row      { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .pwp-label         { font-size: 12px; color: #333; white-space: nowrap; }
    .pwp-required      { color: red; margin-left: 1px; }
    .pwp-input {
      border: 1px solid #aaa; padding: 4px 6px; font-size: 12px;
      width: 200px; color: #333; background: #fff; outline: none; height: 24px;
    }
    .pwp-input:focus   { border-color: #006fcf; }
    .pwp-submit-btn {
      background: #1c3f72; color: #fff; border: none;
      padding: 4px 16px; font-size: 12px; font-weight: bold;
      cursor: pointer; height: 26px;
    }
    .pwp-submit-btn:hover { background: #003087; }
    .pwp-form-error    { color: red; font-size: 12px; margin-top: 6px; }

    .pwp-bureau-link   { color: #1a3a6b; cursor: pointer; font-weight: bold; }
    .pwp-bureau-link:hover { text-decoration: underline; }
    .pwp-body          { padding: 12px; display: flex; flex-direction: column; gap: 12px; }

    .pwp-footer {
      font-size: 11px; color: #888; text-align: right;
      padding: 6px 12px; border-top: 1px solid #e0e0e0; margin-top: 16px;
    }

    :host ::ng-deep .ett__tab:not(.ett__tab--active) {
      background: #888 !important; color: #fff !important;
    }
  `],
})
export class PayWithPointsComponent implements OnInit {

  view: 'form' | 'select' = 'form';
  clientCode  = '';
  formError   = '';

  selectedCardNumber = '';
  pointsBalance: number | null = null;
  aedEquivalent      = 0;
  errorMessage       = '';

  eligibleRows: EligibleTransaction[] = [];
  historyRows:  PointsHistoryRow[]    = [];
  totalCredit         = 'AED 0.00';
  totalPointsRedeemed = '0';
  cardRows:     AmexCardRow[]         = [];

  private mockDb: Record<string, {
    cards:        AmexCardRow[];
    transactions: EligibleTransaction[];
    history:      PointsHistoryRow[];
  }> = {
    '20473521': {
      cards: [
        { cardNumber: '3744XXXXXX9008', cardType: 'Gold',     status: 'Active'   },
        { cardNumber: '3744XXXXXX7712', cardType: 'Platinum', status: 'Active'   },
        { cardNumber: '3744XXXXXX3301', cardType: 'Green',    status: 'Inactive' },
      ],
      transactions: [
        { id: '1', transactionDate: '01 Apr 2025', description: 'NOON.COM DUBAI',   amount: 'AED 250.00',   pointsValue: '250',  selected: false },
        { id: '2', transactionDate: '05 Apr 2025', description: 'CARREFOUR UAE',    amount: 'AED 130.00',   pointsValue: '130',  selected: false },
        { id: '3', transactionDate: '10 Apr 2025', description: 'EMIRATES AIRLINE', amount: 'AED 1,200.00', pointsValue: '1200', selected: false },
      ],
      history: [
        { transactionDate: '15 Jan 2025', description: 'AMAZON AE',      pointsRedeemed: '500', amountOffset: 'AED 50.00', redemptionDate: '16 Jan 2025' },
        { transactionDate: '20 Feb 2025', description: 'SPINNEYS DUBAI', pointsRedeemed: '300', amountOffset: 'AED 30.00', redemptionDate: '21 Feb 2025' },
      ],
    },
  };

  ngOnInit(): void {
    
  }

  get cardOptions(): { value: string; label: string }[] {
    return this.cardRows.map(c => ({ value: c.cardNumber, label: c.cardNumber }));
  }

  onSubmit(): void {
    this.formError = '';
    const code     = this.clientCode.trim();
    if (!code) { this.formError = 'Please enter a Client Code.'; return; }

    const data    = this.mockDb[code];
    this.cardRows = data?.cards ?? [];
    this.view     = 'select';
    this.resetCard();

    if (!this.cardRows.length) {
      this.errorMessage = `ERROR: Sorry, selected card is not eligible for the Select and Pay With Points benefit".`;
    }
  }

  goToForm(): void {
    this.view       = 'form';
    this.clientCode = '';
    this.formError  = '';
    this.cardRows   = [];
    this.resetCard();
  }

  onCardSelected(cardNumber: string): void {
    this.resetCard();
    this.selectedCardNumber = cardNumber;
    if (!cardNumber) return;

    const card = this.cardRows.find(c => c.cardNumber === cardNumber);
    if (!card) return;

    if (card.status.toLowerCase() !== 'active') {
      this.errorMessage = 'Sorry, selected card is not eligible for the Select and Pay with Points benefit.';
      return;
    }

    const data = this.mockDb[this.clientCode.trim()] ?? Object.values(this.mockDb)[0];
    if (data) {
      this.pointsBalance       = 85000;
      this.aedEquivalent       = 850;
      this.eligibleRows        = data.transactions.map(t => ({ ...t, selected: false }));
      this.historyRows         = data.history;
      this.totalCredit         = data.history.length ? 'AED 80.00' : 'AED 0.00';
      this.totalPointsRedeemed = data.history.length ? '800'       : '0';
    }
  }

  onRedeemClick(selected: EligibleTransaction[]): void {
    const pts = selected.reduce((s, t) => s + Number(t.pointsValue.replace(',', '')), 0);
    alert(`Redemption submitted for ${selected.length} transaction(s) — ${pts.toLocaleString()} points.`);
  }

  private resetCard(): void {
    this.selectedCardNumber  = '';
    this.pointsBalance       = null;
    this.aedEquivalent       = 0;
    this.errorMessage        = '';
    this.eligibleRows        = [];
    this.historyRows         = [];
    this.totalCredit         = 'AED 0.00';
    this.totalPointsRedeemed = '0';
  }
}