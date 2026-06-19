import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }],
  template: `
    <div class="select-wrapper" [class.has-error]="error" [class.disabled]="disabled">
      <label *ngIf="label" [for]="id" class="select-label">
        {{ label }}
        <span *ngIf="required" class="required-indicator" aria-label="required">*</span>
      </label>
      <select
        [id]="id"
        [disabled]="disabled"
        [attr.aria-invalid]="error ? 'true' : null"
        [attr.aria-describedby]="getDescriptionId()"
        [attr.aria-required]="required"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledBy"
        (change)="onChange($event)"
        (blur)="onTouched()"
        class="select"
      >
        <option *ngIf="placeholder" value="" disabled [selected]="!value">{{ placeholder }}</option>
        <option *ngFor="let opt of options" [value]="opt.value" [selected]="opt.value === value">
          {{ opt.label }}
        </option>
      </select>
      <span class="select-arrow" aria-hidden="true">▾</span>
      <span *ngIf="error" class="select-error" [id]="id + '-error'" role="alert">{{ error }}</span>
      <span *ngIf="helperText && !error" class="select-helper" [id]="id + '-helper'">{{ helperText }}</span>
    </div>
  `,
  styles: [`
    .select-wrapper { display: flex; flex-direction: column; gap: 4px; position: relative; }
    .select-label {
      font-size: 14px;
      font-family: Arial, sans-serif;
      font-weight: 500;
      color: #333;
      margin-bottom: 4px;
    }
    .required-indicator { color: #f44336; margin-left: 2px; }
    .select {
      padding: 8px 32px 8px 12px;
      font-size: 14px;
      font-family: Arial, sans-serif;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      outline: none;
      appearance: none;
      width: 100%;
      box-sizing: border-box;
      color: #333;
      background: #fff;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .select:focus { border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,0.15); }
    .has-error .select { border-color: #f44336; }
    .disabled .select { background: #f5f5f5; cursor: not-allowed; color: #999; }
    .select-arrow { position: absolute; right: 12px; top: 10px; pointer-events: none; color: #666; font-size: 12px; }
    .select-error { font-size: 12px; color: #f44336; }
    .select-helper { font-size: 12px; color: #666; }
  `],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() error = '';
  @Input() id = '';
  @Input() label = '';
  @Input() required = false;
  @Input() helperText = '';
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';

  getDescriptionId(): string {
    const ids = [];
    if (this.error) ids.push(this.id + '-error');
    if (this.helperText && !this.error) ids.push(this.id + '-helper');
    return ids.join(' ') || '';
  }

  value: string | number = '';
  onChangeFn = (_: string | number) => {};
  onTouched = () => {};

  onChange(event: Event) {
    this.value = (event.target as HTMLSelectElement).value;
    this.onChangeFn(this.value);
  }

  writeValue(val: string | number) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string | number) => void) { this.onChangeFn = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}
