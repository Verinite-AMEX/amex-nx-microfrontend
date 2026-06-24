import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AmexReportTypeOption {
  value: string;
  label: string;
  secondaryFields?: AmexSecondaryField[];
}

export interface AmexSecondaryField {
  key: string;
  label: string;
  type: 'text' | 'date' | 'select';
  options?: { value: string; label: string }[];
}

/**
 * AmexReportTypeSelectorComponent
 * Radio button group or dropdown for selecting report type.
 * Secondary fields panel changes dynamically based on selection.
 * Sources: BCRB, BTA Audit Trail Summary, OMS Customized Reports.
 */
@Component({
  selector: 'amex-report-type-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="rts-wrap">

      <!-- Radio mode -->
      <div class="rts-radios" *ngIf="mode === 'radio'">
        <label class="rts-heading">{{ label }}</label>
        <div class="rts-radio-group">
          <label class="rts-radio" *ngFor="let opt of options">
            <input
              type="radio"
              [value]="opt.value"
              [(ngModel)]="selectedValue"
              (change)="onSelect(opt)"
              name="reportType"
            />
            <span class="rts-radio-label">{{ opt.label }}</span>
          </label>
        </div>
      </div>

      <!-- Dropdown mode -->
      <div class="rts-dropdown-row" *ngIf="mode === 'dropdown'">
        <label class="rts-label">{{ label }}</label>
        <select class="rts-select" [(ngModel)]="selectedValue" (change)="onSelectByValue()">
          <option value="">-- Select --</option>
          <option *ngFor="let opt of options" [value]="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <!-- Dynamic secondary fields based on selected type -->
      <div class="rts-secondary" *ngIf="selectedOption?.secondaryFields?.length">
        <div class="rts-field" *ngFor="let field of selectedOption!.secondaryFields">
          <label class="rts-field-label">{{ field.label }}</label>

          <input
            *ngIf="field.type === 'text'"
            class="rts-input"
            type="text"
            [(ngModel)]="secondaryValues[field.key]"
          />

          <input
            *ngIf="field.type === 'date'"
            class="rts-input"
            type="date"
            [(ngModel)]="secondaryValues[field.key]"
          />

          <select
            *ngIf="field.type === 'select'"
            class="rts-input"
            [(ngModel)]="secondaryValues[field.key]"
          >
            <option value="">-- Select --</option>
            <option *ngFor="let o of field.options" [value]="o.value">{{ o.label }}</option>
          </select>
        </div>
      </div>

      <div class="rts-actions" *ngIf="showSubmit">
        <button class="rts-btn" (click)="onSubmit()">{{ buttonLabel }}</button>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .rts-wrap { padding: 8px 0; }

    .rts-heading {
      display: block;
      font-size: 13px;
      color: #333;
      font-weight: bold;
      margin-bottom: 6px;
    }

    .rts-radio-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .rts-radio {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .rts-radio input[type="radio"] { cursor: pointer; accent-color: #006fcf; }
    .rts-radio-label { font-size: 13px; color: #333; }

    .rts-dropdown-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .rts-label {
      font-size: 13px;
      color: #333;
      min-width: 100px;
    }

    .rts-select {
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
    .rts-select:focus { outline: none; border-color: #006fcf; }

    /* Secondary fields panel */
    .rts-secondary {
      margin-top: 10px;
      padding: 10px 14px;
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 2px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .rts-field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .rts-field-label {
      font-size: 12px;
      color: #555;
    }

    .rts-input {
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 8px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #333;
      background: #fff;
      min-width: 140px;
    }
    .rts-input:focus { outline: none; border-color: #006fcf; }

    .rts-actions { margin-top: 10px; }

    .rts-btn {
      background: linear-gradient(to bottom, #2a84e0, #1462b8);
      color: #fff;
      border: 1px solid #1050a0;
      border-radius: 2px;
      padding: 5px 16px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .rts-btn:hover { background: linear-gradient(to bottom, #1e78d0, #0e50a0); }
  `],
})
export class AmexReportTypeSelectorComponent {
  @Input() label = 'Report Type';
  @Input() mode: 'radio' | 'dropdown' = 'dropdown';
  @Input() options: AmexReportTypeOption[] = [];
  @Input() showSubmit = true;
  @Input() buttonLabel = 'Submit';

  @Output() typeSelected = new EventEmitter<{ type: string; fields: Record<string, string> }>();

  selectedValue = '';
  selectedOption: AmexReportTypeOption | null = null;
  secondaryValues: Record<string, string> = {};

  onSelect(opt: AmexReportTypeOption) {
    this.selectedOption = opt;
    this.secondaryValues = {};
  }

  onSelectByValue() {
    this.selectedOption = this.options.find(o => o.value === this.selectedValue) ?? null;
    this.secondaryValues = {};
  }

  onSubmit() {
    this.typeSelected.emit({ type: this.selectedValue, fields: { ...this.secondaryValues } });
  }
}
