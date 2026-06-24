import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * AmexMonthsDropdownFilterComponent
 * Dropdown to select number of months for Settlement & Submissions data.
 * Source: OMS Portal — Settlement and Submissions (all roles).
 */
@Component({
  selector: 'amex-months-dropdown-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mdf-wrap">
      <div class="mdf-row">
        <label class="mdf-label">{{ label }}</label>
        <select class="mdf-select" [(ngModel)]="selectedMonths">
          <option *ngFor="let m of monthOptions" [value]="m">{{ m }} {{ m === 1 ? 'Month' : 'Months' }}</option>
        </select>
        <button class="mdf-btn" (click)="onSubmit()">{{ buttonLabel }}</button>
      </div>
      <p *ngIf="hint" class="mdf-hint">{{ hint }}</p>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .mdf-wrap { padding: 8px 0; }

    .mdf-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .mdf-label {
      font-size: 13px;
      color: #333;
      white-space: nowrap;
    }

    .mdf-select {
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 8px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #333;
      background: #fff;
      width: 130px;
      cursor: pointer;
    }
    .mdf-select:focus { outline: none; border-color: #006fcf; }

    .mdf-btn {
      background: linear-gradient(to bottom, #2a84e0, #1462b8);
      color: #fff;
      border: 1px solid #1050a0;
      border-radius: 2px;
      padding: 4px 14px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .mdf-btn:hover { background: linear-gradient(to bottom, #1e78d0, #0e50a0); }

    .mdf-hint {
      margin: 4px 0 0;
      font-size: 11px;
      color: #888;
      font-style: italic;
    }
  `],
})
export class AmexMonthsDropdownFilterComponent {
  @Input() label = 'Select Months';
  @Input() buttonLabel = 'Submit';
  @Input() hint = '';
  @Input() monthOptions: number[] = [1, 2, 3, 6, 12];

  @Output() monthsSelected = new EventEmitter<number>();

  selectedMonths = 1;

  onSubmit() {
    this.monthsSelected.emit(this.selectedMonths);
  }
}
