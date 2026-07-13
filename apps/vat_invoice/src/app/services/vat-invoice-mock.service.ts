import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VatInvoice } from '../models/vat-invoice.model';

@Injectable({
  providedIn: 'root'
})
export class VatInvoiceMockService {
  private invoiceSubject =
    new BehaviorSubject<VatInvoice | null>(null);
  invoice$ = this.invoiceSubject.asObservable();
  private mockInvoices: VatInvoice[] = [
    {
      companyName: 'Al Mansouri Trading LLC',
      vatRegistrationNo: '100234567890003',
      invoiceNumber: 'INV-2024-00123',
      period: 'January 2024',
      lineItems: [
        {
          description: 'Annual Card Fee - Platinum',
          amount: 3000,
          vatAmount: 150
        },
        {
          description: 'Supplementary Card Fee',
          amount: 500,
          vatAmount: 25
        }
      ]
    },
    {
      companyName: 'Emirates Retail Group',
      vatRegistrationNo: '100987654321001',
      invoiceNumber: 'INV-2024-00124',
      period: 'February 2024',
      lineItems: [
        {
          description: 'Corporate Card Charges',
          amount: 4500,
          vatAmount: 225
        },
        {
          description: 'Late Payment Charges',
          amount: 300,
          vatAmount: 15
        }
      ]
    },
    {
      companyName: 'Dubai Logistics LLC',
      vatRegistrationNo: '100555888777002',
      invoiceNumber: 'INV-2024-00125',
      period: 'March 2024',
      lineItems: [
        {
          description: 'Business Platinum Annual Fee',
          amount: 6000,
          vatAmount: 300
        }
      ]
    }
  ];

  constructor() { /* empty */ }
  generateInvoiceReport(invoiceNumber: string) {
    console.log('Searching Invoice:', invoiceNumber);
    setTimeout(() => {
      const foundInvoice = this.mockInvoices.find(
        invoice =>
          invoice.invoiceNumber
            .toLowerCase()
            .trim() === invoiceNumber.toLowerCase().trim()
      );
      if (foundInvoice) {
        console.log('Invoice Found');
        this.invoiceSubject.next(foundInvoice);
      } else {
        console.log('Invoice Not Found');
        this.invoiceSubject.next(null);
      }
    }, 1500);
  }
}