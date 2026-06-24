import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type UAEFTSStatus = 'CREATED' | 'SENT' | 'ACK_RECEIVED' | 'FTR_PROCESSED' | 'PDF_GENERATED' | 'FAILED';

export interface UAEFTSRecord {
  referenceNo: string;
  customerName: string;
  idType: string;       // 'EI' | 'IBAN' | 'Name'
  idNumber: string;
  iban: string;
  period: number;
  consentDate: string;
  status: UAEFTSStatus;
  createdBy: string;
  createdDate: string;
  verifiedBy?: string;
  verifiedDate?: string;
}

/**
 * UAEFTSStatusView
 * UAEFTS Statements search panel and request lifecycle status display.
 * Two modes: Search (list results) | Request Bank Statement (new request form).
 * Columns: Reference#, Customer Name, ID Type/No, IBAN, Period, Consent Date, Status, Created, Verified.
 * Source: UAEFTS Statements
 * Style: IBM WebSphere Portal dark-nav header, white content, blue link tabs.
 */
@Component({
  selector: 'amex-uaefts-status-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="usv">

      <!-- Breadcrumb -->
      <div class="usv__breadcrumb">
        <span class="usv__bc-link">Statements</span>
        <span class="usv__bc-sep"> &gt; </span>
        <span class="usv__bc-current">UAEFTS Statements</span>
      </div>

      <!-- Mode tabs -->
      <div class="usv__mode-tabs">
        <button class="usv__mode-tab"
                [class.usv__mode-tab--active]="mode === 'search'"
                (click)="mode = 'search'">
          <span class="usv__mode-icon">&#128269;</span> Search
        </button>
        <button class="usv__mode-tab"
                [class.usv__mode-tab--active]="mode === 'request'"
                (click)="mode = 'request'">
          <span class="usv__mode-icon">&#10133;</span> Request Bank Statement
        </button>
      </div>
      <div class="usv__mode-border"></div>

      <!-- Search mode -->
      <div *ngIf="mode === 'search'" class="usv__search">
        <div class="usv__search-inputs">
          <input class="usv__input" [(ngModel)]="searchIBAN"
                 placeholder="IBAN#" (input)="onFilter()" />
          <input class="usv__input" [(ngModel)]="searchName"
                 placeholder="Customer Name" (input)="onFilter()" />
        </div>

        <!-- Results table -->
        <div *ngIf="filteredRecords.length > 0" class="usv__table-wrap">
          <table class="usv__table">
            <thead>
              <tr>
                <th>Reference#</th>
                <th>Customer Name</th>
                <th>ID</th>
                <th>IBAN</th>
                <th>Period</th>
                <th>Consent Date</th>
                <th>Status</th>
                <th>Created</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of filteredRecords; let i = index"
                  [class.usv__row-alt]="i % 2 === 1">
                <td>{{ r.referenceNo }}</td>
                <td>{{ r.customerName }}</td>
                <td>
                  Type: {{ r.idType }}<br/>
                  No.: {{ r.idNumber }}
                </td>
                <td>{{ r.iban }}</td>
                <td>{{ r.period }}</td>
                <td>{{ r.consentDate }}</td>
                <td>
                  <span class="usv__status-badge"
                        [class.usv__status--created]="r.status === 'CREATED'"
                        [class.usv__status--sent]="r.status === 'SENT'"
                        [class.usv__status--ack]="r.status === 'ACK_RECEIVED'"
                        [class.usv__status--ftr]="r.status === 'FTR_PROCESSED'"
                        [class.usv__status--pdf]="r.status === 'PDF_GENERATED'"
                        [class.usv__status--failed]="r.status === 'FAILED'">
                    {{ r.status }}
                  </span>
                </td>
                <td>
                  By: {{ r.createdBy }}<br/>
                  Date: {{ r.createdDate }}
                </td>
                <td>
                  By: {{ r.verifiedBy || '-' }}<br/>
                  Date: {{ r.verifiedDate || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="filteredRecords.length === 0 && (searchIBAN || searchName)"
             class="usv__no-results">
          No records found matching your search criteria.
        </div>
      </div>

      <!-- Request mode -->
      <div *ngIf="mode === 'request'" class="usv__request">
        <div class="usv__request-form">
          <div class="usv__field-row">
            <label class="usv__field-label">Search Type</label>
            <select class="usv__select" [(ngModel)]="requestSearchType">
              <option value="iban">IBAN</option>
              <option value="emirates_id">Emirates ID</option>
              <option value="name">Customer Name</option>
            </select>
          </div>
          <div class="usv__field-row">
            <label class="usv__field-label">
              <ng-container *ngIf="requestSearchType === 'iban'">IBAN Number</ng-container>
              <ng-container *ngIf="requestSearchType === 'emirates_id'">Emirates ID</ng-container>
              <ng-container *ngIf="requestSearchType === 'name'">Customer Name</ng-container>
            </label>
            <input class="usv__input usv__input--wide" [(ngModel)]="requestValue"
                   placeholder="Enter value..." />
          </div>
          <div class="usv__field-row">
            <label class="usv__field-label">Period (months)</label>
            <input class="usv__input" [(ngModel)]="requestPeriod" type="number" min="1" max="12" />
          </div>
          <button class="usv__submit-btn" (click)="submitRequest.emit({ type: requestSearchType, value: requestValue, period: requestPeriod })">
            Submit Request
          </button>
        </div>

        <div *ngIf="requestConfirmation" class="usv__request-confirm">
          <div class="usv__confirm-icon">&#9989;</div>
          <div class="usv__confirm-text">
            <div>Request submitted successfully.</div>
            <div class="usv__confirm-ref">Reference No: <strong>{{ requestConfirmation.referenceNo }}</strong></div>
            <div class="usv__confirm-status">Status: <span class="usv__status-badge usv__status--created">CREATED</span></div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }
    .usv { background: #fff; }

    .usv__breadcrumb {
      font-size: 12px; color: #555; margin-bottom: 10px;
      padding: 0 4px;
    }
    .usv__bc-link { color: #006fcf; cursor: pointer; }
    .usv__bc-link:hover { text-decoration: underline; }
    .usv__bc-sep { color: #888; }
    .usv__bc-current { color: #333; }

    /* Mode tabs */
    .usv__mode-tabs {
      display: flex; gap: 0; align-items: center;
    }
    .usv__mode-tab {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px; font-size: 13px;
      background: none; border: none; cursor: pointer;
      color: #006fcf; font-family: Arial, sans-serif;
    }
    .usv__mode-tab--active {
      font-weight: bold; color: #1a1a1a;
    }
    .usv__mode-tab:hover { text-decoration: underline; }
    .usv__mode-icon { font-size: 14px; }
    .usv__mode-border {
      border-bottom: 2px solid #006fcf; margin-bottom: 14px;
    }

    /* Search */
    .usv__search-inputs {
      display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;
    }
    .usv__input {
      border: 1px solid #aaa; padding: 5px 8px;
      font-size: 12px; font-family: Arial, sans-serif; outline: none;
    }
    .usv__input--wide { min-width: 280px; }

    .usv__table-wrap { overflow-x: auto; }
    .usv__table {
      border-collapse: collapse; width: 100%; font-size: 11px;
      min-width: 700px;
    }
    .usv__table th {
      background: #f0f0f0; border: 1px solid #ccc;
      padding: 6px 8px; text-align: left; color: #333; font-weight: bold;
    }
    .usv__table td {
      border: 1px solid #ddd; padding: 5px 8px;
      color: #1a1a1a; vertical-align: top;
    }
    .usv__row-alt td { background: #f8f8f8; }

    /* Status badges */
    .usv__status-badge {
      display: inline-block; padding: 2px 7px;
      border-radius: 10px; font-size: 10px; font-weight: bold;
      white-space: nowrap;
    }
    .usv__status--created   { background: #fff3cd; color: #856404; }
    .usv__status--sent      { background: #cce5ff; color: #004085; }
    .usv__status--ack       { background: #d4edda; color: #155724; }
    .usv__status--ftr       { background: #d1ecf1; color: #0c5460; }
    .usv__status--pdf       { background: #d4edda; color: #155724; }
    .usv__status--failed    { background: #f8d7da; color: #721c24; }

    .usv__no-results { font-size: 12px; color: #888; padding: 12px 0; }

    /* Request form */
    .usv__request-form {
      max-width: 400px; display: flex; flex-direction: column; gap: 10px;
    }
    .usv__field-row {
      display: flex; align-items: center; gap: 12px;
    }
    .usv__field-label {
      font-size: 12px; font-weight: bold; color: #333;
      min-width: 130px; white-space: nowrap;
    }
    .usv__select {
      border: 1px solid #aaa; padding: 4px 6px;
      font-size: 12px; font-family: Arial, sans-serif; background: #fff;
    }
    .usv__submit-btn {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 6px 18px; font-size: 12px; cursor: pointer;
      font-family: Arial, sans-serif; align-self: flex-start;
      margin-top: 4px;
    }
    .usv__submit-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }

    /* Confirmation */
    .usv__request-confirm {
      display: flex; align-items: flex-start; gap: 10px;
      margin-top: 16px; background: #e8f5e9;
      border: 1px solid #a5d6a7; padding: 12px 14px;
    }
    .usv__confirm-icon { font-size: 18px; }
    .usv__confirm-text { font-size: 12px; color: #1b5e20; }
    .usv__confirm-ref { margin-top: 4px; }
    .usv__confirm-status { margin-top: 4px; }
  `],
})
export class AmexUAEFTSStatusViewComponent {
  @Input() mode: 'search' | 'request' = 'search';
  @Input() records: UAEFTSRecord[] = [];
  @Input() requestConfirmation: { referenceNo: string } | null = null;

  searchIBAN = '';
  searchName = '';
  requestSearchType = 'iban';
  requestValue = '';
  requestPeriod = 3;

  get filteredRecords(): UAEFTSRecord[] {
    return this.records.filter(r => {
      const ibanMatch = !this.searchIBAN || r.iban.toLowerCase().includes(this.searchIBAN.toLowerCase());
      const nameMatch = !this.searchName || r.customerName.toLowerCase().includes(this.searchName.toLowerCase());
      return ibanMatch && nameMatch;
    });
  }

  onFilter() {/* triggers change detection */}

  @Output() submitRequest = new EventEmitter<{ type: string; value: string; period: number }>();
}
