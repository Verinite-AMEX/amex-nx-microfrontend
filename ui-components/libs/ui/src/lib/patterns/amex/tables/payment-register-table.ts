import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

export interface PaymentRegisterRow {
  date: string;
  location: string;
  currency: string;
  amount: string;
  reference: string;
}

/**
 * PaymentRegisterTable
 * SOC/ROC ledger-style payment entries with Print button.
 * Source: SOC/ROC (image40) — ONLS portal style
 */
@Component({
  selector: 'amex-payment-register-table',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="prt">
      <div class="prt__top-bar">
        <span class="prt__title">{{ title }}</span>
        <ui-button class="prt__print-btn" label="🖨 Print" variant="secondary" [size]="'sm'"
          (click)="printClick.emit()"></ui-button>
      </div>
      <ui-table class="prt__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Date</ui-table-header-cell>
            <ui-table-header-cell>Location</ui-table-header-cell>
            <ui-table-header-cell>Currency</ui-table-header-cell>
            <ui-table-header-cell [align]="'right'">Amount</ui-table-header-cell>
            <ui-table-header-cell>Reference</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell>{{ row.date }}</ui-table-cell>
            <ui-table-cell>{{ row.location }}</ui-table-cell>
            <ui-table-cell>{{ row.currency }}</ui-table-cell>
            <ui-table-cell [align]="'right'">{{ row.amount }}</ui-table-cell>
            <ui-table-cell>{{ row.reference }}</ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="5" [align]="'center'" class="prt__empty">No Data Found</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .prt__top-bar { display: flex; justify-content: space-between; align-items: center; padding: 6px 0 8px; border-bottom: 1px solid #ddd; margin-bottom: 6px; }
    .prt__title { font-size: 13px; font-weight: bold; color: #333; }
    .prt__print-btn { --btn-bg: transparent; --btn-color: #006fcf; --btn-border: 1px solid #006fcf; --btn-radius: 2px; }
    .prt__print-btn:hover { --btn-bg: #e8f0ff; }
    .prt__empty { font-weight: bold; font-size: 14px; color: #333; padding: 24px 0; }
  `],
})
export class AmexPaymentRegisterTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `payment-register-table-${++AmexPaymentRegisterTableComponent._idCounter}`;

  @Input() rows: PaymentRegisterRow[] = [];
  @Input() title = 'Payment Register';
  @Output() printClick = new EventEmitter<void>();
}