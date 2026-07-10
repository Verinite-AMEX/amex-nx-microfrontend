import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AmexTaxInvoiceDeliveryFormComponent
} from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-tax-invoice-delivery',
  standalone: true,
  imports: [
    CommonModule,
    AmexTaxInvoiceDeliveryFormComponent
  ],
  templateUrl:
    './oms-tax-invoice-delivery.component.html',
})
export class OmsTaxInvoiceDeliveryComponent {

  @Input()
  showError = false;

  @Input()
  sectionTitle = 'Capture VAT Registration Details';

  @Output()
  backClicked = new EventEmitter<void>();

  handleClick(event: any) {

  const text =
    event.target?.innerText?.trim();

  console.log('Clicked:', text);

  if (
    text?.toLowerCase()
      .includes('back')
  ) {

    this.backClicked.emit();
  }
}
}