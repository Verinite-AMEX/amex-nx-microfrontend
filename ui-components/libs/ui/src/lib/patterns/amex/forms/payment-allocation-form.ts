import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../../composite/panel';
import { SelectComponent } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

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
  imports: [
    CommonModule, FormsModule, PanelComponent, SelectComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <ui-panel title="Payment Allocation" variant="band">
      <!-- Account selector -->
      <div class="paf__field">
        <ui-select
          [id]="id + '-account-number'"
          [options]="accountSelectOptions"
          placeholder="-- Select Account --"
          ariaLabel="Account Number"
          [(ngModel)]="selectedAccount"
          (ngModelChange)="accountChange.emit(selectedAccount)">
        </ui-select>
      </div>

      <!-- Billed / Unbilled tabs -->
      <div class="paf__tabs">
        <ui-button class="paf__tab" [class.paf__tab--active]="activeTab === 'billed'"
          variant="secondary" label="Billed" (click)="activeTab = 'billed'"></ui-button>
        <ui-button class="paf__tab" [class.paf__tab--active]="activeTab === 'unbilled'"
          variant="secondary" label="Unbilled" (click)="activeTab = 'unbilled'"></ui-button>
      </div>

      <!-- Transactions list -->
      <ui-table class="paf__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true">
            <ui-table-header-cell>Date</ui-table-header-cell>
            <ui-table-header-cell>Description</ui-table-header-cell>
            <ui-table-header-cell align="right">Amount</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let t of activeTransactions">
            <ui-table-cell>{{ t.date }}</ui-table-cell>
            <ui-table-cell>{{ t.description }}</ui-table-cell>
            <ui-table-cell align="right">{{ t.amount }}</ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!activeTransactions.length">
            <ui-table-cell [colspan]="3" class="paf__empty">No transactions found.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>

      <div class="paf__actions">
        <ui-button class="paf__btn paf__btn--cancel" variant="secondary" label="Cancel" (click)="cancelClick.emit()"></ui-button>
        <ui-button class="paf__btn paf__btn--submit" variant="primary" label="Submit" (click)="submitClick.emit(selectedAccount)"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --panel-band-bg: #b8d8f0;
      --panel-band-border: #a0c0d8;
      --table-head-bg: #d6eaf8;
      --table-border-color: #b8d4ea;
      --table-row-hover-bg: #f5f9ff;
    }
    .paf__field { margin-bottom: 14px; }
    .paf__tabs { display: flex; margin-bottom: 10px; border-bottom: 2px solid #1a7abf; }
    .paf__tab { --btn-bg: #f0f0f0; --btn-color: #555; --btn-radius: 0px; --btn-padding: 6px 18px; --btn-font-size: 13px; }
    .paf__tab--active { --btn-bg: #1a7abf; --btn-color: #fff; }
    .paf__table { margin-bottom: 14px; }
    .paf__empty { text-align: center; padding: 16px; color: #888; }
    .paf__actions { display: flex; gap: 8px; }
    .paf__btn--cancel { --btn-bg: linear-gradient(to bottom, #f5f5f5, #ddd); --btn-color: #333; --btn-radius: 2px; --btn-padding: 5px 18px; --btn-font-size: 13px; }
    .paf__btn--submit { --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf); --btn-color: #fff; --btn-radius: 2px; --btn-padding: 5px 18px; --btn-font-size: 13px; }
  `],
})
export class AmexPaymentAllocationFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `payment-allocation-form-${++AmexPaymentAllocationFormComponent._idCounter}`;

  @Input() accounts: { value: string; label: string }[] = [];
  @Input() billedTransactions: PaymentTransaction[] = [];
  @Input() unbilledTransactions: PaymentTransaction[] = [];
  selectedAccount = '';
  activeTab: 'billed' | 'unbilled' = 'billed';
  get activeTransactions() { return this.activeTab === 'billed' ? this.billedTransactions : this.unbilledTransactions; }
  get accountSelectOptions() { return this.accounts.map(a => ({ value: a.value, label: a.label })); }
  @Output() accountChange = new EventEmitter<string>();
  @Output() submitClick   = new EventEmitter<string>();
  @Output() cancelClick   = new EventEmitter<void>();
}