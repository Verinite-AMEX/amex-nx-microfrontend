import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true }],
  template: `
    <div class="textarea-wrapper" [class.has-error]="error" [class.disabled]="disabled">
      <label *ngIf="label" [for]="id" class="textarea-label">
        {{ label }}
        <span *ngIf="required" class="required-indicator" aria-label="required">*</span>
      </label>
      <textarea
        [id]="id"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [rows]="rows"
        [attr.aria-invalid]="error ? 'true' : null"
        [attr.aria-describedby]="getDescriptionId()"
        [attr.aria-required]="required"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledBy"
        (input)="onInput($event)"
        (blur)="onTouched()"
        class="textarea"
      >{{ value }}</textarea>
      <span *ngIf="error" class="textarea-error" [id]="id + '-error'" role="alert">{{ error }}</span>
      <span *ngIf="helperText && !error" class="textarea-helper" [id]="id + '-helper'">{{ helperText }}</span>
    </div>
  `,
  styles: [`
    .textarea-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .textarea-label {
      font-size: 14px;
      font-family: Arial, sans-serif;
      font-weight: 500;
      color: #333;
      margin-bottom: 4px;
    }
    .required-indicator { color: #f44336; margin-left: 2px; }
    .textarea {
      padding: 8px 12px;
      font-size: 14px;
      font-family: Arial, sans-serif;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      outline: none;
      resize: vertical;
      transition: border-color 0.2s;
      width: 100%;
      box-sizing: border-box;
      color: #333;
    }
    .textarea:focus { border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,0.15); }
    .has-error .textarea { border-color: #f44336; }
    .disabled .textarea { background: #f5f5f5; cursor: not-allowed; color: #999; }
    .textarea-error { font-size: 12px; color: #f44336; }
    .textarea-helper { font-size: 12px; color: #666; }
  `],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() rows = 4;
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

  value = '';
  onChange = (_: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.onChange(this.value);
  }

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}
