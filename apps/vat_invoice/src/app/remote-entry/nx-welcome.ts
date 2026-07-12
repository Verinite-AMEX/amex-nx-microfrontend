import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VatReportViewComponent } from '../pages/vat-report-view/vat-report-view.component';
import { VatInvoiceDetailsComponent } from '../pages/vat-invoice-details/vat-invoice-details.component';
import { VatInvoiceMockService } from '../services/vat-invoice-mock.service';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [
    CommonModule,
    VatReportViewComponent,
    VatInvoiceDetailsComponent
  ],
  templateUrl: './remote-entry.html',
  styles: [`
    .vat-invoice-content {
      width: 100%;
      padding: 16px;
    }

    vat-report-view {
      display: block;
      width: 100%;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {

  showInvoiceDetails = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private vatInvoiceService: VatInvoiceMockService
  ) {}

  onGenerateReport(invoiceNumber: string) {

    console.log('Invoice Number:', invoiceNumber);

    this.vatInvoiceService
      .generateInvoiceReport(invoiceNumber);

    this.showInvoiceDetails = true;
  }
}
