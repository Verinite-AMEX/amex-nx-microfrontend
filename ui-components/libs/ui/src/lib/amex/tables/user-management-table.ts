import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';
import { ButtonComponent } from '../../atoms/button';
import { InputComponent } from '../../atoms/input';
import { SelectComponent, SelectOption } from '../../atoms/select';

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
  imports: [
    CommonModule, FormsModule,
    TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
    ButtonComponent, InputComponent, SelectComponent,
  ],
  template: `
    <div class="umt">
      <div class="umt__toolbar">
        <span class="umt__title">{{ title }}</span>
        <ui-button *ngIf="showCreate" class="umt__create-btn" [label]="createLabel" (click)="createClick.emit()"></ui-button>
      </div>

      <div class="umt__accent"></div>

      <ui-table class="umt__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell [sortable]="true" [sortDirection]="colSortDir('userId')" (sortClick)="onSort('userId')">User ID</ui-table-header-cell>
            <ui-table-header-cell [sortable]="true" [sortDirection]="colSortDir('userName')" (sortClick)="onSort('userName')">User Name</ui-table-header-cell>
            <ui-table-header-cell [sortable]="true" [sortDirection]="colSortDir('emailAddress')" (sortClick)="onSort('emailAddress')">Email Address</ui-table-header-cell>
            <ui-table-header-cell [sortable]="true" [sortDirection]="colSortDir('creationDate')" (sortClick)="onSort('creationDate')">
              Creation Date<br><span class="umt__th-sub">dd/mm/yyyy</span>
            </ui-table-header-cell>
            <ui-table-header-cell [sortable]="true" [sortDirection]="colSortDir('status')" (sortClick)="onSort('status')">Status</ui-table-header-cell>
            <ui-table-header-cell class="umt__th--actions">Actions</ui-table-header-cell>
          </ui-table-row>

          <ui-table-row [header]="true" [hoverable]="false" class="umt__filter-row">
            <ui-table-cell class="umt__filter-cell">
              <ui-input class="umt__filter-input" [(ngModel)]="f.userId" (ngModelChange)="apply()" ariaLabel="Filter user ID"></ui-input>
            </ui-table-cell>
            <ui-table-cell class="umt__filter-cell">
              <ui-input class="umt__filter-input" [(ngModel)]="f.userName" (ngModelChange)="apply()" ariaLabel="Filter user name"></ui-input>
            </ui-table-cell>
            <ui-table-cell class="umt__filter-cell">
              <ui-input class="umt__filter-input" [(ngModel)]="f.emailAddress" (ngModelChange)="apply()" ariaLabel="Filter email address"></ui-input>
            </ui-table-cell>
            <ui-table-cell class="umt__filter-cell">
              <ui-input class="umt__filter-input" [(ngModel)]="f.creationDate" (ngModelChange)="apply()" ariaLabel="Filter creation date"></ui-input>
            </ui-table-cell>
            <ui-table-cell class="umt__filter-cell">
              <ui-select class="umt__filter-select" [options]="statusOptions" [(ngModel)]="f.status" (ngModelChange)="apply()" ariaLabel="Filter status"></ui-select>
            </ui-table-cell>
            <ui-table-cell class="umt__filter-cell"></ui-table-cell>
          </ui-table-row>
        </ui-table-head>

        <ui-table-body>
          <ui-table-row *ngFor="let row of displayRows" [hoverable]="true">
            <ui-table-cell class="umt__td--link">{{ row.userId }}</ui-table-cell>
            <ui-table-cell class="umt__td--link">{{ row.userName }}</ui-table-cell>
            <ui-table-cell class="umt__td--link">{{ row.emailAddress }}</ui-table-cell>
            <ui-table-cell>{{ row.creationDate }}</ui-table-cell>
            <ui-table-cell>
              <span class="umt__status"
                [class.umt__status--active]="row.status === 'Active'"
                [class.umt__status--inactive]="row.status === 'Inactive'">
                {{ row.status }}
              </span>
            </ui-table-cell>
            <ui-table-cell class="umt__td--actions">
              <ui-button *ngIf="row.status === 'Active'" class="umt__btn umt__btn--reset"
                label="Reset Password" [size]="'sm'" [variant]="'secondary'"
                (click)="actionClick.emit({action:'resetPassword',row})"></ui-button>
              <ui-button class="umt__btn umt__btn--edit"
                label="Edit" [size]="'sm'" [variant]="'primary'"
                (click)="actionClick.emit({action:'edit',row})"></ui-button>
              <ui-button *ngIf="showDelete && row.status === 'Active'" class="umt__btn umt__btn--delete"
                label="Delete" [size]="'sm'" [variant]="'danger'"
                (click)="actionClick.emit({action:'delete',row})"></ui-button>
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!displayRows.length" [hoverable]="false">
            <ui-table-cell [colspan]="6" [align]="'center'" class="umt__empty">No users found.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .umt { background: #fff; }
    .umt__toolbar { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px 10px; }
    .umt__title { font-size: 16px; font-weight: bold; color: #1a1a1a; text-transform: uppercase; letter-spacing: 0.5px; }
    .umt__accent { height: 3px; background: #7b1fa2; margin: 0 16px 12px; }
    .umt__th-sub { font-size: 10px; font-weight: normal; color: #555; display: block; }
    .umt__th--actions { text-align: center; }
    .umt__filter-row { background: #eaf4fb; }
    .umt__filter-cell { padding: 4px 8px; }
    .umt__filter-input, .umt__filter-select { width: 100%; box-sizing: border-box; }
    .umt__td--link { color: #1a3a6b; }
    .umt__td--actions { white-space: nowrap; text-align: center; }
    .umt__status--active   { color: #333; }
    .umt__status--inactive { color: #c62828; }
    .umt__empty { font-size: 13px; color: #888; padding: 28px 0; }
  `],
})
export class AmexUserManagementTableComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `user-management-table-${++AmexUserManagementTableComponent._idCounter}`;

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

  statusOptions: SelectOption[] = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  ngOnChanges() { this.apply(); }

  colSortDir(key: string): 'asc' | 'desc' | null {
    if (this.sortKey !== key) return null;
    return this.sortDir === 'asc' ? 'asc' : this.sortDir === 'desc' ? 'desc' : null;
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