import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../atoms/label';
import { InputComponent } from '../../atoms/input';
import { ButtonComponent } from '../../atoms/button';
import { RadioComponent } from '../../atoms/radio';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';

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
  imports: [
    CommonModule, FormsModule, LabelComponent, InputComponent, ButtonComponent, RadioComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent, TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="cls">
      <!-- Client ID search bar -->
      <div class="cls__search">
        <ui-label class="cls__label" [forId]="id + '-field'">{{ searchLabel }}</ui-label>
        <div class="cls__search-row">
          <ui-input [id]="id + '-field'" class="cls__input" [(ngModel)]="clientId" [placeholder]="placeholder"></ui-input>
          <ui-button class="cls__submit-btn" [label]="submitLabel" (click)="search.emit(clientId)"></ui-button>
        </div>
      </div>

      <!-- Member info panel (shown after search) -->
      <div *ngIf="memberName || memberCardNumber" class="cls__member-panel">
        <ui-table class="cls__info-table" [bordered]="false">
          <ui-table-body>
            <ui-table-row [hoverable]="false">
              <ui-table-cell class="cls__info-label">Name</ui-table-cell>
              <ui-table-cell class="cls__info-value">{{ memberName }}</ui-table-cell>
            </ui-table-row>
            <ui-table-row [hoverable]="false">
              <ui-table-cell class="cls__info-label">Card Number</ui-table-cell>
              <ui-table-cell class="cls__info-value">{{ memberCardNumber }}</ui-table-cell>
            </ui-table-row>
          </ui-table-body>
        </ui-table>
      </div>

      <!-- Card rows table -->
      <ui-table *ngIf="rows.length" class="cls__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell class="cls__th--radio"></ui-table-header-cell>
            <ui-table-header-cell>Card Number</ui-table-header-cell>
            <ui-table-header-cell>Card Type</ui-table-header-cell>
            <ui-table-header-cell>Status</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows"
            [hoverable]="true"
            [class.cls__row--selected]="selectedCard?.cardNumber === row.cardNumber"
            (click)="selectRow(row)">
            <ui-table-cell class="cls__td--radio">
              <ui-radio name="cardSelect"
                [value]="row.cardNumber"
                [checked]="selectedCard?.cardNumber === row.cardNumber"
                (checkedChange)="selectRow(row)">
              </ui-radio>
            </ui-table-cell>
            <ui-table-cell>{{ row.cardNumber }}</ui-table-cell>
            <ui-table-cell>{{ row.cardType }}</ui-table-cell>
            <ui-table-cell>
              <span class="cls__status"
                [class.cls__status--active]="row.status.toLowerCase()==='active'"
                [class.cls__status--inactive]="row.status.toLowerCase()==='inactive'">
                {{ row.status }}
              </span>
            </ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>

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
      --input-border: 1px solid #bbb;
      --input-radius: 0;
      width: 300px;
    }
    .cls__input ::ng-deep .input { border-bottom: 2px solid #1a3a6b; }
    .cls__submit-btn {
      --btn-bg: #1a3a6b; --btn-color: #fff; --btn-radius: 0;
      padding: 7px 32px;
    }
    .cls__submit-btn:hover { --btn-bg: #16304f; }

    /* Member info panel */
    .cls__member-panel {
      border: 1px solid #ddd; margin: 8px 0 14px;
      display: inline-block; min-width: 360px;
    }
    .cls__info-label {
      color: #555; width: 140px;
    }
    .cls__info-value { color: #1a1a1a; }

    /* Card table */
    .cls__table { margin-top: 8px; }
    .cls__th--radio { width: 36px; }
    .cls__row--selected { background: #d8eaf8; }
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
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `card-list-selector-${++AmexCardListSelectorComponent._idCounter}`;

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