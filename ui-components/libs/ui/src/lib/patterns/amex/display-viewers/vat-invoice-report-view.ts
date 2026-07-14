import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { RadioGroupComponent } from '../../../primitives/radio-group';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';
import { TableFootComponent } from '../../../primitives/table-foot';

export interface VATLineItem {
  description: string;
  amount: number;
  vatAmount: number;
}

@Component({
  selector: 'amex-vat-invoice-report-view',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    FormFieldComponent, InputComponent, RadioGroupComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent, TableBodyComponent, TableRowComponent, TableCellComponent,
    TableFootComponent,
  ],
  template: `
    <div class="virv">
      <div class="virv__title">Tax Invoice</div>

      <div class="virv__panel">
        <div *ngIf="errorMessage" class="virv__error">{{ errorMessage }}</div>

        <div class="virv__type-row">
          <ui-radio-group name="virv-type" orientation="horizontal" variant="native"
                          [options]="customerTypeOptions" [(ngModel)]="customerType"></ui-radio-group>
        </div>

        <div class="virv__mode-row">
          <ui-radio-group name="virv-mode" orientation="horizontal" variant="native"
                          [options]="searchModeOptions" [(ngModel)]="searchMode"></ui-radio-group>
        </div>

        <ui-form-field class="virv__input-block" [label]="searchValueLabel" [forId]="id + '-search-value'">
          <ui-input [id]="id + '-search-value'" class="virv__input" [(ngModel)]="searchValue" [placeholder]="searchValuePlaceholder"></ui-input>
        </ui-form-field>

        <ui-button class="virv__gen-btn" variant="primary" label="Generate Report"
          (click)="generate.emit({ type: customerType, mode: searchMode, value: searchValue })"></ui-button>
      </div>

      <div *ngIf="invoice" class="virv__result">
        <div class="virv__result-header">Tax Invoice</div>
        <div class="virv__result-body">

          <ui-table class="virv__meta-table">
            <ui-table-body>
              <ui-table-row [hoverable]="false">
                <ui-table-cell class="virv__meta-label">Company Name</ui-table-cell>
                <ui-table-cell class="virv__meta-value">{{ invoice.companyName }}</ui-table-cell>
                <ui-table-cell class="virv__meta-label">Invoice Number</ui-table-cell>
                <ui-table-cell class="virv__meta-value">{{ invoice.invoiceNumber }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row [hoverable]="false">
                <ui-table-cell class="virv__meta-label">VAT Registration No</ui-table-cell>
                <ui-table-cell class="virv__meta-value">{{ invoice.vatRegistrationNo }}</ui-table-cell>
                <ui-table-cell class="virv__meta-label">Period</ui-table-cell>
                <ui-table-cell class="virv__meta-value">{{ invoice.period }}</ui-table-cell>
              </ui-table-row>
            </ui-table-body>
          </ui-table>

          <ui-table class="virv__line-table" [bordered]="true" [striped]="true">
            <ui-table-head>
              <ui-table-row [header]="true">
                <ui-table-header-cell>Description</ui-table-header-cell>
                <ui-table-header-cell align="right">Amount (AED)</ui-table-header-cell>
                <ui-table-header-cell align="right">VAT (AED)</ui-table-header-cell>
              </ui-table-row>
            </ui-table-head>
            <ui-table-body>
              <ui-table-row *ngFor="let li of invoice.lineItems" [hoverable]="false">
                <ui-table-cell>{{ li.description }}</ui-table-cell>
                <ui-table-cell align="right">{{ li.amount | number:'1.2-2' }}</ui-table-cell>
                <ui-table-cell align="right">{{ li.vatAmount | number:'1.2-2' }}</ui-table-cell>
              </ui-table-row>
            </ui-table-body>
            <ui-table-foot>
              <ui-table-row [hoverable]="false">
                <ui-table-cell class="virv__total-label">Total VAT</ui-table-cell>
                <ui-table-cell></ui-table-cell>
                <ui-table-cell class="virv__td-num virv__total-value">{{ totalVAT | number:'1.2-2' }}</ui-table-cell>
              </ui-table-row>
            </ui-table-foot>
          </ui-table>

          <div class="virv__dl-row">
            <ui-button class="virv__dl-btn" variant="primary" label="Download PDF" (click)="downloadPDF.emit(invoice)">
              <span slot="icon-start">&#11015;</span>
            </ui-button>
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
      --input-padding: 6px 8px;
    }

    .virv__title { font-size: 16px; color: #1a1a1a; font-weight: normal; margin-bottom: 12px; }
    .virv__panel { background: #e8f4fb; border: 1px solid #a8c8e0; padding: 14px 16px; margin-bottom: 16px; }
    .virv__error {
      background: #fff0f0; border: 1px solid #f5c6cb; color: #721c24;
      padding: 8px 12px; font-size: 12px; margin-bottom: 10px; border-radius: 2px;
    }

    .virv__type-row, .virv__mode-row { margin-bottom: 8px; }
    :host ::ng-deep .virv__type-row ui-radio-group .radio-label,
    :host ::ng-deep .virv__mode-row ui-radio-group .radio-label { font-size: 12px; }

    .virv__input-block { margin-top: 8px; margin-bottom: 12px; max-width: 480px; }
    .virv__gen-btn {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf); --btn-color: #fff;
      --btn-border: 1px solid #005fba; --btn-radius: 0; --btn-padding: 6px 18px; --btn-font-size: 12px;
    }

    .virv__result { border: 1px solid #a8c8e0; }
    .virv__result-header {
      background: #b8d4ef; color: #1a3c5e; font-weight: bold;
      padding: 7px 12px; border-bottom: 1px solid #a8c8e0; font-size: 12px;
    }
    .virv__result-body { padding: 14px 16px; }

    :host ::ng-deep .virv__meta-table { margin-bottom: 14px; }
    .virv__meta-label { font-weight: bold; color: #555; width: 150px; white-space: nowrap; }
    .virv__meta-value { color: #1a1a1a; }

    :host ::ng-deep .virv__line-table {
      --table-border-color: #d0d8e0;
      --table-header-bg: #b8d4ef;
      --table-stripe-bg: #f0f7ff;
      --table-header-padding: 5px 10px;
    }
    :host ::ng-deep .virv__line-table ui-table-header-cell { color: #1a3c5e; }

    .virv__total-label {
      font-weight: bold; text-align: right; color: #333; border: 1px solid #d0d8e0; padding: 5px 10px;
    }
    .virv__td-num { text-align: right; }
    .virv__total-value { font-weight: bold; color: #1a1a1a; background: #e8f4fb; }

    .virv__dl-row { margin-top: 12px; }
    .virv__dl-btn {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf); --btn-color: #fff;
      --btn-border: 1px solid #005fba; --btn-radius: 0; --btn-padding: 6px 16px; --btn-font-size: 12px;
    }
  `],
})
export class AmexVATInvoiceReportViewComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `vat-invoice-report-view-${++AmexVATInvoiceReportViewComponent._idCounter}`;

  @Input() customerType: 'corporate' | 'consumer' = 'corporate';
  @Input() searchMode: 'vat' | 'invoice' | 'account' = 'invoice';
  @Input() searchValue = '';
  @Input() errorMessage = '';
  @Input() invoice: {
    companyName: string;
    vatRegistrationNo: string;
    invoiceNumber: string;
    period: string;
    lineItems: VATLineItem[];
  } | null = null;

  readonly customerTypeOptions = [
    { value: 'corporate', label: 'Corporate' },
    { value: 'consumer', label: 'Consumer' },
  ];
  readonly searchModeOptions = [
    { value: 'vat', label: 'VAT Registration Number' },
    { value: 'invoice', label: 'Invoice Number' },
    { value: 'account', label: 'Basic Control Account' },
  ];

  get searchValueLabel(): string {
    return this.searchMode === 'vat' ? 'VAT Registration Number'
      : this.searchMode === 'invoice' ? 'Invoice Number'
      : 'Basic Control Account';
  }
  get searchValuePlaceholder(): string {
    return this.searchMode === 'vat' ? 'Enter VAT Reg Number'
      : this.searchMode === 'invoice' ? 'Enter Invoice Number'
      : 'Enter Account Number';
  }

  get totalVAT(): number {
    if (!this.invoice) return 0;
    return this.invoice.lineItems.reduce((sum, li) => sum + li.vatAmount, 0);
  }

  @Output() generate = new EventEmitter<{ type: string; mode: string; value: string }>();
  @Output() downloadPDF = new EventEmitter<unknown>();
}