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
import { BadgeComponent } from '../../atoms/badge';

export interface SettlementRow {
  period: string;
  merchantAccount: string;
  settlementAmount: string;
  submissionsCount: string;
  status: string;
}

/**
 * SettlementSubmissionsTable
 * Statement Advice grid — OMS Settlement and Submissions page.
 * Source: OMS portal (all roles) — OMS style, gray header tabs, purple accent
 */
@Component({
  selector: 'amex-settlement-submissions-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule, LabelComponent, SelectComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent, BadgeComponent,
  ],
  template: `
    <div class="sst">
      <div class="sst__filter-bar" *ngIf="showMonthsFilter">
        <ui-label class="sst__filter-label" [forId]="id + '-view-last'">View last</ui-label>
        <ui-select [id]="id + '-view-last'" class="sst__months-select"
          [options]="monthSelectOptions" [(ngModel)]="selectedMonths"
          (ngModelChange)="monthsChange.emit(+selectedMonths)">
        </ui-select>
        <ui-button class="sst__submit-btn" label="Submit" [size]="'sm'"
          (click)="monthsChange.emit(+selectedMonths)"></ui-button>
      </div>

      <ui-table class="sst__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Period</ui-table-header-cell>
            <ui-table-header-cell>Merchant Account</ui-table-header-cell>
            <ui-table-header-cell [align]="'right'">Settlement Amount</ui-table-header-cell>
            <ui-table-header-cell [align]="'right'">Submissions</ui-table-header-cell>
            <ui-table-header-cell>Status</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell>{{ row.period }}</ui-table-cell>
            <ui-table-cell>{{ row.merchantAccount }}</ui-table-cell>
            <ui-table-cell [align]="'right'">{{ row.settlementAmount }}</ui-table-cell>
            <ui-table-cell [align]="'right'">{{ row.submissionsCount }}</ui-table-cell>
            <ui-table-cell>
              <ui-badge [label]="row.status" [variant]="statusVariant(row.status)" [size]="'sm'"></ui-badge>
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="5" [align]="'center'" class="sst__empty">No settlement data available.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .sst__filter-bar { display: flex; align-items: center; gap: 10px; padding: 10px 0 12px; }
    .sst__months-select { min-width: 120px; }
    .sst__submit-btn { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; }
    .sst__submit-btn:hover { --btn-bg: #6a1b9a; }
    .sst__empty { color: #888; font-size: 13px; padding: 24px 0; }
  `],
})
export class AmexSettlementSubmissionsTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `settlement-submissions-table-${++AmexSettlementSubmissionsTableComponent._idCounter}`;

  @Input() rows: SettlementRow[] = [];
  @Input() showMonthsFilter = true;
  @Input() monthOptions = [1, 3, 6, 12];
  selectedMonths = '3';
  @Output() monthsChange = new EventEmitter<number>();

  get monthSelectOptions(): SelectOption[] {
    return this.monthOptions.map(m => ({ label: `${m} months`, value: m }));
  }

  statusVariant(status: string): 'success' | 'error' | 'warning' | 'primary' | 'neutral' {
    const s = (status || '').toLowerCase();
    if (s === 'completed') return 'success';
    if (s === 'pending') return 'warning';
    if (s === 'failed') return 'error';
    if (s === 'processing') return 'primary';
    return 'neutral';
  }
}