import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CaseManagementRow {
  caseId: string;
  subject: string;
  status: string;
  assignee: string;
  createdDate: string;
}

/**
 * CaseManagementList
 * BTA Travel Management case list with View/Comment actions.
 * Source: BTA (Travel Agent Master Admin)
 * Style: BTA portal — light blue header, bordered, action buttons
 */
@Component({
  selector: 'amex-case-management-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cml">
      <div class="cml__toolbar" *ngIf="showCreate">
        <button class="cml__create-btn" (click)="createClick.emit()">{{ createLabel }}</button>
      </div>
      <table class="cml__table">
        <thead>
          <tr class="cml__head-row">
            <th class="cml__th">Case ID</th>
            <th class="cml__th">Subject</th>
            <th class="cml__th">Status</th>
            <th class="cml__th">Assignee</th>
            <th class="cml__th">Created Date</th>
            <th class="cml__th cml__th--actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="cml__row">
            <td class="cml__td cml__td--id">{{ row.caseId }}</td>
            <td class="cml__td">{{ row.subject }}</td>
            <td class="cml__td">
              <span class="cml__status cml__status--{{ row.status.toLowerCase().replace(' ','-') }}">
                {{ row.status }}
              </span>
            </td>
            <td class="cml__td">{{ row.assignee }}</td>
            <td class="cml__td">{{ row.createdDate }}</td>
            <td class="cml__td cml__td--actions">
              <button class="cml__btn cml__btn--view"    (click)="actionClick.emit({action:'view',row})">View</button>
              <button class="cml__btn cml__btn--comment" (click)="actionClick.emit({action:'comment',row})">Comment</button>
            </td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="6" class="cml__empty">No cases found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .cml__toolbar { padding: 0 0 10px; }
    .cml__create-btn { background: #1a7abf; color: #fff; border: none; padding: 6px 16px; font-size: 13px; cursor: pointer; border-radius: 2px; font-family: Arial, sans-serif; }
    .cml__create-btn:hover { background: #155f96; }
    .cml__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .cml__head-row { background: #d6eaf8; }
    .cml__th { padding: 7px 10px; border: 1px solid #b8d4ea; font-size: 12px; font-weight: bold; color: #1a3a6b; text-align: left; }
    .cml__th--actions { text-align: center; }
    .cml__row { border-bottom: 1px solid #eee; }
    .cml__row:hover { background: #f5f9ff; }
    .cml__td { padding: 8px 10px; border: 1px solid #e8eef4; font-size: 13px; color: #333; }
    .cml__td--id { color: #1a3a6b; font-weight: bold; }
    .cml__td--actions { text-align: center; white-space: nowrap; }
    .cml__status { font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 10px; }
    .cml__status--open     { background: #e3f2fd; color: #1565c0; }
    .cml__status--closed   { background: #e8f5e9; color: #2e7d32; }
    .cml__status--pending  { background: #fff8e1; color: #f57f17; }
    .cml__status--resolved { background: #e8f5e9; color: #2e7d32; }
    .cml__btn { border: none; padding: 4px 10px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 3px; margin: 2px; font-family: Arial, sans-serif; }
    .cml__btn--view    { background: #1976d2; color: #fff; }
    .cml__btn--view:hover { background: #1565c0; }
    .cml__btn--comment { background: #1976d2; color: #fff; }
    .cml__btn--comment:hover { background: #1565c0; }
    .cml__empty { text-align: center; padding: 24px; color: #888; font-size: 13px; }
  `],
})
export class AmexCaseManagementListComponent {
  @Input() rows: CaseManagementRow[] = [];
  @Input() showCreate = false;
  @Input() createLabel = 'New Case';
  @Output() actionClick = new EventEmitter<{ action: string; row: CaseManagementRow }>();
  @Output() createClick = new EventEmitter<void>();
}
