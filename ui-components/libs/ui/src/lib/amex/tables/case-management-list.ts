import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button';

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
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="cml">
      <div class="cml__toolbar" *ngIf="showCreate">
        <ui-button class="cml__create-btn" [label]="createLabel" variant="primary" size="md" (click)="createClick.emit()"></ui-button>
      </div>
      <table class="cml__table">
        <thead>
          <tr class="cml__head-row">
            <th class="cml__th" scope="col">Case ID</th>
            <th class="cml__th" scope="col">Subject</th>
            <th class="cml__th" scope="col">Status</th>
            <th class="cml__th" scope="col">Assignee</th>
            <th class="cml__th" scope="col">Created Date</th>
            <th class="cml__th cml__th--actions" scope="col">Actions</th>
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
              <ui-button class="cml__btn cml__btn--view" label="View" variant="primary" size="sm" (click)="actionClick.emit({action:'view',row})"></ui-button>
              <ui-button class="cml__btn cml__btn--comment" label="Comment" variant="primary" size="sm" (click)="actionClick.emit({action:'comment',row})"></ui-button>
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
    .cml__create-btn { --btn-bg: #1a7abf; --btn-color: #fff; --btn-radius: 2px; }
    .cml__create-btn:hover { --btn-bg: #155f96; }
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
    .cml__btn { --btn-bg: #1976d2; --btn-color: #fff; --btn-radius: 3px; margin: 2px; }
    .cml__btn--view:hover, .cml__btn--comment:hover { --btn-bg: #1565c0; }
    .cml__empty { text-align: center; padding: 24px; color: #888; font-size: 13px; }
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
}