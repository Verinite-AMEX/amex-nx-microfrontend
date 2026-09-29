// libs/ui/src/lib/primitives/radio-group.ts
import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  template: `
    <fieldset [attr.aria-describedby]="ariaDescribedBy || null">
      <legend [class.sr-only]="!legend">{{ legend || 'Radio Button Group' }}</legend>
      <div class="radio" *ngFor="let opt of options; let i = index">
        <input
          type="radio"
          [id]="id + '-' + i"
          [name]="name"
          [value]="opt.value"
          [checked]="opt.value === value"
          [disabled]="disabled || !!opt.disabled"
          [required]="required"
          [attr.aria-invalid]="invalid ? 'true' : 'false'"
          (change)="onSelect(opt.value)"
          (blur)="onTouched()"
        />
        <label [attr.for]="id + '-' + i">{{ opt.label }}</label>
      </div>
    </fieldset>
  `,
})
export class RadioGroupComponent implements ControlValueAccessor {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-radio-group-${++RadioGroupComponent._idCounter}`;

  @Input() options: RadioOption[] = [];
  @Input() name = 'radio-group';
  @Input() disabled = false;
  @Input() legend = '';
  @Input() ariaDescribedBy = '';
  @Input() required = false;
  @Input() invalid = false;

  value: string | number = '';
  onChange = (_: string | number) => {};
  onTouched = () => {};

  onSelect(val: string | number): void {
    this.value = val;
    this.onChange(val);
  }

  writeValue(val: string | number): void {
    this.value = val ?? '';
  }
  registerOnChange(fn: (_: string | number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}