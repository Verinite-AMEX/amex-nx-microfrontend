import { Component, Input, Output, EventEmitter, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputComponent } from '../primitives/input';
import { IconButtonComponent } from '../primitives/icon-button';
import { IconComponent } from '../primitives/icon';

@Component({
  selector: 'ui-search-bar',
  standalone: true,
  imports: [NgIf, FormsModule, InputComponent, IconButtonComponent, IconComponent],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SearchBarComponent), multi: true }],
  template: `
    <div class="search-bar" [class.focused]="focused">
      <ui-icon glyph="🔍" size="sm" [decorative]="true" class="search-icon"></ui-icon>
      <ui-input class="search-input"
        type="search"
        [id]="id + '-input'"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [style.--input-border]="'none'"
        [style.--input-bg]="'transparent'"
        [style.--input-padding]="'0'"
        [style.--input-focus-shadow]="'none'"
        [(ngModel)]="value"
        (ngModelChange)="onModelChange($event)"
        (focus)="focused = true"
        (blur)="focused = false; onTouched()"
        (keyup.enter)="searched.emit(value)">
      </ui-input>
      <ui-icon-button *ngIf="value" class="search-clear"
        icon="✕" size="sm" variant="ghost" ariaLabel="Clear search"
        [style.--icon-btn-size]="'22px'"
        [style.--icon-btn-bg]="'transparent'"
        [style.--icon-btn-color]="'#999'"
        (clicked)="clear()">
      </ui-icon-button>
    </div>
  `,
  styles: [`
    .search-bar {
      display: flex; align-items: center; gap: 8px;
      border: 1px solid #e0e0e0; border-radius: 999px;
      padding: 8px 14px; background: #fff; transition: border-color 0.2s;
    }
    .search-bar.focused { border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,0.15); }
    .search-icon { color: #999; flex-shrink: 0; }
    .search-input { flex: 1; }
  `],
})
export class SearchBarComponent implements ControlValueAccessor {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-search-bar-${++SearchBarComponent._idCounter}`;

  @Input() placeholder = 'Search...';
  @Input() disabled = false;
  @Output() searched = new EventEmitter<string>();

  value = '';
  focused = false;
  onChange = (_: string) => {};
  onTouched = () => {};

  onModelChange(v: string) {
    this.value = v;
    this.onChange(v);
  }

  clear() { this.value = ''; this.onChange(''); }

  writeValue(v: string) { this.value = v ?? ''; }
  registerOnChange(fn: (_: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(d: boolean) { this.disabled = d; }
}