import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ccdv">
      <!-- Client ID input -->
      <div class="ccdv__search">
        <label class="ccdv__search-label">Client ID</label>
        <input class="ccdv__input" [(ngModel)]="clientIdInput" [placeholder]="'Enter Client ID'" />
        <button class="ccdv__submit-btn" (click)="search.emit(clientIdInput)">Submit</button>
      </div>

      <!-- Horizontal rule -->
      <hr class="ccdv__hr" *ngIf="details" />

      <!-- Card details + image -->
      <div *ngIf="details" class="ccdv__details-row">
        <!-- Detail table -->
        <div class="ccdv__table-wrap">
          <table class="ccdv__table">
            <tr>
              <td class="ccdv__td-label">Name</td>
              <td class="ccdv__td-value">{{ details.name }}</td>
            </tr>
            <tr>
              <td class="ccdv__td-label">Card Number</td>
              <td class="ccdv__td-value">{{ details.cardNumber }}</td>
            </tr>
            <tr *ngIf="details.cardType">
              <td class="ccdv__td-label">Card Type</td>
              <td class="ccdv__td-value">{{ details.cardType }}</td>
            </tr>
            <tr *ngIf="details.status">
              <td class="ccdv__td-label">Status</td>
              <td class="ccdv__td-value">
                <span [class.ccdv__status--active]="details.status === 'Active'"
                      [class.ccdv__status--inactive]="details.status !== 'Active'">
                  {{ details.status }}
                </span>
              </td>
            </tr>
            <tr *ngIf="details.issuanceState">
              <td class="ccdv__td-label">Issuance State</td>
              <td class="ccdv__td-value">{{ details.issuanceState }}</td>
            </tr>
            <tr *ngIf="details.premiumizationStatus">
              <td class="ccdv__td-label">Premiumization</td>
              <td class="ccdv__td-value">{{ details.premiumizationStatus }}</td>
            </tr>
          </table>
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
        <ul class="ccdv__highlights-list">
          <li *ngFor="let h of details.highlights" class="ccdv__highlight-item">
            <span [innerHTML]="h.text"></span>
          </li>
        </ul>
      </div>

      <!-- Empty state -->
      <div *ngIf="!details" class="ccdv__empty">
        Enter a Client ID above and click Submit to view Centurion card details.
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 13px; }

    .ccdv { padding: 16px; max-width: 900px; }

    /* Search */
    .ccdv__search {
      display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
    }
    .ccdv__search-label { font-size: 13px; color: #333; min-width: 70px; }
    .ccdv__input {
      border: 1px solid #ccc; padding: 5px 10px; font-size: 13px;
      font-family: Arial, sans-serif; width: 220px;
    }
    .ccdv__submit-btn {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 5px 18px; font-size: 13px;
      font-family: Arial, sans-serif; cursor: pointer;
    }
    .ccdv__submit-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }

    .ccdv__hr { border: none; border-top: 1px solid #ddd; margin: 12px 0; }

    /* Details row */
    .ccdv__details-row {
      display: flex; gap: 24px; align-items: flex-start; margin-bottom: 20px;
    }

    /* Table */
    .ccdv__table-wrap { flex: 1; }
    .ccdv__table { border-collapse: collapse; width: 100%; }
    .ccdv__table tr { border-bottom: 1px solid #e0e0e0; }
    .ccdv__td-label {
      padding: 8px 14px; font-size: 13px; color: #006fcf;
      font-weight: normal; width: 150px; vertical-align: top;
    }
    .ccdv__td-value {
      padding: 8px 14px; font-size: 13px; color: #1a1a1a; vertical-align: top;
    }
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
    .ccdv__highlights-list { margin: 0; padding-left: 20px; }
    .ccdv__highlight-item {
      font-size: 13px; color: #1a1a1a; margin-bottom: 8px; line-height: 1.6;
    }

    .ccdv__empty { font-size: 13px; color: #888; padding: 20px 0; }
  `],
})
export class AmexCenturionCardDetailsViewComponent {
  @Input() details: CenturionCardDetails | null = null;
  clientIdInput = '';

  @Output() search = new EventEmitter<string>();
}
