import { Component, Input, Output, EventEmitter } from '@angular/core';
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
 * Read-only panel shown after searching by user ID or card number.
 * Source: Online Account Services, Supplementary Access, Offers & Benefits
 * Style: ONLS portal — light blue bordered panel
 */
@Component({
  selector: 'amex-card-member-details-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cmdv" *ngIf="details">
      <div class="cmdv__panel">
        <table class="cmdv__table">
          <tr>
            <td class="cmdv__label">Name</td>
            <td class="cmdv__value">{{ details.name }}</td>
          </tr>
          <tr>
            <td class="cmdv__label">User ID</td>
            <td class="cmdv__value">{{ details.userId }}</td>
          </tr>
          <tr>
            <td class="cmdv__label">Card No</td>
            <td class="cmdv__value">{{ details.cardNumber }}</td>
          </tr>
          <tr>
            <td class="cmdv__label">Status</td>
            <td class="cmdv__value">
              <span [class.cmdv__status--active]="details.status === 'Active'"
                    [class.cmdv__status--inactive]="details.status !== 'Active'">
                {{ details.status }}
              </span>
            </td>
          </tr>
          <tr>
            <td class="cmdv__label">Account Type</td>
            <td class="cmdv__value">{{ details.accountType }}</td>
          </tr>
          <tr *ngIf="details.hasOffers">
            <td class="cmdv__label">Offers</td>
            <td class="cmdv__value">
              <span class="cmdv__link" (click)="offersClick.emit()">View Offers</span>
            </td>
          </tr>
          <tr *ngIf="details.hasBenefits">
            <td class="cmdv__label">Benefits</td>
            <td class="cmdv__value">
              <span class="cmdv__link" (click)="benefitsClick.emit()">View Benefits</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div *ngIf="!details" class="cmdv__empty">
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
    .cmdv__table { border-collapse: collapse; width: 100%; }
    .cmdv__label {
      padding: 7px 14px; font-size: 13px; color: #555;
      font-weight: bold; border-bottom: 1px solid #d0e4f0;
      width: 130px; background: #e8f4fb;
    }
    .cmdv__value {
      padding: 7px 14px; font-size: 13px; color: #1a1a1a;
      border-bottom: 1px solid #d0e4f0;
    }
    .cmdv__status--active   { color: #2e7d32; font-weight: bold; }
    .cmdv__status--inactive { color: #c62828; font-weight: bold; }
    .cmdv__link { color: #006fcf; cursor: pointer; }
    .cmdv__link:hover { text-decoration: underline; }
    .cmdv__empty { font-size: 13px; color: #888; padding: 12px 0; }
  `],
})
export class AmexCardMemberDetailsViewComponent {
  @Input() details: CardMemberDetails | null = null;
  @Output() offersClick   = new EventEmitter<void>();
  @Output() benefitsClick = new EventEmitter<void>();
}
