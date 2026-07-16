import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexVATInvoiceReportViewComponent } from '@ui-components/ui';
import { VatInvoiceMockService } from '../../services/vat-invoice-mock.service';
import { VatInvoice } from '../../models/vat-invoice.model';
import { VatCustHomeComponent } from '../vat-cust-home-folder/vat-cust-home-component';

@Component({
  selector: 'vat-invoice-details',
  standalone: true,
  imports: [
    CommonModule,
    AmexVATInvoiceReportViewComponent,
    VatCustHomeComponent,
  ],
  templateUrl: './vat-invoice-details.component.html',
})
export class VatInvoiceDetailsComponent {
  constructor(private vatInvoiceService: VatInvoiceMockService) {}
  customerType: 'corporate' | 'consumer' = 'corporate';
  searchMode: 'vat' | 'invoice' | 'account' = 'invoice';
  searchValue = 'INV-2024-00123';
  errorMessage = '';
  invoice: VatInvoice | null = null;
  ngOnInit() {
    this.vatInvoiceService.invoice$.subscribe((data) => {
      this.invoice = data;
      console.log('Invoice Data:', data);
    });
  }
  @Output() generateReport = new EventEmitter<string>();
  onGenerateReport() {
    console.log('Generate Report clicked');
    this.generateReport.emit(this.searchValue);
  }
  handleClick(event: any) {
    const text = event.target?.innerText?.trim();
    console.log('Clicked Text:', text);
    if (text === 'Generate Report') {
      this.onGenerateReport();
    }
  }
}
