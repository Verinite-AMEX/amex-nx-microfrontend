import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="srt">
      <!-- Section label -->
      <div class="srt__section-label">{{ sectionLabel }}</div>

      <!-- Print/Export actions above table -->
      <div class="srt__top-actions" *ngIf="showExport">
        <span class="srt__export-link" (click)="exportClick.emit()">&#9113; Export</span>
        <span class="srt__print-link" (click)="printClick.emit()">&#128438; Print</span>
      </div>

      <table class="srt__table">
        <thead>
          <tr class="srt__head-row">
            <th class="srt__th" scope="col">SE Number</th>
            <th class="srt__th" scope="col">SOC Ref No.</th>
            <th class="srt__th" scope="col">Grand Total</th>
            <th class="srt__th" scope="col">No. of Charges</th>
            <th class="srt__th" scope="col">Card Account No.</th>
            <th class="srt__th" scope="col">Approval Code</th>
            <th class="srt__th srt__th--actions" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of displayRows; let i = index"
            class="srt__row" [class.srt__row--selected]="selectedRow===row"
            (click)="selectedRow=row; rowSelect.emit(row)">
            <td class="srt__td">{{ row.seNo }}</td>
            <td class="srt__td">{{ row.socRefNo }}</td>
            <td class="srt__td srt__td--num">{{ row.totalAmount }}</td>
            <td class="srt__td srt__td--num">{{ row.noOfCharges }}</td>
            <td class="srt__td">{{ row.cardAccountNo }}</td>
            <td class="srt__td">{{ row.approvalCode }}</td>
            <td class="srt__td srt__td--actions">
              <button class="srt__btn srt__btn--modify"  (click)="$event.stopPropagation(); actionClick.emit({action:'modify',row})">Modify</button>
              <button class="srt__btn srt__btn--delete"  (click)="$event.stopPropagation(); actionClick.emit({action:'delete',row})">Delete</button>
              <button class="srt__btn srt__btn--print"   (click)="$event.stopPropagation(); actionClick.emit({action:'print',row})">Print SOC</button>
            </td>
          </tr>
          <tr *ngIf="!displayRows.length">
            <td colspan="7" class="srt__empty">No Data Found</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* Section label — matches ONLS portal bordered fieldset style */
    .srt__section-label {
      font-size: 12px; font-weight: bold; color: #333;
      padding: 6px 0 4px; margin-bottom: 4px;
      border-bottom: 1px solid #ddd;
    }

    .srt__top-actions {
      display: flex; gap: 16px; padding: 4px 0 8px;
      font-size: 13px;
    }
    .srt__export-link, .srt__print-link {
      color: #006fcf; cursor: pointer; font-size: 13px;
    }
    .srt__export-link:hover, .srt__print-link:hover { text-decoration: underline; }

    .srt__table { width: 100%; border-collapse: collapse; font-size: 12px; }

    /* Header row — ONLS style: white/gray bg */
    .srt__head-row { background: #f0f0f0; }
    .srt__th {
      padding: 6px 10px; text-align: left;
      font-size: 12px; font-weight: bold; color: #333;
      border: 1px solid #ccc;
    }
    .srt__th--actions { text-align: center; }

    .srt__row {
      background: #fff; cursor: pointer;
    }
    .srt__row:hover { background: #eef6ff; }
    .srt__row--selected { background: #d8eaf8; }
    .srt__td {
      padding: 5px 10px; border: 1px solid #ddd;
      font-size: 12px; color: #333;
    }
    .srt__td--num { text-align: right; }
    .srt__td--actions { text-align: center; white-space: nowrap; }

    .srt__empty {
      text-align: center; padding: 24px;
      font-weight: bold; font-size: 13px; color: #333;
      border: 1px solid #ddd;
    }

    /* Buttons — gradient blue matching ONLS portal style */
    .srt__btn {
      border: 1px solid #005fba; padding: 3px 10px; font-size: 11px;
      cursor: pointer; border-radius: 2px; margin: 2px;
      font-family: Arial, sans-serif;
    }
    .srt__btn--modify, .srt__btn--print {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf); color: #fff;
    }
    .srt__btn--modify:hover, .srt__btn--print:hover {
      background: linear-gradient(to bottom, #4a92cf, #0058a6);
    }
    .srt__btn--delete {
      background: linear-gradient(to bottom, #f07070, #cc0000); color: #fff;
      border-color: #aa0000;
    }
    .srt__btn--delete:hover { background: linear-gradient(to bottom, #e06060, #bb0000); }
  `],
})
export class AmexSOCROCRecordsTableComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `socroc-records-table-${++AmexSOCROCRecordsTableComponent._idCounter}`;


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
