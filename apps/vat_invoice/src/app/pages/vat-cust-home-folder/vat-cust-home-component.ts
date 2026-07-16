import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import {
  RadioGroupComponent,
  RadioOption,
  InputComponent,
  AmexDropdownFilterComponent,
  ButtonComponent,
  AmexReportTableComponent,
  AmexReportTableConfig,
  AmexMasterDataTableComponent,
  MasterDataRow,
  AmexPaginatedTableComponent,
  AmexPaginatedColumn,
} from '@ui-components/ui';

import { VatInvoiceMockService } from '../../services/vat-invoice-mock.service';
import { VatInvoice } from '../../models/vat-invoice.model';
import { VatInvoiceReport } from '../vat-invoice-report/vat-invoice-report';

@Component({
  selector: 'app-vat-cust-home-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RadioGroupComponent,
    InputComponent,
    AmexDropdownFilterComponent,
    VatInvoiceReport,
    ButtonComponent,
    AmexReportTableComponent,
    AmexMasterDataTableComponent,
    AmexPaginatedTableComponent,
  ],
  templateUrl: './vat-cust-home-component.html',
  styleUrl: './vat-cust-home-component.css',
})
export class VatCustHomeComponent {
  customerTypeOptions: RadioOption[] = [
    {
      label: 'Corporate',
      value: 'Corporate',
    },
    {
      label: 'Consumer',
      value: 'Consumer',
    },
  ];

  searchTypeOptions: RadioOption[] = [
    {
      label: 'VAT Registration Number',
      value: 'vat',
    },
    {
      label: 'Invoice Number',
      value: 'invoice',
    },
    {
      label: 'Basic Control Account',
      value: 'control',
    },
  ];

  selectedCustomerType = 'Corporate';

  selectedSearchType: 'vat' | 'invoice' | 'control' = 'vat';

  impersonation = 'test';

  searchValue = '';

  selectedCountry = '';

  selectedMonth = '';

  selectedYear = '';

  showError = false;

  errorMessage = '';

  invoice: VatInvoice | null = null;

  hasSearched = false;

  countries = [
    'United Arab Emirates',
    'Saudi Arabia',
    'Bahrain',
    'Qatar',
    'Kuwait',
    'Oman',
  ];

  months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  years: string[] = [];

  constructor(
    private vatInvoiceMockService: VatInvoiceMockService,
    private cdr: ChangeDetectorRef,
  ) {
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 2020; year--) {
      this.years.push(year.toString());
    }

    this.selectedCountry = this.countries[0];
    this.selectedMonth = this.months[new Date().getMonth()];
    this.selectedYear = currentYear.toString();

    this.vatInvoiceMockService.invoice$.subscribe((invoice) => {
      console.log('Subscription fired');
      console.log(invoice);
      this.invoice = invoice;
      console.log('Received Invoice in component:', invoice);

      if (!this.hasSearched) {
        return;
      }

      if (invoice) {
        this.showError = false;
        this.errorMessage = '';
      } else {
        this.showError = true;
        this.errorMessage = 'No Tax Invoice with matching details.';
      }
      this.cdr.detectChanges();
    });
  }

  onCustomerTypeChange(value: string): void {
    this.selectedCustomerType = value;

    this.invoice = null;

    this.hasSearched = false;

    this.clearValidation();
  }

  onSearchTypeChange(value: 'vat' | 'invoice' | 'control'): void {
    this.selectedSearchType = value;

    this.searchValue = '';

    this.invoice = null;

    this.hasSearched = false;

    this.clearValidation();
  }

  generateReport(): void {
    this.invoice = null;
    this.showError = false;
    this.errorMessage = '';

    if (!this.validate()) {
      return;
    }

    this.hasSearched = true;

    switch (this.selectedSearchType) {
      case 'vat':
        this.vatInvoiceMockService.generateVatReport(this.searchValue);
        break;

      case 'invoice':
        this.vatInvoiceMockService.generateInvoiceReport(this.searchValue);
        break;

      case 'control':
        this.vatInvoiceMockService.generateControlAccountReport(
          this.searchValue,
        );
        break;
    }
  }

  private validate(): boolean {
    const value = this.searchValue.trim();

    if (!value) {
      this.showError = true;
      this.errorMessage = 'Please enter a value.';
      return false;
    }

    switch (this.selectedSearchType) {
      case 'vat':
        if (!/^\d{15}$/.test(value)) {
          this.showError = true;
          this.errorMessage =
            'VAT Registration Number must contain exactly 15 digits.';
          return false;
        }

        if (!this.selectedCountry) {
          this.showError = true;
          this.errorMessage = 'Please select a VAT Registered Country.';
          return false;
        }

        break;

      case 'invoice':
        if (!/^INV-\d{4}-\d{5}$/i.test(value)) {
          this.showError = true;
          this.errorMessage =
            'Invoice Number must be in the format INV-2024-00123.';
          return false;
        }

        break;

      case 'control':
        if (!/^\d{4}$/.test(value)) {
          this.showError = true;
          this.errorMessage = 'Basic Control Account must be a 4-digit number.';
          return false;
        }

        break;
    }

    return true;
  }

  private clearValidation(): void {
    this.showError = false;
    this.errorMessage = '';
  }

  downloadPdf(): void {
    console.log('Download PDF');
  }
}
