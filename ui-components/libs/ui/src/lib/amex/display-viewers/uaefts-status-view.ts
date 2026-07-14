import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button';
import { InputComponent } from '../../atoms/input';
import { SelectComponent } from '../../atoms/select';
import { LabelComponent } from '../../atoms/label';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';

export type UAEFTSStatus = 'CREATED' | 'SENT' | 'ACK_RECEIVED' | 'FTR_PROCESSED' | 'PDF_GENERATED' | 'FAILED';

export interface UAEFTSRecord {
  referenceNo: string;
  customerName: string;
  idType: string;
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

@Component({
  selector: 'amex-uaefts-status-view',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    ButtonComponent, InputComponent, SelectComponent, LabelComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent, TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="usv">

      <!-- Breadcrumb: raw spans, not a native form element — not a rule violation, left as-is -->
      <div class="usv__breadcrumb">
        <span class="usv__bc-link">Statements</span>
        <span class="usv__bc-sep"> &gt; </span>
        <span class="usv__bc-current">UAEFTS Statements</span>
      </div>

      <!-- Mode tabs: raw <button> replaced with ui-button (ghost), styled via CSS vars to match -->
      <div class="usv__mode-tabs">
        <ui-button class="usv__mode-tab" [class.usv__mode-tab--active]="mode === 'search'"
          variant="ghost" label="Search" (click)="mode = 'search'">
          <span slot="icon-start" class="usv__mode-icon">&#128269;</span>
        </ui-button>
        <ui-button class="usv__mode-tab" [class.usv__mode-tab--active]="mode === 'request'"
          variant="ghost" label="Request Bank Statement" (click)="mode = 'request'">
          <span slot="icon-start" class="usv__mode-icon">&#10133;</span>
        </ui-button>
      </div>
      <div class="usv__mode-border"></div>

      <!-- Search mode -->
      <div *ngIf="mode === 'search'" class="usv__search">
        <div class="usv__search-inputs">
          <ui-input class="usv__input" [(ngModel)]="searchIBAN" placeholder="IBAN#" (ngModelChange)="onFilter()"></ui-input>
          <ui-input class="usv__input usv__input--wide" [(ngModel)]="searchName" placeholder="Customer Name" (ngModelChange)="onFilter()"></ui-input>
        </div>

        <div *ngIf="filteredRecords.length > 0" class="usv__table-wrap">
          <ui-table [bordered]="true" [striped]="true" [compact]="true" ariaLabel="UAEFTS statement requests">
            <ui-table-head>
              <ui-table-row [header]="true">
                <ui-table-header-cell>Reference#</ui-table-header-cell>
                <ui-table-header-cell>Customer Name</ui-table-header-cell>
                <ui-table-header-cell>ID</ui-table-header-cell>
                <ui-table-header-cell>IBAN</ui-table-header-cell>
                <ui-table-header-cell>Period</ui-table-header-cell>
                <ui-table-header-cell>Consent Date</ui-table-header-cell>
                <ui-table-header-cell>Status</ui-table-header-cell>
                <ui-table-header-cell>Created</ui-table-header-cell>
                <ui-table-header-cell>Verified</ui-table-header-cell>
              </ui-table-row>
            </ui-table-head>
            <ui-table-body>
              <ui-table-row *ngFor="let r of filteredRecords" [hoverable]="false">
                <ui-table-cell>{{ r.referenceNo }}</ui-table-cell>
                <ui-table-cell>{{ r.customerName }}</ui-table-cell>
                <ui-table-cell>Type: {{ r.idType }}<br/>No.: {{ r.idNumber }}</ui-table-cell>
                <ui-table-cell>{{ r.iban }}</ui-table-cell>
                <ui-table-cell>{{ r.period }}</ui-table-cell>
                <ui-table-cell>{{ r.consentDate }}</ui-table-cell>
                <ui-table-cell>
                  <span class="usv__status-badge"
                        [class.usv__status--created]="r.status === 'CREATED'"
                        [class.usv__status--sent]="r.status === 'SENT'"
                        [class.usv__status--ack]="r.status === 'ACK_RECEIVED'"
                        [class.usv__status--ftr]="r.status === 'FTR_PROCESSED'"
                        [class.usv__status--pdf]="r.status === 'PDF_GENERATED'"
                        [class.usv__status--failed]="r.status === 'FAILED'">
                    {{ r.status }}
                  </span>
                </ui-table-cell>
                <ui-table-cell>By: {{ r.createdBy }}<br/>Date: {{ r.createdDate }}</ui-table-cell>
                <ui-table-cell>By: {{ r.verifiedBy || '-' }}<br/>Date: {{ r.verifiedDate || '-' }}</ui-table-cell>
              </ui-table-row>
            </ui-table-body>
          </ui-table>
        </div>

        <div *ngIf="filteredRecords.length === 0 && (searchIBAN || searchName)" class="usv__no-results">
          No records found matching your search criteria.
        </div>
      </div>

      <!-- Request mode -->
      <div *ngIf="mode === 'request'" class="usv__request">
        <div class="usv__request-form">
          <div class="usv__field-row">
            <ui-label class="usv__field-label" [forId]="id + '-search-type'">Search Type</ui-label>
            <ui-select [id]="id + '-search-type'" class="usv__select" [options]="searchTypeOptions"
                       [(ngModel)]="requestSearchType" [nativeAppearance]="true"></ui-select>
          </div>
          <div class="usv__field-row">
            <ui-label class="usv__field-label" [forId]="id + '-iban-number-emirates-id-customer-name'">
              <ng-container *ngIf="requestSearchType === 'iban'">IBAN Number</ng-container>
              <ng-container *ngIf="requestSearchType === 'emirates_id'">Emirates ID</ng-container>
              <ng-container *ngIf="requestSearchType === 'name'">Customer Name</ng-container>
            </ui-label>
            <ui-input [id]="id + '-iban-number-emirates-id-customer-name'" class="usv__input usv__input--wide"
                      [(ngModel)]="requestValue" placeholder="Enter value..."></ui-input>
          </div>
          <div class="usv__field-row">
            <ui-label class="usv__field-label" [forId]="id + '-period-months'">Period (months)</ui-label>
            <ui-input [id]="id + '-period-months'" class="usv__input" type="number" [(ngModel)]="requestPeriod"></ui-input>
          </div>
          <ui-button class="usv__submit-btn" variant="primary" label="Submit Request"
            (click)="submitRequest.emit({ type: requestSearchType, value: requestValue, period: requestPeriod })"></ui-button>
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
    :host {
      display: block; font-family: Arial, sans-serif; font-size: 12px;
      --input-border: 1px solid #aaa;
      --input-radius: 0;
      --input-padding: 5px 8px;
      --select-border: 1px solid #aaa;
      --select-radius: 0;
      --select-padding: 4px 6px;
      --select-font-size: 12px;
    }
    .usv { background: #fff; }

    .usv__breadcrumb { font-size: 12px; color: #555; margin-bottom: 10px; padding: 0 4px; }
    .usv__bc-link { color: #006fcf; cursor: pointer; }
    .usv__bc-link:hover { text-decoration: underline; }
    .usv__bc-sep { color: #888; }
    .usv__bc-current { color: #333; }

    .usv__mode-tabs { display: flex; gap: 0; align-items: center; }
    .usv__mode-tab {
      --btn-bg: none; --btn-color: #006fcf; --btn-border: none; --btn-radius: 0;
      --btn-padding: 8px 16px; --btn-font-size: 13px; --btn-gap: 6px; --btn-font-weight: normal;
    }
    .usv__mode-tab--active { --btn-color: #1a1a1a; --btn-font-weight: bold; }
    .usv__mode-icon { font-size: 14px; }
    .usv__mode-border { border-bottom: 2px solid #006fcf; margin-bottom: 14px; }

    .usv__search-inputs { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
    .usv__input { max-width: 180px; }
    .usv__input--wide { max-width: 280px; }

    .usv__table-wrap { overflow-x: auto; }
    :host ::ng-deep .usv__table-wrap ui-table {
      --table-stripe-bg: #f8f8f8;
      --table-header-padding: 6px 8px;
      font-size: 11px; min-width: 700px; display: block;
    }

    .usv__status-badge {
      display: inline-block; padding: 2px 7px; border-radius: 10px;
      font-size: 10px; font-weight: bold; white-space: nowrap;
    }
    .usv__status--created { background: #fff3cd; color: #856404; }
    .usv__status--sent     { background: #cce5ff; color: #004085; }
    .usv__status--ack      { background: #d4edda; color: #155724; }
    .usv__status--ftr      { background: #d1ecf1; color: #0c5460; }
    .usv__status--pdf      { background: #d4edda; color: #155724; }
    .usv__status--failed   { background: #f8d7da; color: #721c24; }

    .usv__no-results { font-size: 12px; color: #888; padding: 12px 0; }

    .usv__request-form { max-width: 400px; display: flex; flex-direction: column; gap: 10px; }
    .usv__field-row { display: flex; align-items: center; gap: 12px; }
    .usv__field-label { font-size: 12px; font-weight: bold; color: #333; min-width: 130px; white-space: nowrap; }
    .usv__submit-btn {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf); --btn-color: #fff;
      --btn-border: 1px solid #005fba; --btn-radius: 0; --btn-padding: 6px 18px; --btn-font-size: 12px;
      align-self: flex-start; margin-top: 4px;
    }

    .usv__request-confirm {
      display: flex; align-items: flex-start; gap: 10px; margin-top: 16px;
      background: #e8f5e9; border: 1px solid #a5d6a7; padding: 12px 14px;
    }
    .usv__confirm-icon { font-size: 18px; }
    .usv__confirm-text { font-size: 12px; color: #1b5e20; }
    .usv__confirm-ref { margin-top: 4px; }
    .usv__confirm-status { margin-top: 4px; }
  `],
})
export class AmexUAEFTSStatusViewComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `uaefts-status-view-${++AmexUAEFTSStatusViewComponent._idCounter}`;

  @Input() mode: 'search' | 'request' = 'search';
  @Input() records: UAEFTSRecord[] = [];
  @Input() requestConfirmation: { referenceNo: string } | null = null;

  searchIBAN = '';
  searchName = '';
  requestSearchType = 'iban';
  requestValue = '';
  requestPeriod = 3;

  readonly searchTypeOptions = [
    { value: 'iban', label: 'IBAN' },
    { value: 'emirates_id', label: 'Emirates ID' },
    { value: 'name', label: 'Customer Name' },
  ];

  get filteredRecords(): UAEFTSRecord[] {
    return this.records.filter(r => {
      const ibanMatch = !this.searchIBAN || r.iban.toLowerCase().includes(this.searchIBAN.toLowerCase());
      const nameMatch = !this.searchName || r.customerName.toLowerCase().includes(this.searchName.toLowerCase());
      return ibanMatch && nameMatch;
    });
  }

  onFilter() {}

  @Output() submitRequest = new EventEmitter<{ type: string; value: string; period: number }>();
}