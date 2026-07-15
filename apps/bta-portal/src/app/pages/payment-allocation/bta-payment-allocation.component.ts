import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageHeaderComponent, AmexBreadcrumbTrailComponent } from '@ui-components/ui';

interface Transaction {
  date: string; description: string; amount: number;
  reference: string; status: string; allocated: boolean;
}

@Component({
  selector: 'app-bta-payment-allocation',
  imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
  templateUrl: './bta-payment-allocation.component.html',
  styleUrls: ['./bta-payment-allocation.component.css'],
})

export class BtaPaymentAllocationComponent {
  view = '';
  selectedAccount = '';
  accountError = '';
  allocationError = '';
  allocationSuccess = '';

  accounts = [
    { value:'BTACLIENTBAH001-3744XXXXXXX5229', label:'BTACLIENTBAH001-3744XXXXXXX5229' },
    { value:'BTACLIENTBAH002-3744XXXXXXX6130', label:'BTACLIENTBAH002-3744XXXXXXX6130' },
  ];

  unbilledTransactions: Transaction[] = [
    { date:'15/03/2025', description:'Emirates Airlines - Ticket', reference:'EMR-290344', amount:450.750, status:'Unbilled', allocated:false },
    { date:'18/03/2025', description:'Hilton Dubai – Hotel Stay',  reference:'HTL-192833', amount:289.500, status:'Unbilled', allocated:false },
    { date:'20/03/2025', description:'Hertz Car Rental',           reference:'CAR-003921', amount:85.000,  status:'Unbilled', allocated:false },
  ];

  billedTransactions: Transaction[] = [
    { date:'01/02/2025', description:'Etihad Airways – Business Class', reference:'ETH-110293', amount:1250.000, status:'Billed', allocated:true  },
    { date:'05/02/2025', description:'Rotana Hotel Abu Dhabi',          reference:'ROT-884432', amount:320.500,  status:'Billed', allocated:false },
  ];

  get currentTransactions() {
    return this.view === 'unbilled' ? this.unbilledTransactions : this.billedTransactions;
  }

  openView(type: string) {
    this.accountError = '';

    if (!this.selectedAccount) {
      this.accountError = 'Please select a BTA Account before viewing transactions.';
      return;
    }

    this.allocationError = '';
    this.allocationSuccess = '';
    this.view = type;
  }

  allocate() {
    this.allocationError = '';
    this.allocationSuccess = '';

    const selected = this.currentTransactions.filter(t => t.allocated);

    if (selected.length === 0) {
      this.allocationError = 'Please select at least one transaction to allocate.';
      return;
    }

    this.allocationSuccess = `${selected.length} transaction(s) allocated successfully.`;

    setTimeout(() => { this.allocationSuccess = ''; }, 3000);
  }

  resetView() {
    this.view = '';
    this.accountError = '';
    this.allocationError = '';
    this.allocationSuccess = '';
  }
}