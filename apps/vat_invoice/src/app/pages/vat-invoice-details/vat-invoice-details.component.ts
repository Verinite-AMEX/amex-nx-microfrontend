import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexVATInvoiceReportViewComponent } from '@ui-components/ui';
import { VatInvoiceMockService } from '../../services/vat-invoice-mock.service';
import { VatInvoice } from '../../models/vat-invoice.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'vat-invoice-details',
  standalone: true,
  imports: [
    CommonModule,
    AmexVATInvoiceReportViewComponent
  ],
  templateUrl: './vat-invoice-details.component.html',
})
export class VatInvoiceDetailsComponent {

    constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private vatInvoiceService: VatInvoiceMockService
    ) {}

  customerType: 'corporate' | 'consumer' = 'corporate';

  searchMode: 'vat' | 'invoice' | 'account' = 'invoice';

  searchValue = 'INV-2024-00123';

  errorMessage = '';

  invoice: VatInvoice | null = null;

    ngOnInit() {

    this.vatInvoiceService.invoice$
        .subscribe(data => {

        this.invoice = data;

        console.log('Invoice Data:', data);
        });
    }      
    
    @Output() generateReport = new EventEmitter<string>();

  // 👉 Generate Report
  onGenerateReport() {

    console.log('Generate Report clicked');

    this.generateReport.emit(this.searchValue);
  }

  // 👉 detect button click from storybook component
  handleClick(event: any) {

    const text = event.target?.innerText?.trim();

    console.log('Clicked Text:', text);

    if (text === 'Generate Report') {
      this.onGenerateReport();
    }
  }
}
