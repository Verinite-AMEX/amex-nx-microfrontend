import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AmexDropdownOption { value: string; label: string; }

/**
 * AmexDropdownFilterComponent
 * Single-select dropdown filter used across BCRB, SOC/ROC, OMS, BTA.
 * Contexts: report type, country, currency, user role, status.
 */
@Component({
  selector: 'amex-dropdown-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="df-wrap">
      <div class="df-row">
        <label class="df-label" [for]="id + '-field'">{{ label }}</label>
        <select [id]="id + '-field'" class="df-select" [(ngModel)]="selectedValue">
          <option value="">{{ placeholder }}</option>
          <option *ngFor="let opt of options" [value]="opt.value">{{ opt.label }}</option>
        </select>
        <button class="df-btn" (click)="onApply()">{{ buttonLabel }}</button>
        <button *ngIf="selectedValue" class="df-reset" (click)="onReset()">Reset</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .df-wrap { padding: 8px 0; }

    .df-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .df-label {
      font-size: 13px;
      color: #333;
      white-space: nowrap;
      min-width: 80px;
    }

    .df-select {
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 8px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #333;
      background: #fff;
      min-width: 160px;
      cursor: pointer;
    }
    .df-select:focus { outline: none; border-color: #006fcf; }

    .df-btn {
      background: linear-gradient(to bottom, #2a84e0, #1462b8);
      color: #fff;
      border: 1px solid #1050a0;
      border-radius: 2px;
      padding: 4px 14px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .df-btn:hover { background: linear-gradient(to bottom, #1e78d0, #0e50a0); }

    .df-reset {
      background: none;
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 10px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #555;
      cursor: pointer;
    }
    .df-reset:hover { background: #f5f5f5; }
  `],
})
export class AmexDropdownFilterComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `dropdown-filter-${++AmexDropdownFilterComponent._idCounter}`;


  @Input() label = 'Filter';
  @Input() placeholder = '-- Select --';
  @Input() buttonLabel = 'Apply';
  @Input() options: AmexDropdownOption[] = [];

  @Output() filterApplied = new EventEmitter<string>();
  @Output() filterReset = new EventEmitter<void>();

  selectedValue = '';

  onApply() {
    this.filterApplied.emit(this.selectedValue);
  }

  onReset() {
    this.selectedValue = '';
    this.filterReset.emit();
  }
}
