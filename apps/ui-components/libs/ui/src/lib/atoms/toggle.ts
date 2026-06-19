import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-toggle',
  standalone: true,
  imports: [NgIf],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ToggleComponent), multi: true }],
  template: `
    <label class="toggle-label" [class.disabled]="disabled">
      <input type="checkbox" class="toggle-input" [checked]="checked" [disabled]="disabled"
        [attr.aria-checked]="checked"
        [attr.aria-label]="ariaLabel || label"
        [attr.aria-describedby]="ariaDescribedBy"
        [attr.aria-invalid]="ariaInvalid"
        [attr.aria-required]="required"
        (change)="onToggle($event)" (blur)="onTouched()" (keydown)="onKeydown($event)" />
      <span class="toggle-track" aria-hidden="true">
        <span class="toggle-thumb"></span>
      </span>
      <span *ngIf="label" class="toggle-text">{{ label }}</span>
    </label>
  `,
  styles: [`
    .toggle-label { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; font-family: Arial, sans-serif; font-size: 14px; color: #333; }
    .toggle-input { display: none; }
    .toggle-track {
      width: 40px; height: 22px; border-radius: 999px; background: #e0e0e0;
      position: relative; transition: background 0.2s; flex-shrink: 0;
    }
    .toggle-thumb {
      position: absolute; top: 3px; left: 3px;
      width: 16px; height: 16px; border-radius: 50%;
      background: #fff; transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .toggle-input:checked ~ .toggle-track { background: #1976d2; }
    .toggle-input:checked ~ .toggle-track .toggle-thumb { transform: translateX(18px); }
    .disabled { cursor: not-allowed; opacity: 0.6; }
  `],
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaInvalid = false;
  @Input() required = false;

  onKeydown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
      this.checked = !this.checked;
      this.onChange(this.checked);
    }
  }

  checked = false;
  onChange = (_: boolean) => {};
  onTouched = () => {};

  onToggle(e: Event) {
    this.checked = (e.target as HTMLInputElement).checked;
    this.onChange(this.checked);
  }

  writeValue(val: boolean) { this.checked = !!val; }
  registerOnChange(fn: (_: boolean) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(d: boolean) { this.disabled = d; }
}
