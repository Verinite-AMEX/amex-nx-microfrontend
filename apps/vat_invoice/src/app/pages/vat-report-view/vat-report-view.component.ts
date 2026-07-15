import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexVATInvoiceReportViewComponent } from '@ui-components/ui';
import { VatCustHomeComponent } from '../vat-cust-home-folder/vat-cust-home-component';
@Component({
  selector: 'vat-report-view',
  standalone: true,
  imports: [
    CommonModule,
    AmexVATInvoiceReportViewComponent,
    VatCustHomeComponent,
  ],
  templateUrl: './vat-report-view.component.html',
})
export class VatReportViewComponent {
  customerType: 'corporate' | 'consumer' = 'corporate';
  searchMode: 'vat' | 'invoice' | 'account' = 'invoice';
  searchValue = 'INV-2024-00123';
  errorMessage = '';
  invoice = null;
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
  onSearch(value: any) {
    console.log('Search:', value);
  }
}
