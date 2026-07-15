import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageHeaderComponent, AmexBreadcrumbTrailComponent } from '@ui-components/ui';

@Component({
  selector: 'app-bta-tmc-transactions',
  imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
  templateUrl: './bta-tmc-transactions.component.html',
  styleUrls: ['./bta-tmc-transactions.component.css'],
})

export class BtaTmcTransactionsComponent {
  selectedDate = '';
  selectedIndex = '';
  shown = false;
  submitted = false;
  errors: Record<string, string> = {};
  today = new Date().toISOString().split('T')[0];

  indices = ['Archive Transaction', 'Live Transaction', 'Pending Transaction', 'Rejected Transaction'];

  transactions: any[] = [];

  showTransactions() {
    this.submitted = true;
    this.errors = {};

    if (!this.selectedDate) {
      this.errors['date'] = 'Please select a valid Date.';
    } else if (this.selectedDate > this.today) {
      this.errors['date'] = 'Date cannot be a future date.';
    }

    if (!this.selectedIndex) {
      this.errors['index'] = 'Please select an index.';
    }

    if (Object.keys(this.errors).length > 0) return;

    this.shown = true;
  }

  goBack() {
    this.shown = false;
    this.submitted = false;
    this.errors = {};
  }
}