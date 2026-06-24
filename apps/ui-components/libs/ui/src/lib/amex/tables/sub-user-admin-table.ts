import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SubUserRow {
  name: string;
  email: string;
  role: string;
  status: string;
}

/**
 * SubUserAdminTable
 * OMS sub-user list under a Merchant account. Edit/Delete per row.
 * Source: OMS Portal — OMS style, light blue header, purple accent
 */
@Component({
  selector: 'amex-sub-user-admin-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="suat">
      <div class="suat__toolbar">
        <span class="suat__title">{{ title }}</span>
        <button *ngIf="showCreate" class="suat__create-btn" (click)="createClick.emit()">
          {{ createLabel }}
        </button>
      </div>
      <div class="suat__accent"></div>

      <table class="suat__table">
        <thead>
          <tr class="suat__head-row">
            <th class="suat__th">Name</th>
            <th class="suat__th">Email</th>
            <th class="suat__th">Role</th>
            <th class="suat__th">Status</th>
            <th class="suat__th suat__th--actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="suat__row">
            <td class="suat__td">{{ row.name }}</td>
            <td class="suat__td suat__td--email">{{ row.email }}</td>
            <td class="suat__td">{{ row.role }}</td>
            <td class="suat__td">
              <span [class.suat__active]="row.status==='Active'"
                    [class.suat__inactive]="row.status==='Inactive'">
                {{ row.status }}
              </span>
            </td>
            <td class="suat__td suat__td--actions">
              <button class="suat__btn suat__btn--edit"   (click)="actionClick.emit({action:'edit',row})">Edit</button>
              <button class="suat__btn suat__btn--delete" (click)="actionClick.emit({action:'delete',row})">Delete</button>
            </td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="5" class="suat__empty">No sub-users found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .suat__toolbar { display: flex; justify-content: space-between; align-items: center; padding: 14px 0 8px; }
    .suat__title { font-size: 15px; font-weight: bold; color: #1a1a1a; text-transform: uppercase; }
    .suat__create-btn { background: #1e3a5f; color: #fff; border: none; padding: 7px 16px; font-size: 13px; font-weight: bold; cursor: pointer; border-radius: 3px; font-family: Arial, sans-serif; }
    .suat__create-btn:hover { background: #16304f; }
    .suat__accent { height: 3px; background: #7b1fa2; margin-bottom: 12px; }
    .suat__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .suat__head-row { background: #d6eaf8; }
    .suat__th { padding: 8px 12px; text-align: left; font-size: 12px; font-weight: bold; color: #1a3a6b; border: 1px solid #b8d4ea; }
    .suat__th--actions { text-align: center; }
    .suat__row { border-bottom: 1px solid #eee; }
    .suat__row:hover { background: #f5f9ff; }
    .suat__td { padding: 9px 12px; border: 1px solid #e8eef4; font-size: 13px; color: #333; text-align: center; }
    .suat__td--email { color: #1a3a6b; }
    .suat__td--actions { white-space: nowrap; }
    .suat__active { color: #333; }
    .suat__inactive { color: #c62828; }
    .suat__btn { border: none; padding: 4px 12px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 3px; margin: 2px; font-family: Arial, sans-serif; }
    .suat__btn--edit   { background: #1976d2; color: #fff; }
    .suat__btn--edit:hover { background: #1565c0; }
    .suat__btn--delete { background: #1976d2; color: #fff; }
    .suat__btn--delete:hover { background: #c62828; }
    .suat__empty { text-align: center; padding: 24px; color: #888; font-size: 13px; }
  `],
})
export class AmexSubUserAdminTableComponent {
  @Input() rows: SubUserRow[] = [];
  @Input() title = 'SUB USER ADMINISTRATION';
  @Input() showCreate = true;
  @Input() createLabel = 'Create Sub User';
  @Output() actionClick = new EventEmitter<{ action: string; row: SubUserRow }>();
  @Output() createClick = new EventEmitter<void>();
}
