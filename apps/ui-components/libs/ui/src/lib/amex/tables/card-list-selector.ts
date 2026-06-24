import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AmexCardRow {
  cardNumber: string;   /* masked e.g. 3744XXXXXX9008 */
  cardType: string;
  status: string;
}

/**
 * CardListSelector
 * Table of cards linked to a client ID. Radio per row selects the card.
 * Detail panel appears below on selection.
 * Source: Centurion LCY (image5), Wearables
 * Style: ONLS portal — white bg, bordered table, blue Submit button
 */
@Component({
  selector: 'amex-card-list-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cls">
      <!-- Client ID search bar -->
      <div class="cls__search">
        <label class="cls__label">{{ searchLabel }}</label>
        <div class="cls__search-row">
          <input class="cls__input" [(ngModel)]="clientId" [placeholder]="placeholder" />
          <button class="cls__submit-btn" (click)="search.emit(clientId)">{{ submitLabel }}</button>
        </div>
      </div>

      <!-- Member info panel (shown after search) -->
      <div *ngIf="memberName || memberCardNumber" class="cls__member-panel">
        <table class="cls__info-table">
          <tr>
            <td class="cls__info-label">Name</td>
            <td class="cls__info-value">{{ memberName }}</td>
          </tr>
          <tr>
            <td class="cls__info-label">Card Number</td>
            <td class="cls__info-value">{{ memberCardNumber }}</td>
          </tr>
        </table>
      </div>

      <!-- Card rows table -->
      <table *ngIf="rows.length" class="cls__table">
        <thead>
          <tr class="cls__head-row">
            <th class="cls__th cls__th--radio"></th>
            <th class="cls__th">Card Number</th>
            <th class="cls__th">Card Type</th>
            <th class="cls__th">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows"
            class="cls__row"
            [class.cls__row--selected]="selectedCard?.cardNumber === row.cardNumber"
            (click)="selectRow(row)">
            <td class="cls__td cls__td--radio">
              <input type="radio" name="cardSelect"
                [checked]="selectedCard?.cardNumber === row.cardNumber"
                (change)="selectRow(row)" />
            </td>
            <td class="cls__td">{{ row.cardNumber }}</td>
            <td class="cls__td">{{ row.cardType }}</td>
            <td class="cls__td">
              <span class="cls__status"
                [class.cls__status--active]="row.status.toLowerCase()==='active'"
                [class.cls__status--inactive]="row.status.toLowerCase()==='inactive'">
                {{ row.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty state -->
      <div *ngIf="rows.length === 0 && searched" class="cls__empty">
        No cards found for this Client ID.
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .cls { background: #fff; }

    /* Search bar */
    .cls__search { padding: 16px 0 12px; }
    .cls__label { display: block; font-size: 14px; color: #1a3a6b; font-weight: bold; margin-bottom: 10px; }
    .cls__search-row { display: flex; gap: 12px; align-items: center; }
    .cls__input {
      border: 1px solid #bbb; border-bottom: 2px solid #1a3a6b;
      padding: 6px 12px; font-size: 14px; font-family: Arial, sans-serif;
      width: 300px; outline: none;
    }
    .cls__input:focus { border-bottom-color: #006fcf; }
    .cls__submit-btn {
      background: #1a3a6b; color: #fff; border: none;
      padding: 7px 32px; font-size: 14px; font-weight: bold;
      cursor: pointer; font-family: Arial, sans-serif;
    }
    .cls__submit-btn:hover { background: #16304f; }

    /* Member info panel */
    .cls__member-panel {
      border: 1px solid #ddd; margin: 8px 0 14px;
      display: inline-block; min-width: 360px;
    }
    .cls__info-table { border-collapse: collapse; width: 100%; }
    .cls__info-label {
      padding: 8px 16px; font-size: 13px; color: #555;
      border-bottom: 1px solid #f0f0f0; width: 140px;
    }
    .cls__info-value {
      padding: 8px 16px; font-size: 13px; color: #1a1a1a;
      border-bottom: 1px solid #f0f0f0;
    }

    /* Card table */
    .cls__table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px; }
    .cls__head-row { background: #f0f0f0; }
    .cls__th {
      padding: 7px 12px; text-align: left; font-size: 12px;
      font-weight: bold; color: #333; border: 1px solid #ccc;
    }
    .cls__th--radio { width: 36px; }
    .cls__row { background: #fff; cursor: pointer; }
    .cls__row:hover { background: #eef6ff; }
    .cls__row--selected { background: #d8eaf8; }
    .cls__td { padding: 7px 12px; border: 1px solid #ddd; font-size: 13px; color: #333; }
    .cls__td--radio { text-align: center; }
    .cls__status--active   { color: #333; }
    .cls__status--inactive { color: #c62828; }

    .cls__empty {
      text-align: center; padding: 24px; font-size: 13px;
      color: #888; border: 1px solid #eee; margin-top: 8px;
    }
  `],
})
export class AmexCardListSelectorComponent {
  @Input() searchLabel = 'Client ID';
  @Input() placeholder = 'eg. 12345';
  @Input() submitLabel = 'Submit';
  @Input() rows: AmexCardRow[] = [];
  @Input() memberName = '';
  @Input() memberCardNumber = '';

  clientId = '';
  selectedCard: AmexCardRow | null = null;
  searched = false;

  @Output() search     = new EventEmitter<string>();
  @Output() cardSelect = new EventEmitter<AmexCardRow>();

  selectRow(row: AmexCardRow) {
    this.selectedCard = row;
    this.cardSelect.emit(row);
  }
}
