import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmexAlgeriaPaymentFormComponent } from '@ui-components/ui';

@Component({
  selector: 'app-algeria-payment',
  standalone: true,
  imports: [AmexAlgeriaPaymentFormComponent],
  template: `
    <amex-algeria-payment-form
      [years]="yearList"
      (viewReport)="onViewReport($event)">
    </amex-algeria-payment-form>
  `
})
export class AlgeriaPayment implements OnInit {
  yearList: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 10; y--) {
      this.yearList.push(y.toString());
    }
  }

  onViewReport(data: any): void {
    // TODO: Replace with AlgeriaPaymentService API call
    console.log('Algeria payment view report:', data);
    this.router.navigate(['payment-register']);
  }
}