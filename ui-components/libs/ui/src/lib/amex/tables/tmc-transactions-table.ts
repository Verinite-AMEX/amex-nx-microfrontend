import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../atoms/label';
import { SelectComponent, SelectOption } from '../../atoms/select';
import { ButtonComponent } from '../../atoms/button';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';

export interface TMCTransactionRow {
  date: string;
  amount: string;
  merchant: string;
  reference: string;
}

@Component({
  selector: 'amex-tmc-transactions-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule, LabelComponent, SelectComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="tmc">
      <div class="tmc__filter-bar">
        <ui-label class="tmc__filter-label" [forId]="id + '-index'">Index</ui-label>
        <ui-select [id]="id + '-index'" class="tmc__select"
          [options]="indexSelectOptions" placeholder="-- Select --"
          [(ngModel)]="selectedIndex" (ngModelChange)="indexChange.emit(selectedIndex)">
        </ui-select>
        <ui-button class="tmc__submit-btn" label="Submit" [size]="'sm'" (click)="submitClick.emit(selectedIndex)"></ui-button>
      </div>

      <ui-table class="tmc__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Date</ui-table-header-cell>
            <ui-table-header-cell [align]="'right'">Amount</ui-table-header-cell>
            <ui-table-header-cell>Merchant</ui-table-header-cell>
            <ui-table-header-cell>Reference</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell>{{ row.date }}</ui-table-cell>
            <ui-table-cell [align]="'right'">{{ row.amount }}</ui-table-cell>
            <ui-table-cell>{{ row.merchant }}</ui-table-cell>
            <ui-table-cell>{{ row.reference }}</ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="4" [align]="'center'" class="tmc__empty">No transactions found.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .tmc__filter-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: #e8f4fb; border: 1px solid #b0cce0; margin-bottom: 8px; }
    .tmc__select { min-width: 160px; }
    .tmc__empty { text-align: center; color: #888; font-size: 13px; padding: 24px 0; }
  `],
})
export class AmexTMCTransactionsTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `tmc-transactions-table-${++AmexTMCTransactionsTableComponent._idCounter}`;

  @Input() rows: TMCTransactionRow[] = [];
  @Input() indexOptions: { value: string; label: string }[] = [];
  selectedIndex = '';
  @Output() indexChange  = new EventEmitter<string>();
  @Output() submitClick  = new EventEmitter<string>();

  get indexSelectOptions(): SelectOption[] {
    return this.indexOptions.map(o => ({ label: o.label, value: o.value }));
  }
}