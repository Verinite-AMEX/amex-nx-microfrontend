import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface UAEFTSRequestData {
  emiratesId: string;
  ibanNumber: string;
  statementPeriod: string;
  customerConsent: string;
}

export interface UAEFTSSuccessData {
  referenceNumber: string;
}

/**
 * UAEFTSStatementRequestForm
 * UAEFTS: Emirates ID + IBAN Number + Statement Period + Consent Date.
 * On success shows "Successful Request" popup with Reference Number.
 * Source: UAEFTS (image4) — modern ONLS style with success modal
 */
@Component({
  selector: 'amex-uaefts-statement-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="usrf">
      <!-- Tab switcher: Search | Request Bank Statement (image5) -->
      <div class="usrf__tabs">
        <button class="usrf__tab"
          [class.usrf__tab--active]="activeTab === 'search'"
          (click)="activeTab = 'search'">
          <span class="usrf__tab-icon">&#128269;</span> Search
        </button>
        <button class="usrf__tab"
          [class.usrf__tab--active]="activeTab === 'request'"
          (click)="activeTab = 'request'">
          <span class="usrf__tab-icon">&#10133;</span> Request Bank Statement
        </button>
      </div>
      <div class="usrf__tab-line"></div>

      <!-- Request form fields -->
      <div *ngIf="activeTab === 'request'" class="usrf__form">
        <div class="usrf__field">
          <label class="usrf__label" [for]="id + '-emirates-id'">Emirates ID</label>
          <input [id]="id + '-emirates-id'" class="usrf__input" [(ngModel)]="form.emiratesId" placeholder="e.g. 784199900001200" />
        </div>
        <div class="usrf__field">
          <label class="usrf__label" [for]="id + '-iban-number'">IBAN Number</label>
          <input [id]="id + '-iban-number'" class="usrf__input" [(ngModel)]="form.ibanNumber" placeholder="e.g. AE070331234567890123456" />
        </div>
        <div class="usrf__field">
          <label class="usrf__label" [for]="id + '-statement-period'">Statement Period</label>
          <select [id]="id + '-statement-period'" class="usrf__select" [(ngModel)]="form.statementPeriod">
            <option value="1">1 month</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </select>
        </div>
        <div class="usrf__field">
          <label class="usrf__label" [for]="id + '-customer-consent'">Customer Consent</label>
          <input [id]="id + '-customer-consent'" class="usrf__input" [(ngModel)]="form.customerConsent" placeholder="dd/mm/yyyy" />
        </div>
        <div class="usrf__actions">
          <button class="usrf__btn usrf__btn--submit"
            (click)="submitClick.emit(form)">Submit</button>
        </div>
      </div>

      <!-- Search tab — IBAN + customer name inputs -->
      <div *ngIf="activeTab === 'search'" class="usrf__form">
        <div class="usrf__search-row">
          <input class="usrf__input usrf__input--search" [(ngModel)]="searchIban" placeholder="IBAN#" />
          <input class="usrf__input usrf__input--search" [(ngModel)]="searchName" placeholder="Customer Name" />
        </div>
      </div>

      <!-- Success overlay — matches image4 exactly -->
      <div *ngIf="successData" class="usrf__success-overlay">
        <div class="usrf__success-modal">
          <div class="usrf__success-icon">&#10004;</div>
          <div class="usrf__success-title">Successful Request</div>
          <div class="usrf__success-ref">
            Reference Number : {{ successData.referenceNumber }}
          </div>
          <button class="usrf__btn usrf__btn--back" (click)="backClick.emit()">Back</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; position: relative; }

    /* Tabs — Search | Request Bank Statement (matches image5) */
    .usrf__tabs { display: flex; gap: 24px; padding: 0 0 0 2px; }
    .usrf__tab {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 4px; font-size: 14px; color: #555;
      background: none; border: none; border-bottom: 3px solid transparent;
      cursor: pointer; font-family: Arial, sans-serif;
    }
    .usrf__tab--active { color: #1a3a6b; border-bottom-color: #1a3a6b; font-weight: bold; }
    .usrf__tab-icon { font-size: 14px; }
    .usrf__tab-line { height: 2px; background: #1a3a6b; margin-bottom: 18px; }

    /* Form fields */
    .usrf__form { max-width: 480px; }
    .usrf__field { margin-bottom: 16px; }
    .usrf__label { display: block; font-size: 13px; color: #333; margin-bottom: 6px; font-weight: bold; }
    .usrf__input {
      width: 100%; box-sizing: border-box;
      border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 12px; font-size: 13px;
      font-family: Arial, sans-serif; color: #333; outline: none;
    }
    .usrf__input:focus { border-color: #1a3a6b; }
    .usrf__input--search { width: auto; flex: 1; }
    .usrf__select {
      width: 100%; border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif;
      background: #fff; cursor: pointer; outline: none;
    }
    .usrf__search-row { display: flex; gap: 10px; }
    .usrf__actions { margin-top: 10px; }

    /* Buttons */
    .usrf__btn { padding: 9px 32px; font-size: 14px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .usrf__btn--submit { background: #1a3a6b; color: #fff; width: 100%; }
    .usrf__btn--submit:hover { background: #16304f; }
    .usrf__btn--back { background: #1a3a6b; color: #fff; width: 100%; margin-top: 12px; }
    .usrf__btn--back:hover { background: #16304f; }

    /* Success overlay — matches image4 exactly */
    .usrf__success-overlay {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.35);
      display: flex; align-items: center; justify-content: center;
      z-index: 10;
    }
    .usrf__success-modal {
      background: #fff; border-radius: 4px;
      padding: 28px 32px; min-width: 260px; max-width: 340px;
      text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }
    .usrf__success-icon {
      width: 40px; height: 40px; border-radius: 50%;
      border: 3px solid #2e7d32; color: #2e7d32;
      font-size: 22px; display: flex; align-items: center;
      justify-content: center; margin: 0 auto 12px;
    }
    .usrf__success-title { font-size: 15px; font-weight: bold; color: #333; margin-bottom: 10px; }
    .usrf__success-ref { font-size: 13px; color: #555; margin-bottom: 16px; }
  `],
})
export class AmexUAEFTSStatementRequestFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `uaefts-statement-request-form-${++AmexUAEFTSStatementRequestFormComponent._idCounter}`;


  @Input() successData: UAEFTSSuccessData | null = null;

  activeTab: 'search' | 'request' = 'request';
  form: UAEFTSRequestData = { emiratesId: '', ibanNumber: '', statementPeriod: '3', customerConsent: '' };
  searchIban = '';
  searchName = '';

  @Output() submitClick = new EventEmitter<UAEFTSRequestData>();
  @Output() backClick   = new EventEmitter<void>();
}
