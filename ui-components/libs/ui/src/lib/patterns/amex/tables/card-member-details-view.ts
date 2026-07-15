import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

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
  imports: [CommonModule, ButtonComponent, TableComponent, TableBodyComponent, TableRowComponent, TableCellComponent],
  template: `
    <div class="cmdv" *ngIf="details">
      <div class="cmdv__panel">
        <ui-table class="cmdv__table" [bordered]="false">
          <ui-table-body>
            <ui-table-row [hoverable]="false">
              <ui-table-cell class="cmdv__label">Name</ui-table-cell>
              <ui-table-cell class="cmdv__value">{{ details.name }}</ui-table-cell>
            </ui-table-row>
            <ui-table-row [hoverable]="false">
              <ui-table-cell class="cmdv__label">User ID</ui-table-cell>
              <ui-table-cell class="cmdv__value">{{ details.userId }}</ui-table-cell>
            </ui-table-row>
            <ui-table-row [hoverable]="false">
              <ui-table-cell class="cmdv__label">Card No</ui-table-cell>
              <ui-table-cell class="cmdv__value">{{ details.cardNumber }}</ui-table-cell>
            </ui-table-row>
            <ui-table-row [hoverable]="false">
              <ui-table-cell class="cmdv__label">Status</ui-table-cell>
              <ui-table-cell class="cmdv__value">
                <span [class.cmdv__status--active]="details.status === 'Active'"
                      [class.cmdv__status--inactive]="details.status !== 'Active'">
                  {{ details.status }}
                </span>
              </ui-table-cell>
            </ui-table-row>
            <ui-table-row [hoverable]="false">
              <ui-table-cell class="cmdv__label">Account Type</ui-table-cell>
              <ui-table-cell class="cmdv__value">{{ details.accountType }}</ui-table-cell>
            </ui-table-row>
            <ui-table-row *ngIf="details.hasOffers" [hoverable]="false">
              <ui-table-cell class="cmdv__label">Offers</ui-table-cell>
              <ui-table-cell class="cmdv__value">
                <ui-button class="cmdv__link" label="View Offers" variant="ghost" [size]="'sm'" (click)="offersClick.emit()"></ui-button>
              </ui-table-cell>
            </ui-table-row>
            <ui-table-row *ngIf="details.hasBenefits" [hoverable]="false">
              <ui-table-cell class="cmdv__label">Benefits</ui-table-cell>
              <ui-table-cell class="cmdv__value">
                <ui-button class="cmdv__link" label="View Benefits" variant="ghost" [size]="'sm'" (click)="benefitsClick.emit()"></ui-button>
              </ui-table-cell>
            </ui-table-row>
          </ui-table-body>
        </ui-table>
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
    .cmdv__link { --btn-bg: transparent; --btn-color: #006fcf; --btn-font-weight: normal; padding: 0; }
    .cmdv__link:hover { text-decoration: underline; }
    .cmdv__empty { font-size: 13px; color: #888; padding: 12px 0; }
  `],
})
export class AmexCardMemberDetailsViewComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `card-member-details-view-${++AmexCardMemberDetailsViewComponent._idCounter}`;

  @Input() details: CardMemberDetails | null = null;
  @Output() offersClick   = new EventEmitter<void>();
  @Output() benefitsClick = new EventEmitter<void>();
}