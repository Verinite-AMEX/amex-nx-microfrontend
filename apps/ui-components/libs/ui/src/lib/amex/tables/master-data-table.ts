import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MasterDataRow {
  code: string;
  name: string;
}

/**
 * MasterDataTable
 * SOC/ROC Country Master / Currency Master list.
 * Radio per row, Add New + Modify buttons above.
 * Source: SOC/ROC (image7/image8) — ONLS portal style, bordered cells
 */
@Component({
  selector: 'amex-master-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mdt">
      <!-- Add New / Modify buttons — exact match to SOC/ROC screenshots -->
      <div class="mdt__toolbar">
        <button class="mdt__btn mdt__btn--add"    (click)="addNew.emit()">Add New</button>
        <button class="mdt__btn mdt__btn--modify" (click)="modify.emit(selectedRow)"
          [disabled]="!selectedRow">Modify</button>
      </div>

      <table class="mdt__table">
        <thead>
          <tr class="mdt__head-row">
            <th class="mdt__th mdt__th--radio"></th>
            <th class="mdt__th">{{ nameLabel }}</th>
            <th class="mdt__th">{{ codeLabel }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows"
            class="mdt__row"
            [class.mdt__row--selected]="selectedRow?.code === row.code"
            (click)="selectedRow = row; rowSelect.emit(row)">
            <td class="mdt__td mdt__td--radio">
              <input type="radio" name="masterSelect"
                [checked]="selectedRow?.code === row.code"
                (change)="selectedRow = row; rowSelect.emit(row)" />
            </td>
            <td class="mdt__td">{{ row.name }}</td>
            <td class="mdt__td">{{ row.code }}</td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="3" class="mdt__empty">No records found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .mdt__toolbar { display: flex; gap: 8px; margin-bottom: 8px; }
    .mdt__btn {
      padding: 4px 16px; font-size: 13px; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 2px;
    }
    .mdt__btn--add {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
    }
    .mdt__btn--add:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .mdt__btn--modify {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
    }
    .mdt__btn--modify:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .mdt__btn--modify[disabled] { opacity: 0.4; cursor: default; }

    .mdt__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .mdt__head-row { background: #f0f0f0; }
    .mdt__th {
      padding: 6px 10px; text-align: left; font-size: 12px;
      font-weight: bold; color: #333; border: 1px solid #ccc;
    }
    .mdt__th--radio { width: 36px; }
    .mdt__row { background: #fff; cursor: pointer; }
    .mdt__row:hover { background: #eef6ff; }
    .mdt__row--selected { background: #d8eaf8; }
    .mdt__td { padding: 5px 10px; border: 1px solid #ddd; font-size: 13px; color: #333; }
    .mdt__td--radio { text-align: center; }
    .mdt__empty { text-align: center; padding: 20px; color: #888; border: 1px solid #ddd; }
  `],
})
export class AmexMasterDataTableComponent {
  @Input() rows: MasterDataRow[] = [];
  @Input() nameLabel = 'Name';
  @Input() codeLabel = 'Code';
  selectedRow: MasterDataRow | null = null;
  @Output() addNew    = new EventEmitter<void>();
  @Output() modify    = new EventEmitter<MasterDataRow | null>();
  @Output() rowSelect = new EventEmitter<MasterDataRow>();
}
