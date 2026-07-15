// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, Output } from '@angular/core';

// import { ButtonComponent, AmexPaginatedTableComponent } from '@ui-components/ui';

// import { VatInvoice } from '../../models/vat-invoice.model';

// @Component({
//   selector: 'app-vat-invoice-report',
//   standalone: true,
//   imports: [CommonModule, ButtonComponent, AmexPaginatedTableComponent],
//   templateUrl: './vat-invoice-report.html',
//   styleUrl: './vat-invoice-report.css',
// })
// export class VatInvoiceReport {
//   @Input() invoice: VatInvoice | null = null;

//   @Output() downloadPDF = new EventEmitter<void>();

//   get totalVat(): number {
//     if (!this.invoice) {
//       return 0;
//     }

//     return this.invoice.lineItems.reduce(
//       (total, item) => total + item.vatAmount,
//       0,
//     );
//   }

//   downloadPdf(): void {
//     this.downloadPDF.emit();
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  ButtonComponent,
  AmexPaginatedTableComponent,
  AmexPaginatedColumn,
} from '@ui-components/ui';

import { VatInvoice } from '../../models/vat-invoice.model';

@Component({
  selector: 'app-vat-invoice-report',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AmexPaginatedTableComponent],
  templateUrl: './vat-invoice-report.html',
  styleUrl: './vat-invoice-report.css',
})
export class VatInvoiceReport {
  @Input() invoice: VatInvoice | null = null;

  @Output() downloadPDF = new EventEmitter<void>();

  invoiceColumns: AmexPaginatedColumn[] = [
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'amount',
      label: 'Amount (AED)',
    },
    {
      key: 'vat',
      label: 'VAT (AED)',
    },
  ];

  get invoiceRows() {
    if (!this.invoice) {
      return [];
    }

    return this.invoice.lineItems.map((item) => ({
      description: item.description,
      amount: item.amount.toFixed(2),
      vat: item.vatAmount.toFixed(2),
    }));
  }

  get totalVat(): number {
    if (!this.invoice) {
      return 0;
    }

    return this.invoice.lineItems.reduce(
      (total, item) => total + item.vatAmount,
      0,
    );
  }

  downloadPdf(): void {
    console.log('Download PDF clicked');
    this.downloadPDF.emit();
  }
}
