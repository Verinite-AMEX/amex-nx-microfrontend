import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-date-input',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateInputComponent), multi: true }],
  template: `
    <div class="date-input-wrap" [class.has-error]="error" [class.disabled]="disabled">
      <input type="date" class="date-input"
        [value]="value" [min]="min" [max]="max" [disabled]="disabled"
        (change)="onInput($event)" (blur)="onTouched()" />
      <span class="date-icon">📅</span>
      <span *ngIf="error" class="date-error">{{ error }}</span>
    </div>
  `,
  styles: [`
    .date-input-wrap { display: flex; flex-direction: column; gap: 4px; position: relative; }
    .date-input {
      padding: 8px 36px 8px 12px; font-size: 14px; font-family: Arial, sans-serif;
      border: 1px solid #e0e0e0; border-radius: 4px; outline: none;
      width: 100%; box-sizing: border-box; color: #333; background: #fff;
      transition: border-color 0.2s;
    }
    .date-input:focus { border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,0.15); }
    .has-error .date-input { border-color: #f44336; }
    .disabled .date-input { background: #f5f5f5; cursor: not-allowed; }
    .date-icon { position: absolute; right: 10px; top: 9px; pointer-events: none; font-size: 16px; }
    .date-error { font-size: 12px; color: #f44336; }
  `],
})
export class DateInputComponent implements ControlValueAccessor {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-date-input-${++DateInputComponent._idCounter}`;


  @Input() min = '';
  @Input() max = '';
  @Input() disabled = false;
  @Input() error = '';

  value = '';
  onChange = (_: string) => {};
  onTouched = () => {};

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  writeValue(v: string) { this.value = v ?? ''; }
  registerOnChange(fn: (_: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(d: boolean) { this.disabled = d; }
}
