import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button';
import { TableComponent } from '../../atoms/table';
import { TableHeadComponent } from '../../atoms/table-head';
import { TableHeaderCellComponent } from '../../atoms/table-header-cell';
import { TableBodyComponent } from '../../atoms/table-body';
import { TableRowComponent } from '../../atoms/table-row';
import { TableCellComponent } from '../../atoms/table-cell';

export interface SOCROCRow {
  seNo: string;
  socRefNo: string;
  totalAmount: string;
  noOfCharges: string;
  cardAccountNo: string;
  approvalCode: string;
}

@Component({
  selector: 'amex-socroc-records-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonComponent, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="srt">
      <!-- Section label -->
      <div class="srt__section-label">{{ sectionLabel }}</div>

      <!-- Print/Export actions above table -->
      <div class="srt__top-actions" *ngIf="showExport">
        <ui-button class="srt__export-link" label="⬆ Export" variant="ghost" [size]="'sm'" (click)="exportClick.emit()"></ui-button>
        <ui-button class="srt__print-link" label="🖨 Print" variant="ghost" [size]="'sm'" (click)="printClick.emit()"></ui-button>
      </div>

      <ui-table class="srt__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>SE Number</ui-table-header-cell>
            <ui-table-header-cell>SOC Ref No.</ui-table-header-cell>
            <ui-table-header-cell [align]="'right'">Grand Total</ui-table-header-cell>
            <ui-table-header-cell [align]="'right'">No. of Charges</ui-table-header-cell>
            <ui-table-header-cell>Card Account No.</ui-table-header-cell>
            <ui-table-header-cell>Approval Code</ui-table-header-cell>
            <ui-table-header-cell class="srt__th--actions">Actions</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of displayRows; let i = index"
            [hoverable]="true" [class.srt__row--selected]="selectedRow===row"
            (click)="selectedRow=row; rowSelect.emit(row)">
            <ui-table-cell>{{ row.seNo }}</ui-table-cell>
            <ui-table-cell>{{ row.socRefNo }}</ui-table-cell>
            <ui-table-cell [align]="'right'">{{ row.totalAmount }}</ui-table-cell>
            <ui-table-cell [align]="'right'">{{ row.noOfCharges }}</ui-table-cell>
            <ui-table-cell>{{ row.cardAccountNo }}</ui-table-cell>
            <ui-table-cell>{{ row.approvalCode }}</ui-table-cell>
            <ui-table-cell class="srt__td--actions">
              <ui-button class="srt__btn srt__btn--modify" label="Modify" [size]="'sm'"
                (click)="$event.stopPropagation(); actionClick.emit({action:'modify',row})"></ui-button>
              <ui-button class="srt__btn srt__btn--delete" label="Delete" [size]="'sm'"
                (click)="$event.stopPropagation(); actionClick.emit({action:'delete',row})"></ui-button>
              <ui-button class="srt__btn srt__btn--print" label="Print SOC" [size]="'sm'"
                (click)="$event.stopPropagation(); actionClick.emit({action:'print',row})"></ui-button>
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!displayRows.length" [hoverable]="false">
            <ui-table-cell [colspan]="7" [align]="'center'" class="srt__empty">No Data Found</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .srt__section-label {
      font-size: 12px; font-weight: bold; color: #333;
      padding: 6px 0 4px; margin-bottom: 4px;
      border-bottom: 1px solid #ddd;
    }

    .srt__top-actions { display: flex; gap: 16px; padding: 4px 0 8px; }
    .srt__export-link, .srt__print-link { --btn-bg: transparent; --btn-color: #006fcf; --btn-font-weight: normal; padding: 0; }
    .srt__export-link:hover, .srt__print-link:hover { text-decoration: underline; }

    .srt__th--actions { text-align: center; }

    .srt__row--selected { background: #d8eaf8; }
    .srt__td--actions { text-align: center; white-space: nowrap; }

    .srt__empty { font-weight: bold; font-size: 13px; color: #333; padding: 24px 0; }

    /* Buttons — gradient blue matching ONLS portal style */
    .srt__btn { --btn-radius: 2px; margin: 2px; }
    .srt__btn--modify, .srt__btn--print {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf); --btn-color: #fff; --btn-border: 1px solid #005fba;
    }
    .srt__btn--modify:hover, .srt__btn--print:hover {
      --btn-bg: linear-gradient(to bottom, #4a92cf, #0058a6);
    }
    .srt__btn--delete {
      --btn-bg: linear-gradient(to bottom, #f07070, #cc0000); --btn-color: #fff; --btn-border: 1px solid #aa0000;
    }
    .srt__btn--delete:hover { --btn-bg: linear-gradient(to bottom, #e06060, #bb0000); }
  `],
})
export class AmexSOCROCRecordsTableComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `socroc-records-table-${++AmexSOCROCRecordsTableComponent._idCounter}`;

  @Input() rows: SOCROCRow[] = [];
  @Input() sectionLabel = "SOC's";
  @Input() showExport = true;
  @Output() actionClick = new EventEmitter<{ action: string; row: SOCROCRow }>();
  @Output() rowSelect   = new EventEmitter<SOCROCRow>();
  @Output() exportClick = new EventEmitter<void>();
  @Output() printClick  = new EventEmitter<void>();

  selectedRow: SOCROCRow | null = null;
  displayRows: SOCROCRow[] = [];
  ngOnChanges() { this.displayRows = [...this.rows]; }
}