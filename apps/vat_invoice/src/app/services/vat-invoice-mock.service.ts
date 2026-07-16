import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { VatInvoice } from '../models/vat-invoice.model';

interface MockVatInvoice extends VatInvoice {
  controlAccount: string;
}

@Injectable({
  providedIn: 'root',
})
export class VatInvoiceMockService {
  // =====================================================
  // Selected Invoice
  // =====================================================

  private invoiceSubject = new BehaviorSubject<VatInvoice | null>(null);

  invoice$ = this.invoiceSubject.asObservable();

  // =====================================================
  // Mock Database
  // =====================================================

  private mockInvoices: MockVatInvoice[] = [
    {
      controlAccount: '1001',

      companyName: 'Al Mansouri Trading LLC',

      vatRegistrationNo: '100234567890003',

      invoiceNumber: 'INV-2024-00123',

      period: 'January 2024',

      lineItems: [
        {
          description: 'Annual Card Fee - Platinum',
          amount: 3000,
          vatAmount: 150,
        },
        {
          description: 'Supplementary Card Fee',
          amount: 500,
          vatAmount: 25,
        },
      ],
    },
    {
      controlAccount: '1002',

      companyName: 'Emirates Retail Group',

      vatRegistrationNo: '100987654321001',

      invoiceNumber: 'INV-2024-00124',

      period: 'February 2024',

      lineItems: [
        {
          description: 'Corporate Card Charges',
          amount: 4500,
          vatAmount: 225,
        },
        {
          description: 'Late Payment Charges',
          amount: 300,
          vatAmount: 15,
        },
      ],
    },
    {
      controlAccount: '1003',

      companyName: 'Dubai Logistics LLC',

      vatRegistrationNo: '100555888777002',

      invoiceNumber: 'INV-2024-00125',

      period: 'March 2024',

      lineItems: [
        {
          description: 'Business Platinum Annual Fee',
          amount: 6000,
          vatAmount: 300,
        },
      ],
    },
  ];

  // =====================================================
  // Search by Invoice Number
  // =====================================================

  generateInvoiceReport(invoiceNumber: string): void {
    const value = invoiceNumber.trim().toLowerCase();

    console.log('Searching Invoice:', value);

    this.searchInvoice(
      (invoice) => invoice.invoiceNumber.toLowerCase() === value,
    );
  }

  // =====================================================
  // Search by VAT Registration Number
  // =====================================================

  generateVatReport(vatRegistrationNo: string): void {
    const value = vatRegistrationNo.trim();

    console.log('Searching VAT:', value);

    this.searchInvoice((invoice) => invoice.vatRegistrationNo === value);
  }

  // =====================================================
  // Search by Basic Control Account
  // =====================================================

  generateControlAccountReport(controlAccount: string): void {
    const value = controlAccount.trim();

    console.log('Searching Control Account:', value);

    this.searchInvoice((invoice) => invoice.controlAccount === value);
  }

  // =====================================================
  // Common Search
  // =====================================================

  private searchInvoice(predicate: (invoice: MockVatInvoice) => boolean): void {
    setTimeout(() => {
      const foundInvoice = this.mockInvoices.find(predicate);

      this.publishResult(foundInvoice);
    }, 1000);
  }

  // =====================================================
  // Publish Result
  // =====================================================

  private publishResult(invoice: VatInvoice | undefined): void {
    if (invoice) {
      console.log('Invoice Found');
      console.log('Publishing Invoice:', invoice);
      this.invoiceSubject.next(invoice);
    } else {
      console.log('Invoice Not Found');
      this.invoiceSubject.next(null);
    }
  }
}
