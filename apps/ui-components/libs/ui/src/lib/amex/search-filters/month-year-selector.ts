import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AmexMonthYear { year: number; month: number; }

/**
 * AmexMonthYearSelectorComponent
 * Year + Month dropdown pair for filtering monthly statements and audit trail.
 * Source: BTA Portal (Monthly Statements, Audit Trail – Detailed).
 */
@Component({
  selector: 'amex-month-year-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mys-wrap">
      <div class="mys-row">
        <div class="mys-field">
          <label class="mys-label">Year</label>
          <select class="mys-select" [(ngModel)]="selectedYear">
            <option *ngFor="let y of years" [value]="y">{{ y }}</option>
          </select>
        </div>
        <div class="mys-field">
          <label class="mys-label">Month</label>
          <select class="mys-select" [(ngModel)]="selectedMonth">
            <option *ngFor="let m of months" [value]="m.value">{{ m.label }}</option>
          </select>
        </div>
        <button class="mys-btn" (click)="onSubmit()">{{ buttonLabel }}</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .mys-wrap { padding: 8px 0; }

    .mys-row {
      display: flex;
      align-items: flex-end;
      gap: 10px;
      flex-wrap: wrap;
    }

    .mys-field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .mys-label {
      font-size: 12px;
      color: #555;
    }

    .mys-select {
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 8px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #333;
      background: #fff;
      cursor: pointer;
    }
    .mys-select:focus { outline: none; border-color: #006fcf; }

    .mys-btn {
      background: linear-gradient(to bottom, #2a84e0, #1462b8);
      color: #fff;
      border: 1px solid #1050a0;
      border-radius: 2px;
      padding: 5px 14px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .mys-btn:hover { background: linear-gradient(to bottom, #1e78d0, #0e50a0); }
  `],
})
export class AmexMonthYearSelectorComponent implements OnInit {
  @Input() buttonLabel = 'Submit';
  @Input() startYear = 2020;
  @Input() endYear = new Date().getFullYear();

  @Output() selected = new EventEmitter<AmexMonthYear>();

  years: number[] = [];
  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;

  months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' },
    { value: 3, label: 'March' }, { value: 4, label: 'April' },
    { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' },
    { value: 9, label: 'September' }, { value: 10, label: 'October' },
    { value: 11, label: 'November' }, { value: 12, label: 'December' },
  ];

  ngOnInit() {
    for (let y = this.endYear; y >= this.startYear; y--) {
      this.years.push(y);
    }
  }

  onSubmit() {
    this.selected.emit({ year: this.selectedYear, month: this.selectedMonth });
  }
}
