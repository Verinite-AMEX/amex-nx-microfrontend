import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field';
import { InputComponent } from '../../../primitives/input';

export interface AmexAutocompleteSuggestion {
  label: string;
  code: string;
  extra?: string;
}

/**
 * The suggestion dropdown now uses DLS's real search-results classes from
 * search.css: .searchResults (the listbox), .searchResultsItem (each row),
 * .searchResultsItemLink + .textTruncate (the label text). All hand-rolled
 * `.ac-suggestions`/`.ac-suggestion` CSS is removed.
 *
 * ONE NECESSARY LOCAL OVERRIDE, clearly scoped: the keyboard-active item
 * needs the same highlight DLS gives on real :hover/:focus
 * (background-color: #f7f8f9 per search.css), but this component uses the
 * aria-activedescendant pattern — DOM focus deliberately stays on the
 * <input> so screen readers announce the field correctly, meaning the
 * browser's own :focus pseudo-class can never apply to the option itself.
 * `.acActive` below reproduces DLS's own #f7f8f9 value exactly; it doesn't
 * invent a new color.
 *
 * ui-input's own .formControl / .formControlWarning styling (from the
 * Inputs upgrade) is inherited automatically since this component already
 * uses <ui-input> internally — no separate input styling needed here.
 */
@Component({
  selector: 'amex-autocomplete-input',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent],
  template: `
    <div class="ac-wrap">
      <div class="ac-row">
        <!-- Primary input with suggestions -->
        <ui-form-field class="ac-field" [label]="label" [forId]="id + '-input'">
          <div class="ac-input-wrap">
            <ui-input
              [id]="id + '-input'"
              type="text"
              [placeholder]="placeholder"
              [ariaLabel]="label"
              [attr.role]="'combobox'"
              [attr.aria-expanded]="showSuggestions && filtered.length > 0"
              [attr.aria-controls]="id + '-listbox'"
              [attr.aria-activedescendant]="
                activeIndex >= 0 ? id + '-option-' + activeIndex : null
              "
              [(ngModel)]="inputValue"
              (ngModelChange)="onInput()"
              (focus)="onFocus()"
              (blur)="onBlur()"
              (keydown)="onKeydown($event)"
            >
            </ui-input>
            <ul
              class="searchResults"
              *ngIf="filtered.length > 0 && showSuggestions"
              [id]="id + '-listbox'"
              role="listbox"
            >
              <li
                class="searchResultsItem"
                [class.acActive]="i === activeIndex"
                *ngFor="let s of filtered; let i = index"
                [id]="id + '-option-' + i"
                role="option"
                [attr.aria-selected]="i === activeIndex"
                (mousedown)="onSelect(s)"
              >
                <span class="searchResultsItemLink textTruncate">{{
                  s.label
                }}</span>
              </li>
            </ul>
          </div>
        </ui-form-field>

        <ui-form-field
          class="ac-field"
          *ngIf="codeLabel"
          [label]="codeLabel"
          [forId]="id + '-code'"
        >
          <ui-input
            [id]="id + '-code'"
            type="text"
            [ariaLabel]="codeLabel"
            [readonly]="true"
            [(ngModel)]="selectedCode"
          ></ui-input>
        </ui-form-field>

        <ui-form-field
          class="ac-field"
          *ngIf="extraLabel && selectedExtra"
          [label]="extraLabel"
          [forId]="id + '-extra'"
        >
          <ui-input
            [id]="id + '-extra'"
            type="text"
            [ariaLabel]="extraLabel"
            [readonly]="true"
            [(ngModel)]="selectedExtra"
          ></ui-input>
        </ui-form-field>
      </div>
    </div>
  `,
  styles: [
    `
      /* Layout-only glue — no DLS equivalent needed for a horizontal
         field row; not part of any component's visual identity. */
      .ac-wrap {
        padding: 8px 0;
      }
      .ac-row {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        flex-wrap: wrap;
      }
      .ac-field {
        width: 180px;
      }
      .ac-input-wrap {
        position: relative;
      }

      /* See class-level comment: reproduces DLS's own #f7f8f9
         hover/focus color from search.css for the keyboard-active item,
         since real :focus can't land on this element. */
      .acActive {
        background-color: #f7f8f9;
      }
    `,
  ],
})
export class AmexAutocompleteInputComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `autocomplete-input-${++AmexAutocompleteInputComponent._idCounter}`;

  @Input() label = 'Name';
  @Input() placeholder = 'Start typing...';
  @Input() codeLabel = 'Code';
  @Input() extraLabel = '';
  @Input() suggestions: AmexAutocompleteSuggestion[] = [];

  @Output() selectionChanged = new EventEmitter<AmexAutocompleteSuggestion>();

  inputValue = '';
  selectedCode = '';
  selectedExtra = '';
  showSuggestions = false;
  activeIndex = -1;

  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  get filtered(): AmexAutocompleteSuggestion[] {
    if (!this.inputValue.trim()) return [];
    const term = this.inputValue.toLowerCase();
    return this.suggestions
      .filter((s) => s.label.toLowerCase().includes(term))
      .slice(0, 8);
  }

  onInput() {
    this.showSuggestions = true;
    this.activeIndex = -1;
    this.selectedCode = '';
    this.selectedExtra = '';
  }

  onFocus() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.showSuggestions = true;
  }

  onBlur() {
    this.closeTimeout = setTimeout(() => {
      this.showSuggestions = false;
      this.activeIndex = -1;
    }, 150);
  }

  onKeydown(event: KeyboardEvent) {
    const list = this.filtered;
    if (!list.length || !this.showSuggestions) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex =
        this.activeIndex < list.length - 1 ? this.activeIndex + 1 : 0;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex =
        this.activeIndex > 0 ? this.activeIndex - 1 : list.length - 1;
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      event.preventDefault();
      this.onSelect(list[this.activeIndex]);
    } else if (event.key === 'Escape') {
      this.showSuggestions = false;
      this.activeIndex = -1;
    }
  }

  onSelect(s: AmexAutocompleteSuggestion) {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.inputValue = s.label;
    this.selectedCode = s.code;
    this.selectedExtra = s.extra ?? '';
    this.showSuggestions = false;
    this.activeIndex = -1;
    this.selectionChanged.emit(s);
  }
}