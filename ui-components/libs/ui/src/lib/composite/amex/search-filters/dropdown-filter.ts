import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';

export interface AmexDropdownOption { value: string; label: string; }

/**
 * AmexDropdownFilterComponent
 * Single-select dropdown filter used across BCRB, SOC/ROC, OMS, BTA.
 * Contexts: report type, country, currency, user role, status.
 */
@Component({
  selector: 'amex-dropdown-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, SelectComponent, ButtonComponent],
  template: `
    <div class="df-wrap">
      <div class="df-row">
        <ui-form-field class="df-field" [label]="label" [forId]="id + '-field'">
          <ui-select
            [id]="id + '-field'"
            [options]="selectOptions"
            [placeholder]="placeholder"
            [ariaLabel]="label"
            [(ngModel)]="selectedValue">
          </ui-select>
        </ui-form-field>
        <ui-button variant="primary" size="sm" [label]="buttonLabel" (click)="onApply()"></ui-button>
        <ui-button *ngIf="selectedValue" class="df-reset" variant="ghost" size="sm" label="Reset" (click)="onReset()"></ui-button>
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
      --btn-padding: 4px 14px;
      --btn-font-size: 12px;
    }

    .df-wrap { padding: 8px 0; }

    .df-row {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      flex-wrap: wrap;
    }

    .df-field { min-width: 160px; }

    .df-reset {
      --btn-bg: none;
      --btn-color: #555;
      --btn-border: 1px solid #bbb;
    }
  `],
})
export class AmexDropdownFilterComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `dropdown-filter-${++AmexDropdownFilterComponent._idCounter}`;

  @Input() label = 'Filter';
  @Input() placeholder = '-- Select --';
  @Input() buttonLabel = 'Apply';
  @Input() options: AmexDropdownOption[] = [];

  @Output() filterApplied = new EventEmitter<string>();
  @Output() filterReset = new EventEmitter<void>();

  selectedValue = '';

  get selectOptions(): SelectOption[] {
    return this.options.map(o => ({ label: o.label, value: o.value }));
  }

  onApply() {
    this.filterApplied.emit(this.selectedValue as string);
  }

  onReset() {
    this.selectedValue = '';
    this.filterReset.emit();
  }
}