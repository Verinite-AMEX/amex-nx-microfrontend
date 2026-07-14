import { Component, Input, forwardRef, HostBinding } from '@angular/core';
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
    <div class="select-wrapper" [class.has-error]="invalid" [class.disabled]="disabled"
         [class.readonly]="readonly" [class.native-appearance]="nativeAppearance">
      <select
        [id]="id"
        [disabled]="disabled"
        [required]="required"
        [attr.aria-invalid]="invalid ? 'true' : null"
        [attr.aria-describedby]="ariaDescribedBy || null"
        [attr.aria-required]="required"
        [attr.aria-readonly]="readonly ? 'true' : null"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledBy || null"
        (mousedown)="onMousedown($event)"
        (keydown)="onKeydown($event)"
        (change)="onChange($event)"
        (blur)="onTouched()"
        class="select"
      >
        <option *ngIf="placeholder" value="" disabled [selected]="!value">{{ placeholder }}</option>
        <option *ngFor="let opt of options" [value]="opt.value" [selected]="opt.value === value">
          {{ opt.label }}
        </option>
      </select>
      <span *ngIf="!nativeAppearance" class="select-arrow" aria-hidden="true">▾</span>
    </div>
  `,
  styles: [`
    .select-wrapper { position: relative; }
    .select {
      padding: var(--select-padding, 8px 32px 8px 12px);
      font-size: var(--select-font-size, 14px);
      font-family: Arial, sans-serif;
      border: var(--select-border, 1px solid #e0e0e0);
      border-radius: var(--select-radius, 4px);
      outline: none;
      appearance: none;
      width: 100%;
      box-sizing: border-box;
      color: var(--select-color, #333);
      background: var(--select-bg, #fff);
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .select:focus { border-color: var(--select-focus-border-color, #1976d2); box-shadow: var(--select-focus-shadow, 0 0 0 2px rgba(25,118,210,0.15)); }
    .has-error .select { border-color: #f44336; }
    .disabled .select { background: #f5f5f5; cursor: not-allowed; color: #999; }
    .readonly .select { background: #f5f5f5; cursor: default; }
    .readonly .select:focus { border-color: #e0e0e0; box-shadow: none; }
    .select-arrow { position: absolute; right: 12px; top: 10px; pointer-events: none; color: #666; font-size: 12px; }
    .readonly .select-arrow { opacity: 0.4; }
    .native-appearance .select { appearance: auto; -webkit-appearance: auto; -moz-appearance: auto; }
  `],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() invalid = false;
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-select-${++SelectComponent._idCounter}`;
  @Input() required = false;
  @Input() readonly = false;
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';
  @Input() ariaDescribedBy = '';
  /** When true, renders the browser's own native dropdown appearance/arrow instead of the custom one. */
  @Input() nativeAppearance = false;

  value: string | number = '';
  onChangeFn = (_: string | number) => {};
  onTouched = () => {};

  onMousedown(event: MouseEvent) {
    if (this.readonly) event.preventDefault();
  }

  onKeydown(event: KeyboardEvent) {
    if (this.readonly && event.key !== 'Tab') {
      event.preventDefault();
    }
  }

  onChange(event: Event) {
    if (this.readonly) return;
    this.value = (event.target as HTMLSelectElement).value;
    this.onChangeFn(this.value);
  }

  writeValue(val: string | number) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string | number) => void) { this.onChangeFn = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}