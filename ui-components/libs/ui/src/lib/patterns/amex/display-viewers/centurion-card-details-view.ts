import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';
import { ListComponent } from '../../../primitives/list';
import { ListItemComponent } from '../../../primitives/list-item';

export interface CenturionHighlight {
  text: string;
  highlighted?: string[];  // words to highlight in green
}

export interface CenturionCardDetails {
  clientId:             string;
  name:                 string;
  cardNumber:           string;
  cardType?:            string;   // 'USD' | 'LCY' | 'Centurion'
  status?:              string;
  issuanceState?:       string;
  premiumizationStatus?:string;
  highlights?:          CenturionHighlight[];
}

/**
 * CenturionCardDetailsView
 * Read-only panel: Client ID input + Submit → shows Name/Card Number table
 * with black Centurion card image + "Highlights" section bullet points.
 * Source: Centurion LCY
 * Style: Plain white, bordered detail table, black card image placeholder.
 */
@Component({
  selector: 'amex-centurion-card-details-view',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    FormFieldComponent, InputComponent, ButtonComponent,
    TableComponent, TableBodyComponent, TableRowComponent, TableCellComponent,
    ListComponent, ListItemComponent,
  ],
  template: `
    <div class="ccdv">
      <!-- Client ID input -->
      <div class="ccdv__search">
        <ui-form-field label="Client ID" [forId]="id + '-client-id'" layout="horizontal" labelWidth="70px">
          <ui-input [id]="id + '-client-id'" [(ngModel)]="clientIdInput" placeholder="Enter Client ID"></ui-input>
        </ui-form-field>
        <ui-button class="ccdv__submit-btn" variant="secondary" label="Submit" (click)="search.emit(clientIdInput)"></ui-button>
      </div>

      <!-- Horizontal rule -->
      <hr class="ccdv__hr" *ngIf="details" />

      <!-- Card details + image -->
      <div *ngIf="details" class="ccdv__details-row">
        <!-- Detail table -->
        <div class="ccdv__table-wrap">
          <ui-table class="ccdv__table">
            <ui-table-body>
              <ui-table-row [hoverable]="false" class="ccdv__row">
                <ui-table-cell width="150px" verticalAlign="top" class="ccdv__td-label">Name</ui-table-cell>
                <ui-table-cell verticalAlign="top" class="ccdv__td-value">{{ details.name }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row [hoverable]="false" class="ccdv__row">
                <ui-table-cell width="150px" verticalAlign="top" class="ccdv__td-label">Card Number</ui-table-cell>
                <ui-table-cell verticalAlign="top" class="ccdv__td-value">{{ details.cardNumber }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row [hoverable]="false" class="ccdv__row" *ngIf="details.cardType">
                <ui-table-cell width="150px" verticalAlign="top" class="ccdv__td-label">Card Type</ui-table-cell>
                <ui-table-cell verticalAlign="top" class="ccdv__td-value">{{ details.cardType }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row [hoverable]="false" class="ccdv__row" *ngIf="details.status">
                <ui-table-cell width="150px" verticalAlign="top" class="ccdv__td-label">Status</ui-table-cell>
                <ui-table-cell verticalAlign="top" class="ccdv__td-value">
                  <span [class.ccdv__status--active]="details.status === 'Active'"
                        [class.ccdv__status--inactive]="details.status !== 'Active'">
                    {{ details.status }}
                  </span>
                </ui-table-cell>
              </ui-table-row>
              <ui-table-row [hoverable]="false" class="ccdv__row" *ngIf="details.issuanceState">
                <ui-table-cell width="150px" verticalAlign="top" class="ccdv__td-label">Issuance State</ui-table-cell>
                <ui-table-cell verticalAlign="top" class="ccdv__td-value">{{ details.issuanceState }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row [hoverable]="false" class="ccdv__row" *ngIf="details.premiumizationStatus">
                <ui-table-cell width="150px" verticalAlign="top" class="ccdv__td-label">Premiumization</ui-table-cell>
                <ui-table-cell verticalAlign="top" class="ccdv__td-value">{{ details.premiumizationStatus }}</ui-table-cell>
              </ui-table-row>
            </ui-table-body>
          </ui-table>
        </div>

        <!-- Black card image placeholder -->
        <div class="ccdv__card-img">
          <div class="ccdv__card-inner">
            <div class="ccdv__card-chip"></div>
            <div class="ccdv__card-logo">AMERICAN EXPRESS</div>
            <div class="ccdv__card-centurion">✦ CENTURION</div>
            <div class="ccdv__card-name">YOUR NAME</div>
          </div>
        </div>
      </div>

      <!-- Highlights -->
      <div *ngIf="details && details.highlights && details.highlights.length > 0" class="ccdv__highlights">
        <h3 class="ccdv__highlights-title">Highlights</h3>
        <ui-list class="ccdv__highlights-list">
          <ui-list-item *ngFor="let h of details.highlights" class="ccdv__highlight-item">
            <span [innerHTML]="h.text"></span>
          </ui-list-item>
        </ui-list>
      </div>

      <!-- Empty state -->
      <div *ngIf="!details" class="ccdv__empty">
        Enter a Client ID above and click Submit to view Centurion card details.
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      font-size: 13px;
      --input-border: 1px solid #ccc;
      --input-padding: 5px 10px;
    }

    .ccdv { padding: 16px; max-width: 900px; }

    /* Search */
    .ccdv__search {
      display: flex; align-items: flex-end; gap: 10px; margin-bottom: 12px;
    }
    .ccdv__submit-btn {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-color: #fff;
      --btn-border: 1px solid #005fba;
      --btn-padding: 5px 18px;
      --btn-font-size: 13px;
      --btn-bg-hover: linear-gradient(to bottom, #4a92cf, #0058a6);
    }

    .ccdv__hr { border: none; border-top: 1px solid #ddd; margin: 12px 0; }

    /* Details row */
    .ccdv__details-row {
      display: flex; gap: 24px; align-items: flex-start; margin-bottom: 20px;
    }

    /* Table */
    .ccdv__table-wrap { flex: 1; }
    .ccdv__table { --table-border-color: transparent; }
    .ccdv__row { --table-row-border-bottom: 1px solid #e0e0e0; }
    .ccdv__td-label { --table-cell-padding: 8px 14px; --table-cell-color: #006fcf; --table-cell-font-weight: normal; }
    .ccdv__td-value { --table-cell-padding: 8px 14px; --table-cell-color: #1a1a1a; }
    .ccdv__status--active   { color: #2e7d32; font-weight: bold; }
    .ccdv__status--inactive { color: #c62828; font-weight: bold; }

    /* Black card image */
    .ccdv__card-img { flex-shrink: 0; }
    .ccdv__card-inner {
      width: 160px; height: 100px; background: #1a1a1a; border-radius: 8px;
      padding: 10px 12px; position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .ccdv__card-chip {
      width: 24px; height: 18px; background: #c8a84b; border-radius: 2px;
      margin-bottom: 8px;
    }
    .ccdv__card-logo {
      font-size: 8px; color: #c8a84b; font-weight: bold; letter-spacing: 0.08em;
    }
    .ccdv__card-centurion {
      font-size: 8px; color: #c8a84b; margin-top: 2px; letter-spacing: 0.05em;
    }
    .ccdv__card-name {
      position: absolute; bottom: 8px; left: 12px;
      font-size: 8px; color: #fff; letter-spacing: 0.05em;
    }

    /* Highlights */
    .ccdv__highlights { margin-top: 4px; }
    .ccdv__highlights-title {
      font-size: 18px; font-weight: bold; color: #1a1a1a; margin: 0 0 10px;
    }
    .ccdv__highlights-list { --list-indent: 20px; font-size: 13px; color: #1a1a1a; }
    .ccdv__highlight-item { --list-item-gap: 8px; --list-item-line-height: 1.6; }

    .ccdv__empty { font-size: 13px; color: #888; padding: 20px 0; }
  `],
})
export class AmexCenturionCardDetailsViewComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `centurion-card-details-view-${++AmexCenturionCardDetailsViewComponent._idCounter}`;

  @Input() details: CenturionCardDetails | null = null;
  clientIdInput = '';

  @Output() search = new EventEmitter<string>();
}