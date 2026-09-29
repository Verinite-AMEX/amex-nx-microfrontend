import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  HostBinding,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * STRUCTURAL REWRITE — WORTH UNDERSTANDING WHY: DLS's search.css uses
 * direct-CHILD combinators, not descendant selectors:
 *   .search > input   (padding-right reserved for the button)
 *   .search > button  (icon color, incl. focus-triggered color change)
 * A direct-child selector only matches an element that is a LITERAL DOM
 * child — and <ui-input>/<ui-icon-button> are themselves real custom
 * element tags in the DOM. Nesting them here would produce
 * `.search > ui-input > input` / `.search > ui-icon-button > button`,
 * which `.search > input` / `.search > button` can never match, no matter
 * how correct the classes inside those child components are. This is the
 * same "wrong element" problem flagged on Buttons' icon-button and Tabs'
 * tabLink, just one level deeper (a composite reusing components, not a
 * primitive reusing a class). Fixed by rendering the real <input>/<button>
 * natively here instead of through <ui-input>/<ui-icon-button>.
 *
 * The button itself uses DLS's real .btnForm (default state) / .btnFormClose
 * (clear state) — an absolutely-positioned, transparent button that sits
 * inside the input's reserved right-hand padding (confirmed in forms.css:
 * position:absolute; top/right/bottom:0). .search's own `> button` rule
 * layers the icon color (#53565a, turning #006fcf on input :focus) on top
 * automatically — no JS needed for that part, DLS's CSS drives it.
 *
 * `.search > button.btnLoading` is real, documented DLS behavior — exposed
 * here as an opt-in `loading` input (new; defaults off, doesn't change
 * existing callers) so a consumer can show DLS's real loading spinner
 * while a search request is in flight.
 *
 * ICON GAP: the icon glyph itself is a plain "🔍"/"✕" character, not DLS's
 * real icon font — same known gap as Button/IconButton/Tag (icon.ts
 * hasn't been upgraded to DLS's icon font yet).
 */
@Component({
  selector: 'ui-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBarComponent),
      multi: true,
    },
  ],
  template: `
    <div class="search">
      <input
        class="formControl"
        type="search"
        [id]="id + '-input'"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        [attr.aria-label]="placeholder"
        (input)="onInput($event)"
        (keyup.enter)="onEnter()"
        (blur)="onTouched()"
      />
      <button
        type="button"
        [class]="value ? 'btnFormClose' : 'btnForm'"
        [class.btnLoading]="loading"
        [disabled]="disabled || loading"
        [attr.aria-label]="value ? 'Clear search' : 'Search'"
        (click)="onButtonClick()"
      >
        <span *ngIf="!loading" aria-hidden="true">{{
          value ? '✕' : '🔍'
        }}</span>
      </button>
    </div>
  `,
})
export class SearchBarComponent implements ControlValueAccessor {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-search-bar-${++SearchBarComponent._idCounter}`;

  @Input() placeholder = 'Search...';
  @Input() disabled = false;
  /** DLS's real .btnLoading state on the search button — new, opt-in. */
  @Input() loading = false;
  @Output() searched = new EventEmitter<string>();

  value = '';
  onChange = (_: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  onEnter() {
    this.searched.emit(this.value);
  }

  onButtonClick() {
    if (this.value) {
      this.clear();
    } else {
      this.searched.emit(this.value);
    }
  }

  clear() {
    this.value = '';
    this.onChange('');
  }

  writeValue(v: string) {
    this.value = v ?? '';
  }
  registerOnChange(fn: (_: string) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState(d: boolean) {
    this.disabled = d;
  }
}