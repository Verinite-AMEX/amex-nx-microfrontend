import { Component, Input, forwardRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
  template: `
    <div class="input-wrapper" [class.has-error]="error" [class.disabled]="disabled">
      <label *ngIf="label" [for]="id" class="input-label">
        {{ label }}
        <span *ngIf="required" class="required-indicator" aria-label="required">*</span>
      </label>
      <input
        [id]="id"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        [attr.aria-invalid]="error ? 'true' : null"
        [attr.aria-describedby]="getDescriptionId()"
        [attr.aria-required]="required"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledBy"
        (input)="onInput($event)"
        (blur)="onTouched()"
        class="input"
      />
      <span *ngIf="error" class="input-error" [id]="id + '-error'" role="alert">{{ error }}</span>
      <span *ngIf="helperText && !error" class="input-helper" [id]="id + '-helper'">{{ helperText }}</span>
    </div>
  `,
  styles: [`
    .input-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .input-label {
      font-size: 14px;
      font-family: Arial, sans-serif;
      font-weight: 500;
      color: #333;
      margin-bottom: 4px;
    }
    .required-indicator { color: #f44336; margin-left: 2px; }
    .input {
      padding: 8px 12px;
      font-size: 14px;
      font-family: Arial, sans-serif;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s;
      width: 100%;
      box-sizing: border-box;
      color: #333;
      background: #fff;
    }
    .input:focus { border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,0.15); }
    .has-error .input { border-color: #f44336; }
    .has-error .input:focus { box-shadow: 0 0 0 2px rgba(244,67,54,0.15); }
    .disabled .input { background: #f5f5f5; cursor: not-allowed; color: #999; }
    .input-error { font-size: 12px; color: #f44336; }
    .input-helper { font-size: 12px; color: #666; }
  `],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() id = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() error = '';
  @Input() label = '';
  @Input() required = false;
  @Input() helperText = '';
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';

    getDescriptionId(): string | null {
      const ids: string[] = [];
      if (this.error) ids.push(this.id + '-error');
      if (this.helperText && !this.error) ids.push(this.id + '-helper');
      return ids.length ? ids.join(' ') : null;
    }

  value = '';
  onChange = (_: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}
