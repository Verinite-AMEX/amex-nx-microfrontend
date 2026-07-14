import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field';
import { InputComponent } from '../../atoms/input';
import { SelectComponent } from '../../atoms/select';
import { ButtonComponent } from '../../atoms/button';

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
 *
 * NOTE: success overlay is intentionally NOT ui-modal — it's position:absolute
 * scoped to this component with no close-X / no backdrop-dismiss, only the
 * Back button dismisses it. ui-modal is position:fixed full-viewport with a
 * built-in close button and backdrop-dismiss, which would change behavior.
 */
@Component({
  selector: 'amex-uaefts-statement-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, SelectComponent, ButtonComponent],
  template: `
    <div class="usrf">
      <!-- Tab switcher: Search | Request Bank Statement (image5) -->
      <div class="usrf__tabs">
        <ui-button class="usrf__tab" [class.usrf__tab--active]="activeTab === 'search'"
          variant="secondary" (click)="activeTab = 'search'">
          <span slot="icon-start">&#128269;</span>
          Search
        </ui-button>
        <ui-button class="usrf__tab" [class.usrf__tab--active]="activeTab === 'request'"
          variant="secondary" (click)="activeTab = 'request'">
          <span slot="icon-start">&#10133;</span>
          Request Bank Statement
        </ui-button>
      </div>
      <div class="usrf__tab-line"></div>

      <!-- Request form fields -->
      <div *ngIf="activeTab === 'request'" class="usrf__form">
        <ui-form-field class="usrf__field" label="Emirates ID" [forId]="id + '-emirates-id'">
          <ui-input [id]="id + '-emirates-id'" [(ngModel)]="form.emiratesId" placeholder="e.g. 784199900001200"></ui-input>
        </ui-form-field>
        <ui-form-field class="usrf__field" label="IBAN Number" [forId]="id + '-iban-number'">
          <ui-input [id]="id + '-iban-number'" [(ngModel)]="form.ibanNumber" placeholder="e.g. AE070331234567890123456"></ui-input>
        </ui-form-field>
        <ui-form-field class="usrf__field" label="Statement Period" [forId]="id + '-statement-period'">
          <ui-select [id]="id + '-statement-period'" [options]="statementPeriodOptions" [(ngModel)]="form.statementPeriod"></ui-select>
        </ui-form-field>
        <ui-form-field class="usrf__field" label="Customer Consent" [forId]="id + '-customer-consent'">
          <ui-input [id]="id + '-customer-consent'" [(ngModel)]="form.customerConsent" placeholder="dd/mm/yyyy"></ui-input>
        </ui-form-field>
        <div class="usrf__actions">
          <ui-button class="usrf__btn usrf__btn--submit" variant="primary" [fullWidth]="true" label="Submit"
            (click)="submitClick.emit(form)"></ui-button>
        </div>
      </div>

      <!-- Search tab — IBAN + customer name inputs -->
      <div *ngIf="activeTab === 'search'" class="usrf__form">
        <div class="usrf__search-row">
          <ui-input class="usrf__input--search" [(ngModel)]="searchIban" placeholder="IBAN#"></ui-input>
          <ui-input class="usrf__input--search" [(ngModel)]="searchName" placeholder="Customer Name"></ui-input>
        </div>
      </div>

      <!-- Success overlay — matches image4 exactly (scoped, not ui-modal — see note above) -->
      <div *ngIf="successData" class="usrf__success-overlay">
        <div class="usrf__success-modal">
          <div class="usrf__success-icon">&#10004;</div>
          <div class="usrf__success-title">Successful Request</div>
          <div class="usrf__success-ref">
            Reference Number : {{ successData.referenceNumber }}
          </div>
          <ui-button class="usrf__btn usrf__btn--back" variant="primary" [fullWidth]="true" label="Back"
            (click)="backClick.emit()"></ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; position: relative; }

    /* Tabs — Search | Request Bank Statement (matches image5) */
    .usrf__tabs { display: flex; gap: 24px; padding: 0 0 0 2px; }
    .usrf__tab {
      --btn-bg: none; --btn-color: #555; --btn-radius: 0px;
      --btn-padding: 8px 4px; --btn-font-size: 14px;
      border-bottom: 3px solid transparent;
    }
    .usrf__tab--active { --btn-color: #1a3a6b; border-bottom-color: #1a3a6b; font-weight: bold; }
    .usrf__tab-line { height: 2px; background: #1a3a6b; margin-bottom: 18px; }

    /* Form fields */
    .usrf__form { max-width: 480px; }
    .usrf__field { margin-bottom: 16px; }
    .usrf__input--search { flex: 1; }
    .usrf__search-row { display: flex; gap: 10px; }
    .usrf__actions { margin-top: 10px; }

    /* Buttons */
    .usrf__btn--submit { --btn-bg: #1a3a6b; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 32px; --btn-font-size: 14px; }
    .usrf__btn--back { --btn-bg: #1a3a6b; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 32px; --btn-font-size: 14px; margin-top: 12px; }

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
  @HostBinding('attr.id') @Input() id = `uaefts-statement-request-form-${++AmexUAEFTSStatementRequestFormComponent._idCounter}`;

  @Input() successData: UAEFTSSuccessData | null = null;

  activeTab: 'search' | 'request' = 'request';
  form: UAEFTSRequestData = { emiratesId: '', ibanNumber: '', statementPeriod: '3', customerConsent: '' };
  searchIban = '';
  searchName = '';

  readonly statementPeriodOptions = [
    { value: '1', label: '1 month' },
    { value: '3', label: '3 months' },
    { value: '6', label: '6 months' },
    { value: '12', label: '12 months' },
  ];

  @Output() submitClick = new EventEmitter<UAEFTSRequestData>();
  @Output() backClick   = new EventEmitter<void>();
}