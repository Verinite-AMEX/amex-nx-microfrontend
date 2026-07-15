import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface TravelRequest {
  id: string; traveler: string; destination: string; departure: string;
  returnDate: string; amount: number; status: 'approved' | 'pending' | 'rejected' | 'cancelled';
  type: string; purpose: string; bookedBy: string;
}

@Component({
  selector: 'app-bta-travel',
  templateUrl: './bta-travel.component.html',
  styleUrls: ['./bta-travel.component.css'],
})

export class BtaTravelComponent {
  showNewForm = false;
  activeFilter = 'All';
  searchTerm = '';
  filters = ['All', 'Pending', 'Approved', 'Rejected'];
  formSubmitted = false;
  successMsg = '';
  errors: Record<string, string> = {};
  today = new Date().toISOString().split('T')[0];

  newReq = {
    traveler: '', destination: '', departure: '', returnDate: '',
    amount: 0, type: '', purpose: '',
  };

  requests: TravelRequest[] = [
    { id: 'TR-2025-001', traveler: 'Sarah Johnson',    destination: 'New York, NY',      departure: '2025-06-10', returnDate: '2025-06-14', amount: 3200,  status: 'approved', type: 'Conference',       purpose: 'Q2 Leadership Summit',         bookedBy: 'Self' },
    { id: 'TR-2025-002', traveler: 'Michael Chen',     destination: 'London, UK',        departure: '2025-06-15', returnDate: '2025-06-22', amount: 8750,  status: 'pending',  type: 'Client Visit',     purpose: 'Barclays Account Review',      bookedBy: 'Travel Desk' },
    { id: 'TR-2025-003', traveler: 'Amanda Rodriguez', destination: 'Chicago, IL',       departure: '2025-06-18', returnDate: '2025-06-19', amount: 1400,  status: 'approved', type: 'Internal Meeting', purpose: 'Risk Team Workshop',           bookedBy: 'Self' },
    { id: 'TR-2025-004', traveler: 'David Park',       destination: 'San Francisco, CA', departure: '2025-06-20', returnDate: '2025-06-24', amount: 4100,  status: 'pending',  type: 'Sales Call',       purpose: 'New Client Onboarding',        bookedBy: 'Travel Desk' },
    { id: 'TR-2025-005', traveler: 'Emily Watson',     destination: 'Toronto, Canada',   departure: '2025-06-25', returnDate: '2025-06-27', amount: 2850,  status: 'rejected', type: 'Conference',       purpose: 'FinTech North 2025',           bookedBy: 'Self' },
    { id: 'TR-2025-006', traveler: 'James Liu',        destination: 'Singapore',         departure: '2025-07-02', returnDate: '2025-07-10', amount: 12400, status: 'pending',  type: 'Client Visit',     purpose: 'APAC Account Expansion',       bookedBy: 'Travel Desk' },
    { id: 'TR-2025-007', traveler: 'Priya Sharma',     destination: 'Dallas, TX',        departure: '2025-07-05', returnDate: '2025-07-06', amount: 980,   status: 'approved', type: 'Training',         purpose: 'Compliance Certification',     bookedBy: 'Self' },
    { id: 'TR-2025-008', traveler: 'Robert Taylor',    destination: 'Miami, FL',         departure: '2025-07-08', returnDate: '2025-07-11', amount: 2100,  status: 'cancelled',type: 'Sales Call',       purpose: 'Prospect Meeting — cancelled', bookedBy: 'Self' },
  ];

  get filteredRequests(): TravelRequest[] {
    return this.requests.filter(r => {
      const matchStatus = this.activeFilter === 'All' || r.status === this.activeFilter.toLowerCase();
      const matchSearch = !this.searchTerm ||
        r.traveler.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.destination.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }

  validate(): boolean {
    this.errors = {};

    if (!this.newReq.traveler.trim())
      this.errors['traveler'] = 'Traveler Name is required.';
    else if (this.newReq.traveler.trim().length < 2)
      this.errors['traveler'] = 'Name must be at least 2 characters.';

    if (!this.newReq.type)
      this.errors['type'] = 'Travel Type is required.';

    if (!this.newReq.destination.trim())
      this.errors['destination'] = 'Destination is required.';

    if (!this.newReq.purpose.trim())
      this.errors['purpose'] = 'Purpose is required.';

    if (!this.newReq.departure)
      this.errors['departure'] = 'Departure Date is required.';
    else if (this.newReq.departure < this.today)
      this.errors['departure'] = 'Departure Date cannot be in the past.';

    if (!this.newReq.returnDate)
      this.errors['returnDate'] = 'Return Date is required.';
    else if (this.newReq.departure && this.newReq.returnDate < this.newReq.departure)
      this.errors['returnDate'] = 'Return Date must be on or after Departure Date.';

    if (!this.newReq.amount || Number(this.newReq.amount) <= 0)
      this.errors['amount'] = 'Amount must be greater than 0.';
    else if (Number(this.newReq.amount) > 999999)
      this.errors['amount'] = 'Amount seems too high. Please verify.';

    return Object.keys(this.errors).length === 0;
  }

  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  toggleForm() {
    this.showNewForm = !this.showNewForm;
    if (!this.showNewForm) this.resetForm();
  }

  cancelForm() {
    this.resetForm();
    this.showNewForm = false;
  }

  resetForm() {
    this.formSubmitted = false;
    this.successMsg = '';
    this.errors = {};
    this.newReq = { traveler: '', destination: '', departure: '', returnDate: '', amount: 0, type: '', purpose: '' };
  }

  submitRequest(): void {
    this.formSubmitted = true;
    if (!this.validate()) return;

    const nextId = `TR-2025-${String(this.requests.length + 1).padStart(3, '0')}`;
    this.requests.unshift({
      id: nextId,
      traveler:    this.newReq.traveler.trim(),
      destination: this.newReq.destination.trim(),
      departure:   this.newReq.departure,
      returnDate:  this.newReq.returnDate,
      amount:      Number(this.newReq.amount),
      type:        this.newReq.type,
      purpose:     this.newReq.purpose.trim(),
      status:      'pending',
      bookedBy:    'Self',
    });

    this.successMsg = `Travel request ${nextId} submitted successfully.`;
    setTimeout(() => { this.resetForm(); this.showNewForm = false; }, 1500);
  }

  updateStatus(req: TravelRequest, status: 'approved' | 'rejected'): void {
    req.status = status;
  }

  navigate(path: string): void {
    const url = path ? ['/bta', path] : ['/bta'];
    this.router.navigate(url);
  }

  constructor(private router: Router) {}
}