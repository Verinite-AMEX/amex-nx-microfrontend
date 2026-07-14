import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexPaymentRegisterTableComponent,
  AmexSuccessToastComponent,
  AmexErrorToastComponent,
  PaymentRegisterRow
} from '@ui-components/ui';

@Component({
  selector: 'app-payment-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexPaymentRegisterTableComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  templateUrl: './payment-register.html',
  styleUrl: './payment-register.css'
})
export class PaymentRegister implements OnInit {

  julianDay: string = '';
  year: string = new Date().getFullYear().toString();
  country: string = '';
  currency: string = '';
  referenceNumber: string = '';
  yearList: string[] = [];
  countryList: string[] = ['US', 'AE', 'EG', 'SA', 'BH', 'KW', 'OM', 'QA'];
  currencyList: string[] = ['USD', 'AED', 'EGP', 'SAR', 'BHD', 'KWD', 'OMR', 'QAR'];
  records: PaymentRegisterRow[] = [];
  isLoading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage = '';

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 10; y--) {
      this.yearList.push(y.toString());
    }
  }
  onViewReport(): void {
    this.isLoading = true;
    this.status = 'idle';
    setTimeout(() => {
      this.isLoading = false;
      this.records = [];
      if (this.records.length === 0) {
        this.status = 'error';
        this.statusMessage = 'No records found for the selected criteria.';
      }
    }, 800);
  }
  onPrint(): void {
    window.print();
  }
}