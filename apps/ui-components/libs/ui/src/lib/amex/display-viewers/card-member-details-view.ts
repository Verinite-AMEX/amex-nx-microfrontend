import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardMemberDetails {
  name: string;
  userId: string;
  cardNumber: string;
  status: string;
  accountType: string;
  hasOffers?: boolean;
  hasBenefits?: boolean;
}

/**
 * CardMemberDetailsView
 * Read-only panel shown after searching by User ID or card number.
 * Source: Online Account Services, Supplementary Access, Offers & Benefits
 * Style: ONLS portal — light blue bordered panel, two-col label/value table.
 */
@Component({
  selector: 'amex-card-member-details-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="cmdv" *ngIf="details" role="region" aria-label="Card member details">
      <div class="cmdv__panel">
        <dl class="cmdv__details-list">
          <div class="cmdv__detail-row">
            <dt class="cmdv__label" id="name-label">Name</dt>
            <dd class="cmdv__value" aria-labelledby="name-label">{{ details.name }}</dd>
          </div>
          <div class="cmdv__detail-row">
            <dt class="cmdv__label" id="userid-label">User ID</dt>
            <dd class="cmdv__value" aria-labelledby="userid-label">{{ details.userId }}</dd>
          </div>
          <div class="cmdv__detail-row">
            <dt class="cmdv__label" id="card-label">Card No</dt>
            <dd class="cmdv__value" aria-labelledby="card-label">{{ details.cardNumber }}</dd>
          </div>
          <div class="cmdv__detail-row">
            <dt class="cmdv__label" id="status-label">Status</dt>
            <dd class="cmdv__value" aria-labelledby="status-label">
              <span 
                [class.cmdv__status--active]="details.status === 'Active'"
                [class.cmdv__status--inactive]="details.status !== 'Active'"
                [attr.aria-label]="'Account status: ' + details.status"
                role="status"
              >
                {{ details.status }}
              </span>
            </dd>
          </div>
          <div class="cmdv__detail-row">
            <dt class="cmdv__label" id="account-label">Account Type</dt>
            <dd class="cmdv__value" aria-labelledby="account-label">{{ details.accountType }}</dd>
          </div>
          <div class="cmdv__detail-row" *ngIf="details.hasOffers">
            <dt class="cmdv__label" id="offers-label">Offers</dt>
            <dd class="cmdv__value" aria-labelledby="offers-label">
              <button 
                class="cmdv__link" 
                (click)="offersClick.emit()"
                (keydown.enter)="offersClick.emit()"
                (keydown.space)="onSpaceKey($event, offersClick)"
                type="button"
                aria-label="View available offers"
                #offersButton
              >View Offers</button>
            </dd>
          </div>
          <div class="cmdv__detail-row" *ngIf="details.hasBenefits">
            <dt class="cmdv__label" id="benefits-label">Benefits</dt>
            <dd class="cmdv__value" aria-labelledby="benefits-label">
              <button 
                class="cmdv__link" 
                (click)="benefitsClick.emit()"
                (keydown.enter)="benefitsClick.emit()"
                (keydown.space)="onSpaceKey($event, benefitsClick)"
                type="button"
                aria-label="View available benefits"
                #benefitsButton
              >View Benefits</button>
            </dd>
          </div>
        </dl>
      </div>
    </section>
    <div *ngIf="!details" class="cmdv__empty" role="status" aria-live="polite">
      Search for a card or user to view details.
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .cmdv__panel {
      border: 1px solid #b0cce0;
      background: #f0f8ff;
      display: inline-block;
      min-width: 340px;
    }
    .cmdv__details-list {
      margin: 0;
      padding: 0;
    }
    .cmdv__detail-row {
      display: flex;
      border-bottom: 1px solid #d0e4f0;
    }
    .cmdv__label {
      padding: 7px 14px; font-size: 13px; color: #333;
      font-weight: bold; width: 130px; background: #e8f4fb;
      flex-shrink: 0;
    }
    .cmdv__value {
      padding: 7px 14px; font-size: 13px; color: #1a1a1a;
      flex: 1;
    }
    .cmdv__status--active   { color: #1b5e20; font-weight: bold; }
    .cmdv__status--inactive { color: #b71c1c; font-weight: bold; }
    .cmdv__link { 
      color: #006fcf; 
      cursor: pointer; 
      background: none;
      border: none;
      padding: 0;
      font-size: 13px;
      font-family: inherit;
      text-decoration: underline;
    }
    .cmdv__link:hover, .cmdv__link:focus { 
      text-decoration: underline; 
      color: #003087;
    }
    .cmdv__link:focus {
      outline: 2px solid #006fcf;
      outline-offset: 1px;
    }
    .cmdv__empty { font-size: 13px; color: #666; padding: 12px; text-align: center; }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .cmdv__panel {
        border: 2px solid currentColor;
      }
      .cmdv__label {
        background: transparent;
        border-right: 2px solid currentColor;
      }
    }
  `],
})
export class AmexCardMemberDetailsViewComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `card-member-details-view-${++AmexCardMemberDetailsViewComponent._idCounter}`;


  @Input() details: CardMemberDetails | null = null;
  @Output() offersClick   = new EventEmitter<void>();
  @Output() benefitsClick = new EventEmitter<void>();

  @ViewChild('offersButton') offersButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('benefitsButton') benefitsButton!: ElementRef<HTMLButtonElement>;

  onSpaceKey(event: KeyboardEvent, emitter: EventEmitter<void>): void {
    if (event.key === ' ') {
      event.preventDefault();
      emitter.emit();
    }
  }

  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {
    // Handle Escape key for focus management
    if (event.key === 'Escape') {
      // Reset focus to the first interactive element
      if (this.offersButton) {
        this.offersButton.nativeElement.focus();
      } else if (this.benefitsButton) {
        this.benefitsButton.nativeElement.focus();
      }
    }
  }
}
