import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexCardBadgeComponent, AmexCardType } from '../atoms/card-badge';
import { AmexStatusBadgeComponent, AmexStatus } from '../atoms/status-badge';
import { AmexAccountNumberComponent } from '../atoms/account-number';

export interface AmexCardInfo {
  cardNumber: string;
  cardholderName: string;
  cardType: AmexCardType;
  expiryDate?: string;
  status: AmexStatus;
  uci?: string;
  clientCode?: string;
}

@Component({
  selector: 'amex-card-tile',
  standalone: true,
  imports: [CommonModule, AmexCardBadgeComponent, AmexStatusBadgeComponent, AmexAccountNumberComponent],
  template: `
    <div class="amex-card-tile" [class.amex-card-tile--selectable]="selectable" (click)="onSelect()">
      <div class="amex-card-tile__header">
        <amex-card-badge [type]="card.cardType"></amex-card-badge>
        <amex-status-badge [status]="card.status"></amex-status-badge>
      </div>

      <div class="amex-card-tile__number">
        <amex-account-number [number]="card.cardNumber" [masked]="masked"></amex-account-number>
      </div>

      <div class="amex-card-tile__footer">
        <div class="amex-card-tile__name">{{ card.cardholderName }}</div>
        <div *ngIf="card.expiryDate" class="amex-card-tile__expiry">
          <span class="amex-card-tile__expiry-label">VALID THRU</span>
          {{ card.expiryDate }}
        </div>
      </div>

      <div *ngIf="card.clientCode || card.uci" class="amex-card-tile__meta">
        <span *ngIf="card.clientCode" class="amex-card-tile__meta-item">
          Client: {{ card.clientCode }}
        </span>
        <span *ngIf="card.uci" class="amex-card-tile__meta-item">
          UCI: {{ card.uci }}
        </span>
      </div>

      <div *ngIf="selectable" class="amex-card-tile__select-hint">
        Click to select
      </div>
    </div>
  `,
  styles: [`
    .amex-card-tile {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border-radius: 12px;
      padding: 16px 20px;
      min-width: 280px;
      max-width: 320px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      color: #fff;
      position: relative;
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .amex-card-tile--selectable {
      cursor: pointer;
    }
    .amex-card-tile--selectable:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    }
    .amex-card-tile__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .amex-card-tile__number { margin-bottom: 20px; }
    .amex-card-tile__footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .amex-card-tile__name {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .amex-card-tile__expiry { text-align: right; }
    .amex-card-tile__expiry-label {
      display: block;
      font-size: 9px;
      color: #aaa;
      letter-spacing: 0.08em;
    }
    .amex-card-tile__meta {
      margin-top: 10px;
      display: flex;
      gap: 12px;
    }
    .amex-card-tile__meta-item {
      font-size: 10px;
      color: #aaa;
      font-family: 'Courier New', monospace;
    }
    .amex-card-tile__select-hint {
      position: absolute;
      bottom: 8px;
      right: 14px;
      font-size: 10px;
      color: rgba(255,255,255,0.4);
    }
  `],
})
export class AmexCardTileComponent {
  @Input() card!: AmexCardInfo;
  @Input() masked = true;
  @Input() selectable = false;
  @Output() selected = new EventEmitter<AmexCardInfo>();

  onSelect(): void {
    if (this.selectable) {
      this.selected.emit(this.card);
    }
  }
}
