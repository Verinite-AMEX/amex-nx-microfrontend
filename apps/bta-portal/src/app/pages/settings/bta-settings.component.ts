import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bta-settings',
  templateUrl: './bta-settings.component.html',
  styleUrls: ['./bta-settings.component.css'],
})

export class BtaSettingsComponent {
  saved = false;

  settings = {
    managerThreshold: 2000,
    vpThreshold: 5000,
    intlPreApproval: true,
    domesticMeals: 75,
    intlMeals: 120,
    receiptThreshold: 25,
    digitalReceipts: true,
  };

  notifications = [
    { label: 'New travel request submitted',       enabled: true  },
    { label: 'Request approved / rejected',        enabled: true  },
    { label: 'Expense report ready for review',    enabled: true  },
    { label: 'Policy exception flagged',           enabled: true  },
    { label: 'Reimbursement processed',            enabled: false },
    { label: 'Monthly summary digest',             enabled: false },
  ];

  save(): void {
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }

  reset(): void {
    this.settings = { managerThreshold: 2000, vpThreshold: 5000, intlPreApproval: true, domesticMeals: 75, intlMeals: 120, receiptThreshold: 25, digitalReceipts: true };
  }

  constructor(public router: Router) {}
}
