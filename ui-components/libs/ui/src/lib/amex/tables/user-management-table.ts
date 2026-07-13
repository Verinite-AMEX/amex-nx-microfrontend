import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AmexUserRow {
  userId: string;
  userName: string;
  emailAddress: string;
  creationDate: string;   /* dd/mm/yyyy */
  status: 'Active' | 'Inactive' | string;
}

export type UserTableAction = 'edit' | 'resetPassword' | 'delete';

@Component({
  selector: 'amex-user-management-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="umt">
      <!-- Title + Create button row — matches OMS screenshot -->
      <div class="umt__toolbar">
        <span class="umt__title">{{ title }}</span>
        <button class="umt__create-btn" *ngIf="showCreate" (click)="createClick.emit()">
          {{ createLabel }}
        </button>
      </div>

      <!-- Purple accent line -->
      <div class="umt__accent"></div>

      <table class="umt__table">
        <thead>
          <!-- Column header row with sort arrows -->
          <tr class="umt__head-row">
            <th class="umt__th" (click)="onSort('userId')" scope="col">
              User ID <span class="umt__sort">{{ sortIcon('userId') }}</span>
            </th>
            <th class="umt__th" (click)="onSort('userName')" scope="col">
              User Name <span class="umt__sort">{{ sortIcon('userName') }}</span>
            </th>
            <th class="umt__th" (click)="onSort('emailAddress')" scope="col">
              Email Address <span class="umt__sort">{{ sortIcon('emailAddress') }}</span>
            </th>
            <th class="umt__th" (click)="onSort('creationDate')" scope="col">
              Creation Date<br><span class="umt__th-sub">dd/mm/yyyy</span>
              <span class="umt__sort">{{ sortIcon('creationDate') }}</span>
            </th>
            <th class="umt__th" (click)="onSort('status')" scope="col">
              Status <span class="umt__sort">{{ sortIcon('status') }}</span>
            </th>
            <th class="umt__th umt__th--actions" scope="col">Actions</th>
          </tr>
          <!-- Per-column filter inputs row -->
          <tr class="umt__filter-row">
            <td class="umt__filter-cell">
              <input class="umt__filter-input" [(ngModel)]="f.userId"       (ngModelChange)="apply()" />
            </td>
            <td class="umt__filter-cell">
              <input class="umt__filter-input" [(ngModel)]="f.userName"     (ngModelChange)="apply()" />
            </td>
            <td class="umt__filter-cell">
              <input class="umt__filter-input" [(ngModel)]="f.emailAddress" (ngModelChange)="apply()" />
            </td>
            <td class="umt__filter-cell">
              <input class="umt__filter-input" [(ngModel)]="f.creationDate" (ngModelChange)="apply()" />
            </td>
            <td class="umt__filter-cell">
              <select class="umt__filter-select" [(ngModel)]="f.status" (ngModelChange)="apply()">
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </td>
            <td class="umt__filter-cell"></td>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of displayRows" class="umt__row">
            <td class="umt__td umt__td--link">{{ row.userId }}</td>
            <td class="umt__td umt__td--link">{{ row.userName }}</td>
            <td class="umt__td umt__td--link">{{ row.emailAddress }}</td>
            <td class="umt__td">{{ row.creationDate }}</td>
            <td class="umt__td">
              <span class="umt__status"
                [class.umt__status--active]="row.status === 'Active'"
                [class.umt__status--inactive]="row.status === 'Inactive'">
                {{ row.status }}
              </span>
            </td>
            <td class="umt__td umt__td--actions">
              <!-- Reset Password only if active (matches screenshot) -->
              <ng-container *ngIf="row.status === 'Active'">
                <button class="umt__btn umt__btn--reset"
                  (click)="actionClick.emit({action:'resetPassword',row})">
                  Reset Password
                </button>
              </ng-container>
              <button class="umt__btn umt__btn--edit"
                (click)="actionClick.emit({action:'edit',row})">
                Edit
              </button>
              <ng-container *ngIf="showDelete && row.status === 'Active'">
                <button class="umt__btn umt__btn--delete"
                  (click)="actionClick.emit({action:'delete',row})">
                  Delete
                </button>
              </ng-container>
            </td>
          </tr>
          <tr *ngIf="!displayRows.length">
            <td colspan="6" class="umt__empty">No users found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .umt { background: #fff; }

    .umt__toolbar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 16px 10px;
    }
    .umt__title {
      font-size: 16px; font-weight: bold; color: #1a1a1a;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .umt__create-btn {
      background: #1e3a5f; color: #fff; border: none;
      padding: 8px 18px; font-size: 13px; font-weight: bold;
      cursor: pointer; border-radius: 3px; font-family: Arial, sans-serif;
    }
    .umt__create-btn:hover { background: #16304f; }

    /* Purple accent line under title — matches OMS screenshot */
    .umt__accent {
      height: 3px; background: #7b1fa2;
      margin: 0 16px 12px;
    }

    .umt__table { width: 100%; border-collapse: collapse; font-size: 13px; }

    /* Header cells — light blue bg, matching OMS MRM screenshot exactly */
    .umt__head-row { background: #d6eaf8; }
    .umt__th {
      padding: 8px 12px; text-align: center;
      color: #1a3a6b; font-size: 12px; font-weight: bold;
      border: 1px solid #b8d4ea; cursor: pointer; white-space: nowrap;
    }
    .umt__th:hover { background: #c4dff5; }
    .umt__th--actions { cursor: default; }
    .umt__th-sub { font-size: 10px; font-weight: normal; color: #555; }
    .umt__sort { font-size: 10px; color: #1a3a6b; margin-left: 3px; }

    /* Filter row */
    .umt__filter-row { background: #eaf4fb; }
    .umt__filter-cell { padding: 4px 8px; border: 1px solid #b8d4ea; }
    .umt__filter-input {
      width: 100%; box-sizing: border-box; border: 1px solid #aac8e0;
      padding: 3px 6px; font-size: 12px; font-family: Arial, sans-serif;
      outline: none;
    }
    .umt__filter-input:focus { border-color: #006fcf; }
    .umt__filter-select {
      width: 100%; box-sizing: border-box; border: 1px solid #aac8e0;
      padding: 3px 4px; font-size: 12px; font-family: Arial, sans-serif;
    }

    /* Data rows */
    .umt__row { border-bottom: 1px solid #e8eef4; }
    .umt__row:hover { background: #f5f9ff; }
    .umt__td {
      padding: 10px 12px; border: 1px solid #e8eef4;
      font-size: 13px; text-align: center; color: #333;
    }
    .umt__td--link { color: #1a3a6b; }
    .umt__td--actions { white-space: nowrap; text-align: center; }

    /* Status — matches screenshot: "Inactive" = red text, "Active" = black */
    .umt__status--active   { color: #333; }
    .umt__status--inactive { color: #c62828; }

    /* Action buttons — exact match to OMS screenshot button style */
    .umt__btn {
      border: none; padding: 5px 12px; font-size: 12px; font-weight: bold;
      cursor: pointer; border-radius: 3px; margin: 2px;
      font-family: Arial, sans-serif; display: inline-block;
    }
    .umt__btn--edit  { background: #1976d2; color: #fff; }
    .umt__btn--edit:hover { background: #1565c0; }
    .umt__btn--reset { background: #1976d2; color: #fff; }
    .umt__btn--reset:hover { background: #1565c0; }
    .umt__btn--delete { background: #1976d2; color: #fff; }
    .umt__btn--delete:hover { background: #c62828; }

    .umt__empty {
      text-align: center; padding: 28px; font-size: 13px; color: #888;
    }
  `],
})
export class AmexUserManagementTableComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `user-management-table-${++AmexUserManagementTableComponent._idCounter}`;


  @Input() rows: AmexUserRow[] = [];
  @Input() title = 'MRM USER ADMINISTRATION';
  @Input() showCreate = true;
  @Input() createLabel = 'Create MRM User';
  @Input() showDelete = true;
  @Output() actionClick = new EventEmitter<{ action: UserTableAction; row: AmexUserRow }>();
  @Output() createClick = new EventEmitter<void>();

  f = { userId: '', userName: '', emailAddress: '', creationDate: '', status: '' };
  sortKey = '';
  sortDir: 'asc' | 'desc' | '' = '';
  displayRows: AmexUserRow[] = [];

  ngOnChanges() { this.apply(); }

  sortIcon(key: string) {
    if (this.sortKey !== key) return '⇕';
    return this.sortDir === 'asc' ? '▲' : '▼';
  }

  onSort(key: string) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : this.sortDir === 'desc' ? '' : 'asc';
    } else { this.sortKey = key; this.sortDir = 'asc'; }
    this.apply();
  }

  apply() {
    let r = [...this.rows];
    if (this.f.userId)       r = r.filter(x => x.userId.toLowerCase().includes(this.f.userId.toLowerCase()));
    if (this.f.userName)     r = r.filter(x => x.userName.toLowerCase().includes(this.f.userName.toLowerCase()));
    if (this.f.emailAddress) r = r.filter(x => x.emailAddress.toLowerCase().includes(this.f.emailAddress.toLowerCase()));
    if (this.f.creationDate) r = r.filter(x => x.creationDate.includes(this.f.creationDate));
    if (this.f.status)       r = r.filter(x => x.status === this.f.status);
    if (this.sortKey && this.sortDir) {
      const k = this.sortKey as keyof AmexUserRow;
      r.sort((a, b) => {
        const va = String(a[k] ?? ''); const vb = String(b[k] ?? '');
        return this.sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }
    this.displayRows = r;
  }
}
