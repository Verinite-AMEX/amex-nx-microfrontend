import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    AmexVATRegistrationFormComponent,
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-vat-registration',
  standalone: true,
  imports: [
    CommonModule,
    AmexVATRegistrationFormComponent
  ],
  templateUrl:
    './oms-vat-registration.component.html',
})
export class OmsVatRegistrationComponent {

    @Output()
    taxInvoiceDeliveryClicked = new EventEmitter<void>();

    @Output()
    uploadCertificateClicked = new EventEmitter<void>();

    @Output()
    downloadTaxInvoiceClicked = new EventEmitter<void>();

    onTaxInvoiceDelivery() {

    this.taxInvoiceDeliveryClicked.emit();
  }

  onUploadCertificate() {

    console.log(
        'Upload Certificate Clicked'
    );

    this.uploadCertificateClicked.emit();
    }

    onDownloadTaxInvoice() {

    console.log(
        'Download Tax Invoice Clicked'
    );

    this.downloadTaxInvoiceClicked.emit();
    }

  handleClick(event: any) {

  const text =
    event.target?.innerText?.trim();

  console.log('Clicked:', text);

  // TAX INVOICE DELIVERY
  if (
    text?.toLowerCase()
      .includes('tax invoice delivery')
  ) {

    this.onTaxInvoiceDelivery();
  }

  // UPLOAD CERTIFICATE
  if (
    text?.toLowerCase()
      .includes('upload certificate')
  ) {

    this.onUploadCertificate();
  }

   // DOWNLOAD TAX INVOICE
  if (
    text?.toLowerCase()
      .includes('download tax invoices')
  ) {

    this.onDownloadTaxInvoice();
  }
}
}