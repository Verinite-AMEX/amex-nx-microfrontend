import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field';
import { SelectComponent, SelectOption } from '../../atoms/select';
import { InputComponent } from '../../atoms/input';
import { DateInputComponent } from '../../atoms/date-input';
import { ButtonComponent } from '../../atoms/button';

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
  imports: [CommonModule, FormsModule, FormFieldComponent, SelectComponent, InputComponent, DateInputComponent, ButtonComponent],
  template: `
    <div class="vrd-wrap">
      <!-- View Report selector row -->
      <ui-form-field class="vrd-top-row" label="View Report" [forId]="id + '-view-report'">
        <ui-select
          [id]="id + '-view-report'"
          [options]="viewOptions"
          placeholder="-- Select --"
          ariaLabel="View Report"
          [(ngModel)]="selectedValue"
          (ngModelChange)="onSelect()">
        </ui-select>
      </ui-form-field>

      <!-- Dynamic field panel per selection -->
      <div class="vrd-panel" *ngIf="currentOption">
        <div class="vrd-panel-grid">
          <ui-form-field
            class="vrd-field"
            *ngFor="let f of currentOption.fields"
            [label]="f.label"
            [forId]="id + '-' + f.key">

            <ui-input
              *ngIf="f.type === 'text'"
              [id]="id + '-' + f.key"
              type="text"
              [ariaLabel]="f.label"
              [(ngModel)]="fieldValues[f.key]">
            </ui-input>

            <ui-date-input
              *ngIf="f.type === 'date'"
              [id]="id + '-' + f.key"
              [ariaLabel]="f.label"
              [(ngModel)]="fieldValues[f.key]">
            </ui-date-input>

            <ui-select
              *ngIf="f.type === 'select'"
              [id]="id + '-' + f.key"
              [options]="f.options || []"
              placeholder="-- Select --"
              [ariaLabel]="f.label"
              [(ngModel)]="fieldValues[f.key]">
            </ui-select>
          </ui-form-field>
        </div>

        <div class="vrd-actions">
          <ui-button variant="primary" size="sm" label="Submit" (click)="onSubmit()"></ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --btn-bg: linear-gradient(to bottom, #2a84e0, #1462b8);
      --btn-color: #fff;
      --btn-border: 1px solid #1050a0;
      --btn-radius: 2px;
      --btn-padding: 5px 16px;
      --btn-font-size: 12px;
    }

    .vrd-wrap { padding: 8px 0; }

    .vrd-top-row { max-width: 260px; margin-bottom: 10px; }

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

    .vrd-field { min-width: 140px; }

    .vrd-actions { margin-top: 4px; }
  `],
})
export class AmexViewReportDropdownComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `view-report-dropdown-${++AmexViewReportDropdownComponent._idCounter}`;

  @Input() options: AmexViewReportOption[] = [];

  @Output() submitted = new EventEmitter<{ view: string; fields: Record<string, string> }>();

  selectedValue = '';
  currentOption: AmexViewReportOption | null = null;
  fieldValues: Record<string, string> = {};

  get viewOptions(): SelectOption[] {
    return this.options.map(o => ({ label: o.label, value: o.value }));
  }

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