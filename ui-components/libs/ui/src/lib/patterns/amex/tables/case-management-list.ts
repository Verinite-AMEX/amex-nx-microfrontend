import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';
import { BadgeComponent } from '../../../primitives/badge';

export interface CaseManagementRow {
  caseId: string;
  subject: string;
  status: string;
  assignee: string;
  createdDate: string;
}

@Component({
  selector: 'amex-case-management-list',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent, BadgeComponent,
  ],
  template: `
    <div class="cml">
      <div class="cml__toolbar" *ngIf="showCreate">
        <ui-button class="cml__create-btn" [label]="createLabel" variant="primary" size="md" (click)="createClick.emit()"></ui-button>
      </div>
      <ui-table class="cml__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Case ID</ui-table-header-cell>
            <ui-table-header-cell>Subject</ui-table-header-cell>
            <ui-table-header-cell>Status</ui-table-header-cell>
            <ui-table-header-cell>Assignee</ui-table-header-cell>
            <ui-table-header-cell>Created Date</ui-table-header-cell>
            <ui-table-header-cell class="cml__th--actions">Actions</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell class="cml__td--id">{{ row.caseId }}</ui-table-cell>
            <ui-table-cell>{{ row.subject }}</ui-table-cell>
            <ui-table-cell>
              <ui-badge [label]="row.status" [variant]="statusVariant(row.status)" [size]="'sm'"></ui-badge>
            </ui-table-cell>
            <ui-table-cell>{{ row.assignee }}</ui-table-cell>
            <ui-table-cell>{{ row.createdDate }}</ui-table-cell>
            <ui-table-cell class="cml__td--actions">
              <ui-button class="cml__btn cml__btn--view" label="View" variant="primary" size="sm" (click)="actionClick.emit({action:'view',row})"></ui-button>
              <ui-button class="cml__btn cml__btn--comment" label="Comment" variant="primary" size="sm" (click)="actionClick.emit({action:'comment',row})"></ui-button>
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="6" [align]="'center'" class="cml__empty">No cases found.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .cml__toolbar { padding: 0 0 10px; }
    .cml__create-btn { --btn-bg: #1a7abf; --btn-color: #fff; --btn-radius: 2px; }
    .cml__create-btn:hover { --btn-bg: #155f96; }
    .cml__th--actions { text-align: center; }
    .cml__td--id { color: #1a3a6b; font-weight: bold; }
    .cml__td--actions { text-align: center; white-space: nowrap; }
    .cml__btn { --btn-bg: #1976d2; --btn-color: #fff; --btn-radius: 3px; margin: 2px; }
    .cml__btn--view:hover, .cml__btn--comment:hover { --btn-bg: #1565c0; }
    .cml__empty { text-align: center; color: #888; font-size: 13px; padding: 24px 0; }
  `],
})
export class AmexCaseManagementListComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-case-management-list-${++AmexCaseManagementListComponent._idCounter}`;

  @Input() rows: CaseManagementRow[] = [];
  @Input() showCreate = false;
  @Input() createLabel = 'New Case';
  @Output() actionClick = new EventEmitter<{ action: string; row: CaseManagementRow }>();
  @Output() createClick = new EventEmitter<void>();

  statusVariant(status: string): 'success' | 'error' | 'warning' | 'primary' | 'neutral' {
    const s = (status || '').toLowerCase();
    if (s === 'open') return 'primary';
    if (s === 'closed' || s === 'resolved') return 'success';
    if (s === 'pending') return 'warning';
    return 'neutral';
  }
}