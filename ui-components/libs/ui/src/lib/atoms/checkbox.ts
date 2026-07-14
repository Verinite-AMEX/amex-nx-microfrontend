import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LabelComponent } from './label';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }],
  template: `
    <ui-label class="checkbox-label" [disabled]="disabled">
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        [attr.aria-checked]="checked"
        [attr.aria-label]="ariaLabel || label"
        [attr.aria-describedby]="ariaDescribedBy"
        [attr.aria-invalid]="ariaInvalid"
        [attr.aria-required]="required"
        (change)="onToggle($event)"
        (blur)="onTouched()"
        (keydown)="onKeydown($event)"
        class="checkbox-input"
      />
      <span class="checkbox-box" aria-hidden="true"></span>
      <span class="checkbox-text" *ngIf="label">{{ label }}</span>
      <ng-content></ng-content>
    </ui-label>
  `,
  styles: [`
    .checkbox-label ::ng-deep .ui-label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      font-family: Arial, sans-serif;
      font-weight: normal;
      color: #333;
      user-select: none;
    }
    .checkbox-input { display: none; }
    .checkbox-box {
      width: 18px; height: 18px;
      border: 2px solid #e0e0e0;
      border-radius: 3px;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .checkbox-input:checked + .checkbox-box {
      background: #1976d2;
      border-color: #1976d2;
    }
    .checkbox-input:checked + .checkbox-box::after {
      content: '';
      width: 5px; height: 9px;
      border: 2px solid white;
      border-top: none; border-left: none;
      transform: rotate(45deg) translateY(-1px);
      display: block;
    }
  `],
})
export class CheckboxComponent implements ControlValueAccessor {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-checkbox-${++CheckboxComponent._idCounter}`;

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

  onToggle(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.onChange(this.checked);
  }

  writeValue(val: boolean) { this.checked = !!val; }
  registerOnChange(fn: (_: boolean) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}