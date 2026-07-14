import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';
import { ButtonComponent } from '../../atoms/button';
import { RadioComponent } from '../../atoms/radio';

export interface MasterDataRow {
  code: string;
  name: string;
}

@Component({
  selector: 'amex-master-data-table',
  standalone: true,
  imports: [
    CommonModule, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent, ButtonComponent, RadioComponent,
  ],
  template: `
    <div class="mdt">
      <div class="mdt__toolbar">
        <ui-button class="mdt__btn mdt__btn--add" label="Add New" [size]="'sm'" (click)="addNew.emit()"></ui-button>
        <ui-button class="mdt__btn mdt__btn--modify" label="Modify" [size]="'sm'"
          [disabled]="!selectedRow" (click)="modify.emit(selectedRow)"></ui-button>
      </div>

      <ui-table class="mdt__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell class="mdt__th--radio"></ui-table-header-cell>
            <ui-table-header-cell>{{ nameLabel }}</ui-table-header-cell>
            <ui-table-header-cell>{{ codeLabel }}</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows"
            [hoverable]="true"
            [selected]="selectedRow?.code === row.code"
            [clickable]="true"
            (rowClick)="selectedRow = row; rowSelect.emit(row)">
            <ui-table-cell class="mdt__td--radio">
              <ui-radio name="masterSelect" [value]="row.code"
                [checked]="selectedRow?.code === row.code"
                (checkedChange)="selectedRow = row; rowSelect.emit(row)">
              </ui-radio>
            </ui-table-cell>
            <ui-table-cell>{{ row.name }}</ui-table-cell>
            <ui-table-cell>{{ row.code }}</ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="3" [align]="'center'" class="mdt__empty">No records found.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .mdt__toolbar { display: flex; gap: 8px; margin-bottom: 8px; }
    .mdt__th--radio { width: 36px; }
    .mdt__td--radio { text-align: center; }
    .mdt__empty { text-align: center; color: #888; padding: 20px 0; }
  `],
})
export class AmexMasterDataTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `master-data-table-${++AmexMasterDataTableComponent._idCounter}`;

  @Input() rows: MasterDataRow[] = [];
  @Input() nameLabel = 'Name';
  @Input() codeLabel = 'Code';
  selectedRow: MasterDataRow | null = null;
  @Output() addNew    = new EventEmitter<void>();
  @Output() modify    = new EventEmitter<MasterDataRow | null>();
  @Output() rowSelect = new EventEmitter<MasterDataRow>();
}