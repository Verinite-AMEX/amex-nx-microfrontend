import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmexPaymentRegisterTableComponent, PaymentRegisterRow } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-payment-register',
  standalone: true,
  imports: [AmexPaymentRegisterTableComponent],
  template: `
    <amex-payment-register-table
      title="Payment Register"
      [rows]="records"
      (printClick)="onPrint()">
    </amex-payment-register-table>
  `
})
export class PaymentRegister implements OnInit {
  // Interface: { date, location, currency, amount, reference }
  records: PaymentRegisterRow[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TODO: Replace with PaymentRegisterService API call
    this.records = [];
  }

  onPrint(): void {
    window.print();
  }

  onBack(): void {
    this.router.navigate(['algeria-payment']);
  }
}