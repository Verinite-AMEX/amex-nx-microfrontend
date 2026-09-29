import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Same real DLS class as input.ts: forms.css defines `textarea.formControl`
 * explicitly (adjusted font-size/padding for the textarea case) — DLS
 * doesn't need a separate class name, just .formControl on the <textarea>
 * element itself. Same invalid/success mapping as InputComponent, kept
 * consistent across both.
 */
@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  template: `
    <textarea
      [id]="id"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [rows]="rows"
      [required]="required"
      [readonly]="readonly"
      [ngClass]="[
        'formControl',
        invalid ? 'formControlWarning' : '',
        success && !invalid ? 'formControlSuccess' : '',
      ]"
      [attr.aria-invalid]="invalid ? 'true' : null"
      [attr.aria-describedby]="ariaDescribedBy || null"
      [attr.aria-required]="required"
      [attr.aria-readonly]="readonly ? 'true' : null"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledBy || null"
      (input)="onInput($event)"
      (blur)="onTouched()"
      >{{ value }}</textarea
    >
  `,
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() rows = 4;
  @Input() invalid = false;
  /** DLS's real .formControlSuccess state. New — opt-in, defaults off. */
  @Input() success = false;
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-textarea-${++TextareaComponent._idCounter}`;
  @Input() required = false;
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

  writeValue(val: string) {
    this.value = val ?? '';
  }
  registerOnChange(fn: (_: string) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}