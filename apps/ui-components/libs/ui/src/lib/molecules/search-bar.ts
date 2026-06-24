import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-search-bar',
  standalone: true,
  imports: [NgIf],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchBarComponent), multi: true }],
  template: `
    <div class="search-bar" [class.focused]="focused">
      <span class="search-icon">🔍</span>
      <input class="search-input" type="search"
        [placeholder]="placeholder" [value]="value" [disabled]="disabled"
        (input)="onInput($event)" (focus)="focused=true" (blur)="focused=false; onTouched()"
        (keyup.enter)="searched.emit(value)"
      />
      <button *ngIf="value" class="search-clear" (click)="clear()" aria-label="Clear">✕</button>
    </div>
  `,
  styles: [`
    .search-bar {
      display: flex; align-items: center; gap: 8px;
      border: 1px solid #e0e0e0; border-radius: 999px;
      padding: 8px 14px; background: #fff; transition: border-color 0.2s;
    }
    .search-bar.focused { border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,0.15); }
    .search-icon { font-size: 14px; flex-shrink: 0; }
    .search-input { flex: 1; border: none; outline: none; font-size: 14px; font-family: Arial, sans-serif; color: #333; background: transparent; }
    .search-input::placeholder { color: #aaa; }
    .search-clear { background: none; border: none; cursor: pointer; font-size: 12px; color: #999; padding: 0; }
    .search-clear:hover { color: #333; }
  `],
})
export class SearchBarComponent implements ControlValueAccessor {
  @Input() placeholder = 'Search...';
  @Input() disabled = false;
  @Output() searched = new EventEmitter<string>();

  value = '';
  focused = false;
  onChange = (_: string) => {};
  onTouched = () => {};

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  clear() { this.value = ''; this.onChange(''); }

  writeValue(v: string) { this.value = v ?? ''; }
  registerOnChange(fn: (_: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(d: boolean) { this.disabled = d; }
}
