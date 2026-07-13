import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageHeaderComponent, AmexBreadcrumbTrailComponent } from '@ui-components/ui';

@Component({
  selector: 'app-bta-tmc-transactions',
  imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
  template: `
    <amex-page-header portalStyle="onls" title="BTA TMC TRANSACTIONS"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'tmc',label:'TMC Transactions'}]"
      [showBack]="true" (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="bta-page">
      <div class="bta-panel">
        <div class="bta-panel-hd">BTA TMC Transactions</div>
        <div class="bta-panel-bd">

          <div class="filter-row">

            <label>Select a date: <span class="req">*</span></label>
            <div class="field-wrap">
              <input type="date" [(ngModel)]="selectedDate" class="bta-date-input"
                [max]="today"
                [class.field-error]="submitted && errors.date"/>
              <span *ngIf="submitted && errors.date" class="error-msg">{{ errors.date }}</span>
            </div>

            <label>Select an index: <span class="req">*</span></label>
            <div class="field-wrap">
              <select [(ngModel)]="selectedIndex" class="bta-select-md"
                [class.field-error]="submitted && errors.index">
                <option value="">-- Select Index --</option>
                <option *ngFor="let idx of indices" [value]="idx">{{ idx }}</option>
              </select>
              <span *ngIf="submitted && errors.index" class="error-msg">{{ errors.index }}</span>
            </div>

            <button class="bta-btn bta-btn-secondary" (click)="showTransactions()">Show TMC Transactions</button>

          </div>

          <div *ngIf="shown" style="margin-top:16px;">
            <div *ngIf="transactions.length === 0" class="no-records">
              No TMC transactions found for the selected date and index.
            </div>
            <table *ngIf="transactions.length" class="bta-table">
              <thead>
                <tr>
                  <th>Transaction Date</th><th>TMC Code</th><th>Description</th>
                  <th>Traveler</th><th>Route</th><th>Amount (BHD)</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let t of transactions">
                  <td>{{ t.date }}</td><td>{{ t.tmcCode }}</td><td>{{ t.desc }}</td>
                  <td>{{ t.traveler }}</td><td>{{ t.route }}</td>
                  <td class="amount">{{ t.amount | number:'1.3-3' }}</td>
                  <td>{{ t.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .bta-page        { padding:0 16px 24px; background:#fff; }
    .bta-panel       { border:1px solid #b8d0e8; border-radius:2px; overflow:hidden; margin-top:12px; }
    .bta-panel-hd    { background:#cfe2f3; border-bottom:1px solid #b8d0e8; padding:8px 14px; font-size:13px; font-weight:bold; color:#1e3a6e; }
    .bta-panel-bd    { padding:16px; }
    .filter-row      { display:flex; align-items:flex-start; gap:10px; flex-wrap:wrap; }
    .filter-row label { font-size:12px; font-weight:bold; color:#333; white-space:nowrap; padding-top:5px; }
    .field-wrap      { display:flex; flex-direction:column; gap:3px; }
    .bta-date-input  { padding:3px 8px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; }
    .bta-select-md   { padding:3px 8px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; min-width:200px; }
    .field-error     { border-color:#cc0000 !important; }
    .error-msg       { color:#cc0000; font-size:11px; }
    .req             { color:#cc0000; }
    .bta-btn         { padding:4px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; margin-top:2px; }
    .bta-btn-secondary { background:#fff; color:#333; border:1px solid #aaa; }
    .bta-btn-secondary:hover { background:#f5f5f5; }
    .no-records      { font-size:12px; color:#555; }
    .bta-table       { width:100%; border-collapse:collapse; font-size:12px; }
    .bta-table th    { background:#cfe2f3; border:1px solid #b8d0e8; padding:7px 10px; font-weight:bold; color:#1e3a6e; text-align:left; }
    .bta-table td    { border:1px solid #dde4ed; padding:7px 10px; }
    .amount          { text-align:right; font-family:monospace; }
  `]
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