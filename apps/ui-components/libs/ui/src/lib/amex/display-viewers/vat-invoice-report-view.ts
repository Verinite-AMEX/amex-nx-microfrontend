import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface VATLineItem {
  description: string;
  amount: number;
  vatAmount: number;
}

/**
 * VATInvoiceReportView
 * ONLS Helper Tax Invoice panel.
 * - Customer type: Corporate / Consumer radio
 * - Search mode: VAT Registration Number | Invoice Number | Basic Control Account
 * - Error state: "No Tax Invoice with matching details."
 * - Result state: shows invoice with company, VAT Reg No, line items, Download PDF
 * Source: VAT Invoice, OMS VAT Invoices
 * Style: ONLS Helper — light-blue bordered panel, white bg, blue Generate Report button.
 */
@Component({
  selector: 'amex-vat-invoice-report-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="virv">
      <div class="virv__title">Tax Invoice</div>

      <div class="virv__panel">

        <!-- Error banner -->
        <div *ngIf="errorMessage" class="virv__error">
          {{ errorMessage }}
        </div>

        <!-- Customer type row -->
        <div class="virv__type-row">
          <label class="virv__radio-label">
            <input type="radio" name="virv_type" value="corporate"
                   [(ngModel)]="customerType" /> Corporate
          </label>
          <label class="virv__radio-label">
            <input type="radio" name="virv_type" value="consumer"
                   [(ngModel)]="customerType" /> Consumer
          </label>
        </div>

        <!-- Search mode row -->
        <div class="virv__mode-row">
          <label class="virv__radio-label">
            <input type="radio" name="virv_mode" value="vat"
                   [(ngModel)]="searchMode" /> VAT Registration Number
          </label>
          <label class="virv__radio-label">
            <input type="radio" name="virv_mode" value="invoice"
                   [(ngModel)]="searchMode" /> Invoice Number
          </label>
          <label class="virv__radio-label">
            <input type="radio" name="virv_mode" value="account"
                   [(ngModel)]="searchMode" /> Basic Control Account
          </label>
        </div>

        <!-- Dynamic label + input -->
        <div class="virv__input-block">
          <div class="virv__input-label">
            <ng-container *ngIf="searchMode === 'vat'">VAT Registration Number</ng-container>
            <ng-container *ngIf="searchMode === 'invoice'">Invoice Number</ng-container>
            <ng-container *ngIf="searchMode === 'account'">Basic Control Account</ng-container>
          </div>
          <input class="virv__input" [(ngModel)]="searchValue"
                 [placeholder]="searchMode === 'vat' ? 'Enter VAT Reg Number'
                               : searchMode === 'invoice' ? 'Enter Invoice Number'
                               : 'Enter Account Number'" />
        </div>

        <button class="virv__gen-btn" (click)="generate.emit({ type: customerType, mode: searchMode, value: searchValue })">
          Generate Report
        </button>

      </div><!-- /panel -->

      <!-- Invoice result -->
      <div *ngIf="invoice" class="virv__result">
        <div class="virv__result-header">Tax Invoice</div>
        <div class="virv__result-body">
          <table class="virv__meta-table">
            <tr>
              <td class="virv__meta-label">Company Name</td>
              <td class="virv__meta-value">{{ invoice.companyName }}</td>
              <td class="virv__meta-label">Invoice Number</td>
              <td class="virv__meta-value">{{ invoice.invoiceNumber }}</td>
            </tr>
            <tr>
              <td class="virv__meta-label">VAT Registration No</td>
              <td class="virv__meta-value">{{ invoice.vatRegistrationNo }}</td>
              <td class="virv__meta-label">Period</td>
              <td class="virv__meta-value">{{ invoice.period }}</td>
            </tr>
          </table>

          <table class="virv__line-table">
            <thead>
              <tr>
                <th>Description</th>
                <th class="virv__th-num">Amount (AED)</th>
                <th class="virv__th-num">VAT (AED)</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let li of invoice.lineItems; let i = index"
                  [class.virv__row-alt]="i % 2 === 1">
                <td>{{ li.description }}</td>
                <td class="virv__td-num">{{ li.amount | number:'1.2-2' }}</td>
                <td class="virv__td-num">{{ li.vatAmount | number:'1.2-2' }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="virv__total-label">Total VAT</td>
                <td></td>
                <td class="virv__td-num virv__total-value">
                  {{ totalVAT | number:'1.2-2' }}
                </td>
              </tr>
            </tfoot>
          </table>

          <div class="virv__dl-row">
            <button class="virv__dl-btn" (click)="downloadPDF.emit(invoice)">
              &#11015; Download PDF
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }

    .virv__title {
      font-size: 16px; color: #1a1a1a; font-weight: normal;
      margin-bottom: 12px;
    }

    .virv__panel {
      background: #e8f4fb; border: 1px solid #a8c8e0;
      padding: 14px 16px; margin-bottom: 16px;
    }

    .virv__error {
      background: #fff0f0; border: 1px solid #f5c6cb;
      color: #721c24; padding: 8px 12px;
      font-size: 12px; margin-bottom: 10px; border-radius: 2px;
    }

    .virv__type-row, .virv__mode-row {
      display: flex; gap: 20px; align-items: center;
      margin-bottom: 8px; flex-wrap: wrap;
    }
    .virv__radio-label {
      display: flex; align-items: center; gap: 4px;
      font-size: 12px; color: #333; cursor: pointer;
    }
    .virv__radio-label input { cursor: pointer; }

    .virv__input-block { margin-top: 8px; margin-bottom: 12px; }
    .virv__input-label {
      font-size: 12px; font-weight: bold; color: #333; margin-bottom: 4px;
    }
    .virv__input {
      width: 100%; max-width: 480px;
      border: 1px solid #aaa; padding: 6px 8px;
      font-size: 12px; font-family: Arial, sans-serif;
      background: #fff; box-sizing: border-box; outline: none;
    }

    .virv__gen-btn {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 6px 18px; font-size: 12px; cursor: pointer;
      font-family: Arial, sans-serif;
    }
    .virv__gen-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }

    /* Invoice result */
    .virv__result { border: 1px solid #a8c8e0; }
    .virv__result-header {
      background: #b8d4ef; color: #1a3c5e; font-weight: bold;
      padding: 7px 12px; border-bottom: 1px solid #a8c8e0; font-size: 12px;
    }
    .virv__result-body { padding: 14px 16px; }

    .virv__meta-table {
      border-collapse: collapse; width: 100%; margin-bottom: 14px;
      font-size: 12px;
    }
    .virv__meta-label {
      font-weight: bold; color: #555; padding: 4px 10px 4px 0;
      width: 150px; white-space: nowrap;
    }
    .virv__meta-value { color: #1a1a1a; padding: 4px 20px 4px 0; }

    .virv__line-table {
      border-collapse: collapse; width: 100%; font-size: 12px;
    }
    .virv__line-table th {
      background: #b8d4ef; color: #1a3c5e; border: 1px solid #a0bcd8;
      padding: 5px 10px; font-weight: bold;
    }
    .virv__th-num { text-align: right; }
    .virv__line-table td {
      border: 1px solid #d0d8e0; padding: 4px 10px;
    }
    .virv__td-num { text-align: right; }
    .virv__row-alt td { background: #f0f7ff; }
    .virv__total-label {
      font-weight: bold; text-align: right; color: #333; border: 1px solid #d0d8e0;
      padding: 5px 10px;
    }
    .virv__total-value {
      font-weight: bold; color: #1a1a1a; background: #e8f4fb;
    }
    .virv__dl-row { margin-top: 12px; }
    .virv__dl-btn {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 6px 16px; font-size: 12px; cursor: pointer;
      font-family: Arial, sans-serif;
    }
    .virv__dl-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
  `],
})
export class AmexVATInvoiceReportViewComponent {
  @Input() customerType: 'corporate' | 'consumer' = 'corporate';
  @Input() searchMode: 'vat' | 'invoice' | 'account' = 'invoice';
  @Input() searchValue  = '';
  @Input() errorMessage = '';
  @Input() invoice: {
    companyName: string;
    vatRegistrationNo: string;
    invoiceNumber: string;
    period: string;
    lineItems: VATLineItem[];
  } | null = null;

  get totalVAT(): number {
    if (!this.invoice) return 0;
    return this.invoice.lineItems.reduce((sum, li) => sum + li.vatAmount, 0);
  }

  @Output() generate    = new EventEmitter<{ type: string; mode: string; value: string }>();
  @Output() downloadPDF = new EventEmitter<unknown>();
}
