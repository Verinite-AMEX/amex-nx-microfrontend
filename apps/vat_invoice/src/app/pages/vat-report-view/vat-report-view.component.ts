import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexVATInvoiceReportViewComponent } from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'vat-report-view',
  standalone: true,
  imports: [
    CommonModule,
    AmexVATInvoiceReportViewComponent,
  ],
  templateUrl: './vat-report-view.component.html',
})
export class VatReportViewComponent {

  customerType: 'corporate' | 'consumer' = 'corporate';

  searchMode: 'vat' | 'invoice' | 'account' = 'invoice';

  searchValue = 'INV-2024-00123';

  errorMessage = '';

  invoice = null;

  // 👉 emit to parent
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

  // 👉 future API/mock integration
  onSearch(value: any) {
    console.log('Search:', value);
  }
}