import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../atoms/label';
import { DateInputComponent } from '../../atoms/date-input';
import { SelectComponent, SelectOption } from '../../atoms/select';
import { ButtonComponent } from '../../atoms/button';
import { BadgeComponent } from '../../atoms/badge';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';

export interface AuditTrailRow {
  timestamp: string;
  userId: string;
  action: string;
  entityAffected: string;
  status: string;
}

/**
 * AuditTrailDetailTable
 * Filterable audit log — date range, user, action-type filters + results grid.
 * Source: Sub-User Admin / SOCROC audit views — ONLS portal style
 */
@Component({
  selector: 'amex-audit-trail-detail-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule, LabelComponent, SelectComponent, ButtonComponent, BadgeComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent, TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="atd">
      <!-- Filter bar -->
      <div class="atd__filters" *ngIf="showFilters">
        <div class="atd__filter-group">
          <ui-label class="atd__filter-label" [forId]="id + '-from-date'">From</ui-label>
          <ui-date-input [id]="id + '-from-date'" class="atd__filter-input" [(ngModel)]="fromDate"></ui-date-input>
        </div>
        <div class="atd__filter-group">
        <ui-label class="atd__filter-label" [forId]="id + '-to-date'">To</ui-label>
        <ui-date-input [id]="id + '-to-date'" class="atd__filter-input" [(ngModel)]="toDate"></ui-date-input>
        </div>
        <div class="atd__filter-group">
          <ui-label class="atd__filter-label" [forId]="id + '-action-type'">Action Type</ui-label>
          <ui-select [id]="id + '-action-type'" class="atd__filter-select"
            [options]="actionTypeOptions" [placeholder]="'All'" [(ngModel)]="selectedActionType">
          </ui-select>
        </div>
        <ui-button class="atd__search-btn" label="Search" [size]="'sm'"
          (click)="search.emit({ fromDate, toDate, actionType: selectedActionType })"></ui-button>
      </div>

      <ui-table class="atd__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Timestamp</ui-table-header-cell>
            <ui-table-header-cell>User ID</ui-table-header-cell>
            <ui-table-header-cell>Action</ui-table-header-cell>
            <ui-table-header-cell>Entity Affected</ui-table-header-cell>
            <ui-table-header-cell>Status</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell>{{ row.timestamp }}</ui-table-cell>
            <ui-table-cell>{{ row.userId }}</ui-table-cell>
            <ui-table-cell>{{ row.action }}</ui-table-cell>
            <ui-table-cell>{{ row.entityAffected }}</ui-table-cell>
            <ui-table-cell>
              <ui-badge [label]="row.status" [variant]="statusVariant(row.status)" [size]="'sm'"></ui-badge>
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="5" [align]="'center'" class="atd__empty">No audit records found.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .atd__filters { display: flex; align-items: flex-end; gap: 16px; padding: 10px 0 16px; flex-wrap: wrap; }
    .atd__filter-group { display: flex; flex-direction: column; gap: 4px; }
    .atd__filter-label { font-size: 12px; font-weight: bold; color: #555; }
    .atd__filter-input { --input-border: 1px solid #bbb; width: 150px; }
    .atd__filter-select { min-width: 160px; }
    .atd__search-btn { --btn-bg: #1a3a6b; --btn-color: #fff; --btn-radius: 3px; padding: 7px 20px; }
    .atd__search-btn:hover { --btn-bg: #16304f; }
    .atd__empty { color: #888; font-size: 13px; padding: 24px 0; }
  `],
})
export class AmexAuditTrailDetailTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `audit-trail-detail-table-${++AmexAuditTrailDetailTableComponent._idCounter}`;

  @Input() rows: AuditTrailRow[] = [];
  @Input() showFilters = true;
  @Input() actionTypeOptions: SelectOption[] = [];
  @Output() search = new EventEmitter<{ fromDate: string; toDate: string; actionType: string }>();

  fromDate = '';
  toDate = '';
  selectedActionType = '';

  statusVariant(status: string): 'success' | 'error' | 'warning' | 'primary' | 'neutral' {
    const s = (status || '').toLowerCase();
    if (s === 'success') return 'success';
    if (s === 'failed') return 'error';
    if (s === 'pending') return 'warning';
    return 'neutral';
  }
}