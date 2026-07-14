import { Component, Input, forwardRef, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
  template: `
    <input
      #nativeInput
      [id]="id"
      [type]="type"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [value]="value"
      [required]="required"
      [readonly]="readonly"
      [class.invalid]="invalid"
      [class.disabled]="disabled"
      [class.readonly]="readonly"
      [attr.aria-invalid]="invalid ? 'true' : null"
      [attr.aria-describedby]="ariaDescribedBy || null"
      [attr.aria-required]="required"
      [attr.aria-readonly]="readonly ? 'true' : null"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledBy || null"
      (input)="onInput($event)"
      (blur)="onTouched()"
      class="input"
    />
  `,
  styles: [`
      .input {
        padding: var(--input-padding, 8px 12px);
        font-size: 14px;
        font-family: Arial, sans-serif;
        border: var(--input-border, 1px solid #e0e0e0);
        border-radius: var(--input-radius, 4px);
        outline: none;
        transition: border-color 0.2s;
        width: 100%;
        box-sizing: border-box;
        color: #333;
        background: var(--input-bg, #fff);
      }
      .input:focus { border-color: var(--input-focus-border-color, #1976d2); box-shadow: var(--input-focus-shadow, 0 0 0 2px rgba(25,118,210,0.15)); }
      .input.invalid { border-color: #f44336; }
      .input.invalid:focus { box-shadow: 0 0 0 2px rgba(244,67,54,0.15); }
      .input.disabled { background: #f5f5f5; cursor: not-allowed; color: #999; }
      .input.readonly { background: #f5f5f5; cursor: default; color: #666; }
      .input.readonly:focus { border-color: var(--input-border, #e0e0e0); box-shadow: none; }
    `],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' = 'text';
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-input-${++InputComponent._idCounter}`;
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  /** Value is visible, focusable, and included in form submission, but not editable. Distinct from `disabled`. */
  @Input() readonly = false;
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';
  @Input() ariaDescribedBy = '';

  @ViewChild('nativeInput', { static: true }) private nativeInput!: ElementRef<HTMLInputElement>;

  /** Public focus delegate so consumers never need ElementRef/nativeElement of their own. */
  focus(): void {
    this.nativeInput.nativeElement.focus();
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