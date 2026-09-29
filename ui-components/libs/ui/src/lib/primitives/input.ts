import {
  Component,
  Input,
  forwardRef,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * DLS's real input class is .formControl (forms.css) — not a hand-rolled
 * .input class with CSS custom-property theming. Two real DLS validation
 * states exist and are used here:
 *   .formControlWarning -> used for BOTH "invalid" and "warning" — DLS has
 *     no separate red "error" input state, only this single amber/orange
 *     (#b42c01) one. The `invalid` input keeps its name for backward
 *     compatibility but now maps to this real class.
 *   .formControlSuccess -> a real positive-validation state (green check
 *     icon) that didn't exist in the old version at all. Added as an
 *     opt-in `success` input; defaults to false so nothing changes for
 *     existing callers who don't pass it.
 * `readonly` and `disabled` no longer need class bindings — DLS styles
 * :disabled natively via the real [disabled] attribute already bound
 * below. NOTE: DLS's forms.css has no distinct :read-only visual state at
 * all — a readonly .formControl looks identical to a normal enabled one.
 * That's a real DLS gap, not something to invent styling for here.
 */
@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
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
    />
  `,
})
export class InputComponent implements ControlValueAccessor {
  @Input() type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'search'
    | 'tel'
    | 'url' = 'text';
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-input-${++InputComponent._idCounter}`;
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() invalid = false;
  /** DLS's real .formControlSuccess state (green check icon). New — opt-in, defaults off. */
  @Input() success = false;
  @Input() required = false;
  @Input() readonly = false;
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';
  @Input() ariaDescribedBy = '';

  @ViewChild('nativeInput', { static: true })
  private nativeInput!: ElementRef<HTMLInputElement>;

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