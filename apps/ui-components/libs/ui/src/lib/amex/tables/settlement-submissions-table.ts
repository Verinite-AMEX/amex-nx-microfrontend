import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SettlementRow {
  period: string;
  merchantAccount: string;
  settlementAmount: string;
  submissionsCount: string;
  status: string;
}

/**
 * SettlementSubmissionsTable
 * Statement Advice grid — OMS Settlement and Submissions page.
 * Source: OMS portal (all roles) — OMS style, gray header tabs, purple accent
 */
@Component({
  selector: 'amex-settlement-submissions-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sst">
      <!-- Months filter row -->
      <div class="sst__filter-bar" *ngIf="showMonthsFilter">
        <label class="sst__filter-label">View last</label>
        <select class="sst__months-select" [(ngModel)]="selectedMonths"
          (ngModelChange)="monthsChange.emit(+selectedMonths)">
          <option *ngFor="let m of monthOptions" [value]="m">{{ m }} months</option>
        </select>
        <button class="sst__submit-btn" (click)="monthsChange.emit(+selectedMonths)">Submit</button>
      </div>

      <table class="sst__table">
        <thead>
          <tr class="sst__head-row">
            <th class="sst__th">Period</th>
            <th class="sst__th">Merchant Account</th>
            <th class="sst__th sst__th--num">Settlement Amount</th>
            <th class="sst__th sst__th--num">Submissions</th>
            <th class="sst__th">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="sst__row">
            <td class="sst__td">{{ row.period }}</td>
            <td class="sst__td">{{ row.merchantAccount }}</td>
            <td class="sst__td sst__td--num">{{ row.settlementAmount }}</td>
            <td class="sst__td sst__td--num">{{ row.submissionsCount }}</td>
            <td class="sst__td">
              <span class="sst__status sst__status--{{ row.status.toLowerCase() }}">
                {{ row.status }}
              </span>
            </td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="5" class="sst__empty">No settlement data available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .sst__filter-bar { display: flex; align-items: center; gap: 10px; padding: 10px 0 12px; }
    .sst__filter-label { font-size: 13px; color: #333; }
    .sst__months-select {
      border: 1px solid #bbb; padding: 4px 8px; font-size: 13px;
      font-family: Arial, sans-serif; border-radius: 2px;
    }
    .sst__submit-btn {
      background: #7b1fa2; color: #fff; border: none; padding: 5px 18px;
      font-size: 13px; cursor: pointer; font-family: Arial, sans-serif; border-radius: 3px;
    }
    .sst__submit-btn:hover { background: #6a1b9a; }

    .sst__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .sst__head-row { background: #d6eaf8; }
    .sst__th { padding: 8px 12px; text-align: left; font-size: 12px; font-weight: bold; color: #1a3a6b; border: 1px solid #b8d4ea; }
    .sst__th--num { text-align: right; }
    .sst__row { border-bottom: 1px solid #eee; }
    .sst__row:hover { background: #f5f9ff; }
    .sst__td { padding: 8px 12px; border: 1px solid #e8eef4; font-size: 13px; color: #333; }
    .sst__td--num { text-align: right; }

    .sst__status { font-size: 12px; font-weight: bold; }
    .sst__status--completed { color: #2e7d32; }
    .sst__status--pending   { color: #f57f17; }
    .sst__status--failed    { color: #c62828; }
    .sst__status--processing { color: #1565c0; }

    .sst__empty { text-align: center; padding: 24px; color: #888; font-size: 13px; }
  `],
})
export class AmexSettlementSubmissionsTableComponent {
  @Input() rows: SettlementRow[] = [];
  @Input() showMonthsFilter = true;
  @Input() monthOptions = [1, 3, 6, 12];
  selectedMonths = '3';
  @Output() monthsChange = new EventEmitter<number>();
}
