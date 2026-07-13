import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AmexViewReportOption {
  value: string;
  label: string;
  fields: AmexViewReportField[];
}

export interface AmexViewReportField {
  key: string;
  label: string;
  type: 'text' | 'date' | 'select';
  options?: { value: string; label: string }[];
}

/**
 * AmexViewReportDropdownComponent
 * BTA-specific "View Report" dropdown with 3 values.
 * Each selection shows a different set of form fields.
 * Source: BTA Portal — Audit Trail Summary (Travel Agent, Internal Admin).
 */
@Component({
  selector: 'amex-view-report-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vrd-wrap">
      <!-- View Report selector row -->
      <div class="vrd-top-row">
        <label class="vrd-label" [for]="id + '-view-report'">View Report</label>
        <select [id]="id + '-view-report'" class="vrd-select" [(ngModel)]="selectedValue" (change)="onSelect()">
          <option value="">-- Select --</option>
          <option *ngFor="let opt of options" [value]="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <!-- Dynamic field panel per selection -->
      <div class="vrd-panel" *ngIf="currentOption">
        <div class="vrd-panel-grid">
          <div class="vrd-field" *ngFor="let f of currentOption.fields">
            <label class="vrd-field-label" [for]="id + '-field'">{{ f.label }}</label>

            <input [id]="id + '-field'"
              *ngIf="f.type === 'text'"
              class="vrd-input"
              type="text"
              [(ngModel)]="fieldValues[f.key]"
            />
            <input
              *ngIf="f.type === 'date'"
              class="vrd-input"
              type="date"
              [(ngModel)]="fieldValues[f.key]"
            />
            <select
              *ngIf="f.type === 'select'"
              class="vrd-input"
              [(ngModel)]="fieldValues[f.key]"
            >
              <option value="">-- Select --</option>
              <option *ngFor="let o of f.options" [value]="o.value">{{ o.label }}</option>
            </select>
          </div>
        </div>

        <div class="vrd-actions">
          <button class="vrd-btn" (click)="onSubmit()">Submit</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .vrd-wrap { padding: 8px 0; }

    .vrd-top-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }

    .vrd-label {
      font-size: 13px;
      color: #333;
      white-space: nowrap;
      min-width: 90px;
    }

    .vrd-select {
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 8px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #333;
      background: #fff;
      min-width: 200px;
      cursor: pointer;
    }
    .vrd-select:focus { outline: none; border-color: #006fcf; }

    /* Dynamic field panel */
    .vrd-panel {
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 2px;
      padding: 12px 14px;
    }

    .vrd-panel-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 10px;
    }

    .vrd-field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .vrd-field-label {
      font-size: 12px;
      color: #555;
    }

    .vrd-input {
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 8px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #333;
      background: #fff;
      min-width: 140px;
    }
    .vrd-input:focus { outline: none; border-color: #006fcf; }

    .vrd-actions { margin-top: 4px; }

    .vrd-btn {
      background: linear-gradient(to bottom, #2a84e0, #1462b8);
      color: #fff;
      border: 1px solid #1050a0;
      border-radius: 2px;
      padding: 5px 16px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .vrd-btn:hover { background: linear-gradient(to bottom, #1e78d0, #0e50a0); }
  `],
})
export class AmexViewReportDropdownComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `view-report-dropdown-${++AmexViewReportDropdownComponent._idCounter}`;


  @Input() options: AmexViewReportOption[] = [];

  @Output() submitted = new EventEmitter<{ view: string; fields: Record<string, string> }>();

  selectedValue = '';
  currentOption: AmexViewReportOption | null = null;
  fieldValues: Record<string, string> = {};

  onSelect() {
    this.currentOption = this.options.find(o => o.value === this.selectedValue) ?? null;
    this.fieldValues = {};
  }

  onSubmit() {
    if (this.currentOption) {
      this.submitted.emit({ view: this.selectedValue, fields: { ...this.fieldValues } });
    }
  }
}
