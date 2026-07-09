import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PaymentTransaction {
  date: string;
  description: string;
  amount: string;
  selected?: boolean;
}

/**
 * PaymentAllocationForm
 * BTA: Account number input, Billed/Unbilled transaction tabs, amount fields.
 * Source: BTA (Corporate Admin) — BTA light-blue panel style
 */
@Component({
  selector: 'amex-payment-allocation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="paf">
      <div class="paf__panel-header">Payment Allocation</div>
      <div class="paf__body">
        <!-- Account selector -->
        <div class="paf__field">
          <label class="paf__label" [for]="id + '-account-number'">Account Number</label>
          <select [id]="id + '-account-number'" class="paf__select" [(ngModel)]="selectedAccount"
            (ngModelChange)="accountChange.emit(selectedAccount)">
            <option value="">-- Select Account --</option>
            <option *ngFor="let a of accounts" [value]="a.value">{{ a.label }}</option>
          </select>
        </div>

        <!-- Billed / Unbilled tabs -->
        <div class="paf__tabs">
          <button class="paf__tab" [class.paf__tab--active]="activeTab === 'billed'"
            (click)="activeTab = 'billed'">Billed</button>
          <button class="paf__tab" [class.paf__tab--active]="activeTab === 'unbilled'"
            (click)="activeTab = 'unbilled'">Unbilled</button>
        </div>

        <!-- Transactions list -->
        <table class="paf__table">
          <thead>
            <tr class="paf__head">
              <th class="paf__th" scope="col">Date</th>
              <th class="paf__th" scope="col">Description</th>
              <th class="paf__th paf__th--num" scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let t of activeTransactions" class="paf__row">
              <td class="paf__td">{{ t.date }}</td>
              <td class="paf__td">{{ t.description }}</td>
              <td class="paf__td paf__td--num">{{ t.amount }}</td>
            </tr>
            <tr *ngIf="!activeTransactions.length">
              <td colspan="3" class="paf__empty">No transactions found.</td>
            </tr>
          </tbody>
        </table>

        <div class="paf__actions">
          <button class="paf__btn paf__btn--cancel" (click)="cancelClick.emit()">Cancel</button>
          <button class="paf__btn paf__btn--submit" (click)="submitClick.emit(selectedAccount)">Submit</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .paf__panel-header { background: #b8d8f0; padding: 8px 14px; font-size: 13px; font-weight: bold; color: #1a3a6b; border: 1px solid #a0c0d8; border-bottom: none; }
    .paf__body { border: 1px solid #b0cce0; background: #fff; padding: 16px 18px; }
    .paf__field { margin-bottom: 14px; }
    .paf__label { display: block; font-size: 13px; color: #333; font-weight: bold; margin-bottom: 5px; }
    .paf__select { border: 1px solid #aaa; padding: 5px 8px; font-size: 13px; font-family: Arial, sans-serif; width: 100%; max-width: 320px; }
    .paf__tabs { display: flex; margin-bottom: 10px; border-bottom: 2px solid #1a7abf; }
    .paf__tab { padding: 6px 18px; font-size: 13px; cursor: pointer; border: 1px solid #ccc; border-bottom: none; background: #f0f0f0; color: #555; font-family: Arial, sans-serif; }
    .paf__tab--active { background: #1a7abf; color: #fff; border-color: #1a7abf; }
    .paf__table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 14px; }
    .paf__head { background: #d6eaf8; }
    .paf__th { padding: 6px 10px; border: 1px solid #b8d4ea; font-size: 12px; font-weight: bold; color: #1a3a6b; text-align: left; }
    .paf__th--num { text-align: right; }
    .paf__row { border-bottom: 1px solid #eee; }
    .paf__row:hover { background: #f5f9ff; }
    .paf__td { padding: 7px 10px; border: 1px solid #e8eef4; font-size: 13px; color: #333; }
    .paf__td--num { text-align: right; }
    .paf__empty { text-align: center; padding: 16px; color: #888; font-size: 13px; }
    .paf__actions { display: flex; gap: 8px; }
    .paf__btn { padding: 5px 18px; font-size: 13px; cursor: pointer; border-radius: 2px; font-family: Arial, sans-serif; }
    .paf__btn--cancel { background: linear-gradient(to bottom, #f5f5f5, #ddd); border: 1px solid #bbb; color: #333; }
    .paf__btn--submit { background: linear-gradient(to bottom, #5ba3e0, #006fcf); border: 1px solid #005fba; color: #fff; }
    .paf__btn--submit:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
  `],
})
export class AmexPaymentAllocationFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `payment-allocation-form-${++AmexPaymentAllocationFormComponent._idCounter}`;


  @Input() accounts: { value: string; label: string }[] = [];
  @Input() billedTransactions: PaymentTransaction[] = [];
  @Input() unbilledTransactions: PaymentTransaction[] = [];
  selectedAccount = '';
  activeTab: 'billed' | 'unbilled' = 'billed';
  get activeTransactions() { return this.activeTab === 'billed' ? this.billedTransactions : this.unbilledTransactions; }
  @Output() accountChange = new EventEmitter<string>();
  @Output() submitClick   = new EventEmitter<string>();
  @Output() cancelClick   = new EventEmitter<void>();
}
