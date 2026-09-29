import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexCardBadgeComponent,
  AmexCardType,
} from './currency-logic/card-badge';
import {
  AmexStatusBadgeComponent,
  AmexStatus,
} from './currency-logic/status-badge';
import { AmexAccountNumberComponent } from './currency-logic/account-number';

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
  imports: [
    CommonModule,
    AmexCardBadgeComponent,
    AmexStatusBadgeComponent,
    AmexAccountNumberComponent,
  ],
  template: `
    <div
      class="amex-card-tile cardRounded"
      [class.cardActionable]="selectable"
      (click)="onSelect()"
    >
      <div class="amex-card-tile__header">
        <amex-card-badge [type]="card.cardType"></amex-card-badge>
        <amex-status-badge [status]="card.status"></amex-status-badge>
      </div>

      <div class="amex-card-tile__number">
        <amex-account-number
          [number]="card.cardNumber"
          [masked]="masked"
        ></amex-account-number>
      </div>

      <div class="amex-card-tile__footer">
        <div class="label1 dlsWhite amex-card-tile__name">{{ card.cardholderName }}</div>
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
  styles: [
    // Checked all of DLS's card-family CSS (card.css, dlsCard.css,
    // dlsCardField.css, dlsCardTilt.css) before writing this.
    //
    // dlsCardField/dlsCardTilt are a DIFFERENT feature entirely — an
    // interactive 3D-tilt, flip-to-reveal-CVV card-art preview that requires
    // an actual card-art image as a background. Wrong match for this
    // component (a compact dashboard/list info tile), so not used here
    // despite the similar naming.
    //
    // dlsCard/dlsCardXl etc. give a real credit-card aspect ratio, but at a
    // FIXED height designed for simple card-art thumbnails — this tile has
    // a header, number, name, expiry, and optional metadata rows, so a fixed
    // height risks clipping content. Kept the flexible custom sizing rather
    // than risk breaking existing layouts; `.cardRounded` still supplies a
    // real DLS border/radius on top of it.
    //
    // `.cardActionable` (DLS's real hover-lift, respects
    // prefers-reduced-motion for free) replaces the custom hover
    // transform/shadow for the selectable state.
    //
    // Cardholder name now uses DLS's real `.label1` (bold, uppercase, correct
    // letter-spacing/size) combined with DLS's real `.dlsWhite` color
    // utility, instead of hand-picked font-size/weight/letter-spacing/color —
    // dlsWhite exists specifically for text on dark surfaces like this one.
    //
    // The dark gradient card face itself, and the two very small (9-10px)
    // expiry-label/meta text sizes, have no DLS equivalent at all — DLS's
    // smallest type scale (.label1) is 13px, and there's no "branded card
    // face background" class since that's meant to be an actual card-art
    // image in DLS's real card components. Kept as custom, no invented
    // colors beyond what was already a deliberate brand choice.
    `
      .amex-card-tile {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        padding: 16px 20px;
        min-width: 280px;
        max-width: 320px;
        color: #fff;
        position: relative;
      }
      .amex-card-tile__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .amex-card-tile__number {
        margin-bottom: 20px;
      }
      .amex-card-tile__footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .amex-card-tile__expiry {
        text-align: right;
      }
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
        color: rgba(255, 255, 255, 0.4);
      }
    `,
  ],
})
export class AmexCardTileComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() readonly id =
    `card-tile-${++AmexCardTileComponent._idCounter}`;

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