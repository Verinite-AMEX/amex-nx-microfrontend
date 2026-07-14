import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';
import { ButtonComponent } from '../../atoms/button';

export interface SubUserRow {
  name: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'amex-sub-user-admin-table',
  standalone: true,
  imports: [
    CommonModule, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent, ButtonComponent,
  ],
  template: `
    <div class="suat">
      <div class="suat__toolbar">
        <span class="suat__title">{{ title }}</span>
        <ui-button *ngIf="showCreate" class="suat__create-btn" [label]="createLabel" (click)="createClick.emit()"></ui-button>
      </div>
      <div class="suat__accent"></div>

      <ui-table class="suat__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Name</ui-table-header-cell>
            <ui-table-header-cell>Email</ui-table-header-cell>
            <ui-table-header-cell>Role</ui-table-header-cell>
            <ui-table-header-cell>Status</ui-table-header-cell>
            <ui-table-header-cell class="suat__th--actions">Actions</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell>{{ row.name }}</ui-table-cell>
            <ui-table-cell class="suat__td--email">{{ row.email }}</ui-table-cell>
            <ui-table-cell>{{ row.role }}</ui-table-cell>
            <ui-table-cell>
              <span [class.suat__active]="row.status==='Active'"
                    [class.suat__inactive]="row.status==='Inactive'">
                {{ row.status }}
              </span>
            </ui-table-cell>
            <ui-table-cell class="suat__td--actions">
              <ui-button class="suat__btn suat__btn--edit" label="Edit" [size]="'sm'" [variant]="'primary'"
                (click)="actionClick.emit({action:'edit',row})"></ui-button>
              <ui-button class="suat__btn suat__btn--delete" label="Delete" [size]="'sm'" [variant]="'danger'"
                (click)="actionClick.emit({action:'delete',row})"></ui-button>
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="5" [align]="'center'" class="suat__empty">No sub-users found.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .suat__toolbar { display: flex; justify-content: space-between; align-items: center; padding: 14px 0 8px; }
    .suat__title { font-size: 15px; font-weight: bold; color: #1a1a1a; text-transform: uppercase; }
    .suat__accent { height: 3px; background: #7b1fa2; margin-bottom: 12px; }
    .suat__th--actions { text-align: center; }
    .suat__td--email { color: #1a3a6b; }
    .suat__td--actions { white-space: nowrap; }
    .suat__active { color: #333; }
    .suat__inactive { color: #c62828; }
    .suat__empty { text-align: center; color: #888; font-size: 13px; padding: 24px 0; }
  `],
})
export class AmexSubUserAdminTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `sub-user-admin-table-${++AmexSubUserAdminTableComponent._idCounter}`;

  @Input() rows: SubUserRow[] = [];
  @Input() title = 'SUB USER ADMINISTRATION';
  @Input() showCreate = true;
  @Input() createLabel = 'Create Sub User';
  @Output() actionClick = new EventEmitter<{ action: string; row: SubUserRow }>();
  @Output() createClick = new EventEmitter<void>();
}