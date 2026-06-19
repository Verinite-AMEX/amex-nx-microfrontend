import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
}

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupComponent), multi: true }],
  template: `
    <fieldset class="radio-group" [class.horizontal]="orientation === 'horizontal'" [attr.aria-label]="ariaLabel" [attr.aria-describedby]="ariaDescribedBy">
      <legend *ngIf="legend" class="radio-legend">{{ legend }}</legend>
      <label *ngFor="let opt of options; let i = index" class="radio-label" [class.disabled]="disabled">
        <input
          type="radio"
          [name]="name"
          [value]="opt.value"
          [checked]="opt.value === value"
          [disabled]="disabled || opt.disabled"
          [attr.aria-checked]="opt.value === value"
          [attr.aria-label]="opt.ariaLabel || opt.label"
          [attr.aria-describedby]="opt.ariaDescribedBy"
          [attr.aria-invalid]="opt.ariaInvalid"
          [attr.aria-required]="required"
          (change)="onSelect(opt.value)"
          (blur)="onTouched()"
          (keydown)="onKeydown($event, i)"
          class="radio-input"
        />
        <span class="radio-circle" aria-hidden="true"></span>
        <span class="radio-text">{{ opt.label }}</span>
      </label>
    </fieldset>
  `,
  styles: [`
    .radio-group { display: flex; flex-direction: column; gap: 8px; border: none; padding: 0; margin: 0; }
    .radio-group.horizontal { flex-direction: row; flex-wrap: wrap; gap: 16px; }
    .radio-legend {
      font-size: 14px;
      font-family: Arial, sans-serif;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
      padding: 0;
    }
    .radio-label {
      display: inline-flex; align-items: center; gap: 8px;
      cursor: pointer; font-size: 14px; font-family: Arial, sans-serif;
      color: #333; user-select: none;
    }
    .radio-input { display: none; }
    .radio-circle {
      width: 18px; height: 18px;
      border: 2px solid #e0e0e0;
      border-radius: 50%;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s; flex-shrink: 0;
    }
    .radio-input:checked + .radio-circle {
      border-color: #1976d2;
    }
    .radio-input:checked + .radio-circle::after {
      content: '';
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #1976d2;
      display: block;
    }
    .disabled { cursor: not-allowed; opacity: 0.6; }
  `],
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() name = 'radio-group';
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input() disabled = false;
  @Input() legend = '';
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() required = false;

  onKeydown(event: KeyboardEvent, index: number) {
    const max = this.options.length - 1;
    let next = index;
    
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = index === max ? 0 : index + 1;
      event.preventDefault();
      this.onSelect(this.options[next].value);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = index === 0 ? max : index - 1;
      event.preventDefault();
      this.onSelect(this.options[next].value);
    }
  }

  value: string | number = '';
  onChange = (_: string | number) => {};
  onTouched = () => {};

  onSelect(val: string | number) {
    this.value = val;
    this.onChange(val);
  }

  writeValue(val: string | number) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string | number) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}
