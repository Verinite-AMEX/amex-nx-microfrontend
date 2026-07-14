import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true }],
  template: `
    <textarea
      [id]="id"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [rows]="rows"
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
      class="textarea"
    >{{ value }}</textarea>
  `,
  styles: [`
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
    .textarea.invalid { border-color: #f44336; }
    .textarea.disabled { background: #f5f5f5; cursor: not-allowed; color: #999; }
    .textarea.readonly { background: #f5f5f5; cursor: default; color: #666; }
    .textarea.readonly:focus { border-color: #e0e0e0; box-shadow: none; }
  `],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() rows = 4;
  @Input() invalid = false;
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-textarea-${++TextareaComponent._idCounter}`;
  @Input() required = false;
  /** Value is visible, focusable, and included in form submission, but not editable. Distinct from `disabled`. */
  @Input() readonly = false;
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';
  @Input() ariaDescribedBy = '';

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